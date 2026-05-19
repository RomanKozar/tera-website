import { NewsArticle } from "@/components/pages/NewsArticle";
import { getContent } from "@/content";

export function generateStaticParams() {
  return getContent("uk").news.map((item) => ({ slug: item.slug }));
}

export default async function NovynaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticle locale="uk" slug={slug} />;
}
