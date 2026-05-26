import type { PortableTextBlock } from "sanity";
import type { ContentStatus, NewsItem } from "@/content/types";
import { sanityClient } from "./client";
import { newsBySlugQuery, newsListQuery } from "./queries";
import { urlForImage } from "./image";

type SanityImageSource = Parameters<typeof urlForImage>[0];
type SanityImage = SanityImageSource & {
  alt?: string;
};

export type SanityNewsItem = NewsItem & {
  body?: PortableTextBlock[];
  imageAlt?: string;
};

type SanityNewsDocument = {
  _id: string;
  title?: string;
  slug?: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: SanityImage;
  status?: string;
  body?: PortableTextBlock[];
};

export async function getNewsItemsWithFallback(
  fallbackNews: NewsItem[],
): Promise<SanityNewsItem[]> {
  const sanityNews = await fetchSanityNews();

  if (!sanityNews.length) {
    return fallbackNews;
  }

  return sanityNews.map((item, index) =>
    mapSanityNewsItem(item, fallbackNews[index % fallbackNews.length]),
  );
}

export async function getNewsItemWithFallback(
  slug: string,
  fallbackNews: NewsItem[],
): Promise<SanityNewsItem | undefined> {
  const sanityNews = await fetchSanityNewsItem(slug);

  if (sanityNews) {
    return mapSanityNewsItem(sanityNews, fallbackNews[0]);
  }

  return fallbackNews.find((item) => item.slug === slug);
}

function mapSanityNewsItem(
  item: SanityNewsDocument,
  fallback?: NewsItem,
): SanityNewsItem {
  const publishedAt = item.publishedAt || fallback?.date || new Date().toISOString();
  const image = item.mainImage
    ? urlForImage(item.mainImage).width(900).height(560).fit("crop").url()
    : fallback?.image || "";

  return {
    slug: item.slug || fallback?.slug || item._id,
    date: publishedAt,
    title: item.title || fallback?.title || "Без назви",
    excerpt: item.excerpt || fallback?.excerpt || "",
    image,
    imageAlt: item.mainImage?.alt,
    status: mapStatus(item.status),
    body: item.body,
  };
}

async function fetchSanityNews(): Promise<SanityNewsDocument[]> {
  try {
    return await sanityClient.fetch<SanityNewsDocument[]>(newsListQuery);
  } catch {
    return [];
  }
}

async function fetchSanityNewsItem(
  slug: string,
): Promise<SanityNewsDocument | null> {
  try {
    return await sanityClient.fetch<SanityNewsDocument | null>(newsBySlugQuery, {
      slug,
    });
  } catch {
    return null;
  }
}

function mapStatus(status: string | undefined): ContentStatus {
  return status === "published" ? "ready" : "draft";
}
