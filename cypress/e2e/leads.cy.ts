describe("Leads Route", () => {
  it("loads the leads page", () => {
    cy.visit("/leads")
    cy.url().should("include", "/leads")
    cy.get("body").should("be.visible")
  })
})
