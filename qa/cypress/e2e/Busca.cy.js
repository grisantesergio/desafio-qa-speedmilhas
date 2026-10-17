
describe('E2E - Busca de passagens', () => {

  // Executa antes de cada teste, acessando a página inicial
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o formulário de busca', () => {

    // Verifica se o título do formulário está visível
    cy.contains('h1', 'Buscar passagens')
      .should('be.visible');

    // Verifica se a origem padrão é Guarulhos (GRU)
    cy.contains('label', 'Origem')
      .find('select')
      .should('have.value', 'GRU');

    // Verifica se o destino padrão é Galeão (GIG)
    cy.contains('label', 'Destino')
      .find('select')
      .should('have.value', 'GIG');

    // Verifica se o botão de busca está visível
    cy.contains('button', 'Buscar passagens')
      .should('be.visible');
  });

  it('deve permitir alterar origem e destino', () => {

    // Altera a origem para Brasília (BSB)
    cy.contains('label', 'Origem')
      .find('select')
      .select('BSB');

    // Altera o destino para Salvador (SSA)
    cy.contains('label', 'Destino')
      .find('select')
      .select('SSA');

    // Confirma que a origem foi alterada corretamente
    cy.contains('label', 'Origem')
      .find('select')
      .should('have.value', 'BSB');

    // Confirma que o destino foi alterado corretamente
    cy.contains('label', 'Destino')
      .find('select')
      .should('have.value', 'SSA');
  });

  it('deve exibir o campo de volta ao selecionar ida e volta', () => {

    // Seleciona a opção de viagem de ida e volta
    cy.contains('label', 'Ida e volta')
      .find('input')
      .check();

    // Verifica se o campo de data de volta aparece
    cy.contains('span', 'Volta')
      .should('be.visible');
  });

});
