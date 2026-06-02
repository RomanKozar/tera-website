const UKRAINIAN_MAP: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ye",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "yi",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "yu",
  я: "ya",
  "'": "",
  "’": "",
  "«": "",
  "»": "",
  '"': "",
  ":": "",
};

function transliterateUkrainian(text: string): string {
  return [...text.toLowerCase()]
    .map((char) => UKRAINIAN_MAP[char] ?? char)
    .join("");
}

/** URL slug from a page or news title (Latin, hyphen-separated). */
export function slugifyTitle(title: string, locale: "uk" | "en" = "uk"): string {
  const raw =
    locale === "uk" ? transliterateUkrainian(title) : title.toLowerCase();

  return raw
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}
