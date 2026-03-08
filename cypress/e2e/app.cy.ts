describe("App", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("loads the home page", () => {
    cy.url().should("include", "/")
  })

  it("has visible content", () => {
    cy.get("body").should("be.visible")
  })
})
