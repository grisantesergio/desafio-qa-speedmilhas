# Automação de Testes — Cypress

## 1. Sobre o projeto

Este projeto contém testes automatizados desenvolvidos com Cypress para validar a interface web e a API da aplicação Speed Milhas.

O Cypress foi escolhido para realizar a automação dos testes por oferecer uma estrutura prática para validar aplicações web e APIs utilizando JavaScript.

A escolha também permitiu centralizar os testes E2E e de API em uma única ferramenta, simplificando a organização, a manutenção e a execução da suíte automatizada por meio de um único comando.

A ferramenta permite automatizar interações pela interface, como preenchimento de formulários, cliques e validações de resultados, além de executar requisições HTTP para testar os endpoints da API.

A automação foi implementada em JavaScript e está organizada em testes E2E (End-to-End) e testes de API.

## 2. Tecnologias utilizadas

- **Cypress:** framework de automação de testes.
- **JavaScript:** linguagem utilizada na implementação dos testes.
- **Node.js:** ambiente de execução do JavaScript.
- **npm:** gerenciamento das dependências.
- **Docker Compose:** inicialização dos serviços da aplicação.

## 3. Estrutura dos testes

```text
qa/
├── api/
│   └── api.cy.js
├── cypress/
│   ├── e2e/
│   │   ├── Busca.cy.js
│   │   ├── compra.cy.js
│   │   └── validacoes.cy.js
│   ├── fixtures/
│   └── support/
├── cypress.config.js
├── package.json
└── package-lock.json
```

### Testes E2E

Os testes E2E validam os principais fluxos da aplicação pela interface web.

- **Busca (`Busca.cy.js`):** valida o formulário de busca e seus campos.
- **Compra (`compra.cy.js`):** valida o fluxo de compra.
- **Validações (`validacoes.cy.js`):** verifica as validações dos formulários.

### Testes de API

Os testes de API estão no arquivo `qa/api/api.cy.js` e verificam os seguintes cenários:

1. **Health check:** valida se a API está funcionando, esperando status HTTP 200 e o retorno `{ "status": "ok" }`.
2. **Busca vazia:** verifica se uma requisição sem os dados obrigatórios retorna HTTP 400.
3. **Origem e destino iguais:** verifica se a API rejeita a busca com origem e destino iguais, retornando HTTP 400.
4. **Cotação inexistente:** verifica se a consulta de uma cotação inexistente retorna HTTP 404.

## 4. Pré-requisitos

Para executar a automação do zero, é necessário ter instalado:

- Git.
- Node.js e npm.
- Docker Desktop com Docker Compose.

## 5. Como executar do zero

### Passo 1 — Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/grisantesergio/desafio-qa-speedmilhas.git
```

Entre na pasta do projeto:

```bash
cd desafio-qa-speedmilhas
```

### Passo 2 — Iniciar a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Aguarde os serviços iniciarem. A interface web e a API devem estar disponíveis nos seguintes endereços:

- Interface web: http://localhost:3001
- API: http://localhost:3000

Mantenha o Docker Compose em execução enquanto os testes estiverem rodando.

### Passo 3 — Instalar as dependências

Abra outro terminal, entre na pasta `qa` e instale as dependências:

```bash
cd qa
npm install
```

O Cypress e as demais dependências serão instalados conforme a configuração do projeto.

### Passo 4 — Executar todos os testes

Na pasta `qa`, execute:

```bash
npm test
```

Esse comando executa os testes E2E e de API identificados pela configuração do Cypress.

O resultado será exibido no terminal, incluindo os testes aprovados e eventuais falhas.

## 6. Executar pelo modo interativo

Para abrir a interface gráfica do Cypress, execute dentro da pasta `qa`:

```bash
npx cypress open
```

Selecione os arquivos de teste disponíveis para acompanhar a execução individualmente.

## 7. Configuração do Cypress

A configuração está no arquivo `qa/cypress.config.js`.

Ela define:

- A URL-base da interface web: `http://localhost:3001`.
- Os arquivos de teste E2E em `cypress/e2e/`.
- Os arquivos de teste de API em `api/`.
- O arquivo de suporte utilizado pelo Cypress.

O comando `npm test` está definido no `qa/package.json` e executa `cypress run`.

## 8. Considerações finais

A automação combina testes E2E e testes de API para validar os principais fluxos da aplicação e verificar respostas de endpoints.

A execução depende de os serviços da aplicação estarem disponíveis localmente. Os testes ajudam a identificar falhas e a verificar regressões sem alterar diretamente o comportamento da aplicação.
