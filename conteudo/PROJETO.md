# PlantsCare — Documento-mestre

> **🎯 Objetivo ativo:** obter 4 medidas cruas (luz, água, condutividade, temperatura) **pelo
> celular**, sem app de fabricante. → [`docs/objetivo-1-captura-celular.md`](docs/objetivo-1-captura-celular.md)
> **Status:** 🟡 **1ª leitura crua feita em 2026-09-20** (nRF Connect, sem app do fabricante,
> variante aberta confirmada) — faltam mais 4 leituras em horários diferentes para fechar o
> critério de conclusão. Detalhe em
> [`docs/objetivo-1-captura-celular.md`](docs/objetivo-1-captura-celular.md).
> 🟢 **Fase 2 em operação desde 2026-10-01, sem PC:** o PC não alcança o sensor pelo Bluetooth
> (2026-09-20), então o **`esp32-01`** ([ficha](equipamentos/esp32-01.md)) fica na tomada perto
> da aceroleira, ouve o `hhcc-01` por escuta passiva e envia a cada **15 min** por HTTPS para a
> planilha `InfoSensorESP32` (Apps Script, Drive próprio). Sem PC sempre ligado → a placa manda
> direto ([`decisoes.md`](docs/decisoes.md) 2026-10-01). Config em
> `esphome/`, receptor em
> `google-apps-script/sensor-esp32/`. O coletor
> `bleak` + SQLite em `collectors/`/`core/` fica parado (não alcança o sensor). **P32** (planilha → repo → site de hora em hora, 07h–00h) implementada; liga quando os segredos do GitHub estiverem configurados.
> **Última atualização:** 2026-10-01 · **Dono:** Guilherme

---

## 1. O que é este arquivo

**Consciência geral do projeto e mapa de roteamento.** Ele responde "o que é este projeto,
onde ele está, e onde encontrar cada assunto". Nada mais.

| Este arquivo **tem** | Este arquivo **não tem** |
|---|---|
| Objetivo, premissas e escopo | Detalhe de planta, espécie ou sintoma |
| Como o projeto se organiza | Modelo de sensor, preço, protocolo |
| Fases e objetivo ativo | Fórmulas, UUIDs, tabelas de decodificação |
| Protocolo de trabalho e roteamento | Log completo de decisões |
| Perguntas em aberto | Avaliação de produto |

**Se um trecho começar a explicar botânica, hardware ou protocolo, ele pertence a outro
arquivo.** Este documento cresceu até 70 KB antes de ser reestruturado — a regra existe para
que isso não se repita.

---

## 2. 🗺️ Mapa — onde está cada assunto

**Comece por aqui.** Identifique o tema da conversa e vá direto ao arquivo.

