import { defineConfig } from "cypress";
import * as os from "node:os";

export default defineConfig({
  projectId: 'rjwatv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
