/// <reference types="cypress"/>

describe("Dashboard page tests", () => {
  before(() => {
    cy.loginAsHost();
    cy.get('[data-cy="dashboard"]').should("exist");
  });

  afterEach(() => {
    cy.get('[data-testid="sidebar-on-dashboard"]').should("exist");
    cy.get('[data-testid="sidebar-on-dashboard-links"]')
      .contains("dashboard")
      .click();
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("Tests the Upcoming Reservations component", () => {
    cy.get('[data-testid="preview-table-container"]').as("previewTable");
    cy.get("@previewTable").should("exist");
    cy.get("@previewTable").should("have.length", 3);
    cy.get("@previewTable").eq(0).should("contain", "Upcoming Reservations");

    //confirm table headings for Upcoming Reservations
    const headings = ["Pickup\tDropoff\tTotal\tStatus\n"];
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get("@baseTableContainer")
      .get("@baseTable")
      .get("thead")
      .eq(0)
      .then(($td) => {
        const tableHeadings = Cypress._.map($td, "innerText");
        expect(tableHeadings, "headings").to.deep.equal(headings);
      });

    //test content in the tbody
    cy.get("@baseTableContainer")
      .get("@baseTable")
      .get("tbody")
      .first()
      .find("tr")
      .should("have.length", 4);

    cy.get("@previewTable")
      .eq(0)
      .contains("p", "Manage")
      .click()
      .url()
      .should("eq", "http://localhost:3000/reservations");
  });

  it("Your vehicles component", () => {
    cy.get('[data-testid="preview-table-container"]').as("previewTable");
    cy.get('[data-testid="vehicle-image-container"]').as("imageCont");
    cy.get("@previewTable").eq(1).should("contain", "Your Vehicles");
    cy.get("@previewTable").eq(1).find("img").should("have.length", 2);
    cy.get("@imageCont").eq(0).trigger("mouseover");
    cy.get('[data-cy="redirect-vehicle-mgmt"]')
      .click({ force: true })
      .url()
      .should("eq", "http://localhost:3000/vehicle-management");
  });

  it("Last 10 Payouts component", () => {
    cy.get('[data-testid="preview-table-container"]').as("previewTable");
    cy.get("@previewTable").eq(2).should("contain", "Last 10 Payouts");

    //confirm table headings for Last 10 Payouts
    const headings = ["Payout Date\t\nAmount\n\tStatus\n"];
    cy.get('[data-cy="base-table-container"]').as("baseTableContainer");
    cy.get('[data-cy="base-table"]').as("baseTable");
    cy.get("@baseTableContainer")
      .get("@baseTable")
      .get("thead")
      .eq(1)
      .then(($td) => {
        const tableHeadings = Cypress._.map($td, "innerText");
        expect(tableHeadings, "headings").to.deep.equal(headings);
      });

    //test content in the tbody
    cy.get("@baseTableContainer")
      .get("@baseTable")
      .get("tbody")
      .last()
      .find("tr")
      .should("have.length", 4);

    cy.get("@previewTable")
      .eq(2)
      .contains("p", "Manage")
      .click()
      .url()
      .should("eq", "http://localhost:3000/payouts");
  });
  it("Live map component", () => {
    cy.get('[data-cy="live-map"]').should("exist");
  });
});
export {};