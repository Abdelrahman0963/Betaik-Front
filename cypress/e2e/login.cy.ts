/// <reference types="cypress" />

describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // ── Rendering ──────────────────────────────────────────────
  it("renders email and password inputs", () => {
    cy.get('input[id="email"]').should("be.visible");
    cy.get('input[id="password"]').should("be.visible");
  });

  it("renders the Login submit button", () => {
    cy.contains("button[type='submit']", "Login").should("be.visible");
  });

  it("renders the Forgot Password link", () => {
    cy.contains("a", "Forgot Password?").should("be.visible");
  });

  // ── Validation ─────────────────────────────────────────────
  it("shows validation errors when submitting empty form", () => {
    cy.contains("button[type='submit']", "Login").click();
    cy.contains("Invalid email address").should("be.visible");
    cy.contains("Password must be at least 6 characters").should("be.visible");
  });

  it("shows error for invalid email format", () => {
    cy.get('input[id="email"]').type("not-an-email");
    cy.contains("button[type='submit']", "Login").click();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("shows error when password is too short", () => {
    cy.get('input[id="email"]').type("test@example.com");
    cy.get('input[id="password"]').type("abc");
    cy.contains("button[type='submit']", "Login").click();
    cy.contains("Password must be at least 6 characters").should("be.visible");
  });

  // ── Password Visibility Toggle ─────────────────────────────
  it("toggles password visibility when eye icon is clicked", () => {
    cy.get('input[id="password"]').should("have.attr", "type", "password");
    // Click the toggle button (inside the password wrapper)
    cy.get('input[id="password"]')
      .parent()
      .find("button[type='button']")
      .click();
    cy.get('input[id="password"]').should("have.attr", "type", "text");
    // Click again to hide
    cy.get('input[id="password"]')
      .parent()
      .find("button[type='button']")
      .click();
    cy.get('input[id="password"]').should("have.attr", "type", "password");
  });

  // ── API Intercept ─────────────────────────────────────────
  it("calls login and temp-password APIs on valid submission", () => {
    cy.intercept("POST", "**/DashboardAuth/Login", {
      statusCode: 200,
      body: { token: "tok123", refreshToken: "ref123", role: "superadmin" },
    }).as("loginApi");

    cy.intercept("POST", "**/DashboardAuth/check-temp-password", {
      statusCode: 200,
      body: { isTemporary: false },
    }).as("tempApi");

    cy.get('input[id="email"]').type("admin@beitak.com");
    cy.get('input[id="password"]').type("password123");
    cy.contains("button[type='submit']", "Login").click();

    cy.wait("@loginApi");
    cy.wait("@tempApi");
  });
});
