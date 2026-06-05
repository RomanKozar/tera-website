"use client";

import { content as ukContent } from "@/content/uk";
import { content as enContent } from "@/content/en";
import { paragraphsToEditorDoc } from "@/lib/rich-text";
import { createNewsAdmin, listAllNewsAdmin } from "./news-admin";

export async function importLocalNewsToFirestore(): Promise<number> {
  const existing = await listAllNewsAdmin();
  const existingSlugs = new Set(existing.map((n) => n.slug));
  let imported = 0;

  for (let i = 0; i < ukContent.news.length; i += 1) {
    const item = ukContent.news[i]!;
    const enItem = enContent.news[i];

    if (existingSlugs.has(item.slug)) {
      continue;
    }

    const paragraphs = item.paragraphs ?? [];
    const bodyJson = paragraphsToEditorDoc(paragraphs);
    const bodyText = paragraphs.join("\n\n");

    const enParagraphs = enItem?.paragraphs ?? [];
    const bodyJsonEn = enParagraphs.length
      ? paragraphsToEditorDoc(enParagraphs)
      : null;
    const bodyTextEn = enParagraphs.join("\n\n");

    const images = [
      { url: item.image, alt: item.imageAlt ?? item.title },
      ...(item.gallery ?? []).map((g) => ({ url: g.src, alt: g.alt })),
    ].filter((img) => img.url);

    await createNewsAdmin({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      body: bodyText,
      bodyJson: bodyJson as Record<string, unknown>,
      bodyHtml: "",
      titleEn: enItem?.title ?? "",
      slugEn: enItem?.slug ?? "",
      excerptEn: enItem?.excerpt ?? "",
      bodyEn: bodyTextEn,
      bodyJsonEn: bodyJsonEn as Record<string, unknown> | null,
      bodyHtmlEn: "",
      imageAltEn: enItem?.imageAlt ?? "",
      publishedAt: new Date(item.date).toISOString(),
      status: "published",
      imageUrl: images[0]?.url ?? item.image,
      imageAlt: images[0]?.alt ?? item.title,
      images,
    });
    imported += 1;
  }

  return imported;
}

export function getLocalNewsCount(): number {
  return ukContent.news.length;
}
