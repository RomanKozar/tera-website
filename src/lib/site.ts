export const SITE = {
  name: "ТеРА",
  fullName:
    "Місцева Асоціація органів місцевого самоврядування Тереблянської долини «ТеРА»",
  headerTitle:
    "МІСЦЕВА АСОЦІАЦІЯ ОРГАНІВ МІСЦЕВОГО САМОВРЯДУВАННЯ ТЕРЕБЛЯНСЬКОЇ ДОЛИНИ «ТеРА»",
  shortName: "МАОМС «ТеРА»",
  facebookUrl:
    "https://www.facebook.com/profile.php?id=61584037588588",
  contacts: {
    address: "с. Теребля, вул. Центральна, 1, Закарпатська область",
    phone: "+38 (067) 123-45-67",
    email: "info@tera.org.ua",
  },
} as const;

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
