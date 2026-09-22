import Testimonial from "@/components/pages/Testimonial";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Testimonial />;
}
