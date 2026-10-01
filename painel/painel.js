"use strict";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = (v, d = 0) => (v == null || Number.isNaN(v) ? "—" : v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }));
const dm = (iso) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
const SVGNS = "http://www.w3.org/2000/svg";

const METRICAS = {
  luz: { nome: "Luz", unid: "mmol/h", dec: 0 },
  umid: { nome: "Umidade do substrato", curto: "Umidade", unid: "%", dec: 0 },
  ec: { nome: "Fertilidade (EC)", curto: "EC", unid: "µS/cm", dec: 0 },
  temp: { nome: "Temperatura do substrato", curto: "Temp.", unid: "°C", dec: 1 },
};
const ICONE = { good: "✓", warning: "!", critical: "✕", none: "–" };

function st(tipo, rotulo, soIcone = false) {
  return `<span class="st ${tipo}${soIcone ? " so-icone" : ""}" ${soIcone ? `title="${esc(rotulo)}" aria-label="${esc(rotulo)}"` : ""}><i aria-hidden="true">${ICONE[tipo]}</i>${soIcone ? "" : esc(rotulo)}</span>`;
}

function posicao(v, f) {
  if (v == null || !f) return null;
  return v < f.min ? -1 : v > f.max ? 1 : 0;
}

function achatar(dias) {
  const pts = [];
  dias.forEach((d) => d.horas.forEach((h) => pts.push({ ...h, data: d.data })));
  return pts;
}

const media = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
const valores = (pts, k) => pts.map((p) => p[k]).filter((v) => v != null);

/* ------------------------------------------------------------------ KPIs */

function calcKpis(p, dias) {
  const F = p.faixas;
  const pts = achatar(dias);
  const out = {};

  const dlis = dias.map((d) => ({ data: d.data, v: d.resumo.luz_acum_mmol != null ? d.resumo.luz_acum_mmol / 1000 : null })).filter((x) => x.v != null);
  const mDli = media(dlis.map((x) => x.v));
  const noAlvo = dlis.filter((x) => x.v >= F.dli.min).length;
  out.luz = {
    titulo: "Luz do dia (DLI)", valor: mDli, dec: 1, unid: "mol/m²·dia", prefixo: dias.length > 1 ? "média " : "",
    status: mDli == null ? ["none", "Sem dado"] : mDli >= F.dli.min ? ["good", "Sol suficiente"] : mDli >= F.dli.min * 0.6 ? ["warning", "Abaixo do alvo"] : ["critical", "Pouca luz"],
    linha: `Alvo ≥ ${F.dli.min} (${F.dli.min}–${F.dli.max}) · último dia ${fmt(dlis.at(-1)?.v, 1)}`,
    pct: dlis.length ? noAlvo / dlis.length : null, pctTxt: `${noAlvo} de ${dlis.length} dias no alvo`,
    spark: dlis, faixa: F.dli,
  };

  const um = pts.filter((x) => x.umid != null);
  const uUlt = um.at(-1)?.umid, uIni = um[0]?.umid;
  const uPos = posicao(uUlt, F.umid);
  const uDentro = um.filter((x) => posicao(x.umid, F.umid) === 0).length;
  out.umid = {
    titulo: "Umidade do substrato", valor: uUlt, dec: 0, unid: "%", prefixo: "agora ",
    status: uPos == null ? ["none", "Sem dado"] : uPos === 0 ? ["good", "Na faixa"] : uPos < 0 ? ["critical", "Seco demais"] : ["warning", "Encharcando"],
    linha: `Faixa ${F.umid.min}–${F.umid.max} % · ${uIni != null && uUlt != null ? `${uUlt - uIni >= 0 ? "▲ +" : "▼ "}${fmt(uUlt - uIni, 0)} pts no período` : ""}`,
    pct: um.length ? uDentro / um.length : null, pctTxt: `${Math.round((uDentro / (um.length || 1)) * 100)} % das horas na faixa`,
    spark: diario(dias, "umid", "max"), faixa: F.umid,
  };

  const ec = pts.filter((x) => x.ec != null);
  const eUlt = ec.at(-1)?.ec;
  const ePico = Math.max(...ec.map((x) => x.ec));
  const ePos = posicao(eUlt, F.ec);
  const eDentro = ec.filter((x) => posicao(x.ec, F.ec) === 0).length;
  out.ec = {
    titulo: "Fertilidade (EC)", valor: eUlt, dec: 0, unid: "µS/cm", prefixo: "agora ",
    status: ePos == null ? ["none", "Sem dado"] : ePos === 0 ? ["good", "Na faixa"] : ePos < 0 ? ["warning", "Abaixo da referência"] : ["warning", "Acima da referência"],
    linha: `Referência ${F.ec.min}–${F.ec.max} · pico ${fmt(ePico)} no período`,
    pct: ec.length ? eDentro / ec.length : null, pctTxt: `${Math.round((eDentro / (ec.length || 1)) * 100)} % das horas na faixa`,
    spark: diario(dias, "ec", "max"), faixa: F.ec,
  };

  const tp = pts.filter((x) => x.temp != null);
  const tMax = tp.length ? Math.max(...tp.map((x) => x.temp)) : null;
  const tMin = tp.length ? Math.min(...tp.map((x) => x.temp)) : null;
  const acima = tp.filter((x) => x.temp > F.temp.max).length;
  const abaixo = tp.filter((x) => x.temp < F.temp.min).length;
  out.temp = {
    titulo: "Temperatura do substrato", valor: tMax, dec: 1, unid: "°C", prefixo: "máx ",
    status: tMax == null ? ["none", "Sem dado"] : tMax > F.temp.max + 5 ? ["critical", "Calor extremo"] : acima || abaixo ? ["warning", "Picos fora da faixa"] : ["good", "Na faixa"],
    linha: `Faixa ${F.temp.min}–${F.temp.max} °C · mín ${fmt(tMin, 1)} · ${acima} h acima`,
    pct: tp.length ? (tp.length - acima - abaixo) / tp.length : null, pctTxt: `${Math.round(((tp.length - acima - abaixo) / (tp.length || 1)) * 100)} % das horas na faixa`,
    spark: diario(dias, "temp", "max"), faixa: F.temp,
  };
  return out;
}

