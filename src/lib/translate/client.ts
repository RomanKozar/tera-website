import type { JSONContent } from "@tiptap/core";
import type { NewsTranslationResult } from "./uk-to-en";

export async function fetchAutoEnglishTranslation(input: {
  title: string;
  excerpt: string;
  body: string;
  bodyJson: JSONContent;
}): Promise<NewsTranslationResult> {
  const response = await fetch("/api/translate-news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await response.json()) as NewsTranslationResult & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(
      data.error ?? "Не вдалося автоматично перекласти. Заповніть English вручну.",
    );
  }

  return data;
}

export function shouldAutoTranslateEnglish(
  titleEn: string,
  excerptEn: string,
  bodyEn: string,
): boolean {
  return !titleEn.trim() && !excerptEn.trim() && !bodyEn.trim();
}
