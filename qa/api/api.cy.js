
describe('API - Testes de API', () => {
  // Teste 1: verifica se a API está funcionando
  it('deve retornar status 200 e status ok', () => {
    cy.request('GET', 'http://localhost:3000/health')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          status: 'ok',
        });
      });
  });

  // Teste 2: verifica se uma busca sem dados obrigatórios é rejeitada
  it('deve retornar status 400 ao enviar uma busca vazia', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/search',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // Teste 3: verifica se a API rejeita origem e destino iguais
  it('deve retornar status 400 quando origem e destino são iguais', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/search',
      body: {
        origin: 'GRU',
        destination: 'GRU',
        date: '2099-12-31',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // Teste 4: verifica a consulta de uma cotação inexistente
  it('deve retornar status 404 para uma cotação inexistente', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/quotes/cotacao-inexistente-qa',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