function diario(dias, k, fn) {
  return dias.map((d) => {
    const v = d.horas.map((h) => h[k]).filter((x) => x != null);
    return { data: d.data, v: v.length ? Math[fn](...v) : null };
  }).filter((x) => x.v != null);
}

function sparkSvg(serie, faixa) {
  if (serie.length < 2) return "";
  const W = 200, H = 34, P = 3;
  const vs = serie.map((x) => x.v);
  let lo = Math.min(...vs, faixa.min), hi = Math.max(...vs, Math.min(faixa.max, Math.max(...vs) * 1.5));
  if (hi === lo) hi = lo + 1;
  const y = (v) => H - P - ((Math.min(Math.max(v, lo), hi) - lo) / (hi - lo)) * (H - 2 * P);
  const x = (i) => P + (i * (W - 2 * P)) / (serie.length - 1);
  const d = serie.map((s, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(s.v).toFixed(1)}`).join("");
  const yb1 = y(Math.min(faixa.max, hi)), yb2 = y(faixa.min);
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
    <rect x="0" y="${yb1}" width="${W}" height="${Math.max(0, yb2 - yb1)}" fill="var(--band)"/>
    <path d="${d}" fill="none" stroke="var(--series)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
  </svg>`;
}

function kpiCartao(k) {
  const pct = k.pct == null ? 0 : Math.round(k.pct * 100);
  return `<div class="cartao kpi">
    <div class="topo-kpi"><span class="titulo">${esc(k.titulo)}</span>${st(k.status[0], k.status[1])}</div>
    <div class="valor"><span class="muted pequeno" style="font-weight:500">${esc(k.prefixo)}</span>${fmt(k.valor, k.dec)}<small>${esc(k.unid)}</small></div>
    <div class="linha">${esc(k.linha)}</div>
    <div class="barra" role="img" aria-label="${esc(k.pctTxt)}"><span style="width:${pct}%"></span></div>
    <div class="linha">${esc(k.pctTxt)}</div>
    ${sparkSvg(k.spark, k.faixa)}
    <div class="linha muted" style="font-size:11px">evolução diária${k.titulo.startsWith("Luz") ? "" : " (máx. do dia)"} · faixa em verde</div>
  </div>`;
}

/* -------------------------------------------------------------- gráficos */

function passoBonito(bruto) {
  const p = 10 ** Math.floor(Math.log10(bruto));
  const n = bruto / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}

function el(tag, attrs = {}, pai) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (pai) pai.appendChild(e);
  return e;
}

