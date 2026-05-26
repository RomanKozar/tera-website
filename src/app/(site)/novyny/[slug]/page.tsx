import { NewsArticle } from "@/components/pages/NewsArticle";
import { getContent } from "@/content";

export function generateStaticParams() {
  return getContent("uk").news.map((item) => ({ slug: item.slug }));
}

export const revalidate = 60;

export default async function NovynaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await NewsArticle({ locale: "uk", slug });
}
