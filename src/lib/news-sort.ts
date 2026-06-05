import type { NewsItem } from "@/content/types";
import { compareNewsPublishedAtDesc } from "@/lib/news-published-at";

export const HOME_NEWS_COUNT = 3;

export type SortableNewsItem = Pick<NewsItem, "date" | "slug"> & {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
};

export function sortNewsByDateDesc<T extends SortableNewsItem>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    compareNewsPublishedAtDesc(
      {
        publishedAt: a.date,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        id: a.id,
      },
      {
        publishedAt: b.date,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
        id: b.id,
      },
    ),
  );
}
