export const MAX_NEWS_IMAGES = 5;
export const MAX_NEWS_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/avif",
]);

const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|bmp|avif)$/i;

export function isAllowedImageFile(file: File): boolean {
  if (ALLOWED_MIME.has(file.type)) {
    return true;
  }
  return ALLOWED_EXT.test(file.name);
}

export function validateImageFile(file: File): string | null {
  if (!isAllowedImageFile(file)) {
    return `«${file.name}» — не зображення. Дозволені: JPG, PNG, WebP, GIF.`;
  }
  if (file.size > MAX_NEWS_IMAGE_BYTES) {
    return `«${file.name}» занадто великий (макс. 10 МБ).`;
  }
  return null;
}

export async function readImageFileDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const size = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return size;
}

export async function convertFileToWebp(
  file: File,
  quality = 0.85,
): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const maxDim = 2400;
  let { width, height } = bitmap;

  if (width > maxDim || height > maxDim) {
    const ratio = Math.min(maxDim / width, maxDim / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Не вдалося обробити зображення.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", quality);
  });

  if (!blob) {
    throw new Error("Не вдалося конвертувати у WebP.");
  }

  const baseName = file.name.replace(/\.[^.]+$/i, "") || "photo";
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
