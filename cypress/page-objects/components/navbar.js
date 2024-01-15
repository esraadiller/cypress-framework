export default class Navbar {
static clickOnLogo() {
    cy.get('.brand').click()
}
static search(text) {
    cy.get('#searchTerm').type(`${text} {enter}`)
}
static clickSignIn() {
    cy.get('#signin_button').click()
}

}

// </ <reference types="cypress" />

describe('Learn REST API Testing with Cypress', () => {
    it('passes', () => {
      cy.request('/users/2').then((response) => {
        cy.log(JSON.stringify(response.body.data.email))
        cy.log(JSON.stringify(response.headers))
      })
    })
  
    it('API Tests - Validate Headers', () => {
      cy.request('/users/2').as('user')
      cy.get('@user')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
  
      cy.get('@user')
        .its('headers')
        .its('connection')
        .should('include', 'keep-alive')
    })
  
    it('API Tests - Status Codes', () => {
      cy.request('/users/2').as('existingUser')
      cy.get('@existingUser').its('status').should('equal', 200)
  
      cy.request({ url: '/users/non-exist', failOnStatusCode: false }).as(
        'nonExistingUser'
      )
      cy.get('@nonExistingUser').its('status').should('equal', 404)
    })
  
    it('API Tests - GET Request', () => {
      cy.request({ url: '/users/2', method: 'GET' }).as('user')
      cy.get('@user').then((res) => {
        cy.log(JSON.stringify(res.body))
        expect(res.body.data.id).equal(2)
        expect(res.body.data.email).contain('janet.weaver@reqres.in')
        expect(res.body.data.last_name).not.to.contain('SomeFunnyName')
  
        const userID = res.body.data.id
        expect(userID).to.equal(2)
      })
    })
  
    it('API Tests - POST Request', () => {
      cy.request({
        url: '/login',
        method: 'POST',
        body: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
      }).as('loginRequest')
  
      cy.get('@loginRequest').its('status').should('equal', 200)
      cy.get('@loginRequest').then((res) => {
        expect(res.body.token).to.equal('QpwL5tke4Pnpja7X4')
      })
    })
  
    it('API Tests - POST Request - Error', () => {
      cy.request({
        url: '/login',
        method: 'POST',
        failOnStatusCode: false,
        body: { email: 'eve.holt@reqres.in' },
      }).as('loginRequest')
  
      cy.get('@loginRequest').its('status').should('equal', 400)
      cy.get('@loginRequest').then((res) => {
        expect(res.body.error).to.equal('Missing password')
      })
    })
  
    it('API Tests - DELETE Request', () => {
      cy.request({ url: '/users/2', method: 'DELETE' }).as('deleteUser')
      cy.get('@deleteUser').its('status').should('equal', 204)
    })
  
    it('API Tests - PUT Request', () => {
      cy.request({
        url: '/users/2',
        method: 'PUT',
        body: { name: 'name-update' },
        auth: { bearer: 'my-token-value' },
      }).as('putRequest')
  
      cy.get('@putRequest').its('status').should('equal', 200)
      cy.get('@putRequest').then((res) => {
        expect(res.body.name).to.equal('name-update')
      })
    })
  })