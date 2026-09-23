import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import ZoomableImage from "./ZoomableImage";
import { howToJoinOtherLinks, howToJoinSteps } from "@/data/site";

/* 如何加入页：按原始网站 30 个板块编排（钱包创建步骤 + 卡/商城/农场控制面板 + 其他链接） */
export default async function HowToJoin() {
  const t = await getTranslations("pages.howToJoin");

  return (
    <>
      <InnerBanner namespace="pages.howToJoin" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* 引言标题：clamp 流式字号（内联样式保证生效）14px→21px */}
          <h2
            className="text-center font-heading font-bold text-black"
            style={{ fontSize: "clamp(14px, calc(14px + 7 * (100vw - 320px) / 960), 21px)" }}
          >
            {t("introTitle")}
          </h2>

          {/* 步骤板块：标题 + 截图 +（可选）段落 / 链接行 */}
          {howToJoinSteps.map((step) => {
            /* 图片尺寸：s3~s8（步骤2~6）=234px 增 1/4=293px；s10=468px；s9 及 s11 起=624px */
            const stepNum = Number(step.t.slice(1));
            const imgMax =
              stepNum >= 3 && stepNum <= 8
                ? "max-w-[293px]"
                : stepNum === 10
                  ? "max-w-[468px]"
                  : "max-w-[624px]";
            return (
            <div key={step.t} className="mt-14 sm:mt-16">
              {step.downloadLinks ? (
                <>
                  <ZoomableImage
                    src={step.image}
                    alt=""
                    className={`mx-auto w-full max-w-[300px] ${step.plainImage ? "" : "rounded-[12px] border border-gray-200"}`}
                  />
                  <h3 className="mt-8 text-center font-heading text-[20px] font-bold text-black sm:text-[24px]">
                    {t(`${step.t}Title`)}
                  </h3>
                  <div className="mt-6 text-center text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                    <p>{t("s2Android")}</p>
                    <p className="break-all">
                      {"："}
                      <a
                        href={step.androidUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        https://play.google.com/store/apps/details?
                      </a>
                      <br />
                      id=vip.mytokenpocket{" "}
                      {t("s2Ios")}
                    </p>
                    <p className="break-all">
                      {"："}
                      <a
                        href={step.iosUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {step.iosUrl}
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-center font-heading text-[20px] font-bold text-black sm:text-[24px]">
                    {t(`${step.t}Title`)}
                  </h3>
                  <p className="mt-4 break-all text-center text-base leading-7 text-secondary sm:text-lg sm:leading-8">
                    {t(`${step.t}Text`)}
                  </p>
                  <ZoomableImage
                    src={step.image}
                    alt=""
                    className={`mx-auto mt-8 w-full ${imgMax} rounded-[12px] border border-gray-200`}
                  />
                </>
              )}

              {step.secondImage && (
                <ZoomableImage
                  src={step.secondImage}
                  alt=""
                  className={`mx-auto mt-8 w-full ${imgMax} rounded-[12px] border border-gray-200`}
                />
              )}
            </div>
            );
          })}

          {/* 其他链接板块 */}
          <div className="mt-14 sm:mt-16">
            <h3 className="text-center font-heading text-[20px] font-bold text-black sm:text-[24px]">{t("otherLinksTitle")}</h3>
            <ol className="mt-4 list-decimal list-inside space-y-3 text-center text-base leading-7 text-secondary sm:text-lg sm:leading-8">
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
