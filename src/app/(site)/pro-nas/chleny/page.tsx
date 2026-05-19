import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "chleny");

export default function ChlenyPage() {
  return <ContentPage locale="uk" pageKey="chleny" />;
}
