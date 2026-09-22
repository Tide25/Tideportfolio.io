// A decorative survey plan for the hero. Every bearing, distance and the area
// are calculated from the corner coordinates below, so the drawing is
// internally consistent the way a real plan would be.

type Pt = [number, number];

const W = 640;
const H = 600;
const METRES_PER_UNIT = 0.2;

// Plot corners in drawing units (y grows downward), clockwise.
const PARCEL: Pt[] = [
  [196, 150],
  [420, 112],
  [506, 262],
  [396, 438],
  [168, 380],
];

const f = (n: number) => n.toFixed(1);

function centroid(pts: Pt[]): Pt {
  const n = pts.length;
  return [
    pts.reduce((s, p) => s + p[0], 0) / n,
    pts.reduce((s, p) => s + p[1], 0) / n,
  ];
}

// Quadrant bearing, e.g. N 82°23′ E. North is up, so "up" is negative y.
function bearing([x1, y1]: Pt, [x2, y2]: Pt) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const ns = dy <= 0 ? "N" : "S";
  const ew = dx >= 0 ? "E" : "W";
  const angle = (Math.atan(Math.abs(dx) / Math.abs(dy)) * 180) / Math.PI;
  let deg = Math.floor(angle);
  let min = Math.round((angle - deg) * 60);
  if (min === 60) {
    deg += 1;
    min = 0;
  }
  return `${ns} ${deg}°${String(min).padStart(2, "0")}′ ${ew}`;
}

function area(pts: Pt[]) {
  let sum = 0;
  pts.forEach(([x1, y1], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length];
    sum += x1 * y2 - x2 * y1;
  });
  return (Math.abs(sum) / 2) * METRES_PER_UNIT ** 2;
}

function groupDigits(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
}

function distToSegment(p: Pt, a: Pt, b: Pt) {
  const [px, py] = p;
  const [ax, ay] = a;
  const [bx, by] = b;
  const l2 = (bx - ax) ** 2 + (by - ay) ** 2;
  const t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / l2));
  return Math.hypot(px - (ax + t * (bx - ax)), py - (ay + t * (by - ay)));
}

