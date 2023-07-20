export {};

const login = () => {
  cy.intercept('POST', '/api/login').as('loginRequest');

  cy.get('input[name="email"]').should('be.visible').type('user@email.com');
  cy.get('input[name="password"]').type('password');
  cy.get('button').contains('Log In').click();

  cy.wait('@loginRequest');
  cy.url().should('include', '/dashboard');
};

describe('Client Page Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should go to client page', () => {
    login();
    cy.get('a').contains('Test Client').click();
    cy.get('h1').contains('Test Client');

    cy.url().should('include', '/dashboard/client');
  });

  it('should create new invoice', () => {
    login();

    cy.intercept('POST', '/api/invoice/addInvoice').as('addInvoiceRequest');

    cy.get('a').contains('Test Client').first().click();

    cy.url().should('include', '/dashboard/client');

    cy.get('div').contains('Create New Invoice').click();
    cy.get('input[name="due"]').should('be.visible').type('2023-06-30');
    cy.get('button').contains('Create Invoice').click();

    cy.wait('@addInvoiceRequest').then(() => {
      cy.url().should('include', '/dashboard/client/invoice');
    });
  });

  it('should delete an invoice', () => {
    login();

    cy.get('a').contains('Test Client').first().click();

    cy.url().should('include', '/dashboard/client');

    cy.get('#delete-button').click();
  });
});
