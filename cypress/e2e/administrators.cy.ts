describe("Administrators Route", () => {
  it("loads the administrators page", () => {
    cy.visit("/administrators")
    cy.url().should("include", "/administrators")
    cy.get("body").should("be.visible")
  })
})
