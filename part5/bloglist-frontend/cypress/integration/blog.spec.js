describe("Blog app", function () {
    const urlFront = "http://localhost:3000"
    const urlAPI = "http://localhost:3001/api"

    beforeEach(function () {
        cy.request("POST", `${urlAPI}/testing/reset`)
        cy.visit(urlFront)
    })

    it("Login form is shown", function () {
        cy.contains("Log in to application")
        cy.contains("log in")
    })

    describe('Login', function () {
        beforeEach(function () {
            cy.request("POST", `${urlAPI}/users`, ({
                "username": "user",
                "password": "password",
                "name": "name"
            })
            )
            cy.request("POST", `${urlAPI}/users`, ({
                "username": "user1",
                "password": "password1",
                "name": "name1"
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

        describe('When logged in', function () {
            beforeEach(function () {
                cy.get("[data-test-id='login-form'] input[name='username']").type("user")
                cy.get("[data-test-id='login-form'] input[name='password']").type("password")
                cy.get("[data-test-id='login-form'] button").click()
                cy.contains("create new blog").click()
                cy.get("[data-test-id='createBlog-form'] input[name='title']").type("exampleTitle")
                cy.get("[data-test-id='createBlog-form'] input[name='author']").type("exampleAuthor")
                cy.get("[data-test-id='createBlog-form'] input[name='url']").type("exampleUrl")
                cy.get("[data-test-id='createBlog-form'] button").click()
            })

            it('A blog can be created', function () {
                cy.contains("exampleTitle - exampleAuthor")
                cy.contains("view")
            })

            it('A user can like a blog', function () {
                cy.contains("view").click()
                cy.contains("likes 0")
                cy.contains("like").click()
                cy.contains("likes 1")
            })

            describe('A user wants deleted a blog', function () {
                it('if it was created by him/her, it can be deleted', function () {
                    cy.contains("view").click()
                    cy.contains("remove").click()
                    cy.contains("exampleTitle - exampleAuthor").should('not.exist')
                    cy.contains("view").should('not.exist')
                })

                it('if it was not created by him/her, it cannot be deleted', function () {
                    cy.contains("logout").click()
                    cy.get("[data-test-id='login-form'] input[name='username']").type("user1")
                    cy.get("[data-test-id='login-form'] input[name='password']").type("password1")
                    cy.get("[data-test-id='login-form'] button").click()
                    cy.contains("view").click()
                    cy.contains("remove").click()
                    cy.contains("exampleTitle - exampleAuthor")
                    cy.get(".notification-error").should("contain", "The blog could not be removed.")
                        .and("have.css", "background-color", "rgb(255, 0, 0)")
                })
            })
        })
    })
})