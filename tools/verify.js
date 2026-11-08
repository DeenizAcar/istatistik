/* Soru bankasını doğrular: her sayısal cevap yeniden hesaplanır, gösterilen cevap motor tarafından kabul edilmeli,
   tüm sayfalar hatasız çizilmeli. Kullanım: node tools/verify.js */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* ---------- yardımcı hesaplar (S) ---------- */
const sorted = a => a.slice().sort((x, y) => x - y);
const S = {
  mean: a => a.reduce((t, x) => t + x, 0) / a.length,
  med(a) { const s = sorted(a), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; },
  // Hocanın yöntemi: n çiftse ilk yarı / son yarı. n tekse ortadaki hariç.
  q1(a) { const s = sorted(a), n = s.length; return S.med(s.slice(0, Math.floor(n / 2))); },
  q3(a) { const s = sorted(a), n = s.length; return S.med(s.slice(Math.ceil(n / 2))); },
  mode(a) { const c = {}; a.forEach(x => { c[x] = (c[x] || 0) + 1; }); const m = Math.max(...Object.values(c)); const ks = Object.keys(c).filter(k => c[k] === m); if (ks.length !== 1) throw new Error('mod tek değil: ' + ks); return Number(ks[0]); },
  range: a => Math.max(...a) - Math.min(...a),
  ssd(a) { const m = S.mean(a); return a.reduce((t, x) => t + (x - m) ** 2, 0); },
  varS: a => S.ssd(a) / (a.length - 1),
  varP: a => S.ssd(a) / a.length,
  sdS: a => Math.sqrt(S.varS(a)),
  oa(a) { const m = S.mean(a); return a.reduce((t, x) => t + Math.abs(x - m), 0) / a.length; },
  madn(a) { const md = S.med(a); return S.med(a.map(x => Math.abs(x - md))) / 0.6745; },
  r(x, y) { const mx = S.mean(x), my = S.mean(y); let sxy = 0, sxx = 0, syy = 0; x.forEach((v, i) => { sxy += (v - mx) * (y[i] - my); sxx += (v - mx) ** 2; syy += (y[i] - my) ** 2; }); return sxy / Math.sqrt(sxx * syy); },
  f: n => (n <= 1 ? 1 : n * S.f(n - 1)),
  P: (n, r) => S.f(n) / S.f(n - r),
  C: (n, r) => Math.round(S.f(n) / (S.f(r) * S.f(n - r))),
  count: (a, lo, hi) => a.filter(x => x >= lo && x <= hi).length,
  below: (a, v) => a.filter(x => x < v).length
};

