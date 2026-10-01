# Histórico via prints do app do sensor (Flower Care)

> **Tema:** reconstruir, a partir de prints do app oficial "Flower Care", o histórico
> diário de luz, umidade, condutividade (EC) e temperatura do `hhcc-01` **desde a
> instalação**, enquanto a captura automática (Fase 2, `docs/captura-dados.md`) segue
> pendente. Roteado a partir do [PROJETO.md](../PROJETO.md) §2.
> **Sensor/planta:** [`hhcc-01`](../equipamentos/hhcc-01.md) em
> [`aceroleira-01`](../plants/aceroleira-01.md).
> **Canal de envio:** chat, com **Remote Control ativado no celular** (foto direta
> também funciona) — ver [`entrada-atualizacoes-planta.md`](entrada-atualizacoes-planta.md).
> Não precisa de Forms separado.
> **Estado:** 🟢 método validado — **17 dias processados** (14–30/09/2026) para a
> `aceroleira-01`. Falta só a manhã de 01/10 (até a troca de sensor às 15h) para
> fechar o canal nesta planta; o `hhcc-01` passou para a `pitanga-01` em
> 2026-10-01. Dados estruturados em `data/sensor-app/aceroleira-01-{diario,horario}.csv`.
> **Última atualização:** 2026-10-01

---

## 1. Por que isto existe

Hoje o relatório da planta é gerado por atualizações de texto+foto
(`entrada-atualizacoes-planta.md`), e a automação do sensor (Fase 2 — coleta
contínua, `bleak`/ESP32, ver `PROJETO.md` §5) ainda não está pronta. Mas o app
"Flower Care" já guarda **log histórico próprio desde que o sensor foi instalado**
(característica BLE diferente do modo tempo real usado no Objetivo 1 — nota de
memória do projeto), acessível sem nenhuma automação: é só abrir o app.

## 2. ⚠️ Correção do método original (2026-09-28)

A primeira versão deste documento assumia que o único jeito de tirar número do
gráfico era **tocar 1 barra por vez** (sem rótulo de eixo, 1 valor revelado por
toque). **Isso estava errado / incompleto.** Cada painel de indicador (Sunlight,
Moisture, Fertility, Temp) tem **2 páginas**, trocadas arrastando o dedo
horizontalmente *dentro do painel* (2 pontinhos embaixo do gráfico indicam qual
página está ativa):

- **Página 1 — gráfico de barras por hora** (é a que o método original descrevia).
- **Página 2 — resumo numérico do dia:**
  - **Sunlight:** `Accumulation` (mmol, total do dia) + `Appropriate accumulation of
    sunlight` (faixa de referência do próprio app);
  - **Moisture / Fertility / Temp:** `Max`, `Min` (valores exatos do dia) +
    `Appropriate range` (faixa de referência do próprio app).

Isso dá **Max, Min e (para luz) o total acumulado do dia — direto, sem precisar
inferir nada por altura de barra.** O gráfico de barras (página 1) continua útil
para ver o **formato** da curva ao longo do dia (quando o pico ocorre, se é
constante), mas deixa de ser a única fonte de número.

⚠️ **A faixa "Appropriate range/accumulation" é a do próprio app** — confirmado
2026-09-28: o perfil selecionado no app é ***Citrus hystrix*** (limão-kaffir), a
espécie mais parecida disponível na lista do app, **não** *Malpighia emarginata*.
Comparar com os alvos de literatura de acerola (não de citros) registrados em
`plants/aceroleira-01.md` §2 (entrada 2026-09-28) — e mesmo esses são citros como
proxy de manejo em vaso, não acerola direto; nenhuma fonte deu alvo numérico de
EC específico para *Malpighia emarginata*.

## 3. Método de captura — o que o dono faz (revisado)

Por dia (retroativo, indo dia a dia no `Daily Report` do app com `<Previous day`):

1. **Print(s) da página 1** (bar chart) — pode precisar rolar a tela para pegar os 4
   indicadores (Sunlight, Moisture, Fertility, Temp), já que não cabem juntos.
2. **Arrastar cada painel para a página 2** (resumo) e **print(s) dessa vista** — de
   novo, pode precisar rolar para pegar os 4.

Total: geralmente **2–3 prints por dia** (não precisa mais variar qual barra tocar
em dias diferentes — o Max/Min já vem pronto na página 2, todo dia).

**O que precisa estar visível:**

- a **data** no topo (`<Previous day` / `2026-09-14` / `Next day>`) — se cortar,
  avisar a data no comentário;
- os **4 indicadores**, nas duas páginas (barra + resumo).

Enviar pelo chat (Remote Control), sem precisar de comentário se a data aparecer no
print.

## 4. Método de leitura — o que o Claude faz por dia

1. **Salvar os prints** em `plants/fotos/aceroleira-01/sensor-app/AAAA-MM-DD-N.jpg`
   (numerados na ordem em que chegaram).
2. **Ler direto da página 2** (resumo): `Accumulation` de luz, `Max`/`Min` de
   umidade/EC/temperatura. Estes são valores **✅ diretos**, não inferidos.
