import Link from "next/link";
import { getContent } from "@/content";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsList({ locale }: { locale: Locale }) {
  const { news, nav, home } = getContent(locale);
  const base = localePath(locale, "/novyny");

  return (
    <>
      <PageHeader title={nav.news} />
      <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 sm:px-6">
        {news.map((item) => (
          <li key={item.slug} className="list-none">
            <article className="flex h-full flex-col rounded border border-tera-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <Link href={`${base}/${item.slug}`} className="flex flex-1 flex-col">
                <time
                  dateTime={item.date}
                  className="text-xs font-medium uppercase tracking-wide text-tera-blue-light"
                >
                  {formatDate(item.date, locale)}
                </time>
                <h2 className="mt-2 text-lg font-bold text-tera-navy">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">
                  {item.excerpt}
                </p>
                <span className="mt-3 text-sm font-medium text-tera-blue">
                  {home.readMore} →
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
