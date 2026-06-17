import { getBestPracticesContent } from "@/content/best-practices";
import { AccentWaveStack } from "@/components/ui/AccentWaveStack";
import { OpenableImage } from "@/components/ui/image-lightbox/OpenableImage";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/lib/site";

function formatArticleDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BestPracticesPage({ locale }: { locale: Locale }) {
  const { pageTitle, articles } = getBestPracticesContent(locale);

  return (
    <>
      <PageHeader title={pageTitle} />
      <section className="relative overflow-hidden">
        <article className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <AccentWaveStack tops={[0, 680, 1480]} start="left" />

          <div className="relative z-10 space-y-12 sm:space-y-16">
            {articles.map((article, articleIndex) => (
              <section
                key={article.id}
                id={article.id}
                className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-5 shadow-md sm:p-8"
              >
                <time
                  dateTime={article.date}
                  className="text-sm font-medium text-tera-blue"
                >
                  {formatArticleDate(article.date, locale)}
                </time>
                <h2 className="mt-3 text-xl font-bold leading-snug text-tera-navy sm:text-2xl">
                  {article.title}
                </h2>

                <OpenableImage
                  groupId={`best-practices-${article.id}`}
                  index={0}
                  src={article.image}
                  alt={article.imageAlt}
                  wrapperClassName="relative mt-6 min-h-[220px] overflow-hidden rounded-2xl border border-tera-border/60 shadow-md sm:min-h-[360px]"
                  imageClassName="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={articleIndex === 0}
                />

                <div className="prose-tera mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
                  {article.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>

                {article.quote ? (
                  <blockquote className="mt-8 rounded-2xl border-l-4 border-tera-gold bg-gradient-to-r from-tera-nav-bg to-tera-nav-bg-end p-5 sm:p-6">
                    <p className="text-base italic leading-relaxed text-tera-navy sm:text-lg">
                      «{article.quote.text}»
                    </p>
                    <footer className="mt-4 text-sm font-semibold text-tera-blue">
                      — {article.quote.author}
                    </footer>
                  </blockquote>
                ) : null}

                {article.closing ? (
                  <p className="mt-8 text-lg font-bold leading-snug text-tera-navy sm:text-xl">
                    {article.closing}
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
