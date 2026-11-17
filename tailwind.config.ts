import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF8A3D",
          "orange-dark": "#C2570F", // AA-contrast orange for text on white
          peach: "#FFF0E5",
          cream: "#FFF9F2",
          ink: "#292929",
          muted: "#686868",
          sky: "#DDF1FB",
          sun: "#FFF3BF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(41,41,41,0.18)",
        lift: "0 24px 50px -18px rgba(255,138,61,0.45)",
      },
      borderRadius: {
        blob: "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