| Se o assunto é… | Vá para | O que tem lá |
|---|---|---|
| 🌱 **Uma planta específica** — foto, sintoma, rega, poda, dica | [`plants/README.md`](plants/README.md) | Índice das plantas + ficha viva de cada uma, com histórico datado |
| 📸 **Mandar foto de planta pelo celular** — o Forms, como o Claude processa | [`docs/entrada-atualizacoes-planta.md`](docs/entrada-atualizacoes-planta.md) | Canal oficial: Google Forms → Drive → leitura de status versionada na ficha |
| 🤖 **Relatório de IA por e-mail sobre uma planta** — síntese, tendência, recomendação | [`docs/relatorio-ia.md`](docs/relatorio-ia.md) | Pipeline separado do `/atualiza-plantas`: lê a ficha já escrita, mantém síntese incremental, gera PDF e envia por e-mail. Dois caminhos: via API (`gerar_relatorio.py`, Claude Opus 5, precisa de `ANTHROPIC_API_KEY` própria) e manual (`gerar_relatorio_manual.py`, síntese escrita pelo Claude Code na sessão, sem custo extra) |
| 🔧 **Equipamento que já foi comprado** — instalação, pilha, defeito | [`equipamentos/README.md`](equipamentos/README.md) | Inventário, histórico de uso e manutenção, vínculo com plantas |
| 🛒 **Produto que se pensa em comprar** | [`docs/checklist-avaliacao.md`](docs/checklist-avaliacao.md) | O crivo a aplicar, na ordem certa |
| 🛒 **Veredito de produtos já analisados** | [`docs/produtos-avaliados.md`](docs/produtos-avaliados.md) | Catálogo produto a produto, com links |
| 🎯 **O objetivo ativo** — como capturar pelo celular | [`docs/objetivo-1-captura-celular.md`](docs/objetivo-1-captura-celular.md) | Procedimento passo a passo, UUIDs, decodificação |
| 📡 **Como o dado sai do sensor** — BLE, WiFi, gateway, Raspberry | [`docs/captura-dados.md`](docs/captura-dados.md) | Caminhos de hardware, transportes, cérebro 24/7. **Em uso:** `esp32-01` → planilha `InfoSensorESP32` (`esphome/`, `google-apps-script/sensor-esp32/`) |
| 📊 **Prints do app do sensor (Flower Care)** — reconstruir histórico hora a hora por foto de gráfico sem rótulo | [`docs/historico-sensor-app.md`](docs/historico-sensor-app.md) | Método de captura (várias colunas tocadas por dia) e de leitura (calibração por proporção de barra) |
| 📏 **O que medir e por quê** — DLI, VPD, EC, umidade, pH | [`docs/medicoes.md`](docs/medicoes.md) | Fundamentos de medição e armadilhas |
| 🧩 **Como agrupamos as plantas** | [`docs/regimes.md`](docs/regimes.md) | O modelo de regimes e por que ele existe |
| 💾 **Código, banco, schema, pipeline** | [`docs/arquitetura.md`](docs/arquitetura.md) | Camadas, formato canônico, módulos |
| 🌐 **Página pública do projeto** — o que sai, o que é escondido, como publicar | `publico/publicar.py` | Site https://gfvdata-web.github.io/PlantsCare-publico/ — **painel** (KPIs e gráficos hora a hora por planta, lê `data/sensor-app/*.csv`, `data/eventos.csv` e `alvos` do `plants.yaml`) + documentação em `/docs/`. Sem localização das varandas e sem fotos. Publicar: `python publico/publicar.py` (só o que está commitado). Decisão em `docs/decisoes.md` (2026-09-28) |
| 📜 **"Por que decidimos assim?"** | [`docs/decisoes.md`](docs/decisoes.md) | Log cronológico completo + perguntas respondidas |
| 🧭 **Rumo do projeto** — escopo, fase, prioridade | **este arquivo** | §3 a §6 |

> Tema novo que não caiba em nenhum destes **vira arquivo próprio em `docs/`**, e ganha uma
> linha nesta tabela. Não voltar a acumular aqui.

### ↪️ Referências antigas (`§1.2`, `§4.5`, `§4.6`…)

Até 2026-08-02 este arquivo tinha tudo dentro dele, e os demais documentos apontam para
seções que **não existem mais**. Use esta tabela para traduzir qualquer `§N` encontrado:

| Referência antiga | Onde está agora |
|---|---|
| §1.1 microclimas · §1.2 as plantas · §1.3 bonsai | [`docs/regimes.md`](docs/regimes.md) + a ficha da planta em [`plants/`](plants/README.md) |
| §2 o que medir · §2.1 luz/DLI · §2.2 água · §2.4 fertilidade/EC/pH · §2.5 VPD | [`docs/medicoes.md`](docs/medicoes.md) |
| §2.3 peso do vaso | [`docs/medicoes.md`](docs/medicoes.md) — marcado 🚫 não aprovado |
| §3 caminhos de hardware · §4 transportes · §4.1 cérebro 24/7 · §4.2 ambiente · §4.3 BLE×WiFi · §4.4 componente×dispositivo | [`docs/captura-dados.md`](docs/captura-dados.md) |
| §4.5 checklist de avaliação | [`docs/checklist-avaliacao.md`](docs/checklist-avaliacao.md) |
| §4.6 e subseções (Objetivo 1, UUIDs, decodificação) | [`docs/objetivo-1-captura-celular.md`](docs/objetivo-1-captura-celular.md) |
| §5 arquitetura · §5.2 formato canônico · §5.3 diretórios | [`docs/arquitetura.md`](docs/arquitetura.md) |
| §6 roadmap | §5 deste arquivo |
| §9 perguntas respondidas · §10 log de decisões | [`docs/decisoes.md`](docs/decisoes.md) |
| §9 perguntas **em aberto** | §7 deste arquivo |