const hover = { charts: [], pts: [], idx: null };

function graficoLinha(host, chave, pts, faixa, eventos, rotularEventos) {
  const M = METRICAS[chave];
  const W = Math.max(280, host.clientWidth);
  const L = 44, R = 10, T = 14, H = 132, B = 24;
  const n = pts.length;
  const vs = valores(pts, chave);
  let lo = Math.min(...vs), hi = Math.max(...vs);
  if (faixa) { lo = Math.min(lo, faixa.min); hi = Math.max(hi, Math.min(faixa.max, hi * 1.25)); }
  if (chave !== "temp") lo = 0;
  const pad = (hi - lo) * 0.08 || 1;
  hi += pad; if (chave === "temp") lo -= pad;
  const passo = passoBonito((hi - lo) / 4);
  lo = Math.floor(lo / passo) * passo; hi = Math.ceil(hi / passo) * passo;
  const x = (i) => L + (n > 1 ? (i * (W - L - R)) / (n - 1) : (W - L - R) / 2);
  const y = (v) => T + H - ((v - lo) / (hi - lo)) * H;

  const svg = el("svg", { viewBox: `0 0 ${W} ${T + H + B}`, height: T + H + B, role: "img", tabindex: "0",
    "aria-label": `${M.nome}, hora a hora. Use as setas para percorrer.` });

  for (let v = lo; v <= hi + 1e-9; v += passo) {
    el("line", { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: "var(--grid)", "stroke-width": 1 }, svg);
    const t = el("text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", "font-size": 11, fill: "var(--muted)", style: "font-variant-numeric:tabular-nums" }, svg);
    t.textContent = fmt(v, passo < 1 ? 1 : 0);
  }
  if (faixa) {
    const y1 = y(Math.min(faixa.max, hi)), y2 = y(Math.max(faixa.min, lo));
    el("rect", { x: L, y: y1, width: W - L - R, height: Math.max(0, y2 - y1), fill: "var(--band)" }, svg);
    [faixa.min, faixa.max].forEach((v) => { if (v >= lo && v <= hi) el("line", { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: "var(--band-edge)", "stroke-width": 1 }, svg); });
  }
  // separadores de dia + rótulos do eixo x
  const nDias = new Set(pts.map((p) => p.data)).size;
  pts.forEach((p, i) => {
    if (p.h === 1 && i > 0) el("line", { x1: x(i) - (x(1) - x(0)) / 2, x2: x(i) - (x(1) - x(0)) / 2, y1: T, y2: T + H, stroke: "var(--axis)", "stroke-width": 1, opacity: 0.6 }, svg);
    let rot = null;
    if (nDias === 1) { if ((p.h - 1) % 3 === 0 || p.h === 24) rot = `${p.h}h`; }
    else if (p.h === 12 && (nDias <= 10 || pts.findIndex((q) => q.data === p.data) / 24 % 2 === 0)) rot = dm(p.data);
    if (rot) {
      const t = el("text", { x: x(i), y: T + H + 16, "text-anchor": "middle", "font-size": 11, fill: "var(--muted)" }, svg);
      t.textContent = rot;
    }
  });
  el("line", { x1: L, x2: W - R, y1: T + H, y2: T + H, stroke: "var(--axis)", "stroke-width": 1 }, svg);

  // eventos de manejo
  eventos.forEach((ev) => {
    const i = pts.findIndex((p) => p.data === ev.data);
    if (i < 0) return;
    const xe = x(i) - (n > 1 ? (x(1) - x(0)) / 2 : 0);
    el("line", { x1: xe, x2: xe, y1: T - 4, y2: T + H, stroke: "var(--ink-2)", "stroke-width": 1.5, opacity: 0.7 }, svg);
    if (rotularEventos) {
      const t = el("text", { x: xe + 4, y: T + 6, "font-size": 11, fill: "var(--ink-2)", "font-weight": 600 }, svg);
      t.textContent = ev.tipo[0].toUpperCase() + ev.tipo.slice(1);
    }
  });

  // linha (quebra onde falta dado)
  let d = "", aberto = false;
  pts.forEach((p, i) => {
    if (p[chave] == null) { aberto = false; return; }
    d += `${aberto ? "L" : "M"}${x(i).toFixed(1)},${y(p[chave]).toFixed(1)}`;
    aberto = true;
  });
  el("path", { d, fill: "none", stroke: "var(--series)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);

  pts.forEach((p, i) => {
    const q = p[`${chave}_q`];
    if (p[chave] == null || (q !== "direto" && q !== "teto")) return;
    el("circle", { cx: x(i), cy: y(p[chave]), r: 4, fill: q === "direto" ? "var(--series)" : "var(--surface)", stroke: q === "direto" ? "var(--surface)" : "var(--series)", "stroke-width": 2 }, svg);
  });

  const cursor = el("g", { style: "display:none" }, svg);
  const cl = el("line", { y1: T, y2: T + H, stroke: "var(--ink-2)", "stroke-width": 1 }, cursor);
  const cp = el("circle", { r: 4.5, fill: "var(--series)", stroke: "var(--surface)", "stroke-width": 2 }, cursor);
  host.appendChild(svg);

  const chart = {
    svg,
    idxDe(clientX) {
      const r = svg.getBoundingClientRect();
      const px = ((clientX - r.left) / r.width) * W;
      return Math.max(0, Math.min(n - 1, Math.round(((px - L) / (W - L - R)) * (n - 1))));
    },
    mostrar(i) {
      if (i == null || pts[i][chave] == null) { cursor.style.display = "none"; return; }
      cursor.style.display = "";
      cl.setAttribute("x1", x(i)); cl.setAttribute("x2", x(i));
      cp.setAttribute("cx", x(i)); cp.setAttribute("cy", y(pts[i][chave]));
    },
  };
  svg.addEventListener("pointermove", (e) => mover(chart.idxDe(e.clientX), e.clientX, e.clientY));
  svg.addEventListener("pointerleave", esconder);
  svg.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = Math.max(0, Math.min(n - 1, (hover.idx ?? n - 1) + (e.key === "ArrowRight" ? 1 : -1)));
    const r = svg.getBoundingClientRect();
    mover(i, r.left + (x(i) / W) * r.width, r.top + 20);
  });
  svg.addEventListener("blur", esconder);
  return chart;
}

