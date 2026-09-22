import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";

/* 领导页：按原始网站编排（标题 + 总裁照片 + 署名 + 长文） */
export default async function Leadership() {
  const t = await getTranslations("pages.leadership");
  const paragraphs = ["p1", "p2", "p3", "p4", "p5", "p6"];

  return (
    <>
      <InnerBanner namespace="pages.leadership" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 data-wow="fadeInUp" className="font-heading text-[24px] font-bold text-black sm:text-[28px]">
            {t("heading")}
          </h2>
          <img
            data-wow="fadeInUp"
            src="/images/pages/Mam.jpeg"
            alt={t("name")}
            className="mx-auto mt-8 w-full max-w-md rounded-[16px]"
          />
          <h3 data-wow="fadeInUp" className="mt-6 text-center font-heading text-[20px] font-bold text-black sm:text-[24px]">
            {t("name")}
          </h3>
          <div data-wow="fadeInUp" className="mt-8 space-y-4 text-base leading-7 text-secondary sm:space-y-5 sm:text-lg sm:leading-8">
            {paragraphs.map((key) => (
              <p key={key}>{t(key)}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
