import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "nashi-proekty");

export default function NashiProektyPage() {
  return <ContentPage locale="uk" pageKey="nashi-proekty" />;
}
