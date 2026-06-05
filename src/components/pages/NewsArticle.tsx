import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getContent } from "@/content";
import { NewsImageGallery } from "@/components/news/NewsImageGallery";
import { NewsRichContent } from "@/components/news/NewsRichContent";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { getNewsItemWithFirebaseFallback } from "@/lib/firebase/news-server";

export async function NewsArticle({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { news, statusLabels, nav, ui } = getContent(locale);
  const item = await getNewsItemWithFirebaseFallback(slug, news, locale);

  if (!item) {
    notFound();
  }

  const date = new Date(item.date).toLocaleDateString(
    locale === "uk" ? "uk-UA" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const useRichBody = Boolean(item.bodyHtml);
  const images = useRichBody
    ? []
    : [
        ...(item.image
          ? [{ src: item.image, alt: item.imageAlt || item.title }]
          : []),
        ...(item.gallery ?? []),
      ];

  const galleryLabels = {
    close: ui.galleryClose,
    previous: ui.galleryPrevious,
    next: ui.galleryNext,
    openHint: ui.galleryOpenHint,
    counterOf: ui.galleryCounterOf,
    locale,
  };

  return (
    <>
      <PageHeader title={item.title} subtitle={date} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <AccentWaveStack tops={[0, 112, 760]} start="left" />

          <section className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-6 shadow-md sm:p-8">
            <ContentStatusBadge
              status={item.status}
              label={statusLabels[item.status]}
            />
            {images.length > 0 ? (
              <NewsImageGallery images={images} labels={galleryLabels} />
            ) : null}
            {item.bodyHtml ? (
              <NewsRichContent html={item.bodyHtml} locale={locale} />
            ) : item.paragraphs?.length ? (
              <div
                lang={locale === "en" ? "en" : "uk"}
                className="prose-tera mt-6 text-base leading-relaxed text-foreground/90"
              >
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 64)}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-6 text-base leading-relaxed text-foreground/90">
                  {item.excerpt}
                </p>
                <p className="mt-6 text-sm text-foreground/60">
                  {ui.newsDraftNotice}
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