⚠️ **Ao editar qualquer arquivo, trocar `§N do PROJETO.md` pelo link direto ao documento do
tema.** Referência por número de seção é frágil; link por arquivo, não.

---

## 3. Objetivo e premissas

Sistema pessoal de **cuidado de plantas orientado a dados**, em três camadas:

1. **Medição** — capturar automaticamente o que determina saúde e crescimento.
2. **Dado cru** — acesso ao valor bruto do sensor, sem app ou nuvem de fabricante como
   intermediário obrigatório.
3. **Autonomia** — a partir do histórico, gerar diagnóstico, alerta e recomendação.

### Premissas invioláveis

Mudar qualquer uma destas é decisão de rumo, e vai para o log.

| # | Premissa | Consequência prática |
|---|---|---|
| 1 | **Dado cru é requisito, não preferência** | Produto que só entrega valor pelo app do fabricante é **reprovado**, por melhor que seja |
| 2 | **Só medir e recomendar** — atuação fora de escopo | Nada de rega automática, bomba ou válvula |
| 3 | **🚫 Só sensores** — pesagem de vaso não aprovada | Aceita-se conscientemente que a leitura de água fica parcial |
| 4 | **Pronto agora, DIY depois** | Nada de solda enquanto o pipeline não estiver provado |
| 5 | **Ambiente 100% natural** | Sem luz artificial, estufa ou controle de clima. Não se *controla* luz — mede-se e realoca-se a planta |
| 6 | **Zero experiência com montagem** | Toda recomendação declara o **esforço real**, não só o preço |
| 7 | **Expansão por dor, não por entusiasmo** | Cada compra precisa de um sintoma medido que a justifique |
| 8 | **Registro obrigatório** | Observação que fica só no chat está perdida |

---

## 4. Como o projeto está organizado

### Regimes, não espécies

O projeto agrupa plantas por **onde estão + o que limita o crescimento ali**, não por
espécie. Um alvo único erraria em todo lugar; um alvo por espécie nunca fecharia.

| Regime | Gargalo dominante |
|---|---|
| `varanda-fruteira` | água e calor |
| `interno-bonsai` | luz |

`regime` é campo obrigatório em toda ficha de planta, e todo alerta é resolvido por regime.
→ [`docs/regimes.md`](docs/regimes.md)

### Locais

O projeto tem **dois endereços com gerenciamentos diferentes** — não é a mesma varanda vista
de dois ângulos, são **duas varandas distintas**, cada uma com sua própria rotina de cuidado.
Isso afeta a coordenada do Open-Meteo **e** significa que o projeto não pode assumir rotina
única de rega/observação entre os dois locais.

| Local | Coordenada | Planta(s) hoje |
|---|---|---|
| local A | _coordenadas omitidas_ | `aceroleira-01`, `pitanga-01` |
| local B | _coordenadas omitidas_ | `jabuticabeira-hibrida-01` |

Qual planta está em qual local fica na ficha de cada uma (campo `Local`). Confirmado em
2026-08-02 (P23, respondida em [`docs/decisoes.md`](docs/decisoes.md)).

### Identificadores

| ID | É | Amarra |
|---|---|---|
| `plant_id` | nome do arquivo em `plants/`, sem extensão | série temporal ↔ ficha da planta |
| `equip_id` | nome do arquivo em `equipamentos/` | equipamento ↔ planta onde está instalado |

`plants/` é a **fonte de verdade** do cadastro. `plants.yaml` é projeção estruturada para o
pipeline — se divergirem, o markdown vence.

