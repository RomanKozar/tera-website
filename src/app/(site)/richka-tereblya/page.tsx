import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "richka-tereblya");

export default function RichkaTereblyaPage() {
  return <ContentPage locale="uk" pageKey="richka-tereblya" />;
}
