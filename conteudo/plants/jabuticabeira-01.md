# Jabuticabeira — `jabuticabeira-01` — ⚠️ REGISTRO SEM PLANTA CORRESPONDENTE

> 🚫 **DEPRECADA (2026-08-02).** O dono confirmou que esta planta **não existe** como entidade
> separada — a única jabuticaba real é a [`jabuticabeira-hibrida-01`](jabuticabeira-hibrida-01.md).
> Este arquivo é mantido **append-only** para preservar o erro no registro (regra do
> `plants/README.md`), mas **não usar nenhum dado abaixo** (altura 1,60 m, vaso 30×50 cm,
> local A) para decisão nenhuma daqui em diante. Ver histórico no fim do
> arquivo e §10 do `PROJETO.md`.

> **Espécie:** *Plinia cauliflora* (jabuticabeira) — ⚠️ dado não confirmado, ver aviso acima
> **Regime:** `varanda-fruteira` (§1.1 do [PROJETO.md](../PROJETO.md))
> **Local:** varanda — 6h+ de sol direto, aberta à chuva
> **Estado:** 🚫 deprecado — sem planta correspondente confirmada
> **Última atualização:** 2026-08-02

---

## 1. Identificação

| Campo | Valor |
|---|---|
| `plant_id` | `jabuticabeira-01` |
| Origem | **Enxertada**, comprada em viveiro |
| Data de aquisição | ⚠️ não informada |
| Altura atual | **1,60 m** (2026-08-02) |
| Vaso (⌀ × altura) | 30 cm × 50 cm |
| Volume do vaso | **~25 L** (cônico) a 35 L (cilíndrico) — calculado, não medido ⚠️ |
| Substrato | ⚠️ não informado |
| Exposição solar | 6h+ de sol direto |
| Exposição à chuva | **Sim**, direta |

## 2. Requisitos da espécie

⚠️ Valores de literatura horticultural, a calibrar com o histórico real. Não existe
literatura de DLI tão padronizada para frutíferas tropicais quanto para hortaliças de estufa.

| Parâmetro | Alvo | Observação |
|---|---|---|
| DLI | 20–35 mol/m²/dia (muda: 10–20) ⚠️ | Sol pleno quando adulta; muda jovem agradece meia-sombra no pico |
| **Água** | **Solo sempre úmido, nunca encharcado** | ⚠️ **Ponto crítico: não tolera secar.** Raiz superficial, sem pivotante em vaso |
| **pH** | **5,0–6,5 (ácido)** | 🚨 Em solo alcalino dá **clorose férrica** — folha nova amarela com nervura verde. É a falha nº 1 da espécie |
| EC / salinidade | Baixa | **Sensível.** EC alta queima raiz. Adubação leve e fracionada |
| Drenagem | Boa, com retenção | Matéria orgânica + mulch ajudam muito |
| Vaso p/ frutificar | **60–100 L** ⚠️ | Atual: ~25 L |
| Horizonte de fruto | **3–6 anos** (enxertada) ⚠️ | Pé-franco levaria 8–15 anos |

**Chuva direta é boa para esta planta:** mantém úmido e lixivia sal, ao qual ela é sensível.
Efeito colateral no modelo: a EC lida despenca depois de temporal — não é falta de nutriente.

## 3. Meta atual

**Sobreviver bem e crescer.** Fruto está a 3–6 anos de distância; nenhum alerta do sistema
deve ser calibrado para frutificação nesta planta por enquanto.

## 4. Equipamentos instalados

| Equipamento | Desde | O que mede | Ficha |
|---|---|---|---|
| — nenhum ainda — | | | |

Candidato: 1× HHCC Flower Care (Objetivo 1, §4.6 do PROJETO.md).

## 5. Pendências

- [ ] Medir o volume real do vaso (hoje é cálculo a partir de ⌀ e altura, não medição).
- [ ] Registrar o substrato usado.
- [ ] Medir o pH — nenhum sensor do projeto detecta clorose férrica.
- [ ] Decidir sobre transplante para 60–100 L (P15 do PROJETO.md).
- [ ] Verificar estabilidade contra vento.

---

## 6. Histórico

> **Append-only.** Entrada nova sempre embaixo. Para corrigir algo, criar entrada nova
> referenciando a anterior.

### 2026-08-02 — Cadastro inicial e primeiro achado

**Observado:** planta de 1,60 m, enxertada, em vaso de 30 cm ⌀ × 50 cm (~25 L), na varanda
com 6h+ de sol direto e chuva direta. Nenhum sintoma foliar relatado.

**Concluído:**

🔴 **O vaso é o gargalo, não o sensoriamento.** Uma copa de 1,60 m sob sol pleno transpira
muito mais do que ~25 L de substrato conseguem estocar. O volume recomendado para
frutificação é 60–100 L ⚠️. **Nenhum sensor conserta vaso pequeno** — transplantar tem
prioridade acima de qualquer eletrônica.

⚠️ **Risco físico:** 1,60 m de planta sobre base de 30 cm, em varanda aberta. A copa é bem
mais larga que o vaso; vento de temporal pode derrubar. Verificar estabilidade.

⚠️ **O formato do vaso piora o que o sensor consegue medir.** Vaso alto e estreito drena bem
(a zona saturada do fundo ocupa fração menor do volume), mas cria um gradiente vertical
forte: o topo seca por evaporação enquanto o fundo retém. A sonda de ~5 cm do Mi Flora lê
justamente a camada mais seca e menos representativa de todas. Limitação **assumida
conscientemente** — ver §1.1 do PROJETO.md.

**Ação:** nenhuma ainda. Sensor não comprado.

**Pendente:** transplante (P15), pH, substrato, estabilidade.

**Fotos:** _não publicadas._

---

### 2026-08-02 — 🚫 Deprecada: planta não existe

**Observado:** ao cadastrar `jabuticabeira-hibrida-01` com foto real, o dono esclareceu que
**não existe uma segunda jabuticabeira** — só a híbrida. Este registro (1,60 m, vaso
30×50 cm, local A) não corresponde a nenhuma planta real confirmada por foto.

**Concluído:** todo o raciocínio derivado deste cadastro (achados 1–3 do §1.2 do
`PROJETO.md`: vaso subdimensionado, risco de tombamento, gradiente vertical do vaso alto)
fica **invalidado** até prova em contrário. Não usar como base de comparação com a híbrida.

**Ação:** arquivo mantido só para registro do erro (regra append-only). Índice em
`plants/README.md` atualizado para remover esta entrada da lista ativa.

**Pendente:** se o dono confirmar que esta planta existe mesmo assim (talvez uma quarta
planta, ou confusão de conversa), reabrir e corrigir em vez de apagar.
