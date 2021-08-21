describe("Blog app", function () {
    const urlFront = "http://localhost:3000"
    const urlAPI = "http://localhost:3001/api"

    beforeEach(function () {
        cy.request("POST", `${urlAPI}/testing/reset`)
        cy.visit(`${urlFront}`)
    })

    it("Login form is shown", function () {
        cy.contains("Log in to application")
        cy.contains("log in")
    })
})