describe("Support Route", () => {
  it("loads the support page", () => {
    cy.visit("/support")
    cy.url().should("include", "/support")
    cy.get("body").should("be.visible")
  })
})
