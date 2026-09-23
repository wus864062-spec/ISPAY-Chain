import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import TestimonialVideo from "./TestimonialVideo";
import { testimonialItems } from "@/data/site";

/* 用户评价页：2×2 边框卡片网格（卡片顶部标题 + 下方视频，海报图融合圆形播放按钮） */
export default async function Testimonial() {
  const t = await getTranslations("pages.testimonial");

  return (
    <>
      <InnerBanner namespace="pages.testimonial" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h2 className="text-center font-heading text-[24px] font-bold text-black sm:text-[28px]">
            {t("heading")}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 sm:mt-12">
            {testimonialItems.map((item) => (
              <div key={item.key} className="border border-black p-[1px]">
                <div className="border border-black p-4 sm:p-6">
                  <h3 className="pb-4 text-center font-heading text-[20px] font-bold text-black sm:pb-5 sm:text-[24px]">
                    {t(`${item.key}Title`)}
                  </h3>
                  <TestimonialVideo src={item.video} poster={item.poster} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
