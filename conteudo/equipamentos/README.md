# equipamentos/ — o que foi comprado, e o que ele está fazendo

Um equipamento = um arquivo. Registro de **compra, uso, manutenção e vínculo com plantas**.

## A divisão que importa

| Pasta | Cobre | Momento |
|---|---|---|
| [`docs/produtos-avaliados.md`](../docs/produtos-avaliados.md) | Catálogo de **candidatos**, avaliados pelo [checklist](../docs/checklist-avaliacao.md) | **Antes** de comprar |
| **`equipamentos/`** (aqui) | O que foi **efetivamente comprado**: nota, uso, manutenção, em qual planta está | **Depois** de comprar |

Um produto pode ser avaliado e nunca comprado — fica só em `docs/`. Ao ser comprado, ganha
ficha aqui, e a ficha **linka de volta** para a avaliação que motivou a compra.

---

## Inventário

Tabela-resumo em [`inventario.md`](inventario.md). Hoje: **1 sensor (`hhcc-01`) em uso,
parcial** — instalado, captura crua ainda pendente.

---

## Como usar

### O `equip_id` é o nome do arquivo

`miflora-01.md` → `equip_id` = `miflora-01`. Usado para vincular à planta e, no formato
[formato canônico de leitura](../docs/arquitetura.md), relaciona-se ao `device_id`.

O sufixo numérico permite um segundo sensor igual sem ambiguidade — importante porque a
Fase 2 prevê um 2º sensor.

### Regras de escrita

1. **Criar a ficha ANTES de instalar**, não depois. Registrar o estado de fábrica é o
   baseline contra o qual toda degradação futura vai ser comparada.
2. **Histórico é append-only**, igual às fichas de planta.
3. **Vínculo é bidirecional:** ao instalar um sensor numa planta, registrar nos **dois**
   arquivos — na ficha do equipamento e na seção "Equipamentos instalados" da planta.
4. **Registrar o que decepcionou.** Ficha de equipamento que só tem elogio não serve para
   decidir a próxima compra. Se a pilha durou 3 meses em vez de 12, isso é o dado mais
   valioso do arquivo.
5. Preço e data de compra sempre — é o que permite calcular custo por parâmetro útil de
   verdade, com números reais em vez de estimativa de anúncio.

### Criar um equipamento novo

Copiar `_TEMPLATE.md`, renomear para `<equipamento>-<NN>.md`, preencher, e adicionar a linha
em `inventario.md`.

---

## Protocolo para conversas de equipamento

**Antes de responder:**
1. Ler a ficha do equipamento, histórico de trás para frente.
2. Conferir se ele já foi avaliado em `docs/produtos-avaliados.md`.
3. Ler o [checklist de avaliação](../docs/checklist-avaliacao.md) se envolver compra.

**Ao responder:**
- Comparar o comportamento real contra o que o fabricante prometeu. A diferença é o dado.
- Se o equipamento estiver instalado numa planta, considerar o efeito na leitura dela.

**Ao terminar:**
- Entrada datada no histórico do equipamento.
- Se mudou de planta, atualizar os dois arquivos.
- Se a experiência mudar uma recomendação do projeto, registrar em
  [`docs/decisoes.md`](../docs/decisoes.md).

---

## Manutenção recorrente prevista

| Item | Frequência | Por quê |
|---|---|---|
| Leitura de bateria (`battery_pct`) | a cada coleta | Alertar abaixo de 20% — evita perda silenciosa de dados |
| Inspeção visual do sensor de varanda | trimestral | Sol direto degrada plástico; chuva pode infiltrar |
| Verificação de deriva | semestral | Comparar contra referência (ex.: luxímetro do celular) |
| Limpeza da sonda | ao retirar do vaso | Crosta de sal altera leitura de EC |
