import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import af from "../../messages/af.json";
import en from "../../messages/en.json";
import zh from "../../messages/zh.json";
import { routing } from "./routing";

const catalogs = { en, zh, af };

export default getRequestConfig(async ({ requestLocale, locale }) => {
  const requested = locale ?? (await requestLocale);
  const resolved = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale: resolved,
    messages: catalogs[resolved],
  };
});
