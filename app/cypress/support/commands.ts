export {}
Cypress.Commands.add('loginAsHost', ()=>{
  cy.visit('http://localhost:3000');
  cy.get('[type="email"]').type("jeff@email.com")
  cy.get('[type="password"]').type("Password@123..")
  cy.contains('Log In').click()
})
Cypress.Commands.add('loginAsAdmin', ()=>{
  cy.visit('http://localhost:3000');
  cy.get('[type="email"]').type("admin@email.com")
  cy.get('[type="password"]').type("Password@123..")
  cy.contains('Log In').click()
})

Cypress.Commands.add('interceptReservation', ()=>{
cy.intercept('http://localhost:4000/reservations', {
  fixture: "reservation.json"
}).as('reservation')
})

