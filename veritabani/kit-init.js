/* Arama dizini + sesli okuma: PhpVize tabanlı siteler */
(function () {
  var C = window.COURSE || {}, T = window.TOPICS || [], TQ = window.TOPIC_QUESTIONS || {}, EX = window.EXAMS || [], TR = window.TRAPS || [];
  var B = StudyKit.blocks, rev = !C.noReview && T.some(function (t) { return t.blocks && t.blocks.length; }), parts = C.topicParts || 1;
  var speak = [];
  if (window.WORDS) speak.push({ sel: 'td[data-say]', lang: 'de-DE', text: function (el) { return el.dataset.say; } });
  StudyKit.init({
    speak: speak.length ? speak : null,
    index: function () {
      var out = [], seen = {};
      T.forEach(function (t, i) {
        out.push({ k: 'Konu', t: (i + 1) + '. ' + t.title, s: (t.src ? t.src + ' · ' : '') + B(t.blocks), h: rev ? '#tekrar/' + t.id : '#test/konu-' + t.id + (parts > 1 ? '-1' : ''), w: -2 });
      });
      if (rev) TR.forEach(function (x) { out.push({ k: 'Tuzak', t: x.t, h: '#tekrar/tuzaklar', w: -1 }); });
      function addQ(q, h) {
        var key = (q.q || q.title || '') + '|' + (q.code || '');
        if (seen[key]) return; seen[key] = 1;
        out.push({ k: 'Soru', t: q.q || q.title || '', s: [q.code, (q.opts || []).join(' · '), q.exp].filter(Boolean).join(' '), h: h });
      }
      Object.keys(TQ).forEach(function (tid) {
        var all = TQ[tid], size = Math.ceil(all.length / parts);
        all.forEach(function (q, i) { addQ(q, '#test/konu-' + tid + (parts > 1 ? '-' + (Math.floor(i / size) + 1) : '')); });
      });
      EX.forEach(function (e) {
        out.push({ k: 'Test', t: e.title, s: e.desc || '', h: '#test/' + e.id, w: -1 });
        (e.questions || []).forEach(function (q) { addQ(q, '#test/' + e.id); });
      });
      (window.WORDS || []).forEach(function (w) {
        out.push({ k: 'Kelime', t: (w.a ? w.a + ' ' : '') + w.w, s: (w.p ? 'Çoğul: ' + w.p + ' · ' : '') + w.t, h: '#kelimeler/' + encodeURIComponent(w.w) });
      });
      return out;
    }
  });
})();
