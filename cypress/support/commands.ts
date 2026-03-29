/// <reference types="cypress" />

// ============================================================
// TypeScript declarations
// ============================================================
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Sets auth cookies to simulate a logged-in session.
       * @param role - e.g. "superadmin", "subadmin"
       */
      loginBypass(role?: string): Chainable<void>;
    }
  }
}

// ============================================================
// Custom Commands
// ============================================================

/**
 * loginBypass: Sets auth cookies to simulate a logged-in session
 * without hitting the real API. Used in beforeEach for protected routes.
 */
Cypress.Commands.add("loginBypass", (role = "superadmin") => {
  const user = JSON.stringify({ role });
  cy.setCookie("token", "fake-test-token-12345");
  cy.setCookie("refreshToken", "fake-refresh-token-12345");
  cy.setCookie("user", user);
});

export {};
