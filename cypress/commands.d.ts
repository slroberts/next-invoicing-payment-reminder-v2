declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginAsUser(): Chainable<Subject>;
  }
}
