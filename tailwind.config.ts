import type { Config } from "tailwindcss";
import TailwindcssAnimate from "tailwindcss-animate";
import TailwindcssLineClamp from "@tailwindcss/line-clamp";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teklif: {
          "50": "#f3f9fc",
          "100": "#e6f3f8",
          "200": "#c8e6ef",
          "300": "#85cadb",
          "400": "#61bbcf",
          "500": "#3da3ba",
          "600": "#2c849d",
          "700": "#256a7f",
          "800": "#225a6a",
          "900": "#214b59",
          "950": "#16313b",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [TailwindcssAnimate, TailwindcssLineClamp],
} satisfies Config;
