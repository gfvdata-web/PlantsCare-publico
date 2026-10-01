# Arquitetura de software

> **Tema macro:** como o dado é modelado, gravado e derivado. Vale a partir da Fase 2 —
> o Objetivo 1 é manual, sem código. Roteado a partir do [PROJETO.md](../PROJETO.md).

---

## 1. Camadas

```
[ sensores ]  BLE / WiFi / sub-GHz / manual / API externa
      │
      ▼
[ coletores ]  um adapter por transporte → evento canônico
      │
      ▼
[ armazenamento ]  SQLite append-only → export Parquet
      │
      ▼
[ derivações ]  DLI, VPD, curva de secagem, alertas
      │
      ▼
[ apresentação ]  CLI / notebook → dashboard → agente que interpreta
```

---

## 2. Decisões de fundação

- **Python** — melhor ecossistema para BLE (`bleak`), análise (`pandas`) e integração LLM.
- **SQLite** — arquivo único, zero servidor, versionável, suficiente para anos de leituras a
  cada 15 min. Migrar para TimescaleDB/InfluxDB só se e quando doer.
- **Sem nuvem de fabricante** na trilha principal de dados. Requisito, não preferência.
- **Coletor burro, análise esperta.** O coletor grava só o número cru + metadados. Toda
  conversão (lux→PPFD, calibração de sonda, interpretação de EC) acontece **na leitura**,
  nunca na escrita — assim, melhorar a calibração **corrige o histórico inteiro
  retroativamente**.
- **Um adapter por transporte.** Trocar de sensor não pode quebrar a análise: todos os
  transportes convergem para o mesmo formato canônico.

---

## 3. Formato canônico de leitura

```jsonc
{
  "ts":        "2026-08-02T14:32:10-03:00",  // ISO8601 com timezone
  "device_id": "miflora-c4:7c:8d:xx:xx:xx",  // identidade física estável
  "plant_id":  "jabuticabeira-hibrida-01",   // = nome do arquivo em plants/
  "metric":    "light_lux",                  // vocabulário controlado
  "value":     8421.0,                       // valor CRU, unidade nativa do sensor
  "unit":      "lx",
  "quality":   "ok",                         // ok | suspect | stale | error
  "source":    "nrf_connect_manual",         // ou bleak, esphome, open_meteo
  "raw":       "0a01f3..."                   // payload original, para reprocessar
}
```

### Vocabulário de `metric`

`light_lux` · `soil_moisture_pct` · `soil_ec_uscm` · `soil_temp_c` · `air_temp_c` ·
`air_rh_pct` · `battery_pct` · `ext_shortwave_wm2` · `ext_precip_mm`

### Derivados

Calculados na leitura, **nunca gravados** como leitura:
`ppfd` · `dli` · `vpd` · `drydown_rate` · `days_to_threshold`

### Campos que amarram tudo

| Campo | Amarra em |
|---|---|
| `plant_id` | nome do arquivo em [`plants/`](../plants/README.md), sem extensão |
| `device_id` | ficha em [`equipamentos/`](../equipamentos/README.md) |
| `quality` | `stale` marca buracos de coleta — evita interpolação silenciosa na análise |

⚠️ Se uma planta for deprecada ou renomeada em `plants/`, o histórico **mantém o
`plant_id` antigo**. Corrigir por mapeamento na leitura, nunca reescrevendo o banco.

---

## 4. Módulos previstos (Fase 2)

> ⚠️ **2026-10-01:** a coleta automática acabou **fora** destes módulos — o PC não alcança o
> sensor e não fica ligado, então o `esp32-01` envia direto para a planilha `InfoSensorESP32`
> ([`decisoes.md`](decisoes.md), [`captura-dados.md`](captura-dados.md) §4). `miflora_ble.py` e
> `store.py` ficam parados; o elo que falta é planilha → `data/` (P32 em `PROJETO.md` §7).

```
collectors/
├── miflora_ble.py      ← bleak, reproduz o que o Objetivo 1 fez à mão
├── openmeteo.py        ← shortwave_radiation + precipitation
└── manual_entry.py     ← leituras manuais, pH do kit, observações
core/
├── schema.py           ← leitura canônica + validação
├── store.py            ← SQLite
└── derive.py           ← DLI, VPD, drydown
analysis/
└── *.ipynb
data/
└── plantscare.db
```

---

## 5. Cadastro: `plants.yaml` × `plants/*.md`

Os dois coexistem de propósito, com papéis distintos:

| | Para quem | Contém |
|---|---|---|
| `plants.yaml` | **máquina** — o pipeline lê | campos estruturados: `plant_id`, espécie, regime, vaso, alvos |
| `plants/*.md` | **humano e agente** — narrativa | histórico datado, sintomas, fotos, hipóteses, decisões |

Regra: `plant_id` é idêntico nos dois, e **`plants/` é a fonte de verdade**. O YAML é
projeção estruturada dele. Se divergirem, o markdown vence.
