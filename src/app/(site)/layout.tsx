import { SiteLayout } from "@/components/layout/SiteLayout";

export default function UkSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout locale="uk">{children}</SiteLayout>;
}
