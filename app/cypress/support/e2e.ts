import "./commands";
before(() => {
  cy.login();
});

beforeEach(() => {
  cy.interceptReservation();
});