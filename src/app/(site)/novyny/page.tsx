import type { Metadata } from "next";
import { NewsList } from "@/components/pages/NewsList";
import { getContent } from "@/content";

export const metadata: Metadata = {
  title: getContent("uk").nav.news,
};

export default function NovynyPage() {
  return <NewsList locale="uk" />;
}