3. **Ler a página 1** (barras) só para descrever o **formato do dia** — ex.: "pico de
   luz entre 12h e 16h", "umidade caiu ao longo da tarde" — narrativa, não número
   extra por hora (isso continua exigindo toque por barra, e não é o foco agora — ver
   §6 sobre decisão de escopo).
4. **Registrar na tabela de histórico** (§7), 1 linha por dia, com `Accumulation`
   (luz) e `Max`/`Min` dos outros três, comparando com a `Appropriate range` do
   próprio print daquele dia (pode variar entre dias, registrar a que aparecer).
5. **Registrar também nos CSVs estruturados** —
   `data/sensor-app/<plant_id>-horario.csv` (1 linha por hora: valor + qualidade
   `est`/`direto`/`teto` de cada indicador) e `data/sensor-app/<plant_id>-diario.csv`
   (Max/Min/Accumulation da página 2). **É deles que o painel público lê** (ver
   `publico/publicar.py`); a tabela em markdown continua como registro narrativo.
   Os 11 primeiros dias (14–24/09) foram extraídos das tabelas deste arquivo em 2026-09-28.
6. **Nunca reescrever uma linha já registrada.** Print melhor/mais completo de um dia
   já registrado = linha nova que complementa, referenciando a anterior.

## 5. Hora a hora — automatizado por calibração de pixel (2026-09-28)

**Atualização no mesmo dia da §2:** dá para estimar as 24 horas do dia **sem
nenhum toque extra do dono**, a partir dos mesmos prints já usados nas §3–§4 (a
própria página 1, o gráfico de barras).

**Como funciona:** o app roda sempre na mesma resolução de tela (1080×2340 nos
prints recebidos até aqui), então a posição de cada uma das 24 barras é **fixa e
conhecida** de antemão (colunas centradas em x ≈ 57, 99, 141… até 1021, medidas uma
vez e reaproveitadas). O script
`collectors/leitura_prints_flowercare.py`
mede, para cada coluna, a **linha de pixel onde a cor da barra começa** (topo da
barra) dentro do recorte daquele indicador. Como o **Max e o Min exatos do dia já vêm da página 2**
(§2), dois pontos de calibração ficam garantidos: a barra mais alta = o pixel do
Max, a mais baixa (não-nula) = o pixel do Min. Interpolação linear entre esses dois
pontos converte a linha de pixel de **qualquer** barra em valor:

```
valor(barra) = Min + (Max − Min) × (linha_da_barra_mín − linha_da_barra) / (linha_da_barra_mín − linha_da_barra_máx)
```

Para **luz (Sunlight)**, que é acumulada (não tem Max/Min, só o total do dia), a
calibração usa outra âncora: a soma das alturas de todas as barras tem que bater
com o `Accumulation` da página 2 — então `valor(barra) = altura_px(barra) / soma(alturas_px) × Accumulation`.

**Validação:** nos 3 dias já processados a curva resultante bate com o que se
espera fisicamente — temperatura sobe de madrugada (mínimo) até o meio da tarde
(máximo) e desce à noite; luz concentrada entre ~7h e ~18h; umidade e EC com
variação suave, não serrilhada. Ver §7.

**Limite conhecido:** a coluna correspondente à hora "atual" (o cursor cinza que o
app desenha sobre o gráfico, visível nos prints) fica sem cor própria — aquela
hora específica não tem leitura confiável e fica em branco na tabela (`—`), a não
ser que o print seja refeito sem o cursor ali (esperar a hora passar, ou tocar
noutra barra antes do print). Isso costuma ser só 1 das 24 horas por dia.

**O que isso muda no fluxo:** nada — os mesmos 2–3 prints por dia (§3) já bastam.
O script roda depois, sobre os arquivos já salvos.

## 6. Limitações que ficam explícitas

- **Isto não é a Fase 2.** Não substitui coleta automática — é leitura manual e
  retroativa de um histórico que o próprio app já mantém.
- **Retenção do app ainda não confirmada** — se o app só guarda N dias, o começo da
  instalação (2026-09-17 na `aceroleira-01` — mas o sensor já registrava desde
  2026-08-23 na `jabuticabeira-hibrida-01`, ver `equipamentos/hhcc-01.md`) pode já
  ter saído do log. Ir testando `<Previous day` para trás e registrar até onde o
  histórico existe.
- **`Appropriate range` é do app, não do projeto** — ver ⚠️ do §2.

## 7. Histórico de leitura (append-only)

> Cada linha = 1 dia lido da página 2 do app. `Sunlight` em mmol (acumulado do dia).
> Faixas entre parênteses = `Appropriate range` mostrada pelo próprio app naquele
> print (registrada como veio, mesmo que pareça repetir dia a dia).

