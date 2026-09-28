# Checklist de avaliação de produto

> **Tema macro:** o crivo aplicado a qualquer sensor/kit cogitado, **antes** da compra.
> Roteado a partir do [PROJETO.md](../PROJETO.md).
>
> Avaliações concretas produto a produto ficam em
> [`produtos-avaliados.md`](produtos-avaliados.md). O que foi efetivamente comprado fica em
> [`equipamentos/`](../equipamentos/README.md).

---

## A ordem importa

**Reprovou em 1, 2 ou 3 → o resto não interessa.** Não gastar tempo comparando preço de
produto que já falhou no requisito estrutural.

| # | Pergunta | O que reprova |
|---|---|---|
| 1 | **É dispositivo ou componente?** Tem rádio, energia e caixa próprios? | Se precisa de microcontrolador para funcionar, é **componente** — custo real é muito maior que o do anúncio |
| 2 | **O dado cru sai sem a nuvem do fabricante?** | Se a resposta é "só pelo app", **reprovado**. Viola o requisito fundador do projeto |
| 3 | **Sobrevive ao ambiente?** Chuva direta, sol no plástico, 40 °C | Vedação (IP) não declarada em produto destinado a varanda aberta é risco alto |
| 4 | **O comprimento da sonda serve para o vaso?** | Sonda de ~5 cm mede a camada errada em vaso fundo. Ideal ≥ 15–20 cm |
| 5 | **O que mede *de fato*?** | "Fertilidade" = EC · "NPK" = EC recalculado · "lux" ≠ PAR. Descontar marketing **antes** de comparar preço |
| 6 | **Autonomia e manutenção** | Tipo de pilha, duração declarada, e se avisa quando acaba |
| 7 | **Custo por parâmetro útil** | Não custo absoluto. R$150 por 3 medidas confiáveis ganha de R$60 por 5 duvidosas |

---

## Como verificar o item 2 na prática

O mais importante e o mais fácil de errar. Sinais, em ordem de confiabilidade:

| Sinal | Leitura |
|---|---|
| Tem integração em **ESPHome / Home Assistant / Theengs / Zigbee2MQTT** | ✅ Protocolo aberto e já resolvido por alguém |
| Existe biblioteca Python/aberta com o protocolo documentado | ✅ |
| O anúncio cita o app **próprio da marca** e nada mais | ⚠️ Investigar antes de decidir |
| O app é **"Smart Life" / "Tuya"** | ❌ Nuvem fechada |
| Pede pareamento com PIN | ❌ Costuma indicar protocolo autenticado |
| Nenhuma menção a protocolo, chipset ou compatibilidade | ⚠️ Perguntar ao vendedor **antes** de pagar |

⚠️ **Variantes do mesmo produto podem ter protocolos diferentes.** O mesmo corpo físico pode
sair em versão aberta e em versão nuvem, com SKU quase idêntico. Sempre confirmar o **SKU
exato**, não o nome comercial.

---

## Custo real ≠ preço do anúncio

Somar antes de comparar:

| Item oculto | Quando aparece |
|---|---|
| Coordenador / gateway | Zigbee, sub-GHz, qualquer coisa que não seja BLE ou WiFi |
| Microcontrolador + fonte + caixa | Sempre que for componente (item 1) |
| Vedação (epóxi, verniz, caixa IP) | Qualquer eletrônica exposta a chuva |
| Pilha inicial e reposições | Sensor a pilha |
| Tempo de calibração | Sonda analógica |

---

## Registro

Toda avaliação vira uma entrada em [`produtos-avaliados.md`](produtos-avaliados.md) com
veredito ✅ (atende), 🟡 (atende com ressalva) ou ❌ (não atende).

Ao comprar, criar a ficha em [`equipamentos/`](../equipamentos/README.md) **antes de usar**,
e refazer o checklist com o produto em mãos — o que se confirma na prática costuma diferir do
que o anúncio prometia. Essa diferença é o dado mais útil para a próxima compra.
