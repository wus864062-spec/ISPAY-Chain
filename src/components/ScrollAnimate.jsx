"use client";

import { useEffect } from "react";

/**
 * WOW.js 风格滚动触发动画 - 全局注册器
 *
 * Hero 首屏内的元素已在 CSS 里设为直接可见（不走 data-wow 动画系统）
 * 这里只处理 AboutSection / ProjectsGrid / VideoSection 等非首屏板块
 *
 * 防重放：data-animated="1" 标记
 */
export default function ScrollAnimateRegistry({ offset = 80 }) {
  useEffect(() => {
    const trigger = (el) => {
      if (el.dataset.animated === "1") return;
      el.dataset.animated = "1";
      const delay = el.dataset.delay || "0";
      const duration = el.dataset.duration || "1000";
      el.style.setProperty("--wow-delay", `${delay}ms`);
      el.style.setProperty("--wow-duration", `${duration}ms`);
      el.classList.add("is-visible");
    };

    const check = () => {
      const all = document.querySelectorAll("[data-wow], [data-animate]");
      const viewportBottom = window.innerHeight + offset;

      all.forEach((el) => {
        if (el.dataset.animated === "1") return;
        // Hero 区域内的元素不参与（CSS 已让它们直接可见）
        if (el.closest(".main-slider")) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportBottom) {
          trigger(el);
        }
      });
    };

    // 初始检查
    const t1 = setTimeout(check, 100);
    const t2 = setTimeout(check, 500);
    const t3 = setTimeout(check, 1000);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", check, { passive: true });
      window.removeEventListener("resize", check);
    };
  }, [offset]);

  return null;
}
