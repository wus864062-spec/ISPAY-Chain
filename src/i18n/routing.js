import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs",
    "bg", "ca", "ceb", "ny", "zh", "zh-TW", "co", "hr", "cs", "da",
    "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka",
    "de", "el", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is",
    "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko",
    "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms",
    "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa",
    "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn",
    "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta",
    "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi",
    "yo", "zu",
  ],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});
