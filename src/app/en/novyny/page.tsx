import type { Metadata } from "next";
import { NewsList } from "@/components/pages/NewsList";
import { getContent } from "@/content";

export const metadata: Metadata = {
  title: getContent("en").nav.news,
};

export default function NewsPage() {
  return <NewsList locale="en" />;
}
