# Plano de Testes — Speed Milhas

## 1. Objetivo e escopo

Validar os principais fluxos da aplicação Speed Milhas, priorizando a integridade dos dados, a consistência dos cálculos, as regras de negócio relacionadas às cotações e reservas e a comunicação com serviços externos.

A estratégia contempla testes funcionais, negativos, de integração e ponta a ponta (E2E), além da análise da implementação existente na branch `feature/cupom-desconto`, caso essa revisão permaneça no escopo do desafio.

A execução será orientada por risco, considerando impacto para o negócio, probabilidade de falha e criticidade dos fluxos afetados.

A cobertura inicial será composta por 3 testes E2E e 3 a 4 testes de API, complementados por testes manuais e exploratórios.

## 2. Riscos priorizados

| Prioridade | Risco | Impacto potencial |
|---|---|---|
| P1 — Crítica | Cálculo incorreto do preço final, incluindo a taxa de serviço de 7% e o arredondamento previsto na especificação | Apresentação de valores incorretos e divergência financeira. |
| P1 — Crítica | Permissão de reserva para opções sem taxa disponível | Tentativa de reserva sem condições válidas de contratação. |
| P1 — Crítica | Duplicidade de reservas em solicitações repetidas | Inconsistência dos dados e possível duplicidade de operações. |
| P1 — Crítica | Falhas no isolamento de dados entre as agências Alfa e Beta | Acesso indevido ou mistura de informações entre agências. |
| P1 — Crítica | Falhas na integração com fornecedores durante a busca ou cotação | Indisponibilidade do fluxo principal ou resultados inconsistentes. |
| P2 — Alta | Ordenação incorreta dos resultados ou tratamento inadequado de resultados parciais | Apresentação de opções fora dos critérios esperados ou perda de oportunidades. |
| P2 — Alta | Uso de cotação após o prazo de validade de 10 minutos | Utilização de valores desatualizados. |
| P2 — Alta | Busca que excede o limite de 6 segundos sem o tratamento esperado | Degradação da experiência e interrupção do fluxo. |
| P2 — Alta | Códigos HTTP ou contratos de resposta incompatíveis com a especificação | Falhas de integração e tratamento incorreto das respostas. |
| P3 — Média | Problemas de usabilidade, validação de campos e apresentação de mensagens | Dificuldade de utilização e aumento de erros operacionais. |

As prioridades são hipóteses iniciais de risco e devem ser refinadas conforme os critérios de aceite, a especificação e os resultados da exploração da aplicação.

## 3. Estratégia de automação

### 3.1. Testes de API

Implementar de 3 a 4 testes automatizados, priorizando:

- Validar códigos HTTP, estrutura e tipos dos campos de resposta conforme os contratos definidos.
- Validar o comportamento da busca, incluindo ordenação dos resultados, resultados parciais e tratamento de falhas dos fornecedores.
- Validar a composição do preço final, considerando a taxa de serviço de 7% e a regra de arredondamento para cima definida na especificação.
- Validar a criação de reservas, a idempotência de solicitações repetidas e as regras de isolamento entre as agências Alfa e Beta.

Quando aplicável, verificar os códigos HTTP 400 e 401 conforme as condições especificadas para cada endpoint, sem presumir que ambos sejam esperados para a mesma situação.

### 3.2. Testes E2E

Implementar 3 testes automatizados para cobrir os principais fluxos críticos da interface:

1. **Busca e apresentação de resultados:** executar uma busca e verificar a ordenação das opções e o comportamento diante de resultados parciais.
2. **Cotação e cálculo do preço:** verificar a composição do preço final, a taxa de serviço de 7% e a apresentação dos valores calculados.
3. **Fluxo de reserva:** validar a tentativa de reserva, a consistência dos dados e o comportamento diante de solicitações repetidas, quando suportado pelo ambiente.

Os testes devem validar resultados observáveis para o usuário e as regras de negócio especificadas. A seleção definitiva dos dados e das verificações dependerá dos recursos disponíveis no ambiente.

### 3.3. Critérios para seleção dos cenários

A automação deve priorizar cenários determinísticos, repetíveis e com alto potencial de regressão. Os casos de teste devem utilizar dados controlados, resultados esperados explícitos e verificações independentes da implementação sempre que possível.

A execução dos testes automatizados deve ser reproduzível por meio de um único comando documentado no `README.md`.

Os testes devem evidenciar defeitos existentes, sem corrigir a implementação da aplicação como parte da atividade de validação.

## 4. Testes manuais e exploratórios

- Verificar o limite de 6 segundos para a busca e o comportamento esperado quando esse limite for excedido.
- Simular indisponibilidade, lentidão e respostas inesperadas dos fornecedores.
- Validar a ordenação dos resultados conforme os critérios definidos na especificação.
- Verificar o tratamento de resultados parciais quando um ou mais fornecedores não retornarem resultados.
- Validar o cálculo da taxa de serviço de 7%, incluindo o arredondamento para cima.
- Verificar se opções sem taxa disponível são impedidas de seguir para a reserva.
- Validar a validade da cotação durante o período de 10 minutos e o comportamento após sua expiração.
- Repetir solicitações de reserva para verificar a idempotência e a ausência de duplicidade.
- Validar o isolamento dos dados entre as agências Alfa e Beta.
- Verificar os códigos HTTP 400 e 401 nas condições previstas na especificação.
- Avaliar mensagens de sucesso e erro, navegação e recuperação após falhas.
- Inspecionar o comportamento visual em diferentes tamanhos de tela.
- Documentar os defeitos identificados com passos para reprodução, resultado esperado, resultado obtido e evidências.

Os cenários exploratórios serão orientados pelas evidências observadas durante a execução e pelas regras definidas na especificação.

## 5. Fora do escopo inicial

- Testes de carga e estresse abrangentes, devido à ausência de metas específicas e de um ambiente dedicado.
- Testes abrangentes de segurança, que exigem escopo e metodologia específicos.
- Matriz extensa de compatibilidade entre navegadores e dispositivos.
- Cobertura automatizada exaustiva de todas as combinações de entrada, priorizando inicialmente os fluxos de maior risco.
- Correção de defeitos na aplicação durante a execução dos testes.

Esses itens poderão ser incorporados em etapas posteriores, conforme a criticidade identificada e os recursos disponíveis.

## 6. Critérios de saída

A execução inicial será considerada concluída quando:

- Os 3 testes E2E e os 3 a 4 testes de API previstos tiverem sido implementados e executados, com seus resultados registrados.
- A execução dos testes puder ser reproduzida por meio de um único comando documentado no `README.md`.
- Os defeitos reproduzíveis estiverem documentados em `BUGS.md`, com evidências, passos para reprodução, resultado esperado e resultado obtido.
- Os testes automatizados apresentarem resultados verificáveis, com falhas identificadas e sem mascaramento de defeitos para forçar a aprovação.
- Os riscos residuais e as limitações de cobertura estiverem explicitados.
- A análise da branch `feature/cupom-desconto` estiver documentada, caso essa atividade permaneça como requisito do desafio.
- O uso de ferramentas de IA e as decisões de análise de código estiverem documentados em `QA_NOTES.md`, conforme solicitado no desafio.
- Os arquivos e comportamentos de `mock-suppliers/` permanecerem preservados durante a validação.

A conclusão da execução não implica necessariamente que todos os testes tenham sido aprovados. Eventuais falhas devem ser registradas e analisadas de acordo com sua severidade e impacto para o negócio.