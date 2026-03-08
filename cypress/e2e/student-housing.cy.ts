describe("Student Housing", () => {
  beforeEach(() => {
    cy.visit("/dorms/student-housing")
  })

  it("loads the student housing page", () => {
    cy.url().should("include", "/dorms/student-housing")
  })

  it("shows the form with Name, Description and Selects", () => {
    cy.get('label[for="name"]').should("contain", "Name")
    cy.get('input[id="name"]').should("be.visible")
    cy.get('label[for="Description"]').should("contain", "Description")
    cy.get('input[id="Description"]').should("be.visible")
    cy.contains("Compound").should("be.visible")
    cy.contains("Gender").should("be.visible")
    cy.contains("Area").should("be.visible")
    cy.contains("districts").should("be.visible")
  })

  it("shows Submit, Preview, Save Draft and Close buttons", () => {
    cy.contains("button", "Submit").should("be.visible")
    cy.contains("button", "Preview").should("be.visible")
    cy.contains("button", "Save Draft").should("be.visible")
    cy.contains("button", "Close").should("be.visible")
  })

  it("shows validation when submitting empty form", () => {
    cy.contains("button", "Submit").click()
    cy.contains("Name is required").should("be.visible")
    cy.contains("Photo is required").should("be.visible")
    cy.contains("Description is required").should("be.visible")
  })

  it("Close button resets form fields", () => {
    cy.get('input[id="name"]').type("Test Name")
    cy.get('input[id="Description"]').type("Test Description")
    cy.contains("button", "Close").click()
    cy.get('input[id="name"]').should("have.value", "")
    cy.get('input[id="Description"]').should("have.value", "")
  })
})
