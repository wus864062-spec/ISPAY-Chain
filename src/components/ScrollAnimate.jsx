"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimateRegistry() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add("is-visible");
        observer.unobserve(target);
      });
    });

    const elements = document.querySelectorAll("[data-wow]");
    elements.forEach((element) => {
      // Never hide visible content when hydration completes.
      if (element.closest(".main-slider") || element.getBoundingClientRect().top < window.innerHeight) return;
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("is-visible"));
    };
  }, [pathname]);

  return null;
}
