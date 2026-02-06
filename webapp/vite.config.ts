import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), svgr()],
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
  };
});
