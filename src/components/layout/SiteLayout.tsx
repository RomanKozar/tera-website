import { getContent } from "@/content";
import { getFooterNav, getMainNav } from "@/lib/navigation";
import { localePath, SITE, type Locale } from "@/lib/site";
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
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="sticky top-0 z-50 shadow-sm">
        <TopBar locale={locale} />
        <MainNav
          items={mainNav}
          menuLabel={menuLabel}
          homeHref={localePath(locale, "/")}
        />
      </div>
      <main className="relative z-0 flex-1 overflow-x-clip bg-white text-foreground">{children}</main>
      <SiteFooter
        locale={locale}
        footerNav={footerNav}
        copyright={copyright}
      />
    </div>
  );
}
