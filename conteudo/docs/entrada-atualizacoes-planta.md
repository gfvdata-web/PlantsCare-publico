# Entrada oficial de atualizações de planta (foto pelo celular)

> **Tema macro:** o canal padrão para o dono mandar fotos de uma planta e receber
> de volta a leitura de status versionada no repo. Roteado a partir do
> [PROJETO.md](../PROJETO.md) §2.
>
> Isto **formaliza** o que a [§6 do PROJETO.md](../PROJETO.md) e a memória já
> exigiam ("foto anexada → `plants/fotos/` **e** análise na ficha"). Mandar foto
> direto neste chat continua valendo — é o mesmo processamento, só sem o Forms.

---

## 1. Por que existe

Antes: o dono anexa fotos no chat, e o assistente copia para `plants/fotos/` e
escreve a leitura na ficha. Funciona, mas depende de estar numa conversa e de
lembrar o procedimento todo.

Agora: um **Google Forms** no celular (2 perguntas — planta + fotos) joga as
fotos organizadas numa pasta do Drive. Quando der, o dono pede ao Claude Code
para processar o que chegou. O registro obrigatório (fotos no repo + leitura
datada na ficha) passa a ser um passo único e repetível.

Mesma ideia dos outros projetos: `BolaoF1` (Forms → Apps Script) e
`GestaoFinanceira` / conciliação de notas (Forms de upload → pasta do Drive
espelhada no PC → rodar manualmente).

**Por que não `repository_dispatch` como no Bolão F1:** PlantsCare não é
repositório git nem tem pipeline. O gatilho automático não teria o que disparar.
Se um dia o projeto for para o GitHub, dá para trocar o Apps Script por um
dispatch e um workflow — o formato da pasta Inbox já serviria de payload.

## 2. As duas partes

### Parte A — Google Forms + Apps Script (configuração única)

Passo a passo completo em
`../google-apps-script/SETUP.md`. Resumo:

- Forms `PlantsCare — Atualização de planta`, 6 perguntas (2 obrigatórias + 4
  opcionais — 2 plantas por envio e um comentário de texto livre por planta):
  1. **Planta** — lista suspensa, opções = os `plant_id` exatos. Obrigatória.
  2. **Fotos** — envio de arquivo, imagens, até 10. Obrigatória.
  3. **Planta 2 (se quiser)** — mesma lista, opcional.
  4. **Fotos 2** — mesmo tipo, opcional. Preencher junto com a 3 ou deixar as
     duas em branco; preencher só uma das duas dá erro no Apps Script.
  5. **Comentários** — texto livre (parágrafo), opcional. O que mudou desde a
     última foto, na visão do dono — usado na análise do status, não só a foto.
     Referente à planta da pergunta 1.
  6. **Comentários 2** — mesmo tipo, opcional. Referente à planta da pergunta 3.
- Apps Script `../google-apps-script/Code.gs`
  com gatilho `onFormSubmit`, que a cada envio organiza as fotos assim:

```
PlantsCare Inbox/
  <plant_id>/
    <AAAA-MM-DD_HHmm>/          ← uma pasta por envio
      <AAAA-MM-DD>-1.jpg
      <AAAA-MM-DD>-2.jpg
      meta.json
```

`meta.json`:

```json
{
  "plant_id": "aceroleira-01",
  "enviado_em": "2026-09-03T18:20:00.000Z",
  "origem": "google-forms",
  "carimbo": "2026-09-03_1520",
  "arquivos": ["2026-09-03-1.jpg", "2026-09-03-2.jpg"],
  "comentario": "removi a flor que tinha aberto, parece que a copa encheu bastante essa semana",
  "processado": false
}
```

`comentario` é `null` quando o campo do Forms ficou em branco.

### Parte B — espelhar no PC e processar

1. **Google Drive para desktop** (grátis) instalado e logado na mesma conta.
2. A pasta `PlantsCare Inbox` marcada como **disponível offline / espelhada**
   (não só "streaming"), para o Claude Code ler os arquivos como locais.
3. Anotar o caminho local dela no bloco de config abaixo.

```
# BLOCO DE CONFIG
PASTA_INBOX_LOCAL = "H:\Meu Drive\PlantsCare Inbox"
#   Conta gfv.data, sincronizada como 2ª conta no Google Drive para desktop
#   (a conta padrão do PC, guilhermegfviana, é G:\ — não usar).
```

