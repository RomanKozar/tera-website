import { sanitizeNewsHtml } from "@/lib/sanitize-html";
import type { Locale } from "@/lib/site";

export function NewsRichContent({
  html,
  locale = "uk",
}: {
  html: string;
  locale?: Locale;
}) {
  const safe = sanitizeNewsHtml(html);

  return (
    <div
      lang={locale === "en" ? "en" : "uk"}
      className="news-rich-content prose-tera mt-6 text-base leading-relaxed text-foreground/90"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
