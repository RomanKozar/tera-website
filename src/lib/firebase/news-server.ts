import { initializeApp, getApps } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { NewsItem } from "@/content/types";
import { firebaseConfig, isFirebaseConfigured } from "./config";
import type { JSONContent } from "@tiptap/core";
import type { Locale } from "@/lib/site";
import type { FirebaseNewsDoc, FirebaseNewsStatus } from "./news-types";
import { extractFirstImageSrc } from "@/lib/rich-text";

const COLLECTION = "news";

function getServerFirestore() {
  const app =
    getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
  return getFirestore(app);
}

function pickLocalized(
  doc: FirebaseNewsDoc,
  locale: Locale,
  field: "title" | "excerpt" | "body" | "bodyHtml" | "imageAlt",
): string {
  if (locale === "en") {
    const enKey = `${field}En` as keyof FirebaseNewsDoc;
    const enValue = doc[enKey];
    if (typeof enValue === "string" && enValue.trim()) {
      return enValue.trim();
    }
  }
  const value = doc[field];
  return typeof value === "string" ? value : "";
}

function pickLocalizedJson(
  doc: FirebaseNewsDoc,
  locale: Locale,
): JSONContent | null | undefined {
  if (locale === "en" && doc.bodyJsonEn) {
    return doc.bodyJsonEn as JSONContent;
  }
  return doc.bodyJson as JSONContent | null | undefined;
}

function mapToNewsItem(
  docData: FirebaseNewsDoc,
  locale: Locale,
): NewsItem & { paragraphs?: string[] } {
  const title = pickLocalized(docData, locale, "title");
  const excerpt = pickLocalized(docData, locale, "excerpt");
  const bodyText = pickLocalized(docData, locale, "body");
  const bodyHtml = pickLocalized(docData, locale, "bodyHtml");
  const bodyJson = pickLocalizedJson(docData, locale);
  const slug =
    locale === "en" && docData.slugEn?.trim()
      ? docData.slugEn.trim()
      : docData.slug;

  const paragraphs = bodyHtml
    ? undefined
    : bodyText
      ? bodyText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
      : undefined;

  const coverFromContent = extractFirstImageSrc(bodyJson, bodyHtml);
  const imgs = docData.images?.length
    ? docData.images
    : coverFromContent
      ? [{ url: coverFromContent, alt: docData.imageAlt }]
      : docData.imageUrl
        ? [{ url: docData.imageUrl, alt: docData.imageAlt }]
        : [];

  const [first, ...rest] = imgs;
  const imageAlt =
    pickLocalized(docData, locale, "imageAlt") || first?.alt || title;

  return {
    slug,
    date: docData.publishedAt,
    title,
    excerpt,
    image: first?.url ?? "",
    imageAlt: imageAlt || undefined,
    bodyHtml: bodyHtml || undefined,
    gallery: bodyHtml
      ? []
      : rest.map((img) => ({
          src: img.url,
          alt: pickLocalized(docData, locale, "imageAlt") || img.alt || title,
        })),
    status: docData.status === "published" ? "ready" : "draft",
    paragraphs,
  };
}

function parseImages(data: Record<string, unknown>) {
  if (Array.isArray(data.images)) {
    return data.images
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        const img = entry as Record<string, unknown>;
        const url = String(img.url ?? "");
        if (!url) {
          return null;
        }
        return {
          url,
          path: img.path ? String(img.path) : undefined,
          alt: String(img.alt ?? ""),
        };
      })
      .filter(Boolean) as FirebaseNewsDoc["images"];
  }
  const legacyUrl = String(data.imageUrl ?? "");
  if (legacyUrl) {
    return [{ url: legacyUrl, alt: String(data.imageAlt ?? "") }];
  }
  return [];
}

function parseDoc(id: string, data: Record<string, unknown>): FirebaseNewsDoc {
  const images = parseImages(data);
  const first = images[0];

  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    excerpt: String(data.excerpt ?? ""),
    body: String(data.body ?? ""),
    bodyJson:
      data.bodyJson && typeof data.bodyJson === "object"
        ? (data.bodyJson as Record<string, unknown>)
        : null,
    bodyHtml: String(data.bodyHtml ?? ""),
    titleEn: String(data.titleEn ?? ""),
    slugEn: String(data.slugEn ?? ""),
    excerptEn: String(data.excerptEn ?? ""),
    bodyEn: String(data.bodyEn ?? ""),
    bodyJsonEn:
      data.bodyJsonEn && typeof data.bodyJsonEn === "object"
        ? (data.bodyJsonEn as Record<string, unknown>)
        : null,
    bodyHtmlEn: String(data.bodyHtmlEn ?? ""),
    imageAltEn: String(data.imageAltEn ?? ""),
    publishedAt: String(
      data.publishedAt ?? new Date().toISOString().slice(0, 10),
    ),
    status: (data.status as FirebaseNewsStatus) ?? "draft",
    images,
    imageUrl: first?.url ?? String(data.imageUrl ?? ""),
    imageAlt: first?.alt ?? String(data.imageAlt ?? ""),
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

export async function fetchPublishedNewsDocs(): Promise<FirebaseNewsDoc[]> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    const db = getServerFirestore();
    const q = query(
      collection(db, COLLECTION),
      where("status", "==", "published"),
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => parseDoc(d.id, d.data()))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    console.error("[firebase] fetchPublishedNewsDocs failed:", error);
    return [];
  }
}

export async function fetchPublishedNews(
  locale: Locale = "uk",
): Promise<(NewsItem & { paragraphs?: string[] })[]> {
  const docs = await fetchPublishedNewsDocs();
  return docs.map((doc) => mapToNewsItem(doc, locale));
}

export async function fetchPublishedNewsBySlug(
  slug: string,
  locale: Locale = "uk",
): Promise<(NewsItem & { paragraphs?: string[] }) | null> {
  const docs = await fetchPublishedNewsDocs();
  const doc = docs.find((item) => {
    if (locale === "en") {
      return item.slugEn === slug || item.slug === slug;
    }
    return item.slug === slug;
  });
  return doc ? mapToNewsItem(doc, locale) : null;
}

export async function fetchPublishedSlugs(
  locale: Locale = "uk",
): Promise<string[]> {
  const items = await fetchPublishedNews(locale);
  return items.map((i) => i.slug);
}

export async function getNewsItemsWithFirebaseFallback(
  fallbackNews: NewsItem[],
  locale: Locale = "uk",
): Promise<(NewsItem & { paragraphs?: string[] })[]> {
  if (!isFirebaseConfigured()) {
    return fallbackNews.filter((n) => n.status === "ready");
  }
  return fetchPublishedNews(locale);
}

export async function getNewsItemWithFirebaseFallback(
  slug: string,
  fallbackNews: NewsItem[],
  locale: Locale = "uk",
): Promise<(NewsItem & { paragraphs?: string[] }) | undefined> {
  if (!isFirebaseConfigured()) {
    return fallbackNews.find((n) => n.slug === slug);
  }
  const item = await fetchPublishedNewsBySlug(slug, locale);
  return item ?? undefined;
}
