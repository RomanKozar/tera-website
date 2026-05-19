import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "maoms-tera");

export default function MaomsTeraPage() {
  return <ContentPage locale="uk" pageKey="maoms-tera" />;
}
