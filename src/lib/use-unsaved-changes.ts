"use client";
import { useLayoutEffect } from "react";
export function useUnsavedChanges(dirty: boolean) {
  useLayoutEffect(() => {
    if (!dirty) return;
    window.__assessmentUnsavedNavigation = {
      url: window.location.href,
      state: window.history.state,
    };
    const unload = (event: BeforeUnloadEvent) => event.preventDefault();
    const navigate = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a[href]");
      if (
        anchor &&
        !anchor.getAttribute("href")?.startsWith("#") &&
        !window.confirm(
          "Leave this page? Changes since your last save will be lost.",
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", unload);
    document.addEventListener("click", navigate, true);
    return () => {
      delete window.__assessmentUnsavedNavigation;
      window.removeEventListener("beforeunload", unload);
      document.removeEventListener("click", navigate, true);
    };
  }, [dirty]);
}
