import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import { howToJoinOtherLinks, howToJoinSteps } from "@/data/site";

/* 如何加入页：按原始网站 30 个板块编排（钱包创建步骤 + 卡/商城/农场控制面板 + 其他链接） */
export default async function HowToJoin() {
  const t = await getTranslations("pages.howToJoin");

  return (
    <>
      <InnerBanner namespace="pages.howToJoin" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* 引言标题 */}
          <h2 data-wow="fadeInUp" className="font-heading text-[24px] font-bold text-black sm:text-[28px]">
            {t("introTitle")}
          </h2>

          {/* 步骤板块：标题 +（可选）段落 + 截图 */}
          {howToJoinSteps.map((step) => (
            <div key={step.t} data-wow="fadeInUp" className="mt-14 sm:mt-16">
              <h3 className="font-heading text-[20px] font-bold text-black sm:text-[24px]">
                {t(`${step.t}Title`)}
              </h3>
              <p className="mt-4 break-all text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                {t(`${step.t}Text`)}
              </p>
              <img
                src={step.image}
                alt=""
                className="mx-auto mt-8 w-full max-w-md rounded-[12px] border border-gray-200"
              />
              {step.secondImage && (
                <img
                  src={step.secondImage}
                  alt=""
                  className="mx-auto mt-8 w-full max-w-md rounded-[12px] border border-gray-200"
                />
              )}
            </div>
          ))}

          {/* 其他链接板块 */}
          <div data-wow="fadeInUp" className="mt-14 sm:mt-16">
            <h3 className="font-heading text-[20px] font-bold text-black sm:text-[24px]">{t("otherLinksTitle")}</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              {howToJoinOtherLinks.map((item) => (
                <li key={item.key}>
                  {t(item.key)}
                  {": "}
                  <a href={item.href} target="_blank" rel="noreferrer" className="break-all text-navy underline hover:text-gold">
                    {item.href}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
