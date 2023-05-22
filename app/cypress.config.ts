import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1200,
    baseUrl: 'http://localhost:3000',
  },
});
