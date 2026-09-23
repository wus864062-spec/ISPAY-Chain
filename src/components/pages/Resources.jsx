import { getTranslations } from "next-intl/server";
import InnerBanner from "./InnerBanner";
import { resourceFiles } from "@/data/site";

/* 资源页：按原始网站编排（PDF 内嵌预览 + 标题链接 + 黑色下载按钮，共 4 个文件） */
export default async function Resources() {
  const t = await getTranslations("pages.resources");

  return (
    <>
      <InnerBanner namespace="pages.resources" />
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-12 sm:space-y-16">
            {resourceFiles.map((file) => (
              <div key={file.key}>
                <h2 className="text-center font-heading text-[22px] font-bold text-black sm:text-[26px]">
                  {t(`${file.key}Heading`)}
                </h2>
                <iframe
                  src={file.href}
                  title={t(`${file.key}Title`)}
                  className="mt-4 h-[480px] w-full border border-gray-200 sm:h-[620px] lg:h-[700px]"
                />
                <div className="mt-4 flex items-center justify-center gap-8 sm:gap-12">
                  <a
                    href={file.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-[#1d3f73] underline underline-offset-4 sm:text-base"
                  >
                    {t(`${file.key}Title`)}
                  </a>
                  <a
                    href={file.href}
                    download
                    className="inline-block bg-black px-8 py-3 text-lg font-medium text-white sm:px-10 sm:py-4 sm:text-xl"
                  >
                    {t("download")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
