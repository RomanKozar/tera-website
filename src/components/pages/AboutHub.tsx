import Link from "next/link";
import { getContent } from "@/content";
import { AccentWave } from "@/components/ui/AccentWave";
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
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWave className="-left-32 top-0 -scale-x-100" />
          <AccentWave className="-right-40 top-36" />

          <section className="prose-tera relative z-10 max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 text-base leading-relaxed text-foreground/90 shadow-md sm:p-8">
            {intro.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
          <ul className="relative z-10 mt-10 grid gap-6 sm:grid-cols-3">
            {links.map((link) => (
              <li key={link.href} className="list-none">
                <Link
                  href={link.href}
                  className="quick-link block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-tera-gold hover:shadow-md"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
