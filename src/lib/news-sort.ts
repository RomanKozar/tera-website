import type { NewsItem } from "@/content/types";

export const HOME_NEWS_COUNT = 3;

export function sortNewsByDateDesc<T extends Pick<NewsItem, "date">>(
  items: T[],
): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
