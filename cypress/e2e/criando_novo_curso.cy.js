/// <reference types="cypress" />

const fullName = 'Cypress - Desafio Revvo QA';
const shortName = new Date().getSeconds();
const idNumber = Cypress._.random(1, 10);
const description = 'Teste criação de novo curso via Cypress'

describe('Validando tela de login', () => {
  before(() => {
    cy.acessarMoodle();
  });

  it('Realizando login com usuário admin', () => {
    cy.realizarLogin();
  });

  it('Acessando o menu administração do site', () => {
    cy.wait(1000);
    cy.get('[data-key="siteadminnode"] > .nav-link').contains('Site administration').click();
    cy.get('.h2').contains('Site administration');
  });

  it('Acessando a aba cursos', () => {
    cy.wait(1000);
    cy.get('[data-key="courses"] > .nav-link').contains('Courses').click();
    cy.get('#linkcourses > .container-fluid > :nth-child(1) > .col-sm-3 > h4').contains('Courses');
  });

  it('Acessando formulário de criação de um novo curso', () => {
    cy.get('#linkcourses > .container-fluid > :nth-child(1) > .col-sm-9 > .list-unstyled > :nth-child(3) > a').contains('Add a new course').click();
  });

  it('Validando campos do formulário para criação de um novo curso', () => {
    cy.wait(1000);
    cy.get('[role="main"] > h2').contains('Add a new course');
    cy.get('#id_fullname_label').contains('Course full name');
    cy.get('#id_shortname_label').contains('Course short name');
    cy.get('#id_category_label').contains('Course category');
    cy.get('#id_visible_label').contains('Course visibility');
    cy.get('#id_startdate_label').contains('Course start date');
    cy.get('#id_enddate_label').contains('Course end date');
    cy.get('#id_idnumber_label').contains('Course ID number');
    cy.get('#id_summary_editor_label').contains('Course summary');
    cy.get('#id_overviewfiles_filemanager_label').contains('Course image');
    cy.get('#collapseElement-0').should('exist');
    cy.get('#collapseElement-1').should('exist');
    cy.get('#collapseElement-2').should('exist');
    cy.get('#collapseElement-3').should('exist');
    cy.get('#collapseElement-4').should('exist');
    cy.get('#collapseElement-5').should('exist');
    cy.get('#collapseElement-6').should('exist');
    cy.get('#collapseElement-7').should('exist');
    cy.get('#id_saveanddisplay').contains('Save and display');
    cy.get('#id_cancel').contains('Cancel');
  });

  it('Preenchendo informações do formulário', () => {
    cy.get('#id_fullname').type(fullName);
    cy.get('#id_shortname').type(shortName);
    cy.get('#id_idnumber').type(idNumber);
    cy.get('#id_summary_editor_ifr').type(description);
  });

  it('Finalizando formulário', () => {
    cy.get('#id_saveanddisplay').click();
  });

  it('Validando redirecionamento', () => {
    cy.wait(3000);
    cy.get('.h2').contains(fullName);
  });

  
  it('Realizando Log out', () => {
    cy.wait(1000);
    cy.get('#user-menu-toggle').click();
    cy.get('#page').contains('Log out').click({force: true});
  });
});
