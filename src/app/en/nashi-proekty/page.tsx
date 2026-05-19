import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("en", "nashi-proekty");

export default function Page() {
  return <ContentPage locale="en" pageKey="nashi-proekty" />;
}
