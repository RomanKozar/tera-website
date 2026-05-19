import { getContent } from "@/content";
import { ContentStatusBadge } from "@/components/ui/ContentStatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";

export function ContentPage({
  locale,
  pageKey,
}: {
  locale: Locale;
  pageKey: string;
}) {
  const { pages, statusLabels } = getContent(locale);
  const page = pages[pageKey];

  if (!page) {
    return null;
  }

  return (
    <>
      <PageHeader title={page.title} />
      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ContentStatusBadge
          status={page.status}
          label={statusLabels[page.status]}
        />
        <section className="prose-tera mt-6 text-base leading-relaxed text-foreground/90">
          {page.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </section>
      </article>
    </>
  );
}
