"use client";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export function ClientEffects() {
  const [mods, setMods] = useState<{
    BackgroundRippleEffect?: ComponentType;
    CursorFollower?: ComponentType;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = matchMedia("(pointer: coarse)").matches;

    const load = async () => {
      const [{ CursorFollower }, { BackgroundRippleEffect }] =
        await Promise.all([
          import("@/components/motion/cursor-follower"),
          import("@/components/ui/background-ripple-effect"),
        ]);
      setMods({ BackgroundRippleEffect, CursorFollower });
    };

    // Idle or first interaction — whichever comes first
    const onFirstInteraction = () => {
      removeListeners();
      load();
    };
    const removeListeners = () => {
      ["pointerdown", "wheel", "keydown", "touchstart"].forEach((t) =>
        window.removeEventListener(t, onFirstInteraction, {
          passive: true,
        } as any),
      );
    };

    if (!prefersReducedMotion) {
      let loaded = false;
      const useRequestIdleCallback =
        typeof (window as any).requestIdleCallback === "function";
      const rIC =
        (window as any).requestIdleCallback ||
        ((cb: any) => setTimeout(cb, 300));
      const cIC =
        (window as any).cancelIdleCallback || ((id: any) => clearTimeout(id));

      let scheduledCallbackId: number | undefined;

      const wrappedLoad = () => {
        if (loaded) return;
        loaded = true;
        load();
      };

      scheduledCallbackId = rIC(wrappedLoad);

      const onFirstInteraction = () => {
        removeListeners();
        if (scheduledCallbackId !== undefined) {
          cIC(scheduledCallbackId);
        }
        wrappedLoad();
      };

      ["pointerdown", "wheel", "keydown", "touchstart"].forEach((t) =>
        window.addEventListener(t, onFirstInteraction, {
          passive: true,
        } as any),
      );
      return () => {
        removeListeners();
        if (scheduledCallbackId !== undefined) {
          cIC(scheduledCallbackId);
        }
      };
    }
  }, []);

  const { CursorFollower, BackgroundRippleEffect } = mods;
  return (
    <>
      {/* cursor follower only on non-coarse pointers – handled inside the component */}
      {CursorFollower ? <CursorFollower /> : null}
      {BackgroundRippleEffect ? <BackgroundRippleEffect /> : null}
    </>
  );
}
