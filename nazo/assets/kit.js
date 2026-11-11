/* StudyKit: site içi arama (🔍, "/" ya da Ctrl+K) ve sesli okuma (🔊).
   Kullanım: StudyKit.init({ accent, index: function () { return [{ t, s, h, k }] }, speak: [{ sel, lang, text? }] }) */
(function () {
  'use strict';
  if (window.StudyKit) return;
  var CFG = null, IDX = null, ui = null;

  var FM = { 'İ': 'i', 'I': 'i', 'ı': 'i', 'ş': 's', 'ğ': 'g', 'ç': 'c', 'ö': 'o', 'ü': 'u', 'ä': 'a', 'ß': 'ss', 'â': 'a', 'à': 'a', 'á': 'a', 'î': 'i', 'í': 'i', 'û': 'u', 'ú': 'u', 'é': 'e', 'è': 'e' };
  function fc(ch) { var lo = FM[ch]; if (lo != null) return lo; lo = ch.toLowerCase(); return FM[lo] != null ? FM[lo] : lo.length === 1 ? lo : ch; }
  /* katlanmış metin + her katlanmış karakterin asıl metindeki yeri (vurgulama kaymasın diye) */
  function foldMap(s) {
    s = String(s || ''); var f = '', map = [];
    for (var i = 0; i < s.length; i++) { var c = fc(s[i]); for (var k = 0; k < c.length; k++) { f += c[k]; map.push(i); } }
    map.push(s.length);
    return { f: f, map: map };
  }
  function fold(s) { return foldMap(s).f; }
  function plain(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/[*`_~]+/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------- tema ---------- */
  function lum(c) {
    var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/.exec(c || '');
    if (!m || m[4] === '0') return null;
    return (0.299 * m[1] + 0.587 * m[2] + 0.114 * m[3]) / 255;
  }
  function isDark() {
    var els = [document.body, document.documentElement];
    for (var i = 0; i < els.length; i++) { var l = lum(getComputedStyle(els[i]).backgroundColor); if (l != null) return l < 0.5; }
    return matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function paint() {
    if (!ui) return;
    ui.root.classList.toggle('sk-dark', isDark());
  }

  var CSS = '' +
    '.sk-fab{position:fixed;left:16px;bottom:16px;z-index:60;width:44px;height:44px;border-radius:50%;border:1px solid var(--sk-line);background:var(--sk-bg);color:var(--sk-fg);' +
    'display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.18);font-size:18px;transition:transform .15s,border-color .15s}' +
    '.sk-fab:hover{transform:translateY(-2px);border-color:var(--sk-acc)}' +
    '.sk{--sk-bg:#fff;--sk-fg:#1d1f24;--sk-mute:#6a6f7b;--sk-line:#e3e4e8;--sk-soft:#f3f4f6;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '.sk.sk-dark{--sk-bg:#1b1d23;--sk-fg:#eceef2;--sk-mute:#9aa0ab;--sk-line:#30333c;--sk-soft:#242730}' +
    '.sk-ov{position:fixed;inset:0;z-index:1000;background:rgba(10,12,16,.45);backdrop-filter:blur(3px);display:none;align-items:flex-start;justify-content:center;padding:9vh 14px 14px}' +
    '.sk-ov.open{display:flex}' +
    '.sk-box{width:min(640px,100%);max-height:78vh;display:flex;flex-direction:column;background:var(--sk-bg);color:var(--sk-fg);border:1px solid var(--sk-line);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);overflow:hidden}' +
    '.sk-in{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--sk-line)}' +
    '.sk-in input{flex:1;font:inherit;font-size:16px;border:0;outline:0;background:transparent;color:var(--sk-fg)}' +
    '.sk-in kbd,.sk-x{font:12px/1 inherit;color:var(--sk-mute);border:1px solid var(--sk-line);border-radius:6px;padding:4px 7px;background:var(--sk-soft);cursor:pointer}' +
    '.sk-res{overflow:auto;padding:6px}' +
    '.sk-res a{display:block;padding:9px 11px;border-radius:10px;color:var(--sk-fg);text-decoration:none;border:1px solid transparent}' +
    '.sk-res a.on,.sk-res a:hover{background:var(--sk-soft);border-color:var(--sk-line)}' +
    '.sk-res b{font-weight:650}.sk-res mark{background:color-mix(in srgb,var(--sk-acc) 30%,transparent);color:inherit;border-radius:3px;padding:0 1px}' +
    '.sk-k{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--sk-acc);margin-right:8px}' +
    '.sk-s{display:block;color:var(--sk-mute);font-size:13px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.sk-empty{padding:22px;text-align:center;color:var(--sk-mute)}' +
    '.sk-say{display:inline-grid;place-items:center;width:max(1.7em,22px);height:max(1.7em,22px);margin-left:.35em;vertical-align:middle;border-radius:50%;border:1px solid currentColor;' +
    'background:transparent;color:inherit;opacity:.55;cursor:pointer;font-size:max(.72em,11px);line-height:1;padding:0;transition:opacity .15s}' +
    '.sk-say:hover,.sk-say.on{opacity:1}.sk-say svg{width:1em;height:1em}' +
    '.sk-fab.sk-hide{transform:translateY(90px);opacity:0;pointer-events:none}' +
    'body:has(#prog.progress) .sk-fab{bottom:86px}' +
    '@media (max-width:640px){.sk-fab{width:40px;height:40px;left:12px;bottom:12px;opacity:.9;transition:transform .25s,opacity .25s}}' +
    '@media print{.sk-fab,.sk-say{display:none}}';

  function build() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var root = document.createElement('div'); root.className = 'sk';
    root.style.setProperty('--sk-acc', CFG.accent || 'var(--accent, #5b7cfa)');
    root.innerHTML =
      '<button type="button" class="sk-fab" aria-label="Sitede ara" title="Ara ( / )">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>' +
      '<div class="sk-ov" role="dialog" aria-modal="true" aria-label="Arama"><div class="sk-box">' +
      '<div class="sk-in"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="opacity:.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
      '<input type="search" placeholder="' + esc(CFG.placeholder || 'Konu, soru ya da kelime ara') + '" autocomplete="off" spellcheck="false">' +
      '<button type="button" class="sk-x">Esc</button></div><div class="sk-res"></div></div></div>';
    (CFG.mount || document.body).appendChild(root);
    var fab = root.querySelector('.sk-fab');
    if (CFG.fabBottom) fab.style.bottom = CFG.fabBottom;
    if (CFG.fabSide === 'right') { fab.style.left = 'auto'; fab.style.right = '16px'; }
    ui = { root: root, ov: root.querySelector('.sk-ov'), inp: root.querySelector('input'), res: root.querySelector('.sk-res'), sel: 0, items: [] };
    fab.addEventListener('click', open);
    root.querySelector('.sk-x').addEventListener('click', close);
    ui.ov.addEventListener('click', function (e) { if (e.target === ui.ov) close(); });
    var t;
    ui.inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(search, 90); });
    ui.inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { var a = ui.res.querySelectorAll('a')[ui.sel]; if (a) { e.preventDefault(); a.click(); } }
    });
    ui.res.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ui.ov.classList.contains('open')) { close(); return; }
      var tag = (e.target && e.target.tagName) || '';
      var typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable);
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); }
    });
    var lastY = window.scrollY, ticking = 0;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = requestAnimationFrame(function () {
        ticking = 0;
        var y = window.scrollY, d = y - lastY;
        if (Math.abs(d) > 6) { fab.classList.toggle('sk-hide', d > 0 && y > 120); lastY = y; }
      });
    }, { passive: true });
    paint();
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    if (document.body) new MutationObserver(paint).observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
  }
  function open() {
    paint();
    if (!IDX) {
      try { IDX = (CFG.index() || []).filter(function (x) { return x && x.t; }).map(function (x) {
        x.t = plain(x.t); x.s = plain(x.s || ''); x.f = fold(x.t + ' ' + x.s); x.ft = fold(x.t);
        x.fw = ' ' + x.ft.replace(/[^a-z0-9]+/g, ' ') + ' '; x.fb = x.ft.replace(/^(der|die|das|sich|to|the|a|an) /, '').replace(/[^a-z0-9 ]+/g, '').trim(); return x;
      }); } catch (e) { IDX = []; if (window.console) console.warn('StudyKit index', e); }
    }
    ui.ov.classList.add('open'); ui.inp.value = ''; search();
    ui.inp.focus(); setTimeout(function () { ui.inp.focus(); }, 30);
  }
  function close() { ui.ov.classList.remove('open'); }
  function move(d) {
    var as = ui.res.querySelectorAll('a'); if (!as.length) return;
    ui.sel = (ui.sel + d + as.length) % as.length;
    as.forEach(function (a, i) { a.classList.toggle('on', i === ui.sel); });
    as[ui.sel].scrollIntoView({ block: 'nearest' });
  }
  function hl(text, terms) {
    var fm = foldMap(text), marks = [];
    terms.forEach(function (tm) { var i = fm.f.indexOf(tm); if (i >= 0) marks.push([fm.map[i], fm.map[i + tm.length - 1] + 1]); });
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', p = 0;
    marks.forEach(function (m) { if (m[0] < p) return; out += esc(text.slice(p, m[0])) + '<mark>' + esc(text.slice(m[0], m[1])) + '</mark>'; p = m[1]; });
    return out + esc(text.slice(p));
  }
  function snippet(s, terms) {
    if (!s) return '';
    var fm = foldMap(s), i = -1;
    terms.some(function (tm) { i = fm.f.indexOf(tm); return i >= 0; });
    if (i < 0) return s.slice(0, 140);
    var a = Math.max(0, fm.map[i] - 50);
    return (a ? '…' : '') + s.slice(a, a + 150);
  }
  function search() {
    var q = fold(ui.inp.value.trim()), terms = q.split(/\s+/).filter(Boolean);
    ui.sel = 0;
    if (!terms.length) {
      ui.res.innerHTML = '<div class="sk-empty">' + (IDX.length ? IDX.length + ' kayıt içinde ara. <br><small>İpucu: "/" ya da Ctrl+K ile açılır, ↑ ↓ ve Enter ile seçilir.</small>' : 'Arama dizini boş.') + '</div>';
      return;
    }
    var hits = [];
    for (var i = 0; i < IDX.length; i++) {
      var x = IDX[i], ok = true, sc = 0;
      for (var j = 0; j < terms.length; j++) {
        var p = x.f.indexOf(terms[j]); if (p < 0) { ok = false; break; }
        var pt = x.ft.indexOf(terms[j]);
        sc += pt === 0 ? 0 : pt > 0 ? 1 : 3;
        if (pt >= 0 && x.fw.indexOf(' ' + terms[j] + ' ') >= 0) sc -= 2;
      }
      if (ok && x.fb === q) sc -= 4;
      if (ok) hits.push([sc + (x.w || 0), i]);
    }
    hits.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    hits = hits.slice(0, 60);
    if (!hits.length) { ui.res.innerHTML = '<div class="sk-empty">Sonuç yok.</div>'; return; }
    ui.res.innerHTML = hits.map(function (h, n) {
      var x = IDX[h[1]], sn = snippet(x.s, terms);
      return '<a href="' + esc(x.h) + '"' + (n === 0 ? ' class="on"' : '') + '>' + (x.k ? '<span class="sk-k">' + esc(x.k) + '</span>' : '') +
        '<b>' + hl(x.t, terms) + '</b>' + (sn ? '<span class="sk-s">' + hl(sn, terms) + '</span>' : '') + '</a>';
    }).join('');
  }

  /* ---------- sesli okuma ---------- */
  var VOICES = {};
  function voiceFor(lang) {
    if (!('speechSynthesis' in window)) return null;
    var base = lang.slice(0, 2).toLowerCase();
    if (VOICES[lang] !== undefined) return VOICES[lang];
    var vs = speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.toLowerCase().slice(0, 2) === base; });
    if (!vs.length) return null;
    vs.sort(function (a, b) {
      var s = function (v) { return (/natural|neural|online|google/i.test(v.name) ? 2 : 0) + (v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase() ? 1 : 0); };
      return s(b) - s(a);
    });
    return (VOICES[lang] = vs[0]);
  }
  if ('speechSynthesis' in window && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', function () { VOICES = {}; });
  var current = null;
  function say(text, lang, btn) {
    if (!('speechSynthesis' in window)) return false;
    speechSynthesis.cancel();
    if (current) current.classList.remove('on');
    var u = new SpeechSynthesisUtterance(String(text).replace(/[*`_]/g, '').replace(/\s*\/\s*/g, ', '));
    u.lang = lang; var v = voiceFor(lang); if (v) u.voice = v;
    u.rate = 0.92;
    if (btn) { current = btn; btn.classList.add('on'); u.onend = u.onerror = function () { btn.classList.remove('on'); }; }
    speechSynthesis.speak(u);
    return true;
  }
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>';
  function decorate() {
    if (!CFG || !CFG.speak || !('speechSynthesis' in window)) return;
    CFG.speak.forEach(function (r) {
      document.querySelectorAll(r.sel).forEach(function (el) {
        if (el.dataset.skSay || el.querySelector('.sk-say')) return;
        var txt = r.text ? r.text(el) : el.textContent;
        if (!txt || !String(txt).trim()) return;
        el.dataset.skSay = '1';
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'sk-say'; b.innerHTML = ICON;
        b.setAttribute('aria-label', 'Sesli oku'); b.title = 'Sesli oku';
        b.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation();
          say(r.text ? r.text(el) : el.textContent.trim(), r.lang, b);
        });
        if (r.where === 'before') el.insertBefore(b, el.firstChild); else el.appendChild(b);
      });
    });
  }
  var dq = 0;
  function watch() {
    new MutationObserver(function () { if (dq) return; dq = requestAnimationFrame(function () { dq = 0; decorate(); }); })
      .observe(document.body, { childList: true, subtree: true });
    decorate();
  }

  window.StudyKit = {
    init: function (cfg) {
      CFG = cfg || {};
      var go = function () { if (CFG.index) build(); if (CFG.speak) watch(); };
      if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
    },
    say: say, fold: fold, plain: plain,
    blocks: function (bs) {
      return (bs || []).map(function (b) {
        if (!b) return '';
        if (typeof b === 'string') return b;
        return [b.text, (b.items || []).join(' '), (b.head || []).join(' '), (b.rows || []).map(function (r) { return r.join(' '); }).join(' '), b.code, b.html]
          .filter(Boolean).join(' ');
      }).join(' ');
    },
    refresh: function () { IDX = null; }
  };
})();