function inside(p: Pt, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function closedSpline(pts: Pt[]) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d +=
      `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ` +
      `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ` +
      `${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

// A wobbly closed loop, used for depth contours.
function contour(cx: number, cy: number, r: number, phase: number) {
  const pts: Pt[] = [];
  const steps = 28;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const k =
      1 +
      0.13 * Math.sin(3 * t + phase) +
      0.08 * Math.sin(5 * t + phase * 1.7) +
      0.04 * Math.sin(2 * t - phase);
    pts.push([cx + Math.cos(t) * r * k * 1.15, cy + Math.sin(t) * r * k * 0.9]);
  }
  return closedSpline(pts);
}

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEEP: Pt = [560, 500];

function soundings() {
  const rand = seeded(11);
  const out: { x: number; y: number; whole: number; dec: number }[] = [];
  for (let gx = 30; gx < W - 10; gx += 46) {
    for (let gy = 24; gy < H - 40; gy += 46) {
      const x = gx + (rand() - 0.5) * 26;
      const y = gy + (rand() - 0.5) * 26;
      const skip = rand() < 0.3;
      const p: Pt = [x, y];
      const nearEdge = PARCEL.some((a, i) => distToSegment(p, a, PARCEL[(i + 1) % PARCEL.length]) < 40);
      const inNorthArrow = x > 540 && y < 110;
      const inScaleBar = x < 190 && y > 520;
      if (skip || nearEdge || inside(p, PARCEL) || inNorthArrow || inScaleBar) continue;
      const depth = 3 + Math.hypot(x - DEEP[0], y - DEEP[1]) / 34 + rand() * 1.5;
      out.push({ x, y, whole: Math.floor(depth), dec: Math.floor((depth % 1) * 10) });
    }
  }
  return out;
}

export default function SurveyPlan() {
  const c = centroid(PARCEL);
  const boundary = PARCEL.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join("") + "Z";

  const edges = PARCEL.map((a, i) => {
    const b = PARCEL[(i + 1) % PARCEL.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle > 90) angle -= 180;
    if (angle < -90) angle += 180;
    // Unit normal pointing away from the middle of the plot.
    let nx = -dy / len;
    let ny = dx / len;
    if (nx * (mid[0] - c[0]) + ny * (mid[1] - c[1]) < 0) {
      nx = -nx;
      ny = -ny;
    }
    return {
      angle,
      outside: [mid[0] + nx * 13, mid[1] + ny * 13] as Pt,
      inside: [mid[0] - nx * 14, mid[1] - ny * 14] as Pt,
      bearing: bearing(a, b),
      metres: (len * METRES_PER_UNIT).toFixed(2),
    };
  });

  const rings = [40, 80, 120, 160, 200, 240, 280];
  const holeRings = [50, 100, 150];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full font-serif italic"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="plan-fade-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.72" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="plan-fade-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect x="0" y="0" width={W} height={H} fill="url(#plan-fade-grad)" />
        </mask>
      </defs>

      {/* Depth contours and soundings fade out toward the edges. */}
      <g mask="url(#plan-fade-mask)">
        <g fill="none" className="stroke-shoal">
          {rings.map((r, i) => (
            <path key={`a${r}`} d={contour(DEEP[0], DEEP[1], r, 0.6)} strokeWidth={i % 3 === 2 ? 1.8 : 1} />
          ))}
          {holeRings.map((r, i) => (
            <path key={`b${r}`} d={contour(40, 40, r, 2.1)} strokeWidth={i === 1 ? 1.8 : 1} />
          ))}
        </g>
        <g className="fill-ink-soft text-[11px]" opacity="0.85">
          {soundings().map((s) => (
            <text key={`${s.x}-${s.y}`} x={f(s.x)} y={f(s.y)} textAnchor="middle">
              {s.whole}
              <tspan fontSize="8" dy="3">
                {s.dec}
              </tspan>
            </text>
          ))}
        </g>
      </g>

      {/* The plot: land tint, then the boundary draws itself once. */}
      <path d={boundary} className="plan-reveal fill-land" />
      <path
        d={boundary}
        pathLength={1}
        fill="none"
        strokeWidth="2.2"
        strokeLinejoin="round"
        className="plan-boundary stroke-magenta"
      />

      <g className="plan-reveal">
        {edges.map((e, i) => (
          <g key={i} className="text-[13px]">
            <text
              transform={`translate(${f(e.outside[0])} ${f(e.outside[1])}) rotate(${f(e.angle)})`}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-magenta"
            >
              {e.bearing}
            </text>
            <text
              transform={`translate(${f(e.inside[0])} ${f(e.inside[1])}) rotate(${f(e.angle)})`}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-ink"
            >
              {e.metres} m
            </text>
          </g>
        ))}

        {PARCEL.map(([x, y], i) => {
          const ax = x - c[0];
          const ay = y - c[1];
          const l = Math.hypot(ax, ay);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4.5" className="fill-chart stroke-magenta" strokeWidth="1.6" />
              <circle cx={x} cy={y} r="1.3" className="fill-magenta" />
              <text
                x={f(x + (ax / l) * 20)}
                y={f(y + (ay / l) * 20)}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-ink text-[13px]"
              >
                B{i + 1}
              </text>
            </g>
          );
        })}

        <text x={f(c[0])} y={f(c[1] - 8)} textAnchor="middle" className="fill-ink-soft text-[13px]">
          Area
        </text>
        <text x={f(c[0])} y={f(c[1] + 10)} textAnchor="middle" className="fill-ink text-[18px]">
          {groupDigits(area(PARCEL))} m²
        </text>

        {/* North arrow */}
        <g transform="translate(590 96)">
          <path d="M0 -40 L9 8 L0 0 L-9 8 Z" className="fill-ink" />
          <text y="-48" textAnchor="middle" className="fill-ink text-[14px]">
            N
          </text>
        </g>

        {/* Scale bar: 10 m is 50 drawing units */}
        <g transform="translate(36 566)">
          <rect x="0" y="0" width="50" height="6" className="fill-ink" />
          <rect x="50" y="0" width="50" height="6" className="fill-none stroke-ink" strokeWidth="1" />
          <text x="0" y="-6" textAnchor="middle" className="fill-ink text-[12px]">
            0
          </text>
          <text x="50" y="-6" textAnchor="middle" className="fill-ink text-[12px]">
            10
          </text>
          <text x="100" y="-6" textAnchor="middle" className="fill-ink text-[12px]">
            20 m
          </text>
        </g>
      </g>
    </svg>
  );
}
