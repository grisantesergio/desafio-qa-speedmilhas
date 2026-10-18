# QA Notes

## Notas

O desafio foi realizado com foco na identificação de problemas funcionais, na documentação dos bugs encontrados e na implementação de testes automatizados.

Foram realizados testes exploratórios na interface, além de automações E2E e de API para validar os comportamentos esperados da aplicação.

Os bugs identificados foram documentados em `BUGS.md`, com evidências disponíveis. O planejamento dos testes foi registrado em `PLANO.md`.

## Tempo gasto

Dediquei aproximadamente **4 horas** à realização do desafio, incluindo a análise da aplicação, elaboração do plano de testes, execução dos testes exploratórios, registro de bugs, desenvolvimento das automações E2E e API e documentação dos resultados.

## Como rodar a automação

### Pré-requisitos

Para executar a automação do zero, é necessário ter instalado:

- Git
- Node.js e npm
- Docker Desktop com Docker Compose

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

- Interface web: [http://localhost:3001](http://localhost:3001)
- API: [http://localhost:3000](http://localhost:3000)

Mantenha o Docker Compose em execução enquanto os testes estiverem rodando.

### Passo 3 — Instalar as dependências

Abra outro terminal e entre na pasta `qa`:

```bash
cd qa
npm install
```

### Passo 4 — Executar os testes

Ainda na pasta `qa`, execute:

```bash
npm test
```

O resultado será exibido no terminal, indicando os testes aprovados e eventuais falhas.

### Execução pelo modo interativo

Para abrir a interface gráfica do Cypress, execute dentro da pasta `qa`:

```bash
npx cypress open
```

## O que eu faria com mais tempo

Com mais tempo disponível, ampliaria a cobertura dos testes exploratórios e automatizados, incluindo cenários adicionais de falha e indisponibilidade de fornecedores, validações de dados, expiração de cotações e consistência das informações apresentadas.

Também investiria na integração dos testes a um pipeline de CI/CD, permitindo a execução automática e facilitando a identificação de regressões a cada alteração no projeto.

## Como usei IA

Utilizei inteligência artificial como apoio na revisão dos textos e na melhoria da clareza, organização e consistência da documentação do desafio.

Apoio para organizar o raciocínio e revisar possíveis inconsistências durante a análise do PR
