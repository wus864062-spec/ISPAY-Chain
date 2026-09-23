import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import { investmentPlanItems } from "@/data/site";

/* 投资计划页：按原始网站编排（7 个收入计划板块） */
export default async function InvestmentPlan() {
  const t = await getTranslations("pages.investmentPlan");

  return (
    <>
      <InnerBanner namespace="pages.investmentPlan" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-heading text-[24px] font-bold text-black sm:text-[28px]">
            {t("heading")}
          </h2>
          {investmentPlanItems.map((item) => (
            <div key={item.key} className="mt-14 sm:mt-16">
              <h3 className="text-center font-heading text-[20px] font-bold text-black sm:text-[24px]">{t(`${item.key}Title`)}</h3>
              <img src={item.image} alt="" className="mx-auto mt-8 w-full rounded-[12px] border border-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
