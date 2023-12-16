describe('Header Component Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads the header', () => {
    cy.get('header').should('exist');
  });

  it('displays the brand logo', () => {
    cy.get('header').find('#app-brand').should('exist');
  });

  it('shows login button when user is not logged in', () => {
    cy.visit('/');
    cy.get('header').find('a[href="/login"]').should('exist');
  });

  it('navigates to the login page on login link click when user is not logged in', () => {
    cy.visit('/');
    cy.get('header').find('a[href="/login"]').click();
    cy.url().should('include', '/login');
  });

  it('shows user name and logout button when user is logged in', () => {
    cy.visit('/login');
    cy.loginAsUser();
    // Now the user should be logged in, proceed with your test
    cy.get('header').find('#user').should('exist');
    cy.get('header').find('#logout-button').should('exist');
  });
});
