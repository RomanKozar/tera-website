import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "konkursy-ta-granty");

export default function KonkursyPage() {
  return <ContentPage locale="uk" pageKey="konkursy-ta-granty" />;
}
