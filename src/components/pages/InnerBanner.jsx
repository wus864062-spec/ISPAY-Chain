import { getTranslations } from "next-intl/server";
import Image from "next/image";

/* 内页顶部 banner：原始网站统一城市背景图 + 居中白色大标题 */
export default async function InnerBanner({ namespace, titleKey = "bannerTitle" }) {
  const t = await getTranslations(namespace);

  return (
    <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-navy sm:h-[380px] lg:h-[430px]">
      <Image src="/images/pages/inner-banner.webp" alt="" fill sizes="100vw" preload className="object-cover" />
      <h1 className="relative z-10 font-heading text-[28px] font-bold text-white sm:text-[36px] lg:text-[42px]"
      >
        {t(titleKey)}
      </h1>
    </section>
  );
}
