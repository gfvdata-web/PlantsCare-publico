# Avaliação de produtos — catálogo de compras candidatas

> **Tema macro:** catálogo de candidatos avaliados **antes** da compra. Responde à **P13**
> do [PROJETO.md](../PROJETO.md), aplicando o
> [checklist de avaliação](checklist-avaliacao.md). Este arquivo é o registro produto a
> produto; decisões de compra efetivas vão para [`decisoes.md`](decisoes.md), e o que foi
> comprado ganha ficha em [`equipamentos/`](../equipamentos/README.md).
>
> ⚠️ Avaliações anteriores a 2026-08-02 citam seções antigas do `PROJETO.md` (`§4.5`, `§2.4`,
> `§1.2`…) que não existem mais. A tabela de tradução está no §2 do `PROJETO.md`. Registros
> antigos ficam como estão — são histórico.
>
> Convenção: mesma do `PROJETO.md` — números não confirmados levam `⚠️`. Veredito final é
> ✅ (atende), 🟡 (atende com ressalva) ou ❌ (não atende / evitar).

---

## Checklist aplicado — legenda das colunas

Definição completa em [`checklist-avaliacao.md`](checklist-avaliacao.md).

| # | Pergunta |
|---|---|
| 1 | Dispositivo ou componente? |
| 2 | Dado cru sem nuvem do fabricante? |
| 3 | Sobrevive à varanda (chuva/sol)? |
| 4 | Sonda serve para vaso de 25–50 L (≥15–20 cm)? |
| 5 | O que mede *de fato* (descontando marketing)? |
| 6 | Autonomia / manutenção |
| 7 | Custo por parâmetro útil |

---

## 1. "Medidor Prime Digital Ph Solo TeOliver" — Mercado Livre — R$ 44,90

Link: <https://www.mercadolivre.com.br/p/MLB48939596?pdp_filters=item_id%3AMLB5654639840>

| # | Resposta |
|---|---|
| 1 | Dispositivo — mas sem rádio nem porta. Mostrador é só um LCD local, leitura 100% manual |
| 2 | ❌ **Reprovado aqui.** Não existe "dado cru" a extrair — não tem como automatizar a leitura. Todo valor tem que ser digitado à mão, todo dia, por alguém |
| 3 | ⚠️ Não declarado (IP), ponta metálica exposta — não é o ponto fraco principal |
| 4 | ⚠️ Comprimento da sonda não informado no anúncio, mas o formato ("agulha") sugere alguns cm — provavelmente mede só a camada superficial, mesmo problema do Mi Flora (§1.2), sem nem o benefício do dado automático |
| 5 | pH por eletrodo de agulha sem calibração declarada — **não confiável** (o próprio §2.4 do `PROJETO.md` já descarta esse tipo de medidor de pH). Umidade e luz também analógicas, sem calibração |
| 6 | Bateria 9V não incluída; sem alerta de bateria baixa (não tem lógica nenhuma, é analógico) |
| 7 | Ruim — R$45 por 4 medidas, das quais a mais importante (pH) é a que o projeto já sabe que não presta nesse formato |
| **Veredito** | ❌ **Não comprar.** Reprova já no item 2 (regra do §4.5: "reprovou em 1–3, o resto não interessa") |
| Alternativa já prevista | Kit colorimétrico de pH ou análise laboratorial (§2.4, Fase 0) |

---

## 2. "Zigbee Soil Sensor Moisture Temperature Humidity Tester" — AliExpress — R$ 35,69

Link: <https://pt.aliexpress.com/item/1005012014022552.html>

