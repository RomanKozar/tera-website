import Link from "next/link";
import { getContent } from "@/content";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

export function AboutHub({ locale }: { locale: Locale }) {
  const { pages, nav } = getContent(locale);
  const intro = pages["pro-nas"];

  const links = [
    { href: localePath(locale, "/pro-nas/maoms-tera"), label: nav.aboutMaoms },
    { href: localePath(locale, "/pro-nas/chleny"), label: nav.aboutMembers },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: nav.aboutStatutory,
    },
  ];

  return (
    <>
      <PageHeader title={intro.title} />
      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <section className="prose-tera max-w-3xl text-base leading-relaxed text-foreground/90">
          {intro.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </section>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.href} className="list-none">
              <Link href={link.href} className="quick-link block p-1">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
