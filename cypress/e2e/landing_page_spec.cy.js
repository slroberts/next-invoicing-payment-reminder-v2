describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.url().should('include', '/');
  });

  it('displays the main heading', () => {
    cy.get('h2').contains('Invoicing & Payment Reminder App');
  });

  it('displays the main description', () => {
    cy.get('p').contains(
      'Generate and send invoices, as well as send automated follow-up reminders about overdue payments.'
    );
  });

  it('navigates to registration on Get Started click', () => {
    cy.get('button').contains('Get Started').click();
    cy.url().should('include', '/register');
  });

  it('displays the invoicing illustration image', () => {
    cy.get('figure')
      .find('img')
      .should(
        'have.attr',
        'alt',
        'Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
      );
  });

  it('displays all feature callouts', () => {
    cy.get('section').last().find('article').should('have.length', 3);
    cy.contains('Generate and Send Invoices');
    cy.contains('Automated Follow-Up Reminders');
    cy.contains('Track Overdue Payments');
  });
});
