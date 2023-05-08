/// <reference types="cypress"/>

import {
    AUTHCODE_DOMAIN,
    REQUESTED_AUTHCODE_DOMAIN,
  } from "../../hooks/constants";
  
  describe("AuthCode page tests", () => {
    let authcodesLength: number;
    let requestedAuthcodesLength: number;
  
    before(() => {
      cy.loginAsHost();
      cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
      cy.get('[data-testid="sidebar-on-dashboard-links"]')
        .contains("AuthCode")
        .click();
      cy.location("pathname").should("eq", "/auth-code-management");
      cy.exec("npm run generate-db");
      cy.request("GET", AUTHCODE_DOMAIN).then((response) => {
        authcodesLength = response.body.data.length;
      });
      cy.request("GET", REQUESTED_AUTHCODE_DOMAIN).then((response) => {
        requestedAuthcodesLength = response.body.data.length;
      });
    });
  
    it("Generated authcodes", () => {
      cy.get('[data-testid="auth-code-management-table"]').should("exist");
      cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
      cy.get('[data-cy="base-table"]').as("baseTable");
      cy.get('[data-cy="search-field"]').should("exist");
      cy.get('[data-cy="rounded-btn"]')
        .should("exist")
        .and("contain.text", "View Requests");
      cy.get('[data-cy="sort-by"]').should("not.exist");
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .should("have.length", authcodesLength > 10 ? 10 : authcodesLength);
  
      //view customers
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .get('[data-cy="view-customer-button"]')
        .first()
        .click();
      cy.get('[data-cy="view-customer-modal"]').should("be.visible");
      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="view-customer-modal"]').should("not.exist");
    });
  
    it("Requested authcodes", () => {
      cy.get('[data-cy="rounded-btn"]')
        .should("contain.text", "View Requests")
        .click();
      cy.get('[data-testid="auth-code-management-table"]').should("exist");
      cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
      cy.get('[data-cy="base-table"]').as("baseTable");
      cy.get('[data-cy="search-field"]').should("exist");
      cy.get('[data-cy="rounded-btn"]')
        .should("exist")
        .and("contain.text", "View All Authcodes");
      cy.get('[data-cy="sort-by"]').should("not.exist");
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .should(
          "have.length",
          requestedAuthcodesLength > 10 ? 10 : requestedAuthcodesLength
        );
  
      //view customers
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .get('[data-cy="view-customer-button"]')
        .first()
        .click();
      cy.get('[data-cy="view-customer-modal"]').should("be.visible");
      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="view-customer-modal"]').should("not.exist");
  
      //view a vehicle
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .get('[data-cy="view-requested-vehicle-button"]')
        .first()
        .click();
      cy.get('[data-cy="view-vehicle-modal"]').should("exist").as("viewModal");
      cy.get('[data-cy="close-modal-button"]').click();
      cy.get('[data-cy="view-vehicle-modal"]').should("not.exist");
  
      //create an authcode
      cy.get("@baseTable")
        .wait(2000)
        .get("tbody")
        .find("tr")
        .get("button")
        .contains("p", "Create")
        .first()
        .click();
      cy.get('button').contains('p','Get AuthCode').click()
      cy.get('[data-cy="generated-authcode"]').should('exist')
      cy.get('[data-cy="close-modal-button"]').click();
    });
  });
  export {};