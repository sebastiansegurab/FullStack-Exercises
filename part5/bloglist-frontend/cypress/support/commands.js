const urlFront = "http://localhost:3000"
const urlAPI = "http://localhost:3001/api"

Cypress.Commands.add('login', (username, password) => {
    cy.request("POST", `${urlAPI}/users`, { username, password })
})