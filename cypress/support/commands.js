/// <reference types="cypress" />

Cypress.Commands.add('acessarMoodle', () => {
    cy.visit('https://sandbox.moodledemo.net/');
});

Cypress.Commands.add('realizarLogin', (
    perfil = 'admin'
) => {
    cy.get('.login > a').click();
    cy.wait(1000);
    cy.get('#username').type('{selectall}{del}');
    cy.get('#username').type(perfil);
    cy.get('#password').type('sandbox24');
    cy.get('#loginbtn').contains('Acessar').click();
});

Cypress.Commands.add('realizarLogOut', () => {
    cy.wait(1000);
    cy.get('#user-menu-toggle').click();
    cy.get('#page').contains('Log out').click({force: true});
});