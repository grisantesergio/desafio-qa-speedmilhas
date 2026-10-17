# Plano de Testes — Speed Milhas

## 1. Objetivo e escopo

Validar os principais fluxos da aplicação Speed Milhas, priorizando a integridade dos dados, a consistência dos cálculos, as regras de negócio relacionadas a cupons de desconto e a comunicação com serviços externos.

A estratégia contempla testes funcionais, negativos, de integração e ponta a ponta (E2E), além da análise da implementação da funcionalidade de cupons na branch `feature/cupom-desconto`.

A execução será orientada por risco, considerando impacto para o negócio, probabilidade de falha e criticidade dos fluxos afetados.

## 2. Riscos priorizados

| Prioridade | Risco | Impacto potencial |
|---|---|---|
| P1 — Crítica | Cálculo incorreto do preço final após a aplicação de desconto | Cobrança ou apresentação de valores incorretos ao usuário. |
| P1 — Crítica | Aplicação indevida de cupons inválidos, expirados ou fora das regras de elegibilidade | Concessão indevida de descontos e inconsistência comercial. |
| P1 — Crítica | Falhas na integração com fornecedores durante a busca ou cotação | Indisponibilidade do fluxo principal ou apresentação de resultados inconsistentes. |
| P2 — Alta | Persistência incorreta dos dados da cotação, do preço ou do desconto | Divergência entre os dados exibidos e os dados armazenados. |
| P2 — Alta | Tratamento inadequado de erros e respostas inesperadas de serviços externos | Falhas não controladas, mensagens inadequadas ou interrupção do fluxo. |
| P3 — Média | Problemas de usabilidade, validação de campos e apresentação de mensagens | Dificuldade de utilização e aumento de erros operacionais. |

*As prioridades são hipóteses iniciais de risco e devem ser refinadas conforme os critérios de aceite, as regras implementadas e os resultados da exploração da aplicação.*

## 3. Estratégia de automação

### 3.1. Testes de API

Priorizar testes automatizados para validar:

- Códigos HTTP, estrutura e tipos dos campos de resposta.
- Validação de dados obrigatórios e tratamento de entradas inválidas.
- Regras de negócio relacionadas à aplicação de cupons.
- Cálculo do desconto e composição do preço final.
- Tratamento de falhas e respostas inesperadas de integrações.
- Consistência dos dados retornados pelos endpoints envolvidos no fluxo.

### 3.2. Testes E2E

Implementar testes para os principais fluxos críticos da interface:

1. Execução do fluxo principal de busca e obtenção de cotação.
2. Aplicação de cupom válido e verificação do valor final apresentado.
3. Tentativa de aplicação de cupom inválido e validação do comportamento esperado.

Os cenários devem validar tanto o resultado funcional quanto os efeitos observáveis para o usuário. A cobertura definitiva depende da funcionalidade disponível no ambiente e dos critérios de aceite.

### 3.3. Critérios para seleção dos cenários

A automação deve priorizar cenários determinísticos, repetíveis e com alto potencial de regressão. Casos de teste devem utilizar dados controlados, resultados esperados explícitos e verificações independentes da implementação sempre que possível.

## 4. Testes manuais e exploratórios

- Explorar combinações de valores, regras de elegibilidade e limites de desconto.
- Avaliar o comportamento para cupons inexistentes, expirados, já utilizados ou incompatíveis, quando essas regras forem aplicáveis.
- Verificar arredondamento, precisão monetária e apresentação dos valores.
- Simular indisponibilidade, lentidão e respostas inesperadas dos fornecedores.
- Avaliar mensagens de sucesso e erro, navegação e recuperação após falhas.
- Inspecionar o comportamento visual em diferentes tamanhos de tela.

Os cenários exploratórios serão orientados pelas evidências observadas durante a execução e pelas regras definidas na especificação.

## 5. Fora do escopo inicial

- Testes de carga e estresse, devido à ausência de metas de desempenho e de um ambiente dedicado para esse fim.
- Testes abrangentes de segurança, que exigem escopo e metodologia específicos.
- Matriz extensa de compatibilidade entre navegadores e dispositivos.
- Cobertura automatizada exaustiva de todas as combinações de entrada, priorizando inicialmente os fluxos de maior risco.

Esses itens poderão ser incorporados em etapas posteriores, conforme a criticidade identificada e os recursos disponíveis.

## 6. Critérios de saída

A execução inicial será considerada concluída quando:

- Os cenários prioritários tiverem sido executados e seus resultados registrados.
- Os defeitos reproduzíveis estiverem documentados com evidências e passos para reprodução.
- Os testes automatizados implementados apresentarem resultados verificáveis.
- Os riscos residuais e as limitações de cobertura estiverem explicitados.
- A revisão da branch `feature/cupom-desconto` estiver documentada, com atenção à correção das regras de negócio, ao tratamento de erros e à possibilidade de regressões.
