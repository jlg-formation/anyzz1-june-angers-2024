describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Mentions Légales');
    cy.contains('a', 'Voir le stock').click();
    cy.contains('Liste des articles');
    cy.url().should('eq', Cypress.config().baseUrl + '/stock');
    cy.get('a[title="Ajouter"]').click();

    const uuid = (): number => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `a-${id}`;

    cy.get('input').eq(0).clear().type(testname);
    cy.get('input').eq(1).clear().type('123.45');
    cy.get('input').eq(2).clear().type('34');

    cy.contains('button', 'Ajouter').click();

    cy.contains('table tbody tr td', testname).click();
    cy.get('button[title="Supprimer"]').click();
    cy.contains('table tbody tr td', testname).should('not.exist');
  });
});
