import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repositoryName?.endsWith(".github.io");
const base = process.env.GITHUB_ACTIONS && repositoryName && !isUserSite
  ? `/${repositoryName}/`
  : "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
  },
});
