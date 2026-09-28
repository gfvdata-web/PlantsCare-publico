# Medições — o que medir e por quê

> **Tema macro:** fundamentos de medição. Conceitos que valem para qualquer planta e
> qualquer sensor. Roteado a partir do [PROJETO.md](../PROJETO.md).
>
> Aqui **não** entra: exigência de espécie (→ [`plants/`](../plants/README.md)), modelo de
> sensor (→ [`captura-dados.md`](captura-dados.md)), nem produto específico
> (→ [`produtos-avaliados.md`](produtos-avaliados.md)).

---

## Prioridade

Ordem = impacto real, não facilidade de medir.

| # | Parâmetro | Unidade útil | Por que importa | Via celular hoje? |
|---|-----------|--------------|-----------------|---|
| 1 | **Água no substrato** | % (relativo) | O ciclo de secagem dita a rega. Excesso mata mais que falta. | ✅ |
| 2 | **Luz (integrada)** | DLI — mol/m²/dia | Fator limitante no interno; sob sol pleno vira confirmação. | ⚠️ só PPFD pontual |
| 3 | **EC do substrato** | µS/cm | A "fertilidade" / "corrente". Proxy de sais dissolvidos. | ✅ |
| 4 | **Temp. do substrato** | °C | Afeta absorção e a própria leitura de EC. | ✅ |
| 5 | **Temp. + umidade do ar** | °C, %RH → **VPD (kPa)** | VPD dita transpiração. RH sozinha engana. | ⚠️ exige 2º sensor |
| 6 | **Chuva e radiação externa** | mm, W/m² | Contexto obrigatório na varanda aberta. | ✅ API Open-Meteo |
| 7 | **pH do substrato** | pH | Determina disponibilidade de nutriente. | ❌ sem sensor confiável |
| 8 | **Imagem da planta** | foto | Cor, turgor, folha nova, praga — nenhum sensor pega. | ✅ → `plants/` |
| — | ~~Peso do vaso~~ | ~~g~~ | **Não aprovado** — ver seção própria | — |

Os 4 primeiros saem de um único dispositivo — é o escopo do
[Objetivo 1](objetivo-1-captura-celular.md).

---

## 1. Luz — a armadilha do "lux"

Todo sensor barato (e todo celular) reporta **lux**, que é ponderado pela sensibilidade do
olho humano — máxima no verde. Plantas usam **PAR** (400–700 nm), onde vermelho e azul valem
tanto quanto verde.

- **Lux não é PAR.** A conversão depende do espectro da fonte.
- Fatores aproximados lux → PPFD (µmol·m⁻²·s⁻¹): luz solar `÷ 54`; LED branco `÷ 70–80` ⚠️;
  incandescente `÷ 50`.
- Como neste projeto a luz é **100% natural**, o fator `÷54` é razoavelmente sólido — o que
  torna um sensor de lux barato um medidor de PAR aceitável aqui.

A métrica que decide é **DLI**, não o pico do meio-dia:

```
PPFD [µmol/m²/s] ≈ lux / 54          (luz natural)
DLI  [mol/m²/dia] = Σ(PPFD × Δt_segundos) / 1.000.000
```

⚠️ **DLI só existe com série temporal.** Uma leitura pontual pelo celular dá PPFD
instantâneo, não DLI. É o log contínuo (Fase 2) que destrava essa métrica.

Referência grosseira ⚠️ — alvo por espécie fica em `plants/`, não aqui:

| Categoria | DLI (mol/m²/dia) |
|---|---|
| Sombra profunda | 1–3 |
| Sombra parcial | 4–8 |
| Meia-luz exigente | 10–20 |
| Sol pleno | 20–40+ |

**Armadilha registrada:** sensor de luz enterrado no vaso lê a luz **na superfície do solo**,
não na altura da folha. Medir o offset uma vez com o celular na altura da folha e registrar.

---

## 2. Água — medir o ciclo, não o ponto

Sensor barato dá número relativo, não VWC calibrado. **É suficiente**, desde que se olhe a
**curva de secagem**:

- Quanto tempo do molhado até o limiar de rega?
- A curva mudou? (raiz cresceu, estação mudou, vaso ficou apertado)
- A rega infiltrou ou escorreu pela borda? Subida instantânea + queda rápida = escorreu.

| Tipo de sonda | Como funciona | Veredito |
|---|---|---|
| **Resistivo** (dois pinos) | resistência elétrica | ❌ Corrói em semanas, deriva com sal. Evitar |
| **Capacitivo v1.2** | capacitância via oscilador | ✅ Padrão de entrada. Precisa calibrar e **selar a eletrônica** |
| **TDR / frequency-domain** | pulso de frequência | ✅✅ Preciso e estável, caro e difícil no BR |

