import type { Metadata } from "next";
import "./globals.css";
import { geometria } from "@/lib/fonts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: SITE.shortName,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.fullName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${geometria.variable} h-full font-sans`}>
      <body className="min-h-dvh bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
