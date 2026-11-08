/* İstatistik ve Olasılık: ders ayarları ve konu özetleri. Kaynak: ders defteri + hocanın "Sınavda Çıkacak Sorular" sayfası. */
(function () {
const R = String.raw;

window.COURSE = {
  id: 'istatistik', lang: 'none',
  title: 'İstatistik ve Olasılık',
  storeKey: 'istvize-best', seenKey: 'istvize-seen',
  reviewLead: 'Defterdeki konuların kısa özeti. Önce tuzak listesine bak, sonra konuları sırayla geç. ★ işaretli konular hocanın "sınavda çıkacak" dediği soru tiplerinden.',
  testLead: 'Önce hocanın "sınavda çıkacak" dediği 3 soruyu çöz, sonra deneme vizelerine geç. Konu testleri anında kontrol eder.',
  formatTitle: 'Vize formatı (varsayım)',
  formatNote: 'Hoca kesin format vermedi. "Sınavda çıkacak sorular" klasik (yazılı, çözümlü) sorular olduğu için vizenin de klasik olduğu varsayıldı. Sitedeki denemeler pratik içindir: test + kısa cevap + çok adımlı problem, toplam 100 puan. Deneme 4 tamamen hocanın tarzında klasik problemlerden oluşur.',
  hocaLink: { href: '#test/hoca', text: 'Hocanın sorularını çöz →' },
  points: { mc: 4, fill: 5, prob: 15 },
  randomExam: { mc: 10, fill: 6, prob: 2 },
  randomDesc: 'Tüm soru bankasından konulara yayılmış 18 soru. En az gördüğün sorular öne alınır.'
};

window.EXAM_FORMAT = [
  { range: 'Soru 1–10', what: 'Çoktan seçmeli', big: '40', small: 'puan' },
  { range: 'Soru 11–16', what: 'Sayısal / kısa cevap', big: '30', small: 'puan' },
  { range: 'Soru 17–18', what: 'Çok adımlı problem', big: '30', small: 'puan' }
];

window.TRAPS = [
  { t: R`"Rastgele seçilen" birimler = **örneklem** → varyansta $n-1$'e böl. Tüm yığın verildiyse $N$'e böl.`, topic: 'varyans' },
  { t: 'Medyandan önce **sırala**. Veri sayısı çiftse ortadaki iki değerin ortalamasını al.', topic: 'medyan-mod' },
  { t: R`$IQR = Q_3 - Q_1$; çeyrek ayrılış bunun **yarısı**. $Q_1$ alt yarının, $Q_3$ üst yarının medyanı.`, topic: 'yayilim' },
  { t: 'Mod nitel veride de bulunur; ortalama ve medyan bulunmaz.', topic: 'medyan-mod' },
  { t: 'Veride aşırı uç (aykırı) değer varsa ortalama değil **medyan** daha iyi temsil eder.', topic: 'medyan-mod' },
  { t: R`Her değere sabit eklemek **varyansı değiştirmez**; $c$ ile çarpmak varyansı $c^2$ ile çarpar.`, topic: 'varyans' },
  { t: R`Birleşik ortalamada ortalamaların ortalaması alınmaz: toplamlar toplanır, $\frac{n_A\bar{x}_A + n_B\bar{x}_B}{n_A+n_B}$.`, topic: 'ortalama' },
  { t: 'Ortalamalar farklıysa homojenliği varyansla değil **değişim katsayısıyla** karşılaştır.', topic: 'varyans' },
  { t: 'Sıra önemliyse permütasyon, sadece seçim varsa kombinasyon.', topic: 'sayma' },
  { t: R`Olasılık her zaman $0 \le P(A) \le 1$. Negatif ya da 1'den büyük çıktıysa hesapta hata var.`, topic: 'olasilik' },
  { t: R`İadesiz çekilişte ikinci kesrin payı da paydası da azalır: $\frac{4}{52}\cdot\frac{3}{51}$.`, topic: 'kosullu' },
  { t: R`Ayrık ≠ bağımsız. Ayrıkta $P(A\cap B)=0$, bağımsızda $P(A\cap B)=P(A)P(B)$.`, topic: 'bagimsiz' },
  { t: R`$P(A\mid B) \ne P(B\mid A)$. Bayes ikisi arasında geçiş yapar.`, topic: 'bayes' },
  { t: R`Bayes'te payda toplam olasılıktır: $\sum P(A\mid B_i)P(B_i)$. Oranları düz toplama.`, topic: 'bayes' }
];

window.TOPICS = [
/* ------------------------------------------------------------------ */
{
  id: 'temel', title: 'Temel kavramlar', src: 'Defter: Temel Kavramlar',
  blocks: [
    { t: 'p', text: '**İstatistik**: sayısal verilerin toplanması, düzenlenmesi, analiz edilmesi ve yorumlanmasıdır.' },
    { t: 'table', head: ['Kavram', 'Tanım'], rows: [
      ['Deneysel birim', 'Hakkında ölçüm ya da gözlem yaparak bilgi elde ettiğimiz en küçük öğe (kişi, eşya). Sayılabilir veya ölçülebilir olmalı.'],
      ['Değişken', 'Birimden birime farklı değer alabilen nicelik ya da nitelik.'],
      ['Yığın (evren, ana kitle, kitle)', 'Belirli özellikteki birimlerin tümünün oluşturduğu topluluk.'],
      ['Tam sayım', 'Yığındaki birimlerin **tamamından** veri toplamak.'],
      ['Parametre', R`Tam sayımla yığından hesaplanan özet değer ($\mu$, $\sigma^2$). Yığının tanımlayıcı sayısal ölçüsü.`],
      ['Örneklem', 'Yığından seçilen ve yığını temsil ettiği düşünülen birimler.'],
      ['Örnekleme', 'Örneklemden veri toplanması.'],
      ['İstatistik', R`Rastgele seçilen örneklemden hesaplanan değer ($\bar{x}$, $s^2$). Örneklem değişince değişir; yani istatistikler de birer değişkendir.`]
    ] },
    { t: 'h', text: 'Değişken türleri' },
    { t: 'ul', items: [
      '**Nitel (kalitatif, sözel)**: ölçü birimiyle ölçülemez, sayısal anlam taşımaz. Ör: cinsiyet, kan grubu, kanser türü.',
      '**Nicel (kantitatif, sayısal)**: ölçü birimiyle ölçülür, sayıyla ifade edilir. İkiye ayrılır:',
      '— **Sürekli**: ardışık iki değer arasında kuramsal olarak sonsuz sayıda değer alabilir. Ör: boy, ağırlık, süre.',
      '— **Kesikli**: ardışık iki değer arasında başka değer alamaz. Ör: çocuk sayısı, kusurlu ürün sayısı.'
    ] },
    { t: 'p', text: '**Örneklemeyi zorunlu kılan nedenler**: maliyet, zaman, doğru veri elde etme güçlüğü, incelenecek birimlerin fiziksel zarara uğraması (ör. ampul ömrünü ölçmek için ampulü yakmak gerekir).' },
    { t: 'p', text: '**Betimsel istatistikler**: verileri bir sayıyla özetlemek için kullanılır. Üç grup: merkezi eğilim ölçüleri, yayılım (değişkenlik) ölçüleri, ilişki katsayısı.' },
    { t: 'trap', text: R`Yığından hesaplanan = **parametre** ($\mu$, $\sigma$). Örneklemden hesaplanan = **istatistik** ($\bar{x}$, $s$). Örneklemden bulunan ortalama, yığın ortalamasının sadece bir **tahminidir**.` }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'olcme', title: 'Ölçme düzeyleri', src: 'Defter: Değişkenleri ölçme düzeyi',
  blocks: [
    { t: 'p', text: 'Ölçme düzeyi, bir değişkenin değerleriyle hangi işlemlerin anlamlı olduğunu belirler. Düzey yükseldikçe yapılabilecek işlem artar.' },
    { t: 'table', head: ['Düzey', 'Sıralama', 'Farklar anlamlı mı?', 'Sıfır', 'Örnek'], rows: [
      ['1. Sınıflama', 'Yok', 'Hayır', '—', 'Cinsiyet, kan grubu, doğum yeri'],
      ['2. Sıralama', 'Var', 'Hayır', '—', 'Eğitim düzeyi, yarış derecesi, memnuniyet (az/orta/çok)'],
      ['3. Eşit aralıklı', 'Var', 'Evet', 'Yokluk **değil**', 'Sıcaklık (°C), takvim yılı'],
      ['4. Oranlama', 'Var', 'Evet', 'Mutlak yokluk', 'Boy, ağırlık, gelir, süre']
    ] },
    { t: 'ul', items: [
      '**Sınıflama**: değerler arasındaki farklar matematiksel olarak anlamsız; büyüklük–küçüklük sıralaması yok.',
      '**Sıralama**: farklar matematiksel olarak anlamlı değil, ama değerler sıralanabilir.',
      '**Eşit aralıklı**: farklar anlamlı; "sıfır" mutlak yokluğu ifade **etmez** (0 °C "sıcaklık yok" demek değil).',
      '**Oranlama**: farklar anlamlı; "sıfır" mutlak yokluğu ifade **eder**. Ölçü birimi değişse de (kg → g) değerler arasındaki oran korunur.'
    ] },
    { t: 'tip', text: 'Aritmetik ortalama için değişken nicel olmalı, yani ölçme düzeyi **eşit aralıklı ya da oranlama** olmalı. Mod her düzeyde bulunur.' },
    { t: 'trap', text: 'Sıcaklık (°C) oranlama değil **eşit aralıklıdır**: 20 °C, 10 °C\'nin "iki katı sıcak" değildir çünkü 0 °C yokluk değildir.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'ortalama', title: 'Aritmetik ortalama ve birleşik ortalama', star: 'Hocanın Soru 3', src: 'Defter: Aritmetik ortalama · Hocanın sorusu 3',
  blocks: [
    { t: 'p', text: 'Değerler toplamının birim sayısına bölümüdür. Değişken nicel olmalı (eşit aralıklı ya da oranlama).' },
    { t: 'f', cap: 'Yığın ve örneklem ortalaması', tex: R`\mu = \frac{1}{N}\sum_{i=1}^{N} x_i \qquad\qquad \bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i` },
    { t: 'ul', items: [
      R`$x_i$: $i$'inci gözlemin değeri · $N$: yığındaki birim sayısı · $n$: örneklemdeki birim sayısı`,
      R`$\mu$ (mü): yığının ortalaması · $\bar{x}$: örneklemin ortalaması · sabit için $\sum_{i=1}^{N} a = Na$`
    ] },
    { t: 'ex', head: 'Örnek (defter)', q: 'Bir ilacın etki süresi için rastgele seçilen 8 hastada süreler (saat): 3, 3.2, 3.6, 2.8, 3.4, 4, 3.7, 4.3. Ortalama etki süresi?',
      steps: [R`$\sum x_i = 3 + 3.2 + 3.6 + 2.8 + 3.4 + 4 + 3.7 + 4.3 = 28$`, R`$\bar{x} = \frac{28}{8} = 3.5$ saat`],
      a: 'Cevap: 3.5 saat. Bu bir örneklem ortalamasıdır; yığın ortalamasının tahminidir.' },
    { t: 'h', text: 'Özellikler' },
    { t: 'ul', items: [
      'Merkezi eğilim ölçüleri arasında **hassasiyeti en yüksek** olandır (her değer hesaba girer).',
      R`Değerlerin ortalamadan farklarının toplamı **sıfırdır**: $\sum (x_i-\bar{x}) = 0$.`,
      R`Farkların kareleri toplamı **minimumdur**: $\sum (x_i-\bar{x})^2$ başka hiçbir sayı için daha küçük olmaz.`,
      R`Her değere $c$ eklenirse (çıkarılırsa) ortalama da $c$ artar (azalır).`,
      R`Her değer $c$ ile çarpılırsa (bölünürse) ortalama da $c$ ile çarpılır (bölünür).`
    ] },
    { t: 'ex', head: 'Örnek: kısa yol', q: '301, 302, 303, 304, 305 ve 1300, 1400, 1500, 1600, 1700 verilerinin ortalamaları?',
      steps: ['Her değerden 300 çıkar: 1, 2, 3, 4, 5 → ortalama 3 → asıl ortalama 3 + 300 = **303**.', 'Her değeri 100\'e böl: 13, 14, 15, 16, 17 → ortalama 15 → asıl ortalama 15 × 100 = **1500**.'] },
    { t: 'h', text: 'Birleşik (iki grubun ortak) ortalaması' },
    { t: 'f', tex: R`\bar{x}_{\text{genel}} = \frac{n_A\,\bar{x}_A + n_B\,\bar{x}_B}{n_A + n_B} \qquad\Longrightarrow\qquad \text{toplam} = n \times \bar{x}` },
    { t: 'ex', head: 'Hocanın Soru 3', q: 'Bir lisenin 11A ve 11B şubelerindeki toplam 55 öğrenci aynı matematik sınavına girmiştir. Tüm öğrencilerin not ortalaması 67, 11A şubesindeki 30 öğrencinin ortalaması 60 ise 11B\'deki öğrencilerin ortalaması kaçtır?',
      steps: [R`11B öğrenci sayısı: $n_B = 55 - 30 = 25$`, R`Tüm öğrencilerin toplam puanı: $55 \times 67 = 3685$`, R`11A toplam puanı: $30 \times 60 = 1800$`, R`11B toplam puanı: $3685 - 1800 = 1885$`, R`11B ortalaması: $\bar{x}_B = \frac{1885}{25} = 75.4$`],
      a: 'Cevap: 75.4' },
    { t: 'trap', text: R`Ortalamaların ortalaması alınmaz: $\frac{60 + 75.4}{2} = 67.7 \ne 67$. Gruplar farklı büyüklükte olduğu için **toplamlar** üzerinden git.` },
    { t: 'tip', text: 'Sınavda adımlar: toplam puan = kişi sayısı × ortalama → bilinen grubun toplamını çıkar → kalan toplamı kalan kişi sayısına böl.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'medyan-mod', title: 'Medyan ve mod', star: 'Hocanın Soru 1', src: 'Defter: Medyan, Mod · Hocanın sorusu 1 (a, b)',
  blocks: [
    { t: 'p', text: R`**Medyan (ortanca)**: değerler küçükten büyüğe sıralandığında ortadaki değerdir. Sıralı değerler $x_{(1)} \le x_{(2)} \le \dots \le x_{(N)}$ ile gösterilir ($x_{(1)}$ en küçük, $x_{(N)}$ en büyük).` },
    { t: 'f', cap: 'N tek ise', tex: R`\text{Med}(x) = Q_2 = x_{\left(\frac{N+1}{2}\right)}` },
    { t: 'f', cap: 'N çift ise', tex: R`\text{Med}(x) = Q_2 = \frac{x_{\left(\frac{N}{2}\right)} + x_{\left(\frac{N}{2}+1\right)}}{2}` },
    { t: 'ex', head: 'Örnek (defter)', q: 'Yüksek lisansa kabul edilen 9 öğrencinin not ortalamaları: 3.46, 3.37, 3.72, 3.80, 3.20, 3.49, 3.90, 3.61, 3.66. Medyan?',
      steps: ['Sırala: 3.20, 3.37, 3.46, 3.49, **3.61**, 3.66, 3.72, 3.80, 3.90', R`$N = 9$ tek → $x_{(5)} = 3.61$`, R`3.90 olmasaydı ($N = 8$, çift): $\frac{x_{(4)} + x_{(5)}}{2} = \frac{3.49 + 3.61}{2} = 3.55$`],
      a: 'Cevap: 3.61 (8 değerle 3.55)' },
    { t: 'ul', items: [
      'Medyan sadece ortadaki değer(ler)den hesaplanır, uç değerlerden etkilenmez.',
      'Veride verinin geneline göre **çok küçük ya da çok büyük** değerler varsa medyan, ortalamadan daha iyi temsil eder (daha uygun merkezi eğilim ölçüsüdür).'
    ] },
    { t: 'p', text: '**Mod (tepe değer)**: en çok tekrar eden değerdir. Ortalama ve medyan sadece nicel değişkenler için hesaplanır; **mod hem nicel hem nitel** değişkenler için bulunur.' },
    { t: 'ex', head: 'Örnek: nitel veride mod', q: 'Bir klinikte hastaların kanser türleri: akciğer, göğüs, akciğer, kolon, göğüs, akciğer, akciğer, kolon, göğüs, akciğer.',
      steps: ['Say: akciğer 5, göğüs 3, kolon 2'], a: 'Mod = akciğer' },
    { t: 'ex', head: 'Hocanın Soru 1 (a, b)', q: '30 öğrencinin notları (sıralı): 42, 48, 50, 52, 53, 53, 54, 56, 58, 60, 62, 62, 62, 64, 66, 68, 69, 70, 70, 71, 71, 72, 73, 78, 80, 82, 85, 87, 92, 95. Mod ve medyan?',
      steps: ['Tekrar edenler: 53 (2 kez), **62 (3 kez)**, 70 (2 kez), 71 (2 kez) → mod = 62', R`$N = 30$ çift → $\frac{x_{(15)} + x_{(16)}}{2} = \frac{66 + 68}{2} = 67$`],
      a: 'Mod = 62, Medyan = 67' },
    { t: 'trap', text: 'Sıralamadan medyan alma! Verilen sırada ortaya düşen sayı genelde yanlış şıktır.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'yayilim', title: 'Yayılım ölçüleri: açıklık, çeyrekler, IQR', star: 'Hocanın Soru 1', src: 'Defter: Yayılım ölçüleri · Hocanın sorusu 1 (c, d)',
  blocks: [
    { t: 'p', text: 'Merkezi eğilim ölçüleri verinin hangi değer etrafında yoğunlaştığını söyler ama **ne kadar yayıldığını** söylemez. Bu bilgiyi yayılım (dağılış) ölçüleri verir.' },
    { t: 'p', text: '**Açıklık (range)** = en büyük değer − en küçük değer. Ör: 4, 5, 12, 27, 24, 12 → 27 − 4 = **23**.' },
    { t: 'h', text: 'Çeyrekler ve çeyrekler arası açıklık' },
    { t: 'ul', items: [
      R`$Q_1$ (birinci çeyrek): **medyandan küçük olanların** (alt yarının) medyanı. Verinin %25'i bunun altında.`,
      R`$Q_2$ = medyan. Verinin %50'si altında.`,
      R`$Q_3$ (üçüncü çeyrek): **medyandan büyük olanların** (üst yarının) medyanı. Verinin %75'i bunun altında.`
    ] },
    { t: 'f', cap: 'Solda çeyrekler arası açıklık (IQR), sağda çeyrek ayrılış (Ç.A.)', tex: R`IQR = Q_3 - Q_1 \qquad\qquad \frac{IQR}{2} = \frac{Q_3 - Q_1}{2}` },
    { t: 'ex', head: 'Örnek (defter)', q: '10, 22, 26, 30, 32, 38, 40, 45, 47, 54 verisinin IQR ve çeyrek ayrılışı?',
      steps: ['n = 10 çift → alt yarı: 10, 22, **26**, 30, 32 → Q1 = 26', 'Üst yarı: 38, 40, **45**, 47, 54 → Q3 = 45', R`$IQR = 45 - 26 = 19$, Ç.A. $= 19/2 = 9.5$ (medyan $= (32+38)/2 = 35$)`],
      a: 'IQR = 19, Ç.A. = 9.5' },
    { t: 'ex', head: 'Hocanın Soru 1 (c, d)', q: 'Aynı 30 not: IQR kaç? Öğrencilerin yüzde kaçı 70\'in altında?',
      steps: ['Alt yarı (ilk 15): 42, 48, 50, 52, 53, 53, 54, **56**, 58, 60, 62, 62, 62, 64, 66 → Q1 = 56', 'Üst yarı (son 15): 68, 69, 70, 70, 71, 71, 72, **73**, 78, 80, 82, 85, 87, 92, 95 → Q3 = 73', 'IQR = 73 − 56 = 17', '70\'in altında 17 öğrenci var (42 … 69) → 17/30 × 100 = %56.67'],
      a: 'IQR = 17, %56.67' },
    { t: 'h', text: 'Ortalama ayrılış ve MADN' },
    { t: 'p', text: '**Ortalama ayrılış (ortalama mutlak sapma)**: önce ortalamayı bul, her değerden çıkar, farkların mutlak değerlerini topla, değer sayısına böl.' },
    { t: 'f', tex: R`O.A. = \frac{1}{N}\sum_{i=1}^{N} \left| x_i - \mu \right|` },
    { t: 'ex', q: '2, 4, 6, 8, 10 verisinin ortalama ayrılışı?', steps: [R`$\mu = 6$`, R`$|2-6| + |4-6| + |6-6| + |8-6| + |10-6| = 4 + 2 + 0 + 2 + 4 = 12$`, R`$O.A. = 12/5 = 2.4$`], a: 'Cevap: 2.4' },
    { t: 'p', text: '**MADN**: değerlerin medyandan mutlak farklarının medyanı, 0.6745\'e bölünür.' },
    { t: 'f', tex: R`MADN = \frac{\operatorname{med}\left|x_i - \operatorname{med}(x)\right|}{0.6745}` },
    { t: 'ex', head: 'Örnek (defter)', q: '10, 22, 26, 30, 32, 38, 40, 45, 47, 54 için MADN?',
      steps: ['med = 35 → farklar: −25, −13, −9, −5, −3, 3, 5, 10, 12, 19', 'Mutlak değerler sıralı: 3, 3, 5, 5, **9, 10**, 12, 13, 19, 25 → medyan = 9.5', R`$MADN = 9.5 / 0.6745 \approx 14.08$`], a: 'MADN ≈ 14.08' },
    { t: 'trap', text: 'IQR = Q3 − Q1 (büyükten küçüğü çıkar), sonuç pozitif çıkar. Çeyrek ayrılış = IQR / 2. Çeyrekleri bulmadan önce veriyi sırala.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'varyans', title: 'Varyans, standart sapma, değişim katsayısı', star: 'Hocanın Soru 2', src: 'Defter: Varyans ve standart sapma · Hocanın sorusu 2',
  blocks: [
    { t: 'p', text: '**Varyans**: değerlerin ortalamadan farklarının karelerinin ortalaması. **Standart sapma**: varyansın karekökü (birimi verinin birimiyle aynı).' },
    { t: 'f', cap: 'Yığın (ana kitle): N\'e bölünür', tex: R`\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i-\mu)^2 \qquad\qquad \sigma = \sqrt{\sigma^2}` },
    { t: 'f', cap: 'Örneklem: n − 1\'e bölünür', tex: R`s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2 \qquad\qquad s = \sqrt{s^2}` },
    { t: 'trap', text: R`Soruda "rastgele seçilen / örnek" geçiyorsa **örneklem** → $n-1$'e böl. Bütün yığın verilmişse ya da "ana kitle varyansı" isteniyorsa $N$'e böl.` },
    { t: 'ex', head: 'Hocanın Soru 2', q: 'Bir araştırmacının rastgele seçtiği birimlerin değerleri: 2.43, 2.46, 2.42, 2.45, 2.43, 2.48, 2.46, 2.47, 2.45. a) Aritmetik ortalama b) Varyans ve standart sapma?',
      steps: [R`$\sum x_i = 22.05$, $n = 9$ → $\bar{x} = 22.05 / 9 = 2.45$`, 'Farkların karelerini tabloda hesapla (aşağıda) → toplam 0.0032', R`$s^2 = \frac{0.0032}{9-1} = 0.0004$`, R`$s = \sqrt{0.0004} = 0.02$`, R`Ana kitle varyansı istenseydi: $\sigma^2 = 0.0032 / 9 \approx 0.000356$`],
      a: 'x̄ = 2.45, s² = 0.0004, s = 0.02' },
    { t: 'table', head: [R`$x_i$`, R`$x_i - \bar{x}$`, R`$(x_i - \bar{x})^2$`], rows: [
      ['2.43', '−0.02', '0.0004'], ['2.46', '0.01', '0.0001'], ['2.42', '−0.03', '0.0009'],
      ['2.45', '0', '0'], ['2.43', '−0.02', '0.0004'], ['2.48', '0.03', '0.0009'],
      ['2.46', '0.01', '0.0001'], ['2.47', '0.02', '0.0004'], ['2.45', '0', '0'],
      ['**Toplam 22.05**', '**0**', '**0.0032**']
    ] },
    { t: 'ex', head: 'Örnek (defter)', q: 'Rastgele seçilen 10 filmin kapasiteleri (amper-saat): 140, 136, 150, 144, 148, 152, 138, 141, 140, 151. Örnek varyansı ve standart sapma?',
      steps: [R`$\bar{x} = 1440 / 10 = 144$`, 'Farklar: −4, −8, 6, 0, 4, 8, −6, −3, −4, 7 (toplamı 0)', 'Kareler: 16 + 64 + 36 + 0 + 16 + 64 + 36 + 9 + 16 + 49 = 306', R`$s^2 = 306 / 9 = 34$, $s = \sqrt{34} \approx 5.83$`],
      a: 's² = 34, s ≈ 5.83 amper-saat (144 ∓ 5.83)' },
    { t: 'h', text: 'Özellikler' },
    { t: 'ul', items: [
      'Yayılım ölçüleri arasında **en hassas** ve teorik açıdan en üstün ölçüdür.',
      'Değerler ortalamaya yakınsa varyans küçük, uzaksa büyük olur.',
      'Tüm değerler aynıysa varyans **0** (değişim yok).',
      'Her değere sabit eklenir ya da çıkarılırsa varyans **değişmez**.',
      R`Her değer $c$ ile çarpılırsa varyans $c^2$ ile çarpılır (bölünürse $c^2$'ye bölünür). Standart sapma $|c|$ ile çarpılır.`,
      'Ortalamaları eşit iki yığından **varyansı küçük olan daha homojendir**.'
    ] },
    { t: 'ex', head: 'Örnek (defter)', q: 'İki firmanın son 5 yıllık kâr yüzdeleri: A: 4, 2, 5, 3, 1 · B: 2, 3, 3, 3, 4. Hangisi daha homojen?',
      steps: [R`$\mu_A = 15/5 = 3$, $\mu_B = 15/5 = 3$ (ortalamalar eşit)`, R`$\sigma_A^2 = \frac{1+1+4+0+4}{5} = \frac{10}{5} = 2$`, R`$\sigma_B^2 = \frac{1+0+0+0+1}{5} = \frac{2}{5} = 0.4$`],
      a: '0.4 < 2 → B firması daha homojen' },
    { t: 'h', text: 'Değişim katsayısı (varyasyon katsayısı)' },
    { t: 'p', text: 'Ortalamaları **farklı** iki grubun değişkenliğini karşılaştırmak için kullanılır. Küçük olan daha homojendir.' },
    { t: 'f', cap: 'Solda yığın, sağda örneklem için', tex: R`D.K. = \frac{\sigma}{\mu}\cdot 100 \qquad\qquad D.K. = \frac{s}{\bar{x}}\cdot 100` },
    { t: 'ex', head: 'Örnek (defter)', q: 'İki okulun 2. sınıflarından 50\'şer öğrenci seçilmiş. Okuma süresi ortalamaları 5.2 ve 4.8 dk, varyansları 9 ve 16. Hangi okulda değişim daha az?',
      steps: [R`$s_A = \sqrt{9} = 3$, $s_B = \sqrt{16} = 4$`, R`$D.K._A = \frac{3}{5.2}\cdot 100 \approx 57.7$`, R`$D.K._B = \frac{4}{4.8}\cdot 100 \approx 83.3$`],
      a: '57.7 < 83.3 → A okulu daha homojen' },
    { t: 'trap', text: 'D.K.\'da **standart sapma** ortalamaya bölünür, varyans değil. Ortalamalar farklıyken varyanslara bakıp karar verme.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'tablo-grafik', title: 'Frekans tabloları ve grafikler', star: 'Hocanın Soru 1e', src: 'Defter: Frekans tabloları, Bazı grafikler · Hocanın sorusu 1 (e)',
  blocks: [
    { t: 'p', text: 'Veri çok olduğunda anlaşılır hale getirmek için frekans tabloları ve çapraz tablolar kullanılır.' },
    { t: 'ul', items: [
      '**Sınıflandırılmış frekans tablosu**: değerler küçükten büyüğe sıralanır, her değerin kaç kez tekrarlandığı (frekansı) yazılır. Nitel veride de kullanılır.',
      '**Gruplandırılmış frekans tablosu**: en küçük ile en büyük değer arası aralıklara (sınıflara) bölünür, her sınıftaki veri sayısı yazılır. Nicel veride kullanılır.',
      '**Çapraz tablo**: iki veya daha fazla **sınıflama** düzeyindeki değişkenin düzeylerine göre sayı ya da oran verir (ör. cinsiyet × sigara kullanımı).'
    ] },
    { t: 'ex', head: 'Hocanın Soru 1 (e): histogram', q: '30 notu 10\'ar puanlık sınıflara ayır ve histogram çiz.',
      steps: ['40–49: 42, 48 → **2**', '50–59: 50, 52, 53, 53, 54, 56, 58 → **7**', '60–69: 60, 62, 62, 62, 64, 66, 68, 69 → **8**', '70–79: 70, 70, 71, 71, 72, 73, 78 → **7**', '80–89: 80, 82, 85, 87 → **4**', '90–99: 92, 95 → **2**'],
      a: 'Toplam 2 + 7 + 8 + 7 + 4 + 2 = 30 (kontrol)' },
    { t: 'viz', kind: 'hist', labels: ['40–49', '50–59', '60–69', '70–79', '80–89', '90–99'], freqs: [2, 7, 8, 7, 4, 2], xlab: 'Not aralığı', ylab: 'Öğrenci sayısı', cap: 'Histogram: sınıflar x ekseninde, frekanslar y ekseninde, dikdörtgenler bitişik.' },
    { t: 'table', head: ['Grafik', 'Değişken', 'Ne gösterir'], rows: [
      ['Histogram', 'Nicel (gruplandırılmış)', 'Sınıf sınırları x\'e, frekanslar y\'ye; **bitişik**, eşit tabanlı dikdörtgenler'],
      ['Çubuk grafiği', 'Nitel', 'Her kategori için ayrı çubuk'],
      ['Daire (pasta) grafiği', 'Nitel', 'Kategorilerin yüzde payı (dilim açısı = oran × 360°)'],
      ['Kutu grafiği', 'Nicel', 'Medyan, Q1, Q3, yayılım ve aykırı değerler'],
      ['Serpme diyagramı', 'İki nicel değişken', 'İki değişken arasındaki ilişkinin yönü ve biçimi']
    ] },
    { t: 'ex', head: 'Örnek (defter): çubuk ve pasta', q: '31 kişilik veride kategoriler: TC 7, TT 15, V 9 kişi. Yüzdeler?',
      steps: ['TC: 7/31 = %22.58', 'TT: 15/31 = %48.39', 'V: 9/31 = %29.03'], a: 'Çubuk ve pasta grafiği aynı yorumu verir: en büyük pay TT.' },
    { t: 'h', text: 'Kutu grafiği' },
    { t: 'p', text: 'Kutu Q1\'den Q3\'e uzanır, içindeki çizgi medyandır. Sınırların dışında kalan değerler **potansiyel aykırı değerdir**.' },
    { t: 'f', cap: 'Solda alt sınır, sağda üst sınır', tex: R`Q_1 - 1.5\cdot IQR \qquad\qquad Q_3 + 1.5\cdot IQR` },
    { t: 'ex', head: 'Örnek (defter)', q: 'Medyan = 600, Q1 = 470, Q3 = 950 olan verinin kutu grafiği sınırları?',
      steps: ['IQR = 950 − 470 = 480', 'Alt sınır = 470 − 1.5 × 480 = 470 − 720 = −250 → değişken negatif olamadığı için **0** alınır', 'Üst sınır = 950 + 1.5 × 480 = 950 + 720 = **1670**'],
      a: 'Kutu grafiği yayılımı, medyanı ve aykırı değer olup olmadığını gösterir.' },
    { t: 'viz', kind: 'box', scale: [0, 1900], tick: 300, min: 200, q1: 470, med: 600, q3: 950, max: 1400, out: [1800], fences: [{ v: 0, label: 'alt sınır 0' }, { v: 1670, label: 'üst sınır 1670' }], cap: 'Örnek kutu grafiği. 1800 gibi bir değer üst sınırın dışında kalır → aykırı değer.' },
    { t: 'h', text: 'Serpme diyagramı' },
    { t: 'viz', kind: 'scatter', cap: 'Noktalar artan bir doğru etrafında → pozitif; azalan → ters yönlü doğrusal ilişki. Dağınık → doğrusal ilişki yok.' },
    { t: 'trap', text: 'Histogram nicel veri içindir, dikdörtgenler bitişiktir. Nitel veri için çubuk ya da pasta grafiği kullanılır.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'korelasyon', title: 'Pearson korelasyon katsayısı', src: 'Defter: Serpme diyagramı, Pearson korelasyon katsayısı',
  blocks: [
    { t: 'p', text: 'İki nicel değişken arasındaki **doğrusal** ilişkinin yönünü ve gücünü ölçer.' },
    { t: 'f', tex: R`r = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum (x_i-\bar{x})^2\,\sum (y_i-\bar{y})^2}} = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{(n-1)\,s_x\,s_y}` },
    { t: 'f', tex: R`s_x = \sqrt{\frac{1}{n-1}\sum (x_i-\bar{x})^2} \qquad s_y = \sqrt{\frac{1}{n-1}\sum (y_i-\bar{y})^2} \qquad -1 \le r \le 1` },
    { t: 'table', head: ['r değeri', 'Yorum'], rows: [
      ['r = 1', 'Tam, pozitif yönlü doğrusal ilişki'],
      ['1\'e yakın', 'Güçlü, pozitif yönlü doğrusal ilişki'],
      ['0\'a yakın', 'Zayıf doğrusal ilişki'],
      ['r = 0', 'Doğrusal ilişki yok'],
      ['−1\'e yakın', 'Güçlü, negatif (ters) yönlü doğrusal ilişki'],
      ['r = −1', 'Tam, ters yönlü doğrusal ilişki']
    ] },
    { t: 'ex', q: 'x: 1, 2, 3, 4, 5 ve y: 2, 4, 5, 4, 5 için r?',
      steps: [R`$\bar{x} = 3$, $\bar{y} = 4$`, R`$\sum (x_i-\bar{x})(y_i-\bar{y}) = (-2)(-2) + (-1)(0) + 0\cdot 1 + 1\cdot 0 + 2\cdot 1 = 6$`, R`$\sum (x_i-\bar{x})^2 = 10$, $\sum (y_i-\bar{y})^2 = 4 + 0 + 1 + 0 + 1 = 6$`, R`$r = \frac{6}{\sqrt{10 \cdot 6}} = \frac{6}{\sqrt{60}} \approx 0.77$`],
      a: 'r ≈ 0.77 → güçlü, pozitif doğrusal ilişki' },
    { t: 'trap', text: 'r = 0 "hiç ilişki yok" değil, "**doğrusal** ilişki yok" demektir (eğrisel ilişki olabilir). İşaret yönü, mutlak değer gücü gösterir. r −1\'den küçük ya da 1\'den büyük olamaz.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'sayma', title: 'Sayma kuralları, permütasyon, kombinasyon', src: 'Defter: Olasılık · Sayma kuralları',
  blocks: [
    { t: 'ul', items: [
      R`**Toplama kuralı ("veya")**: Ayrık (aynı anda olamayan) iki işlemden biri $n_1$, diğeri $n_2$ yolla yapılıyorsa biri **veya** diğeri $n_1 + n_2$ yolla yapılır.`,
      R`**Çarpma kuralı ("ve")**: $k$ işlem art arda $n_1, n_2, \dots, n_k$ yolla yapılıyorsa hepsi birlikte $n_1 \cdot n_2 \cdots n_k$ yolla yapılır.`
    ] },
    { t: 'f', cap: 'Faktöriyel', tex: R`n! = n\,(n-1)\,(n-2)\cdots 1 \qquad 1! = 1 \qquad 0! = 1` },
    { t: 'h', text: 'Permütasyon (sıra önemli)' },
    { t: 'p', text: 'Nesnelerin tümünün ya da bir kısmının belirli bir **sıralamasıdır**.' },
    { t: 'f', tex: R`P(n,r) = {}_nP_r = \frac{n!}{(n-r)!}` },
    { t: 'ex', head: 'Örnekler (defter)', q: 'a) a, b, c, d harfleri ikişerli kaç farklı şekilde sıralanır? b) 5 farklı bölümden 5 öğrenciden 2\'si yan yana kaç farklı şekilde oturur?',
      steps: [R`a) $P(4,2) = \frac{4!}{2!} = 12$`, R`b) $P(5,2) = \frac{5!}{3!} = 20$`] },
    { t: 'p', text: R`**Tekrarlı permütasyon**: $n$ nesnenin $k$ tanesi aynı, $l$ tanesi aynı… ise dizilişler $\dfrac{n!}{k!\,l!\cdots}$` },
    { t: 'ex', head: 'Örnek (defter)', q: '"İSTATİSTİK" kelimesinin harfleriyle kaç farklı dizilim yapılır?',
      steps: ['10 harf: İ 3 tane, S 2 tane, T 3 tane, A 1, K 1', R`$\frac{10!}{3!\,2!\,3!} = \frac{3628800}{72} = 50400$`], a: 'Cevap: 50400' },
    { t: 'ex', head: 'Örnek (defter): gruplama', q: '3 kimya, 4 matematik, 2 fizik kitabı (hepsi farklı) aynı alandakiler yan yana olacak şekilde kaç farklı dizilir?',
      steps: ['Önce 3 grup kendi arasında: 3!', 'Sonra grup içleri: 3! · 4! · 2!', R`$3! \cdot 3! \cdot 4! \cdot 2! = 6 \cdot 6 \cdot 24 \cdot 2 = 1728$`], a: 'Cevap: 1728' },
    { t: 'h', text: 'Kombinasyon (sıra önemsiz)' },
    { t: 'p', text: R`$n$ farklı nesneden $r$ tanesinin dizilme sırasına bakmadan **seçimidir**.` },
    { t: 'f', tex: R`C(n,r) = {}_nC_r = \binom{n}{r} = \frac{n!}{r!\,(n-r)!}` },
    { t: 'ex', head: 'Örnekler (defter)', q: 'a) 5 sorudan 3\'ü kaç farklı seçilir? b) 4 matematik ve 5 istatistik öğrencisinden 2 matematik, 3 istatistik öğrencisi seçilecek.',
      steps: [R`a) $\binom{5}{3} = 10$`, R`b) Kısıtlama yok: $\binom{4}{2}\binom{5}{3} = 6 \cdot 10 = 60$`, R`Belli 2 istatistikçi mutlaka seçilecek: kalan 1 yer, kalan 3 kişiden: $\binom{4}{2}\binom{3}{1} = 18$`, R`Belli 1 matematikçi seçilmeyecek: $\binom{3}{2}\binom{5}{3} = 3 \cdot 10 = 30$`] },
    { t: 'ex', head: 'Örnekler (defter): iskambil ve test', q: '52\'lik deste (her sembolden 13 kart) ve 20 soruluk test.',
      steps: [R`4 as yan yana olacak şekilde tüm kartlar: asları tek blok say → 49 nesne: $49! \cdot 4!$`, R`13 maça yan yana: $40! \cdot 13!$`, R`Maçalar küçükten büyüğe sıralı ve yan yana: blok içi tek sıra → $40!$`, R`Her sembolden birer kart (4 kart): $\binom{13}{1}^4 = 13^4$`, R`20 soru, 4 seçenek, ardışık iki sorunun cevabı aynı olamaz: $4 \cdot 3^{19}$`] },
    { t: 'trap', text: 'Seçim, grup, komisyon → kombinasyon. Sıralama, dizilim, şifre, oturma düzeni → permütasyon. "Belli kişi mutlaka olacak" → onu ayır, kalan yerleri kalanlardan seç.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'kume', title: 'Kümeler', src: 'Defter: Küme',
  blocks: [
    { t: 'p', text: '**Küme**: belirli özelliğe sahip, iyi tanımlanmış birimlerden oluşan topluluktur.' },
    { t: 'table', head: ['Gösterim', 'Anlamı'], rows: [
      [R`$x \in A$`, 'x, A\'nın elemanıdır'],
      [R`$y \notin A$`, 'y, A\'nın elemanı değildir'],
      [R`$A \subset B$`, 'A, B\'nin alt kümesidir'],
      [R`$B \supset A$`, 'B, A\'yı kapsar'],
      [R`$A = \emptyset = \{\,\}$`, 'A boş kümedir'],
      [R`$S$ ya da $E$`, 'Evrensel küme: konunun kapsamındaki tüm elemanlar'],
      [R`$A \cap B$`, 'Kesişim: iki kümenin ortak elemanları'],
      [R`$A \cup B$`, 'Birleşim: A\'ya, B\'ye ya da ikisine birden ait elemanlar'],
      [R`$A \cap B = \emptyset$`, 'A ve B **ayrık** kümeler (ortak eleman yok)'],
      [R`$A'$, $\bar{A}$, $A^c$`, 'Tümleyen: evrensel kümede olup A\'da olmayanlar (A\'nın karşıtı, değili)']
    ] },
    { t: 'ex', q: R`$S = \{1,2,3,4,5,6\}$, $A = \{1,2,3\}$, $B = \{2,4,6\}$, $C = \{4,5\}$`,
      steps: [R`$A \cap B = \{2\}$`, R`$A \cup B = \{1,2,3,4,6\}$`, R`$\bar{A} = \{4,5,6\}$`, R`$A \cap C = \emptyset$ → A ve C ayrık`] },
    { t: 'tip', text: 'Olasılık sorularında: "ve / ikisi de" → kesişim, "veya / en az biri" → birleşim, "değil / olmaması" → tümleyen.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'olasilik', title: 'Olasılık: kavramlar, aksiyomlar, kurallar', src: 'Defter: Olasılık ile ilgili kavramlar, Olasılık aksiyomları, Bazı olasılık kuralları',
  blocks: [
    { t: 'ul', items: [
      '**Olay**: tekrarlanabilir bir deneyin sonuçlarıdır. Olay, örnek uzayın bir alt kümesidir.',
      R`**Örnek uzay** ($S$): deneyin tüm mümkün sonuçlarının kümesi.`,
      R`$S$'nin kendisi **kesin olay**, $\emptyset$ **imkânsız olaydır**.`,
      R`Mümkün durum sayısı $= m^k$ ($m$: bir denemedeki sonuç sayısı, $k$: deneme sayısı). Ör: para 3 kez → $2^3 = 8$; iki zar → $6^2 = 36$.`
    ] },
    { t: 'f', cap: 'n: A\'ya uygun durum sayısı, N: tüm mümkün durumların sayısı', tex: R`P(A) = \frac{n}{N}` },
    { t: 'p', text: 'Olasılık, aynı koşullarda tekrarlanan bir deneyde bir olayın gerçekleşme sıklığının ölçüsüdür. Olasılık fonksiyonunun tanım kümesi örnek uzayın alt kümeleri, değer kümesi **[0, 1]** aralığıdır (negatif ve 1\'den büyük olamaz).' },
    { t: 'h', text: 'Aksiyomlar' },
    { t: 'ol', items: [R`$P(A) \ge 0$`, R`$P(S) = 1$`, R`$A_1, A_2, \dots$ ikişerli ayrıksa ($A_i \cap A_j = \emptyset$): $P\left(\bigcup A_i\right) = \sum P(A_i)$`] },
    { t: 'h', text: 'Kurallar' },
    { t: 'ol', items: [
      R`$A_1 \subset A_2 \Rightarrow P(A_1) \le P(A_2)$`,
      R`$P(\emptyset) = 0$`,
      R`$0 \le P(A) \le 1$`,
      R`Tümleyen: $P(\bar{A}) = 1 - P(A)$ (çünkü $S = A \cup \bar{A}$)`,
      R`Birleşim: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$`
    ] },
    { t: 'ex', head: 'Örnekler (defter)', q: 'a) İki zarın toplamının 7 olma olasılığı? b) 120 çalışanın 50\'si 40 yaş altı, 70\'i 40 ve üstü. 40 altındakilerin 20\'si, diğerlerinin 30\'u erkek. Rastgele bir çalışanın 40 yaş altı **veya** erkek olma olasılığı?',
      steps: [R`a) (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → $6/36 = 1/6$`, R`b) A: 40 yaş altı ($50/120$), B: erkek ($50/120$), $A\cap B$: 40 altı erkek ($20/120$)`, R`$P(A \cup B) = \frac{50}{120} + \frac{50}{120} - \frac{20}{120} = \frac{80}{120} = \frac{2}{3}$`] },
    { t: 'ex', head: 'Soru (defter)', q: 'Yönetim kurulu için a, b, c, d adayları yarışıyor. a\'nın seçilme olasılığı b\'nin 2 katı, b\'ninki d\'nin 2 katı, b ile c\'ninki eşit. c\'nin seçilme olasılığı?',
      steps: [R`$P(d) = p$ → $P(b) = 2p$, $P(c) = 2p$, $P(a) = 4p$`, R`Toplam 1: $4p + 2p + 2p + p = 9p = 1$ → $p = 1/9$`, R`$P(c) = 2/9$`], a: 'Cevap: 2/9' },
    { t: 'ex', head: 'Soru (defter)', q: 'Torbada eşit sayıda kırmızı ve mavi top var. Rastgele seçilen 2 topun ikisinin de kırmızı olma olasılığı 0.24 ise torbada kaç top var?',
      steps: [R`$x$ kırmızı, $x$ mavi: $\frac{\binom{x}{2}}{\binom{2x}{2}} = \frac{x(x-1)}{2x(2x-1)} = \frac{x-1}{2(2x-1)} = 0.24$`, R`$x - 1 = 0.48(2x - 1) = 0.96x - 0.48$ → $0.04x = 0.52$ → $x = 13$`], a: '13 kırmızı + 13 mavi = 26 top' },
    { t: 'ex', head: 'Örnek (defter): KARADUT', q: '"KARADUT" kelimesinin harfleriyle yapılan dizilişlerde iki A\'nın yan yana gelmeme olasılığı?',
      steps: [R`Tüm dizilişler: 7 harf, A 2 tane → $7!/2! = 2520$`, R`İki A yan yana: AA tek blok → $6! = 720$`, R`$P(\text{yan yana}) = 720/2520 = 2/7$ → $P(\text{gelmeme}) = 1 - 2/7 = 5/7$`], a: 'Cevap: 5/7' },
    { t: 'trap', text: '"En az biri" sorularında tümleyen kolaylaştırır: P(en az biri) = 1 − P(hiçbiri). Birleşimde kesişimi çıkarmayı unutma.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'kosullu', title: 'Koşullu olasılık ve çarpım kuralı', src: 'Defter: Koşullu olasılık, Olasılıkların çarpım kuralı',
  blocks: [
    { t: 'p', text: 'B olayının gerçekleştiği **bilinirken** A\'nın olasılığıdır. Örnek uzay B\'ye daralır.' },
    { t: 'f', tex: R`P(A\mid B) = \frac{P(A\cap B)}{P(B)} \qquad P(B\mid A) = \frac{P(A\cap B)}{P(A)}` },
    { t: 'f', cap: 'Çarpım kuralı (ikisinin birlikte olma olasılığı)', tex: R`P(A\cap B) = P(A\mid B)\,P(B) = P(A)\,P(B\mid A)` },
    { t: 'ex', head: 'Örnek (defter)', q: '52 kartlık desteden çekilen kart kırmızı ise kupa olma olasılığı?',
      steps: ['A: kupa, B: kırmızı', R`1. yol: $P(A\mid B) = \frac{13/52}{26/52} = \frac{13}{26} = \frac{1}{2}$`, '2. yol: 26 kırmızı kartın 13\'ü kupa → 13/26 = 1/2'], a: 'Cevap: 1/2' },
    { t: 'ex', head: 'Örnek (defter)', q: 'İki zar atılıyor. Toplamın 6\'dan büyük olduğu biliniyorsa çift olma olasılığı?',
      steps: [R`B: toplam > 6 → 7, 8, 9, 10, 11, 12: $6+5+4+3+2+1 = 21$ durum → $P(B) = 21/36$`, R`$A\cap B$: toplam 8, 10, 12 → $5 + 3 + 1 = 9$ durum → $9/36$`, R`$P(A\mid B) = \frac{9/36}{21/36} = \frac{9}{21} = \frac{3}{7}$`], a: 'Cevap: 3/7' },
    { t: 'ex', head: 'Örnek (defter)', q: 'Kutuda 5 arızalı, 10 kısmi arızalı, 25 sağlam elektronik kart var. Seçilen kartın hemen bozulmadığı biliniyorsa sağlam olma olasılığı?',
      steps: ['B: hemen bozulmama = kısmi arızalı + sağlam = 35 kart', R`$P(A\mid B) = \frac{25/40}{35/40} = \frac{25}{35} = \frac{5}{7}$`], a: 'Cevap: 5/7' },
    { t: 'ex', head: 'Çarpım kuralı örnekleri (defter)', q: 'İadesiz art arda seçimler ve koşullu zincir.',
      steps: [R`10 kusurlu, 50 kusursuz kutu: 2 kutu seçiliyor, ikisi de kusurlu → $\frac{10}{60}\cdot\frac{9}{59} = \frac{3}{118} \approx 0.0254$`, R`240 parçanın 15'i kusurlu, 2 parça peş peşe → $\frac{15}{240}\cdot\frac{14}{239} = \frac{7}{1912} \approx 0.00366$`, R`Şirketin şube açma olasılığı 0.30; açarsa çalışanın müdür olma olasılığı 0.60 → $0.30 \cdot 0.60 = 0.18$`, R`52 karttan peş peşe 2 as: iadesiz $\frac{4}{52}\cdot\frac{3}{51}$, iadeli $\frac{4}{52}\cdot\frac{4}{52}$ (iadeli → bağımsız)`] },
    { t: 'ex', head: 'Soru (defter)', q: 'A olayının olasılığı 0.60. A meydana gelmediğinde B\'nin meydana gelme olasılığı 0.10. A ve B\'den en az birinin meydana gelme olasılığı?',
      steps: [R`$P(B\mid \bar{A}) = \frac{P(\bar{A}\cap B)}{P(\bar{A})}$ → $0.10 = \frac{P(\bar{A}\cap B)}{0.40}$ → $P(\bar{A}\cap B) = 0.04$`, R`$P(A\cup B) = P(A) + P(\bar{A}\cap B) = 0.60 + 0.04 = 0.64$`], a: 'Cevap: 0.64' },
    { t: 'trap', text: '"…olduğu biliniyorsa / …ise" ifadesi koşulu verir; koşul **paydaya** gider. İadesiz çekilişte ikinci kesrin hem payı hem paydası bir azalır.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'bagimsiz', title: 'Bağımsız olaylar', src: 'Defter: Bağımsız olaylar',
  blocks: [
    { t: 'p', text: R`B'nin gerçekleşip gerçekleşmemesi A'nın olasılığını etkilemiyorsa A ve B **bağımsızdır**: $P(A\mid B) = P(A)$.` },
    { t: 'f', cap: 'A ve B ancak ve ancak şu durumda bağımsızdır', tex: R`P(A\cap B) = P(A)\,P(B)` },
    { t: 'ul', items: [
      'İadeli çekilişler, ayrı zar ve para atışları, farklı kişilerin sınav sonuçları genelde bağımsızdır.',
      R`Olasılıkları 0'dan farklı iki bağımsız olayın en az bir ortak noktası vardır: $A\cap B \ne \emptyset$. Yani bağımsız olaylar ayrık **olamaz**.`
    ] },
    { t: 'table', head: ['', 'Ayrık', 'Bağımsız'], rows: [
      ['Anlamı', 'Aynı anda olamazlar', 'Biri diğerinin olasılığını etkilemez'],
      ['Kesişim', R`$P(A\cap B) = 0$`, R`$P(A\cap B) = P(A)P(B)$`],
      ['Birleşim', R`$P(A)+P(B)$`, R`$P(A)+P(B)-P(A)P(B)$`],
      ['Koşullu', R`$P(A\mid B) = 0$`, R`$P(A\mid B) = P(A)$`]
    ] },
    { t: 'ex', head: 'Örnek (defter)', q: 'Ali\'nin sınavdan 75 üstü alma olasılığı 0.90, Mehmet\'in 0.60. İkisinin de 75 üstü alma olasılığı?',
      steps: [R`Bağımsız: $P(A\cap M) = 0.90 \times 0.60 = 0.54$`], a: 'Cevap: 0.54 (%54)' },
    { t: 'ex', head: 'Örnek (defter)', q: 'Hilesiz para 3 kez atılıyor. A: ilk iki atışın ikisi de yazı. B: 3. atış tura. C: üç atışta tam iki tura. a) A ile B bağımsız mı? b) B ile C bağımsız mı?',
      steps: ['A = {YYY, YYT} → 2/8; B = {YYT, YTT, TYT, TTT} → 4/8; C = {YTT, TYT, TTY} → 3/8', R`a) $A\cap B = \{YYT\}$ → $1/8$; $P(A)P(B) = \frac{2}{8}\cdot\frac{4}{8} = \frac{1}{8}$ → eşit, **bağımsız**`, R`b) $B\cap C = \{YTT, TYT\}$ → $2/8$; $P(B)P(C) = \frac{4}{8}\cdot\frac{3}{8} = \frac{3}{16}$ → eşit değil, **bağımsız değil**`] },
    { t: 'ex', head: 'Sorular (defter)', q: 'a) A ve B ayrık, P(B) > 0. P(A | B) = ? b) Bağımsız A, B için P(A) = 1/3, P(A ∪ B) = 1/2. P(B) = ?',
      steps: [R`a) $P(A\mid B) = \frac{P(A\cap B)}{P(B)} = \frac{0}{P(B)} = 0$`, R`b) $\frac{1}{2} = \frac{1}{3} + P(B) - \frac{1}{3}P(B)$ → $\frac{1}{6} = \frac{2}{3}P(B)$ → $P(B) = \frac{1}{4}$`] },
    { t: 'trap', text: 'Ayrık ile bağımsızı karıştırma! Olasılıkları sıfırdan büyük ayrık olaylar asla bağımsız değildir: biri olursa diğeri kesinlikle olmaz.' }
  ]
},
/* ------------------------------------------------------------------ */
{
  id: 'bayes', title: 'Toplam olasılık kanunu ve Bayes teoremi', star: 'Detaylı anlatım', pageBreak: true, src: 'Defter: Toplam olasılık kanunu, Bayes teoremi (cıvata örneği)',
  blocks: [
    { t: 'p', text: '**Bayes teoremi ters yönde soru sorar.** Sonucu gördük (cıvata kusurlu çıktı); bu sonuca **hangi sebebin** (hangi makinenin) yol açtığının olasılığı nedir? Elimizde ise ters yöndeki bilgi vardır: her makinenin kusur oranı.' },
    { t: 'table', head: ['Elimizde olan', 'İstenen'], rows: [
      [R`$P(K\mid M_A)$: A makinesinin ürettiği cıvatanın kusurlu olma olasılığı`, R`$P(M_A\mid K)$: kusurlu bir cıvatanın A makinesinden gelmiş olma olasılığı`]
    ] },
    { t: 'h', text: '1. adım: Parçalanış (sebepler)' },
    { t: 'p', text: R`$B_1, B_2, \dots, B_k$ olayları $S$'nin **parçalanışıdır**: ikişerli ayrık ($B_i\cap B_j=\emptyset$) ve birleşimleri $S$ ($\bigcup B_i = S$). Yani her sonuç tam olarak bir parçaya düşer. Cıvata örneğinde her cıvata tam olarak bir makineden çıkar: $M_A$, $M_B$, $M_C$.` },
    { t: 'h', text: '2. adım: Toplam olasılık kanunu' },
    { t: 'p', text: R`A olayı her parçayla kesişir. Bu kesişimler ayrık olduğu için olasılıkları toplanır. İki parçalı halde ($F$ ve $\bar{F}$): $E = (E\cap F) \cup (E\cap \bar{F})$ → $P(E) = P(E\cap F) + P(E\cap \bar{F})$. Genel halde:` },
    { t: 'f', tex: R`P(A) = \sum_{i=1}^{k} P(A\cap B_i) = \sum_{i=1}^{k} P(A\mid B_i)\,P(B_i)` },
    { t: 'h', text: '3. adım: Bayes formülü (nereden geliyor?)' },
    { t: 'p', text: 'Koşullu olasılık tanımını yaz. Payı çarpım kuralıyla, paydayı toplam olasılık kanunuyla aç:' },
    { t: 'f', tex: R`P(B_i\mid A) = \frac{P(B_i\cap A)}{P(A)} = \frac{P(A\mid B_i)\,P(B_i)}{\displaystyle\sum_{j=1}^{k} P(A\mid B_j)\,P(B_j)}, \qquad i = 1, 2, \dots, k` },
    { t: 'table', head: ['Terim', 'Anlamı', 'Cıvata örneğinde'], rows: [
      [R`$P(B_i)$`, 'Sebebin kendi olasılığı (sonucu görmeden önce)', 'Üretim payları: 0.30, 0.30, 0.40'],
      [R`$P(A\mid B_i)$`, 'O sebep varken sonucun olasılığı', 'Kusur oranları: 0.01, 0.03, 0.02'],
      [R`$P(A\mid B_i)P(B_i)$`, R`Dalın olasılığı = $P(A\cap B_i)$`, '0.003, 0.009, 0.008'],
      [R`$P(A)$`, 'Tüm dalların toplamı (toplam olasılık)', '0.020'],
      [R`$P(B_i\mid A)$`, 'Sonuç görüldükten sonra sebebin olasılığı', '0.15, 0.45, 0.40']
    ] },
    { t: 'low', text: 'Bazı kaynaklarda P(Bᵢ)\'ye önsel (ön) olasılık, P(Bᵢ | A)\'ya sonsal (son) olasılık denir.' },
    { t: 'ex', head: 'Defterdeki örnek: cıvata fabrikası', q: 'Cıvata üreten bir fabrikada üretimin %30\'u A, %30\'u B, %40\'ı C makinesinde yapılıyor. Bu makinelerin üretimlerinin sırasıyla %1\'i, %3\'ü ve %2\'si kusurlu. Günün sonunda rastgele bir cıvata seçiliyor. a) Cıvatanın kusurlu olma olasılığı? b) Cıvata kusurlu ise A makinesinde üretilmiş olma olasılığı?',
      steps: [
        R`Olayları adlandır: $M_A, M_B, M_C$: cıvatanın o makinede üretilmesi (parçalanış). $K$: cıvatanın kusurlu olması.`,
        R`Verilenler: $P(M_A) = 0.30$, $P(M_B) = 0.30$, $P(M_C) = 0.40$ (toplam 1 ✓). $P(K\mid M_A) = 0.01$, $P(K\mid M_B) = 0.03$, $P(K\mid M_C) = 0.02$.`,
        R`a) Toplam olasılık: $P(K) = 0.01\cdot 0.30 + 0.03\cdot 0.30 + 0.02\cdot 0.40 = 0.003 + 0.009 + 0.008 = 0.020$`,
        R`b) Bayes: $P(M_A\mid K) = \frac{P(K\mid M_A)\,P(M_A)}{P(K)} = \frac{0.003}{0.020} = 0.15$`,
        R`Ek: $P(M_B\mid K) = \frac{0.009}{0.020} = 0.45$, $P(M_C\mid K) = \frac{0.008}{0.020} = 0.40$. Kontrol: $0.15 + 0.45 + 0.40 = 1$ ✓`
      ],
      a: 'a) 0.02 (%2) · b) 0.15 (%15)' },
    { t: 'viz', kind: 'tree', root: 'Cıvata', branches: [
      { name: 'A makinesi', p: 0.30, kids: [{ name: 'Kusurlu', p: 0.01, hl: true }, { name: 'Sağlam', p: 0.99 }] },
      { name: 'B makinesi', p: 0.30, kids: [{ name: 'Kusurlu', p: 0.03, hl: true }, { name: 'Sağlam', p: 0.97 }] },
      { name: 'C makinesi', p: 0.40, kids: [{ name: 'Kusurlu', p: 0.02, hl: true }, { name: 'Sağlam', p: 0.98 }] }
    ], total: 'P(K) = 0.003 + 0.009 + 0.008 = 0.020', cap: 'Ağaç diyagramı: daldaki olasılıklar çarpılır. Yeşil (kusurlu) dalların toplamı P(K). b şıkkı: A\'nın yeşil dalı / P(K) = 0.003 / 0.020 = 0.15.' },
    { t: 'p', text: '**Yorum**: B makinesi üretimin sadece %30\'unu yapıyor ama kusurlu cıvataların %45\'i ondan geliyor, çünkü kusur oranı en yüksek olan o. C üretimin en büyük payına (%40) sahip ama kusurluların %40\'ı ondan geliyor.' },
    { t: 'h', text: 'Sayılarla kontrol: 10 000 cıvata düşün' },
    { t: 'table', head: ['Makine', 'Üretilen', 'Kusurlu', 'Kusurluların payı'], rows: [
      ['A', '3000', '3000 × 0.01 = 30', '30 / 200 = **0.15**'],
      ['B', '3000', '3000 × 0.03 = 90', '90 / 200 = **0.45**'],
      ['C', '4000', '4000 × 0.02 = 80', '80 / 200 = **0.40**'],
      ['Toplam', '10 000', '200 → P(K) = 200 / 10 000 = 0.02', '1']
    ] },
    { t: 'tip', head: 'Sınavda 5 adım', items: [
      R`**1.** Sebepleri ($B_i$) ve gözlenen sonucu ($A$) harfle adlandır.`,
      R`**2.** $P(B_i)$'leri yaz; toplamları **1** olmalı.`,
      R`**3.** $P(A\mid B_i)$'leri yaz (her sebepteki oran). Bunların toplamı 1 olmak **zorunda değil**.`,
      R`**4.** Her dal için $P(A\mid B_i)\,P(B_i)$'yi çarp ve topla → $P(A)$ (a şıkkı).`,
      R`**5.** İstenen dalın çarpımını $P(A)$'ya böl → $P(B_i\mid A)$ (b şıkkı).`
    ] },
    { t: 'h', text: 'İki sebepli hal (B ve B̄)' },
    { t: 'p', text: 'Sık görülen biçim: sebep ya vardır ya yoktur (hasta / sağlıklı, hatalı / hatasız).' },
    { t: 'f', tex: R`P(B\mid A) = \frac{P(A\mid B)\,P(B)}{P(A\mid B)\,P(B) + P(A\mid \bar{B})\,P(\bar{B})}` },
    { t: 'ex', head: 'Örnek: tıbbi test', q: 'Bir hastalık toplumda %1 oranında görülüyor. Test hastaların %95\'inde pozitif, sağlıklıların %10\'unda yanlışlıkla pozitif çıkıyor. Testi pozitif çıkan birinin gerçekten hasta olma olasılığı?',
      steps: [
        R`$H$: hasta, $+$: test pozitif. $P(H) = 0.01$, $P(\bar{H}) = 0.99$, $P(+\mid H) = 0.95$, $P(+\mid \bar{H}) = 0.10$`,
        R`Toplam olasılık: $P(+) = 0.95\cdot 0.01 + 0.10\cdot 0.99 = 0.0095 + 0.099 = 0.1085$`,
        R`Bayes: $P(H\mid +) = \frac{0.0095}{0.1085} \approx 0.0876$`
      ],
      a: 'Cevap: yaklaşık 0.088 (%8.8)' },
    { t: 'viz', kind: 'tree', root: 'Kişi', branches: [
      { name: 'Hasta', p: 0.01, kids: [{ name: 'Pozitif', p: 0.95, hl: true }, { name: 'Negatif', p: 0.05 }] },
      { name: 'Sağlıklı', p: 0.99, kids: [{ name: 'Pozitif', p: 0.10, hl: true }, { name: 'Negatif', p: 0.90 }] }
    ], total: 'P(+) = 0.0095 + 0.099 = 0.1085', cap: 'Pozitif çıkanların çoğu sağlıklı kişilerden geliyor (0.099 > 0.0095). Bu yüzden P(H | +) küçük.' },
    { t: 'p', text: R`**Ders**: Test hastaların %95'ini yakalasa da pozitif çıkanların sadece ~%9'u hasta. Sağlıklı insan çok fazla olduğu için onların %10'u bile hastalardan kalabalık. $P(+\mid H) = 0.95$ ile $P(H\mid +) \approx 0.088$ çok farklı sayılardır.` },
    { t: 'trap', head: 'Bayes tuzakları', items: [
      R`$P(A\mid B_i)$ (makinenin kusur oranı) ile $P(B_i\mid A)$ (kusurlunun o makineden gelme olasılığı) **aynı şey değil**.`,
      R`Payda $P(A)$'dır. Oranları düz toplamak ($0.01 + 0.03 + 0.02 = 0.06$) **yanlış**; her oran kendi payıyla çarpılıp toplanır.`,
      'Yüzdeleri ondalığa çevir: %1 = 0.01, %30 = 0.30.',
      'b şıkkı a şıkkının sonucunu kullanır: önce P(A), sonra bölme.',
      R`Kontrol: tüm $P(B_i\mid A)$'ların toplamı 1 olmalı.`
    ] },
    { t: 'tip', head: 'Soru kalıbını tanı', items: [
      '"…üretiliyor / geliyor, oranları …; rastgele seçilen ürün **kusurlu ise** … makinesinden olma olasılığı?" → **Bayes**',
      '"Rastgele seçilen ürünün kusurlu olma olasılığı?" (koşulsuz) → **toplam olasılık**',
      '"A makinesinin ürettiği bir ürünün kusurlu olma olasılığı?" → doğrudan verilen oran, P(K | A)'
    ] }
  ]
}
];

window.TOPIC_RULES = {
  temel: R`Yığından hesaplanan değer **parametre** ($\mu$, $\sigma$), örneklemden hesaplanan değer **istatistiktir** ($\bar{x}$, $s$). Nitel değişken sayısal anlam taşımaz; nicel değişken sürekli ya da kesiklidir.`,
  olcme: 'Sınıflama: sıra yok. Sıralama: sıra var, farklar anlamsız. Eşit aralıklı: farklar anlamlı, sıfır yokluk değil (°C). Oranlama: sıfır mutlak yokluk (boy, ağırlık).',
  ortalama: R`$\bar{x} = \sum x_i / n$. Sabit eklemek ortalamayı aynı miktar kaydırır, sabitle çarpmak ortalamayı çarpar. Birleşik ortalamada toplamlar toplanır: $\frac{n_A\bar{x}_A + n_B\bar{x}_B}{n_A + n_B}$.`,
  'medyan-mod': 'Medyan için önce sırala; n tekse ortadaki, n çiftse ortadaki iki değerin ortalaması. Mod en sık tekrar eden değerdir ve nitel veride de bulunur. Aykırı değer varsa medyan daha iyi temsil eder.',
  yayilim: R`Açıklık = en büyük − en küçük. $Q_1$ alt yarının, $Q_3$ üst yarının medyanı; $IQR = Q_3 - Q_1$, çeyrek ayrılış $= IQR/2$.`,
  varyans: R`Örneklemde $s^2 = \frac{\sum (x_i-\bar{x})^2}{n-1}$, yığında $\sigma^2 = \frac{\sum (x_i-\mu)^2}{N}$. Sabit eklemek varyansı değiştirmez; $c$ ile çarpmak varyansı $c^2$ ile çarpar. $D.K. = \frac{s}{\bar{x}}\cdot 100$.`,
  'tablo-grafik': R`Histogram nicel veri içindir, çubukları bitişiktir; çubuk ve pasta grafiği nitel veri içindir. Kutu grafiğinde sınırlar $Q_1 - 1.5\cdot IQR$ ve $Q_3 + 1.5\cdot IQR$.`,
  korelasyon: R`$-1 \le r \le 1$. İşaret yönü, mutlak değer gücü gösterir. $r = 0$ doğrusal ilişki yok demektir.`,
  sayma: R`Sıra önemliyse permütasyon $\frac{n!}{(n-r)!}$, değilse kombinasyon $\frac{n!}{r!(n-r)!}$. Aynı harfler varsa $n!$, tekrar sayılarının faktöriyellerine bölünür.`,
  kume: 'Kesişim = ortak elemanlar (ve), birleşim = en az birinde olanlar (veya), tümleyen = A dışındakiler (değil). Ayrık kümelerin kesişimi boştur.',
  olasilik: R`$P(A) = \frac{\text{uygun}}{\text{tum}}$, $0 \le P(A) \le 1$. $P(\bar{A}) = 1 - P(A)$, $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.`,
  kosullu: R`$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$: koşul paydaya gider. Çarpım kuralı $P(A\cap B) = P(A)\,P(B\mid A)$; iadesiz çekilişte ikinci kesrin payı ve paydası azalır.`,
  bagimsiz: R`Bağımsızlık testi: $P(A\cap B) = P(A)\,P(B)$ mi? Ayrık olaylarda $P(A\cap B) = 0$; olasılıkları sıfırdan büyük ayrık olaylar bağımsız değildir.`,
  bayes: R`Önce toplam olasılık: $P(A) = \sum P(A\mid B_i)\,P(B_i)$. Sonra istenen dalı buna böl: $P(B_i\mid A) = \frac{P(A\mid B_i)\,P(B_i)}{P(A)}$.`
};
})();
