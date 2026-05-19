import { NewsArticle } from "@/components/pages/NewsArticle";
import { getContent } from "@/content";

export function generateStaticParams() {
  return getContent("en").news.map((item) => ({ slug: item.slug }));
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticle locale="en" slug={slug} />;
}
