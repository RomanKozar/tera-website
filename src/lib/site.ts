import { getContent } from "@/content";
import { content as ukContent } from "@/content/uk";

export const SITE = {
  name: ukContent.site.name,
  fullName: ukContent.site.fullName,
  headerTitle: ukContent.site.headerTitle,
  shortName: ukContent.site.shortName,
  facebookUrl:
    "https://www.facebook.com/profile.php?id=61584037588588",
  contacts: {
    website: "http://www.aoms-tera.org",
    websiteLabel: "www.aoms-tera.org",
    phone: "+38 096 838 5300",
    phoneHref: "tel:+380968385300",
    email: "aomstera@gmail.com",
    address: ukContent.site.address,
  },
} as const;

/** Locale-aware organisation names and mailing address. */
export function getSiteMeta(locale: Locale) {
  const { site } = getContent(locale);
  return {
    ...SITE,
    name: site.name,
    fullName: site.fullName,
    headerTitle: site.headerTitle,
    shortName: site.shortName,
    contacts: {
      ...SITE.contacts,
      address: site.address,
    },
  };
}

export type Locale = "uk" | "en";

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "uk") return normalized === "/" ? "/" : normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export function switchLocalePath(currentLocale: Locale, pathname: string): string {
  const bare =
    currentLocale === "en" && pathname.startsWith("/en")
      ? pathname.slice(3) || "/"
      : pathname;
  const target: Locale = currentLocale === "uk" ? "en" : "uk";
  return localePath(target, bare);
}
