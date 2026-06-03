export type FirebaseNewsStatus = "draft" | "published";

export type NewsImageItem = {
  url: string;
  path?: string;
  alt: string;
};

export type FirebaseNewsDoc = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Plain-text fallback / legacy */
  body: string;
  bodyJson?: Record<string, unknown> | null;
  bodyHtml?: string;
  publishedAt: string;
  status: FirebaseNewsStatus;
  /** @deprecated use images[0] — kept for older documents */
  imageUrl: string;
  imageAlt: string;
  images: NewsImageItem[];
  createdAt: string;
  updatedAt: string;
};

export type FirebaseNewsInput = Omit<
  FirebaseNewsDoc,
  "id" | "createdAt" | "updatedAt"
>;
