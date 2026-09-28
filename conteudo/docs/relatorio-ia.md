# Relatório de IA por e-mail

> **Tema macro:** um segundo pipeline sobre as fichas de planta, separado do
> `/atualiza-plantas` — em vez de organizar foto nova, lê o que já foi escrito e produz
> uma síntese/recomendação nova, por IA, virando PDF enviado por e-mail. Roteado a partir
> do [PROJETO.md](../PROJETO.md) §2.

---

## 1. Por que existe, e por que não é o `/atualiza-plantas`

O `/atualiza-plantas` processa envios do Forms:
olha foto nova, forma hipótese, escreve entrada datada na ficha. É trabalho **interativo**,
com visão sobre a planta física — só ele faz isso.

Este pipeline é outra coisa: **revisão longitudinal** do que já está escrito. Não olha foto
nova por padrão, não forma diagnóstico do zero. A analogia que fixou o desenho: não é "o
médico relê o prontuário inteiro a cada consulta" — é "o médico mantém uma nota de
acompanhamento sempre atualizada" (estado, hipóteses ainda em aberto, próximos marcos de
decisão) e a cada rodada só lê essa nota + o que mudou, não o histórico desde o início.

Isso evita duplicar o trabalho do `/atualiza-plantas` (que continua sendo o único a
diagnosticar por foto) e resolve um problema que nada no projeto cobria: acompanhar
tendência entre atualizações — "essa flor foi removida 3 vezes e volta sempre", "a pendência
X está aberta desde 02/08", "a poda planejada para outubro está chegando, a condição para
fazê-la já foi cumprida?".

## 2. Como funciona

```
plants/<plant_id>.md  ──┐
                         ├──► relatorios/ficha.py (só leitura)
relatorios/status/       │         │
  <plant_id>.md  ◄───────┤         ▼
  (síntese anterior)     │   entradas novas desde a última síntese
                         │   + cabeçalho, §3 meta atual, §4 equipamentos,
                         │   §5 pendências abertas, fotos "de perto" recentes
                         ▼
                  relatorios/ia.py — 1 chamada à API (Claude Opus 5,
                  saída estruturada: sintese_atualizada + relatorio)
                         │
          ┌──────────────┴──────────────┐
          ▼                              ▼
  relatorios/status/<id>.md      relatorios/pdf.py → relatorios/saida/*.pdf
  (reescrito — é estado,          (análise + galeria com todas
   não histórico)                  as fotos citadas no update)
                                          │
                                          ▼
                                relatorios/enviar_email.py (SMTP/Gmail)
```

**O PDF tem duas partes:** a análise da IA (via de regra cabe em 1 página) e, em seguida,
uma galeria com uma cópia de cada foto que fez parte do update desta rodada — essa parte
pode passar de 1 página, é esperado (uma foto de retrato numa largura de 110 mm já ocupa
quase a página inteira).

**O que evita reler o histórico inteiro a cada rodada:** `relatorios/status/<plant_id>.md`
guarda a síntese da rodada anterior mais um marcador (`ultima_entrada_processada` — o título
da última entrada do §6 já incorporada). A cada rodada nova, só as entradas **posteriores**
a esse marcador entram no prompt como "novidade"; a síntese anterior entra inteira, mas é
pequena (algumas centenas de tokens), não a ficha toda. Na primeira rodada de uma planta
(sem síntese ainda) o histórico inteiro vira a entrada, e a primeira síntese nasce completa.

**Esse arquivo de estado não é fonte de verdade.** `plants/<id>.md` continua sendo — a regra
de `plants/README.md` não muda. Se o arquivo de estado for apagado, a próxima rodada
reprocessa o histórico inteiro da ficha e recria a síntese do zero (mais caro nessa rodada,
nada se perde).

## 3. O que a IA recebe, e o que não recebe

Recebe: cabeçalho da ficha (Espécie/Regime/Local/Estado/Próxima ação/Última atualização),
§3 (meta atual), §4 (equipamentos), §5 (só pendências ainda abertas), as entradas novas do
§6 na íntegra, a síntese da rodada anterior, e o texto completo de
[`docs/regimes.md`](regimes.md) (curto o bastante para mandar sempre, evita ter que recortar
a seção certa).

**Fotos que a IA analisa: só as que a legenda já marca como "de perto"/"close"/"detalhe"**
nas entradas novas (a ficha já registra isso — ex. `` `2026-09-20-3.jpg` (perto, garfo do
tronco com fruto/broto num nó) ``), nunca a galeria inteira de conjunto/paisagem. Isso
mantém o escopo limpo (quem diagnostica por foto continua sendo só o `/atualiza-plantas`) e
barato (no máximo 6 fotos por rodada, ver `ficha.extrair_fotos_de_perto`).

