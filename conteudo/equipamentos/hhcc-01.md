# HHCC Flower Care — `hhcc-01`

> **Tipo:** sensor
> **Estado:** 🟢 em uso, dado cru confirmado — primeira captura crua via nRF Connect feita em
> 2026-09-20 (conectou sem PIN/pareamento, variante `HHCCJCY01` aberta confirmada na prática).
> Objetivo 1 **ainda não fechado**: faltam as demais leituras do critério de conclusão (§7 de
> [`docs/objetivo-1-captura-celular.md`](../docs/objetivo-1-captura-celular.md)) — só 1 de 5
> feita.
> **Instalado em:** [`aceroleira-01`](../plants/aceroleira-01.md), desde 2026-09-17 ⚠️ (data
> exata da troca não confirmada, só informada nesta data). Antes, em
> [`jabuticabeira-hibrida-01`](../plants/jabuticabeira-hibrida-01.md), 2026-08-23 → 2026-09-17.
> **Última atualização:** 2026-09-20

---

## 1. Compra

| Campo | Valor |
|---|---|
| `equip_id` | `hhcc-01` |
| Modelo exato / SKU | "Hhcc Flower Care, Gramado, Monitor Inteligente" — anúncio Mercado Livre `MLB-4666527509`. ⚠️ SKU/firmware exato do chip não declarado no anúncio; confirmar variante (`HHCCJCY01` vs `HHCCJCY10`) na prática — ver [`docs/objetivo-1-captura-celular.md`](../docs/objetivo-1-captura-celular.md) |
| Fabricante | Rebrand genérico do chip HHCC (não é Xiaomi oficial) |
| Onde comprou | Mercado Livre — <https://produto.mercadolivre.com.br/MLB-4666527509-hhcc-flower-care-gramado-monitor-inteligente-_JM> |
| Data da compra | ⚠️ **a confirmar** — decisão tomada em 2026-08-02, pedido ainda não confirmado como efetivado |
| Preço pago | R$ 135,30 (anunciado; confirmar valor final do pedido) |
| Avaliação prévia | [`docs/produtos-avaliados.md`](../docs/produtos-avaliados.md#4-hhcc-flower-care-gramado-monitor-inteligente--mercado-livre--r-13530) — item 4, veredito ✅ |
| Logística | Envio internacional da China. **Janela de entrega confirmada no pedido: 11–27/08 ⚠️** (até ~25 dias, não os ~9 estimados antes). CPF precisa estar regular para importação |

## 2. O que mede de fato

Descontando marketing — a teoria por trás está em
[`docs/medicoes.md`](../docs/medicoes.md), não duplicada aqui.

| Parâmetro anunciado | O que é de verdade | Unidade nativa | Confio? |
|---|---|---|---|
| Temperature Detection | Temperatura do substrato | °C | ✅ direto, sem tradução de marketing |
| Nutrient Detector | **EC** (condutividade elétrica) — não NPK real | µS/cm | ✅ como proxy/tendência, ❌ como valor absoluto de nutriente |
| Light Detection | Lux, não PAR/PPFD — precisa converter (`÷54` para luz natural) | lx | ✅ desde que convertido |
| Soil Moisture Detection | Umidade da camada onde a sonda está (~5 cm, superficial) | % | 🟡 tendência/ciclo, não VWC calibrado — e não representa a zona radicular |

## 3. [Checklist de avaliação](../docs/checklist-avaliacao.md) — com o produto em mãos

Diferente da avaliação pré-compra: aqui é o que se confirmou na prática. **Preencher quando
o sensor chegar** — hoje reflete só o que as imagens do anúncio já permitiam inferir.

| # | Item | Resultado real |
|---|---|---|
| 1 | Dispositivo ou componente? | Dispositivo — corpo próprio, pilha CR2032 própria (pendente confirmar ao receber) |
| 2 | Dado cru sem nuvem do fabricante? | ✅ **Confirmado na prática em 2026-09-20** — nRF Connect conectou direto, sem PIN, sem pareamento, sem instalar o app do fabricante. Ver histórico §7 |
| 3 | Sobrevive à varanda? | Não declarado (sem IP no anúncio) — pendente |
| 4 | Comprimento da sonda | Pendente medir — imagens sugerem formato igual ao Mi Flora original (~5 cm) |
| 5 | O que mede de fato | Ver §2 acima |
| 6 | Autonomia / manutenção | CR2032, 365 dias declarados — pendente confirmar |
| 7 | Custo por parâmetro útil | R$135,30 / 4 parâmetros — pendente confirmar que os 4 realmente funcionam |

## 4. Como extrair o dado cru

Protocolo, UUIDs, comandos e decodificação: ver
[`docs/objetivo-1-captura-celular.md`](../docs/objetivo-1-captura-celular.md) — não duplicado
aqui.

## 5. Vínculo com plantas

| Planta | De | Até | Observação |
|---|---|---|---|
| [`jabuticabeira-hibrida-01`](../plants/jabuticabeira-hibrida-01.md) | 2026-08-23 ⚠️ | 2026-09-17 ⚠️ | Só leitura pelo app "Flower Care"; nRF Connect nunca chegou a ser feito lá (dono fora do local B) |
| [`aceroleira-01`](../plants/aceroleira-01.md) | 2026-09-17 ⚠️ | — (em uso) | Reinstalado — dono relatou a troca sem detalhar data exata nem motivo |

### 5.1 Em qual planta instalar → ✅ resolvido 2026-08-23: `jabuticabeira-hibrida-01`

Decisão **oportunista**, não por comparação formal dos critérios abaixo: o dono estava no local B quando o sensor chegou e instalou nesta planta antes de viajar. `aceroleira-01` segue
sem sensor.

Candidatas que estavam em avaliação (mantido para registro): [`aceroleira-01`](../plants/aceroleira-01.md) (local A) e
[`jabuticabeira-hibrida-01`](../plants/jabuticabeira-hibrida-01.md) (local B).

Critérios que pesam **do lado do equipamento** — o manejo de cada planta fica na ficha dela:

- **Distância do celular na hora da leitura.** BLE tem alcance curto; a captura é manual.
- **Profundidade do vaso.** Sonda de ~5 cm rende menos quanto mais fundo for o vaso.
- **Chuva direta.** O corpo resiste a respingo, não a imersão nem a vaso que empoça.
- **Facilidade de repetir a leitura** 5× em horários diferentes, que é o critério de
  conclusão do [Objetivo 1](../docs/objetivo-1-captura-celular.md).

⚠️ Antes de decidir, conferir na ficha da planta escolhida se há restrição ativa (as duas
estão em período de adaptação). Inserir a sonda é ação física no substrato — **a ficha da
planta decide se pode**, não este arquivo.

## 6. Manutenção

| Data | O que foi feito | Próxima |
|---|---|---|
| | | |

---

## 7. Histórico

> **Append-only.** Registrar também o que decepcionou — é o dado mais útil para a próxima compra.

### 2026-08-02 — Decisão de compra

**Observado:** dono confirmou a compra do sensor avaliado como item 4 em
`docs/produtos-avaliados.md` (Mercado Livre, `MLB-4666527509`, R$135,30), após comparar com
outras opções (Xiaomi Mi Flora "de marca", busca ampla AliExpress) e confirmar pelas imagens
do próprio anúncio que o app pedido é "Flower Care" — não "Smart Life"/Tuya.

**Ação:** ficha criada em estado `⚪ não recebido`, antes da chegada, conforme regra 1 de
[`equipamentos/README.md`](README.md) (registrar o baseline de fábrica antes de qualquer uso).

**Pendente:** confirmar pedido efetivado e data de entrega; decidir planta de instalação;
executar o procedimento de `docs/objetivo-1-captura-celular.md` assim que chegar.

### 2026-08-02 — Janela de entrega confirmada: 11–27/08

**Observado:** dono confirmou no pedido que a previsão de entrega é **11 a 27 de agosto**,
não os ~9 dias estimados a partir das imagens do anúncio. Pode demorar até ~25 dias.

**Concluído:** sem urgência prática — nada na Fase 1 depende de prazo (§5 do `PROJETO.md`:
avanço é por dor real, não por cronograma). O único efeito é adiar quando o Objetivo 1 pode
começar.

**Ação:** nenhuma. Só aguardar.

### 2026-08-23 — Sensor recebido e instalado na `jabuticabeira-hibrida-01`

**Observado:** dono confirma que o sensor chegou e foi instalado na jabuticabeira híbrida
(local B), resolvendo **P24**. O app oficial "Flower Care" já mostra leituras:
relatório diário de 2026-08-22 e tela em tempo real de hoje (18:19) — luz, umidade, EC e
temperatura, com os dados registrados na ficha da planta
([`plants/jabuticabeira-hibrida-01.md`](../plants/jabuticabeira-hibrida-01.md), entrada
2026-08-23). Dono não está mais no local B, então **não deu para seguir o procedimento do
nRF Connect** (`docs/objetivo-1-captura-celular.md` §3) — variante do chip (§1 daquele
arquivo) ainda não confirmada, nem os 16 bytes crus capturados.

**Concluído:** o sensor está fisicamente instalado e funcionando (o app lê e sincroniza —
"most recently synced 08.23 12:04"), mas o **Objetivo 1 não está concluído**: o critério de
conclusão (§7 daquele arquivo) exige leitura crua sem app do fabricante, e hoje só há dado do
"Flower Care". Distinguir os dois estados evita registrar o objetivo como fechado antes da
hora.

**Ação:** nenhuma imediata. Retomar o procedimento nRF Connect assim que houver alguém no local B com o celular perto da planta — não precisa ser o dono, qualquer pessoa com o app
instalado consegue seguir o passo a passo de `docs/objetivo-1-captura-celular.md` §3.

**Pendente:** confirmar variante do chip (§1 do objetivo), capturar os 16 bytes crus, e só
então mover este equipamento de "parcial" para "em uso" pleno em
[`equipamentos/inventario.md`](inventario.md).

### 2026-09-17 — Sensor movido para a `aceroleira-01` (local A)

**Observado:** dono informa que o sensor "veio pra acerola" — foi retirado da
`jabuticabeira-hibrida-01` (local B) e reinstalado na `aceroleira-01` (local A). ⚠️ Data exata da troca e motivo não informados — registrando com a data do relato.

**Concluído:**

- **Vínculo atualizado** (§5): fecha o período na jabuticabeira em 2026-09-17 ⚠️, abre na
  acerola na mesma data ⚠️. `equipamentos/inventario.md` e o `plants.yaml` das duas plantas
  atualizados a partir desta ficha.
- **Consequência para o Objetivo 1:** a captura crua via nRF Connect **nunca foi feita** na
  jabuticabeira (dono estava fora do local B). Como o sensor está agora do lado do dono — que
  parece estar no local A, perto da acerola, com o celular em mãos (fotos chegando pelo Remote
  Control) — **esta pode ser a oportunidade** de finalmente fazer a captura crua. O critério
  de conclusão do Objetivo 1 não é ligado a uma planta específica, só a executar o
  procedimento uma vez com o sensor em mãos.
- **Consequência para a jabuticabeira:** fica **sem sensor instalado** a partir de agora — ver
  atualização em [`../plants/jabuticabeira-hibrida-01.md`](../plants/jabuticabeira-hibrida-01.md).
  A leitura via app "Flower Care" que ela tinha também para.

**Ação:** nenhuma obrigatória. Sugestão: se o dono tiver o app **nRF Connect** instalado e uns
minutos com o celular perto da acerola, seguir `docs/objetivo-1-captura-celular.md` §3 agora
resolveria o Objetivo 1 de uma vez.

**Pendente:** motivo/data exata da troca (baixa prioridade, não bloqueia nada); captura crua
via nRF Connect (P26, atualizada no `PROJETO.md`).

### 2026-09-20 — Primeira captura crua via nRF Connect: variante confirmada, 16 bytes decodificados

**Observado:** dono seguiu o procedimento da §3 de `docs/objetivo-1-captura-celular.md` com o
nRF Connect for Mobile, celular ao lado da `aceroleira-01`. Resumo da execução:

- **Scanner:** dispositivo anunciou como `Flower care` (MAC `5C:85:7E:14:A8:E7`), **sem pedir
  PIN nem pareamento** ao conectar — confirma na prática a variante `HHCCJCY01` aberta (§1 do
  objetivo), fechando a dúvida que constava desde a compra.
- **Obstáculo:** a conexão caía sozinha em ~10s, provavelmente por outro dispositivo BLE do
  celular (Galaxy Fit3) disputando o rádio. Resolvido reduzindo interferência (Bluetooth de
  outros dispositivos desligado) e executando write+read em sequência rápida, sem pausa para
  screenshot no meio.
- **Comando de modo tempo real:** `A01F` escrito com sucesso na característica `0x1A00`
  (confirmado pelo próprio valor ecoado de volta pelo app).
- **16 bytes crus lidos** em `0x1A01`: `DE 00 03 5F 10 00 00 1A 2A 01 02 3C 00 FB 34 9B`.
- **Decodificados à mão** pela §4 (little-endian):

  | Campo | Bytes | Cálculo | Resultado |
  |---|---|---|---|
  | Temperatura | `DE 00` → `0x00DE`=222 | ÷10 | **22,2 °C** |
  | Luz | `5F 10 00 00` → `0x0000105F` | — | **4191 lux** |
  | Umidade | `1A` → `0x1A` | — | **26 %** |
  | Condutividade | `2A 01` → `0x012A` | — | **298 µS/cm** |

- **Bateria/firmware** lidos em `0x1A02`: `5F 39 33 2E 33 2E 36` → byte 0 `0x5F`=95 → 🔋
  **95%**; bytes seguintes em ASCII = firmware **"93.3.6"**.
- **Sanidade cruzada (parcial):** app "Light Meter Lite" no celular, câmera apontada para cima
  ao lado do sensor, leu **8317 lux** contra os **4191 lux** do sensor — mesma ordem de
  grandeza, não é leitura zerada nem absurda. 🟡 Diferença de ~2× é esperada: o luxímetro do
  celular mediu incidência apontada para o céu, o sensor está entre folhas rente ao substrato,
  ângulos e calibração diferentes — **não é uma comparação 1:1**, só a checagem de sanidade que
  a §7 pede.

**Concluído:**

- **Variante do chip confirmada:** `HHCCJCY01` aberto. Fecha a pendência que constava desde a
  compra (§1 da ficha).
- **6 dos 8 itens do critério de conclusão (§7 do objetivo) fechados nesta sessão:** dispositivo
  checado, ficha vinculada, conexão sem app/conta, 16 bytes capturados, decodificação manual,
  bateria obtida. **Faltam:** mais 4 leituras em horários diferentes (esta foi a 1ª) e refinar a
  sanidade cruzada da umidade (comparar com rega recente, ainda não feito).
- **Objetivo 1 não está fechado ainda** — só uma leitura não sustenta tendência nem valida o
  sensor contra a realidade da planta ao longo do tempo. Ver P26 em
  [`../PROJETO.md`](../PROJETO.md).

**Ação:** repetir a leitura (write `A01F` em `0x1A00` → read `0x1A01`) em pelo menos mais 4
momentos diferentes, registrando cada uma aqui e comparando com a rega/clima na ficha da
`aceroleira-01`.

**Pendente:** 4 leituras adicionais; sanidade cruzada da umidade (alta logo após rega, baixa
dias depois).
