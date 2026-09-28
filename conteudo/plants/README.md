# plants/ — fichas vivas das plantas

Uma planta = um arquivo. Este é o lugar onde mora **tudo que é específico de uma planta**:
espécie, exigências, medidas do vaso, sintomas, fotos, rega, adubação e histórico.

O `PROJETO.md` na raiz trata de **estrutura** (fases, arquitetura, protocolos) e raciocina
sobre **regimes**, não sobre espécies. Se um trecho de lá começar a explicar exigência de
espécie, ele pertence aqui.

---

## Índice

| Planta | Espécie | Regime | Local | Estado | Ficha |
|---|---|---|---|---|---|
| `aceroleira-01` | *Malpighia emarginata* | `varanda-fruteira` | varanda — **local A** (_coordenadas omitidas_) | 🟢 recuperação avançada, copa seguindo cheia · **20/09: novo botão/flor** (pinçar), líder ainda não amarrado · **adubo meia dose aplicado 18/09** (drenagem checada antes: não confirmado) · **sensor `hhcc-01` instalado**, 1ª leitura crua feita · estilização em pausa | [ficha](aceroleira-01.md) |
| `pitanga-01` | *Eugenia uniflora* | `varanda-fruteira` | varanda — **local A** (_coordenadas omitidas_) — **mesma varanda da acerola** | 🟡 estabelecimento **ainda incerto** (envasada 30/08) · **17/09: brotação nova reaberta 3ª vez** — mesmo tom já aparecia em 30/08, foto única não prova idade da folha; comparar a mesma ponta em ~10 dias. Sem adubo até lá | [ficha](pitanga-01.md) |
| `jabuticabeira-hibrida-01` | *Plinia* sp. híbrida ⚠️ | `varanda-fruteira` | varanda — **local B** (_coordenadas omitidas_) | 🟢 copa densa e saudável (checagem 20/09, quase 1 mês sem foto) · cauliflorescência ativa — **1 de ~15 indícios confirmado virando fruto** (recontagem completa pendente) · **1ª adubação fracionada aplicada 20/09** · **sem sensor desde 17/09** | [ficha](jabuticabeira-hibrida-01.md) |

⚠️ **Dois locais, dois gerenciamentos diferentes** (confirmado 2026-08-02): local A
(`aceroleira-01` + `pitanga-01`) e local B (`jabuticabeira-hibrida-01`). Não assumir
rotina de rega/observação compartilhada entre as varandas — **nem entre a acerola e a pitanga
na mesma varanda**: a acerola se beneficia de seca curta, a pitanga quer umidade constante.

**Deprecada:** `jabuticabeira-01` — [ficha](jabuticabeira-01.md) mantida só para registro do
erro (regra append-only). Não corresponde a planta real confirmada; não usar seus dados.

---

## Como usar

### O `plant_id` é o nome do arquivo

`jabuticabeira-01.md` → `plant_id` = `jabuticabeira-01`. Esse identificador é o mesmo usado
no [formato canônico de leitura](../docs/arquitetura.md) e nas fichas de `equipamentos/`.
É o que amarra série temporal, ficha da planta e sensor instalado.

O sufixo numérico existe para permitir uma segunda jabuticabeira depois sem ambiguidade.

### Regras de escrita

1. **Histórico é append-only.** Nunca reescrever entrada antiga. Corrigir um diagnóstico
   anterior = **nova entrada** que referencia a antiga. O erro faz parte do registro.
2. **Toda conversa sobre uma planta termina com uma entrada datada.** Observação que fica só
   no chat está perdida.
3. **Diagnóstico por foto é hipótese, não conclusão.** Registrar como `🟡 a observar` e pedir
   reavaliação em dias. Só vira conclusão com evolução confirmada.
   ⚠️ **"Brotação nova" por cor de folha é o caso mais frágil disto** (`pitanga-01`,
   2026-09-17, três idas e voltas no mesmo dia) — folha jovem e folha madura estressada por
   frio/pouca luz podem ter o **mesmo tom**, mesmo de perto. Uma foto isolada não prova
   **quando** a folha nasceu. Confirmar exige **comparar a mesma ponta de ramo em dois
   momentos** (contar pares de folha hoje, revisitar em ~10 dias), nunca uma foto só.
4. **Número não verificado leva `⚠️`.** Medida estimada ≠ medida com trena.
5. **Não repetir aqui o que está no `PROJETO.md`.** Linkar (`../PROJETO.md`), não copiar.

### Criar uma planta nova

Copiar `_TEMPLATE.md`, renomear para `<especie>-<NN>.md`, preencher o cabeçalho e adicionar
a linha no índice acima.

---

## Protocolo para conversas de planta específica

Serve para sessões futuras (inclusive Sonnet) que forem discutir uma planta.

**Antes de responder:**
1. Ler a ficha da planta inteira — principalmente o histórico, de trás para frente.
2. Ler [`docs/regimes.md`](../docs/regimes.md) para entender o regime dela.
3. Conferir em [`equipamentos/`](../equipamentos/README.md) se há sensor instalado nessa
   planta e o que ele mede de fato.

**Ao responder:**
- Distinguir o que é **medido** do que é **inferido**. Foto e relato são indício.
- Se a causa provável for algo que **nenhum sensor do projeto detecta** (pH, praga de raiz,
  vaso pequeno), dizer isso explicitamente — é a falha mais comum do projeto.
- Não recomendar compra sem passar pelo
  [checklist de avaliação](../docs/checklist-avaliacao.md).

**Ao terminar:**
- Adicionar entrada no histórico com data, o que foi observado, o que foi concluído (ou
  levantado como hipótese) e o que ficou pendente.
- Se algo mudar o rumo do projeto, registrar também em
  [`docs/decisoes.md`](../docs/decisoes.md).

---

## Fotos

Guardar em `plants/fotos/<plant_id>/AAAA-MM-DD-<n>.jpg`. Referenciar na entrada de histórico
do dia. Fotografar sempre que possível **no mesmo enquadramento e na mesma hora do dia** —
comparação de cor só funciona com iluminação parecida.

**Como as fotos chegam:** anexadas direto no chat, **ou** pelo Google Forms de atualização
(planta + fotos), que as organiza numa pasta do Drive espelhada no PC. O processamento é o
mesmo nos dois casos — ver [`../docs/entrada-atualizacoes-planta.md`](../docs/entrada-atualizacoes-planta.md).
