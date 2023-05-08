/// <reference types="cypress"/>

describe("All map view page tests", () => {
    before(() => {
      cy.loginAsAdmin();
      cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
      cy.get('[data-testid="sidebar-on-dashboard-links"]')
        .contains("all map view")
        .click();
      cy.location("pathname").should("eq", "/all-map-view");
      cy.exec("npm run generate-db");
    });
    it("Check if the page renders correctly", () => {
      cy.get('[data-cy="all-map-view-container"]').should("exist").children().and('have.length',3);
      cy.get('[data-cy="live-map"]').should("exist");
    });  
  });
  export {};