import { initializeApp, getApps } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { ContentStatus, NewsItem } from "@/content/types";
import { firebaseConfig, isFirebaseConfigured } from "./config";
import type { JSONContent } from "@tiptap/core";
import type { FirebaseNewsDoc, FirebaseNewsStatus } from "./news-types";
import { extractFirstImageSrc } from "@/lib/rich-text";

const COLLECTION = "news";

function getServerFirestore() {
  const app =
    getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
  return getFirestore(app);
}

function mapToNewsItem(docData: FirebaseNewsDoc): NewsItem & {
  paragraphs?: string[];
} {
  const bodyHtml = docData.bodyHtml?.trim();
  const bodyJson = docData.bodyJson as JSONContent | null | undefined;

  const paragraphs = bodyHtml
    ? undefined
    : docData.body
      ? docData.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
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

  return {
    slug: docData.slug,
    date: docData.publishedAt,
    title: docData.title,
    excerpt: docData.excerpt,
    image: first?.url ?? "",
    imageAlt: first?.alt || undefined,
    bodyHtml: bodyHtml || undefined,
    gallery: bodyHtml
      ? []
      : rest.map((img) => ({
          src: img.url,
          alt: img.alt || docData.title,
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

export async function fetchPublishedNews(): Promise<
  (NewsItem & { paragraphs?: string[] })[]
> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    const db = getServerFirestore();
    // Query must match Firestore Rules (only published readable without auth).
    const q = query(
      collection(db, COLLECTION),
      where("status", "==", "published"),
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => parseDoc(d.id, d.data()))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(mapToNewsItem);
  } catch (error) {
    console.error("[firebase] fetchPublishedNews failed:", error);
    return [];
  }
}

export async function fetchPublishedNewsBySlug(
  slug: string,
): Promise<(NewsItem & { paragraphs?: string[] }) | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }

  try {
    const db = getServerFirestore();
    const q = query(
      collection(db, COLLECTION),
      where("slug", "==", slug),
      where("status", "==", "published"),
    );
    const snap = await getDocs(q);
    const first = snap.docs[0];
    if (!first) {
      return null;
    }
    return mapToNewsItem(parseDoc(first.id, first.data()));
  } catch (error) {
    console.error("[firebase] fetchPublishedNewsBySlug failed:", error);
    return null;
  }
}

export async function fetchPublishedSlugs(): Promise<string[]> {
  const items = await fetchPublishedNews();
  return items.map((i) => i.slug);
}

export async function getNewsItemsWithFirebaseFallback(
  fallbackNews: NewsItem[],
): Promise<(NewsItem & { paragraphs?: string[] })[]> {
  const firebaseNews = await fetchPublishedNews();
  if (firebaseNews.length > 0) {
    return firebaseNews;
  }
  return fallbackNews.filter((n) => n.status === "ready");
}

export async function getNewsItemWithFirebaseFallback(
  slug: string,
  fallbackNews: NewsItem[],
): Promise<(NewsItem & { paragraphs?: string[] }) | undefined> {
  const item = await fetchPublishedNewsBySlug(slug);
  if (item) {
    return item;
  }
  return fallbackNews.find((n) => n.slug === slug);
}
