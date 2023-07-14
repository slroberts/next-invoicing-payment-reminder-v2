export {};

const login = () => {
  cy.intercept('POST', '/api/login').as('loginRequest');

  cy.get('input[name="email"]').should('be.visible').type('user@email.com');
  cy.get('input[name="password"]').type('password');
  cy.get('button').contains('Log In').click();

  cy.wait('@loginRequest');
  cy.url().should('include', '/dashboard');
};

describe('Add a Client', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should add a client', () => {
    login();

    cy.intercept('POST', '/api/client/addClient').as('addClientRequest');

    cy.get('button').contains('Add New Client').click();

    cy.get('input[name="name"]').should('be.visible').type('Test Client');
    cy.get('input[name="address"]').type('1234 Street, City, ST, 12345');
    cy.get('input[name="email"]').type('name@company.com');
    cy.get('input[name="phoneNumber"]').type('123-456-7890');

    cy.get('button').contains('Add Client').click();

    cy.wait('@addClientRequest').then(() => {
      cy.url().should('include', '/dashboard');
    });
  });
});
