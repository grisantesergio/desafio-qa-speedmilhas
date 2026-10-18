# Bugs encontrados

## BUG-01 — Busca de ida e volta aceita data de retorno anterior à ida

- **Onde:** Tela de busca de passagens
- **Gravidade:** Alta
- **Regra da SPEC:** Regra 2 — a data de retorno não pode ser anterior à data de ida.

**Passos para reproduzir**

1. Acessar `http://localhost:3001`.
2. Selecionar o tipo de viagem **Ida e volta**.
3. Selecionar a origem GRU e o destino GIG.
4. Definir a data de ida como `25/10/2026`.
5. Definir a data de volta como `20/10/2026`.
6. Clicar em **Buscar passagens**.

**Resultado esperado**

A aplicação deve impedir a busca e exibir uma mensagem informando que a data de volta não pode ser anterior à data de ida.

**Resultado obtido**

A interface permite manter a data de volta anterior à data de ida e exibe resultados de passagens para a viagem.

**Evidência**

- Data de ida: `25/10/2026`.
- Data de volta: `20/10/2026`.
- A busca exibiu ofertas mesmo com as datas inconsistentes.

![BUG-01 - Data inválida](<evidências/BUG 1.png>)

**Impacto**

O usuário pode iniciar o processo de compra com datas de viagem inválidas, gerando confusão e possíveis falhas no fluxo de reserva.

## BUG-02 — Viagem de ida e volta permite avançar com apenas um trecho selecionado

**Severidade:** Alta

**Módulo:** Busca de passagens / Reserva

**Regra relacionada:** A especificação determina que, em viagens de ida e volta, os trechos de ida e retorno devem ser pesquisados e reservados separadamente.

**Descrição:**
Ao selecionar o tipo de viagem “Ida e volta”, o sistema permite avançar no fluxo preenchendo apenas os dados da ida ou apenas os dados da volta. Na etapa de confirmação, a reserva é apresentada como uma viagem somente de ida, mesmo que o usuário tenha selecionado a opção “Ida e volta”.

**Passos para reproduzir:**
1. Acessar a tela de busca de passagens.
2. Selecionar o tipo de viagem “Ida e volta”.
3. Preencher somente os dados da ida, sem completar o retorno.
4. Verificar que o sistema permite avançar no fluxo.
5. Repetir o teste preenchendo somente os dados da volta.
6. Avançar até a confirmação da reserva.

**Resultado atual:**
O sistema permite avançar com apenas um trecho preenchido e a confirmação apresenta a viagem como somente ida.

**Resultado esperado:**
O sistema deve validar os trechos de acordo com o tipo de viagem selecionado e não deve permitir uma confirmação inconsistente com os dados informados. A reserva de ida e volta deve respeitar o fluxo definido na especificação.

**Impacto:**
O usuário pode acreditar que está reservando uma viagem de ida e volta, mas concluir uma reserva registrada como somente ida, gerando risco de erro na compra e de insatisfação.

**Evidência:**

![BUG-02 - Ida e volta com apenas um trecho selecionado](<evidências/BUG 2.png>)

## BUG-03 — A interface remove ofertas válidas quando um fornecedor falha

- **Onde:** Interface de busca de passagens
- **Gravidade:** Alta
- **Regra da SPEC:** Regra 7 — resultados parciais devem ser exibidos quando um fornecedor falha ou demora.

**Passos para reproduzir**

1. Iniciar a aplicação e acessar `http://localhost:3001`.
2. Forçar uma falha no fornecedor B executando `curl -X POST http://localhost:4000/admin/force-fail/supplier-b`.
3. Pesquisar passagens de GRU para GIG em uma data futura.
4. Observar os resultados apresentados na interface.

**Resultado esperado**

A interface deve manter e exibir as ofertas recebidas dos fornecedores A e C, mostrando também um aviso de que pode haver mais opções para a data.

**Resultado obtido**

As ofertas aparecem inicialmente, mas depois desaparecem e a interface exibe a mensagem “Nenhuma oferta disponível agora”, apesar de os fornecedores A e C terem retornado ofertas válidas.

**Evidência**

- A chamada `POST /search` retornou `status: "partial"` e cinco ofertas válidas: duas do fornecedor A e três do fornecedor C.
- A chamada `GET /search/stream` também terminou com `status: "partial"` e cinco ofertas, enquanto o fornecedor B retornou erro.
- O comportamento foi reproduzido na interface: as ofertas apareceram e depois desapareceram.

![BUG-03 - Resultados parciais](<evidências/BUG 3.png>)

**Impacto**

O usuário pode acreditar que não existem passagens disponíveis e desistir da busca, mesmo quando há ofertas válidas.

## BUG-04 — Validação de e-mail aceita endereço sem ponto no domínio

- **Onde:** Formulário de reserva de passagem
- **Gravidade:** Média
- **Regra da SPEC:** Regra 11 — dados inválidos devem ser rejeitados com mensagem explicativa.

**Passos para reproduzir**

