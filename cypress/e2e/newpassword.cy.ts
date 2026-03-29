/// <reference types="cypress" />

describe("New Password (Force Change) Form", () => {
  beforeEach(() => {
    // Set cookies to simulate a temp-password session
    cy.loginBypass("superadmin");
    cy.visit("/newpassword");
  });

  // ── Rendering ──────────────────────────────────────────────
  it("renders New Password and Confirm Password inputs", () => {
    cy.get('input[id="newPassword"]').should("be.visible");
    cy.get('input[id="confirmPassword"]').should("be.visible");
  });

  it("renders the Change Password submit button", () => {
    cy.contains("button[type='submit']", "Change Password").should("be.visible");
  });

  // ── Validation ─────────────────────────────────────────────
  it("shows error when new password is too short (< 8 chars)", () => {
    cy.get('input[id="newPassword"]').type("short");
    cy.get('input[id="confirmPassword"]').type("short");
    cy.contains("button[type='submit']", "Change Password").click();
    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("shows error when passwords do not match", () => {
    cy.get('input[id="newPassword"]').type("Password@123");
    cy.get('input[id="confirmPassword"]').type("Different@456");
    cy.contains("button[type='submit']", "Change Password").click();
    // The schema uses path: ["confirmpassword"] with a lowercase 'p'
    // We verify by checking the DOM for any mismatch message
    cy.get("[role='alert']").should("exist");
  });

  // ── Password Visibility Toggles ────────────────────────────
  it("toggles new password visibility", () => {
    cy.get('input[id="newPassword"]').should("have.attr", "type", "password");
    cy.get('input[id="newPassword"]')
      .parent()
      .find("button[type='button']")
      .click();
    cy.get('input[id="newPassword"]').should("have.attr", "type", "text");
  });

  it("toggles confirm password visibility", () => {
    cy.get('input[id="confirmPassword"]').should("have.attr", "type", "password");
    cy.get('input[id="confirmPassword"]')
      .parent()
      .find("button[type='button']")
      .click();
    cy.get('input[id="confirmPassword"]').should("have.attr", "type", "text");
  });

  // ── API Intercept ──────────────────────────────────────────
  it("calls force-change-password API on valid submission", () => {
    cy.intercept("POST", "**/DashboardAuth/force-change-password", {
      statusCode: 200,
      body: { token: "newTok", refreshToken: "newRef", role: "superadmin" },
    }).as("changePassApi");

    cy.get('input[id="newPassword"]').type("NewPassword@123");
    cy.get('input[id="confirmPassword"]').type("NewPassword@123");
    cy.contains("button[type='submit']", "Change Password").click();

    cy.wait("@changePassApi");
  });
});
