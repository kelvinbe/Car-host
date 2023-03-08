export {}
Cypress.Commands.add('login', ()=>{
  cy.visit('http://localhost:3000');
  cy.get('[type="email"]').type("fx@test.com")
  cy.get('[type="password"]').type("123456")
  cy.contains('Log In').click()
})

Cypress.Commands.add('interceptReservation', ()=>{
cy.intercept('http://localhost:4000/reservations', {
  fixture: "reservation.json"
}).as('reservation')
})

