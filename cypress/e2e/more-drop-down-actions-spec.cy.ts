export {};

const login = () => {
  cy.intercept('POST', '/api/login').as('loginRequest');

  cy.get('input[name="email"]').should('be.visible').type('user@email.com');
  cy.get('input[name="password"]').type('password');
  cy.get('button').contains('Log In').click();

  cy.wait('@loginRequest');
  cy.url().should('include', '/dashboard');
};

describe('More Drop Down', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should toggle more drop down', () => {
    login();

    cy.get('#more-dropdown').first().click();

    cy.get('body').click('topRight');
  });

  it('should create new invoice', () => {
    login();

    cy.intercept('POST', '/api/invoice/addInvoice').as('addInvoiceRequest');

    cy.get('#more-dropdown').first().click();
    cy.get('#new-invoice').contains('New Invoice').should('be.visible');

    cy.get('#new-invoice').contains('New Invoice').click();
 
    cy.get('input[name="due"]').should('be.visible').type('2023-06-30');

    cy.get('button').contains('Create Invoice').click();

    cy.wait('@addInvoiceRequest').then(() => {
      cy.url().should('include', '/dashboard');
    });
  });

  it('should delete client', () => {
    login();

    cy.get('#more-dropdown').first().click();
    cy.get('#delete-client').contains('Delete Client').should('be.visible');

    cy.get('#delete-client').contains('Delete Client').click();
  });
});