| Data | Sunlight (acumulado) | Moisture Max/Min | Fertility Max/Min (µS/cm) | Temp Max/Min (°C) |
|---|---|---|---|---|
| 2026-09-14 | **1624 mmol** (alvo do app: 3300–7400) | 15% / 15% (alvo: 15–60) | 141 / 129 (alvo: 350–2000) | ⚠️ não capturado neste envio |
| 2026-09-15 | **20546 mmol** (alvo do app: 3300–7400) | 41% / 15% (alvo: 15–60) | 386 / 129 (alvo: 350–2000) | 32,8 / 17,2 (alvo: 8,0–35,0) |
| 2026-09-16 | **18917 mmol** (alvo do app: 3300–7400) | 33% / 24% (alvo: 15–60) | 341 / 265 (alvo: 350–2000) | 29,2 / 14,4 (alvo: 8,0–35,0) |

### 2026-09-28 — Primeiros 3 dias processados (14, 15, 16/09), enviados pelo Remote Control

**Observado (9 prints, `plants/fotos/aceroleira-01/sensor-app/2026-09-14-*.jpg` a
`2026-09-16-*.jpg`):**

- **Luz muito acima da "faixa apropriada" do app em 15 e 16/09** (20546 e 18917 mmol
  contra alvo 3300–7400 — mais que **o dobro do teto**), e **muito abaixo em 14/09**
  (1624 mmol, menos de metade do piso). Salto de ~12,6× entre 14/09 e 15/09 é grande
  demais para ser só variação de nuvem — 🟡 **hipótese, a confirmar**: dia 14/09 pode
  ter sido de instalação/ajuste do sensor ainda não a pino de luz plena, ou dia
  parcial (sensor instalado no meio do dia, sem registrar a manhã toda). Não
  contradiz o padrão "6h+ de sol direto" já registrado na ficha — plausível que os
  dias seguintes (15–16/09) é que representam melhor a exposição real.
