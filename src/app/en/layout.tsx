import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { content } from "@/content/en";

export const metadata: Metadata = {
  title: {
    default: content.site.shortName,
    template: `%s | ${content.site.shortName}`,
  },
  description: content.site.fullName,
};

export default function EnSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SetHtmlLang lang="en" />
      <SiteLayout locale="en">{children}</SiteLayout>
    </>
  );
}
