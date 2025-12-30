import localFont from "next/font/local";

export const GmarketSans = localFont({
  src: [
    {
      path: "../fonts/GmarketSansBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/GmarketSansMedium.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gmarket-sans",
  display: "swap",
});
