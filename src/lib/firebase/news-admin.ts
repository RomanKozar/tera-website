"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getClientFirestore, getClientStorage } from "./client";
import type {
  FirebaseNewsDoc,
  FirebaseNewsInput,
  NewsImageItem,
} from "./news-types";

const COLLECTION = "news";

function parseImages(data: Record<string, unknown>): NewsImageItem[] {
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
        const item: NewsImageItem = {
          url,
          alt: String(img.alt ?? ""),
        };
        if (img.path) {
          item.path = String(img.path);
        }
        return item;
      })
      .filter((x): x is NewsImageItem => x !== null);
  }

  const legacyUrl = String(data.imageUrl ?? "");
  if (legacyUrl) {
    return [
      {
        url: legacyUrl,
        alt: String(data.imageAlt ?? ""),
      },
    ];
  }

  return [];
}

function syncLegacyImageFields(images: NewsImageItem[]) {
  const first = images[0];
  return {
    imageUrl: first?.url ?? "",
    imageAlt: first?.alt ?? "",
    images,
  };
}

function parseDoc(id: string, data: Record<string, unknown>): FirebaseNewsDoc {
  const images = parseImages(data);
  const legacy = syncLegacyImageFields(images);

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
    status: data.status === "published" ? "published" : "draft",
    ...legacy,
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

export function normalizeNewsInput(
  input: Partial<FirebaseNewsInput> & { images?: NewsImageItem[] },
): Partial<FirebaseNewsInput> {
  if (!input.images) {
    return input;
  }
  return { ...input, ...syncLegacyImageFields(input.images) };
}

export async function listAllNewsAdmin(): Promise<FirebaseNewsDoc[]> {
  const db = getClientFirestore();
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs
    .map((d) => parseDoc(d.id, d.data() as Record<string, unknown>))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listAllNewsAdminWithTimeout(
  ms = 12000,
): Promise<FirebaseNewsDoc[]> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), ms);
  });
  return Promise.race([listAllNewsAdmin(), timeout]);
}

export async function getNewsByIdAdmin(
  id: string,
): Promise<FirebaseNewsDoc | null> {
  const db = getClientFirestore();
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) {
    return null;
  }
  return parseDoc(snap.id, snap.data());
}

export async function createNewsAdmin(
  input: FirebaseNewsInput,
): Promise<string> {
  const db = getClientFirestore();
  const payload = normalizeNewsInput(input) as FirebaseNewsInput;
  const ref = await addDoc(collection(db, COLLECTION), {
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateNewsAdmin(
  id: string,
  input: Partial<FirebaseNewsInput>,
): Promise<void> {
  const db = getClientFirestore();
  const payload = normalizeNewsInput(input);
  await updateDoc(doc(db, COLLECTION, id), {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteNewsAdmin(id: string): Promise<void> {
  const db = getClientFirestore();
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function uploadNewsImage(
  newsId: string,
  file: File,
): Promise<{ url: string; path: string }> {
  const storage = getClientStorage();
  const path = `news/${newsId}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.webp`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: "image/webp" });
  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deleteStoragePath(path: string): Promise<void> {
  if (!path) {
    return;
  }
  const storage = getClientStorage();
  await deleteObject(ref(storage, path)).catch(() => undefined);
}

export function slugifyTitle(title: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ie",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "i",
    й: "i",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "iu",
    я: "ia",
  };

  return title
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
