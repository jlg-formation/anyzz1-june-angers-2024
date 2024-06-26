describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('footer > a').click();
    cy.get('span').click();
    cy.get('.button').click();
    cy.get('[title="Rafraîchir"]').click();
    /* ==== End Cypress Studio ==== */
  });
});
