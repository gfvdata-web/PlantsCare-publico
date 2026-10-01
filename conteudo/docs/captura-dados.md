# Captura de dados — caminhos, transportes e infraestrutura

> **Tema macro:** como o número sai do sensor e chega até um arquivo seu. Estratégia de
> aquisição, não produto específico. Roteado a partir do [PROJETO.md](../PROJETO.md).
>
> Aqui **não** entra: avaliação de produto para compra
> (→ [`produtos-avaliados.md`](produtos-avaliados.md)), equipamento já possuído
> (→ [`equipamentos/`](../equipamentos/README.md)), nem o procedimento do objetivo ativo
> (→ [`objetivo-1-captura-celular.md`](objetivo-1-captura-celular.md)).

---

## 1. Os quatro caminhos

Não são excludentes. A ideia é começar por um e agregar conforme a dor aparecer.

### Caminho A — Sensor comercial BLE ← **em uso no Objetivo 1**

Dispositivo pronto, com rádio, pilha e corpo selado. Enterra no vaso e lê.

- ➕ Zero solda, zero montagem, à prova de respingo.
- ➕ Dá para começar **só com um celular** — nenhum outro hardware.
- ➖ Sonda curta (~5 cm), pilha trocável, alcance BLE 5–15 m com parede.
- Referência do projeto: família HHCC. Detalhes de protocolo em
  [`objetivo-1-captura-celular.md`](objetivo-1-captura-celular.md).

### Caminho B — DIY com ESP32 + ESPHome

Um nó por vaso ou por ambiente.

| Componente | Função | Custo ⚠️ |
|---|---|---|
| ESP32 devkit / ESP32-C3 | WiFi + deep sleep | R$30–60 |
| **BH1750** (I²C) | lux 1–65.535 | R$15–30 |
| **TSL2591** (I²C) | lux com faixa dinâmica maior (sombra) | R$40–70 |
| **AS7341** (I²C) | 11 canais espectrais → PPFD real, sem chutar fator | R$150–280 |
| **SHT40 / AHT20 / BME280** | temp + RH do ar → VPD | R$20–60 |
| Sonda capacitiva, inclusive **longa** | umidade do solo | R$10–40 |
| **ADS1115** | ADC externo (o do ESP32 é não-linear) | R$20–35 |
| DS18B20 | temperatura do substrato | R$10–25 |

- ➕ Controle total, dado 100% cru, **sonda longa possível**, sem pilha se for USB.
- ➕ ESPHome elimina quase toda programação: YAML declarativo, OTA, MQTT nativo. O firmware
  se grava via USB sem soldar — mas com **ESPHome instalado no PC**: o `web.esphome.io` só
  grava firmware genérico, não compila YAML próprio (descoberto 2026-10-01).
- ➖ Exige **vedação** para chuva direta e calibração manual das sondas analógicas.
- Empurrado para a Fase 3 pela premissa "pronto agora, DIY depois". O gatilho que o
  justifica é **sonda longa** ou **VPD do ar**, não entusiasmo.

### Caminho C — Sub-GHz / Ecowitt (distância)

Para o que estiver fora do alcance de BLE/WiFi.

- **Ecowitt WH51** — umidade de solo, 433/868/915 MHz, alcance de dezenas a centenas de
  metros, pilha AA de ~1 ano.
- Gateway **GW1100/GW2000** expõe **API HTTP local** e *customized upload* — dá para apontar
  para um servidor próprio, sem nuvem.
- Alternativa: **RTL-SDR** (~R$120 ⚠️) + `rtl_433` decodifica dezenas de sensores 433 MHz de
  qualquer marca, sem gateway. Boa relação exploração/custo.

### Caminho D — Improvisado / custo zero

1. **ALS do celular** (luxímetro / Photone) — mapear a casa uma vez, por ponto e horário.
2. **Foto no mesmo enquadramento e horário** → `plants/`, comparação de cor e crescimento.
3. **Open-Meteo** (grátis, sem chave): `shortwave_radiation`, `precipitation`, temperatura e
   umidade, por hora, para a coordenada de casa.
4. **Teste do palito** — profundidade de umidade sem eletrônica nenhuma.

---

## 2. Do sensor até o dado cru

