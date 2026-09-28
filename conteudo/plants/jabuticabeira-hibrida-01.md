# Jabuticabeira híbrida — `jabuticabeira-hibrida-01`

> **Espécie:** *Plinia* sp. — **híbrida** (cultivar comercial, cruzamento não especificado) ⚠️
> **Regime:** `varanda-fruteira` (ver [`docs/regimes.md`](../docs/regimes.md))
> **Local:** varanda — sol direto à tarde. **Coordenada confirmada 2026-08-02 (pin do Google
> Maps): _coordenadas omitidas_** — local B.
> Confirmado que é um endereço **e gerenciamento diferentes** da varanda do local A, onde fica a `aceroleira-01` (P23, [`docs/decisoes.md`](../docs/decisoes.md)).
> **Estado:** 🟢 **copa densa e saudável confirmada em 2026-09-20** (quase 1 mês sem
> reavaliação visual desde 23/08) · 🌸 cauliflorescência ativa — dos ~10–15 indícios de 23/08,
> dono relata (2026-09-20) que **2 viraram flor e só 1 está confirmado desenvolvendo fruto**
> (o visto em foto) · **1ª aplicação fracionada de Forth Frutas feita em 2026-09-20** · sem
> sensor desde 17/09
> **Próxima ação:** recontar a copa inteira (vingamento) · medir vaso com trena · **2ª
> aplicação fracionada de Forth Frutas em ~2–3 semanas** (⚠️ alvo ~04–10/10)
> **Última atualização:** 2026-09-20

---

## 1. Identificação

| Campo | Valor |
|---|---|
| `plant_id` | `jabuticabeira-hibrida-01` |
| Origem | Comprada em viveiro/garden center, aparentemente **replantada na hora** (vaso antigo com substrato ao lado na foto) |
| Data de aquisição | **2026-08-02** |
| Altura atual | ⚠️ ~1,0–1,2 m estimado por foto, não medido |
| Vaso (⌀ × altura) | ⚠️ vaso plástico marrom, ~30–35 cm ⌀ estimado por foto — **medir com trena** |
| Volume do vaso | ⚠️ não calculado — pendente medida real |
| Substrato | ⚠️ não informado — parece ter folhas secas/cobertura morta (mulch) na superfície |
| Exposição solar | Sol direto **à tarde** (declarado pelo dono) |
| Exposição à chuva | ⚠️ não informado |

## 2. Requisitos da espécie

⚠️ Híbridos comerciais de jabuticaba variam por cultivar (ex.: cruzamentos com *Plinia
trunciflora*, *Plinia phitrantha* etc. visando frutificação mais precoce). Sem saber o
cultivar exato, os valores abaixo são os da **espécie-base *Plinia cauliflora*** (literatura
horticultural), com a ressalva de que híbridos costumam ser vendidos com promessa de
frutificação mais rápida — o que não está confirmado aqui.

> ⚠️ **Não herdar de [`jabuticabeira-01`](jabuticabeira-01.md).** Aquele arquivo está
> **deprecado** — era um registro sem planta correspondente, e os dados dele (1,60 m, vaso
> 25 L) foram invalidados. Os requisitos abaixo vêm da literatura da espécie, não daquela
> ficha. Esta é a **única** jabuticaba real do projeto.

| Parâmetro | Alvo | Observação |
|---|---|---|
| DLI | 20–35 mol/m²/dia (muda: 10–20) ⚠️ | Igual à espécie-base, a calibrar |
| **Água** | **Solo sempre úmido, nunca encharcado** | Mesmo ponto crítico da espécie-base — raiz superficial |
| **pH** | **5,0–6,5 (ácido)** | Mesma sensibilidade a clorose férrica presumida |
| EC / salinidade | Baixa | Sensível — adubação leve e fracionada |
| Drenagem | Boa, com retenção | |
| Vaso p/ frutificar | 60–100 L ⚠️ (mesma referência da espécie-base, não confirmada p/ híbrido) | |
| Horizonte de fruto | ⚠️ **desconhecido** — depende do cultivar. Híbridos comerciais costumam anunciar prazo menor que os 3–6 anos da enxertada comum, mas isso é marketing até confirmar |

## 3. Meta atual

