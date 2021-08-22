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

    describe.only('Login', function () {
        beforeEach(function () {
            cy.request("POST", `${urlAPI}/users`, ({
                "username": "user",
                "password": "password",
                "name": "name"
            })
            )
        })
        it('succeeds with correct credentials', function () {
            cy.get("[data-test-id='login-form'] input[name='username']").type("user")
            cy.get("[data-test-id='login-form'] input[name='password']").type("password")
            cy.get("[data-test-id='login-form'] button").click()
            cy.contains("name logged in")
        })

        it('fails with wrong credentials', function () {
            cy.get("[data-test-id='login-form'] input[name='username']").type("user")
            cy.get("[data-test-id='login-form'] input[name='password']").type("password-incorrect")
            cy.get("[data-test-id='login-form'] button").click()
            cy.get(".notification-error").should("contain", "User or password incorrect.")
                .and("have.css", "background-color", "rgb(255, 0, 0)")
        })

    })
})