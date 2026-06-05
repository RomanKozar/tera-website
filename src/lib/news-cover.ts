import type { Locale } from "@/lib/site";

/** Заглушка, якщо в новині немає жодного фото */
export const NEWS_COVER_PLACEHOLDER = "/images/loading/loading-card.webp";

export function newsCoverImage(src?: string | null): string {
  const url = src?.trim();
  return url || NEWS_COVER_PLACEHOLDER;
}

export function hasNewsCoverImage(src?: string | null): boolean {
  return Boolean(src?.trim());
}

export function newsPlaceholderAlt(locale: Locale): string {
  return locale === "en"
    ? "MAOMC TeRA — placeholder image"
    : "МАОМС «ТеРА» — заглушка зображення";
}

export function isNewsCoverPlaceholder(src: string): boolean {
  return src === NEWS_COVER_PLACEHOLDER;
}
