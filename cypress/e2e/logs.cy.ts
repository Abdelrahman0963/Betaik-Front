describe("Logs Route", () => {
  it("loads the logs page", () => {
    cy.visit("/logs")
    cy.url().should("include", "/logs")
    cy.get("body").should("be.visible")
  })
})
