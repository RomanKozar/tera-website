import localFont from "next/font/local";

export const geometria = localFont({
  src: [
    {
      path: "../../public/font/Geometria.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Geometria-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Geometria-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Geometria-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/font/Geometria-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-geometria",
  display: "swap",
});
