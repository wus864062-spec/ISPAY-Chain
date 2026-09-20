import AboutSection from "@/components/AboutSection";
import HeroSwiper from "@/components/HeroSwiper";
import ProjectsGrid from "@/components/ProjectsGrid";
import VideoSection from "@/components/VideoSection";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSwiper />
      <AboutSection />
      <ProjectsGrid />
      <VideoSection />
    </>
  );
}
