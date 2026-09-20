"use client";

import { useTranslations } from "next-intl";
import { contact } from "@/data/site";
import SocialIcon from "./SocialIcon";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");

  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-white shadow-[0_1px_6px_rgba(0,0,0,0.06),0_2px_32px_rgba(0,0,0,0.16)] transition hover:scale-[1.03]"
    >
      <SocialIcon name="whatsapp" className="h-6 w-6" />
      <span className="hidden text-[18px] font-medium sm:inline">{t("label")}</span>
    </a>
  );
}
