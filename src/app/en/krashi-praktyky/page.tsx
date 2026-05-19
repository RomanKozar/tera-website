import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("en", "krashi-praktyky");

export default function Page() {
  return <ContentPage locale="en" pageKey="krashi-praktyky" />;
}
