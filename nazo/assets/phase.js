/* Site içi faz geçişi (örtüşmeli faz + süzülme, ~280 ms).
   Sayfayı değiştiren hashchange dinleyicilerini View Transitions API ile sarar:
   eski görünüm hafif bulanıklaşıp yukarı süzülerek çıkarken yenisi aynı anda aşağıdan netleşerek gelir.
   Üst bar (body > header) yerinden kıpırdamaz. Desteklemeyen tarayıcıda ya da "hareketi azalt" açıkken
   hiçbir şey değişmez, sayfa normal şekilde açılır.
   data-scroll: aynı bölüm içinde sadece kaydırma yapan adresler için efekti atla
     "tekrar" → #tekrar/a → #tekrar/b geçişinde efekt yok
     "*"      → ilk parçası aynı olan (test hariç) geçişlerde efekt yok */
(function () {
  var me = document.currentScript;
  var scroll = ((me && me.getAttribute('data-scroll')) || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  if (!document.startViewTransition) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)');

  var css = document.createElement('style');
  css.id = 'phase-css';
  css.textContent =
    'html:active-view-transition-type(phase)::view-transition-old(root){animation:220ms cubic-bezier(.4,0,1,1) both phase-out}' +
    'html:active-view-transition-type(phase)::view-transition-new(root){animation:280ms cubic-bezier(0,0,.2,1) both phase-in}' +
    'html:active-view-transition-type(phase) body>header{view-transition-name:phase-top}' +
    'html:active-view-transition-type(phase)::view-transition-group(phase-top),' +
    'html:active-view-transition-type(phase)::view-transition-old(phase-top),' +
    'html:active-view-transition-type(phase)::view-transition-new(phase-top){animation:none}' +
    'html:active-view-transition-type(phase)::view-transition-old(phase-top){display:none}' +
    'html:active-view-transition-type(phase)::view-transition{pointer-events:none}' +
    '@keyframes phase-out{to{opacity:0;filter:blur(3px);transform:translateY(-8px)}}' +
    '@keyframes phase-in{from{opacity:0;filter:blur(3px);transform:translateY(10px)}}';
  (document.head || document.documentElement).appendChild(css);

  function first(h) { return (h || '').replace(/^#\/?/, '').split('/')[0]; }
  function rest(h) { return (h || '').replace(/^#\/?/, '').split('/').slice(1).join('/'); }
  var last = location.hash, prev = last;
  function wanted(from, to) {
    if (reduce && reduce.matches) return false;
    var a = first(from), b = first(to);
    if (a === b && a !== 'test' && rest(to)) {
      if (scroll.indexOf('*') !== -1 || scroll.indexOf(a) !== -1) return false;
    }
    return true;
  }

  var add = window.addEventListener;
  window.addEventListener = function (type, fn, opts) {
    if (type !== 'hashchange' || typeof fn !== 'function') return add.call(this, type, fn, opts);
    var wrapped = function (e) {
      var from = prev, to = location.hash;
      if (!wanted(from, to)) return fn.call(this, e);
      var self = this;
      try {
        var vt = document.startViewTransition({ update: function () { fn.call(self, e); }, types: ['phase'] });
        ['ready', 'finished', 'updateCallbackDone'].forEach(function (k) { if (vt && vt[k]) vt[k].catch(function () {}); });   // art arda geçişte atlanan geçiş hata saymasın
      } catch (err) {
        fn.call(self, e);
      }
    };
    return add.call(this, type, wrapped, opts);
  };
  // Önce bu çalışır (ilk kaydedilen dinleyici): bir önceki adresi saklar
  add.call(window, 'hashchange', function () { prev = last; last = location.hash; });
})();
