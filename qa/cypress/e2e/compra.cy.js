
describe('E2E - Compra de passagem', () => {
  it('deve iniciar uma reserva de passagem', () => {

    // 1. Acessa a página inicial
    cy.visit('/');

    // 2. Inicia a busca de passagens
    cy.contains('button', 'Buscar passagens').click();

    // 3. Verifica se existem ofertas disponíveis
    cy.get('li').should('have.length.greaterThan', 0);

    // 4. Seleciona a primeira oferta que permite reserva
    cy.get('li')
      .contains('a', 'Reservar')
      .first()
      .click();

    // 5. Verifica se a página de reserva foi aberta
    cy.contains('h1', 'Reservar passagem')
      .should('be.visible');

    // 6. Gera um número aleatório de até 4 algarismos
    const numeroAleatorio = Math.floor(Math.random() * 10000);

    // 7. Preenche o nome do passageiro com um identificador aleatório
    cy.get(':nth-child(1) > .h-\\[38px\\]')
      .type(`Sergio Teste QA ${numeroAleatorio}`);

    // 8. Avança para a etapa de revisão dos dados
    cy.get('.mt-5 > .rounded-md').click();

    // 9. Confirma a reserva
    cy.contains('button', 'Confirmar reserva').click();

    // 10. Verifica se a mensagem de confirmação está visível
    cy.contains('h2', 'Reserva confirmada', {
      timeout: 15000,
    }).should('be.visible');

  });
  
});
