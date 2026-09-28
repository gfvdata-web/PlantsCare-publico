# Aceroleira — `aceroleira-01`

> **Espécie:** *Malpighia emarginata* (acerola)
> **Regime:** `varanda-fruteira` (ver [`docs/regimes.md`](../docs/regimes.md))
> **Local:** varanda — **local A** (_coordenadas omitidas_), 6h+ de
> sol direto, aberta à chuva. ⚠️ Gerenciamento **separado** da varanda da
> `jabuticabeira-hibrida-01` (local B) — confirmado 2026-08-02, ver P23 em
> [`docs/decisoes.md`](../docs/decisoes.md).
> **Estado:** 🟢 **recuperação avançada, copa seguindo cheia** (checagem 2026-09-20) · vaso
> ~25–34 L · sensor `hhcc-01` instalado e confirmado por foto · **novo(s) botão(ões)/flor
> pequena observado(s)** perto do centro do vaso (🟡 hipótese) · líder **ainda não** escolhido
> nem amarrado ao tutor · estilização em pausa (dono pediu) · **Forth Frutas meia dose
> aplicado em 2026-09-18** (checagem de drenagem antes não confirmada)
> **Próxima ação:** (1) **remover botão/flor observado em 20/09** (pinçar) → (2) **escolher e
> amarrar o líder** ao tutor de bambu → (3) confirmar com o dono se a drenagem foi checada
> antes do adubo de 18/09 → (4) estilização parada por pedido do dono → (5) observar sinal de
> estresse térmico na próxima foto (pico de 44,4°C no substrato em 21/09, ver histórico
> 2026-09-28)
> **Última atualização:** 2026-09-28

---

## 1. Identificação

| Campo | Valor |
|---|---|
| `plant_id` | `aceroleira-01` |
| Origem | **Enxertada**, comprada em viveiro |
| Data de aquisição | ⚠️ não informada |
| Altura atual | **~50 cm** — informado pelo dono em 2026-08-30 (não medido com trena). Responde **P14** |
| Vaso (⌀ × altura) | **38 cm ⌀ × 30 cm** — transplante em 2026-08-30 (antes: 20 × 18 cm, ver histórico) |
| Volume do vaso | **~25–34 L** ⚠️ (34 L se cilíndrico; ~25–30 L por ser cônico/arredondado) — antes ~4–5,7 L |
| Substrato | **Reaproveitado integralmente do vaso anterior** (torrão intacto, sem trauma de raiz) + complemento de terra nova. Montagem 2026-08-30: pedras de argila expandida no fundo → manta → terra. ⚠️ foto da terra pendente |
| Exposição solar | 6h+ de sol direto |
| Exposição à chuva | **Sim**, direta |

## 2. Requisitos da espécie

⚠️ Valores de literatura, a calibrar com o histórico real.

