export type Project = {
  slug: string;
  name: string;
  /** One line shown in the work list. */
  summary: string;
  /** How I was involved, shown in the work list and on the page. */
  role: string;
  /** Longer intro on the project page. */
  intro: string;
  /** What I did, in plain language. */
  did: string[];
  stack: string[];
  status: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "power-service-hub",
    name: "Power Service Hub",
    summary:
      "The payments platform Nigerian electricity distribution companies use to sell prepaid and postpaid meter credit.",
    role: "Platform support engineer",
    intro:
      "Power Service Hub (PSH) is a utility payments system used by electricity distribution companies in Nigeria. I look after it from two sides: keeping live transactions working, and coordinating the developers who extend it.",
    did: [
      "Traced failed meter transactions across the payment provider connections (VTpass and BuyPower) to find where each one failed.",
      "Tested the platform's APIs in Postman and used the HTTP status codes to tell a provider fault from a bug on our side.",
      "Coordinated adding Paystack and Interswitch as payment gateways, including briefing the developers and handling API key handoffs securely.",
      "Tracked bugs through developer handover: chatbot, airtime service charge, server errors and the transactions filter.",
      "Wrote the specification for a new survey and assessment request module, with a project manager role and GPS capture when a surveyor arrives on site.",
      "Handled client support tickets in Freshdesk and kept a record of recurring issues and their fixes.",
    ],
    stack: ["Paystack", "Interswitch", "Postman", "Freshdesk", "tawk.to"],
    status: "Live in production",
  },
  {
    slug: "mojecpay",
    name: "MojecPay",
    summary:
      "A Paystack-based payment platform for electricity distribution company customers, built from an empty folder.",
    role: "Designed and built the backend and frontend prototype",
    intro:
      "MojecPay lets customers of electricity distribution companies pay through Paystack Checkout or a dedicated virtual account. I built the backend and connected a working frontend to it.",
    did: [
      "Simplified the design by using Paystack alone instead of Remita and Interswitch.",
      "Built the backend with Node.js, Express and Prisma on PostgreSQL, with Neon for the database and Upstash for Redis.",
      "Added staff sign-in with JWT tokens and set up the distribution companies and admin accounts.",
      "Connected the frontend prototype to the real API, with CORS, an auth context, polling for payment status and real transaction screens.",
      "Proposed Dojah for identity checks (NIN, BVN, bank account and selfie) in a later phase.",
    ],
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Redis", "JWT", "Paystack"],
    status: "In development. Full payment testing is next.",
  },
  {
    slug: "operaplex-uat",
    name: "OPERAPLEX ERP testing",
    summary:
      "A full user acceptance test of a group-wide ERP, run through dozens of staff roles.",
    role: "Led the test and wrote the reports",
    intro:
      "OPERAPLEX is an ERP for a multi-company group. Before rollout I tested every module the way real staff would use it, and reported what needed fixing to the developers.",
    did: [
      "Logged in as dozens of different staff roles and checked what each one could and could not do.",
      "Found modules that were missing or empty, and places where a role could see or change more than it should.",
      "Automated the repeat checks with Playwright so the same tests could run again after fixes.",
      "Delivered a project brief, a handoff document and training materials for the ERP developers.",
      "Drafted a plan for connecting the ERP to the group's CRM, and a proposal for a progressive web app.",
      "Prototyped an appraisal screen with a five-stage cycle, weighted scoring and an audit trail.",
    ],
    stack: ["Playwright", "PowerShell", "Claude Code", "Markdown"],
    status: "Findings handed to the developers",
  },
  {
    slug: "waitlist-tenant-portal",
    name: "Waitlist tenant portal",
    summary:
      "Made a property platform's resident and admin portals work properly on phones.",
    role: "Frontend developer",
    intro:
      "Waitlist Ltd is a Nigerian property technology company. Most of its residents use phones, but the portals were built for desktop screens. I fixed that across three codebases.",
    did: [
      "Made buttons full width and stacked grids on small screens.",
      "Replaced wide tables with cards on mobile so nothing needs sideways scrolling.",
      "Fixed modals that overflowed the screen.",
      "Replaced raw error text that users could see with clear messages.",
      "Fixed the resident portal link and footer years that had been typed in by hand.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "AWS Amplify"],
    status: "Live on staging",
  },
  {
    slug: "waitlist-lead-funnels",
    name: "Waitlist lead funnels",
    summary:
      "Two small sites that turn visitors into property management leads.",
    role: "Built and maintained both",
    intro:
      "Waitlist needed a way to collect leads from social media and WhatsApp. I built a short quiz for property owners and a free toolkit download, and connected both to the company's CRM.",
    did: [
      "Built a property operations quiz whose answers are saved to the Brevo CRM and lead into a WhatsApp conversation.",
      "Built a free toolkit page that captures a lead before the download.",
      "Fixed leads being saved to the wrong CRM fields, download buttons that did nothing, and a broken Facebook Pixel.",
      "Tested both on phones with Playwright before each release.",
    ],
    stack: ["Netlify", "Brevo", "Facebook Pixel", "Playwright", "JavaScript"],
    status: "Live",
    links: [
      { label: "Property operations quiz", href: "https://waitlist-assessment.netlify.app" },
      { label: "Free toolkit", href: "https://waitlisttoolkit.netlify.app" },
    ],
  },
  {
    slug: "data-and-gis",
    name: "Data and GIS work",
    summary:
      "Dashboards, SQL exploration and the survey maps I made before moving into software.",
    role: "Analyst and geomatician",
    intro:
      "I studied Surveying and Geoinformatics at the University of Lagos. Before software, I made maps and worked with survey data. I still use that work to explain data clearly.",
    did: [
      "Built a Power BI report on how data analysts see their own field.",
      "Explored a COVID-19 dataset in SQL Server and built Tableau dashboards.",
      "Prepared oil mining lease location maps and dredging route layouts in AutoCAD at an oil and gas company.",
      "Turned survey datasets into dashboards for management reports at a geoconsulting firm.",
      "Ran cadastral and topographic surveys with DGPS.",
    ],
    stack: ["Power BI", "Tableau", "SQL", "Python", "ArcGIS", "AutoCAD"],
    status: "Ongoing",
    links: [{ label: "Power BI project on GitHub", href: "https://github.com/Tide25/Power-Bi-Project" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
