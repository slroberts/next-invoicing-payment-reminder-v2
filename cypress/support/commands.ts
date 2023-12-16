Cypress.Commands.add('loginAsUser', () => {
  cy.visit('/login');
  cy.get('input[name=email]').type('user@email.com');
  cy.get('input[name=password]').type('password');
  cy.get('button').click();
});
