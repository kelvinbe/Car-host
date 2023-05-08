/// <reference types="cypress"/>

describe("Invites page tests", () => {
    before(() => {
      cy.loginAsAdmin();
      cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
      cy.get('[data-testid="sidebar-on-dashboard-links"]')
        .contains("invites")
        .click();
      cy.location("pathname").should("eq", "/dashboard/admin/invites");
      cy.exec("npm run generate-db");
    });
    it("Check if the page renders correctly", () => {
      cy.get('[data-cy="invites-container"]')
        .should("exist")
        .children()
        .and("have.length", 2);
    });
    it("Email form", () => {
      cy.get('[data-cy="email-form"]').should("exist").as("emailForm");
      cy.get("[type=email]").type("jane@doe");
      cy.get('[data-cy="error-message"]')
        .should("exist")
        .and("have.text", "Enter a valid email");
      cy.get("[type=email]").clear().type("jane@doe.com");
      cy.get('[data-cy="error-message"]').should("not.exist");
      cy.get('[data-cy="email-form-container"]').contains("button", "Invite");
    });
    it("Invites table", () => {
      const headings = ["Email\tStatus\n"];
      cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
      cy.get('[data-cy="base-table"]').as("baseTable");
      cy.get("@baseTableContainer")
        .get("@baseTable")
        .get("thead")
        .then(($td) => {
          const tableHeadings = Cypress._.map($td, "innerText");
          expect(tableHeadings, "headings").to.deep.equal(headings);
        });
  
      //test content in the tbody
      cy.get("@baseTableContainer")
        .get("@baseTable")
        .get("tbody")
        .find("tr")
        .should("exist");
    });
  });
  export {};