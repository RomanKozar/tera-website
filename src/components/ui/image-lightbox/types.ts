import type { Locale } from "@/lib/site";

export type LightboxImage = { src: string; alt: string };

export type LightboxLabels = {
  close: string;
  previous: string;
  next: string;
  openHint: string;
  counterOf: string;
  locale: Locale;
};
