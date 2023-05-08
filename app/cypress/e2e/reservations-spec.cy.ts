/// <reference types="cypress"/>

import { RESERVATION_DOMAIN } from "../../hooks/constants";

describe("Reservations page tests", () => {
  let reservationsLength: number;

  before(() => {
    cy.loginAsHost();
    cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains("reservations")
      .click();
    cy.location("pathname").should("eq", "/reservations");
    cy.exec("npm run generate-db");
    cy.request("GET", RESERVATION_DOMAIN).then((response) => {
      reservationsLength = response.body.data.length;
    });
  });
  it("Check if the page renders correctly", () => {
    cy.get('[data-testid="reservations-table"]').should("exist");
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get('[data-cy="search-field"]').should("exist");
    cy.get('[data-cy="rounded-btn"]').should("not.exist");
    cy.get("p").contains("Sort By:");
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .should("have.length", reservationsLength > 10 ? 10 : reservationsLength);
  });

  it("View, Edit and delete functionalities", () => {
    cy.get('[data-cy="base-table"]').as("baseTable");

    //view reservation

    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="view-button"]')
      .first()
      .click();
    cy.get('[data-cy="view-reservation-modal"]')
      .should("exist")
      .as("viewModal");
    cy.get('[data-cy="modal-header"]')
      .should("be.visible")
      .and("have.text", "Reservation");
    cy.get('[data-cy="modal-footer"]').should("not.exist");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="view-reservation-modal"]').should("not.exist");

    //edit reservation
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="edit-button"]')
      .first()
      .click();
    cy.get('[data-cy="edit-reservation-modal"]')
      .should("exist")
      .as("editModal");
    cy.get('[data-cy="modal-header"]')
      .should("be.visible")
      .and("have.text", "Edit Reservation");
    cy.get('[data-cy="modal-footer"]')
      .should("be.visible")
      .contains("button", "Edit");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="edit-reservation-modal"]').should("not.exist");

    //delete reservation
    cy.get("@baseTable")
      .wait(2000)
      .get("tbody")
      .find("tr")
      .get('[data-cy="delete-button"]')
      .first()
      .click();
    cy.request("GET", RESERVATION_DOMAIN).then((response) => {
      expect(response.body.data.length).to.eq(reservationsLength - 1);
    });
  });
});
export {};