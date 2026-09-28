# Regimes — como o projeto agrupa plantas

> **Tema macro:** o modelo conceitual que substitui "uma regra para todas as plantas".
> Roteado a partir do [PROJETO.md](../PROJETO.md).
>
> Aqui **não** entra planta nenhuma pelo nome. Quem pertence a qual regime está em
> [`plants/`](../plants/README.md), campo `Regime` de cada ficha.

---

## Por que regimes, e não espécies

Se o sistema tiver **um alvo único** de umidade, luz ou EC, ele erra em todo lugar ao mesmo
tempo. Se tiver **um alvo por espécie**, o modelo incha a cada planta nova e nunca fecha.

Regime é o meio-termo: um agrupamento por **onde a planta está + o que limita o crescimento
ali**. Duas espécies diferentes no mesmo regime compartilham a lógica de alerta; a mesma
espécie em regimes diferentes, não.

**Regra:** `regime` é campo obrigatório em toda ficha de planta. Toda derivação, limiar e
alerta é resolvido **por regime**, nunca globalmente.

---

## Regimes definidos

| Regime | Local | Gargalo dominante | Faixa de vaso |
|---|---|---|---|
| `varanda-fruteira` | varanda, sol direto forte, chuva direta | **água e calor** | litros a dezenas de litros |
| `interno-bonsai` | interno, luz baixa e estável | **luz** | 0,5–3 L |

Regimes novos entram quando aparecer uma combinação local × gargalo que não caiba nas
existentes — não a cada planta nova.

---

## As diferenças que o modelo precisa respeitar

| | `varanda-fruteira` | `interno-bonsai` |
|---|---|---|
| DLI disponível ⚠️ | 30–45 mol/m²/dia | 1–3 mol/m²/dia |
| Variação térmica diária | 10–20 °C | 3–6 °C |
| VPD | picos altos em dia de sol + vento | estável, geralmente baixo |
| Ritmo de secagem | horas a poucos dias | horas |
| **EC ao longo do tempo** | **cai** com chuva (lixiviação) | **sobe** (sal acumula) |
| Sonda curta (~5 cm) | lê a camada seca de superfície | não cabe no vaso |
| Ação corretiva típica | ajustar rega, sombrear, aumentar vaso | **realocar a planta** |

---

## As três consequências práticas

### 1. O sinal de EC tem significado oposto nos dois regimes

EC subindo no interno = **acúmulo de sal**, sinal de regar até drenar.
EC caindo na varanda depois de chuva = **lixiviação normal**, não falta de nutriente.

Sem cruzar com `precipitation` do Open-Meteo, o sistema reportaria "queda de nutriente" falsa
a cada temporal. Detalhes em [`medicoes.md`](medicoes.md).

### 2. Luz é gargalo em um regime e sobra no outro

Em `varanda-fruteira` a luz é **confirmação**, não descoberta — o problema é água.
Em `interno-bonsai` a luz volta a ser a **métrica nº 1**, e a ação corretiva não é regar
diferente: é **mudar a planta de lugar**.

O projeto precisa das duas lógicas convivendo, selecionadas por `regime`. Foi por causa disso
que a prioridade de medição foi invertida uma vez e depois parcialmente revertida — está
registrado no log de decisões do `PROJETO.md`.

### 3. Regimes não implicam calendário compartilhado

Estar no mesmo regime **não** significa mesma rega. Duas frutíferas na mesma varanda podem
ter exigências hídricas opostas — uma que não tolera secar, outra que se beneficia de seca
curta. Regime define a **lógica de interpretação**; a exigência individual fica na ficha da
planta.

---

## A varanda como régua

Uso estrutural, independente de qual planta esteja lá:

Comparando a luz medida na varanda com o `shortwave_radiation` do Open-Meteo para a
coordenada de casa, calibra-se um **coeficiente de transmissão** do local. Com esse
coeficiente, dá para estimar quanto cada posição interna recebe **sem um sensor em cada
canto** — é o que permite escalar cobertura barato.

A varanda também é o **teste de estresse do hardware**: chuva, sol direto no plástico, calor.
O que sobreviver lá sobrevive em qualquer lugar. Por isso ela não recebe o *primeiro* sensor:
o primeiro deve ser o mais fácil possível de depurar.
