﻿import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";

/* 关于我们页：按原始网站 5 个板块编排（目标 / 核心原则 / 想象 / 使命 / 全球汇款技术简报） */
export default async function About() {
  const t = await getTranslations("pages.about");

  const goals = ["g1", "g2", "g3", "g4", "g5", "g6"];
  const principles = ["p1", "p2", "p3", "p4", "p5"];

  return (
    <>
      <InnerBanner namespace="pages.about" />
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10">
          {/* 板块1：关于我们（目标）—— 左图右文双栏 */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-14">
            <div className="w-full lg:w-[34%] lg:shrink-0">
              <img src="/images/pages/20_ispay1.png" alt="" className="w-full rounded-[16px] max-h-[280px] sm:max-h-[360px] md:max-h-[420px] lg:max-h-none object-contain" />
            </div>
            <div className="w-full lg:flex-1">
              <h2 className="font-heading text-[22px] font-bold text-black sm:text-[26px] md:text-[30px]">{t("goalsTitle")}</h2>
              <p className="mt-3 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">{t("goalsIntro")}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">
                {goals.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 板块2：核心原则 —— 居中标题 + 左图右文双栏 + 浅灰圆角块 */}
          <div className="mt-12 sm:mt-16 md:mt-20 rounded-[20px] bg-[#f5f5f7] px-5 py-8 sm:px-10 sm:py-12 md:py-14">
            <h2 className="text-center font-heading text-[22px] font-bold text-black sm:text-[26px] md:text-[30px]">{t("principlesTitle")}</h2>
            <div className="mt-8 flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-14">
              <div className="w-full lg:w-[33%] lg:shrink-0">
                <img src="/images/pages/core.png" alt="" className="w-full rounded-[16px] max-h-[280px] sm:max-h-[360px] md:max-h-[420px] lg:max-h-none object-contain" />
              </div>
              <div className="w-full lg:flex-1">
                <p className="text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">{t("principlesIntro")}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">
                  {principles.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 板块3+4：想象 / 使命 —— 双卡片并排 */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="rounded-[16px] bg-white p-8 sm:p-12 md:p-14 lg:p-16 border border-gray-200 shadow-lg min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col justify-center">
              <h2 className="text-center font-heading text-[32px] font-bold text-black sm:text-[36px] md:text-[40px] lg:text-[48px]">{t("visionTitle")}</h2>
              <div className="mx-auto mt-6 h-[4px] w-[160px] sm:w-[200px] md:w-[240px] rounded-full bg-blue-600" />
              <p className="mt-8 text-center text-lg leading-8 text-secondary sm:text-[20px] sm:leading-9 md:text-[22px] md:leading-10 lg:text-[24px]">{t("visionText")}</p>
            </div>
            <div className="rounded-[16px] bg-white p-8 sm:p-12 md:p-14 lg:p-16 border border-gray-200 shadow-lg min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col justify-center">
              <h2 className="text-center font-heading text-[32px] font-bold text-black sm:text-[36px] md:text-[40px] lg:text-[48px]">{t("missionTitle")}</h2>
              <div className="mx-auto mt-6 h-[4px] w-[160px] sm:w-[200px] md:w-[240px] rounded-full bg-blue-600" />
              <p className="mt-8 text-center text-lg leading-8 text-secondary sm:text-[20px] sm:leading-9 md:text-[22px] md:leading-10 lg:text-[24px]">{t("missionText")}</p>
            </div>
          </div>

          {/* 板块3+4下方：ISPAY Activities 宽幅图 */}
          <div className="mt-12 sm:mt-16 md:mt-20">
            <img src="/images/pages/ispay-activities.jpeg" alt="ISPAY Activities" className="w-full rounded-[16px] max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-none object-cover" />
          </div>

          {/* 板块5：ISPAY 全球汇款技术简报 —— 左图右文双栏 */}
          <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-start gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="w-full lg:w-[42%] lg:shrink-0 md:pt-10">
              <img src="/images/pages/ispay-cards.png" alt="ISPAY Global Remittance" className="w-full max-h-[300px] sm:max-h-[400px] md:max-h-[480px] lg:max-h-none object-contain" />
            </div>
            <div className="w-full lg:flex-1">
              <h2 className="font-heading text-[22px] font-bold text-black sm:text-[26px] md:text-[30px]">{t("remittanceTitle")}</h2>
              <p className="mt-3 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">{t("remittanceSubtitle")}</p>
              <h3 className="mt-6 font-heading text-[18px] font-bold text-black sm:text-[20px] md:text-[24px]">{t("overviewTitle")}</h3>
              <p className="mt-3 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">{t("overviewText")}</p>
              <p className="mt-3 text-[15px] font-bold leading-7 text-black sm:text-base sm:leading-8 md:text-lg">{t("flawsIntro")}</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-[15px] leading-7 text-secondary sm:text-base sm:leading-8 md:text-lg">
                <li>{t("flaw1")}</li>
                <li>{t("flaw2")}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
