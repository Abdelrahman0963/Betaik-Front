describe("Dorms", () => {
  it("loads the dorms page", () => {
    cy.visit("/dorms")
    cy.url().should("include", "/dorms")
    cy.get("body").should("be.visible")
  })
})