| Transporte | Como capturar | Ferramenta | Gateway? |
|---|---|---|---|
| **BLE — manual, celular** | GATT via app explorador | nRF Connect | Não |
| **BLE — automático, PC** | GATT ou advertising | Python **`bleak`** (roda no Windows) | Não |
| **BLE → MQTT** | ESP32 escuta e republica | ESPHome `xiaomi_hhccjcy01`, Theengs Gateway | ESP32/RPi |
| **BLE → HTTP → planilha** ✅ *em uso* | ESP32 escuta e faz POST periódico | ESPHome `xiaomi_hhccjcy01` + `http_request` → Apps Script | ESP32 (sem cérebro 24/7) |
| **WiFi (DIY)** | dispositivo publica sozinho | ESPHome + MQTT | Broker |
| **Zigbee** | coordenador USB | Sonoff ZBDongle-E + Zigbee2MQTT | Dongle |
| **Sub-GHz** | gateway HTTP local ou SDR | Ecowitt GW1100, `rtl_433` | Sim |
| **Nuvem do fabricante** | API/scraping | — | ❌ **Evitar** |

**Ponto-chave:** qualquer que seja o transporte, tudo converge para o **formato canônico
único** definido em [`arquitetura.md`](arquitetura.md). Trocar de sensor não pode quebrar a
análise.

---

## 3. BLE e WiFi são rádios independentes

Dúvida respondida em 2026-08-02, registrada porque é fonte recorrente de confusão.

> *"O Raspberry, nessa configuração de WiFi para conectar aos BLEs, é no WiFi de casa? Ou um
> próprio em que eles se comunicam?"*

**Nenhum dos dois — são duas redes separadas que não se misturam.**

```
[sensor BLE] ──── Bluetooth LE ────► [celular / PC / Pi] ──── WiFi de casa ────► [internet]
  sem WiFi          rádio direto,                             só p/ SSH, Open-Meteo
  sem IP            sem roteador                              e dashboard
```

- O sensor **não tem WiFi, não tem IP, não entra na sua rede**. Sem senha, sem pareamento de
  rede. **Desligue o roteador e a captura BLE continua funcionando.**
- Só ao **adicionar um ESP32 ponte** o WiFi passa a transportar dado de sensor — e mesmo aí,
  apenas na perna `ESP32 → cérebro`. A perna `sensor → ESP32` continua sendo Bluetooth.
- ⚠️ No **Pi Zero 2 W e Pi 3**, WiFi e Bluetooth compartilham chip e antena. Tráfego 2.4 GHz
  pesado degrada BLE (problema conhecido de coexistência). Contorno: rede em 5 GHz, cabo, ou
  ESP32 dedicado. Não é motivo para descartar o Pi Zero — é motivo para não se assustar se a
  leitura falhar durante um download grande.

---

## 4. O cérebro 24/7 — decisão adiada de propósito

**Não comprar nada ainda.** Mapa completo, com o esforço real de montagem declarado — o dono
tem zero experiência com hardware, então custo sozinho não decide.

| Opção | Custo ⚠️ | Consumo | BLE nativo | Montagem real | Veredito |
|---|---|---|---|---|---|
| **Celular** | R$0 | — | ✅ | nenhuma | **Objetivo 1.** Explora bem, não loga (§5) |
| **PC atual** | R$0 | — | ✅ verificado | nenhuma | ~~**Fase 2.**~~ Buraco no histórico quando desliga — e não alcança o sensor (2026-09-20). Substituído pelo `esp32-01` → planilha (2026-10-01) |
| **Raspberry Pi Zero 2 W** | R$250–400 | ~1–2 W (≈R$1/mês) | ✅ | gravar SD pelo *Raspberry Pi Imager* (já configura WiFi e SSH antes de ligar), encaixar, plugar. **Zero solda, zero terminal** | ✅ Melhor custo/benefício se a Fase 2 doer |
| **Raspberry Pi 4 / 5** | R$500–1.200 | ~3–7 W | ✅ | idêntica ao Zero | Overkill agora |
| **Mini-PC / thin client usado** | R$300–700 | ~8–15 W | ❌ → dongle USB (~R$30) | ligar, instalar Linux | Mais CPU por real, mais consumo e mais passos |
| **Celular Android antigo** | R$0 se tiver | ~2 W | ✅ | Termux | ⚠️ Frágil — Android mata background, BLE limitado |
| **VPS / nuvem** | R$20–50/mês | — | ❌ | — | **Não serve** — BLE é rádio local |

