(function () {
  'use strict';

  // Ders ayarları (assets/content.js veya linux/content.js içinde tanımlanır)
  var C = window.COURSE || {};
  var TOPICS = window.TOPICS;
  var EXAMS = window.EXAMS || [];
  var TQ = window.TOPIC_QUESTIONS;
  var EXTRA = window.EXTRA_CODE || [];
  var POINTS = C.points || { mc: 5, fill: 5, code: 20 };
  var app = document.getElementById('app');
  var LETTERS = 'ABCDE';

  /* ---------- Yardımcılar ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Satır içi biçim: `kod` ve **kalın**
  function fmt(s) {
    return String(s).split('`').map(function (seg, i) {
      if (i % 2) return '<code>' + esc(seg) + '</code>';
      return esc(seg).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }).join('');
  }
  // Çok satırlı metin: "- " ile başlayan satırlar liste, boş satır paragraf
  function fmtBlock(s) {
    var out = '', list = false;
    String(s).split(/\r?\n/).forEach(function (line) {
      if (/^- /.test(line)) { if (!list) { out += '<ul>'; list = true; } out += '<li>' + fmt(line.slice(2)) + '</li>'; return; }
      if (list) { out += '</ul>'; list = false; }
      if (line.trim()) out += '<p>' + fmt(line) + '</p>';
    });
    return out + (list ? '</ul>' : '');
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function copy(q, extra) { return Object.assign({}, q, extra || {}); }
  function topicTitle(id) { var t = TOPICS.find(function (x) { return x.id === id; }); return t ? t.title : ''; }
  function topicIndex(id) { return TOPICS.findIndex(function (x) { return x.id === id; }); }

  /* ---------- PHP / HTML renklendirme ---------- */
  var KW = ['if', 'else', 'elseif', 'for', 'foreach', 'while', 'as', 'function', 'return', 'echo', 'true', 'false', 'null', 'exit'];
  var HL = /(\u0001\d+\u0001)|(<!--[\s\S]*?-->|\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"?|'(?:\\.|[^'\\\n])*'?)|(<\?php|\?>)|(<\/?[a-zA-Z][\w-]*)|(\$[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g;

  function hl(code) { return C.lang === 'sh' ? hlSh(code) : C.lang === 'py' ? hlPy(code) : C.lang === 'sql' ? hlSql(code) : hlPhp(code); }

  /* ---------- SQL renklendirme ---------- */
  // Büyük harfli anahtar kelimeler pembe, veri tipleri ayrı renk; 'metin', -- yorum, sayılar.
  var SQLKW = ('SELECT FROM WHERE AND OR NOT INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE DATABASE USE DROP ALTER ADD ' +
    'COLUMN TRUNCATE PRIMARY KEY FOREIGN REFERENCES UNIQUE DEFAULT CHECK NULL IS IN LIKE BETWEEN ORDER BY GROUP HAVING ' +
    'ASC DESC DISTINCT AS JOIN INNER LEFT RIGHT FULL OUTER CROSS ON UNION ALL LIMIT TOP EXISTS COMMIT ROLLBACK SAVEPOINT ' +
    'GRANT REVOKE VIEW INDEX IF AUTO_INCREMENT TRUE FALSE START TRANSACTION BEGIN TO CONSTRAINT MODIFY RENAME CASCADE').split(' ');
  var SQLTY = ['INT', 'INTEGER', 'VARCHAR', 'CHAR', 'TEXT', 'DATE', 'DATETIME', 'DECIMAL', 'BOOLEAN', 'BIT', 'TINYINT', 'FLOAT'];
  var SQLFN = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CURRENT_DATE', 'NOW'];
  var SQ = /(\u0001\d+\u0001)|('(?:''|[^'\n])*'?)|(--[^\n]*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;

  function hlSql(code) {
    var out = '', last = 0, m;
    SQ.lastIndex = 0;
    while ((m = SQ.exec(code))) {
      out += esc(code.slice(last, m.index));
      var t = m[0], cls = null;
      last = SQ.lastIndex;
      if (m[1]) { out += t; continue; }
      if (m[2]) {
        out += '<span class="s">' + esc(t).replace(/\u0001(\d+)\u0001/g, '</span>\u0001$1\u0001<span class="s">') + '</span>';
        continue;
      }
      if (m[3]) cls = 'c';
      else if (m[4]) cls = 'n';
      else if (m[5] && t === t.toUpperCase()) {
        if (SQLFN.indexOf(t) !== -1) cls = 'f';
        else if (SQLTY.indexOf(t) !== -1) cls = 't';
        else if (SQLKW.indexOf(t) !== -1) cls = 'k';
      }
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
    }
    return out + esc(code.slice(last));
  }

  /* ---------- Python renklendirme ---------- */
  var PYKW = ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'break', 'continue',
    'match', 'case', 'True', 'False', 'None', 'import', 'from', 'pass', 'raise', 'try', 'except', 'is', 'lambda', 'global'];
  var PYBI = ['print', 'input', 'int', 'float', 'str', 'len', 'range', 'sum', 'sorted', 'enumerate', 'type', 'round',
    'isinstance', 'list', 'dict', 'max', 'min', 'abs', 'bool', 'Exception'];
  var PY = /(\u0001\d+\u0001)|([rRfFbB]{0,2}(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?))|(#[^\n]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_À-ɏ]\w*\b)/g;

  function hlPy(code) {
    var out = '', last = 0, m;
    PY.lastIndex = 0;
    while ((m = PY.exec(code))) {
      out += esc(code.slice(last, m.index));
      var t = m[0], cls = null;
      last = PY.lastIndex;
      if (m[1]) { out += t; continue; }
      if (m[2]) {
        // f-string içindeki {ifade} kısımları ayrı renklenmez, metin olarak kalır
        // ama boşluk işaretleri metnin içinde kalabilir: onları geri koy
        out += '<span class="s">' + esc(t).replace(/\u0001(\d+)\u0001/g, '</span>\u0001$1\u0001<span class="s">') + '</span>';
        continue;
      }
      if (m[3]) cls = 'c';
      else if (m[4]) cls = 'n';
      else if (m[5]) {
        if (PYKW.indexOf(t) !== -1) cls = 'k';
        else if (PYBI.indexOf(t) !== -1 || code.charAt(last) === '(') cls = 'f';
      }
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
    }
    return out + esc(code.slice(last));
  }

  /* ---------- Kabuk (bash) renklendirme ---------- */
  var SH = /(\u0001\d+\u0001)|("(?:\\.|[^"\\])*"?|'[^'\n]*'?)|(#[^\n]*)|(\$\{?[A-Za-z_]\w*\}?|\$[!?#@*0-9])|(>>|&&|\|\||[|&;<>])|(--?[A-Za-z][\w-]*(?:=[^\s|;&]*)?)|(%\d+|\+\d+|\b\d+\b)|([A-Za-z_~./][\w.\/~:+-]*)|(\n)/g;

  function hlSh(code) {
    var out = '', last = 0, m, cmd = true;
    SH.lastIndex = 0;
    while ((m = SH.exec(code))) {
      var t = m[0], cls = null, prev = code.charAt(m.index - 1);
      var atStart = m.index === 0 || /\s/.test(prev);
      out += esc(code.slice(last, m.index));
      last = SH.lastIndex;
      if (m[1]) { out += t; continue; }
      if (m[9]) { out += '\n'; cmd = true; continue; }
      if (m[3] && !atStart) { out += '#'; last = SH.lastIndex = m.index + 1; continue; }
      if (m[2]) cls = 's';
      else if (m[3]) cls = 'c';
      else if (m[4]) cls = 'v';
      else if (m[5]) { cls = 'k'; if (t !== '>' && t !== '>>' && t !== '<') cmd = true; }
      else if (m[6]) cls = atStart ? 'cn' : null;
      else if (m[7]) cls = 'n';
      else if (m[8]) { if (cmd) { cls = 'f'; cmd = t === 'sudo'; } }
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
    }
    return out + esc(code.slice(last));
  }

  function hlPhp(code) {
    var out = '', last = 0, m;
    HL.lastIndex = 0;
    while ((m = HL.exec(code))) {
      out += esc(code.slice(last, m.index));
      var t = m[0], cls = null;
      last = HL.lastIndex;
      if (m[1]) { out += t; continue; }
      if (m[2]) cls = 'c';
      else if (m[3]) cls = 's';
      else if (m[4]) cls = 'k';
      else if (m[5]) cls = 't';
      else if (m[6]) cls = 'v';
      else if (m[7]) cls = 'n';
      else if (m[8]) {
        if (KW.indexOf(t) !== -1) cls = 'k';
        else if (/^[A-Z][A-Z0-9_]+$/.test(t)) cls = 'cn';
        else if (code.charAt(last) === '(') cls = 'f';
      }
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
    }
    return out + esc(code.slice(last));
  }
  function tblHtml(b) {
    return (b.cap ? '<div class="tbl-cap">' + fmt(b.cap) + '</div>' : '') +
      '<div class="tbl-wrap"><table><thead><tr>' + b.head.map(function (h) { return '<th>' + fmt(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + b.rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  function codeBlock(code, out) {
    return '<div class="codeblock"><pre class="code">' + hl(code) + '</pre>' +
      (out ? '<div class="out"><span class="lbl">Çıktı</span>' + esc(out) + '</div>' : '') + '</div>';
  }

  /* ---------- Kayıtlı en iyi skorlar ---------- */
  var BEST_KEY = C.storeKey || 'phpvize-best';
  function getBest() { try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; } catch (e) { return {}; } }
  function saveBest(id, pct) {
    var b = getBest();
    if (!(id in b) || pct > b[id]) { b[id] = pct; try { localStorage.setItem(BEST_KEY, JSON.stringify(b)); } catch (e) { /* yok say */ } }
  }

  /* ---------- Test tanımları ---------- */
  // Aynı soru hem konu testinde hem sınavda olabilir; havuzda bir kez yer alır.
  function poolOf(type) {
    var seen = {}, out = [];
    function add(q, tid) {
      if (q.type !== type || seen[sig(q)]) return;
      seen[sig(q)] = 1;
      out.push(copy(q, tid ? { topic: tid } : null));
    }
    Object.keys(TQ).forEach(function (tid) { TQ[tid].forEach(function (q) { add(q, tid); }); });
    EXAMS.forEach(function (e) { e.questions.forEach(function (q) { add(q); }); });
    return out;
  }
  // Rastgele testlerde az görülen sorular öne alınır (tarayıcıda sayılır)
  var SEEN_KEY = BEST_KEY + '-seen';
  function sig(q) { return ((q.title ? q.title + '|' : '') + q.q + '|' + (q.code || '')).slice(0, 200); }

  /* ---------- Yanlışlarım ---------- */
  var WRONG_KEY = BEST_KEY + '-yanlis';
  function getWrong() { try { return JSON.parse(localStorage.getItem(WRONG_KEY)) || {}; } catch (e) { return {}; } }
  function logWrong(q, r) {
    if (!q || !r || r.empty) return;
    var w = getWrong(), k = sig(q);
    if (r.ok) { if (!(k in w)) return; delete w[k]; }
    else {
      w[k] = { q: JSON.parse(JSON.stringify(q)), t: Date.now() };
      var ks = Object.keys(w);
      if (ks.length > 300) ks.sort(function (a, b) { return w[a].t - w[b].t; }).slice(0, ks.length - 300).forEach(function (x) { delete w[x]; });
    }
    try { localStorage.setItem(WRONG_KEY, JSON.stringify(w)); } catch (e) { /* yok say */ }
  }
  function getSeen() { try { return JSON.parse(localStorage.getItem(SEEN_KEY)) || {}; } catch (e) { return {}; } }
  function markSeen(qs) {
    var s = getSeen();
    qs.forEach(function (q) { s[sig(q)] = (s[sig(q)] || 0) + 1; });
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(s)); } catch (e) { /* yok say */ }
  }
  function freshFirst(arr) {
    var s = getSeen();
    return shuffle(arr.slice()).sort(function (a, b) { return (s[sig(a)] || 0) - (s[sig(b)] || 0); });
  }

  function pickSpread(arr, n) {
    var sh = freshFirst(arr), used = {}, picked = [];
    sh.forEach(function (q) { if (picked.length < n && !used[q.topic]) { picked.push(q); used[q.topic] = 1; } });
    sh.forEach(function (q) { if (picked.length < n && picked.indexOf(q) === -1) picked.push(q); });
    return picked.sort(function (a, b) { return topicIndex(a.topic) - topicIndex(b.topic); });
  }
  function codePool() {
    var list = [], seen = {};
    function add(q, extra) { if (q.type !== 'code' || seen[sig(q)]) return; seen[sig(q)] = 1; list.push(copy(q, extra)); }
    Object.keys(TQ).forEach(function (tid) { TQ[tid].forEach(function (q) { add(q, { topic: tid }); }); });
    EXAMS.forEach(function (e) { e.questions.forEach(function (q) { add(q); }); });
    EXTRA.forEach(function (q) { add(q); });
    return list;
  }

  var TESTS = [];
  EXAMS.forEach(function (e) {
    var mode = e.mode || 'exam';
    TESTS.push({
      id: e.id, group: e.group || 'vize', title: e.title, desc: e.desc, mode: mode, featured: e.featured, showTopic: true,
      count: e.questions.length,
      build: function () { return e.questions.map(function (q) { return copy(q); }); }
    });
  });
  var RX = C.randomExam || { mc: 10, fill: 6, code: 1 };
  // Karışık rastgele test: her konudan bir soru, tür dağılımı C.randomMix ile (ör. 5 test, 2 boşluk, 1 kod, 2 yazma)
  function randomMixed() {
    var mix = (C.randomMix || ['mc', 'mc', 'mc', 'mc', 'mc', 'fill', 'fill', 'code', 'open', 'open']).slice();
    var seen = getSeen(), per = {}, picked = [], used = [];
    // her soru için: önce az görülen, sonra az seçilmiş konu
    mix.forEach(function (type) {
      var cands = [];
      Object.keys(TQ).forEach(function (tid) {
        TQ[tid].forEach(function (q) { if (q.type === type && used.indexOf(q) === -1) cands.push({ q: q, tid: tid }); });
      });
      if (!cands.length) return;
      shuffle(cands).sort(function (a, b) {
        return ((seen[sig(a.q)] || 0) - (seen[sig(b.q)] || 0)) || ((per[a.tid] || 0) - (per[b.tid] || 0));
      });
      var c = cands[0];
      used.push(c.q); per[c.tid] = (per[c.tid] || 0) + 1;
      picked.push(copy(c.q, { topic: c.tid }));
    });
    var order = { mc: 0, fill: 1, code: 2, open: 3 };
    return picked.sort(function (a, b) { return (order[a.type] - order[b.type]) || (topicIndex(a.topic) - topicIndex(b.topic)); });
  }
  TESTS.push({
    id: 'rastgele', group: 'vize', title: C.randomTitle || 'Rastgele test', desc: C.randomDesc || 'Her açılışta farklı sorular.',
    mode: 'exam', random: true, showTopic: true, count: (C.randomMix || []).length || 10,
    build: C.randomMix ? randomMixed : function () {
      var nOpen = RX.open || 0;
      if (RX.openMax) nOpen += Math.floor(Math.random() * (RX.openMax - nOpen + 1));
      var qs = pickSpread(poolOf('mc'), (RX.mc || 0) - (nOpen - (RX.open || 0)));
      if (RX.fill) qs = qs.concat(pickSpread(poolOf('fill'), RX.fill));
      if (RX.code) qs = qs.concat(freshFirst(codePool()).slice(0, RX.code));
      if (nOpen) qs = qs.concat(pickSpread(poolOf('open'), nOpen));
      return qs;
    }
  });
  // Her konu için C.topicParts (varsayılan 1) kadar konu testi: soru havuzu sırayla parçalara bölünür
  TOPICS.forEach(function (t, i) {
    var parts = C.topicParts || 1, all = TQ[t.id], size = Math.ceil(all.length / parts);
    for (var p = 0; p < parts; p++) {
      (function (p) {
        var slice = all.slice(p * size, (p + 1) * size);
        if (!slice.length) return;
        TESTS.push({
          id: 'konu-' + t.id + (parts > 1 ? '-' + (p + 1) : ''), group: 'konu',
          title: (i + 1) + '. ' + t.title + (parts > 1 ? ' · Test ' + (p + 1) : ''), mode: 'practice', count: slice.length,
          build: function () { return slice.map(function (q) { return copy(q, { topic: t.id }); }); }
        });
      })(p);
    }
  });
  if (codePool().length) {
    TESTS.push({
      id: 'kod', group: 'ek', title: 'Kod tamamlama pratiği', desc: C.codeDesc || '17. soru tipi: foreach + if + toplam/sayaç kalıbı.',
      mode: 'practice', showTopic: false, count: codePool().length, build: codePool
    });
  }
  TESTS.push({
    id: 'karisik', group: 'ek', title: 'Karışık 20 soru', desc: 'Konu testlerinden rastgele, anında kontrol.',
    mode: 'practice', random: true, showTopic: true, count: 20,
    build: function () { return freshFirst(poolOf('mc').concat(poolOf('fill'), poolOf('open'))).slice(0, 20); }
  });

  TESTS.push({
    id: 'yanlislar', group: 'yanlis', title: 'Yanlışlarım', mode: 'practice', showTopic: true,
    desc: 'Yanlış yaptığın sorular burada birikir; doğru cevapladığında listeden düşer.',
    get count() { return Object.keys(getWrong()).length; },
    build: function () { var w = getWrong(); return shuffle(Object.keys(w).map(function (k) { return copy(w[k].q); })); }
  });

  /* ---------- Sekmeler ---------- */
  function setTab(name) {
    document.querySelectorAll('.tabs a').forEach(function (a) { a.classList.toggle('active', a.dataset.tab === name); });
  }

  /* ---------- Genel tekrar ---------- */
  function renderBlock(b) {
    switch (b.t) {
      case 'p': return '<p>' + fmt(b.text) + '</p>';
      case 'ul': return '<ul>' + b.items.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
      case 'code': return codeBlock(b.code, b.out);
      case 'table':
        return '<div class="tbl-wrap"><table><thead><tr>' + b.head.map(function (h) { return '<th>' + fmt(h) + '</th>'; }).join('') +
          '</tr></thead><tbody>' + b.rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      case 'trap': return '<div class="callout trap"><span class="label">Tuzak</span>' + fmt(b.text) + '</div>';
      case 'tip': return '<div class="callout tip"><span class="label">Sınavda</span>' + fmt(b.text) + '</div>';
      case 'low': return '<div class="callout low"><span class="label">Düşük öncelik</span>' + fmt(b.text) + '</div>';
      case 'svg': return '<figure class="er"><div class="er-scroll">' + b.svg + '</div>' + (b.cap ? '<figcaption>' + fmt(b.cap) + '</figcaption>' : '') + '</figure>';
      default: return '';
    }
  }

  function renderReview() {
    var toc = '<aside class="toc"><div class="toc-title">İçindekiler</div>' +
      '<a href="#tekrar/format" data-sec="format"><span class="num">·</span>' + (window.EXAM_FORMAT.length ? 'Vize formatı' : 'Giriş') + '</a>' +
      '<a href="#tekrar/tuzaklar" data-sec="tuzaklar"><span class="num">!</span>Kritik tuzaklar</a>' +
      '<div class="toc-sep"></div>' +
      TOPICS.map(function (t, i) {
        return '<a href="#tekrar/' + t.id + '" data-sec="' + t.id + '"><span class="num">' + (i + 1) + '</span>' + esc(t.title) + '</a>';
      }).join('') + '</aside>';

    var chips = '<nav class="chips">' +
      '<a href="#tekrar/tuzaklar" data-sec="tuzaklar">Tuzaklar</a>' +
      TOPICS.map(function (t, i) { return '<a href="#tekrar/' + t.id + '" data-sec="' + t.id + '">' + (i + 1) + '. ' + esc(t.title) + '</a>'; }).join('') +
      '</nav>';

    var format = '<section class="card" id="t-format"><h1>' + esc(C.reviewTitle || 'Genel tekrar') + (C.date ? ' <span class="date">' + esc(C.date) + '</span>' : '') + '</h1>' +
      '<p class="lead">' + fmt(C.reviewLead || '') + '</p>' +
      (window.EXAM_FORMAT.length ? '<h2>' + esc(C.formatTitle || 'Vize formatı') + '</h2><div class="format-grid">' +
      window.EXAM_FORMAT.map(function (f) {
        return '<div class="format-box"><div class="range">' + esc(f.range) + '</div><div class="what">' + esc(f.what) +
          '</div><div class="pts">' + esc(f.big) + ' <small>' + esc(f.small) + '</small></div></div>';
      }).join('') + '</div>' : '') +
      (C.formatNote ? '<p class="hint" style="margin:12px 0 0">' + fmt(C.formatNote) + '</p>' : '') +
      (C.hocaLink ? '<p style="margin:14px 0 0"><a class="btn-link" href="' + C.hocaLink.href + '">' + esc(C.hocaLink.text) + '</a></p>' : '') +
      '</section>';

    var traps = '<section class="card" id="t-tuzaklar"><h2>Kritik tuzaklar</h2>' +
      '<p class="topic-src" style="margin-top:4px">' + esc(C.trapsLead || 'Çalışma sorularındaki yanlış şıkların neredeyse hepsi bunlardan biri.') + '</p>' +
      '<ol class="traps-list">' + window.TRAPS.map(function (x) {
        return '<li>' + fmt(x.t) + ' <a class="go" href="#tekrar/' + x.topic + '">konu →</a></li>';
      }).join('') + '</ol></section>';

    var topics = TOPICS.map(function (t, i) {
      return '<section class="card topic" id="t-' + t.id + '">' +
        '<div class="topic-head"><span class="n">' + (i + 1) + '</span><h2>' + esc(t.title) + '</h2><span class="spacer"></span>' +
        (C.topicParts > 1 ? '<span class="topic-tests"><a class="btn-link" href="#test/konu-' + t.id + '-1">Test 1 →</a> <a class="btn-link" href="#test/konu-' + t.id + '-2">Test 2 →</a></span></div>' : '<a class="btn-link" href="#test/konu-' + t.id + '">Konu testi (' + TQ[t.id].length + ' soru) →</a></div>') +
        '<p class="topic-src">' + esc(t.src) + '</p>' +
        t.blocks.map(renderBlock).join('') + '</section>';
    }).join('');

    app.innerHTML = '<div class="review">' + toc + '<div class="review-main">' + chips + format + traps + topics + '</div></div>';
    observeSections();
  }

  var observer = null;
  function observeSections() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace(/^t-/, '');
        document.querySelectorAll('[data-sec]').forEach(function (a) { a.classList.toggle('active', a.dataset.sec === id); });
        var chip = document.querySelector('.chips [data-sec="' + id + '"]');
        if (chip && chip.parentNode.scrollWidth > chip.parentNode.clientWidth) {
          chip.parentNode.scrollLeft = chip.offsetLeft - 20;
        }
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    document.querySelectorAll('.review-main > section').forEach(function (s) { observer.observe(s); });
  }

  function scrollToSection(id) {
    var el = document.getElementById('t-' + id);
    if (el) el.scrollIntoView();
  }

  /* ---------- Test listesi ---------- */
  function renderTestList() {
    var best = getBest();
    function card(t) {
      var b = best[t.id];
      var bestTxt = b == null ? '' : '<span class="badge best">En iyi: ' + (t.mode === 'exam' ? b + '/100' : '%' + b) + '</span>';
      var meta = t.mode === 'exam'
        ? '<span class="badge exam">Vize modu</span><span>' + t.count + ' soru · 100 puan</span>'
        : '<span>' + t.count + ' soru · anında kontrol</span>';
      return '<a class="test-card' + (t.featured ? ' featured' : '') + '" href="#test/' + t.id + '">' +
        '<div class="t">' + esc(t.title) + '</div>' + (t.desc ? '<div class="d">' + esc(t.desc) + '</div>' : '') +
        '<div class="meta">' + meta + bestTxt + '</div></a>';
    }
    function group(title, key, note) {
      var list = TESTS.filter(function (t) { return t.group === key; });
      if (!list.length) return '';
      return '<div class="group-title">' + title + '</div>' + (note ? '<p class="lead" style="margin:-4px 0 10px;font-size:.9rem">' + note + '</p>' : '') +
        '<div class="test-grid">' + list.map(card).join('') + '</div>';
    }
    app.innerHTML = '<h1>Test</h1>' +
      '<p class="lead">' + fmt(C.testLead || '') + '</p>' +
      group('Yanlışlarım', 'yanlis', 'Testlerde yanlış yaptığın sorular. Burada doğru cevapladığında listeden düşer.') +
      group(C.hocaTitle || 'Hocanın çalışma soruları', 'hoca', C.hocaNote || 'Cevap anahtarındaki açıklamalarla, her soru anında kontrol edilir.') +
      group('Vize formatında (100 puan)', 'vize', 'Cevaplar sonda topluca puanlanır, gerçek sınav gibi.') +
      group('Konu testleri', 'konu', 'Her soru anında kontrol edilir ve açıklaması gösterilir.') +
      group('Ek pratik', 'ek');
  }

  /* ---------- Test ekranı ---------- */
  var S = null;

  function normAns(s) { return String(s == null ? '' : s).trim().replace(/\s+/g, ' '); }
  function matchAns(input, answers, cs) {
    var s = normAns(input);
    if (!s) return false;
    var cands = [s, s.replace(/^["']+|["']+$/g, '').trim(), s.replace(/;$/, '').trim()];
    var n = function (x) { return cs ? x : x.toLowerCase(); };
    return answers.some(function (a) { return cands.some(function (c) { return c !== '' && n(c) === n(a); }); });
  }

  function qPoints(q) { return POINTS[q.type] || 5; }

  function codeWithBlanks(q, i) {
    var src = q.type === 'fill'
      ? q.code.replace('____', '\u00010\u0001')
      : q.code.replace(/\{\{(\d)\}\}/g, function (m, n) { return '\u0001' + (n - 1) + '\u0001'; });
    var html = hl(src).replace(/\u0001(\d+)\u0001/g, function (m, k) {
      var no = +k + 1;
      return (q.type === 'code' ? '<span class="blank-no">' + no + '</span>' : '') +
        '<input class="blank" data-q="' + i + '" data-b="' + k + '" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Boşluk ' + no + '">';
    });
    return '<div class="codeblock"><pre class="code">' + html + '</pre></div>';
  }

  function qHtml(q, i) {
    var exam = S.t.mode === 'exam';
    var top = '<div class="q-top"><span class="qn">' + (i + 1) + '.</span>' +
      (exam ? '<span class="badge">' + qPoints(q) + ' puan</span>' : '') +
      (S.t.showTopic && q.topic ? '<span class="badge">' + esc(topicTitle(q.topic)) + '</span>' : '') +
      (q.src && S.t.id !== 'hoca' ? '<span class="badge">' + esc(q.src) + '</span>' : '') +
      '<span class="res"></span></div>';
    var body = '';
    if (q.type === 'code' && q.title) body += '<div class="q-text"><strong>' + esc(q.title) + '</strong></div>';
    body += '<div class="q-text">' + fmt(q.q) + '</div>';
    if (q.tbl) (Array.isArray(q.tbl) ? q.tbl : [q.tbl]).forEach(function (t) { body += tblHtml(t); });
    if (q.type === 'mc') {
      if (q.code) body += codeBlock(q.code);
      body += '<ul class="opts">' + q.opts.map(function (o, k) {
        return '<li><button type="button" class="opt" data-q="' + i + '" data-o="' + k + '"><span class="L">' + LETTERS[k] + '</span><span>' + fmt(o) + '</span></button></li>';
      }).join('') + '</ul>';
    } else if (q.type === 'open') {
      if (q.code) body += codeBlock(q.code);
      body += '<textarea class="open-in" data-q="' + i + '" rows="3" placeholder="Cevabını yaz (isteğe bağlı), sonra cevaba bak."></textarea>' +
        '<div class="q-actions"><button type="button" class="btn ghost" data-act="reveal" data-q="' + i + '">Cevabı göster</button></div>' +
        '<div class="open-model" hidden><div class="ans ok">Model cevap</div>' + fmtBlock(q.model) + (q.modelCode ? codeBlock(q.modelCode) : '') +
        '<div class="self"><span>Kendini puanla:</span>' +
        '<button type="button" class="btn" data-act="self" data-v="1" data-q="' + i + '">Bildim</button>' +
        '<button type="button" class="btn ghost" data-act="self" data-v="0" data-q="' + i + '">Bilemedim</button></div></div>';
    } else {
      body += codeWithBlanks(q, i);
      if (!exam) {
        body += '<div class="q-actions"><button type="button" class="btn" data-act="check" data-q="' + i + '">Kontrol et</button>' +
          '<span class="hint">veya Enter</span></div>';
      }
    }
    body += '<div class="exp" hidden></div>';
    return '<div class="q" id="q-' + i + '">' + top + body + '</div>';
  }

  var SECTION_NAMES = { mc: 'Test', fill: 'Boşluk doldurma', code: 'Kod tamamlama', open: 'Yazma' };

  function renderTest(id) {
    var t = TESTS.filter(function (x) { return x.id === id; })[0];
    if (!t) {
      app.innerHTML = '<a class="back" href="#test">← Testler</a><p class="empty">Test bulunamadı.</p>';
      return;
    }
    var qs = t.build();
    if (!qs.length) { app.innerHTML = '<a class="back" href="#test">← Testler</a><h1>' + esc(t.title) + '</h1><p class="empty">' + (t.id === 'yanlislar' ? 'Şu an yanlış listen boş. Testleri çözdükçe yanlış yaptığın sorular burada birikir.' : 'Bu testte soru yok.') + '</p>'; return; }
    if (t.random) markSeen(qs);
    S = {
      t: t, qs: qs,
      ans: qs.map(function (q) { return q.type === 'code' ? q.blanks.map(function () { return ''; }) : (q.type === 'fill' ? '' : null); }),
      res: qs.map(function () { return null; }),
      submitted: false
    };

    var exam = t.mode === 'exam';
    var head = '<div class="test-head"><a class="back" href="#test">← Testler</a><h1>' + esc(t.title) + '</h1><div class="info">' +
      (exam ? '<span class="badge exam">Vize modu</span><span>' + qs.length + ' soru · 100 puan · cevaplar sonda puanlanır</span>'
            : '<span>' + qs.length + ' soru · her soru anında kontrol edilir</span>') +
      '</div></div><div id="result"></div>';

    var body = '';
    var lastType = null;
    qs.forEach(function (q, i) {
      if (exam && q.type !== lastType) {
        var idx = qs.map(function (x, k) { return x.type === q.type ? k : -1; }).filter(function (k) { return k >= 0; });
        var pts = idx.reduce(function (s, k) { return s + qPoints(qs[k]); }, 0);
        var range = idx.length > 1 ? 'Soru ' + (idx[0] + 1) + '–' + (idx[idx.length - 1] + 1) : 'Soru ' + (idx[0] + 1);
        body += '<div class="section-title"><h2>' + SECTION_NAMES[q.type] + '</h2><span class="sp">' + range + ' · ' + pts + ' puan</span></div>';
        lastType = q.type;
      }
      body += qHtml(q, i);
    });

    var bar = exam
      ? '<div class="progress" id="prog"><span id="prog-text"></span><span class="grow"></span><button type="button" class="btn" data-act="submit">Sınavı bitir</button></div>'
      : '<div class="progress" id="prog"><span id="prog-text"></span><span class="grow"></span><button type="button" class="btn ghost" data-act="retry">' + (t.random ? 'Yeni sorular' : 'Baştan') + '</button></div>';

    app.innerHTML = head + body + bar;
    updateProgress();
  }

  function answered(i) {
    var q = S.qs[i], a = S.ans[i];
    if (q.type === 'mc') return a !== null;
    if (q.type === 'fill') return normAns(a) !== '';
    if (q.type === 'open') return a !== null;
    return a.some(function (x) { return normAns(x) !== ''; });
  }

  function grade(i) { var r = grade0(i); logWrong(S.qs[i], r); return r; }
  function grade0(i) {
    var q = S.qs[i], a = S.ans[i];
    if (q.type === 'mc') { var ok = a === q.a; return { ok: ok, frac: ok ? 1 : 0, empty: a === null }; }
    if (q.type === 'fill') { var ok2 = matchAns(a, q.ans, q.cs); return { ok: ok2, frac: ok2 ? 1 : 0, empty: normAns(a) === '' }; }
    if (q.type === 'open') return { ok: a === true, frac: a === true ? 1 : 0, empty: a === null };
    var parts = q.blanks.map(function (b, k) { return matchAns(a[k], b.ans, b.cs); });
    var n = parts.filter(Boolean).length;
    return { ok: n === parts.length, parts: parts, frac: n / parts.length, empty: !answered(i) };
  }

  // Soruda geçen komutların İngilizce açılımları, seçenekleri ve sembolleri
  // (window.CMD_NAMES / CMD_OPTS / SH_SYMBOLS varsa; şu an sadece Linux).
  function cmdNamesBox(q, chosen) {
    var names = window.CMD_NAMES;
    if (!names) return '';
    var opts = window.CMD_OPTS || {}, syms = window.SH_SYMBOLS || {};
    var has = function (o, k) { return o && Object.prototype.hasOwnProperty.call(o, k); };
    var texts = [];
    String(q.code || '').split('\n').forEach(function (l) { texts.push(l.replace(/#.*$/, '')); });
    var spans = [q.q, q.exp];
    if (q.type === 'mc') {
      spans.push(q.opts[q.a]);
      if (chosen !== null && chosen !== undefined && chosen !== q.a) { spans.push(q.opts[chosen]); if (q.why) spans.push(q.why[chosen]); }
    }
    spans.forEach(function (s) { (String(s || '').match(/`[^`]*`/g) || []).forEach(function (m) { texts.push(m.slice(1, -1)); }); });

    var items = [], keys = {};
    function add(key, html) { if (!keys[key]) { keys[key] = 1; items.push(html); } }
    function sym(k) { if (has(syms, k)) add('s:' + k, fmt(syms[k])); }
    function opt(cmd, t) {
      var d = (has(opts, cmd) && has(opts[cmd], t)) ? opts[cmd][t] : (has(opts['*'], t) ? opts['*'][t] : null);
      if (d) { add('o:' + cmd + t, '<code>' + esc(cmd + ' ' + t) + '</code> → <code>' + esc(t) + '</code> = ' + fmt(d)); return true; }
      return false;
    }

    texts.forEach(function (line) {
      var cmd = null, fresh = true;
      line.split(/\s+/).forEach(function (t) {
        if (!t) return;
        if (t === '|' || t === ';' || t === '&&' || t === '&') { sym(t); cmd = null; fresh = true; return; }
        if (/^(>>|>|<)/.test(t)) { sym(t.match(/^(>>|>|<)/)[1]); return; }
        if (/['"]/.test(t)) sym('quote');
        var w = t.replace(/^['"]+|['";:,]+$/g, '');
        if (has(names, w) && (fresh || cmd === 'sudo')) {
          add('c:' + w, '<code>' + esc(w) + '</code> = ' + fmt(names[w]));
          cmd = w; fresh = false; return;
        }
        fresh = false;
        if (cmd && (w.charAt(0) === '-' || (has(opts, cmd) && has(opts[cmd], w)))) {
          if (!opt(cmd, w) && /^-[a-zA-Z]{2,}$/.test(w)) w.slice(1).split('').forEach(function (c) { opt(cmd, '-' + c); });
          return;
        }
        if (w === '.' || w === '..' || w === '~') { sym(w); return; }
        if (/^\.\//.test(w)) sym('.');
        if (/^\.\.\//.test(w)) sym('..');
        if (/^~/.test(w)) sym('~');
        if (/^\//.test(w)) sym('/');
        if (/^%\d/.test(w)) sym('%N');
        if (/^\+\d/.test(w)) sym('+N');
        if (/\$[A-Za-z_]/.test(w)) sym('$');
        if (/\*/.test(w)) sym('*');
        // /proc/cpuinfo gibi yollardaki bilinen adlar
        w.split(/[^A-Za-z0-9_.]+/).forEach(function (p) {
          if (p && has(names, p) && /\//.test(w)) add('c:' + p, '<code>' + esc(p) + '</code> = ' + fmt(names[p]));
        });
      });
    });
    if (!items.length) return '';
    return '<div class="names"><b>Açılımı:</b><ul>' + items.slice(0, 10).map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul></div>';
  }

  function showResult(i) {
    var q = S.qs[i], r = S.res[i], el = document.getElementById('q-' + i);
    if (!el) return;
    el.classList.add(r.ok ? 'is-ok' : 'is-bad');
    var res = el.querySelector('.res');
    if (q.type === 'code') {
      var n = r.parts.filter(Boolean).length;
      res.textContent = n + '/' + r.parts.length + ' boşluk doğru' + (S.t.mode === 'exam' ? ' · ' + Math.round(qPoints(q) * r.frac) + ' puan' : '');
    } else {
      res.textContent = r.ok ? '✓ Doğru' : (r.empty ? '— Boş' : '✗ Yanlış');
      if (q.type === 'open' && !r.empty) res.textContent = r.ok ? '✓ Bildim' : '✗ Bilemedim';
    }
    res.className = 'res ' + (r.ok ? 'ok' : 'bad');

    var exp = '';
    if (q.type === 'mc') {
      el.querySelectorAll('.opt').forEach(function (b) {
        var k = +b.dataset.o;
        b.disabled = true;
        b.classList.remove('sel');
        if (k === q.a) b.classList.add('right');
        else if (k === S.ans[i]) b.classList.add('wrong');
      });
      exp = '<div class="ans ' + (r.ok ? 'ok' : 'bad') + '">' + (r.ok ? 'Doğru.' : 'Doğru cevap: ' + LETTERS[q.a]) + '</div>' + fmt(q.exp);
      var ch = S.ans[i];
      if (!r.ok && ch !== null && q.why && q.why[ch]) {
        exp += '<div class="why"><b>Senin cevabın (' + LETTERS[ch] + '):</b> ' + fmt(q.why[ch]) + '</div>';
      }
    } else if (q.type === 'fill') {
      var inp = el.querySelector('input.blank');
      inp.disabled = true;
      inp.classList.add(r.ok ? 'ok' : 'bad');
      exp = '<div class="ans ' + (r.ok ? 'ok' : 'bad') + '">' + (r.ok ? 'Doğru.' : 'Doğru cevap: <code>' + esc(q.ans[0]) + '</code>') + '</div>' + fmt(q.exp);
      var typed = normAns(S.ans[i]);
      if (!r.ok && q.whyFill && q.whyFill[typed]) {
        exp += '<div class="why"><b>Senin cevabın (<code>' + esc(typed) + '</code>):</b> ' + fmt(q.whyFill[typed]) + '</div>';
      }
    } else if (q.type === 'open') {
      var ta = el.querySelector('.open-in');
      if (ta) ta.disabled = true;
      var om = el.querySelector('.open-model');
      if (om) om.remove();
      exp = '<div class="ans ' + (r.ok ? 'ok' : 'bad') + '">' + (r.empty ? 'Puanlanmadı. Model cevap:' : (r.ok ? 'Bildin.' : 'Bilemedin. Model cevap:')) + '</div>' + fmtBlock(q.model) + (q.modelCode ? codeBlock(q.modelCode) : '');
    } else {
      el.querySelectorAll('input.blank').forEach(function (inp2) {
        var k = +inp2.dataset.b;
        inp2.disabled = true;
        inp2.classList.add(r.parts[k] ? 'ok' : 'bad');
      });
      exp = '<ol>' + q.exps.map(function (e, k) {
        var mine = normAns(S.ans[i][k]);
        return '<li><span class="' + (r.parts[k] ? 'mark-ok">✓' : 'mark-bad">✗') + '</span> ' + fmt(e) +
          (!r.parts[k] ? ' <span class="hint">(senin cevabın: ' + (mine ? '<code>' + esc(mine) + '</code>' : 'boş') + ')</span>' : '') + '</li>';
      }).join('') + '</ol>' + (q.note ? '<p style="margin:8px 0 0">' + fmt(q.note) + '</p>' : '');
    }
    exp += cmdNamesBox(q, q.type === 'mc' ? S.ans[i] : null);
    var rules = window.TOPIC_RULES || {};
    if (!r.ok && q.topic && rules[q.topic]) {
      exp += '<div class="rule"><b>Kural · ' + esc(topicTitle(q.topic)) + ':</b> ' + fmt(rules[q.topic]) + '</div>';
    }
    var box = el.querySelector('.exp');
    box.innerHTML = exp;
    box.hidden = false;
    var act = el.querySelector('.q-actions');
    if (act) act.remove();
  }

  function checkQuestion(i) {
    if (S.res[i]) return;
    S.res[i] = grade(i);
    showResult(i);
    updateProgress();
  }

  function updateProgress() {
    var el = document.getElementById('prog-text');
    if (!el || !S) return;
    if (S.t.mode === 'exam') {
      var n = S.qs.filter(function (q, i) { return answered(i); }).length;
      el.textContent = 'Cevaplanan: ' + n + ' / ' + S.qs.length;
      return;
    }
    var done = S.res.filter(Boolean);
    var ok = done.filter(function (r) { return r.ok; }).length;
    var left = S.qs.length - done.length;
    var html = '<span class="ok">Doğru ' + ok + '</span> · <span class="bad">Yanlış ' + (done.length - ok) + '</span> · Kalan ' + left;
    if (left === 0) {
      var earned = S.res.reduce(function (s, r) { return s + r.frac; }, 0);
      var pct = Math.round(100 * earned / S.qs.length);
      html = '<span class="done">Bitti: %' + pct + '</span> · <span class="ok">Doğru ' + ok + '</span> · <span class="bad">Yanlış ' + (done.length - ok) + '</span>';
      if (!S.saved) { saveBest(S.t.id, pct); S.saved = true; }
    }
    el.innerHTML = html;
  }

  function submitExam() {
    if (S.submitted) return;
    var empty = S.qs.filter(function (q, i) { return !answered(i); }).length;
    if (empty > 0 && !window.confirm(empty + ' soru boş. Yine de bitirilsin mi?')) return;
    S.submitted = true;
    S.qs.forEach(function (q, i) { S.res[i] = grade(i); showResult(i); });

    var sec = { mc: [0, 0], fill: [0, 0], code: [0, 0], open: [0, 0] };
    var wrong = [];
    S.qs.forEach(function (q, i) {
      var p = qPoints(q);
      sec[q.type][0] += p * S.res[i].frac;
      sec[q.type][1] += p;
      if (!S.res[i].ok) wrong.push(i);
    });
    var total = Math.round(sec.mc[0] + sec.fill[0] + sec.code[0] + sec.open[0]);
    saveBest(S.t.id, total);

    var rows = ['mc', 'fill', 'code', 'open'].filter(function (k) { return sec[k][1] > 0; }).map(function (k) {
      var got = Math.round(sec[k][0]), max = sec[k][1];
      return '<div class="row"><span>' + SECTION_NAMES[k] + '</span><div class="bar"><span style="width:' + Math.round(100 * got / max) + '%"></span></div>' +
        '<span class="v">' + got + ' / ' + max + '</span></div>';
    }).join('');

    var wl = wrong.length
      ? '<div class="wrong-list">Gözden geçir: ' + wrong.map(function (i) { return '<a href="javascript:void 0" data-scroll="' + i + '">' + (i + 1) + '</a>'; }).join('') + '</div>'
      : '<div class="wrong-list">Hepsi doğru.</div>';

    document.getElementById('result').innerHTML = '<div class="result"><div class="score">' + total + ' <small>/ 100</small></div>' +
      '<div class="rows">' + rows + '</div>' + wl +
      '<div class="actions"><button type="button" class="btn" data-act="retry">' + (S.t.random ? 'Yeni rastgele vize' : 'Tekrar çöz') + '</button>' +
      '<a class="btn ghost" href="#test">Testlere dön</a></div></div>';

    var prog = document.getElementById('prog');
    if (prog) prog.remove();
    window.scrollTo(0, 0);
  }

  /* ---------- Olaylar ---------- */
  app.addEventListener('click', function (e) {
    var opt = e.target.closest('.opt');
    if (opt && S) {
      var i = +opt.dataset.q, k = +opt.dataset.o;
      if (S.res[i]) return;
      S.ans[i] = k;
      if (S.t.mode === 'exam') {
        document.querySelectorAll('#q-' + i + ' .opt').forEach(function (b) { b.classList.toggle('sel', +b.dataset.o === k); });
        updateProgress();
      } else {
        checkQuestion(i);
      }
      return;
    }
    var act = e.target.closest('[data-act]');
    if (act && S) {
      var a = act.dataset.act;
      if (a === 'check') checkQuestion(+act.dataset.q);
      else if (a === 'reveal') {
        var qi = +act.dataset.q, card = document.getElementById('q-' + qi);
        card.querySelector('.open-model').hidden = false;
        act.parentNode.remove();
      } else if (a === 'self') {
        var si = +act.dataset.q;
        if (S.res[si]) return;
        S.ans[si] = act.dataset.v === '1';
        if (S.t.mode === 'exam') {
          document.querySelectorAll('#q-' + si + ' [data-act="self"]').forEach(function (b) { b.classList.toggle('ghost', b !== act); });
          updateProgress();
        } else checkQuestion(si);
      }
      else if (a === 'submit') submitExam();
      else if (a === 'retry') { renderTest(S.t.id); window.scrollTo(0, 0); }
      return;
    }
    var sc = e.target.closest('[data-scroll]');
    if (sc) {
      e.preventDefault();
      var q = document.getElementById('q-' + sc.dataset.scroll);
      if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // Tekrar sayfasında aynı bölüme tekrar tıklanınca da kaydır
    var link = e.target.closest('a[href^="#tekrar/"]');
    if (link && current === 'tekrar') {
      e.preventDefault();
      var href = link.getAttribute('href');
      history.replaceState(null, '', location.href.split('#')[0] + href);
      scrollToSection(href.split('/')[1]);
    }
  });

  app.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.matches('input.blank') || !S) return;
    var i = +el.dataset.q, b = +el.dataset.b;
    if (S.qs[i].type === 'code') S.ans[i][b] = el.value; else S.ans[i] = el.value;
    el.style.width = Math.max(6, el.value.length + 2) + 'ch';
    updateProgress();
  });

  app.addEventListener('keydown', function (e) {
    var el = e.target;
    if (e.key !== 'Enter' || !el.matches('input.blank') || !S) return;
    e.preventDefault();
    var i = +el.dataset.q;
    var inputs = Array.prototype.slice.call(app.querySelectorAll('input.blank:not(:disabled)'));
    var pos = inputs.indexOf(el);
    if (S.t.mode === 'exam') {
      if (inputs[pos + 1]) inputs[pos + 1].focus();
      return;
    }
    var next = inputs[pos + 1];
    if (S.qs[i].type === 'code' && next && +next.dataset.q === i) { next.focus(); return; }
    checkQuestion(i);
  });

  /* ---------- Tema ---------- */
  document.getElementById('themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var cur = root.getAttribute('data-theme') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(C.themeKey || 'phpvize-theme', next); } catch (e) { /* yok say */ }
  });

  /* ---------- Yönlendirme ---------- */
  var current = null;
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    var parts = h.split('/');
    var page = parts[0], arg = parts[1];
    if (page === 'test') {
      setTab('test');
      current = 'test';
      if (arg) renderTest(arg); else { S = null; renderTestList(); }
      window.scrollTo(0, 0);
      return;
    }
    if (C.noReview) { location.replace(location.href.split('#')[0] + '#test'); return; }
    setTab('tekrar');
    S = null;
    if (current !== 'tekrar') {
      renderReview();
      current = 'tekrar';
      window.scrollTo(0, 0);
    }
    if (arg) scrollToSection(arg);
  }
  window.addEventListener('hashchange', route);
  route();
})();