function textoValor(p, k) {
  const v = p[k];
  if (v == null) return "—";
  const q = p[`${k}_q`];
  const base = `${fmt(v, METRICAS[k].dec)} ${METRICAS[k].unid}`;
  return q === "teto" ? `≥ ${base}` : q === "direto" ? `${base} ✓` : base;
}

function mover(i, cx, cy) {
  hover.idx = i;
  hover.charts.forEach((c) => c.mostrar(i));
  const p = hover.pts[i];
  const dica = $("#dica");
  const faixas = hover.faixas;
  const linha = (k, rot) => {
    const pos = posicao(p[k], faixas[k]);
    const cls = pos === -1 ? "fora-baixo" : pos === 1 ? "fora-alto" : "";
    return `<tr><td>${rot}</td><td class="${cls}">${textoValor(p, k)}</td></tr>`;
  };
  dica.innerHTML = `<div class="dt">${dm(p.data)} · ${p.h}h</div><table>
    ${linha("luz", "Luz")}${linha("umid", "Umidade")}${linha("ec", "EC")}${linha("temp", "Temp.")}</table>
    <div class="muted" style="margin-top:4px;font-size:11px">✓ leitura direta · ≥ teto do gráfico · resto estimado</div>`;
  dica.classList.add("on");
  const w = dica.offsetWidth, h = dica.offsetHeight;
  let left = cx + 14, top = cy - h - 10;
  if (left + w > innerWidth - 8) left = cx - w - 14;
  if (top < 8) top = cy + 16;
  dica.style.left = `${Math.max(8, left)}px`;
  dica.style.top = `${top}px`;
}

function esconder() {
  hover.idx = null;
  hover.charts.forEach((c) => c.mostrar(null));
  $("#dica")?.classList.remove("on");
}

/* ---------------------------------------------------------- mapa de horas */

function corCelula(chave, v, faixa, maxLuz) {
  if (v == null) return null;
  if (chave === "luz") {
    const a = Math.sqrt(Math.min(1, v / maxLuz));
    return `color-mix(in srgb, var(--series) ${Math.round(8 + a * 92)}%, var(--surface))`;
  }
  const pos = posicao(v, faixa);
  if (pos === 0) return "var(--inrange)";
  const dist = pos < 0 ? (faixa.min - v) / faixa.min : (v - faixa.max) / faixa.max;
  const pct = Math.round(45 + Math.min(1, dist * 2.5) * 55);
  return `color-mix(in srgb, ${pos < 0 ? "var(--below)" : "var(--above)"} ${pct}%, var(--surface))`;
}

