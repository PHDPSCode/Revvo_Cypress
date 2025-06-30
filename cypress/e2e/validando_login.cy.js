/// <reference types="cypress" />

const perfil = 'admin';


describe('Validando tela de login', () => {
  before(() => {
    cy.acessarMoodle();
  });

  it('Acessando tela de login', () => {
    cy.get('.login > a').click();
  });

  it('Validando campos da tela de login', () => {
    cy.get('.mb-4').contains('Acesso a Moodle 5.0 sandbox demo');
    cy.get('.login-form-forgotpassword > a').contains('Perdeu a senha?');
    cy.get('.login-instructions > .login-heading').contains('Esta é a sua primeira vez aqui?');
    cy.get('p').contains('You can use one of the following demo accounts to login:');
    cy.get(':nth-child(1) > em').contains('admin / sandbox24');
    cy.get(':nth-child(2) > em').contains('manager / sandbox24');
    cy.get(':nth-child(3) > em').contains('teacher / sandbox24');
    cy.get(':nth-child(4) > em').contains('student / sandbox24');
    cy.get('#action-menu-toggle-0').should('exist');
  });

  it('Realizando login com credenciais inválidas', () => {
    cy.get('#username').type('{selectall}{del}credencial_invalida');
    cy.get('#password').type('senha_invalida');
    cy.get('#loginbtn').contains('Acessar').click();
    cy.get('.alert').contains('Nome de usuário ou senha errados. Por favor tente outra vez.');
    cy.wait(1000);
  });

  it('Realizando login com credenciais válidas', () => {
    cy.get('#username').type('{selectall}{del}');
    cy.get('#username').type(perfil);
    cy.get('#password').type('{selectall}{del}');
    cy.get('#password').type('sandbox24');
    cy.wait(1000);
    cy.get('#loginbtn').contains('Acessar').click();
    cy.wait(1000);
    cy.get('[data-key="siteadminnode"] > .nav-link').contains('Site administration');
  });

  it('Realizando Log out', () => {
    cy.wait(1000);
    cy.get('#user-menu-toggle').click();
    cy.get('#page').contains('Log out').click({force: true});
  });
});
