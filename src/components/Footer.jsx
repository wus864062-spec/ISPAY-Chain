"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { contact, footerLinks, navItems, socials } from "@/data/site";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const tHeader = useTranslations("header");
  const t = useTranslations("footer");

  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/brand/logo.png"
              alt="ISPAY Chain"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-heading text-xl font-bold uppercase">{t("brand")}</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-white/80">{t("tagline")}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#C12122]"
                aria-label={item.id}
              >
                <SocialIcon name={item.id} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-gold">
                  {tHeader(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{t("links")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
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

        <div className="space-y-4">
          <a href={`mailto:${contact.email}`} className="block text-sm hover:text-gold">
            {contact.email}
          </a>
          <a href={contact.phoneHref} className="block text-sm hover:text-gold">
            {contact.phone}
          </a>
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/70">
        {t("copyright")}
      </div>
    </footer>
  );
}