function desenharMapa(host, chave, dias, faixas) {
  const faixa = faixas[chave];
  const maxLuz = Math.max(1, ...dias.flatMap((d) => d.horas.map((h) => h.luz ?? 0)));
  let h = `<div class="mapa-grade" role="grid" aria-label="Mapa hora a hora de ${esc(METRICAS[chave].nome)}"><span></span>`;
  for (let i = 1; i <= 24; i++) h += `<span class="hl">${i}</span>`;
  dias.forEach((d) => {
    h += `<span class="dl">${dm(d.data)}</span>`;
    d.horas.forEach((p) => {
      const cor = corCelula(chave, p[chave], faixa, maxLuz);
      const pos = chave === "luz" ? null : posicao(p[chave], faixa);
      const desc = p[chave] == null ? "sem dado" : `${textoValor(p, chave)}${pos == null ? "" : pos === 0 ? " — na faixa" : pos < 0 ? " — abaixo" : " — acima"}`;
      h += `<span class="c${cor ? "" : " vazio"}" style="${cor ? `background:${cor}` : ""}" data-t="${esc(`${dm(d.data)} · ${p.h}h — ${desc}`)}"></span>`;
    });
  });
  h += "</div>";
  const leg = chave === "luz"
    ? `<span><i class="sw" style="background:color-mix(in srgb,var(--series) 10%,var(--surface))"></i>escuro</span><span><i class="sw" style="background:var(--series)"></i>mais luz</span>`
    : `<span><i class="sw" style="background:var(--below)"></i>↓ abaixo da faixa</span><span><i class="sw" style="background:var(--inrange)"></i>dentro (${faixa.min}–${faixa.max} ${METRICAS[chave].unid})</span><span><i class="sw" style="background:var(--above)"></i>↑ acima da faixa</span><span><i class="sw" style="box-shadow:inset 0 0 0 1px var(--grid)"></i>sem dado</span>`;
  host.innerHTML = h + `<div class="legenda">${leg}</div>`;
  host.querySelectorAll(".c").forEach((c) => {
    c.addEventListener("pointerenter", (e) => {
      const dica = $("#dica");
      dica.innerHTML = `<div>${esc(c.dataset.t)}</div>`;
      dica.classList.add("on");
      const r = c.getBoundingClientRect();
      dica.style.left = `${Math.min(innerWidth - dica.offsetWidth - 8, Math.max(8, r.left - dica.offsetWidth / 2))}px`;
      dica.style.top = `${r.top - dica.offsetHeight - 8}px`;
    });
    c.addEventListener("pointerleave", () => $("#dica").classList.remove("on"));
  });
}

/* ---------------------------------------------------------------- tabelas */

function celula(v, dec, faixa) {
  const pos = posicao(v, faixa);
  return `<span class="${pos === -1 ? "fora-baixo" : pos === 1 ? "fora-alto" : ""}">${fmt(v, dec)}</span>`;
}

function tabelaDiaria(p, dias) {
  const F = p.faixas;
  const linhas = dias.map((d) => {
    const r = d.resumo;
    const ev = p.eventos.filter((e) => e.data === d.data).map((e) => esc(e.descricao)).join("; ");
    return `<tr><td>${dm(d.data)}</td><td>${celula(r.luz_acum_mmol != null ? r.luz_acum_mmol / 1000 : null, 1, { min: F.dli.min, max: Infinity })}</td>
      <td>${celula(r.umidade_min, 0, F.umid)} – ${celula(r.umidade_max, 0, F.umid)}</td>
      <td>${celula(r.ec_min, 0, F.ec)} – ${celula(r.ec_max, 0, F.ec)}</td>
      <td>${celula(r.temp_min, 1, F.temp)} – ${celula(r.temp_max, 1, F.temp)}</td>
      <td style="text-align:left;white-space:normal;min-width:180px">${ev}</td></tr>`;
  }).join("");
  return `<div class="tabela"><table class="dados"><thead><tr><th>Dia</th><th>DLI (mol/m²)</th><th>Umidade %</th><th>EC µS/cm</th><th>Temp. °C</th><th style="text-align:left">Manejo</th></tr></thead><tbody>${linhas}</tbody></table></div>
    <p class="muted pequeno" style="padding:0 12px 8px">Mín–máx de cada dia, lidos direto no resumo do app. ↓/↑ = fora da faixa de referência.</p>`;
}

