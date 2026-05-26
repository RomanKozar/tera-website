import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import type { SiteContent } from "@/content/types";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export function getMainNav(locale: Locale, content: SiteContent): NavItem[] {
  const p = (path: string) => localePath(locale, path);

  return [
    {
      label: content.nav.about,
      href: p("/pro-nas"),
      children: [
        { label: content.nav.aboutMaoms, href: p("/pro-nas/maoms-tera") },
        { label: content.nav.aboutMembers, href: p("/pro-nas/chleny") },
        { label: content.nav.aboutStatutory, href: p("/pro-nas/statutni-organy") },
      ],
    },
    { label: content.nav.news, href: p("/novyny") },
    { label: content.nav.bestPractices, href: p("/krashi-praktyky") },
    { label: content.nav.grants, href: p("/konkursy-ta-granty") },
    { label: content.nav.projects, href: p("/nashi-proekty") },
    { label: content.nav.contacts, href: p("/kontakty") },
  ];
}

export function getFooterNav(locale: Locale, content: SiteContent): NavItem[] {
  const p = (path: string) => localePath(locale, path);

  return [
    { label: content.footer.home, href: p("/") },
    { label: content.footer.news, href: p("/novyny") },
    { label: content.footer.about, href: p("/pro-nas/maoms-tera") },
    { label: content.footer.river, href: p("/richka-tereblya") },
  ];
}
