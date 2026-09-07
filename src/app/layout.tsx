import type { Metadata } from "next";
import { Michroma, Overpass, Qahiri, Ruwudu } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
});
const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-overpass",
});
// Qahiri ships one weight only.
const qahiri = Qahiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-qahiri",
});
const ruwudu = Ruwudu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ruwudu",
});

export const metadata: Metadata = {
  title: "Hamedo Motors — four fronts, one hotline (mostly) | Egypt",
  description:
    "A concept site built from Hamedo Motors' own Facebook and Instagram: seven brands stated in their bio, an eighth advertised only in their posters, a golf cart styled like a Dodge Ram, and four real branches spread from Dokki to the North Coast.",
  metadataBase: new URL("https://hamidou-motors-site.vercel.app"),
  openGraph: {
    title: "Hamedo Motors — four fronts, one hotline (mostly)",
    description:
      "Since 1980. Seven stated brands, one more advertised, one that isn't a car at all, and a phone number that depends which platform you read.",
    locale: "en_US",
    type: "website",
  },
  other: { "theme-color": "#0d1114" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`notranslate ${michroma.variable} ${overpass.variable} ${qahiri.variable} ${ruwudu.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        <noscript>
          <style>{`[data-ping-item]{opacity:1!important;transform:none!important}[data-ping-item]::after{content:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="en">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