⚠️ **Profundidade importa mais que precisão.** Uma sonda medíocre a 20 cm informa mais sobre
a zona radicular de um vaso fundo do que uma sonda excelente a 5 cm. Sondas longas existem,
mas são **componentes**, não dispositivos prontos — ver
[`captura-dados.md`](captura-dados.md).

**Contraponto de custo zero:** o teste do palito. Espeto de madeira longo enfiado fundo no
vaso, retirado uma vez por dia, mostra até que profundidade o substrato está úmido. É a
verificação mais barata contra a limitação de sonda curta.

---

## 3. Peso do vaso — 🚫 NÃO APROVADO (2026-08-02)

Documentado só para preservar o raciocínio, caso a decisão seja revista.

Célula de carga + HX711, ou balança sob o vaso, mede diretamente a massa de água: imune a
contato ruim solo-sensor, imune a corrosão e sal, diretamente interpretável (perdeu 200 g =
perdeu 200 mL), praticamente livre de deriva. Tecnicamente é o proxy mais honesto de água
disponível e de evapotranspiração.

> **🚫 Decisão do dono: fora do escopo.** O projeto segue **só com sensores**, aceitando
> conscientemente que a leitura de água fica parcial. **Não incluir em planejamento, roadmap
> ou recomendação** até que a decisão seja revista.
>
> Consequência assumida: o déficit hídrico de vaso subdimensionado segue **sem confirmação
> numérica**. Sobra a *tendência* da umidade e a *velocidade de queda* entre regas — menos
> preciso, mas real.

---

## 4. "Fertilidade" — a parte onde o marketing mente

- O que os sensores chamam de **"fertilidade"** é **EC (condutividade elétrica) em µS/cm** —
  a "corrente". Proxy de "quanta coisa dissolvida tem aí". **Não diz o quê.**
- EC depende **fortemente de umidade e temperatura** do substrato. Comparar EC entre dois
  dias com umidades diferentes não mede nada. Só comparar EC **no mesmo nível de umidade**.
- Sensores **"NPK 7-em-1" RS485** (~R$300–600 ⚠️) medem EC e aplicam correlação proprietária
  para "estimar" NPK. **Não existe método eletroquímico barato que meça nitrogênio
  disponível in-situ.** Valores absolutos: não confiar. Como tendência relativa no mesmo
  vaso e mesmo substrato, talvez.
- **pH:** não existe sensor contínuo barato e confiável para solo. Medidores de agulha
  analógicos são essencialmente aleatórios — um já foi reprovado em
  [`produtos-avaliados.md`](produtos-avaliados.md). Opções reais: kit colorimétrico,
  pHmetro de bancada em extrato solo:água 1:2,5, ou análise laboratorial de solo.

**Conclusão estrutural:** nutrição é medição **pontual e rara**; sensoriamento contínuo é
sobre água, luz, temperatura e EC **como tendência**.

⚠️ **A interpretação de EC muda de sinal conforme o regime:**

| Regime | EC subindo significa | EC caindo significa |
|---|---|---|
| Coberto / interno | acúmulo de sal → regar até drenar | diluição ou absorção |
| Aberto à chuva | acúmulo entre chuvas | **lixiviação normal**, não falta de nutriente |

Sem cruzar com `precipitation` do Open-Meteo, o sistema reportaria "queda de nutriente" falsa
a cada temporal.

---

## 5. VPD — derivado grátis

Com temperatura e umidade **do ar** (não do solo):

```
es(T)  = 0,6108 × exp( 17,27 × T / (T + 237,3) )     [kPa]
VPD_ar = es(T) × (1 − RH/100)                         [kPa]
VPD_folha ≈ es(T_folha) − es(T_ar) × RH/100 ,  T_folha ≈ T_ar − 1..2 °C
```

Faixa confortável para a maioria: **0,8–1,2 kPa** ⚠️. Acima de ~1,6 a planta fecha estômatos
e para de crescer mesmo com água disponível; abaixo de ~0,4 favorece fungo.

⚠️ **Um sensor de solo não entrega VPD** — ele mede temperatura do *substrato*, não umidade
do ar. VPD exige um segundo sensor (SHT40/AHT20/BME280, ou higrômetro BLE de ar). Está fora
do Objetivo 1; é candidato natural do Objetivo 2.

---

## Princípio que atravessa tudo

**Conversão acontece na leitura, nunca na escrita.** O coletor grava o número cru na unidade
nativa do sensor. Toda conversão (lux→PPFD, EC→interpretação, calibração de sonda) é aplicada
na hora de ler o banco. Assim, quando a calibração melhorar, **o histórico inteiro se corrige
retroativamente**. Detalhe de implementação em [`arquitetura.md`](arquitetura.md).
