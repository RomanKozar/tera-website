import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "krashi-praktyky");

export default function KrashiPraktykyPage() {
  return <ContentPage locale="uk" pageKey="krashi-praktyky" />;
}