/* ---------- sahte tarayıcı ---------- */
const fakeEl = () => ({ innerHTML: '', dataset: {}, classList: { add() {}, toggle() {} }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] });
const appEl = fakeEl();
const body = fakeEl();
const ctx = {
  S, console, Math, JSON, Number, String, Object, Array, Set, Map, isFinite, parseFloat, Error,
  location: { hash: '' },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); } },
  document: { body, documentElement: fakeEl(), getElementById: id => (id === 'app' ? appEl : null), querySelectorAll: () => [] },
  addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: false })
};
ctx.window = ctx;
vm.createContext(ctx);
const root = path.join(__dirname, '..');
['assets/content.js', 'assets/questions.js', 'assets/app.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
const { numMatch, parseNum, showOf, BANK, route, renderPrint, autoTests } = ctx.__STAT;

/* ---------- kontroller ---------- */
const errs = [];
const err = (q, m) => errs.push(`[${q.topic}] ${(q.title || q.q).slice(0, 60)} → ${m}`);
const close = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
const optVal = o => {
  const s = String(o).replace(/\$/g, '').trim();
  const m = s.match(/^\\d?frac\{(\d+)\}\{(\d+)\}$/);
  if (m) return +m[1] / +m[2];
  const p = parseNum(s);
  return p ? p.v : null;
};
const topics = new Set(ctx.TOPICS.map(t => t.id));
const letters = {};
const types = {};
const byTopic = {};

function checkItem(q, it, label) {
  if (it.num == null) {
    if (!it.ans || !it.ans.length) err(q, `${label}: cevap yok`);
    return;
  }
  if (typeof it.check !== 'function') err(q, `${label}: check yok`);
  else {
    let v;
    try { v = it.check(); } catch (e) { err(q, `${label}: check hata ${e.message}`); return; }
    if (!close(v, it.num)) err(q, `${label}: num=${it.num} ama hesap=${v}`);
  }
  // Gösterilen cevabın her parçası motor tarafından kabul edilmeli
  const parts = String(showOf(it)).split(/[≈=]/).map(s => s.trim()).filter(s => s && !/[a-zA-Z]/.test(s));
  if (!parts.length) err(q, `${label}: gösterilecek cevap çözümlenemedi`);
  parts.forEach(p => { if (!numMatch(p, it.num, it)) err(q, `${label}: gösterilen "${p}" kabul edilmiyor (num=${it.num})`); });
  if (numMatch('0', it.num, it) && Math.abs(it.num) > 1e-9) err(q, `${label}: "0" yanlışlıkla kabul ediliyor`);
}

BANK.forEach(q => {
  if (!topics.has(q.topic)) err(q, 'bilinmeyen konu ' + q.topic);
  types[q.type] = (types[q.type] || 0) + 1;
  byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
  const texts = [q.q, q.title, q.exp, q.note, ...(q.opts || []), ...((q.steps || []).flatMap(s => [s.label, s.exp, s.show]))].filter(Boolean);
  texts.forEach(t => { if (((String(t).match(/\$/g) || []).length) % 2) err(q, 'tek sayıda $ işareti: ' + String(t).slice(0, 40)); });
  if (q.type === 'mc') {
    if (!(q.a >= 0 && q.a < q.opts.length)) err(q, 'a aralık dışı');
    if (new Set(q.opts).size !== q.opts.length) err(q, 'tekrar eden şık');
    Object.keys(q.why || {}).forEach(k => { if (!(k >= 0 && k < q.opts.length)) err(q, 'why anahtarı geçersiz ' + k); if (+k === q.a) err(q, 'why doğru şıkka yazılmış'); });
    const L = 'ABCDE'[q._perm.indexOf(q.a)];
    letters[L] = (letters[L] || 0) + 1;
    if (typeof q.check === 'function') {
      const v = q.check();
      const ov = optVal(q.opts[q.a]);
      if (ov == null || Math.abs(ov - v) > 1e-6 * Math.max(1, Math.abs(v))) err(q, `doğru şık ${q.opts[q.a]} ama hesap=${v}`);
      q.opts.forEach((o, i) => { if (i !== q.a) { const x = optVal(o); if (x != null && Math.abs(x - v) < 1e-6) err(q, `yanlış şık ${o} de doğru değer`); } });
    }
  } else if (q.type === 'fill') {
    checkItem(q, q, 'cevap');
  } else if (q.type === 'prob') {
    q.steps.forEach((st, i) => checkItem(q, st, `adım ${i + 1}`));
  } else err(q, 'bilinmeyen tip');
});

// Sayfaları çiz: hata ya da "undefined" olmamalı
const routes = ['#tekrar', ...ctx.TOPICS.map(t => '#tekrar/' + t.id), '#test', ...ctx.EXAMS.map(e => '#test/' + e.id), ...autoTests().map(t => '#test/' + t.id)];
routes.forEach(h => {
  ctx.location.hash = h;
  try { route(); } catch (e) { errs.push(`çizim hatası ${h}: ${e.message}`); return; }
  if (/undefined|NaN/.test(appEl.innerHTML)) errs.push(`çizimde undefined/NaN: ${h}`);
});
try { renderPrint(); if (/undefined|NaN/.test(appEl.innerHTML)) errs.push('PDF düzeninde undefined/NaN'); } catch (e) { errs.push('PDF çizim hatası: ' + e.message); }

/* ---------- rapor ---------- */
console.log(`Soru sayısı: ${BANK.length}`, types);
console.log('Konu başına:', byTopic);
console.log('Doğru şık harf dağılımı:', letters);
ctx.EXAMS.forEach(e => {
  const c = {}; e.questions.forEach(q => { c[q.type] = (c[q.type] || 0) + 1; });
  console.log(`  ${e.id}: ${JSON.stringify(c)}`);
});
if (errs.length) { console.log(`\n${errs.length} HATA:`); errs.forEach(e => console.log(' - ' + e)); process.exit(1); }
console.log('\n0 hata. Tüm cevaplar doğrulandı.');
