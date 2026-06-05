import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { DecorativeWaves } from "@/components/home/DecorativeWaves";
import { HomeHeroBanner } from "@/components/home/HomeHeroBanner";
import { IMAGES } from "@/lib/images";
import { HOME_NEWS_COUNT, sortNewsByDateDesc } from "@/lib/news-sort";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { getNewsItemsWithFirebaseFallback } from "@/lib/firebase/news-server";

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const { home, news, nav, projects, ui } = content;
  const newsBase = localePath(locale, "/novyny");

  const latestNews = sortNewsByDateDesc(
    await getNewsItemsWithFirebaseFallback(news, locale),
  ).slice(0, HOME_NEWS_COUNT);

  const quickLinks = [
    {
      href: localePath(locale, "/pro-nas/chleny"),
      label: nav.aboutMembers,
      description: ui.viewMemberCommunities,
    },
    {
      href: localePath(locale, "/pro-nas/statutni-organy"),
      label: nav.aboutStatutory,
      description: ui.viewLeadershipStructure,
    },
  ];
  const projectCards = projects.map((project, index) => ({
    ...project,
    image: IMAGES.map,
    description: index === 0 ? ui.projectEnvDesc : ui.projectSocialDesc,
  }));

  return (
    <>
      <HomeHeroBanner locale={locale} />

      <section className="relative overflow-x-clip bg-white">
        <DecorativeWaves />
        <article className="relative mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <section className="md:col-span-3">
              <h2 className="mb-6 inline-block border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-tera-navy">
                {home.newsTitle}
              </h2>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {latestNews.map((item) => (
                  <li key={item.slug} className="list-none">
                    <Link
                      href={`${newsBase}/${item.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-tera-border/60 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-tera-gold hover:shadow-md"
                    >
                      <span className="relative h-44 w-full overflow-hidden bg-tera-nav-bg sm:h-48">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </span>
                      <span className="flex flex-1 flex-col p-5">
                        <time
                          dateTime={item.date}
                          className="text-sm font-medium text-foreground/55"
                        >
                          {formatDate(item.date, locale)}
                        </time>
                        <span className="mt-4 text-lg font-bold leading-snug text-tera-navy transition-colors group-hover:text-tera-blue">
                          {item.title}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {item.excerpt}
                        </span>
                        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-tera-blue px-4 py-2 text-sm font-bold text-tera-blue transition-colors group-hover:bg-tera-blue group-hover:text-white">
                          {home.readMore}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md">
              <h2 className="max-w-[13rem] text-2xl font-bold uppercase leading-tight tracking-wide text-slate-900">
                {ui.leadershipMembers}
              </h2>
              <ul className="mt-10 space-y-7">
                {quickLinks.map((link, index) => (
                  <li key={link.href} className="list-none">
                    <Link
                      href={link.href}
                      className="group flex items-start gap-3 text-slate-900"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-slate-900">
                        {index === 0 ? (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                          >
                            <path d="M16 11a3 3 0 1 0-2.83-4" />
                            <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
                            <path d="M14.5 13.5A5 5 0 0 1 21.5 18" />
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                          >
                            <path d="M4 10h16" />
                            <path d="M5 10 12 4l7 6" />
                            <path d="M6 10v8" />
                            <path d="M10 10v8" />
                            <path d="M14 10v8" />
                            <path d="M18 10v8" />
                            <path d="M4 18h16" />
                            <path d="M3 21h18" />
                          </svg>
                        )}
                      </span>
                      <span>
                        <span className="block text-lg font-bold transition-colors group-hover:text-tera-blue">
                          {link.label}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-slate-700">
                          {ui.details}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-6 shadow-md md:col-span-2">
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -right-10 h-56 w-72 rounded-[45%] border border-tera-navy/10 opacity-50"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-16 h-44 w-64 rounded-[45%] border border-tera-navy/10 opacity-50"
              />
              <div className="relative">
                <h2 className="mb-6 inline-block border-b-2 border-tera-gold pb-2 text-xl font-bold uppercase tracking-wide text-slate-900">
                  {home.projectsTitle}
                </h2>
              </div>
              <ul className="relative space-y-5">
                {projectCards.map((project) => (
                  <li
                    key={project.title}
                    className="list-none rounded-xl border border-white/80 bg-white p-4 shadow-lg shadow-slate-200/70"
                  >
                    <span className="flex items-center gap-4">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-tera-nav-bg">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-slate-900">
                          {project.title}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-slate-600">
                          {project.description}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                        {home.comingSoon}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </section>
    </>
  );
}
