const urlFront = "http://localhost:3000"
const urlAPI = "http://localhost:3001/api"

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request("POST", `${urlAPI}/login`, { username, password }).then(({ body }) => {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(body))
        cy.visit(urlFront)
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${urlAPI}/blogs`,
        method: "POST",
        body: { title, author, url },
        headers: {
            "Authorization": `Bearer ${JSON.parse(window.localStorage.getItem("loggedBlogAppUser")).token}`
        }
    })
    cy.visit(urlFront)
})