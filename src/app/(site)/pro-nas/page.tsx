import type { Metadata } from "next";
import { AboutHub } from "@/components/pages/AboutHub";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("uk", "pro-nas");

export default function ProNasPage() {
  return <AboutHub locale="uk" />;
}