🔓 **Período de adaptação encerrado em 2026-08-23** — mesmo critério usado na `aceroleira-01`
(brotação nova saudável, não uma data fixa): folhas novas nascendo em **todos os galhos**
depois de ter perdido quase toda a copa, mais **início de frutificação** (~15 jabuticabas no
tronco). Sinal de raiz ativa mais forte que o da acerola em 2026-08-20.

Depois disso: **adubar em dose leve e fracionada** (ver histórico 2026-08-23) — não mais
"só água, sem adubo". Poda segue sem necessidade declarada (planta não foi podada, não há
madeira morta reportada).

## 4. Equipamentos instalados

| Equipamento | Desde | Até | O que mediu | Ficha |
|---|---|---|---|---|
| `hhcc-01` | 2026-08-23 ⚠️ | **2026-09-17** ⚠️ — removido, foi para a `aceroleira-01` | Umidade, EC, luz, temp., só via app "Flower Care"; nRF Connect nunca foi feito aqui | [`equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md) |

**Sem sensor instalado a partir de 2026-09-17.**

## 5. Pendências

- [x] ~~Instalar o `hhcc-01`~~ → feito em 2026-08-23, decide **P24** (ver `PROJETO.md` §7)
- [x] ~~**Captura crua via nRF Connect** nesta planta~~ → **superada 2026-09-17**: o sensor foi
      removido e reinstalado na `aceroleira-01` antes que a captura fosse feita aqui. A
      pendência do Objetivo 1 segue viva, só que agora na ficha da acerola.
- [ ] Rodar o Open-Meteo com **esta** coordenada (_coordenadas omitidas_), não a do local A.
- [ ] Medir vaso real (⌀ × altura) com trena — hoje é estimativa por foto. Trava a dose exata
      do adubo (rótulo do Forth Frutas dosa por diâmetro de vaso).
- [ ] Identificar o **cultivar híbrido** (nome comercial/etiqueta do viveiro), se disponível.
- [ ] Confirmar exposição à chuva.
- [x] ~~Confirmar horas de sol direto~~ → **parcialmente**: app do fabricante relatou
      acumulação de luz de 19891 (unidade rotulada "mmol") em 2026-08-22, ver histórico —
      ⚠️ dado do app, não bruto, e a unidade real é incerta.
- [ ] Contar as ~15 jabuticabas de novo em alguns dias — confirmar que estão vingando (não
      abortando), e acompanhar até a maturação para saber o horizonte real de fruto do
      cultivar (pendência antiga sobre prazo de frutificação). **Parcial em 2026-09-20:** 1
      fruto/broto verde confirmado num nó do tronco (foto de perto), mas sem contagem da copa
      inteira — pendência segue aberta. **Complemento (comentário do dono, mesmo dia):** dos
      ~10–15 indícios de 23/08 (não retirados), **2 viraram flor** e **só 1 está desenvolvendo
      fruto de fato** — é o mesmo confirmado pela foto de perto; o restante não virou nada
      visível. Ainda falta recontar a copa inteira para fechar a pendência.
- [ ] Registrar a **2ª aplicação fracionada** de Forth Frutas — a 1ª foi em **2026-09-20**,
      meia dose, informada pelo dono (primeira aplicação registrada nesta ficha desde a
      liberação em 23/08 — dependia de alguém estar fisicamente no local B). Alvo: ~2–3 semanas
      depois, ~04–10/10.

---

## 6. Histórico

> **Append-only.** Entrada nova sempre embaixo. Para corrigir algo, criar entrada nova
> referenciando a anterior.

### 2026-08-02 — Cadastro inicial (compra e transporte)

**Observado:** foto mostra jabuticabeira híbrida em vaso plástico marrom, aparentemente
replantada no próprio garden center (vaso de origem com substrato solto ao lado, ainda sobre
o carrinho de transporte). Planta jovem, múltiplos troncos finos, copa ainda esparsa. Dono
declara: varanda no local B (⚠️ confirmar se é o mesmo endereço do local A já
registrado no `PROJETO.md`, ou outro), **bastante sol à tarde**, transportada hoje.

**Concluído / hipótese:** nenhuma conclusão de saúde ainda — planta acabou de ser movida e
possivelmente replantada no mesmo dia, o que por si só já é estresse (transporte + manuseio
de raiz). Sem sintoma visível reportado até aqui.

**Ação:** nenhuma além do transporte. Regar para assentar o substrato novo é razoável, mas
**sem adubo e sem poda** nas próximas semanas — mesma lógica de adaptação usada na acerola
(ver `aceroleira-01.md`).

**Pendente:** ver §5 — sobretudo confirmar se é o mesmo microclima da outra varanda antes de
assumir os mesmos parâmetros de DLI/chuva. *(Resolvido na entrada seguinte: é outro endereço.)*

**Fotos:** _não publicadas._

---

### 2026-08-02 — Correção de cadastro + localização confirmada por pin

**Observado:** o dono esclareceu que **não existe uma jabuticabeira separada** —
`jabuticabeira-01` foi um registro sem planta correspondente e foi marcado deprecado
(ver nota no topo daquele arquivo). Esta ficha (`jabuticabeira-hibrida-01`) é a **única**
jabuticaba real do projeto. O dono também anexou print do Google Maps com pin no local da
planta: **_coordenadas omitidas_** (local B).

**Concluído:** localização atualizada no cabeçalho. Esta coordenada é **diferente** da
cadastrada no local A, então não dá para reaproveitar sem checar o DLI/clima
daquele outro pin. *(P22/P23 já respondidas — ver [`docs/decisoes.md`](../docs/decisoes.md):
são duas varandas, com gerenciamento separado.)*

**Pendente:** confirmar se `aceroleira-01` está no mesmo endereço (local B) ou em
local A — hoje o projeto tem uma coordenada só, e ela pode estar associada à
planta errada.

---

### 2026-08-02 — Pergunta do dono: o que achar sobre frutificação?

**Observado:** planta comprada como "jabuticabeira híbrida" — nome comercial que, no
mercado brasileiro de viveiro, normalmente indica cultivar propagado por **estaca ou
enxerto** (não semente), vendido com promessa de frutificar bem mais rápido que o
pé-franco tradicional. O tronco na foto já mostra a casca característica
descamando/manchada da espécie, e a planta tem porte de vaso (não muda recém-germinada) —
sinal de que **já tem alguns anos de viveiro**, mesmo sendo fisicamente pequena (jabuticaba
cresce devagar por natureza).

**Hipótese (🟡 não é conclusão — não dá para confirmar por foto):**

- **Se for de fato propagação vegetativa (estaca/enxerto)** de um cultivar precoce, prazo
  de 2–4 anos até o primeiro fruto é plausível — mais rápido que os 3–6 anos da
  `jabuticabeira` enxertada "comum" documentados no PROJETO.md, e muito mais rápido que os
  8–15 anos de pé-franco. Isso depende do cultivar exato, que a etiqueta do viveiro (se
  houver) resolveria — hoje é desconhecido.
- **Três coisas hoje pesam contra, independente do cultivar:**
  1. **Vaso** — pelo tamanho aparente na foto (~30–35 cm ⌀, estimado, não medido), está
     abaixo dos 60–100 L recomendados para frutificação. Mesmo um cultivar precoce não
     frutifica bem em vaso pequeno demais — vira o mesmo "achado nº 1" já visto no projeto
     (vaso subdimensionado > qualquer outro fator).
  2. **Luz** — jabuticaba frutifica melhor com sol pleno (6h+). "Bastante sol à tarde" pode
     ser só 3–4h — dá para crescer, mas é menos que o ideal para floração/fruto abundante.
     Falta quantificar (pendência §5).
  3. **Estresse de transplante hoje** — replantada no dia da compra. Qualquer planta
     direciona energia para recuperar raiz antes de florescer; não é hora de esperar nada
     de fruto, independente de idade ou cultivar.

**Conclusão prática:** não dá para dar prazo de frutificação com confiança agora. É
razoável esperar que seja mais rápido que uma jabuticabeira comum (é a proposta comercial
do híbrido), mas o vaso e a luz — não a genética — vão decidir se isso se confirma.
**Prioridade imediata é a mesma de sempre no projeto: estabelecer a planta, medir o vaso
de verdade, e só depois pensar em fruto.**

**Ação:** nenhuma. Observação registrada para reavaliar quando houver mais dado (vaso
medido, horas de sol confirmadas, e a planta superando o estresse do transporte).

**Pendente:** ver §5.

---

### 2026-08-23 — Adaptação encerrada: brotação em todos os ramos + início de frutificação. Sensor instalado. Pergunta sobre adubo.

**Observado:** dono relata que, entre 2026-08-02 e hoje, a planta passou por período difícil
de adaptação e **perdeu quase todas as folhas**. Hoje está **brotando bem, com folhas novas
em todos os galhos**, e tem **cerca de 15 jabuticabas crescendo no tronco** (relato direto do
dono, não contado por mim na foto). Foto anexada confirma copa nova verde e densa nos ramos
superiores; a base dos troncos, mais lenhosa, é onde o dono localiza os frutos —
consistente com **cauliflorescência**, hábito normal da espécie (flor e fruto nascem
diretamente no tronco/galhos velhos, não nos ramos novos). O `hhcc-01` chegou e foi
**instalado nesta planta** (não na `aceroleira-01`) — resolve **P24** em `PROJETO.md` §7.
Dono não está mais no local B, então a extração de dado cru pelo nRF Connect (critério de
conclusão do Objetivo 1, [`docs/objetivo-1-captura-celular.md`](../docs/objetivo-1-captura-celular.md)
§7) **não pode avançar agora** — os prints anexados vêm do app oficial "Flower Care" do
fabricante, não da leitura crua.

**Dado do app (⚠️ processado pelo fabricante, não cru):**

| Métrica | Relatório diário 2026-08-22 | Tempo real (hoje, 18:19) |
|---|---|---|
| Luz — acumulação | 19891 (unidade rotulada "mmol"; app sugere faixa "adequada" 4500–9600) | 5055,0 lux instantâneo (faixa do app: 4500–80000) |
| Umidade do solo | mín 21% / máx 30% (faixa do app: 20–60%) | 28% |
| "Fertilidade" (EC) | mín 211 / máx 317 µS/cm (faixa do app: 200–2000) | 242 µS/cm |
| Temperatura | — | 29,1 °C (faixa do app: 5–35) |

**Concluído / hipótese:**

- **Brotação em todos os ramos + frutos se formando é o mesmo critério de saída de adaptação
  já usado na `aceroleira-01`** (2026-08-20, `docs/decisoes.md`): não é a data que decide, é o
  sinal de raiz ativa. Aqui o sinal é **mais forte** que o da acerola — colocar energia em
  fruto, além de folha nova, indica raiz funcional o suficiente para sustentar as duas
  demandas ao mesmo tempo.
- **EC baixa (211–317 de uma faixa 200–2000) bate com "zero adubo desde 2026-08-02"** — não há
  sinal de acúmulo de sal, e a espécie já é classificada como "EC baixa, sensível" na §2 desta
  ficha. Não há motivo para **não** adubar por excesso de sal — pelo contrário, o substrato
  está com pouca reserva de nutriente disponível.
- **Luz:** 🟡 **ambíguo, registrado como pendência, não conclusão.** Se a unidade "mmol" do
  app estiver certa, o acumulado de hoje (19891) fica **2–4× acima** da própria faixa que o
  app considera adequada (4500–9600) — possível sinal de sol forte demais para a copa nova e
  ainda tenra. Mas se o app na verdade reportar em **mol** (rótulo "mmol" seria erro de
  tradução, comum em apps chineses) e a faixa dele for calibrada para um perfil genérico, o
  valor real seria **≈19,9 mol/m²/dia** — dentro do alvo de DLI da **literatura da
  espécie-base** já registrado na §2 desta ficha (20–35 mol/m²/dia, maduro). As duas leituras
  não podem estar certas ao mesmo tempo. **Não decidir realocar a planta com base só nisso** —
  ver §5 pendência de contagem de horas de sol.
- **Umidade** dentro da faixa (20–60%), mas rondando o piso (21% no dia, 28% agora) — não é
  alarme, mas para uma espécie cujo alvo é "**solo sempre úmido**" (§2), vale manter regas
  frequentes, principalmente agora que a copa nova aumenta a transpiração.

**Sobre o adubo (pergunta do dono):** ✅ **Liberado, em dose leve e fracionada** — mesma
lógica de cautela usada na acerola em 2026-08-20 (`docs/decisoes.md`), com um agravante e um
atenuante:

- **Agravante:** a planta agora sustenta **duas demandas ao mesmo tempo** (folha nova + ~15
  frutos se formando) — é mais fácil forçar a mão numa raiz que já está no limite do que numa
  planta só vegetando.
- **Agravante:** o vaso real **ainda não foi medido** (§5, pendência antiga) — sem saber o
  volume de substrato, não dá para confiar na dose do rótulo, que é calibrada por diâmetro de
  vaso.
- **Atenuante:** o **Forth Frutas 12-05-15 + Ca, Mg, S e micros** já está em casa (comprado
  para a acerola, rótulo lido e aprovado em 2026-08-20 — ver `aceroleira-01.md`), é
  **balanceado** e, diferente da acerola (meta = crescer, não frutificar), aqui a meta **é**
  frutificar — a formulação "Frutas" deixa de ser uma ressalva e passa a ser adequada à meta
  real desta planta. Não há motivo para comprar outro produto (premissa 7).

**Ação:** aplicar Forth Frutas 12-05-15 em **meia dose** (metade do indicado no rótulo para o
diâmetro estimado do vaso, ~30–35 cm ⌀ ⚠️ não medido), e **fracionar** — não aplicar tudo de
uma vez; preferir 2 aplicações leves com 2–3 semanas de intervalo, acompanhando a EC do
sensor (quando a leitura voltar a ser possível) para ver se ela sobe sem despencar a cada
chuva. Isso depende de alguém estar fisicamente no local B para aplicar — dono não está lá
agora.

**Pendente:** ver §5 (atualizada). Prioridades novas: medir o vaso (trava a dose exata),
retomar a captura crua quando houver alguém no local B, e resolver a ambiguidade da unidade de luz
do app antes de tirar qualquer conclusão sobre excesso ou falta de sol.

**Fotos:** _não publicadas._

---

### 2026-09-17 — `hhcc-01` removido, foi para a `aceroleira-01`

> Ver detalhe completo em [`../equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md), §7.

