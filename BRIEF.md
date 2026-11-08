# Vize çalışma sitesi: brief

Bu dosya, aynı yapıda başka bir ders için çalışma sitesi kurmak isteyenler için yazıldı. Claude'a (veya başka bir yapay zekaya) bu dosyayı ve ders materyallerini verip "bu brief'e göre benim dersim için site yap" demen yeterli. İstersen dosyayı yeni projede `CLAUDE.md` adıyla kaydet; Claude Code onu otomatik okur.

Örnek site: https://deenizacar.github.io/PhpVize/ (PHP) ve https://deenizacar.github.io/PhpVize/linux/ (Linux)

---

## 1. Amaç

- Tek bir vize için **amaç odaklı** çalışma sitesi. Süs yok, sade, hızlı.
- İki sekme:
  - **Genel Tekrar**: konu konu kısa özetler, tuzaklar, kod örnekleri.
  - **Test**: hocanın soruları, deneme vizeleri, rastgele vize, konu testleri.
- Telefonda da rahat kullanılmalı. Açık/koyu tema var.

## 2. İçerik kuralları (en önemli kısım)

1. **Ana kaynak hocanın çalışma soruları / çalışma kitapçığıdır.** Slaytlar sadece bu konuları açıklamak için kullanılır.
2. Derste anlatılıp çalışma materyalinde **olmayan** konu eklenmez (vizede çıkmayacağı varsayılır). Emin değilsen sor.
3. Hocanın verdiği **konu listesi** ve **puan dağılımı** esas alınır. Örnek (PHP):
   - 1–10: test, 50 puan (5 puan/soru)
   - 11–16: boşluk doldurma, 30 puan
   - 17: kod tamamlama, 20 puan (4 boşluk × 5)
   Format bilinmiyorsa (Linux'ta olduğu gibi) makul bir varsayım yapılır ve sitede açıkça "varsayım" diye yazılır.
4. Hocanın soruları **birebir** ayrı bir test olarak konur ("Hocanın çalışma soruları"), cevap anahtarıyla aynı cevaplar.
5. Deneme vizeleri gerçek vize formatında ve hocanın soru tarzında olur. Hoca sonradan yeni soru seti atarsa ayrı bir deneme olarak eklenir (ör. "Deneme vizesi 4 (yeni)") ve benzer sorular eski denemelere dağıtılır.
6. Sorular kendi içinde çözülebilir olmalı: bir soru başka bir soruya ("önceki koddaki…") atıf yapmaz.
7. Şıklar dengeli olmalı: doğru cevap hep A/B olmasın (seed'li karıştırma kullanıldı).
8. **Her cevap doğrulanır.** PHP soruları gerçek PHP 8 ile çalıştırıldı, Linux komutları bash'te denendi. Yanlış cevap anahtarı olan soru siteye girmez.
9. Yazım dili Türkçe, kısa ve net. Gereksiz kelime yok.

## 3. Teknik yapı

Saf HTML + CSS + JavaScript. Framework yok, derleme yok. GitHub Pages'te doğrudan çalışır.

```
index.html              ← ana ders (ör. PHP)
.nojekyll               ← GitHub Pages için
assets/
  style.css             ← ortak stil (tüm dersler)
  app.js                ← ortak motor (tüm dersler)
  content.js            ← ana dersin özetleri + ayarları
  questions.js          ← ana dersin soru bankası
  questions-ge1.js      ← sonradan gelen ek soru seti
linux/
  index.html            ← ikinci ders (../assets/style.css ve app.js'i kullanır)
  content.js
  questions.js
Sunumlar/, LinuxSunumlar/  ← kaynak dosyalar (pptx, pdf, docx)
```

- Yönlendirme hash ile: `#tekrar`, `#tekrar/<konu-id>`, `#test`, `#test/<test-id>`.
- Yeni ders eklemek = yeni klasör + `index.html` + `content.js` + `questions.js`. Motor ve stil ortak.
- Üst menüde ders geçişi var (`<nav class="courses">`). Yeni ders eklenince her `index.html`'deki bu menüye link eklenir.
- Kod renklendirme `COURSE.lang` ile seçilir: `'php'` veya `'sh'`. Başka bir dil (C, Python, SQL…) için `app.js`'e küçük bir renklendirici eklemek gerekir (`hl()` fonksiyonu).

## 4. Veri formatı

Tüm veri `window.*` değişkenlerinde durur. Satır içi biçim: `` `kod` `` ve `**kalın**`.

### content.js

```js
window.COURSE = {
  id: 'php', lang: 'php',            // lang: 'php' | 'sh'
  storeKey: 'phpvize-best',          // localStorage anahtarı, ders başına farklı olmalı
  reviewLead: 'Genel tekrar giriş cümlesi',
  testLead: 'Test sekmesi giriş cümlesi (format özeti)',
  formatTitle: '...', formatNote: '...',   // isteğe bağlı (ör. format varsayımı notu)
  hocaLink: { href: '#test/hoca', text: 'Hocanın sorularını çöz →' },
  points: { mc: 5, fill: 5, code: 20 },     // soru tipi başına puan
  randomExam: { mc: 10, fill: 6, code: 1 }, // rastgele vizede kaç soru
  randomDesc: '...'
};

window.EXAM_FORMAT = [ { range: 'Soru 1–10', what: 'Çoktan seçmeli', big: '50', small: 'puan' } ];

window.TRAPS = [ { t: 'Tek satırlık tuzak', topic: 'konu-id' } ];   // genel tekrarın başındaki tuzak listesi

window.TOPICS = [{
  id: 'atama', title: 'Atama ve aritmetik', src: 'Çalışma soruları: 1, 4',
  blocks: [
    { t: 'p', text: 'Paragraf' },
    { t: 'ul', items: ['madde', 'madde'] },
    { t: 'code', code: '...', out: 'çıktı (isteğe bağlı)' },
    { t: 'table', head: ['Komut', 'Ne yapar'], rows: [['a', 'b']] },
    { t: 'trap', text: 'Tuzak kutusu' },
    { t: 'tip', text: '"Sınavda" kutusu' },
    { t: 'low', text: '"Düşük öncelik" kutusu' }
  ]
}];

window.TOPIC_RULES = { atama: 'Yanlış cevapta gösterilen konu kuralı (2–3 cümle)' };
```

### questions.js

```js
window.EXAMS = [{
  id: 'hoca', title: '...', desc: '...',
  featured: true,           // vurgulu kart
  group: 'hoca',            // 'hoca' | 'vize' (varsayılan) | 'konu' | 'ek'
  mode: 'practice',         // 'practice' = anında kontrol, varsayılan 'exam' = sonda puanlama
  questions: [ /* sorular */ ]
}];
window.TOPIC_QUESTIONS = { 'konu-id': [ /* sorular */ ] };   // konu testleri
window.EXTRA_CODE = [ /* ek kod tamamlama soruları */ ];
```

Soru tipleri (her soruda `topic` alanı olmalı; isteğe bağlı `src` rozeti, ör. "Çalışma sorusu 12"):

```js
// Çoktan seçmeli
{ type: 'mc', topic: 'atama', q: 'Ne yazdırır?', code: '...',
  opts: ['A', 'B', 'C', 'D', 'E'], a: 2,            // a: doğru şık indeksi (0 = A)
  exp: 'Doğru cevabın açıklaması',
  why: { 0: 'A neden yanlış', 1: 'B neden yanlış' } } // seçilen yanlış şıkka özel açıklama

// Boşluk doldurma (kodda ____)
{ type: 'fill', topic: '...', q: '...', code: 'echo ____;',
  ans: ['kabul edilen', 'cevaplar'], cs: false,     // cs: büyük/küçük harf duyarlı mı
  exp: '...', whyFill: { 'sık yanlış cevap': 'neden yanlış' } }

// Kod tamamlama (kodda {{1}}..{{4}})
{ type: 'code', topic: '...', title: '...', q: '...', pre: 'hazır gelen kod (isteğe bağlı)',
  code: '... {{1}} ... {{2}} ...',
  blanks: [['cevap1'], ['cevap2']], exps: ['boşluk 1 açıklaması', '...'],
  note: '...', expect: 'beklenen çıktı' }
```

`check` alanları sadece doğrulama betiği içindir, sitede kullanılmaz.

## 5. Motorun yaptıkları (app.js)

- **Test listesi**: EXAMS'tan gelen testler + otomatik olarak "Rastgele vize", her konu için konu testi, "Kod tamamlama" (kod sorusu varsa) ve "Karışık".
- **Sınav modu**: sorular bölümlere ayrılır, sonda puan `COURSE.points`'e göre hesaplanır, en iyi skor kaydedilir.
- **Pratik modu**: her soru anında kontrol edilir, üstte yapışkan ilerleme çubuğu.
- **Rastgele vize**: tüm soru bankasından, konulara yayarak seçer. Hangi sorunun kaç kez geldiğini `localStorage`'da tutar ve **en az görülenleri öne alır**, böylece arka arkaya açılan testlerde aynı sorular gelmez.
- **Yanlış cevapta** üç şey gösterilir: doğru cevabın açıklaması (`exp`), "Senin cevabın" kutusu (`why` / `whyFill`), "Kural" kutusu (`TOPIC_RULES`). Amaç: Genel Tekrar'a gitmeden öğrenmek.
- Açık/koyu tema düğmesi, mobil uyum (uzun kod satırları yatay taşmaz).

## 6. Çalışma akışı (nasıl yapıldı)

1. Kaynakları oku. PDF'ler için PyMuPDF (`pymupdf`) kullan; `pdftotext` Türkçe karakterleri bozdu. pptx/docx için python-pptx / python-docx.
2. Hocanın konu listesini ve puan dağılımını çıkar, konu id'lerini belirle.
3. `content.js`: her konu için özet, tablo, kod örneği, tuzak; sonra `TRAPS` ve `TOPIC_RULES`.
4. `questions.js`: önce hocanın soruları birebir, sonra 3–4 deneme vizesi, sonra konu testleri ve ek kod soruları.
5. **Doğrula**: her soruyu gerçek yorumlayıcıda çalıştıran bir betik (PHP için XAMPP PHP 8 + Node betiği). 0 hata olmadan yayınlama.
6. Tarayıcıda test et: hocanın testi tam doğru = 100, birkaç kasıtlı yanlışla puan doğru mu, yanlış açıklamaları görünüyor mu, iki rastgele vize farklı mı, telefonda taşma var mı.
   - Yerel önizleme: `python -m http.server 8765` (file:// ile açınca betikler çalışmayabilir).
7. Yayınla: GitHub'da public repo → Settings → Pages → `main` branch, root klasör. Kökte `.nojekyll` olsun.

## 7. Yeni ders için Claude'a örnek istek

> Bu klasörde [ders adı] dersinin slaytları ve hocanın çalışma soruları var. BRIEF.md'deki yapıyla bir vize çalışma sitesi yap. Vize formatı: [ör. 20 test × 5 puan]. Hocanın çıkacak dediği konular: [liste]. Ana kaynak çalışma soruları; onlarda olmayan konuyu ekleme. Sonunda GitHub Pages ile yayınla.
