import { getTranslations } from "next-intl/server";

export default async function VideoSection() {
  const t = await getTranslations("video");

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="text-base font-medium capitalize text-navy">{t("eyebrow")}</p>
          <h3 className="font-heading mt-3 text-[32px] font-bold capitalize leading-[1.3] text-black">
            {t("title")}
          </h3>
          <div className="mt-6 space-y-4 text-[16px] leading-7 text-secondary">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            className="aspect-[848/480] w-full"
            controls
            loop
            playsInline
            poster="/images/backgrounds/statistic.gif"
            src="/videos/intro.mp4"
          />
        </div>
      </div>
    </section>
  );
}
