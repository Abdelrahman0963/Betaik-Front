describe("Settings Route", () => {
  it("loads the settings page", () => {
    cy.visit("/settings")
    cy.url().should("include", "/settings")
    cy.get("body").should("be.visible")
  })
})
