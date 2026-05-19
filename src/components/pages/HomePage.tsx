import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { DecorativeWaves } from "@/components/home/DecorativeWaves";
import { HomeMap } from "@/components/home/HomeMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

const NEWS_THUMBS = [
  "from-amber-100 to-amber-200",
  "from-sky-100 to-sky-200",
  "from-emerald-100 to-emerald-200",
] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { home, news, nav, projects } = content;
  const newsBase = localePath(locale, "/novyny");

  const quickLinks = [
    { href: localePath(locale, "/pro-nas/chleny"), label: nav.aboutMembers },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: nav.aboutStatutory,
    },
  ];

  return (
    <section className="relative bg-white">
      <DecorativeWaves />

      {/* Карта зліва + новини справа */}
      <article className="relative mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-10">
        <HomeMap locale={locale} />

        <section className="min-w-0 lg:border-l lg:border-tera-border lg:pl-8">
          <SectionHeading>{home.newsTitle}</SectionHeading>
          <ul className="mt-6 space-y-5">
            {news.map((item, index) => (
              <li key={item.slug} className="list-none">
                <Link
                  href={`${newsBase}/${item.slug}`}
                  className="group flex gap-4"
                >
                  <span
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-gradient-to-br ${NEWS_THUMBS[index % NEWS_THUMBS.length]}`}
                  >
                    <Image
                      src="/logo.png"
                      alt=""
                      width={48}
                      height={48}
                      className="absolute inset-0 m-auto h-8 w-8 object-contain opacity-60"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-bold text-tera-navy group-hover:text-tera-blue">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-tera-blue-light group-hover:underline">
                      {home.readMore}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={newsBase}
            className="mt-6 inline-block text-sm font-semibold text-tera-blue hover:underline"
          >
            {locale === "uk" ? "Усі новини" : "All news"} →
          </Link>
        </section>
      </article>

      {/* Швидкі посилання та проекти */}
      <article className="relative mx-auto grid max-w-7xl gap-10 border-t border-tera-border px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <section className="flex flex-col justify-center gap-8">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="quick-link">
              {link.label}
            </Link>
          ))}
        </section>

        <section>
          <SectionHeading>{home.projectsTitle}</SectionHeading>
          <ul className="mt-6 space-y-5">
            {projects.map((project) => (
              <li key={project.title} className="list-none">
                <p className="font-bold text-tera-navy">{project.title}</p>
                <p className="mt-1 text-sm text-foreground/55">
                  {home.comingSoon}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(locale, "/nashi-proekty")}
            className="mt-6 inline-block text-sm font-medium text-tera-blue hover:underline"
          >
            {nav.projects} →
          </Link>
        </section>
      </article>
    </section>
  );
}
