import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import { testimonialItems } from "@/data/site";

/* 用户评价页：按原始网站编排（客户评价 + 4 个产品评价板块） */
export default async function Testimonial() {
  const t = await getTranslations("pages.testimonial");

  return (
    <>
      <InnerBanner namespace="pages.testimonial" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 data-wow="fadeInUp" className="font-heading text-[24px] font-bold text-black sm:text-[28px]">
            {t("heading")}
          </h2>
          {testimonialItems.map((item) => (
            <div key={item.key} data-wow="fadeInUp" className="mt-14 sm:mt-16">
              <h3 className="font-heading text-[20px] font-bold text-black sm:text-[24px]">{t(`${item.key}Title`)}</h3>
              <img src={item.image} alt="" className="mx-auto mt-8 w-full rounded-[12px] border border-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
