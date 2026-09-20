import { getTranslations } from "next-intl/server";

export default async function InnerPage({ pageKey }) {
  const t = await getTranslations(`pages.${pageKey}`);

  return (
    <section className="bg-[#f7f8fb] py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-4xl font-bold text-black">{t("title")}</h1>
        <p className="mt-6 text-lg leading-8 text-secondary">{t("body")}</p>
      </div>
    </section>
  );
}
