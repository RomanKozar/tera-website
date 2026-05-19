import type { Metadata } from "next";
import { getContent } from "@/content";

export function pageMetadata(
  locale: "uk" | "en",
  pageKey: string,
): Metadata {
  const page = getContent(locale).pages[pageKey];
  return { title: page?.title ?? undefined };
}