---

## 5. Fases

| Fase | O que é | Estado |
|---|---|---|
| **Fase 0** | Cadastro documental — estrutura, fichas, avaliação de produtos | ✅ concluída |
| **🎯 Fase 1** | **Objetivo 1**: 4 medidas cruas pelo celular, manual | 🟡 sensor e dado cru confirmados; faltam 4 de 5 leituras manuais (P26) |
| **Fase 2** | Coleta automática a cada 15 min, Open-Meteo. Destrava **DLI** e curva de secagem. Previsto no PC (`bleak` + SQLite); **feito via `esp32-01` → planilha** porque o PC não alcança o sensor e não fica ligado | 🟢 coleta rodando desde 2026-10-01; planilha → site de hora em hora (P32) |
| **Fase 3** | Escala: máquina 24/7, ESP32 ponte, DIY com sonda longa, dashboard, interpretação automática | ⚪ só com dor medida |

**Critério de avanço:** cada fase só começa quando a anterior gerou uma **dor real e
medida** — não quando parece interessante. Os gatilhos de compra estão em
[`docs/captura-dados.md`](docs/captura-dados.md).

⚠️ **A Fase 1 não entrega DLI.** DLI exige série temporal, e o celular não loga em segundo
plano. Isso é a fronteira entre Fase 1 e Fase 2, não um defeito.

**Fora de escopo por decisão:** atuação/rega automática; pesagem de vaso.

---

## 6. Protocolo de trabalho

### Roteamento de sub-conversas

1. Identifique o tema no **mapa da §2** e leia o arquivo indicado **antes** de responder.
2. Escreva no arquivo do tema, não aqui.
3. Só volte a este arquivo se a conversa mudar **o rumo do projeto** — escopo, fase,
   prioridade, premissa.

### Regras de registro

- **Histórico é append-only.** Nunca reescrever entrada antiga. Corrigir algo = **entrada
  nova** que referencia a anterior. O erro fica no registro — já houve planta cadastrada que
  não existia e vaso com medida chutada, e é o histórico que deixou isso rastreável.
- **Toda conversa sobre uma planta termina com entrada datada** na ficha dela.
- **Diagnóstico por foto é hipótese**, nunca conclusão. Marcar `🟡 a observar` e pedir
  reavaliação em dias.
- **Distinguir medido de inferido.** Número não verificado leva `⚠️`.
- **Vínculo é bidirecional:** instalar sensor numa planta se registra nos dois arquivos.
- Ao comprar: ficha em `equipamentos/` **antes** de usar.

### Ao dar recomendação

- Se a causa provável for algo que **nenhum sensor do projeto detecta** (pH, praga de raiz,
  vaso pequeno), dizer isso explicitamente. É a falha mais comum aqui.
- Não recomendar compra sem passar pelo
  [checklist](docs/checklist-avaliacao.md).

---

## 7. Perguntas em aberto

Respondidas: [`docs/decisoes.md`](docs/decisoes.md).