1. Acessar a interface e pesquisar passagens.
2. Selecionar uma oferta e clicar em **Reservar**.
3. Preencher o nome do passageiro.
4. Informar o e-mail `sergiogrisante@hotmailcom`.
5. Avançar para a tela de revisão da reserva.

**Resultado esperado**

A interface deve identificar o e-mail como inválido e exibir uma mensagem explicativa, impedindo o avanço até que o endereço seja corrigido.

**Resultado obtido**

A interface aceita `sergiogrisante@hotmailcom` e permite avançar para a revisão da reserva, embora o endereço não tenha o ponto separando o domínio da extensão.

**Evidência**

Foram realizados os seguintes testes:

- `abc`: exibe mensagem de erro.
- `sergiogrisante@hotmailcom`: permite avançar.
- Endereço com vírgula no lugar do ponto: exibe mensagem de erro.

![BUG-04 - E-mail inválido aceito](<evidências/BUG 4.png>)

**Impacto**

O usuário pode prosseguir com um endereço de e-mail inválido, comprometendo a possibilidade de contato relacionado à reserva.

**Observação**

O defeito confirmado está na validação da interface. Ainda não foi confirmado se a API permite concluir a reserva com esse endereço.

## BUG-05 — Campo de nome do passageiro aceita caracteres inválidos

**Severidade:** Média

**Módulo:** Reserva / Dados do passageiro

**Regra relacionada:** O nome do passageiro deve corresponder ao nome apresentado no documento de embarque.

**Descrição:**

O campo “Nome do passageiro” aceita valores que não representam um nome válido, incluindo sequências de símbolos e números. Durante o teste, os valores `---`, `123` e `@@@` foram aceitos, permitindo avançar até a tela de revisão da reserva.

**Passos para reproduzir:**

1. Realizar uma busca de passagens.
2. Selecionar uma oferta e clicar em “Reservar”.
3. No campo “Nome do passageiro”, inserir apenas símbolos, como `@@@`.
4. Preencher os demais dados obrigatórios, se necessário.
5. Clicar em “Continuar”.

**Resultado atual:**

O sistema aceita o valor `@@@` como nome do passageiro e permite avançar até a tela “Confira antes de reservar”.

**Resultado esperado:**

O sistema deve validar o nome do passageiro e rejeitar entradas que não constituam um nome válido, exibindo uma mensagem clara de validação.

**Evidência**

![BUG-05 - Nome do passageiro inválido aceito](<evidências/BUG 5.png>)

**Impacto:**

Dados inválidos podem ser utilizados na reserva, comprometendo a qualidade das informações do passageiro e dificultando a identificação correta durante o embarque.

### BUG-06 — Taxa de serviço não respeita o arredondamento para cima

**Severidade:** Média  
**Área:** Cálculo de tarifas

**Descrição:** A taxa de serviço de 7% não é arredondada corretamente para cima até o centavo, conforme definido na especificação. Consequentemente, o total em reais também fica incorreto.

**Pré-condições:** Acessar o fluxo de reserva e selecionar uma oferta com taxa de embarque de R$ 55,07.

**Passos para reproduzir:**
1. Pesquisar uma passagem e selecionar uma oferta.
2. Preencher os dados do passageiro.
3. Avançar para a tela de revisão.
4. Comparar a taxa de serviço e o total apresentados com os valores esperados.

**Resultado atual:** Taxa de serviço de R$ 3,85 e total de R$ 58,92.

**Resultado esperado:** Taxa de serviço de R$ 3,86 e total de R$ 58,93, considerando 7% da taxa de embarque com arredondamento sempre para cima até o centavo.

**Evidência:** Tela de revisão da passagem SSA → REC, com taxa de embarque de R$ 55,07.

**Impacto:** O cliente visualiza um valor de tarifa inferior ao definido pela regra de negócio.

### BUG-07 — Busca ultrapassa o tempo máximo quando um fornecedor está lento

**Severidade:** Alta  
**Área:** Desempenho / Busca de passagens

**Descrição:** Ao realizar uma busca com o fornecedor B configurado para responder lentamente, a operação levou aproximadamente 8 segundos, ultrapassando o limite de 6 segundos definido na especificação.

**Pré-condições:** Aplicação em execução e fornecedor B configurado para responder lentamente.

**Passos para reproduzir:**
1. Ativar a lentidão do fornecedor B pelo endpoint administrativo do mock.
2. Acessar a interface de busca.
3. Pesquisar uma rota válida, como GRU → GIG.
4. Medir o tempo até a apresentação dos resultados.

**Resultado atual:** A busca demorou aproximadamente 8 segundos. As ofertas dos fornecedores A e C apareceram.

**Resultado esperado:** A busca deve responder em até 6 segundos, apresentando as ofertas disponíveis dos demais fornecedores mesmo quando um deles estiver lento.

**Impacto:** A demora prejudica a experiência do usuário e descumpre o limite de desempenho estabelecido.

**Evidência:** Busca com fornecedor B configurado para responder lentamente; tempo observado de aproximadamente 8 segundos, com ofertas de A e C exibidas.


