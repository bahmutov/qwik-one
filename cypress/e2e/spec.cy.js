/// <reference types="cypress" />

it('downloads the click handler to show the alert', () => {
  // get the window object and stub the alert method
  // and give it an alias "windowAlert"
  // Tip: cy.visit yields the window object
  // https://on.cypress.io/cy/visit
  // https://on.cypress.io/stub
  // https://on.cypress.io/as
  cy.visit('/').then((win) => {
    cy.stub(win, 'alert').as('windowAlert')
  })
  // spy on the JS download using cy.intercept command
  // Tip: get the JS file URL from the "on:click" attribute
  // of the "Click me" button
  // https://on.cypress.io/intercept
  // Note: the click handler resource includes "<pathname>#<random hash>"
  // so parse it to get just the pathname to call cy.intercept
  cy.contains('button', 'Click me')
    .as('button')
    .should('have.attr', 'on:click')
    .should('be.a', 'string')
    .then((clickResource) => {
      const pathname = clickResource.split('#')[0]
      cy.intercept({ method: 'GET', pathname }).as('clickHandler')
    })
  // click on the "Click me" button
  cy.get('@button').click()
  // confirm the "alert" was called with the string "42"
  cy.get('@windowAlert').should('have.been.calledWith', '42')
  // confirm the JS resource was requested
  cy.wait('@clickHandler')
})
