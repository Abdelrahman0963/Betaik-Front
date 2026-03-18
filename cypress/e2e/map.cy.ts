describe("Map Route", () => {
  it("loads the map page", () => {
    cy.visit("/map")
    cy.url().should("include", "/map")
    cy.get("body").should("be.visible")
  })
})
