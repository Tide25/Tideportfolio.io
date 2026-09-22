import Link from "next/link";
import { asset, site } from "@/data/site";

export default function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-sans text-lg font-semibold tracking-tight">
        {site.name}
      </Link>
      <nav aria-label="Main" className="flex items-center gap-5 font-sans text-[0.95rem] sm:gap-7">
        <Link href="/#work" className="hover:text-magenta">
          Work
        </Link>
        <Link href="/#background" className="hidden hover:text-magenta sm:inline">
          Background
        </Link>
        <Link href="/#contact" className="hover:text-magenta">
          Contact
        </Link>
        <a
          href={asset(site.cv)}
          className="rounded-full border border-ink px-4 py-1.5 font-medium hover:bg-ink hover:text-chart"
        >
          CV
        </a>
      </nav>
    </header>
  );
}
