import { NewsArticle } from "@/components/pages/NewsArticle";
import { getContent } from "@/content";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { fetchPublishedSlugs } from "@/lib/firebase/news-server";

export async function generateStaticParams() {
  if (isFirebaseConfigured()) {
    const slugs = await fetchPublishedSlugs();
    return slugs.map((slug) => ({ slug }));
  }
  return getContent("en").news.map((item) => ({ slug: item.slug }));
}

export const dynamic = "force-dynamic";

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await NewsArticle({ locale: "en", slug });
}
