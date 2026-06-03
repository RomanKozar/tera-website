import { NewsArticle } from "@/components/pages/NewsArticle";
import { getContent } from "@/content";
import { fetchPublishedSlugs } from "@/lib/firebase/news-server";

export async function generateStaticParams() {
  const firebaseSlugs = await fetchPublishedSlugs();
  const localSlugs = getContent("uk").news.map((item) => ({ slug: item.slug }));
  const seen = new Set<string>();
  const merged = [...firebaseSlugs.map((slug) => ({ slug })), ...localSlugs].filter(
    (entry) => {
      if (seen.has(entry.slug)) {
        return false;
      }
      seen.add(entry.slug);
      return true;
    },
  );
  return merged;
}

export const revalidate = 0;

export default async function NovynaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await NewsArticle({ locale: "uk", slug });
}
