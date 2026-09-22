import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/25">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-base text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.fullName}, {new Date().getFullYear()}
        </p>
        <p className="italic">
          {site.location}, {site.coordinates}
        </p>
      </div>
    </footer>
  );
}
