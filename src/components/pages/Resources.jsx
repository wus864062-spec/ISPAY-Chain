import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import { resourceFiles } from "@/data/site";

/* 资源页：按原始网站编排（4 个下载文件：推介演示文稿 / 全球规模金融基础设施 / 魔法水晶农场 / 白皮书） */
export default async function Resources() {
  const t = await getTranslations("pages.resources");

  return (
    <>
      <InnerBanner namespace="pages.resources" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-10 sm:space-y-12">
            {resourceFiles.map((file) => (
              <div key={file.key} data-wow="fadeInUp">
                <h2 className="font-heading text-[22px] font-bold text-black sm:text-[26px]">
                  {t(`${file.key}Title`)}
                </h2>
                <a
                  href={file.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-navy px-6 py-3 text-base font-semibold text-white transition hover:bg-gold"
                >
                  {t("download")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
