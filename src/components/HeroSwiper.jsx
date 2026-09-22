"use client";

import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { heroSlides } from "@/data/site";
import { Link } from "@/i18n/navigation";
import "swiper/css";
import "swiper/css/navigation";

export default function HeroSwiper() {
  const t = useTranslations("hero");
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="main-slider relative overflow-hidden">
        <div className="slider-bg relative min-h-[520px] sm:min-h-[560px] lg:min-h-[640px]">
          <Image
            src="/images/backgrounds/slider-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/90" />
          <img
            src="/images/backgrounds/banner-left.png"
            alt=""
            width={350}
            height={248}
            className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[120px] w-auto sm:h-[170px] lg:h-[220px]"
          />

          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            speed={250}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="hero-swiper sliderrr-div relative z-[2] mx-auto w-full lg:w-[80%]"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={`slider-boxes mx-auto flex min-h-[520px] max-w-6xl flex-col items-center gap-8 px-5 pb-14 pt-12 sm:min-h-[560px] sm:gap-10 sm:px-8 sm:pt-14 md:flex-row md:items-center md:gap-10 md:px-14 lg:min-h-[640px] lg:gap-16 lg:px-16 lg:py-16 ${
                    slide.align === "bottom" ? "md:items-end" : "md:items-center"
                  }`}
                >
                  {/* 左文 - 原始网站 wow fadeInUp */}
                  <div
                    data-wow="fadeInUp"
                    className="slider-left-box w-full text-center md:w-[58%] md:text-left"
                  >
                    <p className="slider-sub-title mx-auto max-w-[72%] text-[15px] font-semibold capitalize text-navy underline decoration-2 underline-offset-8 sm:text-[17px] md:mx-0 md:max-w-none">
                      <strong>{t(`slides.${slide.id}.kicker`)}</strong>
                    </p>
                    <h2 className="slider-main-title font-heading mt-4 text-[26px] font-bold leading-[1.35] text-black sm:mt-5 sm:text-[32px] lg:mt-6 lg:text-[42px]">
                      {t(`slides.${slide.id}.title`)}
                    </h2>
                    <p className="slider-desc mt-3 text-sm leading-6 text-secondary sm:mt-4 sm:text-[15px] sm:leading-7">
                      {t(`slides.${slide.id}.description`)}
                    </p>
                    <div className="slider-btns mt-6 sm:mt-8 lg:mt-10">
                      <Link
                        href="/about"
                        className="inline-flex rounded-[32px] border-2 border-navy bg-navy px-6 py-2 text-sm font-semibold capitalize text-white transition hover:border-black hover:bg-black sm:px-7 sm:text-base"
                      >
                        {t("readMore")}
                      </Link>
                    </div>
                  </div>

                  {/* 右卡 - 原始网站 wow zoomIn */}
                  <div
                    data-wow="zoomIn"
                    data-delay="200"
                    className="slider-right-box flex w-full justify-center md:w-[42%]"
                  >
                    <Image
                      src={slide.image}
                      alt={t(`slides.${slide.id}.kicker`)}
                      width={slide.contain ? 376 : 904}
                      height={slide.contain ? 382 : 1280}
                      className={
                        slide.contain
                          ? "h-auto w-[min(100%,220px)] object-contain sm:w-[min(100%,280px)] lg:w-[min(100%,360px)]"
                          : "h-auto max-h-[180px] w-auto object-contain sm:max-h-[240px] lg:max-h-[360px]"
                      }
                      priority={index === 0}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 自定义左右箭头按钮 - 纯黑圆形 + 白色V形，彻底避免 Swiper 默认 ›‹ 字符 FOUC */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="hero-swiper-btn hero-swiper-btn-prev absolute z-[5] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition hover:bg-navy sm:h-[48px] sm:w-[48px]"
          >
            <span className="-translate-y-[1px] translate-x-[1px] rotate-45 border-l-[2px] border-b-[2px] border-white w-[8px] h-[8px]" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next"
            className="hero-swiper-btn hero-swiper-btn-next absolute z-[5] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition hover:bg-navy sm:h-[48px] sm:w-[48px]"
          >
            <span className="-translate-y-[1px] -translate-x-[1px] -rotate-135 border-l-[2px] border-b-[2px] border-white w-[8px] h-[8px]" />
          </button>
        </div>
      </section>
  );
}
