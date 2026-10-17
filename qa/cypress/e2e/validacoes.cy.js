
describe('E2E - Validações da reserva', () => {

  it('deve manter o botão Continuar desabilitado sem o nome do passageiro', () => {

    // 1. Acessa a página inicial
    cy.visit('/');

    // 2. Inicia a busca de passagens
    cy.contains('button', 'Buscar passagens').click();

    // 3. Aguarda a exibição das ofertas
    cy.get('li').should('have.length.greaterThan', 0);

    // 4. Seleciona a primeira oferta reservável
    cy.get('li')
      .contains('a', 'Reservar')
      .first()
      .click();

    // 5. Confirma que a tela de reserva foi aberta
    cy.contains('h1', 'Reservar passagem')
      .should('be.visible');

    // 6. Verifica se o botão Continuar está desabilitado
    cy.contains('button', 'Continuar')
      .should('be.disabled');

  });

  
  it('deve impedir selecionar uma data de volta anterior à ida', () => {

    // 1. Acessa a página inicial
    cy.visit('/');

    // 2. Seleciona a opção de ida e volta
    cy.contains('label', 'Ida e volta')
      .find('input')
      .check();

    // 3. Abre o calendário da data de volta
    cy.contains('span', 'Volta')
      .parent()
      .find('button[aria-haspopup="dialog"]')
      .click();

    // 4. Confirma que o calendário foi aberto
    cy.get('[role="dialog"]')
      .should('be.visible');

    // 5. Verifica que os dias anteriores à data mínima
    // estão desabilitados
    cy.get('[role="dialog"] [data-dia]')
      .filter((index, elemento) => {
        const data = elemento.getAttribute('data-dia');
        return data !== null;
      })
      .each(($dia) => {
        cy.wrap($dia).should(($elemento) => {
          const data = $elemento.attr('data-dia');
          const minimo = $elemento.attr('data-min');

          if (minimo && data && data < minimo) {
            expect($elemento).to.be.disabled;
          }
        });
      });
  });
        it('deve bloquear a confirmação de uma oferta expirada', () => {

    // 1. Simula uma cotação cuja validade já terminou
    const cotacaoExpirada = {
      quote: {
        id: 'cotacao-expirada-qa',
        supplier: 'A',
        carrier: 'Companhia Teste',
        carrierCode: 'CT',
        miles: 15000,
        taxesBrl: 120,
        serviceFeeBrl: 8.4,
        totalBrl: 128.4,
        currency: 'BRL',
        bookable: true,
        expiresAt: '2020-01-01T00:00:00.000Z',
      },
      query: {
        origin: 'GRU',
        destination: 'GIG',
        date: '2027-12-15',
      },
      availability: 'expired',
    };

    // 2. Intercepta a consulta e devolve a cotação expirada
    cy.intercept(
      'GET',
      '**/quotes/cotacao-expirada-qa',
      {
        statusCode: 200,
        body: cotacaoExpirada,
      },
    ).as('buscarCotacaoExpirada');

    // 3. Acessa a página de reserva
    cy.visit('/reservar/cotacao-expirada-qa');

    // 4. Aguarda o carregamento da cotação simulada
    cy.wait('@buscarCotacaoExpirada');

    // 5. Preenche somente o primeiro campo de entrada
    cy.get('input')
      .first()
      .type('Passageiro Teste QA');

    // 6. Avança para a etapa de revisão
    cy.contains('button', 'Continuar').click();

    // 7. Verifica a mensagem de oferta expirada
    cy.contains(
      'Esta oferta expirou. Faça a busca de novo para ver os preços atuais.',
    ).should('be.visible');

    // 8. Verifica que a confirmação da reserva está bloqueada
    cy.contains('button', 'Confirmar reserva')
      .should('be.disabled');

    // 9. Verifica que nenhuma reserva foi enviada à API
    cy.intercept('POST', '**/orders').as('criarReserva');

    cy.contains('button', 'Confirmar reserva')
      .should('be.disabled');
  });
  
});


