export {};

describe('User should be able to register and login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should register a new account', () => {
    cy.intercept('POST', '/api/register').as('registerRequest');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');

    cy.get('input[name="email"]')
      .should('be.visible')
      .type('john.test@example.com');

    cy.get('input[name="password"]').type('password123');

    cy.get('button').contains('Register').click();

    cy.wait('@registerRequest').then(() => {
      cy.url().should('include', '/dashboard');
    });
  });

  it('should log in to an existing account', () => {
    cy.intercept('POST', '/api/login').as('loginRequest');

    cy.get('a').contains('Already have an account?').click();

    cy.get('input[name="email"]')
      .should('be.visible')
      .type('john.test@example.com');

    cy.get('input[name="password"]').type('password123');

    cy.get('button').contains('Log In').click();

    cy.wait('@loginRequest').then(() => {
      cy.url().should('include', '/dashboard');
    });
  });
});
