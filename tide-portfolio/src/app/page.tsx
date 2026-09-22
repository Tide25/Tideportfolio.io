import Link from "next/link";
import SurveyPlan from "@/components/SurveyPlan";
import { projects } from "@/data/projects";
import { asset, site } from "@/data/site";

const timeline = [
  {
    years: "2026 to now",
    what: "Platform support engineer at Mojec Group, and junior software developer at Waitlist Ltd",
  },
  {
    years: "2025 to 2026",
    what: "Graduate intern geomatician at Amni International Petroleum Development Company",
  },
  { years: "2024 to 2025", what: "NYSC graduate engineer at Amec Consult, on site supervision" },
  { years: "2023 to 2024", what: "Personal assistant at JIMAB Geoconsults, supporting survey operations" },
  { years: "2023", what: "B.Sc. Surveying and Geoinformatics, University of Lagos" },
  { years: "2021", what: "Intern at Geo-Smart Spatial Technologies, on cadastral and topographic surveys" },
];

const skills = [
  {
    group: "Build",
    items: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, Prisma, PostgreSQL, JavaScript",
  },
  { group: "Test and support", items: "Playwright, Postman, Freshdesk, PowerShell" },
  { group: "Payments and CRM", items: "Paystack, Interswitch, Brevo, VTpass, BuyPower" },
  { group: "Deploy", items: "Netlify, AWS Amplify, GitHub" },
  { group: "Data and GIS", items: "SQL, Python, R, Power BI, Tableau, ArcGIS, AutoCAD" },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-12 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-6">
          <h1 className="font-sans text-[clamp(3.25rem,9vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            Tide
            <br />
            Adesanya
          </h1>
          <p className="mt-8 font-sans text-2xl font-medium tracking-tight sm:text-3xl">{site.title}</p>
          <p className="mt-5 max-w-[34rem] text-xl text-ink-soft">
            I test, coordinate and build software for payments, ERP and property platforms in Nigeria. I trained as a
            land surveyor, so I check my work against the ground before I call it finished.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 font-sans font-medium">
            <a href="#work" className="rounded-full bg-ink px-7 py-3 text-chart hover:bg-magenta">
              See the work
            </a>
            <a href={asset(site.cv)} className="rounded-full border border-ink px-7 py-3 hover:bg-ink hover:text-chart">
              Download CV
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
          <SurveyPlan />
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          Projects from Mojec Group, Waitlist Ltd and my earlier survey work. Company details are kept general.
        </p>
        <ul className="mt-10 border-t border-ink/30">
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-ink/30">
              <Link
                href={`/work/${p.slug}`}
                className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <h3 className="font-sans text-2xl font-semibold tracking-tight group-hover:text-magenta md:col-span-4">
                  {p.name}
                </h3>
                <p className="md:col-span-5">{p.summary}</p>
                <p className="italic text-ink-soft md:col-span-3">{p.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="background" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">From surveying to software</h2>
            <div className="mt-6 max-w-[34rem] space-y-4">
              <p>
                I started on survey sites in 2018, measuring plots and setting out boundaries. After my degree I worked
                in hydrographic mapping, oil and gas layouts and site supervision.
              </p>
              <p>
                In 2026 I moved into software. I now work across two companies: Mojec Group, where I support and
                coordinate platforms, and Waitlist Ltd, where I write frontend and backend code.
              </p>
              <p>
                Surveying is checking measurements against each other. I do the same when I test software: compare what
                the system says with what actually happened.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {timeline.map((t) => (
              <li key={t.years} className="grid gap-1 border-t border-ink/30 py-5 sm:grid-cols-12 sm:gap-6">
                <p className="font-sans font-medium sm:col-span-3">{t.years}</p>
                <p className="sm:col-span-9">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">Tools</h2>
        <dl className="mt-10 border-t border-ink/30">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-1 border-b border-ink/30 py-5 sm:grid-cols-12 sm:gap-6">
              <dt className="font-sans font-medium sm:col-span-3">{s.group}</dt>
              <dd className="sm:col-span-9">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
        <h2 className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl">Talk to me about frontend, full-stack or platform work</h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block break-all font-sans text-2xl font-medium tracking-tight text-magenta underline decoration-2 underline-offset-8 hover:text-ink sm:text-4xl"
        >
          {site.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-sans font-medium">
          <li>
            <a href={site.github} className="hover:text-magenta">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.twitter} className="hover:text-magenta">
              Twitter
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a href={site.linkedin} className="hover:text-magenta">
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <a href={asset(site.cv)} className="hover:text-magenta">
              CV (PDF)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