| Parâmetro | Alvo | Observação |
|---|---|---|
| DLI | 25–40+ mol/m²/dia ⚠️ | **Sol pleno obrigatório.** Na sombra vegeta e não frutifica. Confirmado por
UF/IFAS ([Growing Barbados Cherry in Florida](https://blogs.ifas.ufl.edu/stlucieco/2025/08/20/growing-barbados-cherry-in-florida/), 2026-09-28): "full sun for maximum flowering and fruit production" |
| Água | Regular | **Tolera seca curta bem melhor que a jabuticaba.** Estresse hídrico leve seguido de chuva costuma **induzir floração**. UF/IFAS: rega 2–3×/semana na fase de estabelecimento; planta madura moderadamente tolerante à seca, mas floração/frutificação respondem à rega regular em período seco |
| pH | 5,5–6,5 ⚠️ / 6,0–7,0 (UF/IFAS) | Bem mais tolerante que a jabuticaba. Duas fontes de literatura, faixas próximas — não verificado localmente (sem medição de pH no projeto, ver `docs/medicoes.md` §4) |
| Substrato | Arenoso bem drenado + matéria orgânica | UF/IFAS: solo arenoso com composto/casca de pinus incorporado melhora estrutura e retenção — combina com a montagem já feita (argila expandida + manta + terra, ver histórico 2026-08-30) |
| EC / nutrição | Exigente, mas **sem alvo numérico confiável em µS/cm crus** | Responde muito a adubação. Boro e cálcio importam para o fruto. **Adubo em casa: Forth Frutas 12-05-15 + micros** (rótulo lido em 2026-08-20). UF/IFAS (quantidade/frequência): planta jovem ¼ lb a cada 2 meses; planta madura 2–4 lb por aplicação, 3×/ano, até ~15 lb/ano — não convertido para este projeto (adubo diferente, medida em L de vaso, não lb). **Nutrientes lixiviam rápido em vaso** — ver §4 abaixo |
| **Drenagem** | **Exige** | Encharcamento → problema radicular |
| Vaso p/ frutificar | **30–50 L** ⚠️ | Atual: **~25–34 L** desde o transplante de 2026-08-30 — já dentro/na borda da faixa |
| Horizonte de fruto | 1–2 anos (enxertada) ⚠️ | 3–5 safras/ano quando estabelecida |

**Fontes consultadas em 2026-09-28** (pesquisa motivada por interpretar o histórico do
`hhcc-01`, ver §4): [UF/IFAS — Growing Barbados Cherry in Florida](https://blogs.ifas.ufl.edu/stlucieco/2025/08/20/growing-barbados-cherry-in-florida/) · [UF/IFAS — CIR 1092/SS117, EC de substrato de vaso](https://ask.ifas.ufl.edu/publication/SS117) · [Nature Hills — Container Citrus Tree Fertilizer Guide](https://naturehills.com/blogs/garden-blog/understanding-container-citrus-tree-fertilization) (citros como proxy de manejo em vaso, não da espécie). ⚠️ Nenhuma fonte deu **alvo numérico de EC** específico para acerola — universidades usam método de laboratório (extrato de pasta saturada, dS/m), incompatível com a leitura crua de sensor barato (ver `docs/medicoes.md` §4).

⚠️ **Regime de rega oposto ao da jabuticabeira.** As duas estão na mesma varanda mas **não
podem compartilhar calendário de rega**: uma não tolera secar, a outra se beneficia de seca
curta. Esta é uma das primeiras conclusões acionáveis do projeto.

**Chuva direta é ambígua para esta planta:** chuva prolongada sem drenagem excelente vira
problema radicular. Vaso pequeno + chuva direta = atenção redobrada ao dreno.

## 3. Meta atual

🔓 **Período de adaptação encerrado em 2026-08-20** — brotação nova confirmada por foto, no
dia 18 dos 28 previstos. O critério era a brotação, não a data. Adubo e poda de madeira morta
liberados; **poda de formação e transplante seguem pendentes**. Ver histórico.

Depois disso: **crescer forte, não frutificar.** Mesmo com o vaso agora adequado (~25–34 L
desde o transplante de 2026-08-30), a planta acaba de passar por **poda relativa + transplante
no mesmo dia** e está com área foliar muito reduzida — forçar fruto agora a consumiria. A meta
imediata é **recompor copa e estrutura**. A poda de **formação** segue adiada até a copa
encher (P17); o ajuste leve de condução já foi feito junto com a poda de 2026-08-30.

Consequência para o sistema: alertas de indução floral e de nutrição para fruto **não se
aplicam** a esta planta por enquanto. O que interessa medir é água e estresse.

## 4. Equipamentos instalados

| Equipamento | Desde | O que mede | Ficha |
|---|---|---|---|
| `hhcc-01` | 2026-09-17 ⚠️ | Umidade, EC, luz, temp. — dado cru confirmado via nRF Connect em 2026-09-20 (1ª leitura); mais leituras pendentes (Objetivo 1) | [`equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md) |

## 5. Pendências

- [x] ~~**Medir a altura da planta** (P14)~~ → **~50 cm** informado em 2026-08-30. Falta
      confirmar com trena.
- [ ] Registrar o substrato → **parcial**: terra reaproveitada + argila expandida + manta
      (2026-08-30). Falta a foto da terra e a composição da terra nova.
- [x] ~~**Reavaliar as folhas amarelas**~~ → **resolvido**: em 2026-09-07 a folhagem nova está
      verde e sã; era senescência pós-estresse, o cenário benigno.
- [ ] **Reavaliar a retomada dos brotos** após o transplante — refotografar em ~1 semana
      (2026-09-06) e ~3 semanas (2026-09-20), mesmo enquadramento.
- [x] ~~**Responder P15 (transplante)**~~ → feito em **2026-08-30** (ver histórico).
- [x] ~~**Fotografar o rótulo do Forth Frutas**~~ → **12-05-15 + micros**, registrado em
      2026-08-20. Produto aprovado para a meta atual; não comprar outro adubo.
- [x] ~~**Definir e comprar o vaso intermediário** (~15–20 L)~~ → **superada**: o dono
      transplantou direto para **~25–34 L** em 2026-08-30, pulando o intermediário. Ver
      histórico e **P25** em [`../PROJETO.md`](../PROJETO.md).
- [x] ~~**Salvar as fotos em disco**~~ → feito: `plants/fotos/aceroleira-01/AAAA-MM-DD-N.jpg`.
- [ ] **Fixar um enquadramento de referência** para a série fotográfica (mesmo ponto, mesma
      hora). As fotos de 02/08, 20/08 e 30/08 estão em ângulos diferentes.
- [ ] **Verificar drenagem do vaso novo** — muito substrato ainda sem raiz + chuva direta +
      espécie que exige dreno. Confirmar que a água escoa pelos furos e não empoça.
- [ ] Completar a terra nas bordas (ver histórico 2026-08-30) — **ainda não feito** nas fotos
      de 2026-09-03 e 2026-09-07; o vão terra↔parede continua visível.
- [x] ~~**O que é o plástico junto à borda do vaso**~~ → em 2026-09-07 dá para ver que é um
      **saco de podas/resíduo apoiado no parapeito**, não filme colado no vaso. Sem risco
      térmico. Pode remover por organização, mas não é urgente.
- [ ] **Reavaliar o dieback de ponta** — sem close de ponta na foto de 2026-09-17 para
      confirmar; pedir esse close na próxima série.
- [ ] **Remover flores/botões florais** — a de 2026-09-17 já é flor aberta, não só botão.
      Pinçar na axila sempre que aparecer, até a copa encher. A meta é copa, não fruto.
      **2026-09-20:** novo(s) botão(ões)/flor pequena observado(s) de novo perto do centro do
      vaso — mesmo padrão recorrente, pinçar na próxima visita.
- [x] ~~**O que é o objeto verde-claro fincado na terra**~~ → **resolvido**: é o `hhcc-01`,
      reinstalado aqui em ~2026-09-17 (veio da jabuticabeira). Ver §4 e
      [`../equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md).
- [ ] **Eleger e amarrar o líder** — **em pausa a pedido do dono** (2026-09-17). Retomar
      quando ele quiser voltar a falar de estilização (P17). **2026-09-20:** tutor de bambu
      segue visível sem nada amarrado — confirma que a pausa continua.
- [ ] **Captura crua via nRF Connect** (Objetivo 1) — 🟡 **em andamento**: 1ª leitura feita em
      2026-09-20 (22,2 °C / 4191 lux / 26% / 298 µS/cm), faltam mais 4 em horários diferentes.
      Ver `equipamentos/hhcc-01.md` (2026-09-20) e **P26** em [`../PROJETO.md`](../PROJETO.md).
- [ ] **Checar drenagem/encharcamento** — pendência de 2026-09-17, era para ser antes do adubo.
      **O adubo já foi aplicado em 2026-09-18** (comentário do dono, 2026-09-20) sem confirmação
      de que a checagem tenha sido feita antes. Perguntar ao dono; se não foi, checar agora mesmo
      assim — a chuva/frio já dura ~3 semanas segundo a nota de clima de 2026-09-20 (mais longa
      que as "2 semanas" registradas em 17/09).
- [x] ~~**Prints do app do sensor pós-adubo**~~ → ✅ **fechado 2026-09-28**: 11 dias
      processados (14–24/09), cobrindo antes e depois do adubo de 18/09. **EC salta de
      ~263 µS/cm (véspera) para 725 µS/cm (dia da aplicação) e decai gradualmente nos dias
      seguintes** — assinatura numérica clara do Forth Frutas agindo. Detalhe completo em
      [`../docs/historico-sensor-app.md`](../docs/historico-sensor-app.md) (entrada
      2026-09-28, "8 dias processados de uma vez").

---

## 6. Histórico

> **Append-only.** Entrada nova sempre embaixo. Para corrigir algo, criar entrada nova
> referenciando a anterior.

### 2026-08-02 — Cadastro inicial (dado estimado)

**Observado:** aceroleira enxertada, na varanda, vaso informado inicialmente como
20 cm ⌀ × 50 cm de altura (~11 L). Relato de que não havia sintomas.

**Concluído:** vaso apertado para frutificar, mas aceitável para crescer.

> ⚠️ **Esta entrada foi corrigida pela entrada seguinte.** Tanto o vaso quanto o "sem
> sintomas" estavam errados. Mantida no registro para preservar o histórico do erro.

---

### 2026-08-02 — Correção por fotos: vaso menor e folhas amarelas

**Observado:** fotos do vaso real anexadas pelo dono.

**Correção 1 — vaso.** O vaso é **20 cm ⌀ × 18 cm de altura**, não 50 cm. A altura anterior
era estimativa, agora substituída por medição direta.

| | Antes (estimado) | Agora (medido) |
|---|---|---|
| Vaso | 20 ⌀ × 50 cm | **20 ⌀ × 18 cm** |
| Volume | ~11 L | **~4–5,7 L** |
| Veredito | 🟡 apertado | 🔴 **muito subdimensionado** |

🔴 **Proporcionalmente, a acerola está pior que a jabuticabeira.** ~4–5,7 L contra os
30–50 L recomendados para frutificar. O vaso serve para a planta jovem crescer, mas vai
precisar de **pelo menos um transplante intermediário** antes do volume final.

**Correção 2 — sintoma.** Há **amarelecimento e queda de folhas** perceptível nas fotos.
Isso **contradiz** o registro anterior de "nenhum sintoma", que foi dado antes destas fotos.

**Hipótese (🟡 não é conclusão):** não dá para diagnosticar à distância. Causas plausíveis,
sem ordem de probabilidade estabelecida:

- estresse de transplante ou de transporte recente;
- adaptação ao novo local (mudança brusca de luz);
- rega irregular — vaso de 4–5,7 L sob 6h+ de sol seca muito rápido;
- início de clorose (menos provável nesta espécie que na jabuticabeira, que é a sensível).

⚠️ **Nenhum sensor do Objetivo 1 distingue essas causas.** Luz, umidade, EC e temperatura
não separam estresse de transplante de deficiência nutricional. O que ajuda aqui é
**observação seriada com foto no mesmo enquadramento**.

**Ação:** marcado como **sintoma a observar**, não como baseline saudável. Estado da planta
alterado para 🟡.

**Pendente:** refotografar em alguns dias, mesmo enquadramento e mesma hora, e comparar.
Verificar se o amarelecimento é nas folhas **novas** (sugere ferro/pH) ou nas **velhas**
(sugere nitrogênio, ou simplesmente senescência normal após estresse).

---

### 2026-08-02 — Meta definida: crescer, não frutificar

**Concluído:** dado o vaso muito subdimensionado, a meta de curto prazo passa a ser
**estrutura da planta, não produção**. **Poda de formação cogitada.**

**Consequência para o projeto:** alertas ligados a indução floral e nutrição para fruto não
se aplicam a esta planta por enquanto. Registrado também em
[`docs/decisoes.md`](../docs/decisoes.md).

---

### 2026-08-02 — 🔒 Período de adaptação: 2 a 4 semanas de "não mexer"

**Concluído:** planta recém-adquirida, com folhas amarelas provavelmente por estresse de
transplante/transporte. Regime definido para as próximas **2 a 4 semanas**:

| | Fazer | Não fazer |
|---|---|---|
| Água | ✅ Regar normalmente | |
| Adubo | | 🚫 **Nenhum.** Fertilizar raiz estressada arrisca queimá-la sem benefício |
| Poda | | 🚫 **Nenhuma.** Poda + estresse de mudança ao mesmo tempo é demais |
| Troca de vaso | | 🚫 **Nenhuma**, apesar de subdimensionado |

**Critério para sair do período:** **brotação nova saudável**. Folha nova é a prova de que a
raiz voltou a funcionar. Só depois disso retomar adubação e reavaliar poda e transplante.

**Pendente:** P17 do PROJETO.md — quando exatamente fazer a poda de formação. Depende de
confirmar a brotação primeiro.

---

### 2026-08-20 — 🔓 Fim do período de adaptação: brotação confirmada

**Observado (foto do dono, ângulo novo — varanda do local A, fim de tarde):**

- **brotação nova visível** em vários ramos, folhas pequenas e verdes ao longo das hastes;
- ainda há **algumas folhas amarelas**, mas o dono relata que **"o que era pra cair já caiu"**
  — a queda estabilizou, não está progredindo;
- copa rala, com vários **ramos longos e finos** com folha concentrada nas pontas;
- alguns **ramos secos/acinzentados** aparentemente sem folha;
- vaso inalterado (20 cm ⌀ × 18 cm), tutor de madeira no vaso;
- sem sensor instalado — `hhcc-01` ainda não entregue (dentro da janela 11–27/08, **não é
  atraso**).

**Concluído — o 🔒 período de adaptação encerra hoje, no dia 18 dos 28 previstos.** O critério
de saída definido em 2026-08-02 era **brotação nova saudável**, não a data de ~30/08. Folha
nova é a prova de que a raiz voltou a funcionar. Poda e adubação saem da lista de proibições.

**Sobre o amarelecimento (🟡 segue hipótese, não conclusão):** na foto o amarelo aparece em
folhas **ao longo dos ramos**, não nas pontas de brotação nova. Isso é consistente com
**senescência normal pós-estresse** — o cenário benigno das hipóteses levantadas em
2026-08-02. Não é conclusivo à distância e nenhum sensor do Objetivo 1 separa essas causas.

---

### 2026-08-20 — Decisão: poda só de madeira morta; formação continua adiada (P17)

**Concluído:** as duas podas foram separadas, e só uma está liberada.

| Poda | Veredito | Motivo |
|---|---|---|
| **Ramos secos/mortos** | ✅ **fazer agora** | Madeira morta não fotossintetiza. Custo zero de área foliar, estresse mínimo |
| **Ramos longos vivos** (poda de formação) | 🚫 **adiar** | A área foliar está reduzida e são essas folhas que pagam a brotação nova. Além disso, formar a copa **antes** do transplante é refazer o trabalho depois |

**Como executar a parte liberada:** raspar a casca com a unha antes de cortar. Verde/úmido
embaixo = vivo, **deixar**. Marrom seco e quebradiço = morto, cortar rente ao ramo vivo, sem
deixar toco e sem ferir a casca do que permanece.

**Consequência para P17 (PROJETO.md §7):** respondida **parcialmente**. O timing da poda de
formação passa a ser **depois do transplante**, não antes — deixa de depender só da brotação
e passa a depender de P15 (transplante).

---

### 2026-08-20 — Decisão: adubação liberada, meia dose, condicionada ao transplante

**Contexto:** dono perguntou sobre aplicar **Forth Frutas**.

**Concluído:** adubação **liberada** (critério de saída da adaptação cumprido), com três
cuidados que o vaso subdimensionado impõe:

1. **Meia dose na primeira aplicação.** ~4–5,7 L de substrato dão pouquíssimo volume para
   diluir sal; erro de dose vira concentração alta rápido, e quem queima é a raiz recém-
   recuperada.
2. **Substrato úmido antes, rega logo depois.** Nunca em vaso seco.
3. **Longe do caule** — distribuir no anel externo, junto à borda do vaso.

⚠️ **Ressalva de formulação.** "Forth Frutas" é formulado para **produção de fruto**
(relativamente mais potássio), e a meta desta planta é **crescer, não frutificar**
(ver §3). Se o produto já está em casa, usar — não atrapalha o crescimento vegetativo, e
comprar outro violaria a **premissa 7** (expansão por dor medida). Se ainda for compra,
um formulado mais equilibrado/nitrogenado atende melhor a meta atual.
⚠️ **NPK do rótulo não verificado** — registrar quando o rótulo for fotografado.

**🔀 Condicional aberta — a ordem depende de P15 (transplante):**

| Cenário | O que fazer |
|---|---|
| Transplante nas próximas **3–4 semanas** | **Adubar depois dele** (2–3 semanas após). Substrato novo já traz nutriente; adubar às vésperas é desperdício |
| **Sem** transplante no horizonte | **Adubar agora**, meia dose |

⚠️ Vaso pequeno + **chuva direta** (§2) = lixiviação alta. O intervalo do rótulo tende a ser
otimista neste caso; observar resposta antes de encurtar por conta própria.

**Lembrete estrutural:** nem a poda nem o adubo resolvem o gargalo real, que é o **vaso**.
Nenhum sensor do projeto detecta vaso subdimensionado.

---

### 2026-08-20 — ⚠️ Correção: NPK real do Forth Frutas invalida a ressalva de formulação

> Corrige a entrada **"2026-08-20 — Decisão: adubação liberada, meia dose, condicionada ao
> transplante"** acima. A ressalva de formulação daquela entrada estava **errada** e é
> retirada. A regra da meia dose e a condicional do transplante **continuam valendo**.

**Observado:** dono anexou o rótulo do produto já comprado — **Forth Frutas 400 g**, R$ 17,50.

**Níveis de garantia (medido, do rótulo — não mais ⚠️):**

| Macro | % | Micro | % |
|---|---|---|---|
| Nitrogênio (N total) | **12** | Boro (B) | 0,06 |
| Fósforo (P₂O₅ total) | **5** | Cobre (Cu) | 0,05 |
| Potássio (K₂O sol. água) | **15** | Ferro (Fe) | 0,22 |
| Cálcio (Ca) | 1 | Manganês (Mn) | 0,1 |
| Magnésio (Mg) | 1 | Molibdênio (Mo) | 0,005 |
| Enxofre (S) | 13 | Zinco (Zn) | 0,20 |

**Correção.** A entrada anterior registrou o produto como "formulado para fruto,
relativamente mais potássio", e sugeriu considerar um formulado mais nitrogenado numa compra
futura. **Isso não se sustenta com o número real:** **12-05-15** é relação equilibrada, com N
em nível adequado para **crescimento vegetativo** — que é a meta desta planta (§3).

✅ **Veredito: o produto atende à meta atual. Não há motivo para comprar outro adubo**, agora
ou depois. Fecha também a pendência "fotografar o rótulo".

**Bônus relevante:** traz o pacote completo de micronutrientes + Ca e Mg. Se o amarelecimento
(🟡, ver 2026-08-02 e 2026-08-20) tiver **qualquer** componente nutricional, esta formulação o
endereça. Isso **não** confirma a hipótese nutricional — segue sem diagnóstico.

---

### 2026-08-20 — 🔀 Condicional resolvida: transplante em 1–3 semanas, adubo fica para depois

**Observado:** dono informou que o transplante deve acontecer em **1 a 3 semanas**.

**Concluído:** cai dentro da janela "3–4 semanas" da condicional aberta hoje mais cedo, logo
**adubar depois do transplante**. P15 deixa de travar a decisão. Sequência definida:

| # | Quando | O quê |
|---|---|---|
| 1 | **agora** | Remover **só a madeira morta** (teste da unha). Independe do resto e facilita o manuseio no transplante |
| 2 | **1–3 semanas** | **Transplante** |
| 3 | **2–3 semanas após o transplante** | 1ª aplicação do Forth Frutas, **meia dose** ⚠️ (metade do que o rótulo indicar para o diâmetro do vaso) |
| 4 | **depois disso** | Poda de formação, com a copa já cheia (P17) |

⚠️ **No dia do transplante: não misturar o granulado no substrato do buraco de plantio nem
junto às raízes.** É a causa mais comum de queima de raiz recém-mexida.

---

### 2026-08-20 — ⚠️ Alerta: não saltar direto para o vaso final de 30–50 L

**Concluído:** com o transplante virando concreto, registra-se o dimensionamento do vaso
**intermediário**, que é decisão de compra iminente.

🔴 **Saltar de ~4–5,7 L para 30–50 L de uma vez é contraindicado aqui.** O volume de
substrato sem raiz para consumi-lo permanece encharcado por muito mais tempo — e esta planta
**exige drenagem** e está **exposta à chuva direta** (§2). Combinação de risco radicular.

**Alvo do intermediário: ~15–20 L ⚠️** (aproximadamente 2–3× o volume atual). Número não
verificado — confirmar antes de comprar. Priorizar vaso com **furos de dreno generosos**.

---

### 2026-08-30 — Transplante + poda relativa executados no mesmo dia; leitura de status por foto

> Executa (com desvios) a sequência fixada em 2026-08-20. O dono compactou os passos 1–2 e
> antecipou parte do passo 4. Registrado como foi feito, não como estava planejado.

**Relato do dono:**

- **Poda relativa.** Muita coisa tinha secado. A planta está com **brotos minúsculos em quase
  toda a extensão**; alguns ramos foram cortados, a maioria não. O dono aproveitou para
  **mexer levemente na formação / condução** esperada para a varanda. Reconhece que "foi um
  trauma maior", mas acredita que a planta sobrevive e cresce bem nos próximos meses.
- **Transplante.** Replantada em vaso **38 cm ⌀ × 30 cm** (~25–34 L ⚠️ — 34 L se cilíndrico,
  ~25–30 L por ser cônico). Montagem: **pedras de argila expandida no fundo → manta → terra**.
  **Todo o substrato do vaso anterior foi reaproveitado, com o torrão intacto — sem nenhum
  trauma nas raízes.** Faltou completar terra nas bordas.
- **Altura atual: ~50 cm** (informada, não medida com trena) — responde **P14**.

**Observado (3 fotos do dono, varanda do local A, fim de tarde, planta molhada):**

- estrutura esparsa/esquelética: vários ramos longos e finos, a maioria sem folha, com
  **brotação minúscula distribuída ao longo das hastes e nas pontas** — condiz com o relato;
- na foto de perto de um corte de poda, **brotos verdes nascendo bem junto ao corte** — sinal
  de que as gemas abaixo do corte reagiram (bom);
- poucas **folhas amarelas** isoladas; fragmentos secos de folha/ramo sobre o substrato;
- superfície da terra **abaixo da borda e recuada da parede do vaso** — o vão que o dono
  mencionou;
- tutor de bambu no vaso; cachepô azul, molhado.

**Concluído / avaliação:**

- **Desvio do plano, assumido.** O roteiro de 20/08 era: madeira morta → transplante →
  (2–3 sem) adubo → (copa cheia) formação. O dono fez poda + ajuste de formação + transplante
  **de uma vez**. É justamente a combinação que as regras de adaptação evitavam — mas a planta
  **já tinha saído da adaptação em 20/08** (raiz ativa comprovada) e o **torrão foi preservado
  intacto**, o que reduz muito o risco em relação a fazer isso durante o choque inicial. Some-se
  a isso que os brotos **já estavam presentes** antes do corte. Prognóstico: **cauteloso e
  positivo**, recuperação mais lenta que sem poda.
- **O risco agora é área foliar × demanda.** Com pouca folha, a planta tem pouca fotossíntese
  para bancar ao mesmo tempo a recuperação da raiz nova e a abertura dos brotos. Atenuantes:
  raiz sem trauma, brotos já espalhados, vaso finalmente adequado.
- **P25 (vaso intermediário) fica superada pelos fatos.** O dono pulou o intermediário e foi
  direto para ~25–34 L, praticamente o volume final. O alerta de 20/08 (muito substrato sem
  raiz → encharcamento numa planta que exige dreno e pega chuva) **continua válido como ponto
  de observação** — mitigado pela camada de argila + manta e pelo torrão intacto ocupando
  parte do volume. Ver P25 em [`../PROJETO.md`](../PROJETO.md).

**Sobre "faltou terra nas bordas — melhor não colocar?" →  colocar, sim.**

- Um vão aberto entre a terra e a parede do vaso **seca o torrão pela lateral** e faz a água
  da rega **escorrer direto pelo vão** em vez de atravessar o substrato. Fechar é melhor.
- **Como:** completar com a mesma terra, preenchendo até **~2–3 cm abaixo da borda** (deixando
  a "boca" para a água), firmar de leve com os dedos.
- **Não fazer:** encostar terra no caule / enterrar mais fundo do que a planta já estava. O
  nível da superfície do torrão deve continuar o mesmo — subir a terra pelo tronco apodrece a
  base.

**Ação (próximas ~3 semanas — recuperação):**

1. **Completar a terra nas bordas** como acima.
2. **Só regar.** Substrato **levemente úmido, nunca encharcado** — deixar os primeiros ~3–5 cm
   quase secarem entre regas, mas sem deixar o torrão secar por completo (pouca folha = pouca
   reserva). Conferir que a água **escoa pelos furos**.
3. **Sem adubo** até os brotos endurecerem e confirmarem a raiz. Manter o plano: Forth Frutas
   12-05-15, **meia dose**, a partir de **~2026-09-13** (2–3 semanas pós-transplante) e **só
   se a brotação estiver visivelmente progredindo**.
4. **Sem mais poda.** A de formação continua adiada até a copa encher (P17).
5. **Opcional, 1–2 semanas:** meia-sombra à tarde (tela, ou afastar um pouco do sol pleno)
   para poupar as poucas folhas e os brotos novos enquanto a raiz reassenta. É realocação
   temporária, compatível com a premissa 5 (mede-se e realoca-se, não se controla o clima).
6. **Refotografar** em ~1 semana (06/09) e ~3 semanas (20/09), **mesmo enquadramento**.

**Estado:** 🟡 recuperação, a observar — reavaliar em ~1 semana. Não é baseline saudável nem
alarme; é uma planta se refazendo de um corte grande com a raiz preservada.

**Pendente:** ver §5. Foto da terra; confirmação da altura com trena; drenagem do vaso novo.

**Fotos:** _não publicadas._

---

### 2026-09-03 — Dia 4 pós-transplante: brotação progredindo; dieback nas pontas finas

> Reavaliação da recuperação iniciada em 2026-08-30. Adiantada em relação à foto de ~1 semana
> prevista (06/09) — o dono mandou 4 dias depois do corte. Recebida pelo canal novo de
> atualização (ver [`../docs/entrada-atualizacoes-planta.md`](../docs/entrada-atualizacoes-planta.md)),
> ainda no chat.

**Observado (3 fotos do dono, varanda do local A, fim de tarde, luz artificial):**

- estrutura **ainda esparsa/esquelética**, como esperado 4 dias após poda grande — muitos
  ramos longos e finos, a maior parte sem folha;
- **brotação claramente mais adiantada que no dia 30/08**: as folhas novas ao longo das hastes
  e nas pontas estão **maiores, mais abertas e mais numerosas** — no dia do corte eram
  "minúsculas". Foto de perto (`-3`) mostra pares de folha nova verde-claro em vários nós, com
  gemas ainda abrindo;
- **pontas de vários galhos finos secando** — extremidades marrom-claras, ressecadas, nos
  ramos mais finos (visível em `-2` e `-3`). Não há sinal de secamento descendo para madeira
  grossa;
- **1 folha/ramo morto** enrolado, marrom, num ramo à direita (`-2`);
- poucas folhas amarelas isoladas; alguns fragmentos secos sobre o substrato;
- **o vão terra↔parede do vaso continua lá** — a terra segue recuada e abaixo da borda; a
  ação "completar a terra" de 30/08 aparentemente ainda não foi feita;
- **algo plástico/transparente junto à borda do vaso** no canto superior de `-2` — não dá para
  dizer se é filme de embalagem, saco ou lixo;
- substrato escuro, aparenta úmido (não encharcado); sem mofo/alga/cogumelo na superfície;
- tutor de bambu; cachepô azul. Enquadramento **de novo diferente** dos anteriores.

**Concluído / hipótese (🟡 — diagnóstico por foto é hipótese):**

- **Sinal positivo dominante: a brotação está progredindo.** É a prova que importa de que a
  raiz preservada está sustentando o *flush*. Confirma o prognóstico "cauteloso e positivo" de
  30/08; a recuperação segue mais lenta que sem poda, mas no rumo certo.
- **Dieback de ponta nos galhos finos = provavelmente normal nesta fase.** Após um corte
  grande + realocação, a planta descarta as extremidades que não consegue bancar e concentra
  recurso nos brotos que pegaram. 🟡 **a observar**: preocupa só se avançar para ramos
  grossos, ou se a proporção de ponta seca aumentar muito entre fotos.
- **Rega:** não dá para medir por foto. Substrato aparenta úmido e sem encharcamento — manter
  o regime de 30/08 (deixar os primeiros ~3–5 cm quase secarem entre regas, sem deixar o
  torrão secar de todo; conferir que escoa pelos furos).
- **Nada aqui muda o plano.** Sem adubo até os brotos endurecerem; janela do Forth Frutas
  meia dose segue a partir de ~2026-09-13, condicionada à brotação continuar progredindo. Sem
  mais poda. Meia-sombra à tarde segue como opção.

**Ação:**

1. **Completar a terra nas bordas** — ainda pendente. Mesma instrução de 30/08: mesma terra,
   até ~2–3 cm abaixo da borda, firmar de leve, **sem encostar no caule nem subir o nível do
   torrão**.
2. **Conferir o plástico junto ao vaso** — se for filme/embalagem contra a parede, retirar.
3. **Só regar e observar.** Sem adubo, sem poda.
4. **Refotografar por volta de 2026-09-13 e 2026-09-20**, **mesmo enquadramento** (de
   preferência de dia) — comparar (a) tamanho/quantidade de folha nova e (b) se o dieback de
   ponta parou nas pontas ou avançou.

**Estado:** 🟡 recuperação, a observar — evolução no rumo esperado. Reavaliar em ~10 dias.

**Pendente:** ver §5 — completar terra; identificar o plástico; acompanhar dieback de ponta;
foto da terra; altura com trena; drenagem; enquadramento fixo.

**Fotos:** _não publicadas._

---

### 2026-09-07 — Dia 8: flush forte; possíveis botões florais; dono propõe 3 cortes de estilização

> Reavaliação da recuperação. **Fotos de dia** pela primeira vez — a série passa a ser
> comparável em cor a partir daqui.

**Observado (4 fotos do dono, varanda do local A, de dia):**

- **muita folha nova** distribuída por toda a estrutura — bem mais que em 03/09; o *flush* que
  era "brotos maiores" há 4 dias agora é folhagem verde-clara cobrindo a maioria dos ramos que
  tinham gema viva. A planta segue de estrutura aberta/esquelética (esperado — foi poda
  grande), mas claramente **refazendo copa rápido**;
- **dieback de ponta não avançou** — as pontas finas que estavam secando em 03/09 continuam
  só nas pontas, sem descer para madeira grossa. Confirma a leitura de 03/09 (descarte normal
  de extremidade);
- **possíveis botões florais** (o dono perguntou, fotos `-1` e `-2`): há **aglomerados de
  estruturas esféricas pequenas e pedunculadas em alguns nós axilares** — o formato bate com
  botão de flor de acerola (que nasce em cacho de 3–5 na axila da folha, no ramo novo), não
  com ponta de broto vegetativo. Não dá 100% de certeza por foto, mas é o mais provável;
- ainda o **vão terra↔parede** e o **saco plástico** na borda do vaso (agora dá para ver que
  é um saco com folhas/resíduo escuro dentro, apoiado no parapeito) — não é filme colado no
  vaso, então **não é problema térmico**; é só um saco de podas ali guardado;
- substrato escuro, aparenta úmido; sem mofo na superfície.

**Concluído / hipótese:**

- **Recuperação adiantada.** Dia 8 com flush cobrindo a planta é melhor que o esperado para
  poda relativa + transplante no mesmo dia. O prognóstico "cauteloso e positivo" pode ser
  relido como **positivo**. Raiz preservada + brotos pré-existentes explicam a velocidade.
- **Botões florais: remover.** A meta desta planta é **recompor copa, não florir/frutificar**
  (§3). Com área foliar ainda muito reduzida, deixar a planta gastar açúcar formando flor e
  fruto atrasa a recomposição da copa — o oposto do que se quer agora. É consistente com toda
  a linha de decisão da planta (2026-08-02 em diante). **Como:** beliscar/pinçar o cacho de
  botão com a unha, rente à axila, sem ferir a folha nem a gema vegetativa ao lado. É rápido e
  de baixo impacto. Repetir sempre que aparecer, até a copa encher.
  - ⚠️ A §2 já registra que **estresse hídrico leve + chuva induz floração** nesta espécie —
    o transplante + regas + chuva recente é exatamente esse gatilho. Esperado; não é sinal de
    problema.
- **Adubo:** com a brotação agora **firme** (não só "começando"), a janela do Forth Frutas
  12-05-15 **meia dose** a partir de ~13/09 está mantida. Substrato úmido antes, rega depois,
  no anel externo longe do caule. Não adubar no mesmo dia de remover muitos botões.

**Proposta do dono — 3 cortes de estilização (registrada, decisão em aberto):**

O dono quer fazer **3 cortes específicos** para "estilizar" a planta / direcionar a forma que
quer para a varanda. Reconhece que atrasa, mas avalia que fortalece o crescimento na direção
desejada. **Isto reabre a P17** (poda de formação), que estava fixada para "depois do
transplante, **com a copa já cheia**".

- **Posição do projeto (a discutir, não veto):** a regra "esperar a copa encher" existe porque
  poda de formação gasta reserva, e a planta está **reconstruindo** reserva agora, não com
  sobra dela. Cortar estrutura hoje custa área foliar que a recuperação está usando. **Porém**
  a proposta é de **3 cortes pontuais**, não desbaste geral — pode ser aceitável já, dependendo
  de **o que** é cortado.
- **O que falta o dono informar para fechar:** (1) **quais 3 ramos** — marcar numa foto (seta)
  ou descrever posição; (2) **espessura** de cada um; (3) **qual a forma-alvo** (líder único?
  taça? "pé alto"/tronco limpo + copa? arbusto baixo?). Sem a forma-alvo, "estilizar" não tem
  critério.
- **Provável veredito por tipo de corte** (a confirmar com as marcações):
  - ramo **fino, claramente errado** (cruzando, indo para dentro, brotando abaixo do ponto de
    corte antigo, competindo com líder) → **pode sair agora**, custo de folha baixo, mesma
    lógica que liberou "madeira morta" cedo;
  - ramo **médio/grosso** ou "tenho dúvida" → **esperar ~3–4 semanas**, até o flush atual
    endurecer (folha madura = reserva reconstruída). O atraso é pequeno e o risco cai muito.
- Enquanto não há marcação + forma-alvo, **não cortar nada estrutural**. Remover botão floral
  e madeira morta seguem liberados.

**Ação:**

1. **Remover os botões florais** (pinçar), e repetir a cada aparição.
2. **Completar a terra nas bordas** — ainda pendente.
3. **Forth Frutas 12-05-15, meia dose**, a partir de ~13/09 (não no mesmo dia da remoção de
   muitos botões).
4. **Cortes de estilização:** o dono marca os 3 ramos numa foto + diz a forma-alvo; aí a
   gente fecha corte a corte. Até lá, sem corte estrutural.
5. Refotografar ~2026-09-17 e ~2026-09-24, mesmo enquadramento, de dia.

**Estado:** 🟡→🟢 recuperação adiantada — flush forte, dieback contido. Reavaliar em ~10 dias
(ou antes, se vierem as marcações dos cortes).

**Pendente:** ver §5 — botões florais (novo); marcações dos 3 cortes + forma-alvo (novo);
completar terra; foto da terra; altura com trena; drenagem; enquadramento fixo. O "plástico na
borda" **fechado** (é saco de podas apoiado no parapeito, sem risco térmico).

**Fotos:** _não publicadas._

---

### 2026-09-07 — Sugestão de estilização (intervenção pequena agora)

> Complemento da entrada anterior — o dono pediu uma sugestão de forma, "pequena para a
> acerola agora". Proposta do assistente; **não executada**. Segue dependendo de confirmação.

**Forma-alvo sugerida: taça baixa / arbusto aberto.** 3–4 ramos principais partindo de baixo,
centro arejado, altura conduzida a ~1–1,3 m. Motivos: a estrutura atual **já não tem líder
central dominante** (vários ramos laterais, alguns quase horizontais), combina com o hábito
naturalmente espalhado da acerola, facilita a colheita e dá estabilidade a vento na varanda.
"Pé alto" (tronco limpo + copa) exigiria remover muita coisa agora e eleger um caule vertical
que hoje não existe — incompatível com "intervenção pequena" e com a planta em recuperação.

**O que dá para fazer agora — só madeira fina (≤ um lápis), 2–3 cortes:**

1. **Botões florais** — remover (pinçar na axila). Já registrado.
2. **Brotos abaixo do ponto de enxertia**, se houver — remover rente ao tronco. É porta-enxerto
   ("ladrão"); se deixar, rouba vigor e pode dominar a copa enxertada.
3. **1 ramo cruzando ou crescendo para dentro do centro** — remover na origem.
4. **1–2 dos ramos-chicote mais longos e pelados** — encurtar ~⅓, cortando logo **acima de uma
   folha/gema virada para fora**. Converte comprimento em ramificação/densidade — é o efeito
   "fortalece na direção que quero" que o dono intuiu.
5. **Pinçar a ponta** dos brotos novos depois de 3–4 pares de folha, à medida que alongam —
   ferramenta de formação mais suave, adequada a planta em recuperação. Não conta como "corte".

**Não fazer agora:** nada de madeira média/grossa, nenhum rebaixamento de altura. Isso fica
para **outubro**, com o flush endurecido (P17). Tesoura limpa e afiada; **desinfetar antes de
passar para a pitanga** (possível fungo lá).

---

### 2026-09-07 — Refino da forma-alvo: dono quer mais vertical ⚠️ supera "taça baixa/aberta"

> Dono respondeu à sugestão anterior. Esclareceu que quer a acerola crescendo **mais para cima
> que para os lados**, mas **sem necessariamente limpar o centro**, e comentou que "é difícil
> visualizar a acerola porque ela espalha muito". Isto **inverte** a forma-alvo "taça
> baixa/aberta" da entrada anterior (taça é larga e espalhada — o oposto do pedido).

**Realidade da espécie:** *Malpighia emarginata* tem hábito **naturalmente espalhado/pendente**
— ramos finos e flexíveis que arqueiam para fora e para baixo. Dá para enviesar para cima, mas
é **manejo contínuo**: a planta sempre vai querer abrir. É por isso que "espalha muito e é
difícil de visualizar" — é a cara da espécie, não um defeito desta planta.

**Forma-alvo revisada: eixo central / arbusto colunar.** Mais alto que largo, denso desde
baixo (o centro **não** precisa ficar limpo), copa mais estreita que o natural.

**Como conduzir (começa agora, reforça em outubro):**

1. **Eleger 1 líder** — o caule mais vertical e forte. Amarrar ao tutor de bambu na vertical
   (fita macia, em "8", sem estrangular) e ir reamarrando a extensão conforme sobe.
2. **NÃO pinçar a ponta do líder** — deixar a dominância apical puxar para cima. ⚠️ Ajusta a
   entrada anterior: pinçar só os **ramos laterais**, nunca o líder.
3. **Cortar para gema virada para cima/dentro** nos ramos que quiser subir — não para fora.
4. **Encurtar mais forte os ramos horizontais/para fora** (½ ou mais); deixar os verticais
   mais longos. Desloca massa e energia para cima.
5. **Reduzir o nº de ramos principais para conseguir enxergar a planta:** definir 1 líder +
   3–4 ramos estruturais, **marcar com fita colorida antes de cortar**, tratar todo o resto
   como subordinado (encurtável a qualquer momento). Técnica direta contra o "não consigo
   visualizar".

**Item 3 da sugestão (ramo cruzando / para o centro): NÃO é crítico agora.** Só remover já se
os dois ramos estiverem **se esfregando** (ferida = porta de doença). Senão, reavaliar em
outubro. Como o dono não quer limpar o centro, ramo indo para dentro que não atrita **pode
ficar**.

**Cortes de agora, versão final:** (1) botões florais · (2) brotos de porta-enxerto, se
houver · (3) **eleger e amarrar o líder** · (4) encurtar ~⅓ de **1–2 chicotes laterais**
(para gema externa **ou superior**, conforme a direção desejada) — **o líder não** · (5)
pinçar as pontas dos **laterais** novos conforme alongam. Item "ramo cruzando" adiado p/
outubro salvo atrito visível.

**Aguardando do dono para desenhar o esquema:** confirmação da forma **eixo central**, e —
de preferência — uma foto com o **candidato a líder** apontado (ou o assistente sugere pela
foto de 07/09).

---

### 2026-09-17 — Dia 18: copa bem mais cheia; flor aberta; sem líder emergido; objeto não identificado

> Chegou pelo Remote Control (celular), sem legenda — plantas identificadas pelo enquadramento
> (vaso azul + grade + rua = acerola; vaso com pedra branca = pitanga, ver ficha dela).

**Observado (3 fotos do dono, varanda do local A):**

- **canopy visivelmente mais cheia** que em 07/09 — a planta está claramente recompondo copa,
  ritmo bom;
- **1 flor rosa aberta** (5 pétalas, centro amarelo — bate com *Malpighia emarginata*), não é
  mais só botão. Há também uma **estrutura amarela pequena** ao lado, na mesma foto — não dá
  para afirmar o que é (fruto novíssimo? outra flor num ângulo diferente? inseto?). 🟡 não
  identificado;
- a planta ainda **não tem um caule claramente mais vertical/dominante** que os outros — a
  base mostra vários caules saindo próximos, de espessura parecida (visível na foto de perto
  da base). **Nenhum líder emergiu naturalmente ainda** — a escolha vai ter que ser deliberada,
  não "esperar aparecer";
- tutor de bambu presente, **ainda sem nada amarrado nele**;
- **objeto verde-claro, em formato de cápsula numa haste, fincado na terra**, perto da base —
  **não identificado**. Não é o `hhcc-01` (esse está na `jabuticabeira-hibrida-01`, no local B — ver `equipamentos/hhcc-01.md`). Pode ser sensor/medidor novo, etiqueta/marcador de
  viveiro, ou outra coisa — **perguntar ao dono antes de registrar como equipamento**;
- não foi possível reavaliar o dieback de ponta nem o vão de terra na borda nesta série —
  enquadramento mais aberto, sem o close que mostrava isso.

**Concluído / hipótese:**

- **Recuperação segue no rumo certo**, agora mais avançada que "adiantada" — copa
  substancialmente maior em 10 dias.
- **A flor aberta reforça a recomendação de 07/09/09-07: remover.** Ainda não virou fruto, dá
  para agir. Mesma lógica: pouca copa ainda para bancar fruto sem atrasar a recomposição.
- **Escolha do líder vira ação deliberada, não observação.** Como a planta não está
  destacando um caule por conta própria, o dono vai precisar **escolher** um dos caules da
  base (o mais grosso/vertical) e comprometer-se com ele — amarrando no tutor — em vez de
  esperar a planta decidir. Sem essa escolha, a estilização para eixo central não avança.

**Ação:**

1. **Remover a flor** (e a estrutura amarela, se for outra flor/broto floral — **não remover
   se parecer inseto**, aí é só observar).
2. **Escolher o líder:** o dono olha a base e escolhe o caule mais grosso/vertical; amarra
   no tutor de bambu (fita macia, em "8"). Sem essa escolha, os próximos cortes de estilização
   ficam parados.
3. **O que é o objeto verde na terra?** — perguntado ao dono; sem resposta, tratar como
   desconhecido (não mexer nele).
4. Adubo: janela já aberta (~13/09) — aplicar Forth Frutas meia dose se ainda não aplicado.
5. Refotografar em ~10 dias, incluindo **um close da base/tutor** (pra ver o líder escolhido)
   e **um close de ponta de ramo** (pra retomar o acompanhamento do dieback).

**Estado:** 🟢 recuperação avançada — copa cheia, only a estilização ainda não saiu do papel.

**Pendente:** ver §5 — objeto verde não identificado (novo); escolher e amarrar o líder;
remover a flor; completar terra nas bordas; foto da terra; altura com trena; drenagem.

**Fotos:** _não publicadas._

---

### 2026-09-17 — Complemento: objeto identificado (é o `hhcc-01`); adubo liberado; nota de clima

> Respostas do dono à entrada anterior, no mesmo dia.

**Observado/informado pelo dono:**

- **O objeto verde na terra é o sensor `hhcc-01`**, que veio da `jabuticabeira-hibrida-01`
  (local B) para esta planta. Data exata e motivo não detalhados. Registrado em §4 e em
  [`../equipamentos/hhcc-01.md`](../equipamentos/hhcc-01.md);
- Discussão de estilização (líder, cortes) **pausada por pedido do dono** — não é prioridade
  agora;
- dono avalia que a planta "cresceu e se estabilizou bem", e pergunta se pode adubar;
- **clima:** últimas **2 semanas de muita chuva, frio e menos sol que o normal** — dono aponta
  que isso pode ter retardado o crescimento (relevante também para a pitanga, ver a ficha
  dela). ⚠️ Relato do dono, não medido — o projeto não tem ainda a integração Open-Meteo
  (Fase 2) para confirmar objetivamente.

**Concluído:**

- **Sensor:** mistério resolvido, sem mais ação aqui — ver histórico do próprio equipamento
  para a análise completa (inclui a oportunidade de finalmente fazer a captura crua/Objetivo 1
  agora que o sensor está perto do dono).
- **Adubo: sim, pode aplicar Forth Frutas 12-05-15 meia dose.** Diferente da leitura da
  pitanga (uma única foto ambígua, ver a ficha dela hoje), a recuperação da acerola foi
  confirmada em **três check-ins seguidos** (07/09 flush, 17/09 copa bem mais cheia) — sinal
  robusto, não pontual. A janela (~13/09, 2–3 semanas pós-transplante) já abriu.
- **Mas o clima muda o *como*, não o *se*:**
  1. **Aplicar num intervalo sem chuva forte** — adubo em substrato encharcado/sob temporal
     lixivia (escoa) antes da raiz absorver, desperdiçando a dose.
  2. **Esperar resposta mais lenta que o normal** — frio reduz a atividade da raiz; não é
     motivo para repetir a dose antes do previsto.
  3. **Checar drenagem antes** — depois de 2 semanas de chuva, confirmar que a água **não**
     está empoçada no cachepô nem no pratinho. Vaso encharcado + fertilizante junto é pior
     combinação que qualquer um dos dois isolado, e é justamente o risco que a ficha já
     vinha observando desde o transplante (substrato sem raiz + exige dreno + chuva direta).
  4. Continua: meia dose, no anel externo, longe do caule, substrato já não muito seco (o que
     não deve ser problema agora).

**Ação:** checar drenagem/empoçamento → se ok, aplicar meia dose na próxima janela sem chuva
forte. Manter a remoção da flor aberta. Estilização segue pausada.

**Pendente:** ver §5 — drenagem/encharcamento (novo, prioridade); captura crua nRF Connect
(oportunidade nova); demais itens sem mudança.

---

### 2026-09-20 — 1ª leitura crua do `hhcc-01`: primeiro dado numérico real da planta

> Executa o Objetivo 1 do projeto (ver `docs/objetivo-1-captura-celular.md`) nesta planta pela
> primeira vez. Sessão ao vivo, dono com o celular ao lado do vaso.

**Observado (leitura direta do sensor, nRF Connect, ~13:57):**

| Campo | Valor |
|---|---|
| Temperatura do substrato | 22,2 °C |
| Luz | 4191 lux |
| Umidade do substrato (~5 cm) | 26 % |
| Condutividade (EC) | 298 µS/cm |
| Bateria do sensor | 95% (firmware 93.3.6) |

**Contexto para interpretar:** vem **3 dias depois** do relato de "2 semanas de chuva
forte/frio" (entrada 2026-09-17). Se a chuva tivesse encharcado o substrato, esperaria-se
umidade alta; 26% não é um número alto isoladamente — mas a ficha já registra (§2) que esta
leitura **não é VWC calibrado**, só tendência/ciclo, e a sonda pega só os ~5 cm superficiais,
que secam mais rápido que a zona radicular funda. 🟡 **Não dá para concluir se está seco ou
não só com este número** — falta comparar com uma leitura logo após rega/chuva e outra em dias
de seca, que é exatamente o próximo passo do critério de sanidade cruzada (§7 do objetivo).

**Sanidade cruzada parcial:** luxímetro do celular (app de câmera, apontado para cima ao lado
do sensor) leu 8317 lux contra os 4191 lux do sensor — mesma ordem de grandeza, condizente com
ângulos/calibração diferentes (ver detalhe em `equipamentos/hhcc-01.md`, 2026-09-20). Não é uma
validação exata, só descarta leitura zerada/absurda.

**Concluído:** é o **primeiro dado numérico real** desta planta, fora de estimativa ou foto.
Não muda nenhuma decisão de manejo hoje — falta série temporal para virar tendência. Serve como
**ponto de partida** para as próximas 4 leituras do Objetivo 1.

**Ação:** nenhuma mudança de manejo. Continuar plano já em curso (remover flor aberta, escolher
líder, adubo na próxima janela sem chuva, checar drenagem). Registrar aqui a próxima leitura,
idealmente logo após uma rega e de novo alguns dias depois, para começar a calibrar "alto" e
"baixo" nesta planta específica.

**Pendente:** ver §5 — mais 4 leituras do Objetivo 1 em horários diferentes; demais itens sem
mudança.

---

### 2026-09-20 — Reavaliação de copa por foto (mesmo dia da 1ª leitura do sensor, ~13:27)

> Recebido pelo canal oficial do Forms ([`../docs/entrada-atualizacoes-planta.md`](../docs/entrada-atualizacoes-planta.md)),
> processado manualmente porque o gatilho do Apps Script ainda estava sendo configurado no
> momento do envio — mesmo protocolo de processamento, só a origem do arquivo que foi manual.
> Fotos tiradas ~30 min **antes** da leitura do sensor registrada na entrada anterior.

**Observado (3 fotos do dono, varanda do local A):**

- **copa seguindo densa**, com folhagem nova nas pontas dos ramos (verde-claro, típico de
  crescimento recente) — consistente com a trajetória "recuperação avançada" de 07/09 e 17/09;
- **tutor de bambu visível, ainda sem nada amarrado** (fotos `-1`, `-2`) — confirma que a
  escolha/amarração do líder segue pendente, como já registrado em 17/09;
- **novo(s) botão(ões)/flor pequena, tom rosa, perto do centro do vaso** (fotos `-1`, `-2`) —
  bem menor que a flor aberta de 5 pétalas registrada em 17/09; parece botão fechado ou flor
  recém-aberta, não dá para afirmar qual por foto;
- **sensor `hhcc-01` claramente visível, instalado no substrato** (foto `-3`, cápsula verde-clara
  na terra) — confirma visualmente o que já estava registrado em §4, sem necessidade de nova
  investigação;
- sem sinais de folha amarela generalizada, praga ou murcha nas 3 fotos. Não é possível avaliar
  drenagem/encharcamento por estas fotos (ângulo não mostra o fundo do vaso ou o pratinho).

**Concluído / hipótese (🟡 diagnóstico por foto é hipótese, não conclusão):**

- **Copa continua no rumo positivo.** Nada nestas fotos contradiz o estado 🟢 já registrado;
  reforça a leitura de recuperação avançada com mais um check-in.
- **Botão/flor novo é o mesmo padrão recorrente** já visto em 07/09 e 17/09 — a planta segue
  tentando florir apesar da meta ser copa, não fruto. **Ação recomendada igual às anteriores:
  pinçar**, sem tratar como problema.
- **Líder segue sem escolha** — consistente com a pausa pedida pelo dono em 17/09, não é um
  novo achado, só confirmação de que nada mudou nessa frente.

**Ação:** nenhuma mudança de manejo além do já registrado. Pinçar o(s) botão(ões)/flor na
próxima visita física. Aplicar Forth Frutas meia dose na próxima janela sem chuva, como já
decidido em 17/09 (checar drenagem antes).

**Pendente:** ver §5 — remover botão/flor (reforçado); escolher e amarrar líder (segue pausado);
checar drenagem/encharcamento antes do adubo; demais itens sem mudança.

**Fotos:** _não publicadas._

---

### 2026-09-20 — Complemento: comentário do dono (Forms) — adubo aplicado em 18/09, sensor confirmado, nota de clima

> Complementa a entrada anterior. O envio original desta planta (carimbo `2026-09-20_1327`) não
> tinha campo de comentário no Forms — só foi adicionado depois. O dono mandou o relato à parte;
> registrado aqui, acoplado ao mesmo update, em vez de virar uma checagem nova e desconectada.

**Observado (relato do dono):**

- Planta **"cresceu bem"** desde o último registro.
- **Forth Frutas meia dose aplicado na sexta-feira, 2026-09-18** — dentro da janela liberada
  desde ~13/09 (ver histórico de 17/09). O dono **não mencionou** se a checagem de
  drenagem/encharcamento (pendência priorizada em 17/09, por causa da chuva) foi feita antes.
- Sensor `hhcc-01` segue instalado, **"desde o último registro"** — confirma continuidade, sem
  mudança em §4.
- Dono vai mandar **depois** prints do app do sensor, para cruzar stats e a variação após a
  adubação (ação futura, ainda não recebida).
- **Nota de clima** (relato do dono, varanda do local A — onde ficam esta planta e a `pitanga-01`):
  depois do período de muito sol na chegada das plantas, houve **cerca de 3 semanas de chuva
  forte e frio** — mais longo que as "2 semanas" já registradas em 17/09 (mesma leva de mau
  tempo, agora com duração maior confirmada). Nos últimos 2 dias teve um pouco de sol, mas a
  previsão segue de chuva.

**Concluído / hipótese:**

- **Adubo aplicado 2 dias antes das fotos desta atualização** (18/09 → fotos de 20/09) — coerente
  com a copa "seguindo cheia" já registrada; **cedo demais** para atribuir qualquer efeito
  visível especificamente a esta aplicação.
- ⚠️ **Checagem de drenagem antes do adubo de 18/09: não confirmada.** A ficha já tinha isso
  como prioridade desde 17/09, por causa da chuva prolongada — não assumir que foi feita só
  porque o adubo foi aplicado. Ver §5.
- **Clima:** o relato de hoje **reforça e estende** a leitura já registrada em 17/09 — período
  prolongado de chuva/frio, agora ~3 semanas, pode seguir retardando crescimento e resposta ao
  adubo. Segue **sem medição objetiva** (o projeto ainda não tem a integração Open-Meteo, Fase
  2, para confirmar). Mesma nota de clima vale para a `pitanga-01`, mesma varanda.

**Ação:** perguntar ao dono se a drenagem foi checada antes do adubo de 18/09; se não, checar
agora. Quando os prints do app chegarem, registrar como entrada nova (stats + variação
pós-adubação). Manter o resto do plano já em curso (remover botão/flor, escolher líder).

**Pendente:** ver §5 (atualizada) — confirmação da checagem de drenagem (novo, ligado ao adubo
já aplicado); prints do app pós-adubo (novo); demais itens sem mudança.

---

### 2026-09-28 — Histórico numérico do `hhcc-01` reconstruído (14–24/09): EC confirma o adubo, 1 dia de calor extremo no substrato

> Não é leitura por foto — é dado numérico do sensor, extraído de prints do app "Flower
> Care" (método completo, tabelas hora a hora e demais dias em
> [`../docs/historico-sensor-app.md`](../docs/historico-sensor-app.md)). Resumido aqui só o
> que é acionável para o manejo desta planta.

**Observado (11 dias de dados, 14 a 24/09):**

- **EC (fertilidade) confirma numericamente o efeito do Forth Frutas aplicado em 18/09.**
  Véspera (17/09): 263/222 µS/cm (Max/Min) — mesma faixa baixa dos dias 14–16/09. No dia da
  aplicação (18/09): **Max salta para 725 µS/cm**, e só ali o valor passa a superar o piso
  "apropriado" do app (350). Dias seguintes (19→24/09) mostram decaimento gradual: 531→322→
  294→247→232→248 µS/cm — consistente com lixiviação, não com nova aplicação.
- ⚠️ **21/09: temperatura do substrato bateu 44,4°C** (madrugada normal, 19,9°C) — o maior
  valor de toda a série, acima da faixa "apropriada" do app (8–35°C). 🟡 **hipótese**: sensor
  mede o substrato, não o ar — sol direto na ponta do sensor num dia de céu limpo pode
  aquecer bem mais que a temperatura ambiente. Não é conclusão de estresse térmico; fica
  registrado para cruzar com a próxima leitura de status por foto/comentário do dono
  daquela semana, se houver sinal de folha queimada ou murcha.
- Umidade acompanha o dia do adubo (Max 52% em 18/09, a maior da série) — bate com a prática
  recomendada de substrato úmido antes de aplicar.

**Concluído:** nenhuma mudança de manejo — o EC alto pós-adubo é o esperado e desejado (era
justamente o alvo da aplicação), e o pico de 44,4°C é hipótese a observar, não uma ação
imediata. Fecha a pendência "prints do app pós-adubo" registrada em 2026-09-20 — ver §5.

**Ação:** nenhuma. Continuar recebendo prints do app (mais dias, e voltando no tempo até
achar o limite de retenção) para estender a série — ver pendências em
`docs/historico-sensor-app.md`.

**Pendente:** ver §5 (sem mudança além do já fechado acima); observar sinal de estresse
térmico na próxima foto/comentário, por causa do pico de 21/09.

---

### 2026-09-28 — Análise: por que a água "flutua pouco" e por que o adubo "sumiu rápido"

> O dono perguntou como interpretar dois padrões dos 11 dias de dados: baixa flutuação da
> umidade e fertilidade que subiu pouco e se dissipou rápido. **Detalhe importante que o dono
> trouxe:** as faixas "apropriadas" mostradas pelo próprio app **não são de acerola** — são do
> perfil **Citrus hystrix** (limão-kaffir), escolhido no app por ser a espécie mais parecida
> disponível. Isso motivou ir atrás de literatura real de acerola (§2, fontes acima) em vez de
> só usar o que o app sugere.

**1) "Flutuação de água muito baixa" — é o comportamento esperado, não falha de sensor.**

Água no substrato **não tem ciclo diário** como luz e temperatura (sol nasce e se põe todo
dia; substrato não seca e umedece sozinho todo dia). O que existe é a **curva de secagem**
entre uma rega/chuva e a próxima — mudança de **dias**, não de horas. Olhando os 11 dias:

- Dentro de um único dia, a umidade é quase sempre uma linha reta (ex. 17/09: 22,9% em quase
  todas as 24 horas). **Isso é o esperado** — já registrado como princípio do projeto em
  `docs/medicoes.md` §2 ("medir o ciclo, não o ponto").
- **O sinal real está na comparação entre dias**, e ele existe: 15/09 (15→41%, subiu — chuva
  ou rega), indo a 33% em 16/09, caindo suave até 21% em 23/09 (seca gradual de ~8 dias), e
  subindo de novo pra 40% em 18/09-24/09 batendo com o relato de chuva prolongada na ficha
  (2026-09-17/20). **Isso É a curva de secagem que o projeto quer enxergar** — só não aparece
  dentro de 1 dia, aparece **entre os dias**.
- ⚠️ Não confundir "flutuação baixa" com "sonda não está pegando nada": os valores absolutos
  batem com o padrão narrado (rega/chuva → sobe; dias secos → desce), então a sonda está
  respondendo, só que na escala de tempo certa da própria água no solo, não na escala de horas.

**2) "Fertilidade cresceu pouco e já foi embora tudo que coloquei" — bate com o que a
literatura de citros em vaso prevê, e tem uma causa reforçante local (chuva).**

