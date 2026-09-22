import { getTranslations } from "next-intl/server";

export default async function VideoSection() {
  const t = await getTranslations("video");

  return (
    <section className="bg-white py-[81px]">
        {/* 原始网站容器 max-width: 80% */}
        <div className="mx-auto w-[80%] px-4">
          {/* 视频 - 移到板块上方 - wow fadeInRight */}
          <div data-wow="fadeInRight" data-delay="200" className="overflow-hidden rounded-xl bg-black shadow-2xl sm:rounded-2xl">
            <video
              className="aspect-[848/480] w-full"
              controls
              loop
              playsInline
              poster="/images/backgrounds/statistic.gif"
              src="/videos/intro.mp4"
            />
          </div>

          {/* 标题 - 居中 - wow fadeInUp */}
          <h3
            data-wow="fadeInUp"
            className="font-heading mt-10 text-center text-[28px] font-bold capitalize leading-[1.3] text-black sm:mt-16 sm:text-[32px] lg:text-[35px]"
          >
            {t("eyebrow")}
          </h3>

          {/* 左图右文 */}
          <div className="mt-8 grid items-start gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            {/* 左图 - wow fadeInDown */}
            <div data-wow="fadeInDown">
              <img
                src="/images/projects/gold-card.jpg"
                alt=""
                className="h-auto w-full"
              />
            </div>

            {/* 右文 - 副标题 + 段落 - wow fadeInLeft */}
            <div data-wow="fadeInLeft" className="text-left">
              <h4 className="text-base font-medium text-black sm:text-lg">{t("title")}</h4>
              <div className="mt-4 space-y-3 text-sm leading-7 text-secondary sm:mt-6 sm:space-y-4 sm:text-[16px]">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