function tabelaHoraria(p, dias) {
  const pts = achatar(dias).slice().reverse();
  const F = p.faixas;
  const linhas = pts.map((x) => `<tr><td>${dm(x.data)} ${x.h}h</td><td>${textoValor(x, "luz")}</td><td>${celula(x.umid, 0, F.umid)}</td><td>${celula(x.ec, 0, F.ec)}</td><td>${celula(x.temp, 1, F.temp)}</td></tr>`).join("");
  return `<div class="tabela" style="max-height:420px"><table class="dados"><thead><tr><th>Hora</th><th>Luz</th><th>Umidade %</th><th>EC µS/cm</th><th>Temp. °C</th></tr></thead><tbody>${linhas}</tbody></table></div>`;
}

/* ------------------------------------------------------------------ páginas */

function miniKpis(p) {
  const dias = p.serie.dias || [];
  if (!dias.length) {
    return `<div class="semsensor">Sem sensor instalado agora. Faixas de referência já cadastradas (perfil ${esc(p.perfil_app || "—")}) — o painel liga sozinho quando chegar dado.</div>`;
  }
  const k = calcKpis(p, dias.slice(-1));
  const item = (kk, rot, v, dec, u) => `<div class="minikpi"><div class="r">${rot}${st(kk.status[0], kk.status[1], true)}</div><div class="v">${fmt(v, dec)} <span class="u">${u}</span></div></div>`;
  return `<div class="minikpis">${item(k.luz, "Luz", k.luz.valor, 1, "DLI")}${item(k.umid, "Umidade", k.umid.valor, 0, "%")}${item(k.ec, "EC", k.ec.valor, 0, "µS")}${item(k.temp, "Temp. máx", k.temp.valor, 1, "°C")}</div>
    <div class="muted pequeno">Último dia com dado: ${dm(dias.at(-1).data)}</div>`;
}

// "2026-10-01 17:45" → "01/10 17:45" (hora local, já convertida em publicar.py)
const quando = (ts) => `${ts.slice(8, 10)}/${ts.slice(5, 7)} ${ts.slice(11)}`;

function paginaInicio(dados) {
  const ps = dados.plantas;
  const sensores = new Set(ps.flatMap((p) => p.sensores));
  const dias = ps.reduce((s, p) => s + (p.serie.dias?.length || 0), 0);
  const ult = ps.flatMap((p) => (p.serie.dias || []).map((d) => d.data)).sort().at(-1);
  const pend = ps.reduce((s, p) => s + p.pendencias.length, 0);
  $("#app").innerHTML = `
    <h1>Painel das plantas</h1>
    <p class="sub">Cuidado de plantas orientado a dados: sensor no vaso, dado cru, e cada decisão registrada.</p>
    ${dados.sensor_ate ? `<p class="muted pequeno">Última leitura do sensor: ${esc(quando(dados.sensor_ate))} · site atualiza de hora em hora, 7h–0h</p>` : ""}
    <div class="resumo">
      <div class="cartao"><div class="valor">${ps.length}</div><div class="rotulo">plantas acompanhadas</div></div>
      <div class="cartao"><div class="valor">${sensores.size}</div><div class="rotulo">sensor em uso</div></div>
      <div class="cartao"><div class="valor">${dias}</div><div class="rotulo">dias de dado hora a hora${ult ? ` · até ${dm(ult)}` : ""}</div></div>
      <div class="cartao"><div class="valor">${pend}</div><div class="rotulo">pendências abertas</div></div>
    </div>
    <h2>Plantas</h2>
    <div class="plantas">${ps.map((p) => `
      <a class="cartao planta" href="planta.html?id=${encodeURIComponent(p.id)}">
        <div class="nome">${esc(p.nome)}</div>
        <div class="cientifico">${esc(p.cientifico)}</div>
        <div class="chips"><span class="chip marca-verde">${esc(p.fase)}</span><span class="chip">${esc(p.local)}</span>${p.sensores.map((s) => `<span class="chip">sensor ${esc(s)}</span>`).join("")}</div>
        <div class="estado">${p.estado_html}</div>
        ${miniKpis(p)}
        <div class="rodape"><span>${p.pendencias.length} pendências · atualizado ${esc(p.atualizado)}</span><span class="abrir">Abrir painel →</span></div>
      </a>`).join("")}
    </div>`;
}

