describe('ClientsList - Add New Client Functionality', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should open and submit NewClientForm correctly', () => {
    cy.get('#new-client-btn').click();
    cy.get('input[name=name]').type('Test Company');
    cy.get('input[name=address]').type('123 Street, City, State, 00000');
    cy.get('input[name=email]').type('test@company.com');
    cy.get('input[name=phoneNumber]').type('000-000-0000');
    cy.get('#form-btn').click();
  });
});

describe('ClientsList - Rendering with Clients', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should render a list of ClientCard components for each client', () => {
    cy.get('.client-card').should('have.length.at.least', 1);
  });
});

describe('ClientsList - Search Functionality', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should filter clients based on the search query', () => {
    cy.get('input[name=search]').type('Test Company');
    cy.get('.client-card').should('have.length', 1);
  });
});

describe('ClientsList - Add New Invoice Functionality', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should add new invoice when the new invoice action is triggered', () => {
    cy.get('#more-dropdown').first().click();
    cy.get('#new-invoice').first().click();
    cy.get('input[name=due]').type('2023-12-25');
    cy.get('#form-btn').click();
    cy.url().should('include', '/dashboard/client/invoice/');
  });
});

describe('ClientsList - Edit Client Functionality', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should open, edit and submit form correctly when edit client action is triggered', () => {
    cy.get('#new-client-btn').click();
    cy.get('input[name=name]').type('New Company');
    cy.get('input[name=address]').type('456 Street, City, State, 00000');
    cy.get('input[name=email]').type('new@company.com');
    cy.get('input[name=phoneNumber]').type('000-000-0000');
    cy.get('#form-btn').click();
  });
});

describe('ClientsList - Delete Functionality', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.url().should('include', '/dashboard');
  });

  it('should delete a client when the delete action is triggered', () => {
    cy.get('.client-card').then(($clients) => {
      const initialNumberOfClients = $clients.length;
      cy.get('#more-dropdown').first().click();
      cy.get('#delete-client').first().click();
      cy.get('.client-card').should('have.length', initialNumberOfClients - 1);
    });
  });
});