- **"Cresceu pouco":** o salto de 263→725 µS/cm no dia do adubo (18/09) é, na verdade, um
  aumento de quase **3×** — não é pouco em termos relativos. Pode ter *parecido* pouco porque
  725 µS/cm ainda está abaixo da faixa "apropriada" do app (350–2000) — mas essa faixa é do
  perfil Citrus hystrix, calibrada pra outra planta, então **não é o padrão certo pra julgar
  "cresceu pouco ou não"** (ver §2, fontes). Sem alvo numérico confiável de EC pra acerola,
  o que dá pra afirmar é só a **proporção**: quase triplicou.
- **"Já foi tudo embora":** em ~4 dias (18→22/09) o EC caiu de 725 pra perto da faixa
  pré-adubo (~226–248). A literatura de citros em vaso confirma que isso é **esperado, não
  anômalo**: "potted citrus requires more frequent, lighter feeding because nutrients leach
  out quickly" ([Nature Hills](https://naturehills.com/blogs/garden-blog/understanding-container-citrus-tree-fertilization)) — vaso pequeno tem pouco volume de substrato pra reter
  sal, e rega/chuva lava rápido. **Fator agravante local:** a ficha já registra chuva
  prolongada na mesma janela (2026-09-17 a 2026-09-20) — a "queda de nutriente" nesse caso é
  **lixiviação por chuva**, não falta de absorção pela planta, seguindo a mesma lógica que
  `docs/medicoes.md` §4 já previa pra regime "aberto à chuva" antes mesmo de ter dado real
  pra testar.
