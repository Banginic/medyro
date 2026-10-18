import "./globals.css";
import "./my_css.css";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import ReCaptchaProvider from "@/providers/ReCaptchaProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { HomeMetadata } from "@/features/home/metadata/homeMetadata";
import ProviderLayout from "./ProviderLayout";
import GoogleTranslate from "@/i18n/components/GoogleTranslation";

export const viewport = {
  themeColor: "#04470a",
};
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = HomeMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage}  antialiased`}
    >
      <head></head>

      <body
        className={`relative min-h-screen w-full font-body page-text 
         `}
      >
        {" "}
        <GoogleTranslate />
        <ReCaptchaProvider>
          <ProviderLayout>{children}</ProviderLayout>
        </ReCaptchaProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
