/// <reference types="cypress" />

it('downloads the click handler to show the alert', () => {
  cy.visit('/').then((win) => {
    cy.stub(win, 'alert').as('windowAlert')
  })
  cy.contains('button', 'Click me')
    .as('button')
    .should('have.attr', 'on:click')
    .should('be.a', 'string')
    .then((clickResource) => {
      const pathname = clickResource.split('#')[0]
      cy.intercept({ method: 'GET', pathname }).as('clickHandler')
    })
  // Can you confirm that the click JavaScript resource
  // was downloaded _before_ the "alert" was called?
  // Tip: Sinon.js and Sinon-Chai has assertions to confirm
  // if one spy was called before another spy
  // https://sinonjs.org/
  // https://www.chaijs.com/plugins/sinon-chai/
  cy.get('@button').click()
  cy.get('@windowAlert').should('have.been.calledWith', '42')
  cy.wait('@clickHandler')
})