| # | Resposta |
|---|---|
| 1 | Dispositivo — tem rádio Zigbee e corpo próprio, mas **depende de um coordenador externo** (não incluído) para funcionar. É um caso intermediário: o sensor é um dispositivo, o sistema completo exige mais um componente |
| 2 | ✅ **Sim, na variante "TYPE1 (for 2mqtt)"** — Zigbee2MQTT é open-source, publica o valor bruto via MQTT. A variante Tuya seria pior (seria preciso Tuya Local ou nuvem Tuya) — **importante escolher a variante certa se comprar** |
| 3 | ⚠️ Não declarado no anúncio (IP rating não visível) |
| 4 | ⚠️ Não informado — precisa checar antes de comprar, é o item que mais falta verificar |
| 5 | Umidade do solo confirmada; temperatura, umidade do ar, luz e "fertilidade" (= EC, §2.4) marcados como **opcionais** — ou seja, variam por SKU/cor, checar exatamente qual combinação está sendo comprada |
| 6 | Não informado (tipo de pilha/duração) |
| 7 | Preço da peça é bom (R$36), mas **o custo real inclui um coordenador Zigbee** (ex. Sonoff ZBDongle-E, ~R$100–150 ⚠️, citado no §4 do `PROJETO.md`) que o dono ainda não tem — custo real do 1º dado ≈ R$150+ ⚠️ |
| **Veredito** | 🟡 **Passa no checklist, mas não é candidato à Fase 1.** A Fase 1 (§6) explicitamente busca validar o pipeline com o mínimo de partes novas — este sensor introduz uma peça de infraestrutura (coordenador Zigbee) que o Mi Flora (Caminho A) não exige, já que BLE já funciona no PC do dono (§4.2). Guardar para **Fase 3** ("2º caminho de hardware para comparação", §6) — Zigbee escala melhor que BLE quando o número de nós crescer. |

---

## 3. "Sensor Inteligente De Umidade Do Solo Para Plantas" — Mercado Livre — R$ 45,59

Link: <https://www.mercadolivre.com.br/sensor-inteligente-de-umidade-do-solo-para-plantas/p/MLB2056360755?pdp_filters=item_id%3AMLB4761929519>

| # | Resposta |
|---|---|
| 1 | Dispositivo — corpo próprio em formato de "caneta", app de celular na imagem do anúncio |
| 2 | ⚠️ **Não verificável pelo anúncio.** Não há menção a protocolo, marca de chipset, nem compatibilidade com Home Assistant/ESPHome/Theengs. O app próprio mostrado na foto é justamente o sinal de alerta do §4.5 item 2: "se a resposta for 'só pelo app', reprovado". Precisa investigar (nome do app + "protocol reverse engineering" / Theengs / bleak) **antes** de decidir |
| 3 | Não informado |
| 4 | Não informado — formato "caneta" sugere sonda curta, provável mesma limitação do Mi Flora |
| 5 | Só "umidade do solo" é mencionado — sem luz, EC ou temperatura, ou seja, mede **menos** que o Mi Flora |
| 6 | Não informado |
| 7 | Preço praticamente igual ao Mi Flora (R$46 vs. R$80–180 ⚠️, mas há Mi Flora por menos em promoção) por **menos parâmetros e protocolo incerto** — pior custo por parâmetro útil que o Caminho A já validado |
| **Veredito** | 🟡 **Não comprar sem antes confirmar o protocolo.** Mesmo que passe na verificação, mede menos que o Mi Flora pelo mesmo dinheiro. Só faria sentido se o protocolo se mostrar mais fácil de integrar que o do Mi Flora — pouco provável, já que o Mi Flora tem implementação pronta em `bleak`/ESPHome/Theengs (§3, Caminho A) |

---

## Resumo comparativo

| Produto | Dado cru (item 2) | Infra extra | Custo real p/ dado funcionando | Veredito | Quando reconsiderar |
|---|---|---|---|---|---|
| Medidor TeOliver 4-em-1 (agulha) | ❌ | Nenhuma | R$45 + pilha 9V | ❌ Evitar | Nunca — resolvido por kit de pH (§2.4) |
| Zigbee Soil Sensor (AliExpress, 2mqtt) | ✅ | Coordenador Zigbee | ~R$150+ ⚠️ | 🟡 Guardar | Fase 3, se decidir por Zigbee em vez de ESP32/BLE |
| "Sensor Inteligente" (ML, sem marca) | ⚠️ não confirmado | Desconhecida | R$46 + risco de nuvem fechada | 🟡 Investigar | Se confirmar protocolo aberto e sonda longa |
| *(referência)* Mi Flora — §3 Caminho A | ✅ confirmado | Nenhuma (§4.2) | ~R$80–180 ⚠️ | ✅ Recomendado | **Já é a escolha da Fase 1** |

