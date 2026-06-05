export type NewsSortable = {
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
};

/** Дата з форми + час (при створенні — поточний, при редагуванні — збережений). */
export function buildNewsPublishedAt(
  day: number,
  month: number,
  year: number,
  existingPublishedAt?: string,
): string {
  const clock = existingPublishedAt ? new Date(existingPublishedAt) : new Date();
  const hours = Number.isNaN(clock.getTime()) ? new Date() : clock;

  return new Date(
    year,
    month - 1,
    day,
    hours.getHours(),
    hours.getMinutes(),
    hours.getSeconds(),
    hours.getMilliseconds(),
  ).toISOString();
}

export function compareNewsPublishedAtDesc(
  a: NewsSortable,
  b: NewsSortable,
): number {
  const byPublished =
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  if (byPublished !== 0) {
    return byPublished;
  }

  const byCreated = (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  if (byCreated !== 0) {
    return byCreated;
  }

  const byUpdated = (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
  if (byUpdated !== 0) {
    return byUpdated;
  }

  return (b.id ?? "").localeCompare(a.id ?? "");
}
