describe("Account Info Route", () => {
  it("loads the account info page", () => {
    cy.visit("/accountInfo")
    cy.url().should("include", "/accountInfo")
    cy.get("body").should("be.visible")
  })
})
