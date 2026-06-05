import sanitizeHtml from "sanitize-html";

export function sanitizeNewsHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel", "class"],
      img: ["src", "alt", "title", "width", "height", "class"],
      p: ["class"],
      h2: ["class"],
      h3: ["class"],
      ul: ["class"],
      ol: ["class"],
      li: ["class"],
      blockquote: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
