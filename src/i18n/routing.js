import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "af"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});
