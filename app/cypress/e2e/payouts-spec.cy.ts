/// <reference types="cypress"/>

import { PAYOUT_DOMAIN } from "../../hooks/constants";

describe("Payouts page tests", () => {
  let payoutsLength: number;
  before(() => {
    cy.loginAsHost();
    cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains("payouts")
      .click();
    cy.location("pathname").should("eq", "/payouts");
    cy.exec("npm run generate-db");
    cy.request("GET", PAYOUT_DOMAIN).then((response) => {
      payoutsLength = response.body.data.length;
    });
  });
  it("Check if the page renders correctly", () => {
    cy.get('[data-testid="payouts-table"]').should("exist");
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get('[data-cy="search-field"]').should("not.exist");
    cy.get('[data-cy="rounded-btn"]')
      .should("not.exist")

    //sort by dropdown
    cy.get('[data-cy="sort-by"]').should("exist").as("sortByContainer");
    cy.get("@sortByContainer").contains("p", "Sort By:");
    cy.get("@sortByContainer").find('[data-cy="dropdown-button"]').click();
    cy.get('[data-cy="dropdown"]').should("be.visible");
    cy.get("@sortByContainer").find('[data-cy="dropdown-button"]').click();
    cy.get('[data-cy="dropdown"]').should("not.exist");

    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .should("have.length", payoutsLength > 10 ? 10 : payoutsLength);
  });

  it("View payout", () => {
    cy.get('[data-cy="base-table"]').as("baseTable");

    //view a payout
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="view-button"]')
      .first()
      .click();
    cy.get('[data-cy="payout-modal"]').should("exist")
    cy.get('header').should('have.text','Payout details')
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="payout-modal"]').should("not.exist");
  });
});
export {};