## 3. Como o Claude Code processa (o "super-prompt")

Gatilho no chat: **"processa as atualizações novas das plantas"** (ou o comando
`/atualiza-plantas`).

Para **cada** pasta `PASTA_INBOX_LOCAL/<plant_id>/<carimbo>/` cujo `meta.json`
tem `"processado": false` (e que não tenha um arquivo `.processado` ao lado):

1. **Ler o contexto da planta antes de opinar** — o protocolo de
   [`../plants/README.md`](../plants/README.md):
   ficha inteira (histórico de trás para frente), [`regimes.md`](regimes.md),
   e [`../equipamentos/README.md`](../equipamentos/README.md) se houver sensor.
2. **Copiar as fotos** para `plants/fotos/<plant_id>/AAAA-MM-DD-N.jpg`,
   continuando a numeração se já houver fotos daquele dia. Data = a do `carimbo`
   (envio), não a de hoje, se forem diferentes.
3. **Escrever entrada datada no histórico da ficha** (`plants/<plant_id>.md`),
   modelo do `_TEMPLATE.md`:
   - **Observado** — o que se vê nas fotos, factual. Se `meta.json` tiver
     `comentario` preenchido, incluir o relato do dono aqui também (é dado
     direto, não inferido por foto) — e usá-lo para **checar/contextualizar**
     o que a foto mostra, não só listar ao lado. Ex.: se o comentário diz "tirei
     a flor" e a foto não mostra mais flor, isso **confirma** a ação, não é
     coincidência a explicar.
   - **Concluído / hipótese** — diagnóstico por foto é **hipótese**, `🟡 a
     observar`, nunca conclusão (§6 do PROJETO.md). O relato do dono no
     `comentario` **é dado direto** (ele sabe o que fez/viu), não hipótese —
     mas ainda pode estar incompleto ou impreciso; não tratar como
     automaticamente mais confiável que a foto quando os dois divergem — registrar
     a divergência, como já é feito com relatos no chat.
   - **Ação** — o que fazer, com prazo de reavaliação.
   - **Pendente** + **Fotos:** com os caminhos.
   - Se a causa provável for algo que **nenhum sensor do projeto detecta** (pH,
     praga de raiz, vaso pequeno), dizer isso explicitamente.
4. **Atualizar o cabeçalho** da ficha (`Estado`, `Próxima ação`, `Última
   atualização`) e, se o estado mudou, a linha da planta em
   [`../plants/README.md`](../plants/README.md).
5. **Atualizar `../plants.yaml`** só se algum campo
   **estruturado** mudou (altura, vaso, substrato, estado…). Narrativa nunca vai
   para o YAML.
6. **Se a conversa mudar o rumo do projeto** (escopo, fase, premissa), registrar
   em [`decisoes.md`](decisoes.md) e no PROJETO.md §7.
7. **Marcar como processado:** escrever um arquivo `.processado` dentro da pasta
   do envio, com a data e um resumo de 1 linha do que foi feito. (Não editar o
   `meta.json` — ele veio do Drive; o `.processado` local é suficiente e sincroniza
   de volta.)
8. **Responder no chat** o resumo: quantos envios processados, por planta, o que
   foi concluído/levantado, o que ficou pendente.

Se não houver nenhuma pasta pendente, dizer isso e parar.

## 4. Privacidade

As fotos passam **transitoriamente** pelo Google (Forms → Drive) — mesma
avaliação já aceita no projeto de notas fiscais. Depois de processadas, a cópia
de verdade é a do repositório (`plants/fotos/`); as da pasta Inbox podem ser
apagadas do Drive à mão quando quiser. Nenhuma foto sai para serviço de terceiros
além do Drive da própria conta.

## 5. Manutenção

- **Planta nova / depreciada:** atualizar os **três** lugares — opções do Forms,
  `PLANTAS_VALIDAS` no `Code.gs`, índice em
  [`../plants/README.md`](../plants/README.md).
- **Campo opcional de observação no Forms:** hoje são só 2 perguntas (decisão do
  dono). Se um dia quiser um campo de texto livre ("o que mudou desde a última
  foto"), é adicionar uma pergunta `Observação` no Forms e uma linha no
  `onFormSubmit` para gravá-la no `meta.json` — está anotado como P27 no
  [PROJETO.md](../PROJETO.md) §7.
