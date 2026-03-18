describe("Payment Route", () => {
  it("loads the payment page", () => {
    cy.visit("/payment")
    cy.url().should("include", "/payment")
    cy.get("body").should("be.visible")
  })
})
