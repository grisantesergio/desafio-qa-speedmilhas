
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',

    // Localiza os testes E2E e os testes de API
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'api/**/*.cy.js',
    ],

    supportFile: 'cypress/support/e2e.js',
  },
});
