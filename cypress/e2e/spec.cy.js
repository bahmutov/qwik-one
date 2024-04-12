/// <reference types="cypress" />

it('downloads the click handler to show the alert', () => {
  // get the window object and stub the alert method
  // and give it an alias "windowAlert"
  // Tip: cy.visit yields the window object
  // https://on.cypress.io/cy/visit
  // https://on.cypress.io/stub
  // https://on.cypress.io/as
  cy.visit('/')
  //
  // spy on the JS download using cy.intercept command
  // Tip: get the JS file URL from the "on:click" attribute
  // of the "Click me" button
  // https://on.cypress.io/intercept
  // Note: the click handler resource includes "<pathname>#<random hash>"
  // so parse it to get just the pathname to call cy.intercept
  //
  // click on the "Click me" button
  // confirm the "alert" was called with the string "42"
  // confirm the JS resource was requested
})
