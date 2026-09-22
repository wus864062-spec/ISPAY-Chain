import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projects } from "@/data/site";

export default async function ProjectsGrid() {
  const t = await getTranslations("projects");
  const row1 = projects.slice(0, 4);
  const row2 = projects.slice(4, 8);

  return (
    <>
      {/* 第一个 cover 板块：背景图 + 遮罩 + 标题 + 4张卡片 */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "85px",
          paddingRight: "0px",
          paddingBottom: "85px",
          paddingLeft: "0px",
        }}
      >
        {/* 背景图 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/backgrounds/slider-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 90% 黑色遮罩 */}
        <div className="absolute inset-0 bg-black/90" />

        {/* inner-container */}
        <div className="relative z-10 mx-auto w-[80%]">
          {/* 标题区 */}
          <div
            data-wow="zoomIn"
            data-delay="100"
            className="mb-[var(--wp--preset--spacing--70)] mt-8 text-center"
          >
            <h3 className="font-heading text-[28px] font-bold leading-[1.3] capitalize text-white sm:text-[32px]">
              {t("title")}
            </h3>
          </div>

          {/* 4张卡片 flex 布局 */}
          <div className="-mt-10 flex flex-wrap gap-6">
            {row1.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                title={t(`items.${project.id}.title`)}
                subtitle={t(`items.${project.id}.subtitle`)}
                description={t(`items.${project.id}.description`)}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 第二个 cover 板块：背景图 + 遮罩 + 4张卡片（无标题） */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "var(--wp--preset--spacing--80)",
          paddingRight: "0px",
          paddingBottom: "var(--wp--preset--spacing--80)",
          paddingLeft: "0px",
        }}
      >
        {/* 背景图 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/backgrounds/slider-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 90% 黑色遮罩 */}
        <div className="absolute inset-0 bg-black/90" />

        {/* inner-container */}
        <div className="relative z-10 mx-auto w-[80%]">
          {/* 4张卡片 flex 布局 */}
          <div className="flex flex-wrap gap-6">
            {row2.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                title={t(`items.${project.id}.title`)}
                subtitle={t(`items.${project.id}.subtitle`)}
                description={t(`items.${project.id}.description`)}
                delay={400 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, title, subtitle, description, delay }) {
  return (
    <article
      data-wow="rollIn"
      data-delay={delay}
      className="ourprocess-box group flex w-full flex-col rounded-[20px] bg-white p-[30px_20px_40px] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-[#05085b] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
    >
      <figure className="mb-0 flex justify-center">
        <Image
          src={project.image}
          alt={title}
          width={100}
          height={100}
          sizes="100px"
          className="h-[100px] w-[100px] object-contain"
        />
      </figure>
      <h5 className="mt-[25px] mb-[12px] text-center font-heading text-[20px] font-[600] leading-[28px] capitalize text-black transition-colors duration-500 ease-out group-hover:text-white" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-[15px] font-normal leading-[22.5px] text-black transition-colors duration-500 ease-out group-hover:text-white">
        {subtitle}
      </p>
      <p className="mt-0 text-[15px] font-normal leading-[22.5px] text-black transition-colors duration-500 ease-out group-hover:text-white">
        {description}
      </p>
    </article>
  );
}
