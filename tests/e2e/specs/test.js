// https://docs.cypress.io/api/introduction/api.html

describe('weekly task calendar', () => {
  before(() => cy.visit('/'))

  it('displays the days of the week', () => {
    cy.get('.day.column').should('have.length', 7)
  })

  it('displays the form with the default day set to Monday', () => {
    cy.get('#calendar-entry').should('be.visible');
    cy.get('.calendar-entry-day').should('contain', 'Monday');
  })
})
