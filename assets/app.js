/* Vize çalışma sitesi: ortak motor. Veri content.js ve questions.js'ten gelir. */
(function () {
  'use strict';
  const W = window, D = document;
  const COURSE = W.COURSE || {};
  const TOPICS = W.TOPICS || [];
  const EXAMS = W.EXAMS || [];
  const TQ = W.TOPIC_QUESTIONS || {};
  const RULES = W.TOPIC_RULES || {};
  const TRAPS = W.TRAPS || [];
  const FORMAT = W.EXAM_FORMAT || [];
  const topicById = Object.fromEntries(TOPICS.map((t, i) => [t.id, Object.assign(t, { no: i + 1 })]));
  const LET = 'ABCDEFGH';
  const TYPE_ORDER = ['mc', 'fill', 'prob'];
  const TYPE_NAME = { mc: 'Çoktan seçmeli', fill: 'Sayısal / kısa cevap', prob: 'Çok adımlı problem' };
  const app = D.getElementById('app');

  /* ---------- yardımcılar ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function md(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\n/g, '<br>');
  }
  function hash(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* özel pencere vb. */ } }
  };
  function fmtNum(x) {
    if (Number.isInteger(x)) return String(x);
    return String(Number(x.toPrecision(4)));
  }

  /* ---------- cevap karşılaştırma ---------- */
  function parseNum(raw) {
    let s = String(raw == null ? '' : raw).trim();
    if (!s) return null;
    s = s.replace(/\s+/g, '').replace(/[−–]/g, '-');
    let pct = false;
    if (s.includes('%')) { pct = true; s = s.replace(/%/g, ''); }
    s = s.replace(/,/g, '.');
    const fr = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (fr) {
      const v = parseFloat(fr[1]) / parseFloat(fr[2]);
      return isFinite(v) ? { v, pct, frac: true, d: null, sig: 99 } : null;
    }
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
    const v = parseFloat(s);
    const d = s.includes('.') ? s.split('.')[1].length : 0;
    const sig = s.replace(/^-/, '').replace('.', '').replace(/^0+/, '').length;
    return { v, pct, frac: false, d, sig };
  }
  // Kesir (3/7), ondalık (0,4286) ve yüzde (%42,86) kabul edilir.
  // Hedef kısa bir ondalıksa (0.15, 75.4) birebir aranır; değilse en az 2 anlamlı basamakla doğru yuvarlama yeterli.
  function numMatch(raw, target, o) {
    o = o || {};
    const p = parseNum(raw);
    if (!p) return false;
    const cands = [];
    if (o.pct) {
      cands.push({ v: p.v, d: p.d });
      if (!p.pct) cands.push({ v: p.v * 100, d: p.d == null ? null : p.d - 2 });
    } else {
      cands.push(p.pct ? { v: p.v / 100, d: p.d == null ? null : p.d + 2 } : { v: p.v, d: p.d });
    }
    const exactT = Math.abs(target * 1000 - Math.round(target * 1000)) < 1e-7;
    return cands.some(c => {
      const diff = Math.abs(c.v - target);
      if (diff <= 1e-9 * Math.max(1, Math.abs(target))) return true;
      if (o.tol != null) return diff <= o.tol + 1e-12;
      if (exactT || c.d == null || p.sig < 2) return false;
      return diff <= 0.5 * Math.pow(10, -c.d) + 1e-12;
    });
  }
  function norm(s) {
    const map = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u' };
    return String(s == null ? '' : s).toLocaleLowerCase('tr-TR').replace(/[çğıöşüâîû]/g, c => map[c])
      .replace(/[.!?;:]+$/, '').replace(/\s+/g, ' ').trim();
  }
  function textMatch(raw, list, cs) {
    const f = cs ? (x => String(x).trim()) : norm;
    return (list || []).some(a => f(a) === f(raw) && f(raw) !== '');
  }
  function itemMatch(raw, it) {
    if (it.num != null) return numMatch(raw, it.num, it);
    return textMatch(raw, it.ans, it.cs);
  }
  const showOf = it => it.show != null ? it.show : (it.num != null ? fmtNum(it.num) + (it.pct ? '%' : '') : (it.ans || [''])[0]);

  /* ---------- soru bankası ---------- */
  function prep(q) {
    if (q._id) return q;
    const body = q.q + '|' + (q.opts || []).join('|') + '|' + (q.steps || []).map(s => s.label).join('|');
    q._id = q.topic + '-' + hash(body).toString(36);
    if (q.type === 'mc') {
      const idx = q.opts.map((_, i) => i);
      q._perm = q.noShuffle ? idx : shuffle(idx, rng(hash(body)));
    }
    return q;
  }
  EXAMS.forEach(e => e.questions.forEach(prep));
  Object.values(TQ).forEach(l => l.forEach(prep));
  const BANK = [];
  const seenIds = new Set();
  [...EXAMS.flatMap(e => e.questions), ...Object.values(TQ).flat()].forEach(q => {
    if (!seenIds.has(q._id)) { seenIds.add(q._id); BANK.push(q); }
  });
  W.__BANK = BANK; // doğrulama ve hata ayıklama için

  /* ---------- formül çizimi ---------- */
  function typeset(el) {
    if (W.renderMathInElement) {
      W.renderMathInElement(el, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'input']
      });
    }
  }

  /* ---------- grafikler (SVG) ---------- */
  const r2 = x => Math.round(x * 10) / 10;
  function svgOpen(w, h, minW) {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" style="min-width:${minW || 0}px" role="img" xmlns="http://www.w3.org/2000/svg">`;
  }
  function vizHist(b) {
    const w = 480, h = 250, L = 40, B = 46, T = 14, R = 10;
    const n = b.freqs.length, max = Math.max(...b.freqs), yMax = max + 1;
    const pw = w - L - R, ph = h - T - B, bw = pw / n;
    const Y = v => T + ph - (v / yMax) * ph;
    let s = svgOpen(w, h, 380);
    const step = yMax > 10 ? 2 : 1;
    for (let v = 0; v <= yMax; v += step) s += `<line class="ax" x1="${L - 4}" x2="${L}" y1="${r2(Y(v))}" y2="${r2(Y(v))}"/><text x="${L - 7}" y="${r2(Y(v) + 4)}" text-anchor="end">${v}</text>`;
    b.freqs.forEach((f, i) => {
      const x = L + i * bw;
      s += `<rect class="bar" x="${r2(x)}" y="${r2(Y(f))}" width="${r2(bw)}" height="${r2(T + ph - Y(f))}"/>`;
      s += `<text x="${r2(x + bw / 2)}" y="${r2(Y(f) - 4)}" text-anchor="middle" class="acc">${f}</text>`;
      s += `<text x="${r2(x + bw / 2)}" y="${T + ph + 16}" text-anchor="middle">${esc(b.labels[i])}</text>`;
    });
    s += `<line class="ax" x1="${L}" x2="${L}" y1="${T}" y2="${T + ph}"/><line class="ax" x1="${L}" x2="${w - R}" y1="${T + ph}" y2="${T + ph}"/>`;
    s += `<text x="${L + pw / 2}" y="${h - 6}" text-anchor="middle" class="mut">${esc(b.xlab || '')}</text>`;
    s += `<text x="12" y="${T + ph / 2}" text-anchor="middle" class="mut" transform="rotate(-90 12 ${T + ph / 2})">${esc(b.ylab || 'Frekans')}</text>`;
    return s + '</svg>';
  }
  function vizBox(b) {
    const w = 520, h = 150, L = 20, R = 20, cy = 62;
    const [a, z] = b.scale;
    const X = v => L + ((v - a) / (z - a)) * (w - L - R);
    let s = svgOpen(w, h, 440);
    // eksen
    s += `<line class="ax" x1="${L}" x2="${w - R}" y1="118" y2="118"/>`;
    for (let v = a; v <= z; v += b.tick) s += `<line class="ax" x1="${r2(X(v))}" x2="${r2(X(v))}" y1="118" y2="122"/><text x="${r2(X(v))}" y="136" text-anchor="middle" class="mut">${v}</text>`;
    // sınırlar
    (b.fences || []).forEach(f => {
      s += `<line class="fence" x1="${r2(X(f.v))}" x2="${r2(X(f.v))}" y1="18" y2="108"/><text x="${r2(X(f.v))}" y="13" text-anchor="middle" style="fill:var(--bad)">${esc(f.label)}</text>`;
    });
    // bıyıklar ve kutu
    s += `<line class="ln" x1="${r2(X(b.min))}" x2="${r2(X(b.q1))}" y1="${cy}" y2="${cy}"/><line class="ln" x1="${r2(X(b.q3))}" x2="${r2(X(b.max))}" y1="${cy}" y2="${cy}"/>`;
    s += `<line class="ln" x1="${r2(X(b.min))}" x2="${r2(X(b.min))}" y1="${cy - 10}" y2="${cy + 10}"/><line class="ln" x1="${r2(X(b.max))}" x2="${r2(X(b.max))}" y1="${cy - 10}" y2="${cy + 10}"/>`;
    s += `<rect class="bar" x="${r2(X(b.q1))}" y="${cy - 22}" width="${r2(X(b.q3) - X(b.q1))}" height="44"/>`;
    s += `<line class="ln" x1="${r2(X(b.med))}" x2="${r2(X(b.med))}" y1="${cy - 22}" y2="${cy + 22}" style="stroke-width:3"/>`;
    s += `<text x="${r2(X(b.q1))}" y="${cy + 38}" text-anchor="middle">Q1=${b.q1}</text><text x="${r2(X(b.med))}" y="${cy - 28}" text-anchor="middle">Med=${b.med}</text><text x="${r2(X(b.q3))}" y="${cy + 38}" text-anchor="middle">Q3=${b.q3}</text>`;
    (b.out || []).forEach(o => {
      s += `<circle cx="${r2(X(o))}" cy="${cy}" r="4.5" style="fill:var(--bad)"/><text x="${r2(X(o))}" y="${cy + 20}" text-anchor="middle" style="fill:var(--bad)">${o}</text>`;
    });
    return s + '</svg>';
  }
  function vizScatter() {
    const panels = [
      ['Pozitif doğrusal', x => x + 0.0],
      ['Ters (negatif) doğrusal', x => 1 - x],
      ['Doğrusal ilişki yok', null],
      ['Eğrisel (doğrusal değil)', x => 1 - 4 * (x - 0.5) * (x - 0.5)]
    ];
    const pw = 120, ph = 100, gap = 12, w = 4 * pw + 3 * gap, h = ph + 30;
    const rand = rng(7);
    let s = svgOpen(w, h, 460);
    panels.forEach((p, i) => {
      const x0 = i * (pw + gap);
      s += `<line class="ax" x1="${x0 + 6}" x2="${x0 + 6}" y1="4" y2="${ph}"/><line class="ax" x1="${x0 + 6}" x2="${x0 + pw}" y1="${ph}" y2="${ph}"/>`;
      for (let k = 0; k < 22; k++) {
        const x = rand();
        const y = p[1] ? Math.min(1, Math.max(0, p[1](x) + (rand() - 0.5) * 0.22)) : rand();
        s += `<circle class="dot" cx="${r2(x0 + 12 + x * (pw - 18))}" cy="${r2(ph - 6 - y * (ph - 14))}" r="2.6"/>`;
      }
      s += `<text x="${x0 + pw / 2 + 3}" y="${ph + 18}" text-anchor="middle">${p[0]}</text>`;
    });
    return s + '</svg>';
  }
  function vizTree(b) {
    const leaves = b.branches.reduce((n, br) => n + br.kids.length, 0);
    const rowH = 34, top = 12, w = 540, h = top + leaves * rowH + (b.total ? 34 : 8);
    const xr = [6, 78], xm = [150, 248], xl = [318, 392], xp = 400;
    let s = svgOpen(w, h, 500), li = 0;
    const mids = [];
    b.branches.forEach(br => {
      const ys = br.kids.map(() => top + rowH * (li++ + 0.5));
      mids.push({ br, ys, y: (ys[0] + ys[ys.length - 1]) / 2 });
    });
    const ry = (mids[0].y + mids[mids.length - 1].y) / 2;
    const node = (x, y, wd, txt, cls) => `<rect class="${cls || 'nd'}" x="${x}" y="${r2(y - 12)}" width="${wd}" height="24" rx="6"/><text x="${x + wd / 2}" y="${r2(y + 4)}" text-anchor="middle">${esc(txt)}</text>`;
    s += node(xr[0], ry, xr[1] - xr[0], b.root);
    mids.forEach(m => {
      s += `<line class="ax" x1="${xr[1]}" y1="${r2(ry)}" x2="${xm[0]}" y2="${r2(m.y)}"/>`;
      s += `<text x="${(xr[1] + xm[0]) / 2}" y="${r2((ry + m.y) / 2 - 5)}" text-anchor="middle" class="acc">${fmtNum(m.br.p)}</text>`;
      s += node(xm[0], m.y, xm[1] - xm[0], m.br.name);
      m.br.kids.forEach((k, j) => {
        const y = m.ys[j];
        s += `<line class="ax" x1="${xm[1]}" y1="${r2(m.y)}" x2="${xl[0]}" y2="${r2(y)}"/>`;
        s += `<text x="${(xm[1] + xl[0]) / 2}" y="${r2((m.y + y) / 2 - 4)}" text-anchor="middle" class="acc">${fmtNum(k.p)}</text>`;
        s += node(xl[0], y, xl[1] - xl[0], k.name, k.hl ? 'hl' : 'nd');
        const prod = Number((m.br.p * k.p).toFixed(6));
        s += `<text x="${xp}" y="${r2(y + 4)}" class="${k.hl ? 'okt' : 'mut'}">${fmtNum(m.br.p)} × ${fmtNum(k.p)} = ${prod}</text>`;
      });
    });
    if (b.total) s += `<text x="8" y="${h - 10}" class="okt">${esc(b.total)}</text>`;
    return s + '</svg>';
  }
  function renderViz(b) {
    const f = { hist: vizHist, box: vizBox, scatter: vizScatter, tree: vizTree }[b.kind];
    return `<div class="viz${b.kind === 'tree' ? ' wide' : ''}">${f ? f(b) : ''}${b.cap ? `<div class="cap">${md(b.cap)}</div>` : ''}</div>`;
  }

  /* ---------- konu blokları ---------- */
  function box(cls, head, b) {
    const body = (b.text ? `<div>${md(b.text)}</div>` : '') + (b.items ? `<ul>${b.items.map(i => `<li>${md(i)}</li>`).join('')}</ul>` : '');
    return `<div class="box ${cls}"><div class="h">${head}</div>${body}</div>`;
  }
  function renderBlock(b) {
    switch (b.t) {
      case 'p': return `<p>${md(b.text)}</p>`;
      case 'h': return `<h3>${md(b.text)}</h3>`;
      case 'ul': return `<ul>${b.items.map(i => `<li>${md(i)}</li>`).join('')}</ul>`;
      case 'ol': return `<ol>${b.items.map(i => `<li>${md(i)}</li>`).join('')}</ol>`;
      case 'f': return `<div class="f">${b.cap ? `<div class="cap">${md(b.cap)}</div>` : ''}$$${esc(b.tex)}$$</div>`;
      case 'table': return `<div class="tbl"><table><thead><tr>${b.head.map(c => `<th>${md(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'trap': return box('trap', b.head || 'Tuzak', b);
      case 'tip': return box('tip', b.head || 'Sınavda', b);
      case 'low': return box('low', b.head || 'Düşük öncelik', b);
      case 'ex': return `<div class="ex"><div class="h">${md(b.head || 'Örnek')}</div><div class="q">${md(b.q)}</div>${b.steps ? `<ol>${b.steps.map(s => `<li>${md(s)}</li>`).join('')}</ol>` : ''}${b.a ? `<div class="a">${md(b.a)}</div>` : ''}</div>`;
      case 'viz': return renderViz(b);
      default: return '';
    }
  }

  /* ---------- test tanımları ---------- */
  const cache = {};
  function topicTestQs(tid) {
    const list = [...(TQ[tid] || []), ...EXAMS.flatMap(e => e.questions).filter(q => q.topic === tid)];
    const out = [], ids = new Set();
    list.forEach(q => { if (!ids.has(q._id)) { ids.add(q._id); out.push(q); } });
    return out.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
  }
  function buildRandom(counts) {
    const seen = store.get(COURSE.seenKey, {});
    const chosen = [];
    TYPE_ORDER.forEach(type => {
      const n = counts[type] || 0;
      let pool = BANK.filter(q => q.type === type && !q.noRandom);
      const used = {}, tb = new Map(pool.map(q => [q, Math.random()]));
      while (chosen.filter(q => q.type === type).length < n && pool.length) {
        let best = null, bs = Infinity;
        pool.forEach(q => {
          const sc = (seen[q._id] || 0) * 10 + (used[q.topic] || 0) * 4 + tb.get(q) * 3;
          if (sc < bs) { bs = sc; best = q; }
        });
        chosen.push(best);
        used[best.topic] = (used[best.topic] || 0) + 1;
        pool = pool.filter(q => q !== best);
      }
    });
    chosen.forEach(q => { seen[q._id] = (seen[q._id] || 0) + 1; });
    store.set(COURSE.seenKey, seen);
    return chosen;
  }
  function autoTests() {
    const probs = BANK.filter(q => q.type === 'prob');
    return [
      { id: 'rastgele', title: 'Rastgele vize', desc: COURSE.randomDesc, group: 'vize', mode: 'exam', dyn: true },
      { id: 'problemler', title: 'Tüm çok adımlı problemler', desc: `Hocanın tarzındaki ${probs.length} problem, anında kontrol.`, group: 'pratik', mode: 'practice', questions: probs },
      { id: 'karisik', title: 'Karışık pratik', desc: 'Tüm bankadan rastgele 20 kısa soru, anında kontrol.', group: 'pratik', mode: 'practice', dyn: true },
      ...TOPICS.map(t => ({ id: 'konu-' + t.id, title: `${t.no}. ${t.title}`, desc: '', group: 'konu', mode: 'practice', questions: topicTestQs(t.id), topic: t.id }))
    ];
  }
  function getTest(id) {
    const e = EXAMS.find(x => x.id === id);
    if (e) return Object.assign({ mode: 'exam', group: 'vize' }, e);
    const a = autoTests().find(x => x.id === id);
    if (!a) return null;
    if (id === 'rastgele') { if (!cache.r) cache.r = buildRandom(COURSE.randomExam); a.questions = cache.r; }
    if (id === 'karisik') {
      if (!cache.k) cache.k = shuffle(BANK.filter(q => q.type !== 'prob'), Math.random).slice(0, 20);
      a.questions = cache.k;
    }
    return a;
  }
  function ordered(T) {
    if (T.mode !== 'exam') return T.questions.slice();
    return TYPE_ORDER.flatMap(t => T.questions.filter(q => q.type === t));
  }

  /* ---------- görünümler ---------- */
  function setTab(tab) {
    D.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  }
  function fmtBlock() {
    return `<div class="fmt">${FORMAT.map(f => `<div class="card"><div class="r">${md(f.range)}</div><div class="w">${md(f.what)}</div><div><span class="big">${md(f.big)}</span><span class="small">${md(f.small)}</span></div></div>`).join('')}</div>` +
      (COURSE.formatNote ? `<div class="note"><b>${md(COURSE.formatTitle || 'Not')}:</b> ${md(COURSE.formatNote)}</div>` : '');
  }
  function viewReviewList() {
    setTab('tekrar');
    let h = `<h1>Genel Tekrar</h1><p class="lead">${md(COURSE.reviewLead || '')}</p>`;
    if (COURSE.hocaLink) h += `<p><a class="btn" href="${COURSE.hocaLink.href}">${md(COURSE.hocaLink.text)}</a></p>`;
    h += `<h2>Önce tuzaklar</h2><div class="card"><ul class="traps">${TRAPS.map(t => `<li>${md(t.t)}${t.topic && topicById[t.topic] ? ` <a href="#tekrar/${t.topic}">${esc(topicById[t.topic].title)} →</a>` : ''}</li>`).join('')}</ul></div>`;
    h += `<h2>Konular</h2><div class="tlist">${TOPICS.map(t => `<a href="#tekrar/${t.id}"><span class="n">${t.no}</span><span><b>${md(t.title)}</b>${t.star ? ' <span class="star">★ ' + esc(t.star) + '</span>' : ''}<span class="s">${md(t.src || '')}</span></span></a>`).join('')}</div>`;
    h += `<p class="foot">Kaynak: ders defteri notları ve hocanın "Sınavda Çıkacak Sorular" sayfası.</p>`;
    return h;
  }
  function viewTopic(id) {
    setTab('tekrar');
    const t = topicById[id];
    if (!t) return viewReviewList();
    const i = t.no - 1, prev = TOPICS[i - 1], next = TOPICS[i + 1];
    const nq = topicTestQs(t.id).length;
    let h = `<p><a href="#tekrar">← Konular</a></p><h1>${t.no}. ${md(t.title)}</h1><p class="src">${md(t.src || '')}</p>`;
    h += `<div class="topic">${t.blocks.map(renderBlock).join('')}</div>`;
    h += `<div class="pager"><span>${prev ? `<a href="#tekrar/${prev.id}">← ${esc(prev.title)}</a>` : ''}</span>` +
      `<a class="btn" href="#test/konu-${t.id}">Konu testi (${nq} soru) →</a>` +
      `<span>${next ? `<a href="#tekrar/${next.id}">${esc(next.title)} →</a>` : ''}</span></div>`;
    return h;
  }
  function viewTestList() {
    setTab('test');
    const best = store.get(COURSE.storeKey, {});
    const all = [...EXAMS.map(e => Object.assign({ mode: 'exam', group: 'vize' }, e)), ...autoTests()];
    const card = T => {
      const n = T.dyn ? (T.id === 'rastgele' ? Object.values(COURSE.randomExam).reduce((a, b) => a + b, 0) : 20) : T.questions.length;
      return `<a class="card tcard${T.featured ? ' featured' : ''}" href="#test/${T.id}"><div class="t">${md(T.title)}</div>` +
        (T.desc ? `<div class="d">${md(T.desc)}</div>` : '') +
        `<div class="meta">${n} soru · ${T.mode === 'exam' ? 'sonda puanlama' : 'anında kontrol'}</div>` +
        (best[T.id] != null ? `<div class="best">En iyi: ${best[T.id]}${T.mode === 'exam' ? '/100' : '%'}</div>` : '') + '</a>';
    };
    const grp = g => all.filter(T => (T.group || 'vize') === g).map(card).join('');
    let h = `<h1>Test</h1><p class="lead">${md(COURSE.testLead || '')}</p>${fmtBlock()}`;
    h += `<p class="hint">Sayısal cevap yazımı: kesir (3/7), ondalık (0,4286 ya da 0.4286) veya yüzde (%42,86). Doğru yuvarlanmış en az 2 anlamlı basamak yeterli.</p>`;
    h += `<h2>Hocanın soruları</h2><div class="grid">${grp('hoca')}</div>`;
    h += `<h2>Deneme vizeleri</h2><div class="grid">${grp('vize')}</div>`;
    h += `<h2>Pratik</h2><div class="grid">${grp('pratik')}</div>`;
    h += `<h2>Konu testleri</h2><div class="grid">${grp('konu')}</div>`;
    return h;
  }

  /* ---------- soru çizimi ---------- */
  function qHTML(q, n) {
    const t = topicById[q.topic];
    let h = `<div class="q" id="q${n}" data-n="${n}"><div class="qh"><span class="qn">${n}.</span>` +
      (t ? `<a class="badge" href="#tekrar/${q.topic}">${esc(t.title)}</a>` : '') +
      (q.src ? `<span class="badge src">${esc(q.src)}</span>` : '') + '</div>';
    h += `<div class="qt">${q.title ? `<b>${md(q.title)}</b><br>` : ''}${md(q.q)}</div>`;
    if (q.type === 'mc') {
      h += `<div class="opts">${q._perm.map((oi, k) => `<label class="opt"><input type="radio" name="r${n}" value="${k}"><span class="L">${LET[k]})</span><span class="t">${md(q.opts[oi])}</span></label>`).join('')}</div>`;
    } else if (q.type === 'fill') {
      h += `<div class="fillrow"><input class="ans" autocomplete="off" spellcheck="false" data-s="0" placeholder="cevap"> <span class="unit">${md(q.unit || '')}</span><span class="mark"></span></div>`;
    } else if (q.type === 'prob') {
      h += q.steps.map((st, j) => `<div class="step"><label for="i${n}_${j}">${md(st.label)}</label><span><input class="ans" id="i${n}_${j}" autocomplete="off" spellcheck="false" data-s="${j}" placeholder="cevap"> <span class="unit">${md(st.unit || '')}</span> <span class="mark"></span></span></div>`).join('');
    }
    h += `<div class="qa"></div><div class="fb"></div></div>`;
    return h;
  }
  function grade(q, el) {
    if (q.type === 'mc') {
      const sel = el.querySelector('input[type=radio]:checked');
      const disp = sel ? +sel.value : -1;
      const orig = disp >= 0 ? q._perm[disp] : -1;
      return { ok: orig === q.a, frac: orig === q.a ? 1 : 0, disp, orig };
    }
    const items = q.type === 'fill' ? [q] : q.steps;
    const vals = [...el.querySelectorAll('input.ans')].map(i => i.value);
    const oks = items.map((it, j) => itemMatch(vals[j], it));
    const c = oks.filter(Boolean).length;
    return { ok: c === items.length, frac: c / items.length, vals, oks };
  }
  function ruleHTML(q) {
    const t = topicById[q.topic];
    return RULES[q.topic] ? `<div class="rule"><b>Kural · ${esc(t ? t.title : q.topic)}</b>${md(RULES[q.topic])} <a href="#tekrar/${q.topic}">Konuya git →</a></div>` : '';
  }
  function feedback(q, g) {
    let h = '';
    if (q.type === 'mc') {
      const cd = q._perm.indexOf(q.a);
      h += g.ok ? '<div class="res r">✓ Doğru</div>'
        : `<div class="res w">✗ ${g.orig < 0 ? 'Boş bıraktın' : 'Yanlış'}. Doğru cevap: ${LET[cd]}) ${md(q.opts[q.a])}</div>`;
      if (q.exp) h += `<div class="exp">${md(q.exp)}</div>`;
      if (!g.ok && g.orig >= 0 && q.why && q.why[g.orig]) h += `<div class="yours"><b>Senin cevabın (${LET[g.disp]})</b>${md(q.why[g.orig])}</div>`;
    } else if (q.type === 'fill') {
      h += g.ok ? '<div class="res r">✓ Doğru</div>' : `<div class="res w">✗ ${g.vals[0].trim() ? 'Yanlış' : 'Boş bıraktın'}. Doğru cevap: ${md(showOf(q))}</div>`;
      if (q.exp) h += `<div class="exp">${md(q.exp)}</div>`;
      if (!g.ok && q.whyFill) {
        const key = Object.keys(q.whyFill).find(k => (parseNum(k) && q.num != null) ? numMatch(g.vals[0], parseNum(k).v, { tol: 1e-9 }) : textMatch(g.vals[0], [k]));
        if (key) h += `<div class="yours"><b>Senin cevabın (${esc(g.vals[0])})</b>${md(q.whyFill[key])}</div>`;
      }
    } else {
      const c = g.oks.filter(Boolean).length;
      h += `<div class="res ${g.ok ? 'r' : 'w'}">${g.ok ? '✓ Tüm adımlar doğru' : `${c}/${q.steps.length} adım doğru`}</div>`;
      h += `<ol>${q.steps.map((st, j) => `<li><b>${md(st.label)}</b> ${md(showOf(st))}${st.unit && !st.pct ? ' ' + md(st.unit) : ''}${st.exp ? ' — ' + md(st.exp) : ''}</li>`).join('')}</ol>`;
      if (q.note) h += `<div class="exp">${md(q.note)}</div>`;
    }
    if (!g.ok) h += ruleHTML(q);
    return h;
  }
  function showResult(q, el, g) {
    el.classList.add('locked', g.ok ? 'ok' : 'bad');
    el.querySelectorAll('input').forEach(i => { i.disabled = true; });
    if (q.type === 'mc') {
      const cd = q._perm.indexOf(q.a);
      el.querySelectorAll('.opt').forEach((o, k) => {
        if (k === cd) o.classList.add('right');
        else if (k === g.disp) o.classList.add('wrong');
      });
    } else {
      el.querySelectorAll('input.ans').forEach((inp, j) => {
        inp.classList.add(g.oks[j] ? 'right' : 'wrong');
        const m = inp.parentElement.querySelector('.mark');
        if (m) { m.textContent = g.oks[j] ? '✓' : '✗'; m.className = 'mark ' + (g.oks[j] ? 'r' : 'w'); }
      });
    }
    el.querySelector('.fb').innerHTML = feedback(q, g);
    typeset(el.querySelector('.fb'));
  }

  /* ---------- test çalıştırma ---------- */
  let cur = null;
  function viewTest(id) {
    setTab('test');
    const T = getTest(id);
    if (!T) return `<p><a href="#test">← Testler</a></p><h1>Test bulunamadı</h1>`;
    const qs = ordered(T);
    cur = { T, qs, done: false, res: {} };
    const exam = T.mode === 'exam';
    let h = `<p><a href="#test">← Testler</a></p><h1>${md(T.title)}</h1>`;
    if (T.desc) h += `<p class="lead">${md(T.desc)}</p>`;
    if (exam) {
      const pts = COURSE.points || {};
      h += `<p class="hint">${qs.length} soru. Cevapla, en sonda “Bitir ve puanla”ya bas. Puan 100 üzerinden hesaplanır.</p><div id="score"></div>`;
      let n = 0;
      TYPE_ORDER.forEach((t, si) => {
        const part = qs.filter(q => q.type === t);
        if (!part.length) return;
        h += `<h2 class="sec-h">Bölüm ${si + 1} · ${TYPE_NAME[t]} <small>(${part.length} × ${pts[t] || 1} puan)</small></h2>`;
        part.forEach(q => { h += qHTML(q, ++n); });
      });
      h += `<div class="actions"><button class="btn" id="finish">Bitir ve puanla</button>${T.id === 'rastgele' ? '<button class="btn ghost" id="newrand">Yeni rastgele vize</button>' : ''}</div>`;
    } else {
      h += `<div class="prog" id="prog"></div>`;
      qs.forEach((q, i) => { h += qHTML(q, i + 1); });
      h += `<div class="actions"><button class="btn ghost" id="restart">Baştan başlat</button>${T.id === 'karisik' ? '<button class="btn ghost" id="newmix">Yeni karışık set</button>' : ''}</div>`;
    }
    return h;
  }
  function afterTest() {
    if (!cur) return;
    const exam = cur.T.mode === 'exam';
    app.querySelectorAll('.q').forEach(el => {
      if (!exam) el.querySelector('.qa').innerHTML = '<button class="btn ghost chk">Kontrol et</button>';
    });
    if (!exam) updateProg();
  }
  function updateProg() {
    const p = D.getElementById('prog');
    if (!p || !cur) return;
    const vals = Object.values(cur.res), n = cur.qs.length;
    const ok = vals.filter(r => r.ok).length;
    p.innerHTML = `Kontrol edilen <b>${vals.length}/${n}</b> · Doğru <b>${ok}</b>${vals.length ? ` · Başarı %${Math.round(100 * ok / vals.length)}` : ''}<div class="bar"><i style="width:${(100 * vals.length / n).toFixed(1)}%"></i></div>`;
    if (vals.length === n) {
      const best = store.get(COURSE.storeKey, {}), pct = Math.round(100 * ok / n);
      if (best[cur.T.id] == null || pct > best[cur.T.id]) { best[cur.T.id] = pct; store.set(COURSE.storeKey, best); }
    }
  }
  function checkOne(el) {
    const n = +el.dataset.n, q = cur.qs[n - 1];
    const g = grade(q, el);
    cur.res[n] = g;
    showResult(q, el, g);
    el.querySelector('.qa').innerHTML = '';
    updateProg();
  }
  function finishExam() {
    if (!cur || cur.done) return;
    cur.done = true;
    const pts = COURSE.points || {};
    let earned = 0, total = 0;
    const by = {}, wrongTopics = new Set();
    app.querySelectorAll('.q').forEach(el => {
      const n = +el.dataset.n, q = cur.qs[n - 1];
      const g = grade(q, el);
      const p = pts[q.type] || 1;
      total += p; earned += p * g.frac;
      by[q.type] = by[q.type] || { ok: 0, n: 0, pts: 0, max: 0 };
      by[q.type].n++; by[q.type].ok += g.ok ? 1 : 0; by[q.type].pts += p * g.frac; by[q.type].max += p;
      if (!g.ok) wrongTopics.add(q.topic);
      showResult(q, el, g);
    });
    const score = Math.round(100 * earned / total);
    const best = store.get(COURSE.storeKey, {});
    const isBest = best[cur.T.id] == null || score > best[cur.T.id];
    if (isBest) { best[cur.T.id] = score; store.set(COURSE.storeKey, best); }
    const rows = TYPE_ORDER.filter(t => by[t]).map(t => `<span>${TYPE_NAME[t]}: ${by[t].ok}/${by[t].n} tam doğru · ${Math.round(by[t].pts * 10) / 10}/${by[t].max} puan</span>`).join('');
    const wt = [...wrongTopics].filter(t => topicById[t]).map(t => `<a href="#tekrar/${t}">${esc(topicById[t].title)}</a>`).join(' · ');
    D.getElementById('score').innerHTML = `<div class="card score"><div class="big">${score}<span style="font-size:1.1rem;color:var(--muted)">/100</span></div>` +
      `<div class="rows">${rows}</div>${isBest ? '<div class="wt" style="color:var(--ok)">Yeni en iyi skor kaydedildi.</div>' : `<div class="wt">En iyi: ${best[cur.T.id]}/100</div>`}` +
      (wt ? `<div class="wt">Tekrar et: ${wt}</div>` : '') +
      `<div class="actions" style="justify-content:center"><button class="btn ghost" id="restart">Tekrar çöz</button>${cur.T.id === 'rastgele' ? '<button class="btn ghost" id="newrand">Yeni rastgele vize</button>' : ''}</div></div>`;
    const f = D.getElementById('finish');
    if (f) f.disabled = true;
    W.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- yönlendirme ---------- */
  function route() {
    const hsh = (location.hash || '#tekrar').slice(1);
    const [tab, id] = hsh.split('/');
    cur = null;
    let h;
    if (tab === 'test') h = id ? viewTest(decodeURIComponent(id)) : viewTestList();
    else h = id ? viewTopic(decodeURIComponent(id)) : viewReviewList();
    app.innerHTML = h;
    afterTest();
    typeset(app);
    W.scrollTo(0, 0);
  }

  app.addEventListener('click', e => {
    const t = e.target;
    if (t.classList.contains('chk')) { checkOne(t.closest('.q')); return; }
    if (t.id === 'finish') { finishExam(); return; }
    if (t.id === 'restart') { route(); return; }
    if (t.id === 'newrand') { delete cache.r; route(); return; }
    if (t.id === 'newmix') { delete cache.k; route(); return; }
  });
  app.addEventListener('change', e => {
    if (e.target.type === 'radio') {
      const q = e.target.closest('.q');
      q.querySelectorAll('.opt').forEach(o => o.classList.toggle('sel', o.contains(e.target)));
    }
  });
  app.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.classList.contains('ans') && cur && cur.T.mode !== 'exam') {
      const q = e.target.closest('.q');
      const inputs = [...q.querySelectorAll('input.ans')];
      const i = inputs.indexOf(e.target);
      if (i < inputs.length - 1) inputs[i + 1].focus();
      else if (q.querySelector('.chk')) checkOne(q);
    }
  });

  /* ---------- PDF (yazdırma) düzeni ---------- */
  function printQ(q, n) {
    let h = `<div class="pq"><div class="qt"><b>${n}.</b> ${q.title ? `<b>${md(q.title)}</b> ` : ''}${md(q.q)}</div>`;
    if (q.type === 'mc') {
      const long = q.opts.some(o => o.replace(/\$[^$]*\$/g, 'xxxx').length > 34);
      h += `<div class="popts${long ? ' one' : ''}">${q._perm.map((oi, k) => `<div>${LET[k]}) ${md(q.opts[oi])}</div>`).join('')}</div>`;
    } else if (q.type === 'fill') {
      h += `<div style="margin-left:14pt">Cevap:<span class="blank"></span> ${md(q.unit || '')}</div>`;
    } else {
      h += q.steps.map(st => `<div style="margin-left:14pt">${md(st.label)}<span class="blank"></span> ${md(st.unit || '')}</div>`).join('');
    }
    return h + '</div>';
  }
  function ansText(q) {
    if (q.type === 'mc') return `${LET[q._perm.indexOf(q.a)]}) ${md(q.opts[q.a])}`;
    if (q.type === 'fill') return md(showOf(q));
    return '';
  }
  function printSol(q, n) {
    let h = `<div class="sol"><span class="n">${n}.</span> `;
    if (q.type === 'prob') {
      h += `${q.title ? `<b>${md(q.title)}</b>` : ''}<ul class="psteps">${q.steps.map(st => `<li><b>${md(st.label)}:</b> ${md(showOf(st))}${st.unit && !st.pct ? ' ' + md(st.unit) : ''}${st.exp ? ' — ' + md(st.exp) : ''}</li>`).join('')}</ul>${q.note ? `<div>${md(q.note)}</div>` : ''}`;
    } else {
      h += `<b>${ansText(q)}</b>${q.exp ? ' — ' + md(q.exp) : ''}`;
    }
    return h + '</div>';
  }
  function printKey(qs) {
    return `<div class="key">${qs.map((q, i) => q.type === 'prob' ? '' : `<div><b>${i + 1})</b> ${q.type === 'mc' ? LET[q._perm.indexOf(q.a)] : md(showOf(q))}</div>`).join('')}</div>`;
  }
  function renderPrint() {
    D.body.classList.add('print');
    const sets = EXAMS.map(e => { const T = Object.assign({ mode: 'exam' }, e); return { title: T.title, desc: T.desc, qs: ordered(T) }; });
    const tsets = TOPICS.filter(t => (TQ[t.id] || []).length).map(t => ({ title: `${t.no}. ${t.title}`, qs: TQ[t.id].slice().sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)) }));
    const nQ = [...sets, ...tsets].reduce((a, s) => a + s.qs.length, 0);
    let h = `<section class="cover"><h1>${esc(COURSE.title)}</h1><div class="sub">Vize genel tekrar ve soru kitapçığı</div>
      <ol class="toc"><li><b>Bölüm 1 · Genel Tekrar</b>: tuzak listesi ve ${TOPICS.length} konu (Bayes teoremi detaylı)</li>
      <li><b>Bölüm 2 · Sorular</b>: hocanın soruları, ${EXAMS.filter(e => e.group !== 'hoca').length} deneme vizesi ve konu soruları (toplam ${nQ} soru)</li>
      <li><b>Bölüm 3 · Cevap anahtarı ve çözümler</b></li></ol>
      <p class="sub" style="margin-top:40pt;font-size:10pt">Kaynak: ders defteri notları ve hocanın “Sınavda Çıkacak Sorular” sayfası.</p></section>`;
    h += `<section class="pg"><h1>Bölüm 1 · Genel Tekrar</h1>${fmtBlock()}<h2>Önce tuzaklar</h2><ul class="traps">${TRAPS.map(t => `<li>${md(t.t)}</li>`).join('')}</ul>`;
    TOPICS.forEach(t => {
      h += `<h2${t.pageBreak ? ' class="pg"' : ''}>${t.no}. ${md(t.title)}</h2><p class="src">${md(t.src || '')}</p><div class="topic">${t.blocks.map(renderBlock).join('')}</div>`;
    });
    h += '</section>';
    h += `<section class="pg"><h1>Bölüm 2 · Sorular</h1><p class="lead">Cevaplar ve çözümler Bölüm 3'te. Deneme puanlaması (varsayım): test ${COURSE.points.mc}, kısa cevap ${COURSE.points.fill}, problem ${COURSE.points.prob} puan.</p>`;
    sets.forEach((s, i) => { h += `<h2${i ? ' class="pg"' : ''}>${md(s.title)}</h2>${s.desc ? `<p class="src">${md(s.desc)}</p>` : ''}${s.qs.map((q, j) => printQ(q, j + 1)).join('')}`; });
    h += `<h2 class="pg">Konu soruları</h2>`;
    tsets.forEach(s => { h += `<h3>${md(s.title)}</h3>${s.qs.map((q, j) => printQ(q, j + 1)).join('')}`; });
    h += '</section>';
    h += `<section class="pg"><h1>Bölüm 3 · Cevap anahtarı ve çözümler</h1>`;
    sets.forEach(s => { h += `<h2>${md(s.title)}</h2>${printKey(s.qs)}${s.qs.map((q, j) => printSol(q, j + 1)).join('')}`; });
    h += `<h2>Konu soruları</h2>`;
    tsets.forEach(s => { h += `<h3>${md(s.title)}</h3>${s.qs.map((q, j) => printSol(q, j + 1)).join('')}`; });
    h += '</section>';
    app.innerHTML = h;
    typeset(app);
    W.__ready = true;
  }

  /* ---------- tema ---------- */
  const th = D.getElementById('theme');
  if (th) th.addEventListener('click', () => {
    const root = D.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : W.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* yok say */ }
  });

  W.__STAT = { parseNum, numMatch, textMatch, showOf, BANK, getTest, topicTestQs, route, renderPrint, autoTests };
  if (D.body.dataset.mode === 'print') renderPrint();
  else { W.addEventListener('hashchange', route); route(); }
})();
