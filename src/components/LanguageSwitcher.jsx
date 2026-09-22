"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/data/site";
import { usePathname, useRouter } from "@/i18n/navigation";

/* 旗帜图标：有国家代码用 flagcdn 方形小旗（与原站 GTranslate 一致），没有则显示地球图标 */
function Flag({ flag, className }) {
  if (!flag) {
    return (
      <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" fill="#fff" stroke="#9ca3af" strokeWidth="1.5" />
        <ellipse cx="10" cy="10" rx="4" ry="8.5" fill="none" stroke="#9ca3af" strokeWidth="1.2" />
        <path d="M1.5 10h17M10 1.5v17" stroke="#9ca3af" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/w20/${flag}.png`}
      srcSet={`https://flagcdn.com/w40/${flag}.png 2x`}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      className={className}
    />
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = locales.find((item) => item.code === locale) ?? locales[0];
  const others = locales.filter((item) => item.code !== locale);

  /* 点击外部或按 Esc 关闭 */
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      {/* 收起状态：浅灰背景 + 当前语言 + 方形小旗 */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className="flex h-[30px] w-[150px] items-center gap-2 rounded-[3px] border border-gray-300 bg-[#f5f5f5] px-2 text-[13px] text-gray-700 hover:bg-white"
      >
        <Flag flag={current.flag} className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate text-left">{current.label}</span>
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-1.5 w-2.5 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* 展开列表：白底 + 方形小旗 + 滚动条，样式与原站一致 */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 max-h-[260px] w-[160px] overflow-y-auto rounded-[3px] border border-gray-200 bg-white py-1 shadow-lg"
        >
          {others.map((item) => (
            <li key={item.code} role="option" aria-selected="false">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: item.code });
                }}
                className="flex w-full items-center gap-2 px-2 py-1 text-left text-[13px] text-gray-700 hover:bg-gray-100"
              >
                <Flag flag={item.flag} className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