**Conclusão provisória:** nenhum dos três produtos enviados desloca o Mi Flora como primeiro
sensor da Fase 1. O medidor de agulha reprova de saída (item 2 do checklist). O sensor
Zigbee é o mais interessante dos três, mas pertence à Fase 3. O sensor genérico do Mercado
Livre precisa de uma verificação de protocolo antes de qualquer decisão — do jeito que está,
é o tipo de compra que o §7 do `PROJETO.md` já pede para evitar ("prender-se à nuvem do
fabricante").

---

---

## Sugestões de compra alinhadas ao projeto

Busca feita em 2026-08-02 priorizando o que o `PROJETO.md` já define como próximo passo real
(Fase 0 e Fase 1, §6) — não uma lista genérica de "sensores legais".

> ⚠️ **Correção (2026-08-02):** os links de produto específico desta seção que eu tinha
> colado antes vieram de resultados de busca (snippets) **não verificados ao vivo** e
> estavam quebrados/errados. Tentei confirmá-los abrindo o Mercado Livre e o AliExpress no
> navegador — os dois bloquearam a navegação automática com tela de login/captcha, então
> não há como eu garantir um link de produto específico por esse caminho. Abaixo ficam
> **termos de busca exatos** em vez de URLs — mais lento, mas confiável.

### ~~Prioridade 1 — Fase 0~~ 🚫 **REVOGADA em 2026-08-02**

> **Não comprar nada desta seção.** Duas decisões posteriores a invalidaram
> (ver [`decisoes.md`](decisoes.md)):
>
> 1. **Pesagem de vaso não foi aprovada** — o projeto segue só com sensores. A balança
>    deixou de ser "a medição nº 1"; não é medição nenhuma.
> 2. **A Fase 0 original foi descartada** — pH virou medição pontual registrada na ficha da
>    planta, não item de compra planejado.
>
> Mantida visível, riscada, para preservar o registro de que a recomendação existiu.

| ~~Item~~ | Por que **não** comprar agora |
|---|---|
| ~~Balança de banheiro digital~~ | 🚫 Pesagem de vaso fora de escopo por decisão do dono |
| ~~Kit teste de pH do solo~~ | 🟡 Não é compra planejada. Se um dia for medir pH, é ação pontual da ficha da planta — e análise laboratorial ganha do kit |

### Prioridade 2 — Fase 1, ~R$80–180, o sensor que já foi validado no checklist

O mesmo hardware/protocolo (chip **HHCC**, firmware **`HHCCJCY01`**, BLE GATT documentado,
funciona com `bleak`/ESPHome/Theengs) aparece sob **marcas diferentes** — Xiaomi Mi Flora,
Mijia Flora Monitor, VegTrug Flower Monitor/Grow Care são o mesmo chip rebatizado. Isso
importa porque abre a opção de comprar o mais barato do lote, desde que passe na checagem
de protocolo abaixo.

**Termos para buscar você mesmo** (Mercado Livre e AliExpress):
- `xiaomi mi flora sensor plantas`
- `mijia flora monitor`
- `vegtrug flower monitor` ou `vegtrug grow care`
- `hhcc flower care sensor` (nome técnico do chip — costuma filtrar melhor que "xiaomi")

**Checagem obrigatória antes de comprar qualquer anúncio que aparecer (regra do §4.5, item 2):**
1. No anúncio/reviews/perguntas, procurar qual app o vendedor indica: **"Mi Home" /
   "Flower Care" / "VegTrug Grow Care"** → ✅ protocolo aberto, é o que o projeto precisa.
   **"Smart Life" / "Tuya"** → ❌ evitar, é a versão `HHCCJCY10`, que fala com nuvem Tuya em
   vez do BLE aberto — quebra o requisito de dado cru do §1.
2. Se o anúncio não deixar claro, **perguntar direto para o vendedor** antes de comprar
   ("esse sensor usa o app Mi Home/Flower Care, ou precisa do Smart Life/Tuya?"). Sai mais
   barato tirar a dúvida ali do que descobrir depois de pago que caiu na versão errada.
3. Depois de escolher um anúncio, me manda o link ou o print que eu registro a avaliação
   com o checklist completo, como fiz com os três primeiros.

**Candidatos identificados em 2026-08-02 (via Google Shopping, ainda não confirmados):**

| Anúncio | Local | Preço | Status |
|---|---|---|---|
| "HHCC Flora Monitor Plant Sensor for Xiaomi Mijia" (item `1005010121399601`) | AliExpress | — | ❌ **Testado — indisponível para o Brasil** ("this item's currently unavailable in your location"). Descartar este anúncio específico |
| "HHCC Flora Monitor Flower Care Plant Sensor Grass Soil Water" | AliExpress | — | ⚠️ Ainda não testado — outro anúncio, pode ter disponibilidade diferente |
| "Hhcc Flower Care, Gramado, Monitor Inteligente" | Mercado Livre | R$ 135,30 | ✅ **Confirmado por print — ver avaliação completa no item 4 abaixo** |

---

## 4. "Hhcc Flower Care, Gramado, Monitor Inteligente" — Mercado Livre — R$ 135,30

Link: <https://produto.mercadolivre.com.br/MLB-4666527509-hhcc-flower-care-gramado-monitor-inteligente-_JM>

Confirmado por print das imagens do próprio anúncio em 2026-08-02.

| # | Resposta |
|---|---|
| 1 | Dispositivo — corpo próprio no mesmo formato físico do Mi Flora original, pilha própria (CR2032), sem necessidade de microcontrolador externo |
| 2 | ✅ **Bom sinal.** As imagens do anúncio mostram o app **"Flower Care"** explicitamente (busca na App Store/Google Play, tela "Flower Care", fluxo "Sign in → Add Device → Scanning via Bluetooth → Binding Success"). É o mesmo app do ecossistema Mi Flora/HHCC original, com protocolo BLE já documentado e suportado por `bleak`/Home Assistant/Theengs (§3, Caminho A). **Não** menciona Smart Life/Tuya em nenhuma imagem — passa no ponto que reprovou o item 3 do catálogo |
| 3 | ⚠️ Não declarado (sem IP rating nas imagens) — mesma situação do Mi Flora original, que o `PROJETO.md` já trata como "resiste a respingo, não a imersão" (§7) |
| 4 | ⚠️ Sonda com o mesmo formato/comprimento do Mi Flora original ("insira o sensor Flower Care no solo, pelo menos 2/3") — herda a mesma limitação de profundidade documentada no §1.2 (mede a camada superficial, não a zona radicular em vasos de 25–50 L) |
| 5 | Imagens do anúncio declaram exatamente os 4 parâmetros do Caminho A: **Temperature Detection, Nutrient Detector (= EC, ver §2.4), Light Detection, Soil Moisture Detection** — sem overclaim de marketing além do que o projeto já espera |
| 6 | **CR2032, 365 dias de bateria declarados** — dentro da faixa do Mi Flora original (4–12 meses ⚠️, §3) |
| 7 | R$ 135,30 por 4 parâmetros reais — dentro da faixa esperada do Caminho A (R$80–180 ⚠️, §3), embora no topo dela |
| Logística | ⚠️ **Envio internacional da China**, chegada estimada a partir de 11/08 (~9 dias). CPF precisa estar regular para importação (declarado no próprio anúncio) — não é blocker, mas muda o prazo em relação a um vendedor nacional |
| **Veredito** | ✅ **Melhor candidato encontrado até agora para a Fase 1.** Passa em todos os pontos do checklist §4.5 que dá para verificar pelas imagens; o único ponto pendente é confirmar via reviews/perguntas do próprio anúncio se algum comprador teve problema de pareamento ou recebeu a versão errada. Recomendo prosseguir com este, salvo se o dono preferir esperar um vendedor com envio nacional mais rápido |

### Prioridade 3 — Fase 3, guardar para depois (não comprar agora)

| Item | Por quê | Link candidato |
|---|---|---|
| ~~**HX711 + célula de carga 5 kg**~~ | 🚫 **Revogado em 2026-08-02** — pesagem de vaso não aprovada (ver [`medicoes.md`](medicoes.md)). Só reabrir se a decisão for revista | — |
| **Sonda capacitiva longa (15–25 cm)** | Substitui o HX711 como motivação real para o Caminho B: é o único jeito de medir a zona radicular, já que nenhum dispositivo BLE pronto tem sonda longa. Exige ESP32 + vedação | buscar `sensor capacitivo umidade solo 20cm` — ⚠️ é **componente**, não dispositivo |
| **Sonoff ZBDongle-E (coordenador Zigbee)** | Só faz sentido **junto** com o sensor Zigbee avaliado no item 2 acima — sem isso, aquele sensor não funciona. Comprar os dois juntos, e só na Fase 3 | buscar "Sonoff ZBDongle-E" no Mercado Livre/AliExpress; confirmar frequência 900 MHz (padrão BR) vs 2.4 GHz conforme o produto |

**Por que não sugeri BH1750/TSL2591/SHT31/ESP32 avulsos agora:** são peças do Caminho B
(§3), que o `PROJETO.md` deliberadamente empurra para a Fase 3 ("comprar pronto agora, DIY
depois", §1 e §10). Comprar componentes soltos antes de o Mi Flora provar o pipeline seria
repetir o erro que o roadmap já evitou de propósito.

---

## 5. ESP32 devkit como ponte BLE→WiFi (infraestrutura, não sensor novo)

Diferente das avaliações acima, não é uma medida nova candidata — é a peça de infraestrutura
que resolveria a dor confirmada em 2026-09-20 (`docs/decisoes.md`): o **PC não alcança o
`hhcc-01` pelo Bluetooth**, e não pode ser movido para perto. Não há armadilha de variante como
a do HHCC — qualquer devkit ESP32-WROOM genérico serve, é peça de prateleira padronizada.

| # | Resposta |
|---|---|
| 1 | É **componente**, não dispositivo pronto — mas aqui isso é esperado: é justamente a peça que falta para virar um "gateway BLE→WiFi". Precisa de fonte USB (5V — provavelmente já tem um carregador de celular sobrando em casa) e, dependendo de onde fica, uma caixinha de proteção |
| 2 | ✅ Sem nuvem nenhuma. Firmware **ESPHome** é 100% local e aberto, gravado **pelo navegador** (`web.esphome.io`, sem instalar nada, sem soldar). O componente pronto `xiaomi_hhccjcy01` já decodifica o HHCC dentro do próprio ESP32 |
| 3 | 🟡 **Depende de onde ele fica — pergunta em aberto antes de comprar.** Ele não precisa ficar exposto à chuva como o sensor: só precisa estar **dentro do alcance BLE (~5–15 m, pior com parede) do `hhcc-01`**. Um ponto **coberto** (dentro de casa, perto de uma janela/porta que dá para a varanda, com tomada) resolve sem nenhuma caixa impermeável. Se não houver tomada coberta a essa distância, precisa de proteção contra chuva (caixa plástica simples + furo para o cabo — mais ~R$20–30 e um pouco de trabalho manual) |
| 4 | N/A — não tem sonda, só relê o `hhcc-01` que já existe e já está instalado |
| 5 | N/A — não mede nada, só transporta o dado que o `hhcc-01` já produz |
| 6 | Alimentação contínua por USB, sem pilha — zero manutenção de energia |
| 7 | N/A (não é uma medida nova). Custo real estimado: placa ~R$30–60 + cabo/fonte R$0–20 (se não tiver sobrando) + caixa R$0–30 (só se não houver ponto coberto) ⚠️ = **R$30–110**, variando conforme a resposta do item 3 |
| **Veredito** | ✅ **Confirmado 2026-09-20** — existe tomada coberta dentro de casa, no alcance BLE do `hhcc-01`. Sem necessidade de caixa/vedação. Custo real fica em **R$30–60** (só a placa; cabo USB provavelmente já disponível em casa) |

**Alimentação: só USB, sem bateria.** Bateria é tecnicamente possível (18650 + deep sleep), mas
troca "recarga de bateria do ESP32" por "recarga de bateria do CR2032 do sensor" — duas
manutenções em vez de zero. Com tomada disponível, ligar direto é estritamente melhor aqui.

**Escuta passiva, não conexão ativa.** O Mi Flora também transmite os 4 valores + bateria via
anúncio BLE não criptografado (mesmo princípio da §5 de
[`objetivo-1-captura-celular.md`](objetivo-1-captura-celular.md)), sem precisar abrir conexão
GATT dedicada. Isso elimina o limite prático de "quantos sensores por vez" — dezenas caberiam
num único ESP32 sem esforço adicional, e simplifica o firmware (componente pronto do ESPHome,
sem reproduzir o passo manual de escrever `A01F`).

---

## Log de produtos avaliados

| Data | Produto | Veredito |
|---|---|---|
| 2026-08-02 | Medidor Prime Digital Ph Solo TeOliver | ❌ Não comprar |
| 2026-08-02 | Zigbee Soil Sensor (AliExpress, TYPE1 2mqtt) | 🟡 Guardar para Fase 3 |
| 2026-08-02 | Sensor Inteligente De Umidade Do Solo (ML, genérico) | 🟡 Verificar protocolo antes de decidir |
| 2026-08-02 | Hhcc Flower Care, Gramado, Monitor Inteligente (ML, R$135,30) | ✅ Melhor candidato até agora para a Fase 1 |
| 2026-09-20 | ESP32 devkit genérico como ponte BLE→WiFi (infraestrutura p/ `hhcc-01`) | ✅ Comprar — tomada coberta confirmada no alcance BLE. Config ESPHome pronta em `esphome/` |