function paginaPlanta(dados) {
  const id = new URLSearchParams(location.search).get("id");
  const p = dados.plantas.find((x) => x.id === id);
  if (!p) { $("#app").innerHTML = `<h1>Planta não encontrada</h1><p><a href="./">Voltar para todas as plantas</a></p>`; return; }
  document.title = `${p.nome} — PlantsCare`;
  $("#link-ficha").href = p.ficha_url;
  const dias = p.serie.dias || [];
  const temDado = dias.length > 0;
  const opcoes = [[1, "Último dia"], [3, "3 dias"], [7, "7 dias"], [dias.length, `Tudo (${dias.length} dias)`]].filter((o, i, a) => o[0] <= dias.length && a.findIndex((b) => b[0] === o[0]) === i);

  $("#app").innerHTML = `
    <div class="cabeca"><div>
      <h1>${esc(p.nome)}</h1>
      <p class="sub"><em>${esc(p.cientifico)}</em> · regime <code>${esc(p.regime)}</code></p>
      <div class="chips"><span class="chip marca-verde">${esc(p.fase)}</span><span class="chip">Meta: ${esc(p.meta)}</span><span class="chip">${esc(p.local)}</span>${p.sensores.map((s) => `<span class="chip">sensor ${esc(s)}</span>`).join("")}<span class="chip">atualizado ${esc(p.atualizado)}</span>${p.sensores.length && dados.sensor_ate ? `<span class="chip">última leitura ${esc(quando(dados.sensor_ate))}</span>` : ""}</div>
    </div></div>
    <p class="estado-texto">${p.estado_html}</p>
    ${temDado ? `
      <div class="cartao filtros">
        <span class="pequeno muted">Período</span>
        <div class="seg" role="group" aria-label="Período">${opcoes.map(([n, r]) => `<button type="button" data-n="${n}">${r}</button>`).join("")}</div>
        <span class="pequeno muted" id="intervalo"></span>
      </div>
      <div class="kpis" id="kpis"></div>
      <h2>Hora a hora</h2>
      <div class="cartao graficos" id="graficos"></div>
      <h2>Mapa de horas — quando saiu da faixa</h2>
      <div class="cartao mapa"><div class="seg abas" role="group" aria-label="Indicador">${["umid", "ec", "temp", "luz"].map((k) => `<button type="button" data-m="${k}">${METRICAS[k].curto || METRICAS[k].nome}</button>`).join("")}</div><div id="mapa"></div></div>
      <h2>Resumo por dia</h2>
      <div class="cartao" id="diaria"></div>
      <details class="cartao" style="margin-top:12px"><summary>Tabela hora a hora do período</summary><div id="horaria"></div></details>
    ` : `<div class="cartao nota" style="margin-top:24px"><p><strong>Sem sensor nesta planta agora.</strong> As faixas abaixo já estão cadastradas; quando um sensor for instalado e os dados chegarem, os indicadores aparecem aqui.</p></div>`}
    <div class="duas" style="margin-top:32px">
      <div class="cartao lista"><h3>Próximas ações</h3>${p.proxima_acao_html.length ? `<ol>${p.proxima_acao_html.map((a) => `<li>${a}</li>`).join("")}</ol>` : `<p class="muted">Nenhuma registrada.</p>`}</div>
      <div class="cartao lista"><h3>Pendências abertas <span class="chip">${p.pendencias.length}</span></h3><ul>${p.pendencias.map((a) => `<li>${a}</li>`).join("")}</ul></div>
    </div>
    <div class="duas" style="margin-top:16px">
      <div class="cartao lista"><h3>Linha do tempo de manejo</h3><ul class="tempo">${p.eventos.slice().reverse().map((e) => `<li><span class="d">${dm(e.data)}</span><span>${esc(e.descricao)}</span></li>`).join("") || `<li class="muted">Nada registrado.</li>`}</ul></div>
      <div class="cartao nota"><h3 style="margin:0 0 6px;font-size:15px;color:var(--ink)">De onde vêm as faixas</h3>
        <table><tr><th>Indicador</th><th>Faixa</th><th>Fonte</th></tr>
        <tr><td>Luz (DLI)</td><td>${p.faixas.dli ? `${p.faixas.dli.min}–${p.faixas.dli.max} mol/m²·dia` : "—"}</td><td>${esc(p.faixas.dli?.fonte || "")}</td></tr>
        ${["umid", "ec", "temp"].map((k) => `<tr><td>${METRICAS[k].curto}</td><td>${p.faixas[k] ? `${p.faixas[k].min}–${p.faixas[k].max} ${METRICAS[k].unid}` : "—"}</td><td>${esc(p.faixas[k]?.fonte || "")}</td></tr>`).join("")}
        </table>
        <p>Umidade, EC e temperatura são do <strong>substrato</strong> (a sonda fica enterrada), não do ar. A faixa de luz do próprio app não é usada: ela equivale a um DLI de 3–7, de planta de sombra.</p>
        ${temDado ? `<p>Valores hora a hora são <strong>estimados</strong> a partir da altura das barras nos prints do app; mínimos, máximos e o total de luz de cada dia são leitura direta.</p>` : ""}
      </div>
    </div>`;

  if (!temDado) return;
  let periodo = Math.min(7, dias.length);
  let metricaMapa = "umid";

  const render = () => {
    const sel = dias.slice(-periodo);
    const pts = achatar(sel);
    const evs = p.eventos.filter((e) => sel.some((d) => d.data === e.data));
    document.querySelectorAll(".filtros button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.n === periodo)));
    document.querySelectorAll(".mapa .abas button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.m === metricaMapa)));
    $("#intervalo").textContent = sel.length > 1 ? `${dm(sel[0].data)} a ${dm(sel.at(-1).data)}` : dm(sel[0].data);

    const k = calcKpis(p, sel);
    $("#kpis").innerHTML = ["luz", "umid", "ec", "temp"].map((c) => kpiCartao(k[c])).join("");

    const g = $("#graficos");
    g.innerHTML = "";
    hover.charts = []; hover.pts = pts; hover.faixas = { luz: null, umid: p.faixas.umid, ec: p.faixas.ec, temp: p.faixas.temp };
    ["luz", "umid", "ec", "temp"].forEach((c, i) => {
      const box = document.createElement("div");
      box.className = "grafico";
      const f = c === "luz" ? null : p.faixas[c];
      box.innerHTML = `<div class="gtitulo"><b>${METRICAS[c].nome} <span class="muted" style="font-weight:400">(${METRICAS[c].unid})</span></b><span class="muted pequeno">${f ? `faixa ${f.min}–${f.max}` : "alvo avaliado no total do dia (DLI)"}</span></div>`;
      g.appendChild(box);
      hover.charts.push(graficoLinha(box, c, pts, f, evs, i === 0));
    });
    const leg = document.createElement("div");
    leg.className = "legenda";
    leg.innerHTML = `<span><i class="sw" style="background:var(--series);height:3px"></i>valor por hora</span><span><i class="sw" style="background:var(--band)"></i>faixa de referência</span><span><svg width="12" height="12"><circle cx="6" cy="6" r="4" fill="var(--series)" stroke="var(--surface)" stroke-width="2"/></svg>leitura direta</span><span><svg width="12" height="12"><circle cx="6" cy="6" r="4" fill="var(--surface)" stroke="var(--series)" stroke-width="2"/></svg>luz no teto do gráfico (valor mínimo)</span><span><i class="sw" style="background:var(--ink-2);width:2px"></i>evento de manejo</span>`;
    g.appendChild(leg);

    desenharMapa($("#mapa"), metricaMapa, sel, p.faixas);
    $("#diaria").innerHTML = tabelaDiaria(p, sel);
    $("#horaria").innerHTML = tabelaHoraria(p, sel);
  };

  document.querySelector(".filtros .seg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    periodo = +b.dataset.n; render();
  });
  document.querySelector(".mapa .abas").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    metricaMapa = b.dataset.m; render();
  });
  let t;
  let largura = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === largura) return;
    largura = innerWidth;
    clearTimeout(t); t = setTimeout(render, 150);
  });
  render();
}

fetch("dados.json", { cache: "no-cache" })
  .then((r) => r.json())
  .then((dados) => (document.body.dataset.pagina === "planta" ? paginaPlanta : paginaInicio)(dados))
  .catch((e) => { $("#app").innerHTML = `<p>Não foi possível carregar os dados (${esc(e.message)}).</p>`; });
