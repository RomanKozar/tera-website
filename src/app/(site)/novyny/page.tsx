import type { Metadata } from "next";
import { NewsList } from "@/components/pages/NewsList";
import { getContent } from "@/content";

export const metadata: Metadata = {
  title: getContent("uk").nav.news,
};

export const revalidate = 60;

export default async function NovynyPage() {
  return <NewsList locale="uk" />;
}
