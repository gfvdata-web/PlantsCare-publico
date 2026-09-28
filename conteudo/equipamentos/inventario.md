# Inventário de equipamentos

Tabela-índice do que o projeto **possui ou encomendou**. Candidatos ainda não comprados ficam
em [`docs/produtos-avaliados.md`](../docs/produtos-avaliados.md).

**Status em 2026-09-20:** 1 sensor em uso, dado cru confirmado via nRF Connect (1ª leitura
feita); Objetivo 1 segue em andamento — faltam mais 4 leituras em horários diferentes.

---

## Encomendado — pago, não recebido

| `equip_id` | Equipamento | Pedido | Chegada prevista | Preço | Ficha |
|---|---|---|---|---|---|
| `esp32-01` | ESP32 DevKit V1 (ponte BLE→WiFi) + cabo + carregador | 2026-09-20 | ⚠️ não confirmada | R$ 66,57 | [ficha](esp32-01.md) — resolve o bloqueio de alcance do PC até o `hhcc-01` |

## Em uso

| `equip_id` | Equipamento | Instalado em | Desde | Ficha |
|---|---|---|---|---|
| `hhcc-01` | HHCC Flower Care | [`aceroleira-01`](../plants/aceroleira-01.md) | 2026-09-17 ⚠️ | [ficha](hhcc-01.md) — 🟢 dado cru confirmado (nRF Connect, 2026-09-20); Objetivo 1 parcial (1/5 leituras). Antes na `jabuticabeira-hibrida-01` (23/08→17/09) |

## Guardado / reserva

| `equip_id` | Equipamento | Por que está parado | Ficha |
|---|---|---|---|
| — | — | — | — |

## Aposentado / com defeito

| `equip_id` | Equipamento | Quando | O que aconteceu | Ficha |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Recursos já disponíveis (não comprados)

Hardware que o projeto usa sem ter custado nada — registrado porque **é o que sustenta o
Objetivo 1 inteiro**.

| Recurso | Papel no projeto | Verificado |
|---|---|---|
| **Celular do dono** | Captura manual BLE + luxímetro (ALS). É o cérebro do Objetivo 1 | — |
| **PC Windows 10** | Gateway BLE da Fase 2 via `bleak` | ✅ 2026-08-02 — Intel Wireless Bluetooth com enumerador LE presente |
| Python 3.13 + Git 2.55 | Stack da Fase 2 | ✅ 2026-08-02 |

---

## Custo acumulado

| Categoria | Gasto até hoje |
|---|---|
| Sensores | R$ 135,30 |
| Infraestrutura (gateway, cérebro 24/7) | R$ 66,57 (`esp32-01`, ⚠️ pedido, não recebido) |
| Acessórios | R$ 0,00 |
| **Total** | **R$ 201,87** |

⚠️ Preço acima ainda é o anunciado — confirmar o valor final do pedido na
[ficha do `hhcc-01`](hhcc-01.md) quando houver a nota/comprovante.

---

## Antes de comprar qualquer coisa

Passar pelo [checklist de avaliação](../docs/checklist-avaliacao.md) e registrar o veredito em
[`produtos-avaliados.md`](../docs/produtos-avaliados.md). Para sensores da família HHCC, a
armadilha de variante (`HHCCJCY01` aberto × `HHCCJCY10` Tuya) está documentada em
[`objetivo-1-captura-celular.md`](../docs/objetivo-1-captura-celular.md) — não duplicada aqui.

Ao receber: criar/atualizar a ficha **antes de usar**, e refazer o checklist com o produto em
mãos. A diferença entre o que o anúncio prometeu e o que se confirmou é o dado mais útil
para a próxima compra.
