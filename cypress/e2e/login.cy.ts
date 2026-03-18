describe("Login Route", () => {
  it("loads the login page", () => {
    cy.visit("/login")
    cy.url().should("include", "/login")
    cy.get("body").should("be.visible")
  })
})
