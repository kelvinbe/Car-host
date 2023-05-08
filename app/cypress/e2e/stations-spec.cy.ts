/// <reference types="cypress"/>

import { STATIONS_DOMAIN } from "../../hooks/constants";

describe("Stations page tests", () => {
  let stationsLength: number;
  before(() => {
    cy.loginAsHost();
    cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
    .contains("stations")
    .click();
    cy.location("pathname").should("eq", "/stations");
    cy.exec("npm run generate-db");
    cy.request("GET", STATIONS_DOMAIN).then((response) => {
      stationsLength = response.body.data.length;
    });
  });
  it("Check if the page renders correctly", () => {
    cy.get('[data-testid="stations-table"]').should("exist");
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get('[data-cy="search-field"]').should("exist");
    cy.get('[data-cy="rounded-btn"]')
      .should("exist")
      .and("contain.text", "Create Station");

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
      .should("have.length", stationsLength > 10 ? 10 : stationsLength);
  });

  it("Create, View, Edit and delete functionalities", () => {
    cy.get('[data-cy="base-table"]').as("baseTable");

    //view station
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="view-button"]')
      .first()
      .click();
    cy.get('[data-cy="view-station-modal"]').should("exist").as("viewModal");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="view-station-modal"]').should("not.exist");

    //edit station
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="edit-button"]')
      .first()
      .click();
    cy.get('[data-cy="station-modal"]').should("exist").as("editModal");
    cy.get("@editModal")
      .should("be.visible")
      .contains("button", "Update Station");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="station-modal"]').should("not.exist");

    //create station
    cy.get('[data-cy="rounded-btn"]')
      .should("contain.text", "Create Station")
      .click();
    cy.get('[data-cy="station-modal"]').should("exist").as("createModal");
    cy.get("@createModal")
      .should("be.visible")
      .contains("button", "Create Station")
      .and('be.disabled');
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="station-modal"]').should("not.exist");

    //delete station
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="delete-button"]')
      .first()
      .click();
    cy.request("GET", STATIONS_DOMAIN).then((response) => {
      expect(response.body.data.length).to.eq(stationsLength - 1);
    });
  });
});
export {};