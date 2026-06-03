"use client";

import { useEffect } from "react";

function isProtectedImageTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target instanceof HTMLImageElement) return true;
  return target.closest("picture, [data-protected-image]") !== null;
}

export default function ImageProtection() {
  useEffect(() => {
    const block = (event: Event) => {
      if (isProtectedImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("copy", block);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("copy", block);
    };
  }, []);

  return null;
}
