import InnerPage from "@/components/InnerPage";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InnerPage pageKey="about" />;
}