**Observado:** dono informou que o sensor "veio pra acerola" — retirado desta planta. ⚠️ Data
exata e motivo não informados.

**Concluído:** esta planta fica **sem sensor** a partir de agora. A leitura via app "Flower
Care" que ela tinha (única fonte de dado desde 2026-08-23) também para. Nenhum dado adicional
sobre luz/umidade/EC/temperatura será coletado aqui até (se algum dia) outro sensor ser
instalado.

**Ação:** nenhuma. Segue valendo tudo que já estava registrado (adubação leve e fracionada,
contagem das ~15 jabuticabas), só que agora **sem instrumentação** — de volta a observação
visual/relato, como antes de 23/08.

**Pendente:** se algum dia fizer sentido reinstalar um sensor aqui, reavaliar pelos critérios
da §5.1 de [`equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md) (hoje sem sensor livre para
isso).

---

### 2026-09-20 — Reavaliação de copa (quase 1 mês sem checagem visual); fruto/broto confirmado num nó

> Recebido pelo canal oficial do Forms ([`../docs/entrada-atualizacoes-planta.md`](../docs/entrada-atualizacoes-planta.md)),
> processado manualmente porque o gatilho do Apps Script ainda estava sendo configurado no
> momento do envio (~13:27) — mesmo protocolo de processamento, só a origem do arquivo que foi
> manual. Primeira vez que esta planta recebe fotos por este canal.

**Observado (4 fotos do dono, varanda do local B):**

- **copa densa, verde forte, sem sinais de estresse** — folhagem numerosa cobrindo a maior
  parte da estrutura, nas duas fotos de conjunto (`-1`, `-2` e `-4`). Não há amarelamento,
  murcha ou queda visível;
- _(trecho sobre o entorno da varanda omitido)_
- **foto de perto (`-3`) do garfo de dois troncos**: casca clara descamando em manchas — bate
  com o "casca característica descamando/manchada da espécie" já registrado em 2026-08-02. Num
  dos nós, **um fruto/broto pequeno, verde, esférico, nascendo direto da casca** — cauliflorescência,
  igual ao hábito já descrito;
- não foi possível ver o vaso nem a base da planta em nenhuma das 4 fotos — sem dado novo sobre
  volume do vaso ou substrato.

**Concluído / hipótese (🟡 diagnóstico por foto é hipótese, não conclusão):**

- **Copa segue no rumo positivo** registrado desde 23/08 — quase um mês sem checagem visual e a
  planta continua densa e sem sintoma de estresse aparente. Nada aqui contradiz o estado
  "adaptação encerrada".
- **O fruto/broto da foto `-3` não dá para classificar com segurança** só por esta imagem:
  pode ser (a) um dos ~15 frutos já contados em 23/08, ainda pequeno, ou (b) um fruto/flor nova
  se formando agora, num ciclo novo de cauliflorescência. Sem foto comparativa do mesmo ponto em
  23/08, **não afirmar** se é continuidade ou fruto novo — registrar só como confirmação de que
  a cauliflorescência segue ativa. Isso **avança parcialmente** a pendência de recontar os ~15
  frutos (§5), mas não a resolve — falta uma foto de conjunto do tronco inteiro para contar.
- **Sem sensor instalado** (removido 17/09) — nenhum dado numérico associado a esta atualização.

**Ação:** nenhuma mudança de manejo. Continuar a dose leve e fracionada de Forth Frutas já em
curso. Pedir, na próxima série de fotos, um enquadramento do **tronco inteiro** (não só um nó)
para permitir a recontagem real dos frutos.

**Pendente:** ver §5 (atualizada) — recontagem completa dos frutos segue aberta; medir vaso;
identificar cultivar; confirmar exposição à chuva.

**Fotos:** _não publicadas._

---

### 2026-09-20 — Complemento: comentário do dono (Forms) — só 1 dos indícios virou fruto de fato; 1ª adubação fracionada aplicada

> Complementa a entrada anterior. O envio original desta planta (carimbo `2026-09-20_1327`) não
> tinha campo de comentário no Forms — só foi adicionado depois. O dono mandou o relato à parte;
> registrado aqui, acoplado ao mesmo update, em vez de virar uma checagem nova e desconectada.

**Observado (relato do dono):**

- A planta **resistiu bem** a uma adaptação difícil na varanda do local B (a única planta do
  projeto nesse endereço) — chegou a perder quase todas as folhas e hoje está **bem folheada**,
  com folha nova ainda nascendo, "já há algumas semanas bem".
- Dos **~10–15 indícios/brotinhos de jabuticaba** contados em 2026-08-23 (não retirados),
  **2 viraram flor** e **só 1 parece estar desenvolvendo fruto de fato** — é o mesmo que aparece
  na foto de perto (`-3`) da entrada anterior.
- **Adubou Forth Frutas meia dose hoje** (2026-09-20).

**Concluído / hipótese:**

- **Resolve, com dado direto do dono, a ambiguidade que a entrada anterior deixou em aberto**
  sobre o fruto/broto da foto `-3`: não é mais "pode ser continuidade ou fruto novo" — é o único,
  entre os ~10–15 indícios originais, que está virando fruto de verdade. **Isto não fecha** a
  pendência de recontagem completa (§5): o dono confirmou o destino dos indícios já conhecidos,
  não recontou a copa inteira à procura de indícios novos.
- **Confirma sustentação da recuperação** ("já há algumas semanas bem"), reforçando o 🟢 já
  registrado — mais um check-in no mesmo sentido de 23/08 e hoje.
- **Adubo de hoje é a 1ª aplicação fracionada registrada nesta ficha** desde a liberação em
  2026-08-23 — até aqui a aplicação dependia de alguém estar fisicamente no local B, e não
  havia confirmação de que tivesse ocorrido. Fracionamento previsto era de **2 aplicações leves
  com 2–3 semanas de intervalo**; esta conta como a 1ª. Cedo demais para esperar qualquer efeito
  visível dela nas fotos de hoje (mesmo dia).

**Ação:** nenhuma mudança de manejo além de registrar o marco do adubo. Programar a 2ª aplicação
fracionada para ~2–3 semanas (alvo ~04–10/10). Continuar pedindo, na próxima série, o
enquadramento do tronco inteiro para a recontagem real.

**Pendente:** ver §5 (atualizada) — recontagem completa da copa; registrar 2ª aplicação de
adubo quando ocorrer; demais itens sem mudança.
