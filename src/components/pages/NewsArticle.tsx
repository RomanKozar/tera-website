import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

export function NewsArticle({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { news, statusLabels, nav } = getContent(locale);
  const item = news.find((n) => n.slug === slug);

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
      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ContentStatusBadge
          status={item.status}
          label={statusLabels[item.status]}
        />
        <p className="mt-6 text-base leading-relaxed text-foreground/90">
          {item.excerpt}
        </p>
        <p className="mt-6 text-sm text-foreground/60">
          {locale === "uk"
            ? "Повний текст новини буде опубліковано після завершення підготовки матеріалу."
            : "The full article will be published once the material is ready."}
        </p>
        <Link
          href={localePath(locale, "/novyny")}
          className="mt-8 inline-block text-sm font-medium text-tera-blue hover:underline"
        >
          ← {nav.news}
        </Link>
      </article>
    </>
  );
}
