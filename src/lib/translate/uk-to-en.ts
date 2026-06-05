import type { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";

const MYMEMORY_CHUNK = 450;
const REQUEST_DELAY_MS = 200;

const TIPTAP_EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Image,
  Link,
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitForTranslation(text: string, maxLen = MYMEMORY_CHUNK): string[] {
  const normalized = text.trim();
  if (!normalized) {
    return [];
  }
  if (normalized.length <= maxLen) {
    return [normalized];
  }

  const parts = normalized.split(/(\n\n+)/);
  const chunks: string[] = [];
  let current = "";

  for (const part of parts) {
    if (!part) {
      continue;
    }
    if (`${current}${part}`.length <= maxLen) {
      current += part;
      continue;
    }
    if (current.trim()) {
      chunks.push(current.trim());
    }
    if (part.length <= maxLen) {
      current = part;
    } else {
      for (let i = 0; i < part.length; i += maxLen) {
        chunks.push(part.slice(i, i + maxLen).trim());
      }
      current = "";
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.filter(Boolean);
}

async function translateWithDeepL(text: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      text,
      source_lang: "UK",
      target_lang: "EN-US",
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepL error: ${response.status}`);
  }

  const data = (await response.json()) as {
    translations?: { text: string }[];
  };
  return data.translations?.[0]?.text?.trim() ?? "";
}

async function translateWithMyMemory(text: string): Promise<string> {
  const chunks = splitForTranslation(text);
  const translated: string[] = [];

  for (const chunk of chunks) {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", chunk);
    url.searchParams.set("langpair", "uk|en");

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": "tera-website/1.0" },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`MyMemory error: ${response.status}`);
    }

    const data = (await response.json()) as {
      responseData?: { translatedText?: string };
      responseStatus?: number;
      quotaFinished?: boolean;
    };

    if (data.quotaFinished) {
      throw new Error("Translation quota exceeded. Add DEEPL_AUTH_KEY or try later.");
    }

    const piece = data.responseData?.translatedText?.trim();
    if (!piece) {
      throw new Error("Empty translation response.");
    }

    translated.push(piece);
    if (chunks.length > 1) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return translated.join(chunks.length > 1 ? "\n\n" : "");
}

export async function translateUkToEn(text: string): Promise<string> {
  const input = text.trim();
  if (!input) {
    return "";
  }

  const deeplKey = process.env.DEEPL_AUTH_KEY?.trim();
  if (deeplKey) {
    const chunks = splitForTranslation(input, 3000);
    const parts: string[] = [];
    for (const chunk of chunks) {
      parts.push(await translateWithDeepL(chunk, deeplKey));
      if (chunks.length > 1) {
        await sleep(100);
      }
    }
    return parts.join(chunks.length > 1 ? "\n\n" : "");
  }

  return translateWithMyMemory(input);
}

async function translateJsonNode(node: JSONContent): Promise<JSONContent> {
  const next: JSONContent = { ...node };

  if (node.type === "text" && typeof node.text === "string" && node.text.trim()) {
    next.text = await translateUkToEn(node.text);
  }

  if (node.type === "image" && node.attrs && typeof node.attrs.alt === "string") {
    const alt = node.attrs.alt.trim();
    if (alt) {
      next.attrs = {
        ...node.attrs,
        alt: await translateUkToEn(alt),
      };
    }
  }

  if (node.content?.length) {
    next.content = await Promise.all(node.content.map(translateJsonNode));
  }

  return next;
}

export async function translateEditorJson(
  json: JSONContent,
): Promise<JSONContent> {
  return translateJsonNode(json);
}

export function editorJsonToHtml(json: JSONContent): string {
  return generateHTML(json, TIPTAP_EXTENSIONS);
}

export type NewsTranslationInput = {
  title: string;
  excerpt: string;
  body: string;
  bodyJson?: JSONContent | null;
};

export type NewsTranslationResult = {
  titleEn: string;
  excerptEn: string;
  bodyEn: string;
  bodyJsonEn: Record<string, unknown> | null;
  bodyHtmlEn: string;
};

export async function translateNewsToEnglish(
  input: NewsTranslationInput,
): Promise<NewsTranslationResult> {
  const titleEn = await translateUkToEn(input.title);
  const excerptEn = input.excerpt.trim()
    ? await translateUkToEn(input.excerpt)
    : "";
  const bodyEn = await translateUkToEn(input.body);

  let bodyJsonEn: JSONContent | null = null;
  let bodyHtmlEn = "";

  if (input.bodyJson && typeof input.bodyJson === "object") {
    bodyJsonEn = await translateEditorJson(input.bodyJson);
    bodyHtmlEn = editorJsonToHtml(bodyJsonEn);
  } else if (bodyEn) {
    bodyHtmlEn = bodyEn
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  return {
    titleEn,
    excerptEn,
    bodyEn,
    bodyJsonEn: bodyJsonEn as Record<string, unknown> | null,
    bodyHtmlEn,
  };
}
