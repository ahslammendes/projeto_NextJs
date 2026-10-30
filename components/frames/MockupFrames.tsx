"use client";

import React from "react";
import { useMockupStore, ShadowSize } from "@/store/useMockupStore";
import { cn } from "@/lib/utils";

export const SHADOW_CLASSES: Record<ShadowSize, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

export interface FrameProps {
  image: string;
}

export function IphoneFrame({ image }: FrameProps) {
  const shadow = useMockupStore((state) => state.shadow);
  const borderRadius = useMockupStore((state) => state.borderRadius);

  return (
    <div
      className={cn(
        "relative flex max-h-full max-w-[300px] flex-col overflow-hidden rounded-[44px] border-[10px] border-neutral-950 bg-neutral-950 ring-1 ring-white/20 transition-all",
        SHADOW_CLASSES[shadow]
      )}
    >
      {/* Notch falso (div preta absoluta no topo) */}
      <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

      <div className="overflow-hidden rounded-[34px] bg-black">
        <img
          src={image}
          alt="iPhone Mockup"
          style={{ borderRadius: `${borderRadius}px` }}
          className="block max-h-[460px] w-full object-cover transition-all"
        />
      </div>
    </div>
  );
}

export function BrowserFrame({ image }: FrameProps) {
  const shadow = useMockupStore((state) => state.shadow);
  const borderRadius = useMockupStore((state) => state.borderRadius);

  return (
    <div
      className={cn(
        "flex max-h-full max-w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-slate-900 transition-all",
        SHADOW_CLASSES[shadow]
      )}
    >
      {/* Barra superior com 3 bolinhas (Mac style) e barra de endereço */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-slate-900/95 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto flex h-6 flex-1 max-w-xs items-center justify-center rounded-md bg-slate-800 px-3 text-[11px] font-medium text-slate-400">
          https://mockupsnap.app
        </div>
        <div className="w-10" />
      </div>

      <div className="overflow-hidden bg-slate-950">
        <img
          src={image}
          alt="Browser Mockup"
          style={{ borderRadius: `${borderRadius}px` }}
          className="block max-h-[440px] w-full object-contain transition-all"
        />
      </div>
    </div>
  );
}

export function MacbookFrame({ image }: FrameProps) {
  const shadow = useMockupStore((state) => state.shadow);
  const borderRadius = useMockupStore((state) => state.borderRadius);

  return (
    <div className="flex max-h-full max-w-full flex-col items-center">
      {/* Tela do MacBook */}
      <div
        className={cn(
          "relative overflow-hidden rounded-t-2xl border-[8px] border-b-[10px] border-neutral-950 bg-neutral-950 ring-1 ring-white/20 transition-all",
          SHADOW_CLASSES[shadow]
        )}
      >
        {/* Notch superior da câmera */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 flex h-3 w-20 -translate-x-1/2 items-center justify-center rounded-b-md bg-neutral-950">
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        </div>
        <img
          src={image}
          alt="MacBook Mockup"
          style={{ borderRadius: `${borderRadius}px` }}
          className="block max-h-[420px] w-full object-contain transition-all"
        />
      </div>

      {/* Base de alumínio do MacBook */}
      <div
        className={cn(
          "relative h-3.5 w-[108%] rounded-b-xl rounded-t-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500",
          SHADOW_CLASSES[shadow]
        )}
      >
        <div className="mx-auto h-1.5 w-16 rounded-b-md bg-slate-600/80" />
      </div>
    </div>
  );
}

export function NoneFrame({ image }: FrameProps) {
  const shadow = useMockupStore((state) => state.shadow);
  const borderRadius = useMockupStore((state) => state.borderRadius);

  return (
    <div
      style={{ borderRadius: `${borderRadius}px` }}
      className={cn("overflow-hidden transition-all", SHADOW_CLASSES[shadow])}
    >
      <img
        src={image}
        alt="Mockup sem moldura"
        style={{ borderRadius: `${borderRadius}px` }}
        className="block max-h-[480px] w-full object-contain transition-all"
      />
    </div>
  );
}
