"use client";

import { useTranslations } from "next-intl";
import { footerLinks, navItems, socials } from "@/data/site";
import { Link } from "@/i18n/navigation";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const tHeader = useTranslations("header");
  const t = useTranslations("footer");

  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto grid w-[80%] grid-cols-1 gap-10 px-4 py-10 text-center sm:py-14 md:grid-cols-3 md:gap-8 md:text-left lg:grid-cols-12 lg:py-16">
        {/* 品牌栏 */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center">
            <span className="font-heading text-[28px] font-bold uppercase">{t("brand")}</span>
          </Link>
          <p className="mt-8 text-sm leading-7 text-white/80 sm:text-lg">{t("tagline")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#05085b]"
                aria-label={item.id}
              >
                <SocialIcon name={item.id} />
              </a>
            ))}
          </div>
        </div>

        {/* 快速链接栏 */}
        <div className="lg:col-span-3">
          <h3 className="text-[26px] font-bold">{t("quickLinks")}</h3>
          <ul className="mt-8 space-y-3 text-lg text-white">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-gold">
                  {tHeader(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 链接栏 */}
        <div className="lg:col-span-5">
          <h3 className="text-[26px] font-bold">{t("links")}</h3>
          <ul className="mt-8 space-y-3 text-lg text-white">
            {footerLinks.map((item) => (
              <li key={item.key}>
                {item.internal ? (
                  <Link href={item.href} className="hover:text-gold">
                    {t(item.key)}
                  </Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-gold">
                    {t(item.key)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/70 sm:py-5 sm:text-base">
        {t("copyright")}
      </div>
    </footer>
  );
}
