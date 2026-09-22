import { getTranslations } from "next-intl/server";

export default async function InnerPage({ pageKey }) {
  const t = await getTranslations(`pages.${pageKey}`);

  return (
    <section className="bg-[#f7f8fb] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-2xl font-bold text-black sm:text-3xl lg:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-base leading-7 text-secondary sm:mt-6 sm:text-lg sm:leading-8">{t("body")}</p>
      </div>
    </section>
  );
}
