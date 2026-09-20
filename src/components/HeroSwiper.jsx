"use client";

import Image from "next/image";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import { heroSlides } from "@/data/site";
import { Link } from "@/i18n/navigation";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSwiper() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/backgrounds/slider-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/90" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="hero-swiper relative"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative mx-auto grid min-h-[720px] max-w-6xl items-center gap-8 px-4 py-16 pb-28 lg:grid-cols-2 lg:min-h-[760px]">
              <div className="max-w-xl text-center lg:text-left">
                <p className="text-[17px] font-semibold capitalize text-navy underline decoration-2 underline-offset-8">
                  {t(`slides.${slide.id}.kicker`)}
                </p>
                <h2 className="font-heading mt-4 text-[32px] font-bold leading-[1.3] text-black sm:text-[42px]">
                  {t(`slides.${slide.id}.title`)}
                </h2>
                <p className="mt-4 text-[15px] text-secondary">{t(`slides.${slide.id}.description`)}</p>
                <Link
                  href="/about"
                  className="mt-8 inline-flex rounded-full border-2 border-navy bg-navy px-7 py-2 text-base font-semibold capitalize text-white transition hover:bg-transparent hover:text-navy"
                >
                  {t("readMore")}
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="card-3d relative">
                  <Image
                    src={slide.image}
                    alt={t(`slides.${slide.id}.kicker`)}
                    width={520}
                    height={360}
                    className={
                      slide.contain
                        ? "h-auto w-[min(100%,480px)] rounded-2xl object-contain shadow-2xl"
                        : "h-auto w-[min(100%,420px)] object-contain drop-shadow-2xl"
                    }
                    priority={slide.id === "black"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
