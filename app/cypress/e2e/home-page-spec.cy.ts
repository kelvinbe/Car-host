/// <reference types="cypress"/>

describe('App dashboard tests', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Tests the login page', () => {
    cy.get('[type="email"]').type('wangui@testing.com');

    cy.get('[type="password"]').type('123456');

    cy.get('button').contains('Log In').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard');
  });

  it('Tests the dashboard component', () => {
    cy.contains('Upcoming Reservations');
    cy.get('[data-testid="preview-table-container"]').should('exist');
    cy.get('[data-testid="preview-table-container"]')
      .find('table')
      .should('have.length', 2);
    cy.get('[data-testid="preview-table-container"]')
      .find('img')
      .should('have.length', 8);
    cy.get('[data-testid="map-component"]').should('exist');
  });

  it('Tests the reservation component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('reservations')
      .click();
    cy.location('pathname').should('eq', '/reservations');
    cy.get('[data-testid="reservations-table"]').should('exist');
    cy.get('button').contains('Create Reservation');
    cy.get('p').contains('Sort By:');
    cy.get('p').contains('Description');
    cy.get('p').contains('Name');
    cy.get('p').contains('Age');
  });

  it('Tests the locations component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('locations')
      .click();
    cy.location('pathname').should('eq', '/locations');
    cy.get('[data-testid="locations-table"]').should('exist');
    cy.get('button').contains('Create Location');
    cy.get('p').contains('Sort By:');
    cy.get('p').contains('Location Id');
  });

  it('Tests the Vehicle Management component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('vehicle management')
      .click();
    cy.location('pathname').should('eq', '/vehicle-management');
    cy.get('[data-testid="vehicle-management-table"]').should('exist');
    cy.get('table').contains('th', 'Vehicle');
    cy.get('table').contains('th', 'Vehicle Id');
    cy.get('table').contains('th', 'Vehicle Type');
    cy.get('table').contains('th', 'Vehicle Model');
    cy.get('table').contains('th', 'LocationId');
  });
  it('Tests the AuthCode component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('AuthCode')
      .click();
    cy.location('pathname').should('eq', '/auth-code-management');
    cy.get('[data-testid="auth-code-management-table"]').should('exist');
    cy.get('button').contains('Create AuthCode');
    cy.get('p').contains('Sort By:');
    cy.get('p').contains('Date');
    cy.get('table').contains('th', 'Date');
    cy.get('table').contains('th', 'Code');
    cy.get('table').contains('th', 'Status');
    cy.get('table').contains('th', 'Actions');
  });
  it('Tests the Payout component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('payouts')
      .click();
    cy.location('pathname').should('eq', '/payouts');
    cy.get('[data-testid="payouts-table"]').should('exist');
    cy.get('p').contains('Sort By:');
    cy.get('p').contains('Amount');
    cy.get('table').contains('th', 'Pay Date');
    cy.get('table').contains('th', 'Amount');
    cy.get('table').contains('th', 'Status');
  });
  it('Tests the Integration component', () => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should('exist');
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains('integrations')
      .click();
    cy.location('pathname').should('eq', '/integrations');
    cy.get('[data-testid="integrations-table"]').should('exist');
    cy.get('table').contains('th', 'Integration Name');
    cy.get('table').contains('th', 'Status');
    cy.get('table').contains('th', 'Actions');
  });
});
export {};
