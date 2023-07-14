export {};

describe('Click button -> Get Started', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should click the Get Started button on landing page', () => {
    cy.get('a').contains('Get Started').click();
    cy.url().should('include', '/register');
  });
});
