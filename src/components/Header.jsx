"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { contact, navItems, socials } from "@/data/site";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcon from "./SocialIcon";

/* 根据 href 拼语言前缀：首页 => /${locale}，其他页 => /${locale}${href} */
function localeHref(locale, href) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/* 首页链接用 replace（不新增历史），其他用默认 push（新增历史） */
function HomeLink({ href, onClick, children, className }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.location.replace(href);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

/* 普通导航链接：新开标签页打开，保留当前页 */
function NavLink({ href, onClick, children, className }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

/* 根据 item 是否首页，渲染对应 Link 组件 */
function SmartNavLink({ item, locale, onClick, children, className }) {
  const href = localeHref(locale, item.href);
  if (item.href === "/") {
    return (
      <HomeLink href={href} onClick={onClick} className={className}>
        {children}
      </HomeLink>
    );
  }
  return (
    <NavLink href={href} onClick={onClick} className={className}>
      {children}
    </NavLink>
  );
}

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  /* 目录打开时锁定背景滚动 */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-white shadow-sm">
      {/* topbar - 原始网站 wow fadeInDown */}
      <div data-wow="fadeInDown" className="relative bg-topbar text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 pr-4 text-center text-sm sm:text-base md:flex-row md:justify-between md:gap-4 md:pr-44 md:text-left">
          <a href={`mailto:${contact.email}`} className="md:flex-1 hover:text-gold">
            {contact.email}
          </a>
          <a href={contact.phoneHref} className="md:flex-1 md:text-center hover:text-gold">
            {contact.phone}
          </a>
          <div className="flex items-center justify-center gap-3 pt-1 md:flex-1 md:justify-end md:pt-0">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold"
                aria-label={item.id}
              >
                <SocialIcon name={item.id} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 语言切换器：钉屏模式，固定在屏幕右上角，滚动时始终可见（必须放在带 data-wow 动画的顶栏外，否则 will-change/transform 会让 fixed 失效跟随页面滚动） */}
      <div style={{ position: "fixed", top: "8px", right: "16px", zIndex: 50 }}>
        <LanguageSwitcher />
      </div>

      {/* menu-header - 原始网站 wow fadeInDown */}
      <div data-wow="fadeInDown" data-delay="150" className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-8 pb-10 lg:flex-row lg:justify-between lg:gap-6 lg:py-5">
        <SmartNavLink
          item={{ href: "/" }}
          locale={locale}
          className="flex items-center gap-10 sm:gap-3"
        >
          <Image
            src="/images/brand/logo.png"
            alt={t("brand")}
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full object-cover lg:h-[72px] lg:w-[72px]"
            priority
          />
          <span className="font-heading text-[28px] font-bold text-black">
            {t("brand")}
          </span>
        </SmartNavLink>

        <nav className="hidden flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-semibold text-black sm:gap-x-5 sm:text-[15px] lg:flex lg:text-base">
          {navItems.map((item) => (
            <SmartNavLink key={item.key} item={item} locale={locale} className="hover:text-navy">
              {t(item.key)}
            </SmartNavLink>
          ))}
        </nav>

        {/* 移动端目录按钮：原始网站缩小后显示 "="（两条横线），点击打开全屏目录 */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={t("openMenu")}
          aria-expanded={menuOpen}
          className="flex flex-col items-center justify-center gap-[10px] p-2 lg:hidden"
        >
          <span className="block h-[2px] w-7 bg-black" />
          <span className="block h-[2px] w-7 bg-black" />
        </button>
      </div>

      {/* 移动端全屏目录：点击 = 打开，点击 ✕ 或链接后关闭（与原始网站一致；z-40 低于语言切换器 z-50，切换器保持可见） */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={t("closeMenu")}
            className="absolute right-6 top-8 p-2 text-black"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>
          <nav className="flex flex-col items-start gap-[22px] px-8 pt-24 pb-10 text-lg font-semibold text-black">
            {navItems.map((item) => (
              <SmartNavLink
                key={item.key}
                item={item}
                locale={locale}
                onClick={() => setMenuOpen(false)}
                className="hover:text-navy"
              >
                {t(item.key)}
              </SmartNavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
