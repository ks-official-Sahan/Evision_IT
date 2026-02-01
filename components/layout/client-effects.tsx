"use client";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export function ClientEffects() {
  const [mods, setMods] = useState<{
    CursorFollower?: ComponentType;
  }>({});

  let coarse: boolean = false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    coarse = matchMedia("(pointer: coarse)").matches;

    const load = async () => {
      const [{ CursorFollower }] = await Promise.all([
        import("@/components/motion/cursor-follower"),
      ]);
      setMods({ CursorFollower });
    };

    if (!prefersReducedMotion) {
      let loaded = false;
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

      const events = ["pointerdown", "wheel", "keydown", "touchstart"] as const;

      const removeListeners = () => {
        events.forEach((t) =>
          window.removeEventListener(t, onFirstInteraction, {
            passive: true,
          } as EventListenerOptions),
        );
      };

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

  const { CursorFollower } = mods;
  return (
    <>
      {/* cursor follower only on non-coarse pointers – handled inside the component */}
      {CursorFollower && !coarse ? <CursorFollower /> : null}
    </>
  );
}
