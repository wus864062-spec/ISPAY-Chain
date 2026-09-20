import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projects } from "@/data/site";

export default async function ProjectsGrid() {
  const t = await getTranslations("projects");

  return (
    <section className="bg-[#f7f8fb] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[25px] font-medium capitalize text-white sm:text-[25px]">
          <span className="rounded-full bg-navy px-5 py-1">{t("eyebrow")}</span>
        </p>
        <h3 className="font-heading mt-6 text-center text-[32px] font-bold capitalize leading-[1.3] text-black">
          {t("title")}
        </h3>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-[20px] bg-white shadow-[0_12px_40px_rgba(5,8,91,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(5,8,91,0.14)]"
            >
              <div className="relative h-44 bg-[#0b0d3a]">
                <Image
                  src={project.image}
                  alt={t(`items.${project.id}.title`)}
                  fill
                  className="object-contain p-3"
                />
              </div>
              <div className="p-5">
                <h5 className="text-center text-xl font-semibold capitalize text-black">
                  {t(`items.${project.id}.title`)}
                </h5>
                <p className="mt-3 text-left text-[15px] leading-6 text-secondary">
                  {t(`items.${project.id}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
