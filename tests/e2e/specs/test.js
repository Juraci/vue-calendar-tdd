// https://docs.cypress.io/api/introduction/api.html

describe("weekly task calendar", function() {
  before(function() {
    cy.visit("/");
  });

  it("displays the days of the week", function() {
    cy.get(".day.column").should("have.length", 7);
  });

  it("displays the form with the default day set to Monday", function() {
    cy.get("#calendar-entry").should("be.visible");
    cy.get(".calendar-entry-day").should("contain", "Monday");
  });

  it("displays the active day in the form when the day is clicked", function() {
    cy.get(".day.column")
      .eq(2)
      .click();
    cy.get(".calendar-entry-day").should("contain", "Wednesday");
  });

  it("submits a new event to the active day", function() {
    cy.get("#calendar-entry input").type("Learn Vue 3.0");
    cy.get("#calendar-entry .button").click();

    cy.get(".day.column")
      .eq(2)
      .as("Wednesday");

    cy.get("@Wednesday")
      .find(".day-event")
      .should("have.length", 2);
    cy.get("@Wednesday").should("contain", "Learn Vue 3.0");

    cy.get("#calendar-entry input").should("have.value", "");
  });

  it("displayes an error when the form is submitted without a value", function() {
    cy.get("#calendar-entry input").type(" ");
    cy.get("#calendar-entry .button").click();

    cy.get("#calendar-entry .error").should(
      "contain",
      "You should type something first!"
    );
  });

  it("allows for event editing", function() {
    cy.get(".day.column")
      .eq(2)
      .as("Wednesday");

    cy.get("@Wednesday").within(() => {
      cy.get(".day-event")
        .eq(1)
        .as("Event");

      cy.get("@Event")
        .find(".edit-icon")
        .click();

      cy.get("@Event")
        .find("input")
        .type("The event was updated");

      cy.get("@Event")
        .find(".fa-check")
        .click();

      cy.get("@Event").should("contain", "The event was updated");
    });
  });
});