| # | Pergunta | Trava o quê |
|---|---|---|
| **P13** | Avaliar novos produtos que forem anexados | Em andamento — 1º lote em `docs/produtos-avaliados.md` |
| ~~**P14**~~ | ~~Altura atual da aceroleira~~ → ✅ **~50 cm** (informado 2026-08-30; falta confirmar com trena) | — |
| ~~**P15**~~ | ~~Há espaço e disposição para transplantar?~~ → ✅ **respondida 2026-08-20: sim, em 1–3 semanas** | Destravou a ordem da adubação e o timing da poda. Abre **P25** (dimensionar o vaso intermediário) |
| **P16** | Qual espécie de bonsai está sendo considerada? | Define o DLI alvo e se a casa comporta |
| **P17** | Poda de formação da acerola → respondida 2026-08-20 (após o transplante, copa cheia); **reaberta 2026-09-07**: dono propõe **3 cortes de estilização** já, antes da copa encher. Pendente: marcar os 3 ramos + definir a forma-alvo; decidir corte a corte. Ver ficha `plants/aceroleira-01.md` (2026-09-07) | Cortar estrutura antes da copa recomposta gasta reserva que a recuperação está usando. Cortes finos/claramente errados podem sair já; médios/grossos esperam o flush endurecer (~3–4 sem) |
| **P28** | Poda de formação da pitanga: dono quer **médio a forte no fim do inverno** (~21/09). Posição do projeto: esperar a **brotação nova** (raiz pega) e podar no **início de outubro**, com a **forma-alvo definida**. Ver ficha `plants/pitanga-01.md` (2026-09-07) | Poda forte em planta envasada há &lt;2 semanas repete o "trauma maior" da acerola. O atraso de ~2–3 semanas ainda pega o surto de primavera e derruba o risco |
| ~~**P25**~~ | ~~Volume do vaso intermediário da acerola? (~15–20 L)~~ → ⚠️ **superada pelos fatos em 2026-08-30**: o dono transplantou direto para **~25–34 L**, pulando o intermediário. O risco de encharcamento vira **ponto de observação** na ficha (mitigado por torrão intacto + camada de argila/manta), não mais decisão de compra | — |
| **P20** | Testar sonda capacitiva longa (15–25 cm) na Fase 3? | A limitação de ~5 cm foi aceita conscientemente |
| **P21** | `equipamentos/` vira repositório git separado? | Hoje é pasta, para manter o vínculo trivial |
| ~~**P24**~~ | ~~Em qual planta instalar o `hhcc-01` primeiro?~~ → ✅ **respondida 2026-08-23: `jabuticabeira-hibrida-01`**, decisão oportunista (dono estava no local B quando o sensor chegou) | Destravou a instalação; não destrava o Objetivo 1 inteiro — a captura crua segue parada (dono fora do local B) |
| **P26** | Retomar o nRF Connect no `hhcc-01` — ✅ **executado 2026-09-20**: 1ª leitura crua feita, variante confirmada, decodificação manual validada, bateria lida. 🟡 **Segue aberta**: faltam mais 4 leituras em horários diferentes para fechar o critério de conclusão do Objetivo 1 | Objetivo 1 não pode ser dado como concluído enquanto não houver as 5 leituras — ver `docs/objetivo-1-captura-celular.md` |
| ~~**P27**~~ | ~~Adicionar campo opcional "Observação" ao Forms?~~ → ✅ **respondida 2026-09-20: sim** — campos `Comentários` e `Comentários 2` (um por planta), usados na análise do status junto com a foto. Ver `docs/entrada-atualizacoes-planta.md` §2/§3 | — |
| ~~**P29**~~ | ~~Harness comparando `gerar_relatorio_manual.py` (Claude Code) × API do Gemini para o relatório de IA~~ → ✅ **aprovada 2026-09-21**: `relatorios/ia_gemini.py` + `relatorios/harness_comparacao.py`, testado em 3 plantas, prompt ajustado em 5 rodadas até aprovação. Modelo `gemini-3.1-flash-lite` (só tier gratuito, decisão deliberada do dono). Ver `docs/decisoes.md` (2026-09-21) e `relatorios/saida/p29-resultado-2026-09-21.md` | — |
| ~~**P30**~~ | ~~`gerar_relatorio.py` salvava o estado antes de confirmar o e-mail~~ → ✅ **corrigida 2026-09-20**: ordem alinhada com `gerar_relatorio_manual.py` — estado só é salvo depois de PDF + e-mail confirmarem | — |
| **P31** | Automação ponta a ponta: Forms → ficha → síntese (Gemini) → PDF → e-mail, sem sessão interativa. **Implementado 2026-09-21** — ver `docs/decisoes.md`: repo `gfvdata-web/PlantsCare` (privado) no GitHub, `relatorios/gerar_relatorio_gemini.py` (3º caminho oficial), `relatorios/atualiza_automatico.py` + `relatorios/ia_gemini_diagnostico.py` (estágio 1 — só chama IA de foto se o comentário tiver a palavra-chave, ver `PALAVRAS_CHAVE_ANALISE`), `.github/workflows/pipeline.yml`. 🟡 **Aberto: workflow ainda é `workflow_dispatch` (manual) de propósito** — falta o dono rodar 1x, revisar o e-mail/commit, e decidir se troca para gatilho automático (`push` em `inbox/**`). Também falta configurar `GITHUB_TOKEN` no Apps Script (`google-apps-script/SETUP.md` §8) pra o Forms começar a commitar no repo | Decide se o pipeline final vira 100% automático (Forms dispara tudo sozinho) ou fica com esse "botão manual" de propósito |
| **P32** | Planilha `InfoSensorESP32` → `data/esp32/` → painel público, sem PC. **Implementada 2026-10-01**: `.github/workflows/sensor-sync.yml` (de hora em hora, 07h–00h de Brasília; a madrugada entra na execução das 07h) + `collectors/planilha_esp32.py` + painel mesclando as fontes. 🟡 **Aberto:** dono configurar 3 segredos no GitHub (`SHEET_URL`, `SHEET_TOKEN`, `PUBLICO_TOKEN`) e reimplantar o Apps Script com o `doGet` novo — ver `google-apps-script/sensor-esp32/SETUP.md`. Depois: comparar o mmol de luz da ponte com o do app num mesmo dia | Sem isso o site não atualiza sozinho |