- ⚠️ **Ressalva metodológica:** EC crua de sensor barato sobe **também** com o aumento de
  umidade em si (não só com sal dissolvido) — `docs/medicoes.md` §4 já registra isso. O dia
  do adubo (18/09) é também o dia em que a umidade deu o maior salto da série (Max 52%). Parte
  do pico de EC pode ser efeito cruzado de umidade, não só do adubo — os dois eventos
  coincidiram no mesmo dia e não dá pra separar com um sensor só.

**Concluído:** os dois padrões observados são **consistentes com o que se espera** de um vaso
de ~25–34 L, substrato bem drenado, exposto à chuva direta — não indicam sensor com defeito
nem indicam que o adubo "não fez efeito". O ritmo de decaimento do EC (poucos dias) é, se
algo, um **argumento a favor de reaplicar em ciclos mais curtos e com doses menores** (padrão
"frequent, lighter feeding" da literatura de citros em vaso), em vez das aplicações
espaçadas atuais — mas isso é **inferência de literatura de citros, não de acerola
comprovada**, então fica registrado como leitura, não como mudança de plano ainda.

**Ação:** nenhuma mudança de manejo imediata. Considerar, na próxima decisão sobre adubação,
avaliar um ciclo mais curto/dose menor em vez do padrão atual — discutir com o dono antes de
aplicar (viola premissa 7 comprar produto novo, mas **não** viola mudar frequência do que já
está em casa).

**Pendente:** nenhuma fonte encontrada dá alvo numérico de EC específico pra acerola — se
aparecer um artigo/extensão que meça isso diretamente (não via citros como proxy), atualizar
§2. Seguir comparando o EC pós-próxima adubação com este baseline agora estabelecido.
