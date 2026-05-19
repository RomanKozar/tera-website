import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "kontakty");

export default function KontaktyPage() {
  return <ContentPage locale="uk" pageKey="kontakty" />;
}
