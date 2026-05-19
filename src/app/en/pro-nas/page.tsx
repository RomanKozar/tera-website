import type { Metadata } from "next";
import { AboutHub } from "@/components/pages/AboutHub";
import { pageMetadata } from "@/lib/pages";

export const metadata: Metadata = pageMetadata("en", "pro-nas");

export default function AboutPage() {
  return <AboutHub locale="en" />;
}
