/* İstatistik ve Olasılık: soru bankası. `check` alanları sadece tools/verify.js içindir (S = yardımcı hesaplar). */
(function () {
const R = String.raw;
const NOT30 = [42, 48, 50, 52, 53, 53, 54, 56, 58, 60, 62, 62, 62, 64, 66, 68, 69, 70, 70, 71, 71, 72, 73, 78, 80, 82, 85, 87, 92, 95];
const H2 = [2.43, 2.46, 2.42, 2.45, 2.43, 2.48, 2.46, 2.47, 2.45];
const FILM = [140, 136, 150, 144, 148, 152, 138, 141, 140, 151];
const D10 = [10, 22, 26, 30, 32, 38, 40, 45, 47, 54];
const SATIS = [14, 18, 21, 9, 25, 17, 30, 12, 21, 16, 23, 19];
const NOT20 = [35, 41, 47, 52, 55, 58, 58, 61, 64, 67, 69, 72, 74, 74, 74, 78, 83, 86, 90, 97];
const P6 = [5.2, 4.8, 5.0, 5.4, 4.6, 5.0];
const fr = (a, b) => R`$\frac{${a}}{${b}}$`;

window.EXAMS = [
/* ================================================================== */
{
  id: 'hoca', title: 'Hocanın soruları (sınavda çıkacak)', featured: true, group: 'hoca', mode: 'practice',
  desc: 'Hocanın "Sınavda Çıkacak Sorular" sayfasındaki 3 soru, birebir. Her adım ayrı kontrol edilir.',
  questions: [
    { type: 'prob', topic: 'medyan-mod', src: 'Hocanın sorusu 1', title: 'Soru 1 (a–d): Sınav notları',
      q: 'Belirli bir dönemde olasılık ve istatistik dersi alan öğrencilerin notları 42, 48, 50, 52, 53, 53, 54, 56, 58, 60, 62, 62, 62, 64, 66, 68, 69, 70, 70, 71, 71, 72, 73, 78, 80, 82, 85, 87, 92, 95 olarak belirlenmiştir. Bu notlara ilişkin:',
      steps: [
        { label: 'a) Mod', num: 62, exp: '62 üç kez tekrar ediyor; 53, 70 ve 71 ikişer kez.', check: () => S.mode(NOT30) },
        { label: 'b) Medyan', num: 67, exp: 'N = 30 çift → (15. + 16. değer) / 2 = (66 + 68) / 2 = 67.', check: () => S.med(NOT30) },
        { label: R`c) $Q_1$ (ilk 15 verinin medyanı)`, num: 56, exp: 'İlk 15 verinin ortadaki (8.) değeri: 56.', check: () => S.q1(NOT30) },
        { label: R`c) $Q_3$ (son 15 verinin medyanı)`, num: 73, exp: 'Son 15 verinin ortadaki (8.) değeri: 73.', check: () => S.q3(NOT30) },
        { label: 'c) IQR', num: 17, exp: 'IQR = Q3 − Q1 = 73 − 56 = 17.', check: () => S.q3(NOT30) - S.q1(NOT30) },
        { label: 'd) 70\'in altında not alanların yüzdesi', num: 1700 / 30, pct: true, unit: '%', show: '%56.67', exp: '70\'in altında 17 öğrenci var: 17 / 30 × 100 = %56.67.', check: () => 100 * S.below(NOT30, 70) / 30 }
      ] },
    { type: 'prob', topic: 'tablo-grafik', src: 'Hocanın sorusu 1e', title: 'Soru 1 (e): Histogram için frekans tablosu',
      q: 'Aynı 30 notu 10\'ar puanlık sınıflara ayır ve her sınıftaki öğrenci sayısını (frekansı) yaz. Histogramda sınıflar x eksenine, frekanslar y eksenine yazılır.',
      steps: [
        { label: '40–49', num: 2, exp: '42, 48', check: () => S.count(NOT30, 40, 49) },
        { label: '50–59', num: 7, exp: '50, 52, 53, 53, 54, 56, 58', check: () => S.count(NOT30, 50, 59) },
        { label: '60–69', num: 8, exp: '60, 62, 62, 62, 64, 66, 68, 69', check: () => S.count(NOT30, 60, 69) },
        { label: '70–79', num: 7, exp: '70, 70, 71, 71, 72, 73, 78', check: () => S.count(NOT30, 70, 79) },
        { label: '80–89', num: 4, exp: '80, 82, 85, 87', check: () => S.count(NOT30, 80, 89) },
        { label: '90–99', num: 2, exp: '92, 95', check: () => S.count(NOT30, 90, 99) }
      ],
      note: 'Kontrol: 2 + 7 + 8 + 7 + 4 + 2 = 30. Histogramda dikdörtgenler bitişik ve eşit tabanlı; en yüksek çubuk 60–69 (8).' },
    { type: 'prob', topic: 'varyans', src: 'Hocanın sorusu 2', title: 'Soru 2: Ortalama, varyans, standart sapma',
      q: 'Bir araştırmacı ilgilendiği değişken bakımından rastgele seçtiği birimlerin değerlerini 2.43, 2.46, 2.42, 2.45, 2.43, 2.48, 2.46, 2.47, 2.45 olarak belirlemiştir. a) Aritmetik ortalamayı b) Varyans ve standart sapma değerlerini hesaplayınız.',
      steps: [
        { label: R`a) Ortalama $\bar{x}$`, num: 2.45, exp: 'Σx = 22.05, n = 9 → 22.05 / 9 = 2.45.', check: () => S.mean(H2) },
        { label: R`$\sum (x_i - \bar{x})^2$`, num: 0.0032, exp: '0.0004 + 0.0001 + 0.0009 + 0 + 0.0004 + 0.0009 + 0.0001 + 0.0004 + 0 = 0.0032.', check: () => S.ssd(H2) },
        { label: R`b) Varyans $s^2$`, num: 0.0004, exp: 'Rastgele seçilmiş → örneklem → n − 1 = 8\'e böl: 0.0032 / 8 = 0.0004.', check: () => S.varS(H2) },
        { label: R`b) Standart sapma $s$`, num: 0.02, exp: '√0.0004 = 0.02.', check: () => S.sdS(H2) },
        { label: R`Ana kitle varyansı $\sigma^2$ (N'e bölerek)`, num: 0.0032 / 9, show: '0.000356', exp: '0.0032 / 9 ≈ 0.000356 (hocanın çözümündeki not).', check: () => S.varP(H2) }
      ] },
    { type: 'prob', topic: 'ortalama', src: 'Hocanın sorusu 3', title: 'Soru 3: İki şubenin ortalaması',
      q: 'Belirli bir lisenin 11A ve 11B şubelerindeki toplam 55 öğrenci aynı matematik sınavına girmiştir. Tüm öğrencilerin not ortalaması 67, 11A şubesindeki 30 öğrencinin not ortalaması 60 ise 11B\'deki öğrencilerin aritmetik ortalaması kaçtır?',
      steps: [
        { label: R`11B öğrenci sayısı $n_B$`, num: 25, exp: '55 − 30 = 25', check: () => 55 - 30 },
        { label: 'Tüm öğrencilerin toplam puanı', num: 3685, exp: '55 × 67 = 3685', check: () => 55 * 67 },
        { label: '11A toplam puanı', num: 1800, exp: '30 × 60 = 1800', check: () => 30 * 60 },
        { label: '11B toplam puanı', num: 1885, exp: '3685 − 1800 = 1885', check: () => 55 * 67 - 30 * 60 },
        { label: R`11B ortalaması $\bar{x}_B$`, num: 75.4, exp: '1885 / 25 = 75.4', check: () => (55 * 67 - 30 * 60) / 25 }
      ],
      note: 'Fotoğraftaki soru metni eksik; genel ortalama (67) ve 11A bilgileri hocanın çözümünden alındı.' }
  ]
},
/* ================================================================== */
{
  id: 'd1', title: 'Deneme vizesi 1', desc: '10 test + 6 kısa cevap + 2 problem. Sonda 100 üzerinden puanlanır.',
  questions: [
    { type: 'mc', topic: 'temel', q: 'Bir fabrikada üretilen tüm ampullerin ömrünü ölçmek yerine rastgele seçilen 50 ampulün ömrü ölçülüyor. Bu 50 ampulün ortalama ömrü için hangisi doğrudur?',
      opts: ['Bir istatistiktir; yığın ortalamasının tahminidir', 'Bir parametredir; yığın ortalamasına eşittir', 'Tam sayımla elde edilmiştir', 'Nitel bir değişkendir', 'Başka bir örneklem seçilse de değişmez'], a: 0,
      exp: 'Örneklemden hesaplanan değer istatistiktir. Yığın ortalamasını (parametre) tahmin eder, örneklem değişince değişir.',
      why: { 1: 'Parametre yığından tam sayımla hesaplanır. Burada sadece 50 ampul ölçüldü.', 2: 'Tam sayım tüm ampulleri ölçmek olurdu.', 3: 'Ömür (saat) sayısal, yani nicel bir değişkendir.', 4: 'İstatistikler örneklemle birlikte değişir; onlar da birer değişkendir.' } },
    { type: 'mc', topic: 'olcme', q: 'Aşağıdaki değişkenlerden hangisi eşit aralıklı ölçme düzeyindedir?',
      opts: ['Hava sıcaklığı (°C)', 'Kan grubu', 'Boy uzunluğu (cm)', 'Askeri rütbe', 'Aylık gelir (TL)'], a: 0,
      exp: 'Sıcaklıkta farklar anlamlı ama 0 °C "sıcaklık yok" demek değildir → eşit aralıklı.',
      why: { 1: 'Kan grubu sıralanamaz → sınıflama.', 2: 'Boyda 0 mutlak yokluktur → oranlama.', 3: 'Rütbe sıralanır ama farklar eşit/anlamlı değil → sıralama.', 4: 'Gelirde 0 mutlak yokluktur → oranlama.' } },
    { type: 'mc', topic: 'medyan-mod', q: '8, 3, 12, 5, 9, 10, 4 verisinin medyanı kaçtır?',
      opts: ['8', '5', '7.29', '9', '8.5'], a: 0, check: () => S.med([8, 3, 12, 5, 9, 10, 4]),
      exp: 'Sırala: 3, 4, 5, **8**, 9, 10, 12. N = 7 tek → 4. değer = 8.',
      why: { 1: 'Verilen sırada ortadaki sayı. Önce sıralamalısın.', 2: 'Bu aritmetik ortalama (51 / 7).', 3: 'Sıralı verinin 5. değeri; ortadaki 4. değer.', 4: 'N tek olduğu için iki değerin ortalaması alınmaz.' } },
    { type: 'mc', topic: 'yayilim', q: '4, 9, 15, 2, 11, 7 verisinin açıklığı kaçtır?',
      opts: ['13', '11', '9', '8', '15'], a: 0, check: () => S.range([4, 9, 15, 2, 11, 7]),
      exp: 'Açıklık = en büyük − en küçük = 15 − 2 = 13.',
      why: { 1: '15 − 4: ilk değeri en küçük sandın. En küçük 2.', 2: '11 − 2: en büyük değer 15.', 3: 'Bu medyan ((7 + 9) / 2).', 4: 'Bu en büyük değer; en küçüğü çıkarmalısın.' } },
    { type: 'mc', topic: 'sayma', q: '6 kişilik bir kuruldan başkan, başkan yardımcısı ve sekreter (üç farklı görev) kaç farklı şekilde seçilir?',
      opts: ['120', '20', '216', '720', '18'], a: 0, check: () => S.P(6, 3),
      exp: 'Görevler farklı → sıra önemli → permütasyon: P(6, 3) = 6 · 5 · 4 = 120.',
      why: { 1: 'C(6, 3) = 20 sadece 3 kişiyi seçer; kimin hangi görevi aldığını saymaz.', 2: '6³: aynı kişi birden fazla göreve atanamaz.', 3: '6!: 6 kişinin tamamını sıralar; sadece 3 görev var.', 4: '6 · 3: çarpma kuralı yanlış uygulandı.' } },
    { type: 'mc', topic: 'varyans', q: 'Bir veri setindeki her değere 5 eklenirse varyans nasıl değişir?',
      opts: ['Değişmez', '5 artar', '25 artar', '5 katına çıkar', '25 katına çıkar'], a: 0,
      exp: 'Sabit eklemek tüm değerleri ve ortalamayı aynı miktar kaydırır; farklar (xᵢ − x̄) değişmez → varyans değişmez. Ortalama ise 5 artar.',
      why: { 1: 'Ortalama 5 artar, varyans değil.', 2: 'Farklar değişmediği için kareleri de değişmez.', 3: 'Çarpma olsaydı varyans sabitin karesiyle çarpılırdı. Burada toplama var.', 4: 'Çarpma olsaydı varyans sabitin karesiyle çarpılırdı. Burada toplama var.' } },
    { type: 'mc', topic: 'olasilik', q: 'Hilesiz iki zar atılıyor. Üste gelen sayıların toplamının 9 olma olasılığı kaçtır?',
      opts: [fr(1, 9), fr(1, 6), fr(1, 12), fr(5, 36), fr(2, 9)], a: 0, check: () => 4 / 36,
      exp: 'Toplam 9: (3,6), (4,5), (5,4), (6,3) → 4 durum. 4 / 36 = 1/9.',
      why: { 1: '1/6 toplam 7\'nin olasılığı (6 durum).', 2: '3 durum saydın; (3,6) ve (6,3) ayrı durumlardır.', 3: '5 durum toplam 8\'e aittir.', 4: '8 durum saydın.' } },
    { type: 'mc', topic: 'kosullu', q: '52 kartlık desteden çekilen kartın resimli (J, Q ya da K) olduğu biliniyor. Kartın kupa olma olasılığı kaçtır?',
      opts: [fr(1, 4), fr(3, 52), fr(1, 13), fr(3, 13), fr(1, 3)], a: 0, check: () => (3 / 52) / (12 / 52),
      exp: 'Resimli kart 12 tane (4 sembol × 3). Bunların 3\'ü kupa → P = 3 / 12 = 1/4.',
      why: { 1: '3/52 = P(kupa ∩ resimli). Koşul paydaya gitmeli: (3/52) / (12/52).', 2: 'Tek bir kartın olasılığı gibi hesapladın.', 3: '3/13 = 12/52, kartın resimli olma olasılığı.' } },
    { type: 'mc', topic: 'bagimsiz', q: 'A ve B bağımsız olaylar, P(A) = 0.4 ve P(B) = 0.5. P(A ∪ B) kaçtır?',
      opts: ['0.7', '0.9', '0.2', '0.45', '0.6'], a: 0, check: () => 0.4 + 0.5 - 0.4 * 0.5,
      exp: 'P(A ∩ B) = 0.4 · 0.5 = 0.2 → P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7.',
      why: { 1: 'Ayrık gibi topladın; bağımsızlarda kesişim 0 değil, P(A)P(B) = 0.2.', 2: 'Bu kesişim P(A ∩ B).' } },
    { type: 'mc', topic: 'bayes', q: 'Bir firmada ürünlerin %60\'ı I. hatta, %40\'ı II. hatta üretiliyor. Hatalı ürün oranları I. hatta %2, II. hatta %5. Rastgele seçilen bir ürün hatalıysa II. hatta üretilmiş olma olasılığı kaçtır?',
      opts: ['0.625', '0.05', '0.032', '0.4', '0.375'], a: 0, check: () => (0.4 * 0.05) / (0.6 * 0.02 + 0.4 * 0.05),
      exp: 'P(H) = 0.60 · 0.02 + 0.40 · 0.05 = 0.012 + 0.020 = 0.032. P(II | H) = 0.020 / 0.032 = 0.625.',
      why: { 1: '0.05 = P(H | II), II. hattın hata oranı. İstenen ters yön.', 2: '0.032 = P(H), toplam olasılık. Bayes için II. hattın dalını buna bölmelisin.', 3: '0.4 = II. hattın üretim payı; hatalı bilgisini kullanmadın.', 4: '0.375 = P(I | H), I. hat için.' } },

    { type: 'fill', topic: 'ortalama', q: 'Bir anasınıfındaki 5 çocuğun boyları 104, 112, 109, 118, 107 cm. Aritmetik ortalama kaç cm?', num: 110, unit: 'cm', check: () => S.mean([104, 112, 109, 118, 107]),
      exp: '(104 + 112 + 109 + 118 + 107) / 5 = 550 / 5 = 110.' },
    { type: 'fill', topic: 'medyan-mod', q: '10, 7, 7, 3, 9, 7, 3, 10, 5 verisinin modu kaçtır?', num: 7, check: () => S.mode([10, 7, 7, 3, 9, 7, 3, 10, 5]),
      exp: '7 üç kez, 3 ve 10 ikişer kez tekrar ediyor → mod 7.' },
    { type: 'fill', topic: 'yayilim', q: '12, 15, 18, 20, 22, 25, 28, 30 verisinin çeyrekler arası açıklığı (IQR) kaçtır?', num: 10, check: () => S.q3([12, 15, 18, 20, 22, 25, 28, 30]) - S.q1([12, 15, 18, 20, 22, 25, 28, 30]),
      exp: 'Alt yarı 12, 15, 18, 20 → Q1 = (15 + 18)/2 = 16.5. Üst yarı 22, 25, 28, 30 → Q3 = (25 + 28)/2 = 26.5. IQR = 10.', whyFill: { '18': 'Bu açıklık (30 − 12). IQR = Q3 − Q1.', '5': 'Bu çeyrek ayrılış (IQR / 2).' } },
    { type: 'fill', topic: 'sayma', q: '7 kişilik bir sınıftan 3 kişilik bir komisyon kaç farklı şekilde seçilir?', num: 35, check: () => S.C(7, 3),
      exp: 'Komisyonda sıra önemsiz → C(7, 3) = 7! / (3! 4!) = 35.', whyFill: { '210': 'Bu permütasyon P(7, 3). Komisyonda görev farkı yok, sıra önemsiz.' } },
    { type: 'fill', topic: 'olasilik', q: 'P(A) = 0.5, P(B) = 0.4 ve P(A ∩ B) = 0.15 ise P(A ∪ B) kaçtır?', num: 0.75, check: () => 0.5 + 0.4 - 0.15,
      exp: 'P(A ∪ B) = 0.5 + 0.4 − 0.15 = 0.75.', whyFill: { '0.9': 'Kesişimi çıkarmayı unuttun.' } },
    { type: 'fill', topic: 'kosullu', q: 'Bir kutuda 4 kırmızı ve 6 mavi top var. İadesiz olarak art arda 2 top çekiliyor. İkisinin de kırmızı olma olasılığı kaçtır?', num: 2 / 15, show: '2/15 ≈ 0.1333', check: () => (4 / 10) * (3 / 9),
      exp: 'Çarpım kuralı: (4/10) · (3/9) = 12/90 = 2/15 ≈ 0.1333.', whyFill: { '0.16': 'İadeli gibi hesapladın (4/10 · 4/10). İadesizde ikinci kesir 3/9 olur.', '4/25': 'İadeli gibi hesapladın. İadesizde ikinci kesir 3/9 olur.' } },

    { type: 'prob', topic: 'varyans', title: 'Problem: çalışma saatleri',
      q: 'Rastgele seçilen 5 öğrencinin haftalık ders çalışma saatleri: 6, 8, 10, 12, 14.',
      steps: [
        { label: R`a) Ortalama $\bar{x}$`, num: 10, exp: '50 / 5 = 10', check: () => S.mean([6, 8, 10, 12, 14]) },
        { label: R`b) $\sum (x_i - \bar{x})^2$`, num: 40, exp: '16 + 4 + 0 + 4 + 16 = 40', check: () => S.ssd([6, 8, 10, 12, 14]) },
        { label: R`c) Varyans $s^2$`, num: 10, exp: 'Örneklem → 40 / (5 − 1) = 10', check: () => S.varS([6, 8, 10, 12, 14]) },
        { label: R`d) Standart sapma $s$`, num: Math.sqrt(10), show: '3.162', exp: '√10 ≈ 3.162', check: () => S.sdS([6, 8, 10, 12, 14]) },
        { label: 'e) Değişim katsayısı', num: 100 * Math.sqrt(10) / 10, pct: true, unit: '%', show: '%31.62', exp: 's / x̄ · 100 = 3.162 / 10 · 100 ≈ %31.62', check: () => 100 * S.sdS([6, 8, 10, 12, 14]) / 10 }
      ],
      note: 'Rastgele seçildiği için n − 1 = 4\'e bölündü. Yığın olsaydı σ² = 40 / 5 = 8 olurdu.' },
    { type: 'prob', topic: 'bayes', title: 'Problem: üç tedarikçi',
      q: 'Bir firma parçalarının %50\'sini T1, %30\'unu T2, %20\'sini T3 tedarikçisinden alıyor. Hatalı parça oranları sırasıyla %2, %4 ve %5. Rastgele bir parça seçiliyor.',
      steps: [
        { label: 'a) Parçanın hatalı olma olasılığı P(H)', num: 0.032, exp: '0.50 · 0.02 + 0.30 · 0.04 + 0.20 · 0.05 = 0.010 + 0.012 + 0.010 = 0.032', check: () => 0.5 * 0.02 + 0.3 * 0.04 + 0.2 * 0.05 },
        { label: 'b) Hatalıysa T1\'den gelme olasılığı', num: 0.3125, exp: '0.010 / 0.032 = 0.3125', check: () => 0.010 / 0.032 },
        { label: 'c) Hatalıysa T2\'den gelme olasılığı', num: 0.375, exp: '0.012 / 0.032 = 0.375', check: () => 0.012 / 0.032 },
        { label: 'd) Hatalıysa T3\'ten gelme olasılığı', num: 0.3125, exp: '0.010 / 0.032 = 0.3125', check: () => 0.010 / 0.032 }
      ],
      note: 'Kontrol: 0.3125 + 0.375 + 0.3125 = 1. T2 payı küçük ama hata oranı yüksek olduğu için hatalıların en büyük kısmı ondan.' }
  ]
},
/* ================================================================== */
{
  id: 'd2', title: 'Deneme vizesi 2', desc: '10 test + 6 kısa cevap + 2 problem. Sonda 100 üzerinden puanlanır.',
  questions: [
    { type: 'mc', topic: 'temel', q: 'Aşağıdakilerden hangisi kesikli nicel bir değişkendir?',
      opts: ['Bir ailedeki çocuk sayısı', 'Boy uzunluğu', 'Göz rengi', 'Bir işin bitirilme süresi', 'Vücut ağırlığı'], a: 0,
      exp: 'Çocuk sayısı 2 ile 3 arasında değer alamaz → kesikli.',
      why: { 1: 'Boy, iki değer arasında sonsuz değer alabilir → sürekli.', 2: 'Göz rengi sayısal değil → nitel.', 3: 'Süre sürekli bir değişkendir.', 4: 'Ağırlık sürekli bir değişkendir.' } },
    { type: 'mc', topic: 'temel', q: 'Aşağıdakilerden hangisi örneklemeyi zorunlu kılan nedenlerden biri **değildir**?',
      opts: ['Örneklemden hesaplanan değerin parametreye her zaman eşit olması', 'Maliyet', 'Zaman', 'Doğru veri elde etme güçlüğü', 'İncelenen birimlerin fiziksel zarar görmesi'], a: 0,
      exp: 'Örneklem istatistiği parametreye her zaman eşit değildir, sadece tahminidir. Diğer dördü defterdeki nedenler.' },
    { type: 'mc', topic: 'medyan-mod', q: 'Bir veri setinde verinin geneline göre çok büyük birkaç değer (aykırı değer) varsa hangi merkezi eğilim ölçüsü veriyi daha iyi temsil eder?',
      opts: ['Medyan', 'Aritmetik ortalama', 'Varyans', 'Açıklık', 'Standart sapma'], a: 0,
      exp: 'Medyan sadece ortadaki değerlerden hesaplanır, uç değerlerden etkilenmez.',
      why: { 1: 'Ortalama her değeri kullandığı için uç değerler onu kendine çeker.', 2: 'Varyans merkezi eğilim değil, yayılım ölçüsüdür.', 3: 'Açıklık yayılım ölçüsüdür ve uç değerlere en duyarlı olandır.', 4: 'Standart sapma yayılım ölçüsüdür.' } },
    { type: 'mc', topic: 'ortalama', q: 'Bir veri setinin aritmetik ortalaması 40\'tır. Her değer 2 ile çarpılıp sonra 5 eklenirse yeni ortalama kaç olur?',
      opts: ['85', '80', '45', '90'], a: 0, check: () => 40 * 2 + 5,
      exp: 'Ortalama da aynı işlemlere uğrar: 40 · 2 + 5 = 85.',
      why: { 1: '5 eklemeyi unuttun.', 2: '2 ile çarpmayı unuttun.', 3: 'Sırayı karıştırdın: (40 + 5) · 2 = 90. Önce çarpılıp sonra eklendi.' } },
    { type: 'mc', topic: 'varyans', q: 'Standart sapması 4 olan bir veride her değer 3 ile çarpılırsa yeni varyans kaç olur?',
      opts: ['144', '48', '12', '16', '36'], a: 0, check: () => 9 * 16,
      exp: 'Eski varyans 4² = 16. Çarpımda varyans 3² = 9 ile çarpılır: 16 · 9 = 144. (Yeni standart sapma 12.)',
      why: { 1: 'Varyansı 3 ile çarptın; sabitin karesiyle (9) çarpılmalı.', 2: '12 yeni standart sapma; soru varyansı istiyor.', 3: '16 eski varyans.', 4: 'Standart sapmayı 9 ile çarptın.' } },
    { type: 'mc', topic: 'varyans', q: 'Ortalamaları farklı iki grubun değişkenliğini karşılaştırmak için hangisi kullanılır?',
      opts: ['Değişim katsayısı', 'Varyans', 'Açıklık', 'Mod', 'Medyan'], a: 0,
      exp: 'D.K. = s / x̄ · 100 ortalamaya göre ölçeklendiği için ortalamaları farklı grupları karşılaştırabilir.',
      why: { 1: 'Varyans ancak ortalamalar eşitken karşılaştırma için kullanılır.' } },
    { type: 'mc', topic: 'tablo-grafik', q: 'Nitel bir değişkenin kategorilerinin yüzde paylarını göstermek için en uygun grafik hangisidir?',
      opts: ['Daire (pasta) grafiği', 'Histogram', 'Serpme diyagramı', 'Kutu grafiği'], a: 0,
      exp: 'Pasta grafiğinde her dilim kategorinin yüzde payıdır.',
      why: { 1: 'Histogram nicel veri içindir.', 2: 'Serpme diyagramı iki nicel değişkenin ilişkisini gösterir.', 3: 'Kutu grafiği nicel verinin yayılımını gösterir.' } },
    { type: 'mc', topic: 'korelasyon', q: 'İki değişken arasında Pearson korelasyon katsayısı r = −0.92 bulunmuştur. Doğru yorum hangisidir?',
      opts: ['Güçlü, ters yönlü doğrusal ilişki vardır', 'Zayıf, pozitif yönlü doğrusal ilişki vardır', 'Değişkenler arasında ilişki yoktur', 'Tam, pozitif yönlü doğrusal ilişki vardır', 'Hesap hatası vardır; r negatif olamaz'], a: 0,
      exp: 'İşaret negatif → ters yön; |r| = 0.92 1\'e yakın → güçlü.',
      why: { 4: 'r −1 ile 1 arasında olabilir; negatif değer ters yönlü ilişki demektir.' } },
    { type: 'mc', topic: 'sayma', q: '"ANKARA" kelimesinin harfleriyle anlamlı ya da anlamsız kaç farklı dizilim yapılabilir?',
      opts: ['120', '720', '60', '240', '20'], a: 0, check: () => S.f(6) / S.f(3),
      exp: '6 harf, A 3 kez tekrar ediyor: 6! / 3! = 720 / 6 = 120.',
      why: { 1: '6! aynı A harflerini farklıymış gibi sayar; 3!\'e bölmelisin.', 2: 'Başka tekrar eden harf yok; sadece 3!\'e bölünür.', 4: 'C(6, 3) = 20 bir seçim sayısıdır.' } },
    { type: 'mc', topic: 'bagimsiz', q: 'P(A) = 0.3, P(B) = 0.5 ve P(A ∩ B) = 0.15 ise hangisi doğrudur?',
      opts: ['A ve B bağımsızdır', 'A ve B ayrıktır', 'P(A | B) = 0.5', 'P(A ∪ B) = 0.8', 'A, B\'nin alt kümesidir'], a: 0,
      exp: 'P(A) · P(B) = 0.3 · 0.5 = 0.15 = P(A ∩ B) → bağımsız.',
      why: { 1: 'Ayrık olsaydı P(A ∩ B) = 0 olurdu.', 2: 'P(A | B) = 0.15 / 0.5 = 0.3.', 3: 'P(A ∪ B) = 0.3 + 0.5 − 0.15 = 0.65.', 4: 'A ⊂ B olsaydı P(A ∩ B) = P(A) = 0.3 olurdu.' } },

    { type: 'fill', topic: 'medyan-mod', q: '15, 9, 22, 18, 11, 30 verisinin medyanı kaçtır?', num: 16.5, check: () => S.med([15, 9, 22, 18, 11, 30]),
      exp: 'Sırala: 9, 11, 15, 18, 22, 30. N = 6 çift → (15 + 18) / 2 = 16.5.', whyFill: { '20': 'Verilen sıradaki ortadaki iki sayının (22 + 18) ortalaması. Önce sırala.', '17.5': 'Bu ortalama (105 / 6).' } },
    { type: 'fill', topic: 'ortalama', q: 'Bir sınıfta 20 kız öğrencinin not ortalaması 70, 30 erkek öğrencinin not ortalaması 60\'tır. Sınıfın genel ortalaması kaçtır?', num: 64, check: () => (20 * 70 + 30 * 60) / 50,
      exp: '(20 · 70 + 30 · 60) / 50 = (1400 + 1800) / 50 = 64.', whyFill: { '65': 'Ortalamaların ortalamasını aldın. Gruplar farklı büyüklükte; toplamları kullan.' } },
    { type: 'fill', topic: 'varyans', q: 'Bir yığının değerleri 2, 4, 6, 8\'dir. Yığın varyansı σ² kaçtır?', num: 5, check: () => S.varP([2, 4, 6, 8]),
      exp: 'μ = 5. Kareler: 9 + 1 + 1 + 9 = 20. Yığın → N\'e böl: 20 / 4 = 5.', whyFill: { '6.67': 'n − 1\'e böldün. Tüm yığın verildiği için N\'e bölünür.', '20/3': 'n − 1\'e böldün. Tüm yığın verildiği için N\'e bölünür.' } },
    { type: 'fill', topic: 'sayma', q: '4 haneli bir şifrede her hane 0–9 rakamlarından biri olabiliyor ve rakamlar tekrar edebiliyor. Kaç farklı şifre oluşturulabilir?', num: 10000, check: () => 10 ** 4,
      exp: 'Çarpma kuralı: her hane 10 seçenek → 10 · 10 · 10 · 10 = 10 000.', whyFill: { '5040': 'Bu tekrarsız sıralama P(10, 4). Rakamlar tekrar edebiliyor.' } },
    { type: 'fill', topic: 'kosullu', q: 'P(A) = 0.5 ve P(B | A) = 0.4 ise P(A ∩ B) kaçtır?', num: 0.2, check: () => 0.5 * 0.4,
      exp: 'Çarpım kuralı: P(A ∩ B) = P(A) · P(B | A) = 0.5 · 0.4 = 0.2.' },
    { type: 'fill', topic: 'bayes', q: 'I. torbada 3 kırmızı 2 mavi, II. torbada 1 kırmızı 4 mavi top var. Para atılarak torbalardan biri seçiliyor ve bir top çekiliyor. Çekilen top kırmızıysa I. torbadan çekilmiş olma olasılığı kaçtır?', num: 0.75, check: () => (0.5 * 0.6) / (0.5 * 0.6 + 0.5 * 0.2),
      exp: 'P(K) = 0.5 · 3/5 + 0.5 · 1/5 = 0.3 + 0.1 = 0.4. P(I | K) = 0.3 / 0.4 = 0.75.', whyFill: { '0.6': 'Bu P(K | I), I. torbadan kırmızı çekme olasılığı. İstenen ters yön.', '0.4': 'Bu P(K), toplam olasılık. I. torbanın dalını (0.3) buna böl.', '0.3': 'Bu dalın olasılığı P(I ∩ K). P(K) = 0.4\'e bölmelisin.' } },

    { type: 'prob', topic: 'yayilim', title: 'Problem: günlük satışlar',
      q: 'Bir mağazanın 12 günlük satış adetleri: 14, 18, 21, 9, 25, 17, 30, 12, 21, 16, 23, 19.',
      steps: [
        { label: 'a) Mod', num: 21, exp: '21 iki kez tekrar ediyor.', check: () => S.mode(SATIS) },
        { label: 'b) Medyan', num: 18.5, exp: 'Sıralı: 9, 12, 14, 16, 17, 18, 19, 21, 21, 23, 25, 30 → (18 + 19) / 2 = 18.5', check: () => S.med(SATIS) },
        { label: R`c) $Q_1$`, num: 15, exp: 'Alt yarı 9, 12, 14, 16, 17, 18 → (14 + 16) / 2 = 15', check: () => S.q1(SATIS) },
        { label: R`d) $Q_3$`, num: 22, exp: 'Üst yarı 19, 21, 21, 23, 25, 30 → (21 + 23) / 2 = 22', check: () => S.q3(SATIS) },
        { label: 'e) IQR', num: 7, exp: '22 − 15 = 7', check: () => S.q3(SATIS) - S.q1(SATIS) },
        { label: 'f) Açıklık', num: 21, exp: '30 − 9 = 21', check: () => S.range(SATIS) }
      ],
      note: 'Hocanın Soru 1\'i ile aynı yöntem: önce sırala, n çift olduğu için ilk 6 ve son 6 veriyi ayır.' },
    { type: 'prob', topic: 'bayes', title: 'Problem: tıbbi test',
      q: 'Bir hastalık toplumda %2 oranında görülüyor. Test hastaların %90\'ında pozitif, sağlıklı kişilerin %5\'inde yanlışlıkla pozitif sonuç veriyor. Rastgele bir kişiye test uygulanıyor.',
      steps: [
        { label: 'a) Testin pozitif çıkma olasılığı P(+)', num: 0.067, exp: '0.02 · 0.90 + 0.98 · 0.05 = 0.018 + 0.049 = 0.067', check: () => 0.02 * 0.9 + 0.98 * 0.05 },
        { label: 'b) Test pozitifse kişinin hasta olma olasılığı', num: 0.018 / 0.067, show: '0.2687', exp: '0.018 / 0.067 ≈ 0.2687', check: () => (0.02 * 0.9) / (0.02 * 0.9 + 0.98 * 0.05) },
        { label: 'c) Test negatifse kişinin hasta olma olasılığı (4 ondalık)', num: 0.002 / 0.933, show: '0.0021', tol: 0.00006, exp: 'P(−) = 1 − 0.067 = 0.933; P(H ∩ −) = 0.02 · 0.10 = 0.002 → 0.002 / 0.933 ≈ 0.0021', check: () => (0.02 * 0.1) / (1 - (0.02 * 0.9 + 0.98 * 0.05)) }
      ],
      note: 'Test pozitif çıksa bile hasta olma olasılığı sadece ~%27; çünkü sağlıklı insan sayısı çok fazla.' }
  ]
},
/* ================================================================== */
{
  id: 'd3', title: 'Deneme vizesi 3', desc: '10 test + 6 kısa cevap + 2 problem. Sonda 100 üzerinden puanlanır.',
  questions: [
    { type: 'mc', topic: 'olcme', q: '"Memnuniyet düzeyi: az – orta – çok" değişkeninin ölçme düzeyi hangisidir?',
      opts: ['Sıralama', 'Sınıflama', 'Eşit aralıklı', 'Oranlama'], a: 0,
      exp: 'Değerler sıralanabilir (az < orta < çok) ama aralarındaki farklar ölçülemez → sıralama.',
      why: { 1: 'Sınıflamada sıralama yoktur; burada var.', 2: '"Orta" ile "çok" arasındaki fark sayısal olarak ölçülemez.', 3: 'Mutlak sıfır ve anlamlı oranlar yok.' } },
    { type: 'mc', topic: 'olcme', q: 'Oranlama ölçme düzeyini eşit aralıklı ölçme düzeyinden ayıran özellik hangisidir?',
      opts: ['Sıfırın mutlak yokluğu ifade etmesi', 'Değerlerin sıralanabilmesi', 'Farkların matematiksel olarak anlamlı olması', 'Değerlerin sözel olması', 'Değerlerin sayılabilir olması'], a: 0,
      exp: 'İkisinde de farklar anlamlıdır. Oranlamada 0 = yokluk (0 kg ağırlık yok), eşit aralıklıda değil (0 °C).',
      why: { 1: 'Sıralama her iki düzeyde de var.', 2: 'Farklar her iki düzeyde de anlamlı.' } },
    { type: 'mc', topic: 'ortalama', q: 'Aritmetik ortalama ile ilgili aşağıdakilerden hangisi **yanlıştır**?',
      opts: ['Uç değerlerden etkilenmez', 'Değerlerin ortalamadan farklarının toplamı sıfırdır', 'Farkların kareleri toplamı minimumdur', 'Her değere 10 eklenirse ortalama 10 artar', 'Nitel değişkenler için hesaplanamaz'], a: 0,
      exp: 'Ortalama her değeri kullandığı için uç değerlerden etkilenir; uç değer varsa medyan tercih edilir. Diğerleri doğru özelliklerdir.' },
    { type: 'mc', topic: 'yayilim', q: 'Bir veride Q1 = 34 ve Q3 = 58 bulunmuştur. Çeyrek ayrılış kaçtır?',
      opts: ['12', '24', '46', '92', '6'], a: 0, check: () => (58 - 34) / 2,
      exp: 'IQR = 58 − 34 = 24, Ç.A. = 24 / 2 = 12.',
      why: { 1: '24 IQR\'dir; çeyrek ayrılış bunun yarısı.', 2: 'Bu Q1 ve Q3\'ün ortalaması.', 3: 'Bu Q1 + Q3.' } },
    { type: 'mc', topic: 'tablo-grafik', q: 'Bir kutu grafiğinde Q1 = 20 ve Q3 = 40\'tır. Aşağıdaki değerlerden hangisi potansiyel aykırı değerdir?',
      opts: ['75', '65', '0', '45', '15'], a: 0,
      exp: 'IQR = 20. Alt sınır = 20 − 1.5 · 20 = −10, üst sınır = 40 + 30 = 70. Sadece 75 sınırların dışında.',
      why: { 1: '65 < 70, üst sınırın içinde.', 2: '0 > −10, alt sınırın içinde.' } },
    { type: 'mc', topic: 'korelasyon', q: 'Pearson korelasyon katsayısı r ile ilgili hangisi doğrudur?',
      opts: [R`$-1 \le r \le 1$ aralığında değer alır`, 'r = 0 ise değişkenler arasında hiçbir ilişki yoktur', 'r negatifse ilişki zayıftır', 'r = 1.3 çok güçlü pozitif ilişki gösterir', 'Sadece nitel değişkenler için hesaplanır'], a: 0,
      exp: 'r her zaman −1 ile 1 arasındadır.',
      why: { 1: 'r = 0 sadece doğrusal ilişki olmadığını söyler; eğrisel ilişki olabilir.', 2: 'İşaret yönü gösterir, gücü değil. −0.95 güçlüdür.', 3: 'r 1\'den büyük olamaz.', 4: 'r iki nicel değişken için hesaplanır.' } },
    { type: 'mc', topic: 'sayma', q: '8 kişilik bir takımdan 3 kişilik bir grup seçilecek. Belirli 2 kişi mutlaka grupta olacaksa kaç farklı seçim yapılabilir?',
      opts: ['6', '56', '336', '28', '15'], a: 0, check: () => S.C(6, 1),
      exp: '2 kişi zaten grupta; kalan 1 yer, kalan 6 kişiden: C(6, 1) = 6.',
      why: { 1: 'C(8, 3) = 56 kısıtlamasız seçim.', 2: 'P(8, 3) sıralama sayısı.', 3: 'C(8, 2) = 28; zorunlu kişileri ayırmadın.', 4: 'C(6, 2) = 15; sadece 1 yer kaldı.' } },
    { type: 'mc', topic: 'olasilik', q: 'Hilesiz bir para 3 kez atılıyor. En az bir kez tura gelme olasılığı kaçtır?',
      opts: [fr(7, 8), fr(1, 8), fr(3, 8), fr(1, 2), fr(3, 4)], a: 0, check: () => 1 - 1 / 8,
      exp: 'Tümleyen: hiç tura gelmemesi = YYY → 1/8. P(en az bir tura) = 1 − 1/8 = 7/8.',
      why: { 1: '1/8 hiç tura gelmeme olasılığı; tümleyenini almalısın.', 2: '3/8 tam bir tura olasılığı.' } },
    { type: 'mc', topic: 'kume', q: R`$S = \{1,2,3,4,5,6\}$, $A = \{2,4,6\}$, $B = \{1,2,3\}$ ise $\bar{A} \cap B$ hangisidir?`,
      opts: [R`$\{1, 3\}$`, R`$\{2\}$`, R`$\{1,2,3,4,6\}$`, R`$\{5\}$`, R`$\{4, 6\}$`], a: 0,
      exp: 'Ā = {1, 3, 5}; B ile ortak elemanlar: {1, 3}.',
      why: { 1: '{2} = A ∩ B; A\'nın tümleyenini almadın.', 2: 'Bu A ∪ B.', 4: '{4, 6} = A ∩ B̄.' } },
    { type: 'mc', topic: 'bayes', q: R`Bayes teoreminde $P(B_i\mid A)$ formülünün paydası neyi verir?`,
      opts: [R`A olayının toplam olasılığı $P(A)$`, R`$B_i$ olayının olasılığı`, R`A ile $B_i$'nin kesişiminin olasılığı`, R`$P(A\mid B_i)$'lerin düz toplamı`, 'Her zaman 1'], a: 0,
      exp: R`Payda $\sum P(A\mid B_j)P(B_j) = P(A)$: toplam olasılık kanunu.`,
      why: { 2: 'Kesişim (dalın olasılığı) paydır, payda değil.', 3: 'Oranlar kendi paylarıyla çarpılmadan toplanmaz.' } },

    { type: 'fill', topic: 'varyans', q: 'Bir örneklemin ortalaması 50, varyansı 25\'tir. Değişim katsayısı yüzde kaçtır?', num: 10, pct: true, unit: '%', show: '%10', check: () => 100 * Math.sqrt(25) / 50,
      exp: 's = √25 = 5 → D.K. = 5 / 50 · 100 = %10.', whyFill: { '50': 'Varyansı ortalamaya böldün. Standart sapma (5) kullanılır.' } },
    { type: 'fill', topic: 'yayilim', q: '3, 7, 8, 10, 12, 14, 15, 21 verisinin birinci çeyreği Q1 kaçtır?', num: 7.5, check: () => S.q1([3, 7, 8, 10, 12, 14, 15, 21]),
      exp: 'n = 8 → alt yarı 3, 7, 8, 10 → Q1 = (7 + 8) / 2 = 7.5.' },
    { type: 'fill', topic: 'sayma', q: '6 farklı kitaptan 2\'si seçilip rafa yan yana dizilecek. Kaç farklı dizilim yapılabilir?', num: 30, check: () => S.P(6, 2),
      exp: 'Seçip sıralama → permütasyon: P(6, 2) = 6 · 5 = 30.', whyFill: { '15': 'C(6, 2) sadece seçimi sayar; rafta sıra önemli.' } },
    { type: 'fill', topic: 'olasilik', q: 'Bir torbada 5 kırmızı ve 3 beyaz top var. Rastgele 2 top çekiliyor. İkisinin de beyaz olma olasılığı kaçtır?', num: 3 / 28, show: '3/28 ≈ 0.1071', check: () => S.C(3, 2) / S.C(8, 2),
      exp: 'C(3, 2) / C(8, 2) = 3 / 28 ≈ 0.1071.' },
    { type: 'fill', topic: 'bagimsiz', q: 'A ve B bağımsız; P(A) = 0.6, P(B) = 0.3. A\'nın gerçekleşip B\'nin gerçekleşmeme olasılığı P(A ∩ B̄) kaçtır?', num: 0.42, check: () => 0.6 * (1 - 0.3),
      exp: 'Bağımsızlarda A ve B̄ de bağımsızdır: 0.6 · (1 − 0.3) = 0.42.', whyFill: { '0.18': 'Bu P(A ∩ B). B\'nin gerçekleşmemesi isteniyor: 1 − 0.3 = 0.7.' } },
    { type: 'fill', topic: 'kosullu', q: 'Bir sınıfta öğrencilerin %40\'ı matematiği, %25\'i hem matematiği hem fiziği geçmiştir. Matematiği geçtiği bilinen bir öğrencinin fiziği de geçmiş olma olasılığı kaçtır?', num: 0.625, check: () => 0.25 / 0.40,
      exp: 'P(F | M) = P(F ∩ M) / P(M) = 0.25 / 0.40 = 0.625.', whyFill: { '0.1': 'Çarptın (0.25 · 0.40). Koşullu olasılıkta kesişim koşula bölünür.' } },

    { type: 'prob', topic: 'ortalama', title: 'Problem: iki şube (hoca tarzı)',
      q: 'Bir okulun 9A ve 9B şubelerindeki toplam 50 öğrenci aynı sınava girmiştir. Tüm öğrencilerin ortalaması 72, 9A\'daki 20 öğrencinin ortalaması 66\'dır.',
      steps: [
        { label: R`a) 9B öğrenci sayısı $n_B$`, num: 30, exp: '50 − 20 = 30', check: () => 50 - 20 },
        { label: 'b) Toplam puan', num: 3600, exp: '50 × 72 = 3600', check: () => 50 * 72 },
        { label: 'c) 9A toplam puanı', num: 1320, exp: '20 × 66 = 1320', check: () => 20 * 66 },
        { label: 'd) 9B toplam puanı', num: 2280, exp: '3600 − 1320 = 2280', check: () => 50 * 72 - 20 * 66 },
        { label: R`e) 9B ortalaması $\bar{x}_B$`, num: 76, exp: '2280 / 30 = 76', check: () => (50 * 72 - 20 * 66) / 30 }
      ] },
    { type: 'prob', topic: 'bayes', title: 'Problem: okula geç kalma',
      q: 'Bir okulda öğrencilerin %40\'ı otobüsle, %35\'i yürüyerek, %25\'i servisle geliyor. Geç kalma oranları sırasıyla %10, %4 ve %2. Rastgele bir öğrenci seçiliyor.',
      steps: [
        { label: 'a) Öğrencinin geç kalma olasılığı P(G)', num: 0.059, exp: '0.40 · 0.10 + 0.35 · 0.04 + 0.25 · 0.02 = 0.040 + 0.014 + 0.005 = 0.059', check: () => 0.4 * 0.1 + 0.35 * 0.04 + 0.25 * 0.02 },
        { label: 'b) Geç kaldıysa otobüsle gelmiş olma olasılığı', num: 0.04 / 0.059, show: '0.678', exp: '0.040 / 0.059 ≈ 0.678', check: () => 0.04 / 0.059 },
        { label: 'c) Geç kaldıysa yürüyerek gelmiş olma olasılığı', num: 0.014 / 0.059, show: '0.2373', exp: '0.014 / 0.059 ≈ 0.2373', check: () => 0.014 / 0.059 },
        { label: 'd) Geç kaldıysa servisle gelmiş olma olasılığı', num: 0.005 / 0.059, show: '0.0847', exp: '0.005 / 0.059 ≈ 0.0847', check: () => 0.005 / 0.059 }
      ],
      note: 'Kontrol: 0.678 + 0.237 + 0.085 ≈ 1.' }
  ]
},
/* ================================================================== */
{
  id: 'd4', title: 'Deneme vizesi 4 (klasik, hoca tarzı)', desc: 'Sadece çok adımlı klasik problemler: hocanın 3 sorusunun benzerleri + Bayes. Sonda 100 üzerinden puanlanır.',
  questions: [
    { type: 'prob', topic: 'medyan-mod', title: 'Problem 1: sınav notları',
      q: 'Bir sınıftaki 20 öğrencinin notları: 35, 41, 47, 52, 55, 58, 58, 61, 64, 67, 69, 72, 74, 74, 74, 78, 83, 86, 90, 97.',
      steps: [
        { label: 'a) Mod', num: 74, exp: '74 üç kez, 58 iki kez tekrar ediyor.', check: () => S.mode(NOT20) },
        { label: 'b) Medyan', num: 68, exp: 'N = 20 → (10. + 11. değer) / 2 = (67 + 69) / 2 = 68', check: () => S.med(NOT20) },
        { label: R`c) $Q_1$`, num: 56.5, exp: 'İlk 10 veri: 35, 41, 47, 52, 55, 58, 58, 61, 64, 67 → (55 + 58) / 2 = 56.5', check: () => S.q1(NOT20) },
        { label: R`d) $Q_3$`, num: 76, exp: 'Son 10 veri: 69, 72, 74, 74, 74, 78, 83, 86, 90, 97 → (74 + 78) / 2 = 76', check: () => S.q3(NOT20) },
        { label: 'e) IQR', num: 19.5, exp: '76 − 56.5 = 19.5', check: () => S.q3(NOT20) - S.q1(NOT20) },
        { label: 'f) 60\'ın altında not alanların yüzdesi', num: 35, pct: true, unit: '%', show: '%35', exp: '7 öğrenci (35 … 58) → 7 / 20 × 100 = %35', check: () => 100 * S.below(NOT20, 60) / 20 }
      ] },
    { type: 'prob', topic: 'tablo-grafik', title: 'Problem 2: histogram tablosu',
      q: 'Problem 1\'deki 20 notu 10\'ar puanlık sınıflara ayırıp her sınıfın frekansını yazınız (histogram için). Notlar: 35, 41, 47, 52, 55, 58, 58, 61, 64, 67, 69, 72, 74, 74, 74, 78, 83, 86, 90, 97.',
      steps: [
        { label: '30–39', num: 1, check: () => S.count(NOT20, 30, 39), exp: '35' },
        { label: '40–49', num: 2, check: () => S.count(NOT20, 40, 49), exp: '41, 47' },
        { label: '50–59', num: 4, check: () => S.count(NOT20, 50, 59), exp: '52, 55, 58, 58' },
        { label: '60–69', num: 4, check: () => S.count(NOT20, 60, 69), exp: '61, 64, 67, 69' },
        { label: '70–79', num: 5, check: () => S.count(NOT20, 70, 79), exp: '72, 74, 74, 74, 78' },
        { label: '80–89', num: 2, check: () => S.count(NOT20, 80, 89), exp: '83, 86' },
        { label: '90–99', num: 2, check: () => S.count(NOT20, 90, 99), exp: '90, 97' }
      ],
      note: 'Toplam 20. En yüksek çubuk 70–79.' },
    { type: 'prob', topic: 'varyans', title: 'Problem 3: varyans ve standart sapma',
      q: 'Bir araştırmacı rastgele seçtiği 6 birimin değerlerini 5.2, 4.8, 5.0, 5.4, 4.6, 5.0 olarak belirlemiştir.',
      steps: [
        { label: R`a) $\bar{x}$`, num: 5, exp: '30 / 6 = 5.0', check: () => S.mean(P6) },
        { label: R`b) $\sum (x_i - \bar{x})^2$`, num: 0.4, exp: '0.04 + 0.04 + 0 + 0.16 + 0.16 + 0 = 0.40', check: () => S.ssd(P6) },
        { label: R`c) $s^2$`, num: 0.08, exp: '0.40 / 5 = 0.08', check: () => S.varS(P6) },
        { label: R`d) $s$`, num: Math.sqrt(0.08), show: '0.2828', exp: '√0.08 ≈ 0.2828', check: () => S.sdS(P6) },
        { label: R`e) Ana kitle varyansı $\sigma^2$`, num: 0.4 / 6, show: '0.0667', exp: '0.40 / 6 ≈ 0.0667', check: () => S.varP(P6) }
      ] },
    { type: 'prob', topic: 'ortalama', title: 'Problem 4: iki şubenin maaş ortalaması',
      q: 'Bir şirketin A ve B şubelerinde toplam 40 çalışan var. Tüm çalışanların ortalama maaşı 32 bin TL, A şubesindeki 15 çalışanın ortalaması 28 bin TL\'dir.',
      steps: [
        { label: R`a) B şubesindeki çalışan sayısı`, num: 25, exp: '40 − 15 = 25', check: () => 40 - 15 },
        { label: 'b) Toplam maaş (bin TL)', num: 1280, exp: '40 × 32 = 1280', check: () => 40 * 32 },
        { label: 'c) A şubesi toplamı (bin TL)', num: 420, exp: '15 × 28 = 420', check: () => 15 * 28 },
        { label: 'd) B şubesi toplamı (bin TL)', num: 860, exp: '1280 − 420 = 860', check: () => 40 * 32 - 15 * 28 },
        { label: 'e) B şubesi ortalaması (bin TL)', num: 34.4, exp: '860 / 25 = 34.4', check: () => (40 * 32 - 15 * 28) / 25 }
      ] },
    { type: 'prob', topic: 'bayes', title: 'Problem 5: üç makine (Bayes)',
      q: 'Bir fabrikada üretimin %25\'i A, %35\'i B, %40\'ı C makinesinde yapılıyor. Makinelerin kusurlu üretim oranları sırasıyla %5, %4 ve %2. Rastgele bir ürün seçiliyor.',
      steps: [
        { label: 'a) Ürünün kusurlu olma olasılığı P(K)', num: 0.0345, exp: '0.25 · 0.05 + 0.35 · 0.04 + 0.40 · 0.02 = 0.0125 + 0.014 + 0.008 = 0.0345', check: () => 0.25 * 0.05 + 0.35 * 0.04 + 0.4 * 0.02 },
        { label: 'b) Kusurluysa A\'da üretilmiş olma olasılığı', num: 0.0125 / 0.0345, show: '0.3623', exp: '0.0125 / 0.0345 ≈ 0.3623', check: () => 0.0125 / 0.0345 },
        { label: 'c) Kusurluysa B\'de üretilmiş olma olasılığı', num: 0.014 / 0.0345, show: '0.4058', exp: '0.014 / 0.0345 ≈ 0.4058', check: () => 0.014 / 0.0345 },
        { label: 'd) Kusurluysa C\'de üretilmiş olma olasılığı', num: 0.008 / 0.0345, show: '0.2319', exp: '0.008 / 0.0345 ≈ 0.2319', check: () => 0.008 / 0.0345 }
      ],
      note: 'Kontrol: 0.3623 + 0.4058 + 0.2319 = 1.' }
  ]
}
];

/* ================================================================== */
window.TOPIC_QUESTIONS = {
  temel: [
    { type: 'mc', topic: 'temel', src: 'Defter', q: 'Hakkında ölçüm veya gözlem yaparak bilgi elde ettiğimiz kişi ya da eşya biçimindeki en küçük öğeye ne denir?',
      opts: ['Deneysel birim', 'Değişken', 'Parametre', 'Örneklem', 'Yığın'], a: 0, exp: 'Deneysel birim; sayılabilir veya ölçülebilir olmalıdır.',
      why: { 1: 'Değişken birimin bir özelliğidir (boy, cinsiyet…), birimin kendisi değil.', 2: 'Parametre yığından hesaplanan özet sayıdır.', 3: 'Örneklem birimlerden oluşan bir topluluktur.', 4: 'Yığın birimlerin tümünün oluşturduğu topluluktur.' } },
    { type: 'mc', topic: 'temel', src: 'Defter', q: 'Yığındaki birimlerin tamamından ilgili değişken bakımından veri toplanmasına ne denir?',
      opts: ['Tam sayım', 'Örnekleme', 'Örneklem', 'Parametre', 'Betimsel istatistik'], a: 0, exp: 'Tam sayım. Örneklemden veri toplanmasına ise örnekleme denir.' },
    { type: 'mc', topic: 'temel', q: 'Aşağıdakilerden hangisi nitel bir değişkendir?',
      opts: ['Medeni durum', 'Yaş', 'Kilo', 'Günlük adım sayısı', 'Sınav puanı'], a: 0, exp: 'Medeni durum sayısal bir anlam taşımaz → nitel (sözel).' },
    { type: 'mc', topic: 'temel', src: 'Defter', q: 'Ardışık iki değeri arasında kuramsal olarak sonsuz sayıda değer alabilen değişkene ne denir?',
      opts: ['Sürekli değişken', 'Kesikli değişken', 'Nitel değişken', 'Sınıflama düzeyindeki değişken', 'Sıralama düzeyindeki değişken'], a: 0, exp: 'Sürekli değişken (boy, süre, ağırlık).',
      why: { 1: 'Kesikli değişken iki ardışık değer arasında değer alamaz (çocuk sayısı).' } },
    { type: 'fill', topic: 'temel', src: 'Defter', q: 'Bir yığın üzerinde tam sayım yapılarak elde edilen ve yığını tanımlayan sayısal ölçüye ne denir? (tek kelime)', ans: ['parametre'], exp: 'Parametre (μ, σ). Örneklemden hesaplanana istatistik denir.', whyFill: { 'istatistik': 'İstatistik örneklemden hesaplanır. Tam sayımla yığından hesaplanan değer parametredir.' } }
  ],
  olcme: [
    { type: 'mc', topic: 'olcme', q: 'Kan grubu (A, B, AB, 0) değişkeninin ölçme düzeyi hangisidir?',
      opts: ['Sınıflama', 'Sıralama', 'Eşit aralıklı', 'Oranlama'], a: 0, exp: 'Kan grupları arasında büyüklük–küçüklük sıralaması yok → sınıflama.' },
    { type: 'mc', topic: 'olcme', q: 'Aşağıdakilerden hangisi oranlama ölçme düzeyindedir?',
      opts: ['Vücut ağırlığı (kg)', 'Hava sıcaklığı (°C)', 'Eğitim düzeyi', 'Doğum yeri', 'Ligdeki sıralama'], a: 0, exp: '0 kg mutlak yokluktur ve 80 kg, 40 kg\'ın iki katıdır → oranlama.',
      why: { 1: 'Sıcaklık (°C) eşit aralıklıdır; 0 °C yokluk değil.', 2: 'Eğitim düzeyi sıralamadır.', 3: 'Doğum yeri sınıflamadır.', 4: 'Lig sıralaması sıralama düzeyindedir.' } },
    { type: 'mc', topic: 'olcme', src: 'Defter', q: 'Değerler arasında büyüklük–küçüklük sıralaması yapılabiliyor ama farklar matematiksel olarak anlamlı değilse ölçme düzeyi hangisidir?',
      opts: ['Sıralama', 'Sınıflama', 'Eşit aralıklı', 'Oranlama'], a: 0, exp: 'Tanım: sıralama ölçme düzeyi.' },
    { type: 'mc', topic: 'olcme', src: 'Defter', q: 'Aritmetik ortalama hangi ölçme düzeylerindeki değişkenler için hesaplanabilir?',
      opts: ['Eşit aralıklı ve oranlama', 'Sadece sınıflama', 'Sınıflama ve sıralama', 'Tüm düzeyler', 'Sadece sıralama'], a: 0, exp: 'Ortalama için değişken nicel olmalı → eşit aralıklı ya da oranlama.' }
  ],
  ortalama: [
    { type: 'fill', topic: 'ortalama', src: 'Defter örneği', q: 'Bir ilacın etki süresi için rastgele seçilen 8 hastada süreler (saat): 3, 3.2, 3.6, 2.8, 3.4, 4, 3.7, 4.3. Ortalama etki süresi kaç saat?', num: 3.5, unit: 'saat', check: () => S.mean([3, 3.2, 3.6, 2.8, 3.4, 4, 3.7, 4.3]), exp: 'Σx = 28 → 28 / 8 = 3.5 saat.' },
    { type: 'fill', topic: 'ortalama', src: 'Defter örneği', q: '301, 302, 303, 304, 305 verisinin aritmetik ortalaması kaçtır?', num: 303, check: () => S.mean([301, 302, 303, 304, 305]), exp: 'Hepsinden 300 çıkar: 1–5 ortalaması 3 → 303.' },
    { type: 'mc', topic: 'ortalama', q: 'Ortalaması 12 olan bir veride her değerden 2 çıkarılıp sonuç 3\'e bölünürse yeni ortalama kaç olur?',
      opts: [fr(10, 3), '2', '4', '10', '6'], a: 0, check: () => (12 - 2) / 3, exp: 'Ortalama da aynı işlemlere uğrar: (12 − 2) / 3 = 10/3.',
      why: { 1: 'Sırayı ters uyguladın: 12 / 3 − 2 = 2.', 2: '2 çıkarmayı unuttun.', 3: '3\'e bölmeyi unuttun.' } },
    { type: 'fill', topic: 'ortalama', src: 'Defter örneği', q: 'Rastgele seçilen 10 filmin kapasiteleri (amper-saat): 140, 136, 150, 144, 148, 152, 138, 141, 140, 151. Ortalama kaçtır?', num: 144, check: () => S.mean(FILM), exp: '1440 / 10 = 144.' },
    { type: 'mc', topic: 'ortalama', q: R`Bir verideki değerlerin ortalamadan farklarının toplamı $\sum (x_i - \bar{x})$ kaçtır?`,
      opts: ['0', 'n', R`$\bar{x}$`, 'Varyans', 'Her zaman pozitif bir sayı'], a: 0, exp: 'Pozitif ve negatif farklar birbirini götürür; toplam her zaman 0. Bu yüzden varyansta farkların kareleri alınır.' },
    { type: 'fill', topic: 'ortalama', q: 'Ortalaması 50 olan 10 kişilik bir gruba, ortalaması 80 olan 5 kişi katılıyor. Yeni grubun ortalaması kaçtır?', num: 60, check: () => (10 * 50 + 5 * 80) / 15,
      exp: '(10 · 50 + 5 · 80) / 15 = 900 / 15 = 60.', whyFill: { '65': 'Ortalamaların ortalamasını aldın. Gruplar farklı büyüklükte; toplamları kullan.' } }
  ],
  'medyan-mod': [
    { type: 'fill', topic: 'medyan-mod', src: 'Defter örneği', q: 'Not ortalamaları: 3.46, 3.37, 3.72, 3.80, 3.20, 3.49, 3.90, 3.61, 3.66. Medyan kaçtır?', num: 3.61, check: () => S.med([3.46, 3.37, 3.72, 3.80, 3.20, 3.49, 3.90, 3.61, 3.66]),
      exp: 'Sırala: 3.20, 3.37, 3.46, 3.49, 3.61, 3.66, 3.72, 3.80, 3.90 → 5. değer 3.61.', whyFill: { '3.2': 'Verilen sıradaki ortadaki değer. Önce sırala.' } },
    { type: 'fill', topic: 'medyan-mod', src: 'Defter örneği', q: 'Not ortalamaları (8 değer): 3.46, 3.37, 3.72, 3.80, 3.20, 3.49, 3.61, 3.66. Medyan kaçtır?', num: 3.55, check: () => S.med([3.46, 3.37, 3.72, 3.80, 3.20, 3.49, 3.61, 3.66]),
      exp: 'Sıralı: 3.20, 3.37, 3.46, 3.49, 3.61, 3.66, 3.72, 3.80 → (3.49 + 3.61) / 2 = 3.55.', whyFill: { '3.49': 'Veri sayısı çift; ortadaki iki değerin ortalaması alınır.', '3.61': 'Veri sayısı çift; ortadaki iki değerin ortalaması alınır.' } },
    { type: 'fill', topic: 'medyan-mod', q: 'Bir klinikte hastaların kanser türleri: akciğer, göğüs, akciğer, kolon, göğüs, akciğer, akciğer, kolon, göğüs, akciğer. Bu verinin modu nedir?', ans: ['akciğer', 'akciger'], exp: 'Akciğer 5, göğüs 3, kolon 2 kez → mod akciğer. Nitel veride mod bulunur.' },
    { type: 'mc', topic: 'medyan-mod', src: 'Defter', q: 'Aşağıdakilerden hangisi hem nitel hem nicel değişkenler için bulunabilir?',
      opts: ['Mod', 'Medyan', 'Aritmetik ortalama', 'Varyans', 'Standart sapma'], a: 0, exp: 'Mod en sık tekrar eden değerdir; "akciğer" gibi sözel veride de bulunur.' },
    { type: 'fill', topic: 'medyan-mod', src: 'Defter örneği', q: '10, 9, 9, 5, 4, 5, 5, 3, 7, 8, 5, 9, 6, 9, 9 verisinin modu kaçtır?', num: 9, check: () => S.mode([10, 9, 9, 5, 4, 5, 5, 3, 7, 8, 5, 9, 6, 9, 9]),
      exp: '9 beş kez, 5 dört kez tekrar ediyor → mod 9.', whyFill: { '5': '5 dört kez tekrar ediyor; 9 beş kez.' } }
  ],
  yayilim: [
    { type: 'fill', topic: 'yayilim', src: 'Defter örneği', q: '4, 5, 12, 27, 24, 12 verisinin açıklığı kaçtır?', num: 23, check: () => S.range([4, 5, 12, 27, 24, 12]), exp: '27 − 4 = 23.' },
    { type: 'fill', topic: 'yayilim', src: 'Defter örneği', q: '10, 22, 26, 30, 32, 38, 40, 45, 47, 54 verisinin çeyrekler arası açıklığı (IQR) kaçtır?', num: 19, check: () => S.q3(D10) - S.q1(D10),
      exp: 'Q1 = 26 (10, 22, 26, 30, 32\'nin ortası), Q3 = 45 (38, 40, 45, 47, 54\'ün ortası) → 19.', whyFill: { '44': 'Bu açıklık (54 − 10).', '9.5': 'Bu çeyrek ayrılış (IQR / 2).' } },
    { type: 'fill', topic: 'yayilim', src: 'Defter örneği', q: 'Aynı veri (10, 22, 26, 30, 32, 38, 40, 45, 47, 54) için çeyrek ayrılış kaçtır?', num: 9.5, check: () => (S.q3(D10) - S.q1(D10)) / 2, exp: 'Ç.A. = IQR / 2 = 19 / 2 = 9.5.', whyFill: { '19': 'Bu IQR; çeyrek ayrılış onun yarısı.' } },
    { type: 'fill', topic: 'yayilim', q: '2, 4, 6, 8, 10 verisinin ortalama ayrılışı (ortalama mutlak sapma) kaçtır?', num: 2.4, check: () => S.oa([2, 4, 6, 8, 10]), exp: 'μ = 6 → |farklar| 4, 2, 0, 2, 4 → 12 / 5 = 2.4.', whyFill: { '0': 'Mutlak değer almadın; farkların kendisinin toplamı hep 0.' } },
    { type: 'fill', topic: 'yayilim', src: 'Defter örneği', q: '10, 22, 26, 30, 32, 38, 40, 45, 47, 54 verisinin MADN değeri kaçtır? (2 ondalık)', num: 9.5 / 0.6745, show: '14.08', check: () => S.madn(D10),
      exp: 'med = 35; |xᵢ − 35| sıralı: 3, 3, 5, 5, 9, 10, 12, 13, 19, 25 → medyan 9.5 → 9.5 / 0.6745 ≈ 14.08.', whyFill: { '9.5': '0.6745\'e bölmeyi unuttun.' } },
    { type: 'mc', topic: 'yayilim', src: 'Defter', q: 'Sıralı bir veride medyandan büyük olan değerlerin medyanı hangisidir?',
      opts: [R`$Q_3$`, R`$Q_1$`, R`$Q_2$`, 'IQR', 'Açıklık'], a: 0, exp: 'Q3 (üçüncü çeyrek). Medyandan küçüklerin medyanı Q1, medyanın kendisi Q2.' }
  ],
  varyans: [
    { type: 'fill', topic: 'varyans', src: 'Defter örneği', q: 'Rastgele seçilen 10 filmin kapasiteleri: 140, 136, 150, 144, 148, 152, 138, 141, 140, 151. Örnek varyansı s² kaçtır?', num: 34, check: () => S.varS(FILM),
      exp: 'x̄ = 144; kareler toplamı 306; s² = 306 / 9 = 34.', whyFill: { '30.6': 'N\'e böldün. Rastgele seçilmiş → örneklem → n − 1 = 9.' } },
    { type: 'fill', topic: 'varyans', src: 'Defter örneği', q: 'Aynı filmler için örnek standart sapması s kaçtır? (2 ondalık)', num: Math.sqrt(34), show: '5.83', check: () => S.sdS(FILM), exp: '√34 ≈ 5.83.', whyFill: { '34': 'Bu varyans; standart sapma karekökü.' } },
    { type: 'mc', topic: 'varyans', src: 'Defter örneği', q: 'İki firmanın son 5 yıllık kâr yüzdeleri A: 4, 2, 5, 3, 1 ve B: 2, 3, 3, 3, 4. Hangisi daha homojendir?',
      opts: [R`B, çünkü $\sigma_B^2 = 0.4 < \sigma_A^2 = 2$`, R`A, çünkü $\sigma_A^2 = 2$ daha büyük`, 'İkisi aynı, çünkü ortalamaları eşit', 'A, çünkü açıklığı daha büyük', 'Karşılaştırılamaz'], a: 0,
      exp: 'Ortalamalar eşit (3); varyansı küçük olan daha homojen: B.', why: { 1: 'Varyans büyükse değerler daha dağınıktır, homojen değil.', 2: 'Ortalama eşitliği yayılım hakkında bilgi vermez.' } },
    { type: 'fill', topic: 'varyans', src: 'Defter örneği', q: 'B okulunda okuma süresi ortalaması 4.8 dk, varyansı 16. Değişim katsayısı yüzde kaçtır? (2 ondalık)', num: 400 / 4.8, pct: true, unit: '%', show: '%83.33', check: () => 100 * 4 / 4.8,
      exp: 's = √16 = 4 → 4 / 4.8 · 100 ≈ %83.33.', whyFill: { '333.33': 'Varyansı kullandın; standart sapma (4) kullanılır.' } },
    { type: 'mc', topic: 'varyans', q: 'Tüm değerleri aynı olan bir verinin (ör. 7, 7, 7, 7) varyansı kaçtır?',
      opts: ['0', '7', '49', '1', 'Tanımsız'], a: 0, exp: 'Hiçbir değer ortalamadan farklı değil → varyans 0 (değişim yok).' },
    { type: 'mc', topic: 'varyans', q: 'Yığın varyansı ile örneklem varyansı arasındaki fark nedir?',
      opts: [R`Yığında $N$'e, örneklemde $n-1$'e bölünür`, R`Yığında $n-1$'e, örneklemde $N$'e bölünür`, 'Yığında karekök alınır, örneklemde alınmaz', 'Örneklemde mutlak değer, yığında kare alınır', 'Fark yoktur'], a: 0,
      exp: 'σ² = Σ(x − μ)² / N; s² = Σ(x − x̄)² / (n − 1).' }
  ],
  'tablo-grafik': [
    { type: 'mc', topic: 'tablo-grafik', src: 'Defter', q: 'Histogram için hangisi doğrudur?',
      opts: ['Nicel verinin sınıfları x eksenine, frekansları y eksenine yazılır; dikdörtgenler bitişiktir', 'Nitel veriler için kullanılır', 'Dilim açıları yüzdelerle orantılıdır', 'İki değişken arasındaki ilişkiyi gösterir', 'Çubuklar arasında boşluk bırakılır'], a: 0, exp: 'Histogram: dik koordinat sisteminde yan yana çizilen eşit tabanlı dikdörtgenler.' },
    { type: 'mc', topic: 'tablo-grafik', q: 'Kutu grafiği aşağıdakilerden hangisini doğrudan göstermez?',
      opts: ['Aritmetik ortalama', 'Medyan', 'Q1 ve Q3', 'Potansiyel aykırı değerler', 'Verinin yayılımı'], a: 0, exp: 'Kutu grafiği medyan, çeyrekler, yayılım ve aykırı değerleri gösterir; ortalamayı göstermez.' },
    { type: 'fill', topic: 'tablo-grafik', src: 'Defter örneği', q: 'Bir kutu grafiğinde Q1 = 470, Q3 = 950\'dir. Üst sınır (Q3 + 1.5 · IQR) kaçtır?', num: 1670, check: () => 950 + 1.5 * (950 - 470),
      exp: 'IQR = 480 → 950 + 1.5 · 480 = 950 + 720 = 1670.', whyFill: { '1430': '1.5 ile çarpmayı unuttun.' } },
    { type: 'fill', topic: 'tablo-grafik', src: 'Defter örneği', q: '31 kişilik bir veride TT kategorisinde 15 kişi var. Pasta grafiğinde bu kategorinin payı yüzde kaçtır? (2 ondalık)', num: 1500 / 31, pct: true, unit: '%', show: '%48.39', check: () => 100 * 15 / 31, exp: '15 / 31 · 100 ≈ %48.39.' },
    { type: 'mc', topic: 'tablo-grafik', q: 'İki nicel değişken arasındaki ilişkiyi görmek için hangi grafik kullanılır?',
      opts: ['Serpme diyagramı', 'Pasta grafiği', 'Çubuk grafiği', 'Histogram', 'Kutu grafiği'], a: 0, exp: 'Serpme diyagramı: her birim (x, y) noktası olarak çizilir.' },
    { type: 'mc', topic: 'tablo-grafik', src: 'Defter', q: 'İki veya daha fazla sınıflama ölçme düzeyindeki değişkenin düzeylerine ilişkin sayı ya da oranları veren tablo hangisidir?',
      opts: ['Çapraz tablo', 'Gruplandırılmış frekans tablosu', 'Sınıflandırılmış frekans tablosu', 'Histogram', 'Kutu grafiği'], a: 0, exp: 'Çapraz tablo (ör. cinsiyet × sigara kullanımı).' }
  ],
  korelasyon: [
    { type: 'fill', topic: 'korelasyon', q: 'x: 1, 2, 3, 4, 5 ve y: 2, 4, 5, 4, 5 için Pearson korelasyon katsayısı r kaçtır? (2 ondalık)', num: 6 / Math.sqrt(60), show: '0.77', check: () => S.r([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]),
      exp: 'Σ(x − x̄)(y − ȳ) = 6, Σ(x − x̄)² = 10, Σ(y − ȳ)² = 6 → r = 6 / √60 ≈ 0.77.' },
    { type: 'mc', topic: 'korelasyon', src: 'Defter', q: 'r = 0 bulunduysa ne söylenebilir?',
      opts: ['x ile y arasında doğrusal ilişki yoktur', 'x ile y arasında hiçbir ilişki yoktur', 'Tam pozitif doğrusal ilişki vardır', 'Tam ters doğrusal ilişki vardır', 'Hesap hatalıdır'], a: 0,
      exp: 'r sadece doğrusal ilişkiyi ölçer.', why: { 1: 'Eğrisel (doğrusal olmayan) ilişki olabilir; r bunu ölçmez.' } },
    { type: 'mc', topic: 'korelasyon', q: 'Serpme diyagramında noktalar soldan sağa aşağı inen bir doğru etrafında sıkı biçimde toplanmışsa r için en uygun değer hangisidir?',
      opts: ['−0.9', '0.9', '0', '1.5', '−1.5'], a: 0, exp: 'Azalan → negatif, sıkı → |r| 1\'e yakın.', why: { 3: 'r 1\'den büyük olamaz.', 4: 'r −1\'den küçük olamaz.' } },
    { type: 'fill', topic: 'korelasyon', q: 'n = 5, Σ(xᵢ − x̄)(yᵢ − ȳ) = 24, sₓ = 2 ve s_y = 4 ise r kaçtır?', num: 0.75, check: () => 24 / ((5 - 1) * 2 * 4),
      exp: 'r = 24 / ((5 − 1) · 2 · 4) = 24 / 32 = 0.75.', whyFill: { '0.6': 'n ile çarptın; formülde (n − 1) var.' } }
  ],
  sayma: [
    { type: 'fill', topic: 'sayma', src: 'Defter örneği', q: 'a, b, c, d harfleri ikişerli gruplar halinde kaç farklı şekilde sıralanır?', num: 12, check: () => S.P(4, 2), exp: 'P(4, 2) = 4! / 2! = 12.', whyFill: { '6': 'C(4, 2) seçimi sayar; sıralamada ab ve ba farklıdır.' } },
    { type: 'fill', topic: 'sayma', src: 'Defter örneği', q: '"İSTATİSTİK" kelimesinin harfleriyle kaç farklı dizilim yapılabilir?', num: 50400, check: () => S.f(10) / (S.f(3) * S.f(2) * S.f(3)),
      exp: '10 harf; İ 3, S 2, T 3 kez → 10! / (3! 2! 3!) = 50400.' },
    { type: 'fill', topic: 'sayma', src: 'Defter örneği', q: '3 kimya, 4 matematik ve 2 fizik kitabı (hepsi farklı) aynı alandaki kitaplar yan yana olacak şekilde rafa kaç farklı şekilde dizilir?', num: 1728, check: () => S.f(3) * S.f(3) * S.f(4) * S.f(2),
      exp: 'Gruplar 3!, grup içleri 3! · 4! · 2! → 6 · 6 · 24 · 2 = 1728.', whyFill: { '288': 'Grupların kendi arasındaki sıralamasını (3!) unuttun.' } },
    { type: 'fill', topic: 'sayma', src: 'Defter örneği', q: 'Bir soru havuzunda 5 soru var. Bunlardan 3\'ü kaç farklı şekilde seçilebilir?', num: 10, check: () => S.C(5, 3), exp: 'C(5, 3) = 10.', whyFill: { '60': 'P(5, 3); seçimde sıra önemsiz.' } },
    { type: 'mc', topic: 'sayma', src: 'Defter örneği', q: '4 matematik ve 5 istatistik öğrencisinden 2 matematik, 3 istatistik öğrencisi seçilecek. Belirli 2 istatistikçi mutlaka seçilecekse kaç farklı seçim yapılır?',
      opts: ['18', '60', '30', '6', '12'], a: 0, check: () => S.C(4, 2) * S.C(3, 1), exp: 'C(4, 2) · C(3, 1) = 6 · 3 = 18.', why: { 1: '60 kısıtlamasız seçim.', 3: 'Matematikçi seçimini (6) unutmadın ama istatistikçiyi saymadın.' } },
    { type: 'mc', topic: 'sayma', src: 'Defter örneği', q: 'Aynı grupta (4 matematik, 5 istatistik; 2 + 3 kişi seçilecek) belirli bir matematikçi seçilmeyecekse kaç farklı seçim yapılır?',
      opts: ['30', '60', '18', '10', '40'], a: 0, check: () => S.C(3, 2) * S.C(5, 3), exp: 'Matematikçiler 3 kişiden: C(3, 2) = 3; istatistikçiler C(5, 3) = 10 → 30.' },
    { type: 'mc', topic: 'sayma', src: 'Defter örneği', q: 'Bir testte 20 soru var, her sorunun 4 seçeneği var. Ardışık iki sorunun doğru cevabı aynı seçenek olamıyorsa cevap anahtarı kaç farklı şekilde oluşturulabilir?',
      opts: [R`$4\cdot 3^{19}$`, R`$4^{20}$`, R`$3^{20}$`, R`$20\cdot 4$`, R`$4\cdot 3\cdot 20$`], a: 0, exp: 'İlk soru 4 seçenek, sonraki her soru bir öncekinden farklı 3 seçenek → 4 · 3¹⁹.', why: { 1: 'Kısıtlamayı uygulamadın.' } },
    { type: 'mc', topic: 'sayma', src: 'Defter örneği', q: '52\'lik iskambil destesindeki 4 as yan yana olacak şekilde tüm kartlar kaç farklı şekilde dizilebilir?',
      opts: [R`$49!\cdot 4!$`, R`$48!\cdot 4!$`, R`$52!/4!$`, R`$49!$`, R`$48!$`], a: 0, exp: '4 as tek blok → 48 kart + 1 blok = 49 nesne: 49!. Blok içi 4!.', why: { 1: 'Bloğu da bir nesne olarak saymalısın: 48 + 1 = 49.', 3: 'Asların kendi aralarındaki sıralamasını (4!) unuttun.' } },
    { type: 'mc', topic: 'sayma', src: 'Defter örneği', q: '52\'lik desteden her sembolden (kupa, karo, maça, sinek) birer kart olacak şekilde 4 kart kaç farklı şekilde seçilir?',
      opts: [R`$13^4$`, R`$\binom{52}{4}$`, R`$4\cdot 13$`, R`$4^{13}$`, R`$\binom{13}{4}$`], a: 0, exp: 'Her sembolden 13 karttan 1: C(13, 1)⁴ = 13⁴.' },
    { type: 'mc', topic: 'sayma', q: '0! kaçtır?', opts: ['1', '0', 'Tanımsız', '−1', '10'], a: 0, exp: '0! = 1 olarak tanımlanır (C(n, n) = n! / (n! 0!) = 1 olması için).' }
  ],
  kume: [
    { type: 'mc', topic: 'kume', src: 'Defter', q: R`$A \cap B = \emptyset$ ise A ve B kümeleri için ne denir?`,
      opts: ['Ayrık kümeler', 'Bağımsız kümeler', 'Alt küme', 'Evrensel küme', 'Tümleyen kümeler'], a: 0, exp: 'Ortak elemanı olmayan kümeler ayrıktır.' },
    { type: 'mc', topic: 'kume', q: R`$S = \{1,2,3,4,5,6\}$ ve $A = \{1,2,3\}$ ise $\bar{A}$ hangisidir?`,
      opts: [R`$\{4,5,6\}$`, R`$\{1,2,3\}$`, R`$\emptyset$`, R`$\{1,2,3,4,5,6\}$`, R`$\{4,6\}$`], a: 0, exp: 'Tümleyen: S\'de olup A\'da olmayanlar.' },
    { type: 'mc', topic: 'kume', src: 'Defter', q: R`$A \cup B$ neyi gösterir?`,
      opts: ['A\'ya, B\'ye ya da ikisine birden ait elemanların kümesini', 'Sadece ortak elemanları', 'A\'da olup B\'de olmayanları', 'S dışındaki elemanları', 'Ne A\'da ne B\'de olanları'], a: 0, exp: 'Birleşim. Ortak elemanlar kesişimdir (A ∩ B).' },
    { type: 'fill', topic: 'kume', q: R`$S = \{1,2,\dots,10\}$, A = çift sayılar, B = 3'ün katları. $A \cup B$ kaç elemanlıdır?`, num: 7, check: () => new Set([2, 4, 6, 8, 10, 3, 6, 9]).size,
      exp: 'A = {2, 4, 6, 8, 10}, B = {3, 6, 9}; A ∪ B = {2, 3, 4, 6, 8, 9, 10} → 7 (6 bir kez sayılır).', whyFill: { '8': '6 hem A\'da hem B\'de; bir kez sayılır.' } }
  ],
  olasilik: [
    { type: 'fill', topic: 'olasilik', src: 'Defter örneği', q: 'Hilesiz iki zar atılıyor. Üste gelen sayıların toplamının 7 olma olasılığı kaçtır?', num: 1 / 6, show: '1/6 ≈ 0.1667', check: () => 6 / 36, exp: '6 durum / 36 = 1/6.' },
    { type: 'fill', topic: 'olasilik', src: 'Defter örneği', q: 'Bir iş yerindeki 120 çalışanın 50\'si 40 yaşın altında, 70\'i 40 yaşında ya da üstündedir. 40 yaş altındakilerin 20\'si, diğerlerinin 30\'u erkektir. Rastgele seçilen bir çalışanın 40 yaşın altında veya erkek olma olasılığı kaçtır?', num: 2 / 3, show: '2/3 ≈ 0.6667', check: () => 50 / 120 + 50 / 120 - 20 / 120,
      exp: '50/120 + 50/120 − 20/120 = 80/120 = 2/3.', whyFill: { '5/6': 'Kesişimi (40 yaş altı erkekler, 20) çıkarmayı unuttun.', '0.8333': 'Kesişimi (40 yaş altı erkekler, 20) çıkarmayı unuttun.' } },
    { type: 'fill', topic: 'olasilik', src: 'Defter sorusu', q: 'Bir yönetim kurulundaki iş için a, b, c, d adayları yarışıyor. a\'nın seçilme olasılığı b\'nin 2 katı, b\'ninki d\'nin 2 katı, b ile c\'ninki eşittir. c\'nin seçilme olasılığı kaçtır?', num: 2 / 9, show: '2/9 ≈ 0.2222', check: () => 2 / 9,
      exp: 'P(d) = p → 4p + 2p + 2p + p = 1 → p = 1/9 → P(c) = 2/9.', whyFill: { '1/9': 'Bu d\'nin olasılığı (p). c = 2p.' } },
    { type: 'fill', topic: 'olasilik', src: 'Defter sorusu', q: 'Bir torbada eşit sayıda kırmızı ve mavi top var. Rastgele seçilen 2 topun ikisinin de kırmızı olma olasılığı 0.24 ise torbada toplam kaç top vardır?', num: 26, check: () => { for (let x = 1; x < 100; x++) if (Math.abs(S.C(x, 2) / S.C(2 * x, 2) - 0.24) < 1e-12) return 2 * x; return -1; },
      exp: '(x − 1) / (2(2x − 1)) = 0.24 → x = 13 kırmızı → toplam 26.', whyFill: { '13': '13 sadece kırmızı top sayısı; mavi de 13 → toplam 26.' } },
    { type: 'fill', topic: 'olasilik', src: 'Defter örneği', q: '"KARADUT" kelimesinin harfleriyle yapılan dizilişlerde iki A harfinin yan yana gelmeme olasılığı kaçtır?', num: 5 / 7, show: '5/7 ≈ 0.7143', check: () => 1 - S.f(6) / (S.f(7) / S.f(2)),
      exp: 'Tüm: 7!/2! = 2520; yan yana: 6! = 720 → 2/7 → gelmeme 5/7.', whyFill: { '2/7': 'Bu yan yana gelme olasılığı; soru gelmemeyi soruyor.' } },
    { type: 'fill', topic: 'olasilik', src: 'Defter sorusu', q: 'Bir sınıfta 15 kız ve 20 erkek öğrenci var. Rastgele 6 öğrenci seçiliyor. Kız ve erkek öğrencilerin eşit sayıda (3 + 3) seçilme olasılığı kaçtır? (4 ondalık)', num: S_C(15, 3) * S_C(20, 3) / S_C(35, 6), show: '0.3196', check: () => S.C(15, 3) * S.C(20, 3) / S.C(35, 6),
      exp: 'C(15, 3) · C(20, 3) / C(35, 6) = 455 · 1140 / 1 623 160 ≈ 0.3196.' },
    { type: 'fill', topic: 'olasilik', src: 'Defter sorusu', q: 'Aynı sınıftan (15 kız, 20 erkek) 6 öğrenci seçiliyor. Seçilen kız sayısının erkek sayısından az olmama olasılığı kaçtır? (4 ondalık)', num: (S_C(15, 3) * S_C(20, 3) + S_C(15, 4) * S_C(20, 2) + S_C(15, 5) * S_C(20, 1) + S_C(15, 6)) / S_C(35, 6), show: '0.5194',
      check: () => [3, 4, 5, 6].reduce((t, k) => t + S.C(15, k) * S.C(20, 6 - k), 0) / S.C(35, 6),
      exp: 'Kız ≥ 3: (C(15,3)C(20,3) + C(15,4)C(20,2) + C(15,5)C(20,1) + C(15,6)) / C(35, 6) = 843 115 / 1 623 160 ≈ 0.5194.' },
    { type: 'mc', topic: 'olasilik', src: 'Defter', q: 'Olasılık fonksiyonunun değer kümesi hangisidir?',
      opts: ['[0, 1]', '(0, 1)', '[−1, 1]', '[0, ∞)', 'Tüm reel sayılar'], a: 0, exp: 'Olasılık 0 ile 1 dahil arasındadır; negatif ya da 1\'den büyük olamaz.', why: { 1: 'İmkânsız olayın olasılığı 0, kesin olayın 1; uçlar dahildir.' } },
    { type: 'mc', topic: 'olasilik', q: 'Hilesiz bir para 4 kez atılıyor. Örnek uzay kaç elemanlıdır?',
      opts: ['16', '8', '4', '24', '32'], a: 0, check: () => 2 ** 4, exp: '2⁴ = 16.', why: { 3: '4! sıralama sayısıdır; burada her atış 2 sonuçlu.' } },
    { type: 'mc', topic: 'olasilik', q: 'P(A) = 0.35 ise A\'nın tümleyeninin olasılığı P(Ā) kaçtır?',
      opts: ['0.65', '0.35', '1.35', '0', '0.1225'], a: 0, check: () => 1 - 0.35, exp: 'P(Ā) = 1 − 0.35 = 0.65.' },
    { type: 'fill', topic: 'olasilik', q: 'Bir sınıftaki 10 öğrencinin boyları (cm): 172, 188, 192, 168, 176, 167, 181, 169, 174, 186. Rastgele seçilen bir öğrencinin 175 cm\'den uzun olma olasılığı kaçtır?', num: 0.5, check: () => [172, 188, 192, 168, 176, 167, 181, 169, 174, 186].filter(x => x > 175).length / 10,
      exp: '175\'ten uzun: 188, 192, 176, 181, 186 → 5 / 10 = 0.5.' }
  ],
  kosullu: [
    { type: 'fill', topic: 'kosullu', src: 'Defter örneği', q: 'İki zar atılıyor. Üstteki sayıların toplamının 6\'dan büyük olduğu biliniyorsa toplamın çift sayı olma olasılığı kaçtır?', num: 3 / 7, show: '3/7 ≈ 0.4286', check: () => (9 / 36) / (21 / 36),
      exp: 'P(B) = 21/36, P(A ∩ B) = 9/36 (toplam 8, 10, 12) → 9/21 = 3/7.', whyFill: { '0.25': 'Bu P(A ∩ B) = 9/36. Koşul olan P(B)\'ye bölmelisin.', '9/36': 'Bu P(A ∩ B). Koşul olan P(B) = 21/36\'ya bölmelisin.' } },
    { type: 'fill', topic: 'kosullu', src: 'Defter örneği', q: 'Bir kutuda 5 arızalı, 10 kısmi arızalı ve 25 sağlam elektronik kart var. Rastgele seçilen kartın hemen bozulmadığı biliniyorsa sağlam olma olasılığı kaçtır?', num: 5 / 7, show: '5/7 ≈ 0.7143', check: () => (25 / 40) / (35 / 40),
      exp: 'Hemen bozulmayan = kısmi arızalı + sağlam = 35 → 25 / 35 = 5/7.', whyFill: { '0.625': 'Bu koşulsuz P(sağlam) = 25/40. Bilgi örnek uzayı 35 karta daraltır.' } },
    { type: 'fill', topic: 'kosullu', src: 'Defter örneği', q: 'Bir mağazaya gelen oyuncak kutularının 10\'u kusurlu, 50\'si kusursuz. Rastgele art arda 2 kutu alınıyor (iadesiz). İkisinin de kusurlu olma olasılığı kaçtır?', num: 3 / 118, show: '3/118 ≈ 0.0254', check: () => (10 / 60) * (9 / 59),
      exp: '(10/60) · (9/59) = 3/118 ≈ 0.0254.' },
    { type: 'fill', topic: 'kosullu', src: 'Defter örneği', q: '15 tanesi kusurlu olan 240 televizyon parçasından oluşan bir siparişten rastgele 2 parça peş peşe seçiliyor. İkisinin de kusurlu olma olasılığı kaçtır?', num: 7 / 1912, show: '7/1912 ≈ 0.00366', check: () => (15 / 240) * (14 / 239),
      exp: '(15/240) · (14/239) = 7/1912 ≈ 0.00366.' },
    { type: 'fill', topic: 'kosullu', src: 'Defter örneği', q: 'Bir çalışan, şirketinin küçük bir şehirde şube açma olasılığını %30 görüyor. Şube açılırsa kendisinin müdür atanma olasılığı %60. Bu çalışanın yeni şubeye müdür olma olasılığı kaçtır?', num: 0.18, check: () => 0.3 * 0.6,
      exp: 'P(A ∩ B) = P(A) · P(B | A) = 0.30 · 0.60 = 0.18.' },
    { type: 'fill', topic: 'kosullu', src: 'Defter sorusu', q: 'Bir A olayının olasılığı 0.60. A meydana gelmediğinde B\'nin meydana gelme olasılığı 0.10. A ve B\'den en az birinin meydana gelme olasılığı kaçtır?', num: 0.64, check: () => 0.6 + 0.1 * 0.4,
      exp: 'P(Ā ∩ B) = 0.10 · 0.40 = 0.04 → P(A ∪ B) = 0.60 + 0.04 = 0.64.', whyFill: { '0.7': 'P(B | Ā) = 0.10 doğrudan P(B) değil; önce P(Ā ∩ B) = 0.10 · 0.40 bulunur.' } },
    { type: 'mc', topic: 'kosullu', src: 'Defter örneği', q: '52 kartlık desteden rastgele bir kart seçiliyor. Seçilen kart kırmızı ise kupa olma olasılığı kaçtır?',
      opts: [fr(1, 2), fr(1, 4), fr(1, 13), fr(1, 26), fr(3, 4)], a: 0, check: () => (13 / 52) / (26 / 52), exp: '26 kırmızı kartın 13\'ü kupa → 13/26 = 1/2.', why: { 1: '1/4 koşulsuz P(kupa). Kırmızı bilgisi örnek uzayı 26 karta daraltır.' } },
    { type: 'mc', topic: 'kosullu', src: 'Defter örneği', q: '52\'lik desteden iadesiz olarak peş peşe iki kart çekiliyor. İkisinin de as olma olasılığı hangisidir?',
      opts: [R`$\frac{4}{52}\cdot\frac{3}{51}$`, R`$\frac{4}{52}\cdot\frac{4}{52}$`, R`$\frac{4}{52}+\frac{3}{51}$`, R`$\frac{4}{52}\cdot\frac{3}{52}$`, R`$\frac{2}{52}$`], a: 0,
      exp: 'İlk çekilişte 4/52; as geri konmadığı için ikincide 3 as, 51 kart kalır.', why: { 1: 'Bu iadeli çekiliş (bağımsız).', 2: '"Ve" için çarpılır, toplanmaz.', 3: 'Kart geri konmadı; payda da 51 olmalı.' } }
  ],
  bagimsiz: [
    { type: 'fill', topic: 'bagimsiz', src: 'Defter örneği', q: 'Ali\'nin bir sınavdan 75\'in üzerinde not alma olasılığı %90, Mehmet\'in %60\'tır (birbirinden bağımsız). İkisinin de 75\'in üzerinde not alma olasılığı kaçtır?', num: 0.54, check: () => 0.9 * 0.6, exp: '0.90 · 0.60 = 0.54.', whyFill: { '1.5': 'Topladın; "ikisi de" için bağımsız olasılıklar çarpılır.' } },
    { type: 'fill', topic: 'bagimsiz', src: 'Defter sorusu', q: 'Bağımsız A ve B olayları için P(A) = 1/3 ve P(A ∪ B) = 1/2. P(B) kaçtır?', num: 0.25, show: '1/4 = 0.25', check: () => (1 / 2 - 1 / 3) / (1 - 1 / 3),
      exp: '1/2 = 1/3 + P(B) − (1/3)P(B) → 1/6 = (2/3)P(B) → P(B) = 1/4.', whyFill: { '1/6': 'Bağımsızlarda kesişim (1/3)P(B), sıfır değil.' } },
    { type: 'mc', topic: 'bagimsiz', src: 'Defter sorusu', q: 'A ve B ayrık olaylar ve P(B) > 0 ise P(A | B) kaçtır?',
      opts: ['0', 'P(A)', 'P(A) · P(B)', '1', 'P(B)'], a: 0, exp: 'Ayrıkta P(A ∩ B) = 0 → P(A | B) = 0 / P(B) = 0.', why: { 1: 'P(A | B) = P(A) bağımsız olaylar içindir.' } },
    { type: 'mc', topic: 'bagimsiz', src: 'Defter örneği', q: 'Hilesiz para 3 kez atılıyor. A: ilk iki atışın ikisi de yazı. B: üçüncü atış tura. A ve B için hangisi doğrudur?',
      opts: ['Bağımsızdır, çünkü P(A ∩ B) = 1/8 = P(A) · P(B)', 'Ayrıktır, çünkü ortak sonuçları yoktur', 'Bağımsız değildir, çünkü P(A ∩ B) = 1/4', 'Bağımsız değildir, çünkü P(A) ≠ P(B)', 'Ayrık ve bağımsızdır'], a: 0,
      exp: 'A = {YYY, YYT} → 1/4; B → 1/2; A ∩ B = {YYT} → 1/8 = 1/4 · 1/2 → bağımsız.', why: { 1: 'YYT hem A\'da hem B\'de.', 3: 'Bağımsızlık için olasılıkların eşit olması gerekmez.' } },
    { type: 'mc', topic: 'bagimsiz', src: 'Defter örneği', q: 'Hilesiz para 3 kez atılıyor. B: üçüncü atış tura. C: üç atışta tam iki tura. B ve C için hangisi doğrudur?',
      opts: [R`Bağımsız değildir: $P(B\cap C) = \frac{2}{8} \ne \frac{4}{8}\cdot\frac{3}{8}$`, R`Bağımsızdır: $P(B\cap C) = P(B)P(C)$`, 'Ayrıktır', R`Bağımsız değildir: $P(B\cap C) = 0$`, 'Hiçbiri'], a: 0,
      exp: 'C = {YTT, TYT, TTY}, B ∩ C = {YTT, TYT} → 2/8 = 1/4; P(B)P(C) = 1/2 · 3/8 = 3/16 → eşit değil.' },
    { type: 'mc', topic: 'bagimsiz', q: 'Olasılıkları sıfırdan büyük iki ayrık olay için hangisi doğrudur?',
      opts: ['Bağımsız olamazlar', 'Her zaman bağımsızdırlar', 'P(A ∩ B) = P(A) · P(B)', 'P(A ∪ B) = P(A) · P(B)', 'P(A | B) = P(A)'], a: 0,
      exp: 'Ayrıkta P(A ∩ B) = 0, ama P(A)P(B) > 0 → bağımsızlık şartı sağlanmaz. Biri olursa diğeri kesin olmaz; yani birbirini etkiler.' },
    { type: 'fill', topic: 'bagimsiz', q: 'Bir atıcının hedefi vurma olasılığı 0.7. Bağımsız iki atışta en az bir kez vurma olasılığı kaçtır?', num: 0.91, check: () => 1 - 0.3 * 0.3,
      exp: 'Hiç vuramama: 0.3 · 0.3 = 0.09 → en az bir: 1 − 0.09 = 0.91.', whyFill: { '0.49': 'Bu iki atışın ikisinde de vurma olasılığı.', '1.4': 'Olasılıklar toplanmaz; 1\'i geçemez.' } }
  ],
  bayes: [
    { type: 'fill', topic: 'bayes', src: 'Defter örneği', q: 'Cıvata üreten bir fabrikada üretimin %30\'u A, %30\'u B, %40\'ı C makinesinde yapılıyor. Kusurlu oranları sırasıyla %1, %3, %2. Rastgele seçilen bir cıvatanın kusurlu olma olasılığı kaçtır?', num: 0.02, check: () => 0.3 * 0.01 + 0.3 * 0.03 + 0.4 * 0.02,
      exp: 'Toplam olasılık: 0.003 + 0.009 + 0.008 = 0.020.', whyFill: { '0.06': 'Oranları düz topladın. Her oranı makinenin üretim payıyla çarpıp topla.', '0.02': '' } },
    { type: 'fill', topic: 'bayes', src: 'Defter örneği', q: 'Aynı fabrikada (A %30, B %30, C %40; kusur %1, %3, %2) seçilen cıvata kusurlu ise A makinesinde üretilmiş olma olasılığı kaçtır?', num: 0.15, check: () => (0.3 * 0.01) / (0.3 * 0.01 + 0.3 * 0.03 + 0.4 * 0.02),
      exp: 'P(A | K) = 0.003 / 0.020 = 0.15.', whyFill: { '0.01': 'Bu P(K | A): A\'nın kusur oranı. İstenen ters yön P(A | K).', '0.003': 'Bu dalın olasılığı P(A ∩ K). P(K) = 0.02\'ye bölmelisin.', '0.3': 'Bu A\'nın üretim payı; kusurlu bilgisini kullanmadın.' } },
    { type: 'mc', topic: 'bayes', src: 'Defter örneği', q: 'Aynı fabrikada (A %30, B %30, C %40; kusur %1, %3, %2) kusurlu bir cıvata bulundu. En büyük olasılıkla hangi makineden gelmiştir?',
      opts: [R`B makinesinden, $P(B\mid K) = 0.45$`, 'C makinesinden, çünkü üretimin en büyük payı onda', R`A makinesinden, $P(A\mid K) = 0.15$`, 'Üçü eşit olasılıklı', R`C makinesinden, $P(C\mid K) = 0.45$`], a: 0, check: null,
      exp: 'P(B | K) = 0.009 / 0.02 = 0.45, P(C | K) = 0.008 / 0.02 = 0.40, P(A | K) = 0.15. Kusur oranı yüksek olan B öne geçer.',
      why: { 1: 'C\'nin üretim payı büyük ama kusur oranı düşük: P(C | K) = 0.40 < 0.45.', 4: 'P(C | K) = 0.008 / 0.02 = 0.40.' } },
    { type: 'mc', topic: 'bayes', q: 'Bir fabrikada A, B, C makineleri var. Aşağıdaki sorulardan hangisi Bayes teoremiyle çözülür?',
      opts: ['Seçilen ürün kusurluysa A makinesinde üretilmiş olma olasılığı', 'A makinesinde üretilen bir ürünün kusurlu olma olasılığı', 'Rastgele seçilen bir ürünün kusurlu olma olasılığı', 'Seçilen iki ürünün ikisinin de kusurlu olma olasılığı', 'Ürünün A veya B makinesinde üretilmiş olma olasılığı'], a: 0,
      exp: 'Sonuçtan (kusurlu) sebebe (makine) gidilen ters yönlü koşullu olasılık → Bayes.',
      why: { 1: 'Bu P(K | A), soruda doğrudan verilen kusur oranı.', 2: 'Bu toplam olasılık kanunuyla bulunur (Bayes\'in paydası).', 3: 'Bu çarpım kuralıyla bulunur.', 4: 'Bu toplama ile bulunur (ayrık olaylar).' } },
    { type: 'mc', topic: 'bayes', q: R`$P(K\mid A) = 0.01$, $P(K\mid B) = 0.03$, $P(K\mid C) = 0.02$ ve üretim payları $0.30, 0.30, 0.40$ verilmiş. Bir öğrenci $P(K) = 0.01 + 0.03 + 0.02 = 0.06$ buldu. Hatası nedir?`,
      opts: ['Her oran makinenin üretim payıyla çarpılıp öyle toplanmalıydı', 'Oranlar toplanmak yerine çarpılmalıydı', 'Sonuç 3\'e bölünmeliydi', 'Hata yok, P(K) = 0.06', 'Sonuç 1\'den çıkarılmalıydı'], a: 0,
      exp: 'Toplam olasılık: P(K) = Σ P(K | Mᵢ) P(Mᵢ) = 0.003 + 0.009 + 0.008 = 0.02.',
      why: { 2: '3\'e bölmek her makinenin eşit üretim yaptığını varsayar; burada paylar 0.30, 0.30, 0.40.' } },
    { type: 'fill', topic: 'bayes', q: 'Bir hastalık toplumda %1 oranında. Test hastaların %95\'inde pozitif, sağlıklıların %10\'unda yanlışlıkla pozitif çıkıyor. Testi pozitif çıkan birinin gerçekten hasta olma olasılığı kaçtır? (4 ondalık)', num: 0.0095 / 0.1085, show: '0.0876', check: () => (0.01 * 0.95) / (0.01 * 0.95 + 0.99 * 0.1),
      exp: 'P(+) = 0.0095 + 0.099 = 0.1085 → P(H | +) = 0.0095 / 0.1085 ≈ 0.0876.', whyFill: { '0.95': 'Bu P(+ | H). İstenen ters yön P(H | +).', '0.0095': 'Bu dalın olasılığı P(H ∩ +). P(+) = 0.1085\'e bölmelisin.' } },
    { type: 'fill', topic: 'bayes', q: 'P(A) = 0.3, P(B | A) = 0.5 ve P(B) = 0.25 ise P(A | B) kaçtır?', num: 0.6, check: () => (0.5 * 0.3) / 0.25,
      exp: 'P(A | B) = P(B | A) P(A) / P(B) = 0.15 / 0.25 = 0.6.', whyFill: { '0.15': 'Bu P(A ∩ B). P(B)\'ye bölmelisin.' } },
    { type: 'mc', topic: 'bayes', q: R`$B_1, \dots, B_k$ bir parçalanış ve A bir olay ise aşağıdakilerden hangisinin toplamı **her zaman** 1'dir?`,
      opts: [R`$P(B_1) + P(B_2) + \dots + P(B_k)$`, R`$P(A\mid B_1) + \dots + P(A\mid B_k)$`, R`$P(A\cap B_1) + \dots + P(A\cap B_k)$`, R`$P(A) + P(B_1)$`, R`$P(A\mid B_1) + P(B_1)$`], a: 0,
      exp: 'Parçalanış S\'yi ayrık parçalara böler → olasılıklarının toplamı P(S) = 1.',
      why: { 1: 'Kusur oranları gibi; toplamı 1 olmak zorunda değil (0.01 + 0.03 + 0.02 = 0.06).', 2: 'Bu toplam P(A)\'yı verir, 1\'i değil.' } },
    { type: 'prob', topic: 'bayes', title: 'Problem: zarla torba seçme',
      q: 'I. torbada 3 kırmızı 2 mavi, II. torbada 1 kırmızı 4 mavi top var. Bir zar atılıyor; 1 veya 2 gelirse I. torbadan, aksi halde II. torbadan bir top çekiliyor.',
      steps: [
        { label: 'a) I. torbanın seçilme olasılığı P(I)', num: 1 / 3, show: '1/3 ≈ 0.3333', exp: 'Zarda 1 veya 2: 2/6 = 1/3', check: () => 2 / 6 },
        { label: 'b) I. torbadan kırmızı çekme olasılığı P(K | I)', num: 0.6, exp: '3/5 = 0.6', check: () => 3 / 5 },
        { label: 'c) Kırmızı top çekme olasılığı P(K)', num: 1 / 3, show: '1/3 ≈ 0.3333', exp: '(1/3)(3/5) + (2/3)(1/5) = 3/15 + 2/15 = 5/15 = 1/3', check: () => (1 / 3) * (3 / 5) + (2 / 3) * (1 / 5) },
        { label: 'd) Top kırmızıysa I. torbadan çekilmiş olma olasılığı', num: 0.6, exp: '(3/15) / (5/15) = 3/5 = 0.6', check: () => ((1 / 3) * (3 / 5)) / ((1 / 3) * (3 / 5) + (2 / 3) * (1 / 5)) }
      ],
      note: 'b ve d şıklarının ikisi de 0.6 çıktı ama anlamları farklı: b = P(K | I), d = P(I | K). Bu sayılarda eşit çıkmaları tesadüf.' },
    { type: 'prob', topic: 'bayes', src: 'Defter örneği', title: 'Problem: cıvata fabrikası (tam çözüm)',
      q: 'Cıvata üreten bir fabrikada üretimin %30\'u A, %30\'u B, %40\'ı C makinesinde yapılıyor. Kusurlu üretim oranları sırasıyla %1, %3 ve %2. Rastgele bir cıvata seçiliyor.',
      steps: [
        { label: 'a) P(K)', num: 0.02, exp: '0.003 + 0.009 + 0.008 = 0.02', check: () => 0.3 * 0.01 + 0.3 * 0.03 + 0.4 * 0.02 },
        { label: 'b) P(A | K)', num: 0.15, exp: '0.003 / 0.02 = 0.15', check: () => 0.003 / 0.02 },
        { label: 'c) P(B | K)', num: 0.45, exp: '0.009 / 0.02 = 0.45', check: () => 0.009 / 0.02 },
        { label: 'd) P(C | K)', num: 0.4, exp: '0.008 / 0.02 = 0.40', check: () => 0.008 / 0.02 }
      ],
      note: 'Kontrol: 0.15 + 0.45 + 0.40 = 1.' }
  ]
};

/* Sadece num değerlerini hesaplamak için (kombinasyon). */
function S_C(n, r) { let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return Math.round(x); }
})();
