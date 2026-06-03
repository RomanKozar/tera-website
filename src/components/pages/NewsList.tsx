import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { sortNewsByDateDesc } from "@/lib/news-sort";
import { getNewsItemsWithFirebaseFallback } from "@/lib/firebase/news-server";

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function NewsList({ locale }: { locale: Locale }) {
  const { news, nav, home } = getContent(locale);
  const newsItems = sortNewsByDateDesc(
    await getNewsItemsWithFirebaseFallback(news),
  );
  const base = localePath(locale, "/novyny");

  return (
    <>
      <PageHeader title={nav.news} />
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWaveStack tops={[0, 224, 720]} start="left" />

          <ul className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <li key={item.slug} className="list-none">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-tera-border bg-white shadow-sm hover:shadow-md">
                  <Link
                    href={`${base}/${item.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/10] shrink-0 bg-tera-nav-bg">
                      <Image
                        src={item.image}
                        alt={item.imageAlt || ""}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <time
                        dateTime={item.date}
                        className="text-xs text-foreground/55"
                      >
                        {formatDate(item.date, locale)}
                      </time>
                      <h2 className="mt-2 text-lg font-bold leading-snug text-tera-navy">
                        {item.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">
                        {item.excerpt}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-tera-blue">
                        {home.readMore} →
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
