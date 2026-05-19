import type { Metadata } from "next";
import { ContentPage } from "@/components/pages/ContentPage";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "statutni-organy");

export default function StatutniOrganyPage() {
  return <ContentPage locale="uk" pageKey="statutni-organy" />;
}
