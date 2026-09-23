import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";

/* 领导页：按原始网站编排（标题 + 总裁照片 + 署名 + 长文） */
export default async function Leadership() {
  const t = await getTranslations("pages.leadership");
  const paragraphs = ["p1", "p2", "p3", "p4", "p5", "p6"];

  return (
    <>
      <InnerBanner namespace="pages.leadership" />
      <section className="bg-white py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h2 className="text-center font-heading text-[16px] font-bold text-black sm:text-[18px] md:text-[22px]">
            {t("heading")}
          </h2>

          {/* 左图右文双栏 */}
          <div className="mt-4 sm:mt-6 flex flex-col items-start gap-4 sm:gap-6 lg:flex-row lg:items-start lg:gap-2">
            {/* 左：总裁照片 */}
            <div className="w-full lg:w-[50%] lg:shrink-0">
              <img
                src="/images/pages/Mam.jpeg"
                alt={t("name")}
                style={{ borderRadius: "24px" }}
                className="h-auto w-full object-cover lg:h-[560px] lg:w-auto lg:max-w-full"
              />
            </div>

            {/* 右：姓名 + 职务 + 长文 */}
            <div className="w-full lg:flex-1">
              <h3 className="font-heading text-[18px] font-bold text-black sm:text-[20px] md:text-[24px]">
                {t("name")}
              </h3>
              <div className="mt-2 max-w-[40em] space-y-1 text-[13px] leading-[1.65] text-black sm:space-y-1.5 sm:text-[14px] sm:leading-[1.7] md:text-[15px]">
                {paragraphs.map((key) => (
                  <p key={key}>{t(key)}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
