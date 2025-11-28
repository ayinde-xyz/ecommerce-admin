import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia(query).matches;
    } catch (e) {
      return false;
    }
  };

  const subscribe = (notify: () => void) => {
    if (typeof window === "undefined") return () => {};

    const mql = window.matchMedia(query);
    const handler = () => notify();

    // Prefer the modern API but fall back to legacy listeners for older browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler as EventListener);
      return () => mql.removeEventListener("change", handler as EventListener);
    }

    // @ts-ignore - legacy API
    mql.addListener(handler);
    // @ts-ignore - legacy API
    return () => mql.removeListener(handler);
  };

  // useSyncExternalStore handles subscription lifecycles without useEffect
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
