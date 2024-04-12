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
      cy.intercept({ method: 'GET', pathname }, cy.stub().as('download'))
    })
  // Can you confirm that the click JavaScript resource
  // was downloaded _before_ the "alert" was called?
  // Tip: Sinon.js and Sinon-Chai has assertions to confirm
  // if one spy was called before another spy
  // https://sinonjs.org/
  // https://www.chaijs.com/plugins/sinon-chai/
  cy.get('@button').click()
  cy.get('@download')
    .should('have.been.calledOnce')
    .then((download) => {
      cy.get('@windowAlert')
        .should('have.been.calledWith', '42')
        .and('be.calledAfter', download)
    })
})
