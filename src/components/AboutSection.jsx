import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="relative mx-auto max-w-md">
          <Image
            src="/images/backgrounds/banner-left.png"
            alt=""
            width={399}
            height={280}
            className="absolute -left-6 -top-8 w-40 opacity-80"
          />
          <Image
            src="/images/projects/about.png"
            alt={t("title")}
            width={520}
            height={520}
            className="relative z-10 w-full object-contain"
          />
        </div>

        <div>
          <p className="font-heading text-[30px] font-semibold capitalize text-black">{t("eyebrow")}</p>
          <h3 className="font-heading mt-4 text-[28px] font-semibold leading-[1.3] capitalize text-black sm:text-[35px]">
            {t("values")}
          </h3>
          <p className="mt-6 text-lg leading-[1.8] text-secondary">{t("intro")}</p>
          <ul className="mt-6 space-y-4 text-lg leading-[1.8] text-secondary">
            <li>{t("p1")}</li>
            <li>{t("p2")}</li>
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-[25px] bg-navy px-8 py-2 text-base font-medium capitalize text-white transition hover:bg-black"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
