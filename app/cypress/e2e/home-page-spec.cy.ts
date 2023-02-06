/// <reference types="cypress"/>

describe('App dashboard tests', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('Tests the login page', () => {    
      cy.get('[type="email"]').type("wangui@testing.com")

      cy.get('[type="password"]').type("123456")

      cy.get("button").contains('Log In').click()
      cy.location('pathname', {timeout: 10000}).should('eq', '/dashboard')
    })

    it('Tests the dashboard', () => {    
      cy.contains("Upcoming Reservations")
    })
})
export {}