**Fotos que entram no PDF: todas as citadas nas entradas novas**, não só as "de perto" — o
relatório inclui uma cópia de cada foto que fez parte do update, não só as que a IA usou
para analisar (ver `ficha.extrair_fotos_do_update`, teto de 12 por rodada). Cada foto é
reduzida (lado maior ≤1400 px) e recomprimida em JPEG antes de embutir — sem isso, uma foto
de celular de ~300 KB vira alguns MB dentro do PDF por causa de como o fpdf2 embute imagem
PIL sem recompressão, e o e-mail ficaria pesado.

**Decisão adiada para uma v2:** a ideia original era a IA poder recortar um pedaço específico
de uma foto mais ampla para justificar um ponto do relatório (ex. um botão visível só num
canto de uma foto de "copa inteira"). Pedir coordenadas de recorte ao modelo não é uma
capacidade direta da Messages API — exigiria um passo de visão computacional à parte. Fica
para depois; v1 manda a foto inteira ou não manda.

## 4. Gatilho

**Comando manual, `/relatorio-plantas <plant_id> [<plant_id2> ...]`.** Sem modo "todas as
plantas", sem agendamento — mesma lógica manual do `/atualiza-plantas` ("quando der, o dono
pede ao Claude Code"). Rodar sem novidade desde a última síntese não gera relatório (o
script detecta e pula, sem chamar a API).

## 5. Modelo e custo

**Claude Opus 5** (`claude-opus-5`), 1 chamada `messages.parse` por planta, sem prompt
caching (volume baixo demais pra compensar — TTL de cache é de minutos, e isto roda no
máximo algumas vezes por semana). Custo típico por rodada: na faixa de **US$ 0,10–0,15**
(ficha grande + síntese anterior + até 6 fotos). Trivial no volume esperado do projeto.

## 6. Config necessária

Ver `relatorios/README.md` — `ANTHROPIC_API_KEY` no ambiente +
`relatorios/config.local.json` (copiado de `config.example.json`, com senha de app do
Gmail) para o envio por SMTP.

## 7. Onde mora o código

`relatorios/`, paralelo a `plants/`/`equipamentos/` — não em `collectors/`/`core/`, que é a
pipeline numérica da Fase 2 (sensor BLE → SQLite, formato canônico
[`ts/metric/value`](arquitetura.md)). Escopos diferentes: aquilo é medição contínua, isto é
narrativa (markdown → análise → e-mail).

## 8. Caminho alternativo: síntese sem API key (`gerar_relatorio_manual.py`)

> Decisão registrada em [`docs/decisoes.md`](decisoes.md), 2026-09-20.

`ia.py` chama a API da Anthropic diretamente — exige uma `ANTHROPIC_API_KEY` **própria**, com
cobrança separada da assinatura do Claude usada no Claude Code (são dois produtos, dois
faturamentos). Enquanto o dono não tem essa chave, existe um segundo entrypoint,
`gerar_relatorio_manual.py`, que pula só a etapa da
API:

```
plants/<plant_id>.md ──► ficha.py (mesma extração) ──► [Claude Code escreve a síntese
                                                          na própria conversa, no formato
                                                          de RespostaIA — ver modelos.py]
                                                                  │
                                                                  ▼ (JSON)
                                          gerar_relatorio_manual.py <plant_id> <resposta.json>
                                                                  │
                                          estado.py + pdf.py + enviar_email.py (idênticos)
```

Tudo depois da síntese (persistir estado, montar PDF, mandar e-mail) é o **mesmo código** dos
dois caminhos — só a origem do JSON muda. Uso: `--sem-email` gera o PDF e salva o estado sem
tentar enviar (útil enquanto `config.local.json` não estiver pronto).

**Por que isto é uma tensão, não só uma troca de fornecedor.** O desenho do §1 existe para
manter o "revisor" enxuto — só vê a síntese anterior + o que mudou, não o histórico inteiro
nem o resto da conversa. No caminho manual, quem escreve a síntese é o Claude Code **dentro**
de uma sessão que já pode ter lido muito mais contexto do que isso (esta ficha inteira, outras
plantas, memória). Para uma rodada isolada de teste isso não é problema (não há síntese
anterior a enviesar); se virar o padrão de uso recorrente, o isolamento de contexto que o
desenho original buscava deixa de valer. Também **não automatiza** — sempre depende de uma
sessão ativa do Claude Code, diferente do caminho via API, que roda sozinho.

**Plano do dono (ainda não implementado, só registrado):** com um token da API do Gemini, montar
um harness de teste que gera o mesmo relatório pelos dois caminhos — Claude aqui na sessão
(caminho manual) vs. uma chamada à API do Gemini (a escrever) — e itera no prompt do lado
Gemini até os resultados ficarem parecidos com o que o Claude produz aqui **e** aprovados pelo
dono. Se isso avançar, é candidato a um terceiro arquivo (`ia_gemini.py` ou similar), reaproveitando
o mesmo `modelos.py`/`RespostaIA` como contrato — os dois já são intercambiáveis com
`gerar_relatorio_manual.py` hoje.
