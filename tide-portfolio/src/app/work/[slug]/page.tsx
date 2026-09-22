import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.name} | Tide Adesanya`, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <Link href="/#work" className="font-sans font-medium hover:text-magenta">
        Back to all work
      </Link>

      <h1 className="mt-10 max-w-4xl font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
        {project.name}
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-ink-soft">{project.intro}</p>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-sans text-2xl font-semibold tracking-tight">What I did</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 marker:text-magenta">
            {project.did.map((item) => (
              <li key={item} className="max-w-[38rem] pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <dl className="space-y-7 lg:col-span-4 lg:col-start-9">
          <div>
            <dt className="font-sans font-medium">My role</dt>
            <dd className="mt-1 text-ink-soft">{project.role}</dd>
          </div>
          <div>
            <dt className="font-sans font-medium">Status</dt>
            <dd className="mt-1 text-ink-soft">{project.status}</dd>
          </div>
          <div>
            <dt className="font-sans font-medium">Built with</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2 font-sans text-sm">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-ink/40 px-3 py-1">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {project.links && (
            <div>
              <dt className="font-sans font-medium">Links</dt>
              <dd className="mt-1">
                <ul className="space-y-1">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-magenta underline underline-offset-4 hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-20 border-t border-ink/30 pt-8">
        <p className="text-ink-soft">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="mt-1 inline-block font-sans text-2xl font-semibold tracking-tight hover:text-magenta sm:text-3xl"
        >
          {next.name}
        </Link>
      </div>
    </article>
  );
}
