import { sanitizeNewsHtml } from "@/lib/sanitize-html";

export function NewsRichContent({ html }: { html: string }) {
  const safe = sanitizeNewsHtml(html);

  return (
    <div
      className="news-rich-content prose-tera mt-6 text-base leading-relaxed text-foreground/90"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
