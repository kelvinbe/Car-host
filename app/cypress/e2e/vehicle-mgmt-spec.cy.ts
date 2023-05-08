/// <reference types="cypress"/>

import { VEHICLES_DOMAIN } from "../../hooks/constants";

describe("Vehicle Management page tests", () => {
  let vehiclesLength: number;
  before(() => {
    cy.loginAsHost();
    cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains("vehicle management")
      .click();
    cy.location("pathname").should("eq", "/vehicle-management");
    cy.exec("npm run generate-db");
    cy.request("GET", VEHICLES_DOMAIN).then((response) => {
      vehiclesLength = response.body.data.length;
    });
  });
  it("Check if the page renders correctly", () => {
    cy.get('[data-testid="vehicle-management-table"]').should("exist");
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get('[data-cy="search-field"]').should("exist");
    cy.get('[data-cy="rounded-btn"]')
      .should("exist")
      .and("contain.text", "Add new vehicle");

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
      .should("have.length", vehiclesLength > 10 ? 10 : vehiclesLength);
  });

  it("Create, View, Edit and delete functionalities", () => {
    cy.get('[data-cy="base-table"]').as("baseTable");

    //view a vehicle
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="view-button"]')
      .first()
      .click();
    cy.get('[data-cy="view-vehicle-modal"]').should("exist").as("viewModal");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="view-vehicle-modal"]').should("not.exist");

    //edit a vehicle
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="edit-button"]')
      .first()
      .click();
    cy.get('[data-cy="edit-vehicle-modal"]').should("exist").as("editModal");
    cy.get("@editModal").should("be.visible").contains("button", "Edit");
    cy.get("@editModal").should("include.text", "Edit vehicle details");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="edit-vehicle-modal"]').should("not.exist");

    //create a vehicle
    cy.get('[data-cy="rounded-btn"]')
      .should("contain.text", "Add new vehicle")
      .click();
    cy.get('[data-cy="create-vehicle-modal"]')
      .should("exist")
      .as("createModal");
    cy.get("@createModal").should("be.visible").contains("button", "Create");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="create-vehicle-modal"]').should("not.exist");

    //delete a vehicle
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="delete-button"]')
      .first()
      .click();
    cy.request("GET", VEHICLES_DOMAIN).then((response) => {
      expect(response.body.data.length).to.eq(vehiclesLength - 1);
    });
  });
});
export {};