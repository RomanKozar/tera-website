import { SiteLayout } from "@/components/layout/SiteLayout";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";

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
