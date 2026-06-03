import type { JSONContent } from "@tiptap/core";

export const MAX_INLINE_IMAGES = 5;

/** Ширина тексту новини на сайті — фото за замовчуванням підлаштовуються під неї */
export const NEWS_CONTENT_IMAGE_MAX_WIDTH = 720;
export const IMAGE_ROW_GAP_PX = 16;
export const IMAGES_PER_ROW = 2;

/** Ширина одного фото в рядку з N зображень */
export function computeImageRowCellWidth(
  count = IMAGES_PER_ROW,
  totalWidth = NEWS_CONTENT_IMAGE_MAX_WIDTH,
  gap = IMAGE_ROW_GAP_PX,
): number {
  const slots = Math.max(1, count);
  return Math.floor((totalWidth - gap * (slots - 1)) / slots);
}

export function computeDefaultImageDimensions(
  naturalWidth: number,
  naturalHeight: number,
  maxWidth = NEWS_CONTENT_IMAGE_MAX_WIDTH,
): { width: number; height: number } {
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    return { width: maxWidth, height: Math.round(maxWidth * 0.5625) };
  }
  if (naturalWidth <= maxWidth) {
    return { width: naturalWidth, height: naturalHeight };
  }
  const height = Math.round((naturalHeight * maxWidth) / naturalWidth);
  return { width: maxWidth, height };
}

/** Розмір для фото в спільному рядку (2 поруч) */
export function computeImageRowCellDimensions(
  naturalWidth: number,
  naturalHeight: number,
  count = IMAGES_PER_ROW,
): { width: number; height: number } {
  return computeDefaultImageDimensions(
    naturalWidth,
    naturalHeight,
    computeImageRowCellWidth(count),
  );
}

export function emptyEditorDoc(): JSONContent {
  return { type: "doc", content: [{ type: "paragraph" }] };
}

export function plainTextToEditorDoc(text: string): JSONContent {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return emptyEditorDoc();
  }

  return {
    type: "doc",
    content: paragraphs.map((paragraph) => ({
      type: "paragraph",
      content: [{ type: "text", text: paragraph }],
    })),
  };
}

export function paragraphsToEditorDoc(paragraphs: string[]): JSONContent {
  return plainTextToEditorDoc(paragraphs.join("\n\n"));
}

export function countImagesInDoc(doc: JSONContent | null | undefined): number {
  if (!doc) {
    return 0;
  }

  let count = 0;

  function walk(node: JSONContent) {
    if (node.type === "image") {
      count += 1;
    }
    node.content?.forEach(walk);
  }

  walk(doc);
  return count;
}

export function extractFirstImageSrc(
  doc: JSONContent | null | undefined,
  html?: string,
): string | undefined {
  if (doc) {
    let found: string | undefined;

    function walk(node: JSONContent) {
      if (found) {
        return;
      }
      if (node.type === "image" && typeof node.attrs?.src === "string") {
        found = node.attrs.src;
        return;
      }
      node.content?.forEach(walk);
    }

    walk(doc);
    if (found) {
      return found;
    }
  }

  if (html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match?.[1];
  }

  return undefined;
}
