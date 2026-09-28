# 🎯 Objetivo 1 — as 4 medidas cruas pelo celular

> **Objetivo ativo do projeto.** Especificação executável.
> Roteado a partir do [PROJETO.md](../PROJETO.md).
>
> **Meta:** obter **luz, umidade do substrato, condutividade ("corrente") e temperatura**, em
> valor cru, lidos **pelo celular**, sem depender do app do fabricante.
>
> **Status:** 🟡 **em andamento — 1ª leitura feita.** Em **2026-09-20**, sessão ao vivo com o
> dono e o celular ao lado da `aceroleira-01`: nRF Connect conectado sem PIN/pareamento
> (variante `HHCCJCY01` aberta confirmada), 16 bytes crus capturados e decodificados à mão,
> bateria lida (95%, firmware 93.3.6), 1ª checagem de sanidade cruzada de luz feita. **Faltam
> 4 leituras em horários diferentes** para fechar o critério de conclusão (§7) — o resto do
> procedimento (§3–§4) está validado e funcionando. Detalhe da execução em
> [`equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md) (2026-09-20).

---

## 1. O travamento existe — mas não neste aparelho

A dúvida original: *"esses aparelhos da Xiaomi vêm com um emparelhamento muito específico,
geralmente um app travado — é fácil obter os dados de outra forma?"*

A Xiaomi tem **dois mundos**, e confundi-los é o que assusta:

| | Exemplos | Situação |
|---|---|---|
| **MiBeacon criptografado** | LYWSD03MMC, sensores de porta/presença Mijia | 🔒 Exigem `bind_key` extraída da conta Xiaomi na nuvem. **Aqui há travamento real.** |
| **Aberto** | **HHCC Flower Care / Mi Flora (`HHCCJCY01`)** | 🔓 **Sem pareamento, sem PIN, sem `bind_key`, sem autenticação.** Qualquer explorador GATT lê. |

O Mi Flora virou o dispositivo de referência da comunidade justamente por isso: tem
implementação pronta em ESPHome, Home Assistant, Theengs e várias bibliotecas Python.
**O app da Xiaomi é opcional — não é preciso criar conta.**

### 🚨 A pegadinha que importa na hora de comprar

Existe a variante **`HHCCJCY10`**, que fala com a **nuvem Tuya** em vez do BLE aberto.
Aparência quase idêntica, protocolo fechado.

| Sinal no anúncio | Leitura |
|---|---|
| App **"Mi Home" / "Flower Care" / "VegTrug Grow Care"** | ✅ É o `HHCCJCY01` aberto |
| App **"Smart Life" / "Tuya"** | ❌ É o `HHCCJCY10`, nuvem fechada — **evitar** |
| Pede pareamento com PIN | ❌ Não é HHCC genuíno |

Comprar a variante errada não quebra o aparelho — **quebra o requisito de dado cru**, que é a
razão de existir do projeto.

⚠️ **`VegTrug Flower Monitor` / `Grow Care Home` são rebrand do mesmo chip HHCC** —
reconhecidos como `HHCCJCY01` por Home Assistant e Theengs, e frequentemente mais baratos por
não levarem a marca Xiaomi. Mesma checagem de app se aplica. Links candidatos em
[`produtos-avaliados.md`](produtos-avaliados.md).

---

## 2. Dispositivos que entregam as 4 medidas via BLE

| Dispositivo | Luz | Água | EC | Temp | Dado cru | Nota |
|---|---|---|---|---|---|---|
| **HHCC Flower Care / Mi Flora / VegTrug** | ✅ | ✅ | ✅ | ✅ | ✅ documentado | **A escolha.** Sonda ~5 cm |
| `HHCCJCY10` (variante Tuya) | ✅ | ✅ | ✅ | ✅ | ❌ nuvem fechada | Evitar |
| Clones genéricos "4 em 1 BLE" | ✅ | ✅ | ✅ | ✅ | ⚠️ protocolo próprio | Reprova no checklist |
| Parrot Flower Power | ✅ | ✅ | ✅ | ✅ | ✅ documentado | Descontinuado, só usado |
| Ecowitt WH51 | ❌ | ✅ | ❌ | ❌ | ✅ | Sub-GHz, não BLE |
| SwitchBot Meter | ❌ | ❌ | ❌ | ✅ ar | ✅ | Só ar |

⚠️ **Não existe dispositivo BLE pronto e barato com sonda longa.** Sondas de 15–20 cm+ são
componentes e exigem ESP32 (ver [`captura-dados.md`](captura-dados.md)). Dentro da restrição
"pronto + celular", ~5 cm é o que há. **Limitação conhecida e aceita, não bloqueio.**

---

## 3. Procedimento no celular — nRF Connect

**nRF Connect for Mobile** (Nordic Semiconductor) — grátis, Android e iOS. É um explorador
GATT genérico: mostra o byte cru, sem interpretação de fabricante. É o caminho mais cru
possível sem escrever uma linha de código.

1. Instalar e abrir. Aba **Scanner**.
2. Localizar o dispositivo — anuncia como **`Flower care`** ou **`Flower mate`**.
3. **Connect.** ⚠️ Não pede PIN nem pareamento. Se pedir, não é HHCC genuíno.
4. Abrir o serviço `00001204-0000-1000-8000-00805f9b34fb`.
5. Na característica `00001a00-0000-1000-8000-00805f9b34fb`, **escrever `A01F`** (hex,
   2 bytes). Liga o **modo tempo real**.
   🚨 **Sem esse passo a leitura vem zerada.** É o erro nº 1.
6. Na característica `00001a01-0000-1000-8000-00805f9b34fb`, **ler** → 16 bytes em hex.
7. Bateria e firmware: ler `00001a02-...` → **byte 0 = bateria em %**.

### Apps alternativos

| App | O que faz | Dado cru? |
|---|---|---|
| **nRF Connect** (Nordic) | Explorador GATT genérico | ✅ **hex puro — o mais cru possível** |
| **Theengs App** | Decodifica sensores BLE conhecidos | ✅ valor já decodificado |
| BLE Scanner / LightBlue | Explorador GATT | ✅ hex |
| Flower Care (Xiaomi) | App oficial | ⚠️ mostra valor, sem exportar. Opcional |

---

## 4. Decodificação dos 16 bytes

Tudo **little-endian** (byte menos significativo primeiro).

| Bytes | Campo | Conversão | Unidade |
|---|---|---|---|
| 0–1 | temperatura | `int16_le / 10` | °C |
| 2 | — | ignorar | |
| 3–6 | **luz** | `uint32_le` | lux |
| 7 | **umidade** | `uint8` | % |
| 8–9 | **condutividade** | `uint16_le` | µS/cm |
| 10–15 | — | ignorar | |

### Exemplo trabalhado

Leitura hex `20 01 00 6B 03 00 00 21 4A 00 02 3C 00 FB 34 9B`:

| Campo | Bytes | Little-endian | Cálculo | Resultado |
|---|---|---|---|---|
| Temperatura | `20 01` | `0x0120` = 288 | ÷ 10 | **28,8 °C** |
| Luz | `6B 03 00 00` | `0x0000036B` = 875 | — | **875 lux** |
| Umidade | `21` | `0x21` = 33 | — | **33 %** |
| Condutividade | `4A 00` | `0x004A` = 74 | — | **74 µS/cm** |

⚠️ **Little-endian é a pegadinha.** `20 01` **não** é 0x2001 (8193) — é 0x0120 (288).
Inverter a ordem dos bytes antes de converter.

---

## 5. Alternativa passiva — sem conectar

O Mi Flora também transmite em **advertising MiBeacon**, service data UUID `0xFE95`,
**sem criptografia**. Apps como **Theengs App** decodificam direto do anúncio.

- ➕ Não precisa conectar; vários sensores em paralelo; menos consumo de pilha.
- ➖ Você recebe quando o sensor resolve anunciar, não quando quer.

---

## 6. O que este objetivo NÃO entrega

Expectativa alinhada de propósito, para não frustrar depois.

| Entrega | Não entrega |
|---|---|
| Leituras cruas pontuais das 4 medidas | **DLI** — exige série temporal |
| Prova de que o dado sai sem fabricante | **Curva de secagem** completa |
| Validação do protocolo | Log de madrugada / automático |
| Base para decidir se a Fase 2 vale | VPD do ar (exige 2º sensor) |

O celular não loga em segundo plano: Android e iOS matam processo, e não há stack Python BLE
utilizável no telefone. **É a fronteira natural entre o Objetivo 1 e a Fase 2** — detalhes em
[`captura-dados.md`](captura-dados.md).

---

## 7. Critério de conclusão

- [x] Dispositivo em mãos, checado contra a tabela de variantes da seção 1. ✅ 2026-09-20 —
      conectou sem PIN/pareamento, confirma `HHCCJCY01` aberto.
- [x] Ficha criada em [`equipamentos/`](../equipamentos/README.md) e vinculada à planta em
      [`plants/`](../plants/README.md) — vínculo bidirecional.
- [x] Conexão pelo nRF Connect **sem app do fabricante e sem conta**. ✅ 2026-09-20.
- [x] 16 bytes crus capturados e transcritos. ✅ 2026-09-20 — `DE 00 03 5F 10 00 00 1A 2A 01 02
      3C 00 FB 34 9B`.
- [x] Os 4 valores decodificados **à mão**, conferindo com o exemplo da seção 4. ✅ 22,2 °C /
      4191 lux / 26% / 298 µS/cm.
- [ ] Sanidade cruzada: luz do sensor × luxímetro do celular no mesmo ponto ✅ **feito**
      (4191 vs 8317 lux, mesma ordem de grandeza); umidade alta logo após rega e baixa dias
      depois — 🟡 **pendente**, precisa de leitura após rega e outra em dia seco.
- [ ] Pelo menos 5 leituras em horários diferentes, registradas na ficha da planta. 🟡 **1 de
      5** — ver `plants/aceroleira-01.md` (2026-09-20).
- [x] Leitura de bateria obtida (`00001a02`, byte 0). ✅ 95%, firmware 93.3.6.

**Saída:** prova de que a captura crua é viável sem fabricante — e a informação necessária
para decidir se a Fase 2 (automação no PC) vale o esforço.

---

## 8. Prompt para retomar agora (sensor já instalado, perto do dono)

> ⚠️ Versão **2026-09-17**. Substitui o prompt antigo desta seção (era de quando o sensor
> ainda não tinha chegado — obsoleto, mantido só no histórico do git). Estado atual: sensor em
> mãos, instalado, dono com o celular ao lado da planta. Falta só executar o procedimento.

**Cole o bloco abaixo numa conversa nova** — não precisa reexplicar o projeto, o roteamento a
partir do `PROJETO.md` cuida disso:

> Vamos finalmente executar a captura crua do Objetivo 1. Contexto rápido: o sensor `hhcc-01`
> (HHCC Flower Care) está instalado na `aceroleira-01` (local A) desde
> 2026-09-17, e eu estou com o celular do lado da planta agora. Me guie passo a passo pelo
> procedimento do nRF Connect em `docs/objetivo-1-captura-celular.md` §3 — instalar o app
> (se eu ainda não tiver), conectar sem PIN/pareamento, ativar o modo tempo real, ler os 16
> bytes crus e decodificar comigo pela §4. Quero bater o critério de conclusão da §7 nesta
> conversa (ou o quanto der). Ao final, atualize `equipamentos/hhcc-01.md`,
> `plants/aceroleira-01.md` e `equipamentos/inventario.md`.

### O que essa sessão futura vai precisar fazer, em ordem

1. **Variante do sensor — já fortemente indicada, só confirmar via nRF Connect.** Enquanto
   estava na jabuticabeira, o app usado foi **"Flower Care"** (não "Smart Life"/Tuya) — pela
   tabela da §1, isso já aponta para o `HHCCJCY01` aberto. Confirmar na prática: ao conectar
   pelo nRF Connect, **não deve pedir PIN nem pareamento** (§3, passo 3). Se pedir, parar e
   reavaliar — não é o esperado.
2. **Instalar/abrir o nRF Connect for Mobile** (Nordic) no celular que está com o dono agora.
3. **Executar §3 passo a passo**, com atenção ao erro nº 1 documentado (escrever `A01F` na
   característica `00001a00...` **antes** de ler — sem isso a leitura vem zerada).
4. **Decodificar os 16 bytes à mão pela §4** (little-endian — é a pegadinha), conferindo com
   o exemplo trabalhado.
5. **Repetir em pelo menos 5 momentos diferentes** (não precisa ser tudo na mesma conversa) e
   **ler a bateria** (`00001a02`, byte 0) — completa o critério de conclusão da §7.
6. **Sanidade cruzada:** comparar a luz do sensor com o luxímetro do próprio celular no mesmo
   ponto; e a umidade, com o que se sabe da rega recente da acerola (ver
   `plants/aceroleira-01.md`).
7. **Atualizar ao final:**
   - `equipamentos/hhcc-01.md` — estado → 🟢 em uso pleno (hoje é "parcial"), §3 (checklist com
     produto em mãos), §7 (histórico da captura).
   - `plants/aceroleira-01.md` — entrada datada com as leituras cruas + o que elas dizem sobre
     a planta (cruzar com o estado de recuperação já registrado).
   - `equipamentos/inventario.md` — atualizar a nota do `hhcc-01` de "parcial" para "em uso".
8. **Ao concluir o Objetivo 1**, decidir com o dono se a Fase 2 (automação no PC via `bleak`)
   vale o esforço — critério em `docs/captura-dados.md` e §5 do `PROJETO.md`.
