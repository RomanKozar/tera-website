import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("en", "statutni-organy");

export default function Page() {
  return <ContentPage locale="en" pageKey="statutni-organy" />;
}
