import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:5173',
    viewportWidth: 200,
    viewportHeight: 200,
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