**Mais adiante:** Home Assistant ou stack própria? · tolerância a manutenção recorrente ·
formato de saída preferido (CLI, dashboard, notificação) · vale análise laboratorial de solo?

---

## 8. Riscos estruturais

Só os que ameaçam o projeto como um todo. Armadilhas técnicas ficam nos docs de cada tema.

| Risco | Mitigação |
|---|---|
| **Prender-se à nuvem do fabricante** | Premissa 1 + item 2 do checklist. Reprova de saída |
| **Comprar por entusiasmo, antes de dor medida** | Premissa 7 + gatilhos de compra em `captura-dados.md` |
| **Observação ficar só no chat e se perder** | §6: registro obrigatório em `plants/` |
| **Diagnóstico por foto virar conclusão** | §6: hipótese `🟡 a observar`, reavaliação em dias |
| **Dado chutado virar fato** | Convenção `⚠️` em todo número não verificado |
| **O documento-mestre inchar de novo** | §1 e §2: tema novo vira arquivo em `docs/` |
| **Confundir o que o sensor mede com o que a planta precisa** | Nenhum sensor do projeto detecta pH, praga ou vaso pequeno — dizer isso sempre |
| **Projeto morrer na complexidade** | Fase 1 é 1 sensor + 1 app grátis. Nada mais |

---

## 9. Glossário

- **PAR** — Photosynthetically Active Radiation, 400–700 nm.
- **PPFD** — densidade de fluxo de fótons, µmol·m⁻²·s⁻¹. "Intensidade agora".
- **DLI** — Daily Light Integral, mol·m⁻²·dia⁻¹. "Luz do dia inteiro".
- **VPD** — Vapor Pressure Deficit, kPa. Quão "sedento" está o ar.
- **EC** — condutividade elétrica; proxy de sais dissolvidos. A "corrente".
- **VWC** — Volumetric Water Content, % de volume de água no substrato.
- **ALS** — Ambient Light Sensor (o sensor de luz do celular).
- **GATT** — camada de serviços e características do BLE.
- **MiBeacon** — formato de advertising da Xiaomi. Criptografado em alguns aparelhos.
- **`bind_key`** — chave da nuvem Xiaomi para decifrar MiBeacon criptografado.
- **`HHCCJCY01`** — o sensor BLE aberto. **`HHCCJCY10`** — a variante Tuya, fechada.
- **Little-endian** — byte menos significativo primeiro.
- **ESPHome** — firmware declarativo em YAML para ESP32.
- **Drydown** — curva de secagem do substrato entre duas regas.
- **Regime** — agrupamento de plantas por local + gargalo dominante.
