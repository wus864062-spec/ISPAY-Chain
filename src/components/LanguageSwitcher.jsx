"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/data/site";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher({ variant = "light" }) {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isDark = variant === "dark";

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className={isDark ? "text-white/80" : "text-slate-600"}>{t("language")}</span>
      <select
        value={locale}
        onChange={(event) => router.replace(pathname, { locale: event.target.value })}
        className={`rounded-md border px-2 py-1 text-sm outline-none ${
          isDark
            ? "border-white/20 bg-black/30 text-white"
            : "border-slate-200 bg-white text-slate-800"
        }`}
        aria-label={t("language")}
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