- **Umidade subiu de 15% (14 e 15/09, mínimo constante) para 24–33% em 16/09.** 🟡
  Bate com o período de chuva relatado na ficha da planta (2026-09-17: "~2 semanas de
  chuva forte e frio"; 2026-09-20: estendido para "~3 semanas") — a umidade subindo
  no dia 16 é consistente com essa chuva já em curso.
- **Fertilidade (EC) abaixo da faixa "apropriada" do app nos 3 dias** (máximos de
  129–386 µS/cm contra piso de 350) — e **esta janela é anterior ao Forth Frutas
  aplicado em 18/09** (ver `plants/aceroleira-01.md`, entrada 2026-09-20). Serve como
  **baseline pré-adubo**: se um print de dias depois de 18/09 mostrar EC mais alta,
  é evidência direta de que a adubação elevou a condutividade do substrato — o tipo
  de comparação que só um histórico numérico permite, e que nenhuma foto mostraria.
- **Temperatura dentro da faixa "apropriada" nos dias com dado** (32,8/17,2 °C em
  15/09; 29,2/14,4 °C em 16/09) — consistente com clima de fim de inverno/início de
  primavera no local A.

**Concluído:** método revisado (§2–§5) funciona e é bem mais barato que o original —
2–3 prints cobrem o dia inteiro com Max/Min/Accumulation exatos, sem inferência por
altura de barra. **Gap:** Temp de 14/09 não foi capturado (o envio não incluiu a
página 2 daquele painel naquele dia) — sem prioridade de reenvio, mas registrar como
buraco conhecido caso vire relevante depois.

**Ação:** nenhuma mudança de manejo a partir só destes 3 dias — é histórico curto
demais para tendência, e a hipótese de EC baixa pré-adubo já era esperada (ver
`plants/aceroleira-01.md`, planejamento do Forth Frutas em 2026-08-20/2026-09-17).
Serve de baseline. Continuar recebendo prints (indo para trás no app com
`<Previous day` até achar o limite de retenção, e para frente dia a dia) para
formar série mais longa.

**Pendente:** confirmar até quando o app guarda histórico para trás (testar
`<Previous day` a partir de 2026-09-14); Temp de 14/09; decidir se compensa capturar
formato hora-a-hora (§5) para algum dia específico de interesse (ex.: o dia da
adubação, 2026-09-18, ainda não coberto).

---

### 2026-09-28 — ⚠️ Correção do valor por hora: coluna do cursor tem número garantido; luz satura no teto do gráfico

> Corrige a entrada anterior deste mesmo dia. Duas correções do dono, as duas
> confirmadas e aplicadas:

**Correção 1 — a coluna cinza (cursor) não é "sem dado".** Ela tem um número
garantido: o valor mostrado no **canto superior direito do painel**, no print da
página 1. É na prática a **única hora com leitura direta certificada** (as outras
23 são estimativa por pixel) — o oposto do que a versão anterior deste documento
assumia (`—`, tratada como perdida). Corrigido: cada tabela abaixo agora preenche
essa hora com o valor do badge, marcado `✅direto`.

**Correção 2 — luz (Sunlight) pode saturar no teto visual do gráfico, e isso
quebra a proporção.** Se o valor real do pico do dia for, por exemplo, 40 mil e o
gráfico só desenha até uma altura equivalente a 10 mil, a barra daquele horário
fica "encostada no teto" — visualmente idêntica à de outro horário que também
tenha estourado o teto, mesmo que os valores reais sejam bem diferentes. Ler a
altura de uma barra no meio do teto como "metade do valor do teto" nesse caso dá
número errado (métade do que é mostrado, não da faixa real). **Como isso foi
detectado nos dados:** em 15/09 e 16/09, várias horas diferentes bateram
**exatamente na mesma linha de pixel** no topo do gráfico de luz — evidência de
teto, não de coincidência real. Em 14/09 isso não aconteceu (só 1 horário no
topo, sem empate) — aparentemente aquele dia não saturou.

**Ajuste no método:** para luz, sem empate → mantém a calibração por proporção
(§5, soma bate com o `Accumulation`). Com empate → as horas empatadas ficam
marcadas `⚠️teto`, com o número mostrado sendo **só o piso mínimo** necessário
para a soma do dia fechar, não o valor real — que pode ser bem maior. Os demais
horários (sem empate) desse mesmo dia ficam com confiança normal, mas **um
pouco inflados** pela redistribuição (a parcela "perdida" nas horas do teto
tende a puxar as outras pra cima na conta da soma) — tratar como limite superior
aproximado, não valor fino.

**2026-09-14** — luz em mmol/h; umidade %; EC µS/cm; temp **sem tabela** (Max/Min
daquele dia não foi capturado, ver gap já registrado acima).

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | **12** | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 13 | 13 | 13 | 13 | 13 | 13 | 13 | 32 | 77 | 141 | 185 | **307✅** | 217 | 160 | 128 | 83 | 77 | 38 | 19 | 13 | 13 | 13 | 13 | 19 |
| Umidade | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | **15✅** |
| EC | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 129 | 129 | **129** | 129 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 | 141 |

**2026-09-15**

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | **12** | 13 | 14 | 15 | 16 | **17** | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 27 | 27 | 40 | 27 | 27 | 27 | 40 | 147 | 469 | 482 | 696 | **1019✅** | 3710⚠️teto | 3710⚠️teto | 2076 | 3710⚠️teto | 3710⚠️teto | 321 | 134 | 27 | 40 | 27 | 27 | 27 |
| Umidade | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 40 | 41 | **40** | 41 | 40 | 40 | 40 | 38,9 | 36,9 | 35,1 | 34 | 33 | 33 | 33 | 33 |
| EC | 129 | 129 | 129 | 129 | 129 | 129 | 129 | 129 | **129✅** | 372,5 | 386 | 386 | 358,9 | 358,9 | 372,5 | 318,4 | 331,9 | 372,5 | 372,5 | 372,5 | 358,9 | 358,9 | 345,4 | 345,4 |
| Temp | 17,5 | 17,5 | 17,3 | 17,3 | 17,3 | 17,2 | 17,2 | 17,5 | 18,7 | 18,5 | 19,6 | 20,7 | 25,8 | 28,8 | 26,2 | 32,8 | **32,8✅** | 24,7 | 21,8 | 20,3 | 19,4 | 19,1 | 18,4 | 18,5 |

**2026-09-16**

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | **13** | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 22 | 22 | 22 | 22 | 22 | 22 | 33 | 164 | 349 | 556 | 1602 | 3019⚠️teto | **3417✅** | 3019⚠️teto | 3019⚠️teto | 2692 | 469 | 251 | 65 | 22 | 33 | 22 | 22 | 33 |
| Umidade | 33 | 32 | 32 | 30,9 | 32 | 32 | 30,9 | 30,9 | 30,9 | 32 | 30,9 | 30,9 | 30,9 | 30,9 | 30,9 | 29,1 | 28,1 | 27,1 | 25 | 25 | 25 | 24 | 24 | 24 |
| EC | 341 | 341 | 341 | 341 | 341 | 341 | 341 | 328,3 | 315,7 | 303 | 303 | **297✅** | 290,3 | 277,7 | 277,7 | 290,3 | 290,3 | 290,3 | 277,7 | 277,7 | 277,7 | 265 | 265 | 265 |
| Temp | 18,4 | 17,8 | 17,1 | 16,2 | 15,5 | 15 | 14,4 | 15,1 | 16,8 | 19,7 | 21,5 | 23,5 | 25,2 | **29,2✅** | 29,2 | 26,9 | 24,2 | 22,1 | 20,1 | 18,7 | 18,1 | 18 | 17,8 | 17,5 |

**Leitura (revisada):**

- **Temperatura segue confirmando variação intradiária grande e real**: 15/09 vai de
  17,2°C (madrugada) a 32,8°C (meio da tarde, sustentado por 2h) — **+15,6°C no
  mesmo dia**; 16/09, de 14,4°C a 29,2°C — amplitude parecida. Curva sobe e desce
  suave nestes 2 dias. Se lembrar de um dia com nuvem/sol alternando muitas vezes,
  esse dia específico vale a pena mandar pra comparar a forma da curva.
- **Luz satura no teto em boa parte da tarde em 15/09 e 16/09** (4 e 3 horas
  respectivamente marcadas `⚠️teto`) — o pico real desses dias é **maior** que os
  números mostrados, não dá pra saber quanto. Só **14/09 tem números de luz
  confiáveis** em todas as 24 horas (sem saturação).
- **EC e umidade têm curva mais achatada**, sem o problema de teto (Max/Min real
  do dia usado como âncora, não estoura por definição).
- **Fertilidade em 14/09 tem faixa muito estreita (129–141, 12 unidades)** — pouca
  resolução de pixel pra distinguir hora a hora; oscila entre só 2 valores
  possíveis, tratar como baixa confiança para esse dia especificamente.

**Confiabilidade, resumida:**

- `✅` (a hora do cursor): direto, sem inferência — a mais confiável de todas.
- Extremidades iguais ao Max/Min do dia (Moisture/Fertility/Temp): essencialmente
  exatas, são a própria âncora.
- Intermediárias sem `⚠️`: estimativa por pixel, boa quando a faixa Max–Min do dia
  é ampla (ex. Temp), mais ruidosa quando é estreita (ex. Fertility em 14/09).
- `⚠️teto` (só luz, em dias com empate no topo do gráfico): **piso, não valor** —
  o real é maior, quantidade desconhecida. Se precisar do número exato de um
  horário `⚠️teto`, é o único caso em que ainda vale a pena tocar aquela barra
  específica no app (método original, 1 toque = 1 valor certo) e mandar o print.

---

### 2026-09-28 — 8 dias processados de uma vez (17 a 24/09), fecha a janela pré/pós-adubo

> Prints em formato diferente dos primeiros 3 dias — 1 print cobre o dia inteiro
> (sem precisar rolar), banner "Most recently synced" no topo empurra o layout
> ~464px pra baixo. Bandas recalibradas para essa resolução
> (1080×2679): Sunlight fundo=962, Moisture=1544, Fertility=2122, Temp=2678 (a
> mesma app pode gerar os dois formatos — checar `im.size` antes de reusar
> constantes). **Bug encontrado e corrigido nesta rodada:** com margem de scan
> grande (400px), a coluna 1 (e às vezes 2) pegava a cor do **ícone** do
> indicador (ex. o termômetro laranja do Temp), não a barra — gerando valor
> absurdo (ex. hora 1 = pico do dia). Reduzido para margem 370px, que fica
> abaixo do ícone; conferido visualmente (recorte do print) que o resultado bate
> com o gráfico real depois do ajuste.

**Fotos:** _não publicadas._

**Resumo diário (página 2 do app):**

| Data | Sunlight (acumulado) | Moisture Max/Min | Fertility Max/Min (µS/cm) | Temp Max/Min (°C) |
|---|---|---|---|---|
| 2026-09-17 | **3314 mmol** | 24/21% | 263/222 | 21,1/16,8 |
| 2026-09-18 | **18210 mmol** | 52/21% | 725/220 | 30,5/17,2 |
| 2026-09-19 | **29844 mmol** | 43/28% | 531/305 | 37,8/19,4 |
| 2026-09-20 | **2336 mmol** | 28/26% | 322/293 | 22,5/19,8 |
| 2026-09-21 | **29345 mmol** | 27/23% | 294/184 | 44,4/19,9 |
| 2026-09-22 | **4098 mmol** | 23/21% | 247/224 | 25,8/20,3 |
| 2026-09-23 | **6007 mmol** | 21/20% | 232/218 | 23,1/17,7 |
| 2026-09-24 | **9087 mmol** | 40/20% | 248/209 | 26,7/17,4 |

**Leitura — o que muda com esta semana:**

- 🎯 **EC pré/pós-adubo, finalmente comparável.** 17/09 (véspera do adubo) tem EC
  Max/Min **263/222 µS/cm** — mesma faixa baixa dos dias 14–16/09 já registrados
  (baseline pré-adubo). **18/09 (dia da aplicação) salta para 725/220** — o Max
  quase **triplica no mesmo dia**, e pela primeira vez **ultrapassa o piso da
  faixa "apropriada" do app (350)**. Isso é a assinatura numérica do Forth Frutas
  agindo — exatamente o cruzamento que a ficha da `aceroleira-01` pedia desde
  17/09. Dias seguintes (19→24/09) mostram o EC **decaindo gradualmente**: Max
  531→322→294→247→232→248 — consistente com o sal se diluindo/lixiviando do
  substrato ao longo dos dias (chuva relatada na ficha), não com uma segunda
  aplicação.
- **18/09 também é o dia em que a umidade sobe de patamar** (Max 52%, o maior
  dos 11 dias todos) — bate com o relato do dono ("adubo aplicado 18/09") e com
  a prática recomendada de substrato úmido antes de adubar.
- ⚠️ **21/09 registrou Temp Max 44,4°C** — o maior valor de toda a série, bem
  acima da faixa "apropriada" do app (8–35°C) e também acima do que se esperaria
  de temperatura de ar no local A no fim de setembro. 🟡 **hipótese, não conclusão**:
  o sensor mede temperatura do **substrato**, não do ar — sol direto batendo na
  ponta do sensor (que fica rente à superfície) pode aquecer bem mais que o ar
  ambiente num dia de céu limpo. Consistente com o mesmo dia ter luz alta
  (2624 mmol acumulado, abaixo do pico da semana mas ainda considerável) e Min
  de 19,9°C (madrugada normal) — a amplitude de +24,5°C num só dia é grande
  mesmo para essa métrica. Não é motivo de ação imediata, mas fica registrado
  para cruzar com sintoma de estresse térmico se aparecer nas fotos.
- **17/09 é o único dia da semana sem saturação de luz** (639 mmol, baixo) —
  os outros variam de "sem teto" (22,23,24/09, dias mais nublados) a saturação
  pesada (19 e 21/09, 5–6 das 24 horas no teto — dias de sol forte e constante).

**Tabelas hora a hora (mesma calibração de pixel do §5, `⚠️teto` = saturado):**

**2026-09-17** — sem saturação de luz

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 8 | 8 | 8 | 8 | 8 | 0 | 8 | 38 | 195 | 293 | 549 | 639 | 398 | 301 | 308 | 293 | 158 | 53 | 15 | 0 | 8 | 8 | 8 | 8 |
| Umidade | 24 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,9 | 22,1 | 21 | 21 | 21 | 21 | 21 | 21 | 21 |
| EC | 263 | 263 | 263 | 263 | 263 | 263 | 263 | 249,3 | 249,3 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 235,7 | 222 | 222 | 222 | 222 | 222 |
| Temp | 16,9 | 16,9 | 16,9 | 16,9 | 16,9 | 16,8 | 16,8 | 17,1 | 18 | 19,5 | 20,3 | 21 | 21,1 | 20,8 | 20,4 | 20,2 | 19,1 | 18,5 | 18 | 17,6 | 17,6 | 17,5 | 17,5 | 17,5 |

**2026-09-18** — luz saturou no teto 3x (horas 13,15,16); **dia do adubo**

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 47 | 206 | 347 | 385 | 2111 | 3471 | 3716 | 3471 | 3471 | 422 | 347 | 103 | 9 | 9 | 9 | 9 | 9 |
| Umidade | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 52 | 47,1 | 47,1 | 47,1 | 46 | 47,1 | 47,1 | 47,1 | 46 | 45 | 44,2 | 43,1 | 43,1 | 43,1 | 43,1 | 43,1 |
| EC | 220 | 220 | 220 | 220 | 220 | 220 | 220 | 220 | **725** | 647,3 | 621,4 | 582,6 | 556,7 | 530,8 | 530,8 | 517,8 | 556,7 | 569,6 | 569,6 | 556,7 | 556,7 | 543,7 | 530,8 | 530,8 |
| Temp | 17,5 | 17,5 | 17,5 | 17,5 | 17,5 | 17,5 | 17,2 | 17,3 | 17,2 | 18 | 18,7 | 21,8 | 24,1 | 27,9 | 28,2 | 30,5 | 25,6 | 23,3 | 21 | 20,1 | 20 | 20 | 20 | 19,9 |

**2026-09-19** — luz saturou no teto 6x (horas 13–18)

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 12 | 12 | 12 | 12 | 12 | 12 | 23 | 231 | 428 | 451 | 520 | 940 | 4280⚠️teto | 4280⚠️teto | 4280⚠️teto | 4280⚠️teto | 4280⚠️teto | 4280⚠️teto | 1446 | 12 | 12 | 12 | 12 | 12 |
| Umidade | 43 | 43 | 43 | 42 | 42 | 42 | 42 | 42 | 42 | 42 | 42 | 42 | 42 | 43 | 43 | 41 | 39,2 | 36,1 | 34,1 | 31,1 | 30 | 30 | 29 | 28 |
| EC | 531 | 531 | 531 | 531 | 531 | 517,7 | 531 | 517,7 | 504,4 | 491,1 | 477,8 | 451,2 | 424,6 | 384,8 | 344,9 | 344,9 | 344,9 | 305 | 331,6 | 358,2 | 344,9 | 331,6 | 331,6 | 318,3 |
| Temp | 19,9 | 19,9 | 19,8 | 19,9 | 19,9 | 19,8 | 19,4 | 19,7 | 20,8 | 21,6 | 22,9 | 25,2 | 27,9 | 32,4 | 37,8 | 37,8 | 35,5 | 36,3 | 28 | 22,5 | 21,6 | 21,1 | 21,1 | 20,9 |

**2026-09-20** — luz saturou no teto 2x (horas 10,11)

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 82 | 172 | 291⚠️teto | 291⚠️teto | 284 | 246 | 216 | 246 | 187 | 179 | 37 | 15 | 7 | 7 | 7 | 7 | 7 |
| Umidade | 28 | 28 | 28 | 28 | 28 | 28 | 28 | 26,9 | 28 | 28 | 28 | 26,9 | 26,9 | 26,9 | 26 | 26 | 26 | 26 | 26 | 26 | 26 | 26 | 26 | 26 |
| EC | 322 | 322 | 322 | 322 | 322 | 322 | 322 | 307,5 | 307,5 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 | 293 |
| Temp | 21,5 | 21,2 | 20,8 | 20,4 | 20,2 | 19,8 | 19,9 | 20,1 | 20,5 | 21,9 | 22,4 | 22,5 | 22,5 | 22,4 | 22,2 | 22,1 | 22 | 21,3 | 21,1 | 21 | 20,7 | 20,6 | 20,7 | 20,6 |

**2026-09-21** — luz saturou no teto 5x (horas 13–17); **Temp Max mais alta da série**

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 12 | 12 | 12 | 12 | 12 | 12 | 12 | 187 | 412 | 511 | 511 | 1784 | 4616⚠️teto | 4616⚠️teto | 4616⚠️teto | 4616⚠️teto | 4616⚠️teto | 2624 | 87 | 12 | 12 | 12 | 12 | 12 |
| Umidade | 26,2 | 26,2 | 26,2 | 26,2 | 26,2 | 25,1 | 25,1 | 25,1 | 26,2 | 26,2 | 26,2 | 25,1 | 25,1 | 25,1 | 26,2 | 27 | 26,2 | 26,2 | 25,1 | 24,1 | 23 | 23 | 23 | 23 |
| EC | 294 | 294 | 294 | 294 | 281,8 | 281,8 | 281,8 | 281,8 | 281,8 | 269,6 | 269,6 | 245,1 | 232,9 | 208,4 | 184 | 184 | 208,4 | 232,9 | 257,3 | 257,3 | 245,1 | 245,1 | 245,1 | 245,1 |
| Temp | 20,5 | 20,3 | 20,2 | 20 | 20,2 | 20 | 19,9 | 20,3 | 21,4 | 23,1 | 24,6 | 27,1 | 30,2 | 34,1 | 40,6 | **44,4** | 42 | 35,9 | 30,5 | 28,4 | 27,3 | 26,7 | 26,4 | 25,9 |

**2026-09-22** — sem saturação de luz

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 7 | 7 | 7 | 7 | 7 | 7 | 15 | 22 | 37 | 52 | 157 | 1282 | 1389 | 172 | 187 | 261 | 269 | 134 | 37 | 7 | 7 | 7 | 7 | 7 |
| Umidade | 23 | 22,1 | 22,1 | 22,1 | 22,1 | 22,1 | 22,1 | 21 | 21 | 21 | 21 | 21 | 22,1 | 22,1 | 21 | 22,1 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 |
| EC | 247 | 247 | 247 | 247 | 247 | 247 | 247 | 247 | 247 | 247 | 235,5 | 235,5 | 224 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 | 235,5 |
| Temp | 25,8 | 24,9 | 24,9 | 24,5 | 23,1 | 22 | 21,5 | 20,8 | 20,8 | 20,8 | 21,1 | 23,8 | 25 | 23,2 | 22,3 | 22,7 | 23,1 | 22,9 | 22,1 | 21,5 | 21,3 | 21,1 | 20,3 | 20,4 |

**2026-09-23** — sem saturação de luz

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 8 | 8 | 8 | 8 | 8 | 8 | 15 | 84 | 235 | 266 | 448 | 159 | 609 | 858 | 1769 | 1238 | 144 | 53 | 23 | 8 | 8 | 15 | 15 | 15 |
| Umidade | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 21 | 20 | 20 | 20 | 20 | 20 |
| EC | 232 | 232 | 232 | 232 | 232 | 232 | 232 | 232 | 218 | 218 | 218 | 218 | 218 | 218 | 218 | 218 | 232 | 232 | 232 | 218 | 218 | 218 | 218 | 218 |
| Temp | 20,3 | 20 | 20 | 19,6 | 19,2 | 18,7 | 18,2 | 18,5 | 19,4 | 19,8 | 20,8 | 19,5 | 19,8 | 21,3 | 22,7 | 23,1 | 20,4 | 19,8 | 19,2 | 18,6 | 18,1 | 17,8 | 18 | 17,7 |

**2026-09-24** — sem saturação de luz

| Hora | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Luz | 15 | 15 | 15 | 15 | 15 | 15 | 15 | 53 | 204 | 271 | 354 | 399 | 1967 | 686 | 1877 | 2605 | 309 | 151 | 30 | 15 | 15 | 15 | 15 | 15 |
| Umidade | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 20 | 22,2 | 40 | 40 | 37,8 | 36,8 | 35,7 | 33,5 | 31,4 | 30,3 | 29,2 | 28,1 | 28,1 | 28,1 | 28,1 |
| EC | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 222 | 209 | 209 | 235 | 248 | 248 | 235 | 209 | 222 | 235 | 235 | 235 | 235 | 235 | 235 | 235 |
| Temp | 17,5 | 17,8 | 17,9 | 17,8 | 17,4 | 17,4 | 17,4 | 17,4 | 18,3 | 19,5 | 20,5 | 19,2 | 22,2 | 23,3 | 24 | 26,7 | 24,4 | 22,7 | 21,1 | 20,2 | 19,7 | 19,5 | 19,2 | 19,2 |

**Pendente:** continuar indo para trás (`<Previous day` a partir de 14/09, pra
achar o limite de retenção do app) e para frente a partir de 25/09.

### 2026-10-01 — Lote 25–30/09: calor do substrato vira padrão, não mais pico isolado

> 6 dias processados (25 a 30/09), mesmo método (§3–§5). Fotos em
> `plants/fotos/aceroleira-01/sensor-app/2026-09-2[5-9]-*.jpg` e `2026-09-30-*.jpg`.
> Linhas gravadas em `data/sensor-app/aceroleira-01-diario.csv` e `-horario.csv`
> (qualidade `direto`/`est`/`teto` por hora, mesma convenção do lote anterior).

**Resumo diário (página 2 do app):**

| Data | Sunlight (acumulado) | Moisture Max/Min | Fertility Max/Min (µS/cm) | Temp Max/Min (°C) |
|---|---|---|---|---|
| 2026-09-25 | **24183 mmol** | 45/26% | 665/228 | 42,2/18,9 |
| 2026-09-26 | **30866 mmol** | 38/25% | 476/226 | 47,0/19,8 |
| 2026-09-27 | **28156 mmol** | 25/21% | 291/194 | 39,9/21,3 |
| 2026-09-28 | **27723 mmol** | 25/20% | 261/152 | 47,7/21,6 |
| 2026-09-29 | **24158 mmol** | 43/21% | 461/173 | 40,7/22,1 |
| 2026-09-30 | **25074 mmol** | 25/21% | 214/167 | 40,5/22,3 |

**Leitura — o que muda com este lote:**

- 🔴 **Temperatura de substrato acima de 40°C em 5 dos 6 dias, duas vezes perto de
  48°C** (26/09: 47,0°C; 28/09: 47,7°C) — o pico de 44,4°C em 21/09 (já registrado
  como "hipótese a observar") **deixa de ser isolado e vira padrão repetido**. Ver
  entrada na ficha da planta (2026-10-01) — isto sobe de prioridade.
- **Luz consistentemente acima da "faixa apropriada" do app** nos 6 dias (24–31 mil
  mmol contra alvo 3300–7400) e **saturando o teto do gráfico quase todo dia**
  (3 a 5 horas/dia com `⚠️teto`, só 14/09 e os dias de pouco sol — 22,23/09 — não
  saturam). Os dias de calor extremo (26 e 28/09) são também os de maior luz —
  consistente com sol direto forte, não com falha de sensor.
- **EC com picos altos de novo** (665 em 25/09, 476 em 26/09, 461 em 29/09) **sem
  nova adubação** (a próxima está marcada para ~18/10, ver ficha) — reforça a
  ressalva já registrada em `docs/medicoes.md` §4: EC crua sobe com temperatura e
  umidade do substrato, não só com sal. Os dias de EC alta aqui coincidem com dias
  de calor alto — **mais evidência de que parte do sinal de EC é artefato térmico**,
  não variação real de nutriente. Não compara 1:1 com o pico de 725 µS/cm do dia
  do adubo (18/09), que teve causa conhecida.
- **Umidade segue com queda suave entre regas/chuva**, sem padrão novo — 38–45%
  em 25–26/09 (ainda descendo da chuva anterior), caindo para 20–25% nos dias
  seguintes, mais seco e quente.

**Tabelas hora a hora:** mesma convenção das entradas anteriores — ver os CSVs
estruturados (`data/sensor-app/aceroleira-01-horario.csv`) para o detalhe completo;
resumo dos picos de Temp por dia:

| Data | Temp mín (madrugada) | Temp máx | Horário aprox. do pico |
|---|---|---|---|
| 25/09 | 18,9°C | **42,2°C** | ~16h |
| 26/09 | 19,8°C | **47,0°C** | ~16–17h |
| 27/09 | 21,3°C | **39,9°C** | ~15–16h |
| 28/09 | 21,6°C | **47,7°C** | ~15–16h |
| 29/09 | 22,1°C | **40,7°C** | ~16–17h |
| 30/09 | 22,3°C | **40,5°C** | ~16h |

**Concluído:** o padrão de calor extremo no substrato (madrugada normal, tarde
disparando 20–25°C acima) está consistente dia após dia — não é mais um outlier
de 21/09. Ação registrada na ficha da `aceroleira-01` (2026-10-01).

**Pendente:** falta só a manhã de 01/10 (até 15h, hora da troca pra pitanga — ver
entrada seguinte) para fechar o histórico da acerola por este canal.

---

### 2026-10-01 — Próximo lote: acerola 25/09 → 01/10; depois disso, o app vira histórico da pitanga

O `hhcc-01` foi para a `pitanga-01` hoje. Lote combinado com o dono: prints da acerola de
**25/09 até o dia da troca**, mesmo método (§3–§5), mesma pasta
(`plants/fotos/aceroleira-01/sensor-app/`), mesmos CSVs.

⚠️ **Cuidado com o app:** o histórico do Flower Care é do *sensor*, não do vaso. Os dias a
partir da troca que aparecerem no app (ainda com o nome/perfil da acerola) **são da pitanga** —
o corte é pela hora da troca em `data/sensor-vinculos.csv`. O
dia 01/10 fica misto: antes da hora da troca = acerola, depois = pitanga. Para a pitanga, a
fonte principal agora é a planilha `InfoSensorESP32`; prints só se a ponte falhar.
