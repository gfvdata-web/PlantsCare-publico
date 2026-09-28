# Prompt para abrir em nova conversa — P29 (harness Claude × Gemini)

> Cole o bloco abaixo numa conversa nova do Claude Code, na raiz do projeto PlantsCare.
> Depois de implementado, apagar este arquivo e resolver a P29 em
> [`PROJETO.md`](../PROJETO.md) §7 + registrar a decisão em
> [`docs/decisoes.md`](decisoes.md).

---

Projeto PlantsCare. Quero implementar a **P29** (ver `PROJETO.md` §7 e
`docs/relatorio-ia.md` §8): um harness de teste que compara dois caminhos de geração do
relatório de IA (`relatorios/`) para a mesma planta — o caminho manual já existente
(Claude Code escrevendo a síntese dentro da própria sessão) contra uma chamada nova à
API do Gemini — e itera no prompt do lado Gemini até o resultado ficar parecido com o
que o Claude produz **e** aprovado por mim.

## Contexto que você precisa ler antes de propor qualquer coisa

1. `docs/relatorio-ia.md` inteiro — especialmente §8, que já registra esta tensão e o
   plano.
2. `relatorios/modelos.py` — contrato `RespostaIA` / `SinteseAtualizada` / `Relatorio`
   (Pydantic). É o formato de saída que os dois caminhos (Claude e Gemini) precisam
   produzir, sem alteração.
3. `relatorios/ia.py` — o caminho via API da Anthropic hoje: `SISTEMA` (prompt) +
   `_montar_texto_usuario` (como a ficha vira texto) + chamada `client.messages.parse`
   com `output_format=RespostaIA`. É a referência de "o que o Claude recebe e como".
4. `relatorios/gerar_relatorio_manual.py` e `relatorios/ficha.py` — o caminho manual
   (Claude Code na sessão escreve o JSON de `RespostaIA` à mão) e a extração de dados da
   ficha (`entradas_novas`, `cabecalho`, `pendencias_abertas`, fotos "de perto").
5. `docs/decisoes.md` (2026-09-20) — decisão que registrou o caminho manual e esta P29.

## O que já está decidido (não reabrir sem motivo)

- Modelo Claude Opus 5 (`claude-opus-5`) já é a referência de qualidade — o Gemini é o
  lado que precisa ser afinado até chegar perto, não o contrário.
- O contrato de saída é `RespostaIA` (`relatorios/modelos.py`) — os dois caminhos
  precisam preencher exatamente esses campos, sem inventar campo novo.
- Fotos de entrada: só as marcadas como "de perto"/"detalhe" na legenda, nunca a galeria
  inteira (mesma regra do caminho Claude — ver `docs/relatorio-ia.md` §3).
- Token da API do Gemini é meu, ainda não gerado/configurado nesta máquina — primeiro
  passo prático é eu criar a chave e você me dizer onde colocá-la (env var, não em
  arquivo do repo, mesmo padrão de `ANTHROPIC_API_KEY`).
- Isto é uma ferramenta de teste/iteração, não substitui `gerar_relatorio_manual.py` nem
  `gerar_relatorio.py` enquanto eu não aprovar o resultado do lado Gemini.

## O que preciso que você faça

1. Proponha o desenho do harness antes de codar — como ele roda (script novo em
   `relatorios/`, ex. `harness_comparacao.py`?), o que ele recebe (`plant_id`), o que ele
   produz (os dois `RespostaIA` lado a lado, de algum jeito eu conseguir comparar — texto
   no terminal, dois PDFs, diff?).
2. Escreva um módulo `ia_gemini.py` (ou nome equivalente) em `relatorios/`, paralelo a
   `ia.py`, reaproveitando `modelos.py`/`RespostaIA` como contrato de saída, e o mesmo
   `_montar_texto_usuario`/extração de `ficha.py` como entrada — não duplicar a lógica de
   montagem do prompt de usuário, só a chamada ao provedor e o prompt de sistema (que vai
   precisar de ajuste iterativo específico para o Gemini).
3. Rode o harness numa planta real (peça para eu escolher qual, ou sugira uma com
   histórico rico o bastante pra ser um teste justo) e me mostre os dois resultados lado
   a lado para eu avaliar.
4. Itere no prompt de sistema do lado Gemini comigo até eu aprovar — não decida sozinho
   que "ficou bom", esse critério é meu.
5. Ao final (só se e quando eu aprovar), registre a decisão em `docs/decisoes.md`, feche
   a P29 em `PROJETO.md` §7, e me pergunte se `ia_gemini.py` deve virar um terceiro
   caminho oficial do `/relatorio-plantas` ou continuar só como ferramenta de
   comparação.

## Regras do projeto que se aplicam aqui

- Histórico é append-only (`PROJETO.md` §6) — nada de reescrever `docs/decisoes.md` ou
  fichas de planta, só adicionar.
- Não gastar minha cota da API do Gemini/Anthropic sem eu saber — me avise antes de
  rodar em lote ou em múltiplas plantas.
- Nenhuma chave de API em arquivo versionado.
