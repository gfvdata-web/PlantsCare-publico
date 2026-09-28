# 🌱 PlantsCare

Sistema pessoal de **cuidado de plantas orientado a dados**: sensores baratos, **dado cru**
lido direto do sensor (sem app nem nuvem de fabricante como intermediário obrigatório) e um
histórico datado de cada planta que vira diagnóstico e recomendação.

## Em três camadas

1. **Medição** — capturar o que determina saúde e crescimento: luz, umidade do substrato,
   condutividade (fertilidade) e temperatura.
2. **Dado cru** — o valor bruto do sensor via Bluetooth, decodificado pelo próprio projeto.
3. **Autonomia** — a partir do histórico, gerar diagnóstico, alerta e recomendação.

## Por onde começar

| Quero ver… | Página |
|---|---|
| As plantas e o estado de cada uma | [Plantas](plants/README.md) |
| O rumo do projeto, fases e perguntas em aberto | [Documento-mestre](PROJETO.md) |
| Os sensores e equipamentos em uso | [Equipamentos](equipamentos/README.md) |
| Como o dado sai do sensor | [Captura de dados](docs/captura-dados.md) |
| Por que cada decisão foi tomada | [Log de decisões](docs/decisoes.md) |

!!! note "O que não é publicado"
    Esta é a versão pública da documentação. **A localização das varandas** (cidade, bairro,
    coordenadas e descrição do entorno) aparece como *local A* / *local B*, e **as fotos das
    plantas** não são publicadas. O resto é o registro do projeto como ele é, incluindo os erros,
    porque o histórico é append-only.
