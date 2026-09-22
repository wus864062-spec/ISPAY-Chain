import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";

/* 关于我们页：按原始网站 5 个板块编排（目标 / 核心原则 / 想象 / 使命 / 全球汇款技术简报） */
export default async function About() {
  const t = await getTranslations("pages.about");

  const goals = ["g1", "g2", "g3", "g4", "g5", "g6"];
  const principles = ["p1", "p2", "p3", "p4", "p5"];

  return (
    <>
      <InnerBanner namespace="pages.about" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* 板块1：关于我们（目标） */}
          <div data-wow="fadeInUp">
            <h2 className="font-heading text-[24px] font-bold text-black sm:text-[28px]">{t("goalsTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("goalsIntro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              {goals.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <img src="/images/pages/aboutus.png" alt="" className="mt-8 w-full rounded-[16px]" />
          </div>

          {/* 板块2：核心原则 */}
          <div data-wow="fadeInUp" className="mt-16 sm:mt-20">
            <h2 className="font-heading text-[24px] font-bold text-black sm:text-[28px]">{t("principlesTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("principlesIntro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              {principles.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <img src="/images/pages/ispay1.png" alt="" className="mt-8 w-full rounded-[16px]" />
            <img src="/images/pages/core.png" alt="" className="mt-8 w-full rounded-[16px]" />
          </div>

          {/* 板块3：想象 */}
          <div data-wow="fadeInUp" className="mt-16 sm:mt-20">
            <h2 className="font-heading text-[24px] font-bold text-black sm:text-[28px]">{t("visionTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("visionText")}</p>
            <img src="/images/pages/vision.jpeg" alt="" className="mt-8 w-full rounded-[16px]" />
          </div>

          {/* 板块4：使命 */}
          <div data-wow="fadeInUp" className="mt-16 sm:mt-20">
            <h2 className="font-heading text-[24px] font-bold text-black sm:text-[28px]">{t("missionTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("missionText")}</p>
            <img src="/images/pages/mission.png" alt="" className="mt-8 w-full rounded-[16px]" />
          </div>

          {/* 板块5：ISPAY 全球汇款技术简报 */}
          <div data-wow="fadeInUp" className="mt-16 sm:mt-20">
            <h2 className="font-heading text-[24px] font-bold text-black sm:text-[28px]">{t("remittanceTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("remittanceSubtitle")}</p>
            <h3 className="mt-8 font-heading text-[20px] font-bold text-black sm:text-[24px]">{t("overviewTitle")}</h3>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("overviewText")}</p>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg sm:leading-8">{t("flawsIntro")}</p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              <li>{t("flaw1")}</li>
              <li>{t("flaw2")}</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
