"use client";

import { ImageLightboxProvider } from "@/components/ui/image-lightbox/ImageLightboxProvider";
import type { LightboxLabels } from "@/components/ui/image-lightbox/types";

export function SiteShell({
  labels,
  children,
}: {
  labels: LightboxLabels;
  children: React.ReactNode;
}) {
  return (
    <ImageLightboxProvider labels={labels}>{children}</ImageLightboxProvider>
  );
}
