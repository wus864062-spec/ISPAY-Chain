import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="bg-white py-[81px]">
        {/* 原始网站容器 max-width: 80% */}
        <div className="mx-auto grid w-[80%] items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* 左图 - 原始网站 wow fadeInDown */}
          <div data-wow="fadeInDown" className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[386px]">
            <div className="aspect-[386/692] w-full overflow-hidden rounded-[20px] sm:rounded-[28px]">
              <Image
                src="/images/projects/social-med.webp"
                alt={t("title")}
                width={386}
                height={692}
                sizes="(max-width: 639px) 260px, (max-width: 1023px) 320px, 386px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 右文 - 原始网站 wow fadeInUp */}
          <div data-wow="fadeInUp" data-delay="200" className="text-left">
            <p className="font-heading text-[22px] font-semibold capitalize text-black sm:text-[26px] lg:text-[30px]">
              {t("eyebrow")}
            </p>
            <h3 className="font-heading mt-3 text-[22px] font-semibold leading-[1.3] capitalize text-black sm:mt-4 sm:text-[28px] lg:text-[35px]">
              {t("values")}
            </h3>
            <p className="mt-4 text-base leading-[1.8] text-secondary sm:mt-6 sm:text-lg">{t("intro")}</p>
            <p className="mt-4 text-base leading-[1.8] text-secondary sm:text-lg">{t("p1")}</p>
            <p className="mt-4 text-base leading-[1.8] text-secondary sm:text-lg">{t("p2")}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex rounded-[25px] bg-navy px-7 py-2 text-sm font-medium capitalize text-white transition hover:bg-black sm:mt-8 sm:px-8 sm:text-base"
            >
              {t("cta")}
            </Link>
          </div>
        </div>

        {/* 板块下方图片 */}
        <div className="mx-auto mt-10 w-[80%] px-4 sm:mt-12">
          <Image
            src="/images/projects/about-extra.webp"
            alt=""
            width={1535}
            height={263}
            sizes="64vw"
            className="mx-auto block h-auto w-[80%] rounded-[20px]"
          />
        </div>
    </section>
  );
}
