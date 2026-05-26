import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getContent } from "@/content";
import { AccentWave } from "@/components/ui/AccentWave";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { getNewsItemWithFallback } from "@/sanity/lib/news";
import { urlForImage } from "@/sanity/lib/image";

export async function NewsArticle({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { news, statusLabels, nav } = getContent(locale);
  const item = await getNewsItemWithFallback(slug, news);

  if (!item) {
    notFound();
  }

  const date = new Date(item.date).toLocaleDateString(
    locale === "uk" ? "uk-UA" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <>
      <PageHeader title={item.title} subtitle={date} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWave className="-left-32 top-0 -scale-x-100" />
          <AccentWave className="-right-40 top-28" />

          <section className="relative z-10 max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
            <ContentStatusBadge
              status={item.status}
              label={statusLabels[item.status]}
            />
            {item.image && (
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-tera-nav-bg">
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            {item.body?.length ? (
              <div className="prose-tera mt-6 text-base leading-relaxed text-foreground/90">
                <PortableText
                  value={item.body}
                  components={{
                    types: {
                      image: ({ value }) => {
                        const src = urlForImage(value)
                          .width(900)
                          .height(520)
                          .fit("crop")
                          .url();

                        return (
                          <Image
                            src={src}
                            alt={value.alt || ""}
                            width={900}
                            height={520}
                            className="my-6 rounded-xl object-cover"
                          />
                        );
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <p className="mt-6 text-base leading-relaxed text-foreground/90">
                  {item.excerpt}
                </p>
                <p className="mt-6 text-sm text-foreground/60">
                  {locale === "uk"
                    ? "Повний текст новини буде опубліковано після завершення підготовки матеріалу."
                    : "The full article will be published once the material is ready."}
                </p>
              </>
            )}
            <Link
              href={localePath(locale, "/novyny")}
              className="mt-8 inline-block text-sm font-medium text-tera-blue hover:underline"
            >
              ← {nav.news}
            </Link>
          </section>
        </article>
      </section>
    </>
  );
}