### O gargalo não é o cérebro, é o alcance do rádio

BLE atravessa mal parede e laje (~5–15 m na prática). Trocar Pi Zero por Pi 5 **não resolve**
— é física, não CPU. A solução barata desacopla escuta de processamento:

```
[sensor varanda] ──BLE──► [ESP32 na tomada] ──WiFi/MQTT──► [cérebro] ──► banco
```

ESP32 custa ~R$40 e só precisa de uma tomada USB perto das plantas.
⚠️ O modo `bluetooth_proxy` do ESPHome depende do **Home Assistant**; para stack Python pura
o caminho é o componente `xiaomi_hhccjcy01`, que decodifica no próprio ESP32.

**Implementado em 2026-10-01 sem cérebro 24/7** ([`decisoes.md`](decisoes.md)): o dono não tem
PC sempre ligado, então o ESP32 faz o papel de "cérebro mínimo" e manda direto para a nuvem
**própria** (planilha Google):

```
[hhcc-01] ──BLE──► [esp32-01 na tomada] ──WiFi/HTTPS, 15 min──► [Apps Script] ──► planilha InfoSensorESP32
```

Config: `esphome/plantscare-bridge-01.yaml` ·
receptor: `google-apps-script/sensor-esp32/`.
Limite aceito: sem internet, a leitura daquele intervalo se perde (a placa não guarda).

### Regra de decisão — para não comprar por ansiedade

| Dor que aparecer | Compra que ela justifica |
|---|---|
| "Ler no celular toda hora é inviável" | Nada — é a Fase 2, no PC que já existe |
| "Perdi dados porque o PC estava desligado" | Raspberry Pi Zero 2 W |
| "O sensor da varanda não conecta" | 1 ESP32 como ponte BLE→MQTT |
| "Quero acompanhar fora de casa" | Dashboard — software, não hardware |
| "Quero sonda longa / VPD do ar" | Aí sim entra o DIY (Caminho B) |

---

## 5. Limites do celular como cérebro

| Serve muito bem para | Não serve para |
|---|---|
| Explorar e entender o protocolo | **Log contínuo** |
| Validar que o dado cru é acessível | Calcular **DLI** (exige série temporal) |
| Capturar amostras pontuais | Rodar de madrugada |
| Mapear luz com o ALS | Curva de secagem completa |

Por quê: Android e iOS matam processo em segundo plano, e **não há stack Python BLE
utilizável no celular** — `bleak` precisa de BlueZ/WinRT/CoreBluetooth, e o Termux não dá
acesso ao BlueZ sem root.

**Isso não é defeito do plano: é a fronteira natural entre o Objetivo 1 e a Fase 2.**

---

## 6. Componente × dispositivo — o que o preço esconde

Distinção que muda decisão de compra e explica por que "sensor a R$30" não é o que parece.

| Faixa ⚠️ | O que é | Precisa de mais o quê |
|---|---|---|
| R$10–40 | **Sonda capacitiva nua** (inclusive versões longas), BH1750, AHT20 | Microcontrolador, fonte, ADC, **vedação**, calibração. Sozinha **não é um dispositivo** — é um componente com saída analógica |
| R$30–60 | ESP32 devkit | Firmware, fonte, caixa |
| R$80–180 | Sensor BLE pronto (família HHCC) | Nada. Já tem rádio, pilha, corpo selado e firmware |

Um nó DIY completo sai perto de **R$150–200** ⚠️ e mede *mais* que o sensor pronto —
inclusive com sonda longa. **O custo real não é dinheiro: é vedar bem o suficiente para
sobreviver a chuva direta e calibrar a sonda.** Por isso o Caminho A vem primeiro: valida a
captura sem misturar dois riscos novos ao mesmo tempo.

---

## 7. Ambiente disponível (verificado em 2026-08-02)

| Item | Estado |
|---|---|
| SO | Windows 10 Pro 19045 |
| Bluetooth | ✅ Intel(R) Wireless Bluetooth + *Enumerador LE Bluetooth da Microsoft* → **BLE OK** |
| Python | ✅ 3.13 · Git ✅ 2.55 |
| Repositório | ⚠️ ainda não é repo git (`git init` pendente) |

`bleak` roda nativo no Windows via API WinRT. **A Fase 2 não exige Raspberry Pi, Linux nem
dongle.**
