import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { AccentWave } from "@/components/ui/AccentWave";
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
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWave className="-left-32 top-0 -scale-x-100" />
          <AccentWave className="-right-40 top-56" />

          <ul className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <li key={item.slug} className="list-none">
                <article className="overflow-hidden rounded-xl border border-tera-border bg-white shadow-sm hover:shadow-md">
                  <Link href={`${base}/${item.slug}`}>
                    <div className="relative aspect-[16/10] bg-tera-nav-bg">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <time
                        dateTime={item.date}
                        className="text-xs text-foreground/55"
                      >
                        {formatDate(item.date, locale)}
                      </time>
                      <h2 className="mt-2 text-lg font-bold text-tera-navy">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm text-foreground/75">{item.excerpt}</p>
                      <span className="mt-3 inline-block text-sm font-medium text-tera-blue">
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
