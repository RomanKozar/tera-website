import type { Locale } from "@/lib/site";
import { content as en } from "./en";
import { content as uk } from "./uk";
import type { SiteContent } from "./types";

const dictionaries: Record<Locale, SiteContent> = { uk, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export type { ContentStatus, NewsItem, PageContent, SiteContent } from "./types";
