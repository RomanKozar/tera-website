"use client";

import { content } from "@/content/uk";
import { paragraphsToEditorDoc } from "@/lib/rich-text";
import { createNewsAdmin, listAllNewsAdmin } from "./news-admin";

export async function importLocalNewsToFirestore(): Promise<number> {
  const existing = await listAllNewsAdmin();
  const existingSlugs = new Set(existing.map((n) => n.slug));
  let imported = 0;

  for (const item of content.news) {
    if (existingSlugs.has(item.slug)) {
      continue;
    }

    const paragraphs = item.paragraphs ?? [];
    const bodyJson = paragraphsToEditorDoc(paragraphs);
    const bodyText = paragraphs.join("\n\n");
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
  return content.news.length;
}
