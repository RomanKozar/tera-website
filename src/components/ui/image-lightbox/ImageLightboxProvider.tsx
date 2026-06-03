"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ImageLightboxOverlay } from "./ImageLightboxOverlay";
import type { LightboxImage, LightboxLabels } from "./types";

type GroupRegistry = Map<string, Map<number, LightboxImage>>;

type LightboxContextValue = {
  register: (groupId: string, index: number, image: LightboxImage) => void;
  unregister: (groupId: string, index: number) => void;
  open: (groupId: string, index: number) => void;
  labels: LightboxLabels;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

function getGroupImages(registry: GroupRegistry, groupId: string): LightboxImage[] {
  const group = registry.get(groupId);
  if (!group) return [];
  return [...group.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, image]) => image);
}

function registryIndexToArrayIndex(
  registry: GroupRegistry,
  groupId: string,
  registryIndex: number,
): number {
  const entries = [...(registry.get(groupId)?.entries() ?? [])].sort(
    ([a], [b]) => a - b,
  );
  return entries.findIndex(([i]) => i === registryIndex);
}

export function ImageLightboxProvider({
  labels,
  children,
}: {
  labels: LightboxLabels;
  children: ReactNode;
}) {
  const [registry] = useState<GroupRegistry>(() => new Map());
  const [active, setActive] = useState<{
    groupId: string;
    arrayIndex: number;
  } | null>(null);
  const [, bump] = useState(0);

  const register = useCallback(
    (groupId: string, index: number, image: LightboxImage) => {
      let group = registry.get(groupId);
      if (!group) {
        group = new Map();
        registry.set(groupId, group);
      }
      group.set(index, image);
      bump((n) => n + 1);
    },
    [registry],
  );

  const unregister = useCallback(
    (groupId: string, index: number) => {
      const group = registry.get(groupId);
      if (!group) return;
      group.delete(index);
      if (group.size === 0) registry.delete(groupId);
      bump((n) => n + 1);
    },
    [registry],
  );

  const open = useCallback(
    (groupId: string, index: number) => {
      const arrayIndex = registryIndexToArrayIndex(registry, groupId, index);
      if (arrayIndex < 0) return;
      setActive({ groupId, arrayIndex });
    },
    [registry],
  );

  const close = useCallback(() => setActive(null), []);

  const images = active ? getGroupImages(registry, active.groupId) : [];
  const openIndex = active?.arrayIndex ?? null;

  const goPrev = useCallback(() => {
    if (!active || images.length < 2) return;
    setActive({
      groupId: active.groupId,
      arrayIndex: (active.arrayIndex - 1 + images.length) % images.length,
    });
  }, [active, images.length]);

  const goNext = useCallback(() => {
    if (!active || images.length < 2) return;
    setActive({
      groupId: active.groupId,
      arrayIndex: (active.arrayIndex + 1) % images.length,
    });
  }, [active, images.length]);

  const value = useMemo(
    () => ({ register, unregister, open, labels }),
    [register, unregister, open, labels],
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <ImageLightboxOverlay
        images={images}
        openIndex={openIndex}
        onClose={close}
        onPrev={goPrev}
        onNext={goNext}
        labels={labels}
      />
    </LightboxContext.Provider>
  );
}

export function useImageLightboxOptional() {
  return useContext(LightboxContext);
}
