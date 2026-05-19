import { getContent } from "@/content";
import { getFooterNav, getMainNav } from "@/lib/navigation";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";
import { MainNav } from "./MainNav";
import { SiteFooter } from "./SiteFooter";
import { TopBar } from "./TopBar";

export function SiteLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const content = getContent(locale);
  const mainNav = getMainNav(locale, content);
  const footerNav = getFooterNav(locale, content);
  const menuLabel = locale === "uk" ? "Меню" : "Menu";
  const copyright =
    locale === "uk"
      ? `© ${new Date().getFullYear()} ${SITE.shortName}. Усі права захищені.`
      : `© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.`;

  return (
    <>
      <TopBar locale={locale} />
      <MainNav items={mainNav} menuLabel={menuLabel} />
      <main className="flex-1 bg-white text-foreground">{children}</main>
      <SiteFooter
        locale={locale}
        footerNav={footerNav}
        copyright={copyright}
      />
    </>
  );
}
