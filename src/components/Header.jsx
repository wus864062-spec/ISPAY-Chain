"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { contact, navItems, socials } from "@/data/site";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcon from "./SocialIcon";

export default function Header() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-topbar text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 text-sm sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href={`mailto:${contact.email}`} className="hover:text-gold">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="hover:text-gold">
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-1 transition hover:text-gold"
                aria-label={item.id}
              >
                <SocialIcon name={item.id} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/logo.png"
            alt="ISPAY Chain"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
            priority
          />
          <span className="font-heading text-xl font-bold text-black sm:text-[26px]">
            ISPAY Chain
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[15px] font-medium capitalize lg:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="text-slate-800 hover:text-navy">
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="rounded-md border border-slate-200 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
        >
          <span className="block h-0.5 w-5 bg-black" />
          <span className="mt-1 block h-0.5 w-5 bg-black" />
          <span className="mt-1 block h-0.5 w-5 bg-black" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-base font-medium">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
