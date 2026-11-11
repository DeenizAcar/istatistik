/* Veritabanı Teknolojileri · konu özetleri. tools/build.py ile üretildi, elle düzenleme. */
window.COURSE = {
 "id": "veritabani",
 "lang": "sql",
 "storeKey": "veritabani-best",
 "themeKey": "veritabani-theme",
 "date": "27.07",
 "reviewTitle": "Genel Tekrar",
 "reviewLead": "Hocanın 4 haftalık notu (giriş, ER, DDL, INSERT), **Festival planlama sorusu** ve çalışma kitapçığından 10 konu. Her konuda kısa özet, tablo, SQL örneği, **Tuzak** ve **Sınavda** kutuları var. SQL çıktıları sqlite ile çalıştırılarak yazıldı.",
 "formatTitle": "Vize formatı (varsayım)",
 "formatNote": "Hoca puan dağılımını vermedi. Burada **20 soru × 5 puan** varsayıldı: 16 çoktan seçmeli + 4 boşluk doldurma. Hoca formatı söylerse güncellenir.",
 "hocaLink": {
  "href": "#test/hoca",
  "text": "Kitapçığın 50 sorusunu çöz →"
 },
 "hocaTitle": "Çalışma kitapçığı",
 "hocaNote": "Kitapçık hocanın değil; hocanın notuna dayanan ek çalışma içeriği (hocanın kesin sınav soruları değil). Her soru anında kontrol edilir.",
 "points": {
  "mc": 5,
  "fill": 5,
  "code": 5
 },
 "randomMix": [
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "mc",
  "fill",
  "fill",
  "fill",
  "fill",
  "code",
  "code"
 ],
 "randomTitle": "Rastgele vize (20 soru)",
 "randomDesc": "Her açılışta 14 test + 4 boşluk + 2 kod tamamlama, 100 puan. Az gördüğün sorular önce gelir.",
 "codeDesc": "Festival tabloları, kayıt ara tablosu, çoklu INSERT ve sanatçı–festival JOIN. Anında kontrol.",
 "testLead": "Soru bankası: kitapçığın **50 sorusu** + **135 konu sorusu** (test, boşluk doldurma, kod tamamlama). Deneme ve rastgele vizeler 20 soru × 5 puan. Sorgu sonucu soran her soru **sqlite ile çalıştırılarak** doğrulandı.",
 "trapsLead": "Yanlış şıkların çoğu bu tuzaklardan geliyor."
};
window.EXAM_FORMAT = [
 {
  "range": "Soru 1–16",
  "what": "Çoktan seçmeli",
  "big": "80",
  "small": "puan (16 × 5)"
 },
 {
  "range": "Soru 17–20",
  "what": "Boşluk doldurma",
  "big": "20",
  "small": "puan (4 × 5)"
 }
];
window.TRAPS = [
 {
  "t": "Veri ham, bilgi işlenmiş. \"85\" veri; \"Ali'nin notu 85\" bilgi.",
  "topic": "giris"
 },
 {
  "t": "Excel veritabanı değildir; eş zamanlı erişim, bütünlük ve güvenlikte yetersiz kalır.",
  "topic": "giris"
 },
 {
  "t": "MySQL = DBMS (motor), phpMyAdmin/HeidiSQL = arayüz, SQL = dil.",
  "topic": "dbms"
 },
 {
  "t": "Kredi kartı = Velocity, bileklik nabız 200 = Veracity, YouTube = Volume, Spotify = Value.",
  "topic": "buyukveri"
 },
 {
  "t": "ER'de ilişki = elmas/baklava, varlık = dikdörtgen, öznitelik = elips, PK = altı çizili.",
  "topic": "er"
 },
 {
  "t": "\"Birden fazla olabilir mi?\" iki yönde evet → N:N, tek yönde → 1:N.",
  "topic": "er"
 },
 {
  "t": "Festival–Sanatçı hocanın varsayımıyla 1:N; \"gerçek dünyada\" denirse N:N.",
  "topic": "festival"
 },
 {
  "t": "Sanatçı–Sahne M:N (= N:N) → ara tablo ÇIKAR (SANATCI_ID, SAHNE_ID).",
  "topic": "festival"
 },
 {
  "t": "1:N'de FK \"çok\" tarafına konur: SANATCI.FESTIVAL_ID, ogrenci.bolum_id.",
  "topic": "anahtar"
 },
 {
  "t": "PRIMARY KEY = benzersiz + NULL olamaz. UNIQUE sadece tekrar engeller.",
  "topic": "anahtar"
 },
 {
  "t": "Önce ana (parent) tablo, sonra FK taşıyan (child) tablo oluşturulur: bolum → ogrenci → ders → ogretim_elemani → kayit.",
  "topic": "ddl"
 },
 {
  "t": "DELETE satır siler (WHERE alır), TRUNCATE tüm satırları boşaltır (yapı kalır), DROP tabloyu siler.",
  "topic": "ddl"
 },
 {
  "t": "VARCHAR(100) en fazla 100 karakter; DECIMAL(10,2) toplam 10 basamak, 2'si ondalık.",
  "topic": "ddl"
 },
 {
  "t": "INSERT'te değer verilmeyen sütun DEFAULT'u, DEFAULT yoksa NULL'u alır.",
  "topic": "insert"
 },
 {
  "t": "UPDATE/DELETE'te WHERE unutulursa bütün satırlar etkilenir.",
  "topic": "insert"
 },
 {
  "t": "NULL kontrolü `IS NULL` ile; `= NULL` hiçbir satır getirmez. COUNT(*) NULL satırı sayar, COUNT(sütun) saymaz.",
  "topic": "sorgu"
 },
 {
  "t": "LIKE: `%` sıfır ya da çok karakter, `_` tam bir karakter. BETWEEN sınırları dahil eder.",
  "topic": "sorgu"
 },
 {
  "t": "WHERE satırları, HAVING grupları filtreler.",
  "topic": "sorgu"
 },
 {
  "t": "GRANT/REVOKE = DCL, COMMIT/ROLLBACK = TCL, CREATE/ALTER/DROP/TRUNCATE = DDL.",
  "topic": "gruplar"
 }
];
window.TOPICS = [
 {
  "id": "giris",
  "title": "Veri, bilgi ve veritabanı",
  "src": "Hafta 1 notu · Kitapçık 01, 03",
  "blocks": [
   {
    "t": "p",
    "text": "**Veri (data):** işlenmemiş, ham, tek başına anlam taşımayan rakam, sözcük ya da ölçüm. **Bilgi (information):** verinin işlenip anlamlı ve karar verilebilir hâle gelmiş biçimi. Veri ham madde, bilgi ürün."
   },
   {
    "t": "table",
    "head": [
     "",
     "Hocanın örneği",
     "Neden"
    ],
    "rows": [
     [
      "Veri",
      "\"85\", \"Ali\"",
      "85 not mu, sıcaklık mı, para mı belli değil"
     ],
     [
      "Bilgi",
      "\"Ali'nin Veritabanı Teknolojileri sınavından aldığı not 85'tir.\"",
      "Ham veriler anlamlı bir cümleye dönüştü"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**Veritabanı (database):** birbiriyle ilişkili verilerin düzenli biçimde depolandığı, yönetildiği, güncellendiği ve arandığı elektronik ortam. Hoca \"dijital kütüphane\" diyor. **Veri bütünlüğü (data integrity):** verilerin tutarlı, doğru ve güvenilir olmasını sağlayan kurallar."
   },
   {
    "t": "trap",
    "text": "**Excel veritabanı değildir.** Küçük listeler ve kişisel hesaplar için iyidir; binlerce kullanıcı aynı anda veri girince, veri bütünlüğü ve hızlı arama gerekince yetersiz kalır."
   },
   {
    "t": "p",
    "text": "**Hocanın senaryosu:** 5.000 öğrencili bir üniversite tüm öğrenci işlerini tek bir `ogrenciler.xlsx` dosyasında tutuyor."
   },
   {
    "t": "table",
    "head": [
     "Soru",
     "Ortaya çıkan sorun"
    ],
    "rows": [
     [
      "Aynı anda 50 personel dosyayı güncellemek isterse?",
      "Kilitlenme ve veri kaybı (eş zamanlı erişim)"
     ],
     [
      "Bölüm değişince 5 yerden biri unutulursa?",
      "Veri tutarsızlığı"
     ],
     [
      "Yetkisiz bir stajyer tüm notları silerse?",
      "Güvenlik eksikliği"
     ],
     [
      "Sabit disk bozulursa?",
      "Yedekleme eksikliği"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**Dosya tabanlı sistemler** (ogrenciler.txt, notlar.dat, personel.csv): her program kendi dosyasını yönetir. 6 sorun doğurur:"
   },
   {
    "t": "table",
    "head": [
     "Sorun",
     "Kısa örnek"
    ],
    "rows": [
     [
      "1. Veri tekrarı (redundancy)",
      "Adres hem öğrenci hem yurt dosyasında"
     ],
     [
      "2. Veri tutarsızlığı (inconsistency)",
      "Adres bir dosyada güncellenip diğerinde unutulur"
     ],
     [
      "3. Güncelleme zorluğu",
      "Veri dağınık; değişiklik zahmetli ve hataya açık"
     ],
     [
      "4. Eş zamanlı erişim (concurrency)",
      "Son kaydeden diğerinin üstüne yazar"
     ],
     [
      "5. Güvenlik ve yetkilendirme eksikliği",
      "Dosya ya herkese açık ya tamamen kapalı"
     ],
     [
      "6. Yedekleme ve kurtarma zorluğu",
      "Çökünce tutarlı geri dönmek zor"
     ]
    ]
   },
   {
    "t": "tip",
    "text": "Tutarsızlık **tekrardan** doğar: aynı veri iki yerde olmasa çelişki de olmaz. Sınavda örnek verip \"hangi sorun?\" diye sorulabilir."
   },
   {
    "t": "p",
    "text": "**Kullanım alanları:** üniversite (öğrenci, ders kaydı, not), banka (müşteri → hesap → işlem → bakiye), e-ticaret (ürün, stok, sepet, sipariş), sosyal medya (profil, beğeni, takipçi), hastane (HBYS: hasta geçmişi, randevu, tahlil)."
   }
  ]
 },
 {
  "id": "dbms",
  "title": "DBMS, araçlar ve veritabanı türleri",
  "src": "Hafta 1 ve 4 notu · Kitapçık 02–04",
  "blocks": [
   {
    "t": "p",
    "text": "**DBMS (Database Management System, VTYS):** veritabanını oluşturan, saklayan, güncelleyen, sorgulayan ve güvenliğini sağlayan yazılım. Hocanın benzetmesi: veritabanı kilitli **depo**, DBMS deponun anahtarlarını yöneten **güvenlik ve yönetim ekibi**."
   },
   {
    "t": "table",
    "head": [
     "Ad",
     "Nedir",
     "Not"
    ],
    "rows": [
     [
      "MySQL",
      "**DBMS** (veritabanı motoru)",
      "Arka planda çalışır, komut satırıyla; bu derste kullanılıyor"
     ],
     [
      "phpMyAdmin",
      "**Arayüz (GUI)**, web",
      "Tarayıcıdan tıklayarak yönetim; \"SQL\" sekmesi var"
     ],
     [
      "HeidiSQL",
      "**Arayüz (GUI)**, masaüstü",
      "MySQL vb. için alternatif araç"
     ],
     [
      "SQL",
      "**Dil**",
      "DBMS ile konuşmak için kullanılan sorgu dili"
     ]
    ]
   },
   {
    "t": "trap",
    "text": "MySQL ile phpMyAdmin aynı şey değildir: MySQL motor, phpMyAdmin onu yöneten arayüz. SQL de bir DBMS değil, **dildir**."
   },
   {
    "t": "p",
    "text": "**DBMS örnekleri:** MySQL (açık kaynak), PostgreSQL (açık kaynak, gelişmiş), Microsoft SQL Server, Oracle Database. Kitapçık SQLite'ı da sayar."
   },
   {
    "t": "table",
    "head": [
     "Kavram",
     "Tanım"
    ],
    "rows": [
     [
      "Tablo",
      "Aynı konuya ait satır ve sütunlardan oluşan yapı"
     ],
     [
      "Satır / kayıt (row)",
      "Bir nesnenin tek kaydı, ör. bir öğrencinin bütün bilgileri"
     ],
     [
      "Sütun / alan (column)",
      "Kayıtların bir özelliği, ör. `ad`, `yas`"
     ],
     [
      "Şema (schema)",
      "Veritabanının mantıksal yapısı ve tanımları"
     ],
     [
      "Sorgu (query)",
      "Veri istemek ya da veri üzerinde işlem yapmak için gönderilen komut"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**İlişkisel (RDBMS):** veriler satır-sütun tablolarında tutulur, tablolar birbirine bağlanır (MySQL, Oracle, SQL Server). **NoSQL (Not Only SQL):** tablo zorunluluğu yok; doküman, anahtar-değer ya da grafik gibi esnek modeller (MongoDB)."
   },
   {
    "t": "table",
    "head": [
     "ogrenci_id",
     "adsoyad",
     "bolum"
    ],
    "rows": [
     [
      "1",
      "Ali Yılmaz",
      "Bilgisayar Programcılığı"
     ],
     [
      "2",
      "Ayşe Demir",
      "Büyük Veri"
     ]
    ]
   },
   {
    "t": "code",
    "code": "-- Aynı öğrenci MongoDB'de (JSON doküman):\n{\n  \"ogrenci_id\": 1,\n  \"adsoyad\": \"Ali Yılmaz\",\n  \"bolum\": \"Bilgisayar Programcılığı\",\n  \"ilgi_alanlari\": [\"Veritabanı\", \"Python\"]\n}"
   },
   {
    "t": "p",
    "text": "**Tarihsel gelişim:**"
   },
   {
    "t": "table",
    "head": [
     "Dönem",
     "Yaklaşım"
    ],
    "rows": [
     [
      "1960'lar öncesi",
      "Dosya tabanlı sistemler (tekrar ve tutarsızlık dorukta)"
     ],
     [
      "1960–1970'ler",
      "Hiyerarşik ve ağ veritabanları (ağaç yapısı)"
     ],
     [
      "1970–2000'ler",
      "İlişkisel veritabanları: **Edgar F. Codd** kuramsal temeli attı; SQL ile yönetim"
     ],
     [
      "2000'ler sonrası",
      "Web ölçeği ve **NoSQL** (MongoDB vb.)"
     ],
     [
      "Günümüz",
      "Bulut ve dağıtık veri sistemleri"
     ]
    ]
   },
   {
    "t": "tip",
    "text": "\"İlişkisel modelin kuramsal temelini kim attı?\" → **Edgar F. Codd**. \"MySQL nedir?\" → DBMS. \"phpMyAdmin nedir?\" → arayüz."
   }
  ]
 },
 {
  "id": "buyukveri",
  "title": "Büyük veri ve 5V",
  "src": "Hafta 1 notu",
  "blocks": [
   {
    "t": "p",
    "text": "**Büyük veri (Big Data):** geleneksel veritabanlarının işleyemeyeceği kadar büyük, hızlı akan ve çeşitli veri yığını. Sadece \"çok veri\" demek değildir; 5 özelliği (5V) vardır."
   },
   {
    "t": "table",
    "head": [
     "V",
     "Anlamı",
     "Hocanın örneği"
    ],
    "rows": [
     [
      "**Volume**",
      "Hacim (TB, PB, EB)",
      "YouTube'a her dakika yüzlerce saatlik video; Instagram'da her gün milyarlarca fotoğraf"
     ],
     [
      "**Velocity**",
      "Hız: anlık üretilir, anlık işlenir",
      "Kredi kartı dolandırıcılık tespiti, saniyenin onda birinde"
     ],
     [
      "**Variety**",
      "Çeşitlilik: farklı formatlar",
      "Fotoğraf, video, ses, tweet, GPS logu (yapısal olmayan veri)"
     ],
     [
      "**Veracity**",
      "Doğruluk / güvenilirlik",
      "Akıllı bileklik: kolunu salladığı için nabız 200 görünen hasta (kirli/gürültülü veri)"
     ],
     [
      "**Value**",
      "Değer: veriden anlam çıkarmak",
      "Spotify dinleme verisinden \"Haftalık Keşif\" listesi"
     ]
    ]
   },
   {
    "t": "trap",
    "text": "Veracity \"hız\" değildir. **Kredi kartı = Velocity**, **bileklik nabız 200 = Veracity**, **YouTube = Volume**, **Spotify = Value**."
   },
   {
    "t": "p",
    "text": "**Geleneksel veritabanı ile ilişkisi:** 5.000 öğrencili üniversite için MySQL doğru tercih. Ama dünyadaki tüm telefonların anlık konumunu ya da saniyede milyonlarca finansal işlemi tek bir geleneksel veritabanına yazmaya çalışırsan sistem kilitlenir. Bunun için **Hadoop, Spark** gibi büyük veri teknolojileri kullanılır."
   },
   {
    "t": "tip",
    "text": "İkisi rakip değil, **tamamlayıcıdır**: geleneksel veritabanları kurumsal uygulamaların kalbi, büyük veri teknolojileri aşırı büyük ve dağınık veri için. **Ölçeklenebilirlik (scalability):** veri ve kullanıcı arttıkça sistemin büyüyebilme kapasitesi."
   },
   {
    "t": "p",
    "text": "**Dersin yol haritası:** Veri → Veritabanı → DBMS → SQL → NoSQL → Veri Ambarı → Büyük Veri → Hadoop/Spark."
   }
  ]
 },
 {
  "id": "er",
  "title": "Veri modeli ve ER diyagramı",
  "src": "Hafta 2 notu · Kitapçık 01–02",
  "blocks": [
   {
    "t": "p",
    "text": "**Veri modeli:** gerçek dünyadaki verilerin yapısını, özelliklerini ve ilişkilerini mantıksal olarak gösteren taslak. Hoca: veri modeli veritabanının **mimari projesidir**; plansız tablo kurmak projesiz bina dikmektir. **Soyutlama:** karmaşık gerçek hayatı gereksiz detaylardan arındırma."
   },
   {
    "t": "p",
    "text": "**Dönüşüm zinciri:** Gerçek Dünya → Kavramsal Model → ER Diyagramı → İlişkisel Model → Tablolar / SQL. **Kavramsal model** teknolojiden (MySQL, Oracle, MongoDB) bağımsızdır."
   },
   {
    "t": "table",
    "head": [
     "Kavram",
     "Tanım",
     "Örnek"
    ],
    "rows": [
     [
      "Varlık (entity)",
      "Hakkında veri tutulan nesne, kişi, yer, kavram",
      "Öğrenci, Kitap, Ders, Sipariş"
     ],
     [
      "Varlık türü / örneği",
      "Genel ad / somut birey",
      "Öğrenci / Ali Yılmaz"
     ],
     [
      "Öznitelik (attribute)",
      "Varlığın özelliği; tek başına varlık olamaz",
      "öğrenci_no, ad, soyad, eposta"
     ],
     [
      "İlişki (relationship)",
      "Varlıklar arasındaki anlamlı bağ",
      "Öğrenci ders **alır**"
     ],
     [
      "Birincil anahtar (PK)",
      "Her kaydı benzersiz tanımlar, boş olamaz",
      "öğrenci_no, tc_kimlik_no, ders_kodu"
     ]
    ]
   },
   {
    "t": "svg",
    "svg": "<svg viewBox=\"0 0 620 110\" role=\"img\" aria-label=\"ER sembolleri\" xmlns=\"http://www.w3.org/2000/svg\"><rect class=\"en\" x=\"20\" y=\"22\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"72\" y=\"46\">Varlık</text><ellipse class=\"at\" cx=\"200\" cy=\"41\" rx=\"41\" ry=\"15\"/><text class=\"tx\" x=\"200\" y=\"45\">Öznitelik</text><polygon class=\"rel\" points=\"282,41 332,13 382,41 332,69\"/><text class=\"tx b\" x=\"332\" y=\"45\">İlişki</text><ellipse class=\"at\" cx=\"450\" cy=\"41\" rx=\"45\" ry=\"15\"/><text class=\"tx\" x=\"450\" y=\"45\">ogrenci_no</text><line class=\"pk\" x1=\"418\" y1=\"48\" x2=\"482\" y2=\"48\"/><text class=\"cd\" x=\"560\" y=\"47\">1 · N</text><text class=\"tx m\" x=\"72\" y=\"96\">Dikdörtgen</text><text class=\"tx m\" x=\"200\" y=\"96\">Elips</text><text class=\"tx m\" x=\"332\" y=\"96\">Elmas (baklava)</text><text class=\"tx m\" x=\"450\" y=\"96\">Altı çizili = PK</text><text class=\"tx m\" x=\"560\" y=\"96\">Kardinalite</text></svg>",
    "cap": "ER sembolleri: dikdörtgen varlık, elips öznitelik, elmas ilişki, altı çizili öznitelik birincil anahtar."
   },
   {
    "t": "trap",
    "text": "İlişkinin sembolü **elmas / baklava (eşkenar dörtgen)**. Paralelkenar değil, elips değil. Elips = öznitelik, dikdörtgen = varlık."
   },
   {
    "t": "p",
    "text": "**İlişki türleri (kardinalite):**"
   },
   {
    "t": "table",
    "head": [
     "Tür",
     "Anlamı",
     "Örnek"
    ],
    "rows": [
     [
      "1:1",
      "İki taraf da tek",
      "Kişi – Pasaport; kişi – dolap"
     ],
     [
      "1:N",
      "Bir taraf çok, diğeri tek",
      "Bölüm – Öğrenci"
     ],
     [
      "N:N",
      "İki taraf da çok",
      "Öğrenci – Ders"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**\"Birden fazla … olabilir mi?\" yöntemi:** önce ilişkiye ad ver ve iki yönde önerme kur (\"Bölümde öğrenciler okur\", \"Öğrenciler bölümlerde okur\"). Sonra iki soru sor:"
   },
   {
    "t": "table",
    "head": [
     "Soru",
     "Cevap",
     "Sonuç"
    ],
    "rows": [
     [
      "Bir bölümde birden fazla öğrenci okuyabilir mi?",
      "Evet",
      "Öğrenci tarafı **N**"
     ],
     [
      "Bir öğrenci birden fazla bölümde okuyabilir mi?",
      "Hayır",
      "Bölüm tarafı **1**"
     ],
     [
      "Bir öğrenci birden fazla ders alabilir mi?",
      "Evet",
      "Ders tarafı **N**"
     ],
     [
      "Bir dersi birden fazla öğrenci alabilir mi?",
      "Evet",
      "Öğrenci tarafı **N**"
     ]
    ]
   },
   {
    "t": "svg",
    "svg": "<svg viewBox=\"0 0 620 216\" role=\"img\" aria-label=\"Bölüm 1 Okur N Öğrenci\" xmlns=\"http://www.w3.org/2000/svg\"><line class=\"ln\" x1=\"67\" y1=\"49\" x2=\"98\" y2=\"91\"/><ellipse class=\"at\" cx=\"67\" cy=\"34\" rx=\"45\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"38\">Bölüm_kodu</text><line class=\"pk\" x1=\"35\" y1=\"41\" x2=\"99\" y2=\"41\"/><line class=\"ln\" x1=\"183\" y1=\"49\" x2=\"151\" y2=\"91\"/><ellipse class=\"at\" cx=\"183\" cy=\"34\" rx=\"41\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"38\">Bölüm_adı</text><line class=\"ln\" x1=\"437\" y1=\"49\" x2=\"468\" y2=\"91\"/><ellipse class=\"at\" cx=\"437\" cy=\"34\" rx=\"45\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"38\">Öğrenci_No</text><line class=\"pk\" x1=\"405\" y1=\"41\" x2=\"469\" y2=\"41\"/><line class=\"ln\" x1=\"553\" y1=\"49\" x2=\"521\" y2=\"91\"/><ellipse class=\"at\" cx=\"553\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"38\">Ad</text><line class=\"ln\" x1=\"437\" y1=\"171\" x2=\"468\" y2=\"129\"/><ellipse class=\"at\" cx=\"437\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"190\">Soyad</text><line class=\"ln\" x1=\"553\" y1=\"171\" x2=\"521\" y2=\"129\"/><ellipse class=\"at\" cx=\"553\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"190\">EPosta</text><line class=\"ln\" x1=\"177\" y1=\"110\" x2=\"252\" y2=\"110\"/><line class=\"ln\" x1=\"368\" y1=\"110\" x2=\"443\" y2=\"110\"/><rect class=\"en\" x=\"73\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"125\" y=\"115\">Bölüm</text><rect class=\"en\" x=\"443\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"495\" y=\"115\">Öğrenci</text><polygon class=\"rel\" points=\"252,110 310,80 368,110 310,140\"/><text class=\"tx b\" x=\"310\" y=\"115\">Okur</text><text class=\"cd\" x=\"191\" y=\"102\">1</text><text class=\"cd\" x=\"429\" y=\"102\">N</text></svg>",
    "cap": "Bölüm (1) — Okur — Öğrenci (N): bir bölümde çok öğrenci, her öğrenci tek bölümde."
   },
   {
    "t": "svg",
    "svg": "<svg viewBox=\"0 0 620 216\" role=\"img\" aria-label=\"Öğrenci N Alır N Ders\" xmlns=\"http://www.w3.org/2000/svg\"><line class=\"ln\" x1=\"67\" y1=\"49\" x2=\"98\" y2=\"91\"/><ellipse class=\"at\" cx=\"67\" cy=\"34\" rx=\"45\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"38\">Öğrenci_No</text><line class=\"pk\" x1=\"35\" y1=\"41\" x2=\"99\" y2=\"41\"/><line class=\"ln\" x1=\"183\" y1=\"49\" x2=\"151\" y2=\"91\"/><ellipse class=\"at\" cx=\"183\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"38\">Ad</text><line class=\"ln\" x1=\"67\" y1=\"171\" x2=\"98\" y2=\"129\"/><ellipse class=\"at\" cx=\"67\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"190\">Soyad</text><line class=\"ln\" x1=\"183\" y1=\"171\" x2=\"151\" y2=\"129\"/><ellipse class=\"at\" cx=\"183\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"190\">EPosta</text><line class=\"ln\" x1=\"437\" y1=\"49\" x2=\"468\" y2=\"91\"/><ellipse class=\"at\" cx=\"437\" cy=\"34\" rx=\"41\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"38\">Ders_Kodu</text><line class=\"pk\" x1=\"408\" y1=\"41\" x2=\"465\" y2=\"41\"/><line class=\"ln\" x1=\"553\" y1=\"49\" x2=\"521\" y2=\"91\"/><ellipse class=\"at\" cx=\"553\" cy=\"34\" rx=\"38\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"38\">Ders Adı</text><line class=\"ln\" x1=\"495\" y1=\"171\" x2=\"495\" y2=\"129\"/><ellipse class=\"at\" cx=\"495\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"495\" y=\"190\">Kredi</text><line class=\"ln\" x1=\"177\" y1=\"110\" x2=\"252\" y2=\"110\"/><line class=\"ln\" x1=\"368\" y1=\"110\" x2=\"443\" y2=\"110\"/><rect class=\"en\" x=\"73\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"125\" y=\"115\">Öğrenci</text><rect class=\"en\" x=\"443\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"495\" y=\"115\">Ders</text><polygon class=\"rel\" points=\"252,110 310,80 368,110 310,140\"/><text class=\"tx b\" x=\"310\" y=\"115\">Alır</text><text class=\"cd\" x=\"191\" y=\"102\">N</text><text class=\"cd\" x=\"429\" y=\"102\">N</text></svg>",
    "cap": "Öğrenci (N) — Alır — Ders (N): çoka çok. Tabloya geçerken ara tabloya dönüşür."
   },
   {
    "t": "tip",
    "text": "İki yönde de \"evet\" → N:N. Tek yönde \"evet\" → 1:N (evet denen taraf N). İkisi de \"hayır\" → 1:1. Kardinalite harfi, **sayısı sorulan varlığın** yanına yazılır."
   }
  ]
 },
 {
  "id": "festival",
  "title": "Festival planlama (hocanın sorusu)",
  "src": "FestivalPlanlama.pdf · Kitapçık 07, 08, 46",
  "blocks": [
   {
    "t": "p",
    "text": "**Soru:** Müzik Festivali Planlama Sistemi: Festival, Sanatçı, Sahne. (Hangi festivalde, hangi sanatçı, hangi sahnede sahne aldı?)"
   },
   {
    "t": "table",
    "head": [
     "Varlık",
     "Öznitelikler (ID = PK)"
    ],
    "rows": [
     [
      "FESTİVAL",
      "ID, ADI, TARİHİ, ADRES_İL"
     ],
     [
      "SANATCI",
      "ID, ADI, SANAT TÜRÜ"
     ],
     [
      "SAHNE",
      "ID, ADI, TARİH, ADRES"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**1. ilişki: Festival – Sanatçı.** Önermeler: \"Festivale sanatçılar katılır\", \"Sanatçılar festivale katılır\". Bir festivale birden fazla sanatçı katılabilir mi? **Evet.** Bir sanatçı birden fazla festivale katılabilir mi? Hoca: \"Aynı saat ve gündeki festival olduğunu farz ederek **1-N** ilişki kuruyoruz.\""
   },
   {
    "t": "svg",
    "svg": "<svg viewBox=\"0 0 620 216\" role=\"img\" aria-label=\"FESTİVAL 1 katılır N SANATCI\" xmlns=\"http://www.w3.org/2000/svg\"><line class=\"ln\" x1=\"67\" y1=\"49\" x2=\"98\" y2=\"91\"/><ellipse class=\"at\" cx=\"67\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"38\">ID</text><line class=\"pk\" x1=\"60\" y1=\"41\" x2=\"73\" y2=\"41\"/><line class=\"ln\" x1=\"183\" y1=\"49\" x2=\"151\" y2=\"91\"/><ellipse class=\"at\" cx=\"183\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"38\">ADI</text><line class=\"ln\" x1=\"67\" y1=\"171\" x2=\"98\" y2=\"129\"/><ellipse class=\"at\" cx=\"67\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"190\">TARİHİ</text><line class=\"ln\" x1=\"183\" y1=\"171\" x2=\"151\" y2=\"129\"/><ellipse class=\"at\" cx=\"183\" cy=\"186\" rx=\"38\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"190\">ADRES_İL</text><line class=\"ln\" x1=\"437\" y1=\"49\" x2=\"468\" y2=\"91\"/><ellipse class=\"at\" cx=\"437\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"38\">ID</text><line class=\"pk\" x1=\"430\" y1=\"41\" x2=\"443\" y2=\"41\"/><line class=\"ln\" x1=\"553\" y1=\"49\" x2=\"521\" y2=\"91\"/><ellipse class=\"at\" cx=\"553\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"38\">ADI</text><line class=\"ln\" x1=\"495\" y1=\"171\" x2=\"495\" y2=\"129\"/><ellipse class=\"at\" cx=\"495\" cy=\"186\" rx=\"45\" ry=\"15\"/><ellipse class=\"at2\" cx=\"495\" cy=\"186\" rx=\"41\" ry=\"11\"/><text class=\"tx\" x=\"495\" y=\"190\">SANAT TÜRÜ</text><line class=\"ln\" x1=\"177\" y1=\"110\" x2=\"252\" y2=\"110\"/><line class=\"ln\" x1=\"368\" y1=\"110\" x2=\"443\" y2=\"110\"/><rect class=\"en\" x=\"73\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"125\" y=\"115\">FESTİVAL</text><rect class=\"en\" x=\"443\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"495\" y=\"115\">SANATCI</text><polygon class=\"rel\" points=\"252,110 310,80 368,110 310,140\"/><text class=\"tx b\" x=\"310\" y=\"115\">katılır</text><text class=\"cd\" x=\"191\" y=\"102\">1</text><text class=\"cd\" x=\"429\" y=\"102\">N</text></svg>",
    "cap": "FESTİVAL (1) — katılır — SANATCI (N). Hocanın çiziminde SANAT TÜRÜ çift elipsle çizilmiş."
   },
   {
    "t": "trap",
    "text": "Gerçek hayatta bir sanatçı birçok festivale katılabilir, yani **N:N** olurdu. Ama hoca \"aynı saat ve gün\" varsayımıyla **1:N** kurdu. Soruda verilen varsayıma uy. Soru \"gerçek dünyada\" derse (Kitapçık 46) cevap N:N."
   },
   {
    "t": "p",
    "text": "**2. ilişki: Sanatçı – Sahne.** Önermeler: \"Sanatçı sahneye çıkar\", \"Sahneye sanatçı çıkar\". Bir sanatçı birden fazla sahneye çıkabilir mi? **Evet.** Bir sahneye birden fazla sanatçı çıkabilir mi? **Evet.** → **çoka çok**."
   },
   {
    "t": "svg",
    "svg": "<svg viewBox=\"0 0 620 216\" role=\"img\" aria-label=\"SANATCI M çıkar N SAHNE\" xmlns=\"http://www.w3.org/2000/svg\"><line class=\"ln\" x1=\"67\" y1=\"49\" x2=\"98\" y2=\"91\"/><ellipse class=\"at\" cx=\"67\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"67\" y=\"38\">ID</text><line class=\"pk\" x1=\"60\" y1=\"41\" x2=\"73\" y2=\"41\"/><line class=\"ln\" x1=\"183\" y1=\"49\" x2=\"151\" y2=\"91\"/><ellipse class=\"at\" cx=\"183\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"183\" y=\"38\">ADI</text><line class=\"ln\" x1=\"125\" y1=\"171\" x2=\"125\" y2=\"129\"/><ellipse class=\"at\" cx=\"125\" cy=\"186\" rx=\"45\" ry=\"15\"/><ellipse class=\"at2\" cx=\"125\" cy=\"186\" rx=\"41\" ry=\"11\"/><text class=\"tx\" x=\"125\" y=\"190\">SANAT TÜRÜ</text><line class=\"ln\" x1=\"437\" y1=\"49\" x2=\"468\" y2=\"91\"/><ellipse class=\"at\" cx=\"437\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"38\">ID</text><line class=\"pk\" x1=\"430\" y1=\"41\" x2=\"443\" y2=\"41\"/><line class=\"ln\" x1=\"553\" y1=\"49\" x2=\"521\" y2=\"91\"/><ellipse class=\"at\" cx=\"553\" cy=\"34\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"38\">ADI</text><line class=\"ln\" x1=\"437\" y1=\"171\" x2=\"468\" y2=\"129\"/><ellipse class=\"at\" cx=\"437\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"437\" y=\"190\">TARİH</text><line class=\"ln\" x1=\"553\" y1=\"171\" x2=\"521\" y2=\"129\"/><ellipse class=\"at\" cx=\"553\" cy=\"186\" rx=\"32\" ry=\"15\"/><text class=\"tx\" x=\"553\" y=\"190\">ADRES</text><line class=\"ln\" x1=\"177\" y1=\"110\" x2=\"252\" y2=\"110\"/><line class=\"ln\" x1=\"368\" y1=\"110\" x2=\"443\" y2=\"110\"/><rect class=\"en\" x=\"73\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"125\" y=\"115\">SANATCI</text><rect class=\"en\" x=\"443\" y=\"91\" width=\"104\" height=\"38\" rx=\"3\"/><text class=\"tx b\" x=\"495\" y=\"115\">SAHNE</text><polygon class=\"rel\" points=\"252,110 310,80 368,110 310,140\"/><text class=\"tx b\" x=\"310\" y=\"115\">çıkar</text><text class=\"cd\" x=\"191\" y=\"102\">M</text><text class=\"cd\" x=\"429\" y=\"102\">N</text></svg>",
    "cap": "SANATCI (M) — çıkar — SAHNE (N). Hoca M:N yazıyor; N:N ile aynı anlam."
   },
   {
    "t": "p",
    "text": "**Tablolara dönüşüm:** 1:N ilişkide \"çok\" taraf olan SANATCI tablosuna `FESTIVAL_ID (FK)` eklenir. M:N ilişki için ara tablo **ÇIKAR (ID, SANATCI_ID, SAHNE_ID)** kurulur. Hocanın örnek verileri:"
   },
   {
    "t": "table",
    "head": [
     "FESTİVAL: ID (PK)",
     "ADI",
     "TARİH",
     "ADRES_İL"
    ],
    "rows": [
     [
      "1",
      "ABC FESTİVALİ",
      "01.01.2000",
      "AFYON"
     ],
     [
      "2",
      "BCD FESTİVALİ",
      "02.02.2000",
      "BURDUR"
     ],
     [
      "3",
      "CDE FESTİVALİ",
      "03.03.3000",
      "MANİSA"
     ]
    ]
   },
   {
    "t": "table",
    "head": [
     "SANATCI: ID (PK)",
     "ADI",
     "SANAT TÜRÜ",
     "FESTIVAL_ID (FK)"
    ],
    "rows": [
     [
      "1",
      "AA AA",
      "POP",
      "1"
     ],
     [
      "2",
      "BB BB",
      "CAZ",
      "1"
     ],
     [
      "3",
      "CC CC",
      "ROCK",
      "2"
     ],
     [
      "4",
      "DD DD",
      "POP",
      "3"
     ]
    ]
   },
   {
    "t": "table",
    "head": [
     "SAHNE: ID (PK)",
     "ADI",
     "TARİH",
     "ADRES"
    ],
    "rows": [
     [
      "1",
      "POP RÜZGARI",
      "01.01.2000",
      "AFYON UZUN ÇARŞI"
     ],
     [
      "2",
      "DUAYENLERE SAYGI",
      "01.01.2000",
      "AFYON MİRİMOĞLU KONAĞI"
     ],
     [
      "3",
      "90'LAR",
      "01.01.2000",
      "AFYON AKÜ KONGRE MERKEZİ"
     ],
     [
      "4",
      "AKŞAM ESİNTİSİ",
      "02.02.2000",
      "BURDUR MERKEZ ÇARŞI"
     ],
     [
      "5",
      "SABAHIN GETİRDİKLERİ 1",
      "03.03.2000",
      "MANİSA GİRİŞ ÇARŞI"
     ],
     [
      "6",
      "SABAHIN GETİRDİKLERİ 2",
      "03.03.2000",
      "MANİSA ÇIKIŞ ÇARŞI"
     ]
    ]
   },
   {
    "t": "table",
    "head": [
     "ÇIKAR: ID (PK)",
     "SANATCI_ID (FK)",
     "SAHNE_ID (FK)"
    ],
    "rows": [
     [
      "1",
      "1",
      "1"
     ],
     [
      "2",
      "1",
      "3"
     ],
     [
      "3",
      "2",
      "1"
     ]
    ]
   },
   {
    "t": "low",
    "text": "PDF'te CDE festivalinin tarihi 03.03.3000 yazıyor; sahne tarihlerine bakınca 03.03.2000 olmalı. SQL örneklerinde 2000 kullanıldı."
   },
   {
    "t": "p",
    "text": "**Modelin SQL karşılığı** (önce bağımsız tablolar, sonra FK taşıyanlar):"
   },
   {
    "t": "code",
    "code": "CREATE TABLE festival (\n  id INT PRIMARY KEY,\n  adi VARCHAR(100) NOT NULL,\n  tarih DATE,\n  adres_il VARCHAR(50)\n);\nCREATE TABLE sanatci (\n  id INT PRIMARY KEY,\n  adi VARCHAR(100) NOT NULL,\n  sanat_turu VARCHAR(50),\n  festival_id INT,                                  -- 1:N → FK çok tarafında\n  FOREIGN KEY (festival_id) REFERENCES festival(id)\n);\nCREATE TABLE sahne (\n  id INT PRIMARY KEY,\n  adi VARCHAR(100) NOT NULL,\n  tarih DATE,\n  adres VARCHAR(150)\n);\nCREATE TABLE cikar (                                -- M:N → ara tablo\n  id INT PRIMARY KEY,\n  sanatci_id INT,\n  sahne_id INT,\n  FOREIGN KEY (sanatci_id) REFERENCES sanatci(id),\n  FOREIGN KEY (sahne_id) REFERENCES sahne(id)\n);"
   },
   {
    "t": "code",
    "code": "INSERT INTO festival VALUES\n  (1, 'ABC FESTİVALİ', '2000-01-01', 'AFYON'),\n  (2, 'BCD FESTİVALİ', '2000-02-02', 'BURDUR'),\n  (3, 'CDE FESTİVALİ', '2000-03-03', 'MANİSA');\nINSERT INTO sanatci VALUES\n  (1, 'AA AA', 'POP', 1), (2, 'BB BB', 'CAZ', 1),\n  (3, 'CC CC', 'ROCK', 2), (4, 'DD DD', 'POP', 3);\nINSERT INTO sahne VALUES\n  (1, 'POP RÜZGARI', '2000-01-01', 'AFYON UZUN ÇARŞI'),\n  (2, 'DUAYENLERE SAYGI', '2000-01-01', 'AFYON MİRİMOĞLU KONAĞI'),\n  (3, '90''LAR', '2000-01-01', 'AFYON AKÜ KONGRE MERKEZİ'),\n  (4, 'AKŞAM ESİNTİSİ', '2000-02-02', 'BURDUR MERKEZ ÇARŞI'),\n  (5, 'SABAHIN GETİRDİKLERİ 1', '2000-03-03', 'MANİSA GİRİŞ ÇARŞI'),\n  (6, 'SABAHIN GETİRDİKLERİ 2', '2000-03-03', 'MANİSA ÇIKIŞ ÇARŞI');\nINSERT INTO cikar VALUES (1, 1, 1), (2, 1, 3), (3, 2, 1);"
   },
   {
    "t": "p",
    "text": "Sorunun cevabı \"hangi festivalde, hangi sanatçı, hangi sahnede?\" tabloları birleştirerek okunur (JOIN, düşük öncelik):"
   },
   {
    "t": "code",
    "code": "SELECT festival.adi AS festival, sanatci.adi AS sanatci, sahne.adi AS sahne\nFROM cikar\nINNER JOIN sanatci  ON cikar.sanatci_id = sanatci.id\nINNER JOIN festival ON sanatci.festival_id = festival.id\nINNER JOIN sahne    ON cikar.sahne_id = sahne.id\nORDER BY cikar.id;",
    "out": "festival      | sanatci | sahne\n--------------+---------+------------\nABC FESTİVALİ | AA AA   | POP RÜZGARI\nABC FESTİVALİ | AA AA   | 90'LAR\nABC FESTİVALİ | BB BB   | POP RÜZGARI"
   },
   {
    "t": "tip",
    "text": "Sınavda: iki ilişkinin türü (1:N ve N:N/M:N), kardinalitenin yazıldığı taraf, FK'nin hangi tabloya gittiği (SANATCI) ve ara tablonun adı/sütunları (ÇIKAR: SANATCI_ID, SAHNE_ID)."
   }
  ]
 },
 {
  "id": "anahtar",
  "title": "Anahtarlar, kısıtlar, tabloya dönüşüm",
  "src": "Hafta 3–4 notu · Kitapçık 04",
  "blocks": [
   {
    "t": "table",
    "head": [
     "Kısıt / kavram",
     "Görevi",
     "İpucu"
    ],
    "rows": [
     [
      "PRIMARY KEY",
      "Satırı benzersiz tanımlar; **NULL olamaz**",
      "Kimlik kartı"
     ],
     [
      "FOREIGN KEY",
      "Başka tablodaki anahtara referans verir",
      "Tablolar arası bağ"
     ],
     [
      "NOT NULL",
      "Alanın boş bırakılmasını engeller",
      "Mutlaka değer"
     ],
     [
      "UNIQUE",
      "Değerlerin tekrarını engeller",
      "Aynı e-postayla iki hesap yok"
     ],
     [
      "DEFAULT",
      "Değer girilmezse varsayılanı yazar",
      "`aktif BOOLEAN DEFAULT TRUE`"
     ],
     [
      "CHECK",
      "Değer için koşul tanımlar",
      "`yas >= 0`"
     ],
     [
      "Bileşik anahtar",
      "Birden çok sütundan oluşan anahtar",
      "`PRIMARY KEY (ogrenci_id, ders_id)`"
     ],
     [
      "Aday anahtar",
      "Satırı tek başına tanımlayabilen minimal sütun kümesi",
      "PK adayı (TC no, e-posta)"
     ],
     [
      "Referans bütünlüğü",
      "FK hep var olan bir kayda işaret eder",
      "Yetim kayıt yok"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**Primary Key kuralları:** her kaydı benzersiz tanımlar, tekrar etmez, boş olamaz. İlk sütun olmak zorunda değildir; sayısal olmak zorunda da değildir (TC no, e-posta olabilir) ama pratikte genelde `INT` seçilir."
   },
   {
    "t": "p",
    "text": "**Foreign Key:** önce bağımlı olunan **ana tablo (parent)**, sonra ilişkiyi kuran **çocuk tablo (child)** oluşturulur. `bolum` tablosunda olmayan bir `bolum_id` ile öğrenci eklenmek istenirse veritabanı engeller (referans bütünlüğü)."
   },
   {
    "t": "code",
    "code": "-- 1. Önce ana tablo\nCREATE TABLE bolum (\n    bolum_id INT PRIMARY KEY,\n    bolum_adi VARCHAR(100) NOT NULL\n);\n-- 2. Sonra ilişkili tablo\nCREATE TABLE ogrenci (\n    ogrenci_id INT PRIMARY KEY,\n    ad VARCHAR(50) NOT NULL,\n    soyad VARCHAR(50) NOT NULL,\n    bolum_id INT,\n    FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)\n);"
   },
   {
    "t": "p",
    "text": "Kısıtların hepsi bir arada (hocanın örnek satırlarıyla):"
   },
   {
    "t": "code",
    "code": "CREATE TABLE uye (\n    uye_id INT PRIMARY KEY,\n    ad VARCHAR(50) NOT NULL,\n    eposta VARCHAR(150) UNIQUE,\n    aktif BOOLEAN DEFAULT TRUE,\n    yas INT CHECK (yas >= 0)\n);"
   },
   {
    "t": "p",
    "text": "**İlişkiyi tabloya dönüştürme:**"
   },
   {
    "t": "table",
    "head": [
     "İlişki",
     "Ne yapılır",
     "Örnek"
    ],
    "rows": [
     [
      "1:N",
      "\"Çok\" taraftaki tabloya FK eklenir",
      "`sanatci.festival_id`, `ogrenci.bolum_id`"
     ],
     [
      "N:N",
      "İki FK tutan **ara (köprü) tablo** kurulur",
      "`kayit(ogrenci_id, ders_id)`, `cikar(sanatci_id, sahne_id)`"
     ]
    ]
   },
   {
    "t": "code",
    "code": "CREATE TABLE ders (\n    ders_id INT PRIMARY KEY,\n    ders_adi VARCHAR(100) NOT NULL,\n    kredi INT NOT NULL\n);\nCREATE TABLE kayit (                       -- N:N ara tablo\n    ogrenci_id INT,\n    ders_id INT,\n    PRIMARY KEY (ogrenci_id, ders_id),     -- bileşik anahtar\n    FOREIGN KEY (ogrenci_id) REFERENCES ogrenci(ogrenci_id),\n    FOREIGN KEY (ders_id) REFERENCES ders(ders_id)\n);"
   },
   {
    "t": "trap",
    "text": "1:N'de FK **çok (N) tarafına** konur, 1 tarafına değil. Bölüm tablosuna öğrenci listesi yazılmaz; her öğrencinin satırına `bolum_id` yazılır. N:N'de ise FK'ler ara tabloya gider."
   },
   {
    "t": "tip",
    "text": "Bileşik PK `(ogrenci_id, ders_id)` sayesinde aynı öğrenci aynı derse iki kez kaydedilemez."
   },
   {
    "t": "low",
    "text": "Normal formlar (tanım ezberi yeter): **1NF** hücreler atomik/tek değerli. **2NF** 1NF + anahtar olmayan alan bileşik anahtarın bir kısmına bağlı değil. **3NF** 2NF + anahtar olmayan alanlar arasında **geçişli bağımlılık** yok. Amaç: tekrar ve tutarsızlığı azaltmak."
   }
  ]
 },
 {
  "id": "ddl",
  "title": "SQL ve DDL komutları",
  "src": "Hafta 4 notu · Kitapçık 05–06",
  "blocks": [
   {
    "t": "p",
    "text": "**SQL (Structured Query Language):** veritabanı ve tablo oluşturmak, veri eklemek, güncellemek, silmek, sorgulamak ve yetki yönetmek için kullanılan **bildirimsel (deklaratif)** dil. Hocanın benzetmesi: SQL restorandaki **menü dili**, MySQL siparişi hazırlayan **mutfak ve aşçı ekibi**."
   },
   {
    "t": "p",
    "text": "**Neden tıklamak yerine komut?** SQL betikleri **tekrar üretilebilir** (reproducible), **betikleştirilebilir** (scripted), belgelenebilir ve hata denetimi kolaydır; aynı yapı başka sunucuda birebir kurulur."
   },
   {
    "t": "p",
    "text": "**DDL (Data Definition Language):** tablonun **iskeletiyle** (ad, sütun, veri tipi, ilişki) ilgilenir, içindeki veriyle değil. Komutlar: `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, `TRUNCATE`."
   },
   {
    "t": "code",
    "code": "CREATE DATABASE universite;\nUSE universite;"
   },
   {
    "t": "ul",
    "items": [
     "`CREATE` yeni nesne oluşturur, `DATABASE` nesnenin türü, `universite` adı.",
     "`USE`: sunucuda birden çok veritabanı olabileceği için hangisinde çalışılacağını bildirir.",
     "**Adlandırma:** anlamlı ad, **boşluk yok**, Türkçe karakter yok (ş→s, ğ→g, ı→i …), genelde küçük harf, kelimeler arasında `_`."
    ]
   },
   {
    "t": "table",
    "head": [
     "Veri tipi",
     "Ne saklar",
     "Örnek sütun"
    ],
    "rows": [
     [
      "INT",
      "Tam sayı",
      "ogrenci_id, kredi, yas"
     ],
     [
      "VARCHAR(n)",
      "Değişken uzunluklu metin, en fazla n karakter",
      "ad, eposta"
     ],
     [
      "DATE",
      "Tarih, `YYYY-AA-GG`",
      "dogum_tarihi"
     ],
     [
      "DECIMAL(p,s)",
      "Ondalıklı/parasal değer",
      "ucret, maas"
     ],
     [
      "BOOLEAN",
      "Doğru/yanlış (MySQL'de TINYINT(1))",
      "aktif_mi, mezun_mu"
     ]
    ]
   },
   {
    "t": "trap",
    "text": "`VARCHAR(100)` = **en fazla** 100 karakter; 100 karakter doldurma zorunluluğu yok. `DECIMAL(10,2)` = **toplam** 10 basamak, bunun 2'si virgülden sonra (12345678.90). Sayıyı VARCHAR tutarsan hesap yapamazsın; tarihi metin tutarsan tarih aralığı sorgusu bozulur."
   },
   {
    "t": "p",
    "text": "**CREATE TABLE sözdizimi:** sütun tanımları parantez içinde, aralarında **virgül**; komutun sonunda **noktalı virgül**. `PRIMARY KEY` eklenince alan hem boş geçilemez hem benzersiz olur."
   },
   {
    "t": "code",
    "code": "CREATE TABLE bolum (\n    bolum_id INT,\n    bolum_adi VARCHAR(100)\n);"
   },
   {
    "t": "code",
    "code": "CREATE TABLE bolum (\n    bolum_id INT PRIMARY KEY,\n    bolum_adi VARCHAR(100)\n);"
   },
   {
    "t": "p",
    "text": "**Tam üniversite uygulaması** (5 tablo). FK yüzünden sıra önemli: önce referans verilen (bağımsız) tablolar."
   },
   {
    "t": "code",
    "code": "CREATE TABLE bolum (\n    bolum_id INT PRIMARY KEY,\n    bolum_adi VARCHAR(100) NOT NULL\n);\nCREATE TABLE ogrenci (\n    ogrenci_id INT PRIMARY KEY,\n    ad VARCHAR(50) NOT NULL,\n    soyad VARCHAR(50) NOT NULL,\n    bolum_id INT,\n    FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)\n);\nCREATE TABLE ders (\n    ders_id INT PRIMARY KEY,\n    ders_adi VARCHAR(100) NOT NULL,\n    kredi INT NOT NULL\n);\nCREATE TABLE ogretim_elemani (\n    ogretim_elemani_id INT PRIMARY KEY,\n    ad VARCHAR(50) NOT NULL,\n    soyad VARCHAR(50) NOT NULL\n);\nCREATE TABLE kayit (\n    ogrenci_id INT,\n    ders_id INT,\n    PRIMARY KEY (ogrenci_id, ders_id),\n    FOREIGN KEY (ogrenci_id) REFERENCES ogrenci(ogrenci_id),\n    FOREIGN KEY (ders_id) REFERENCES ders(ders_id)\n);"
   },
   {
    "t": "table",
    "head": [
     "Sıra",
     "Tablo",
     "Neden"
    ],
    "rows": [
     [
      "1",
      "bolum",
      "Bağımsız"
     ],
     [
      "2",
      "ogrenci",
      "bolum'a bağlı"
     ],
     [
      "3",
      "ders",
      "Bağımsız"
     ],
     [
      "4",
      "ogretim_elemani",
      "Bağımsız"
     ],
     [
      "5",
      "kayit",
      "Hem ogrenci hem ders'e bağlı"
     ]
    ]
   },
   {
    "t": "code",
    "code": "ALTER TABLE ogrenci ADD eposta VARCHAR(150);   -- yapıya yeni sütun\nTRUNCATE TABLE kayit;                          -- yapı kalır, kayıtlar gider"
   },
   {
    "t": "code",
    "code": "DROP TABLE ogrenci;       -- tablo ve tüm verisi kalıcı olarak gider\nTRUNCATE TABLE ogrenci;   -- yapı kalır, kayıtlar temizlenir"
   },
   {
    "t": "table",
    "head": [
     "Komut",
     "Grup",
     "Tablo yapısı",
     "Veriler",
     "WHERE alır mı?"
    ],
    "rows": [
     [
      "DROP TABLE",
      "DDL",
      "Silinir",
      "Silinir",
      "Hayır"
     ],
     [
      "TRUNCATE TABLE",
      "DDL",
      "**Korunur**",
      "Hepsi temizlenir",
      "Hayır"
     ],
     [
      "DELETE FROM",
      "DML",
      "Korunur",
      "Koşula uyanlar silinir",
      "**Evet**"
     ]
    ]
   },
   {
    "t": "trap",
    "text": "DROP TABLE geri dönüşü olmayan veri kaybıdır. DELETE satır siler, DROP tabloyu siler, TRUNCATE tabloyu koruyup bütün satırları boşaltır."
   },
   {
    "t": "tip",
    "text": "Sözdizimi: komut sonunda `;`, anahtar kelimeler geleneksel olarak BÜYÜK harf (zorunlu değil), açılan her parantez kapanır, sütunlar virgülle ayrılır. En sık hata: eksik parantez ve yanlış virgül."
   }
  ]
 },
 {
  "id": "insert",
  "title": "INSERT INTO ile kayıt ekleme",
  "src": "YENİ KAYIT GİRİŞ notu · Kitapçık 07, 24",
  "blocks": [
   {
    "t": "p",
    "text": "`INSERT INTO` tabloya bir ya da daha fazla satır ekler. Tablo adından sonra parantez içinde sütunlar, `VALUES`'tan sonra aynı sırayla değerler yazılır."
   },
   {
    "t": "code",
    "code": "INSERT INTO tablo_adi (alanadi1, alanadi2, ...)\nVALUES (deger1, deger2, ...);\n\n-- Çok satır: satırlar virgülle ayrılır\nINSERT INTO tablo_adi (alanadi1, alanadi2, ...)\nVALUES\n  (deger1, deger2, ...),\n  (deger1, deger2, ...);"
   },
   {
    "t": "trap",
    "text": "Sütun sayısı ile değer sayısı **aynı** olmalı; konumlar birbirine karşılık gelmeli. Metin ve tarih tırnak içinde: `'Ali'`, `'2021-11-15'`."
   },
   {
    "t": "p",
    "text": "Hocanın `gorevler` tablosu:"
   },
   {
    "t": "code",
    "code": "CREATE TABLE IF NOT EXISTS gorevler (\n   gorev_id INT AUTO_INCREMENT,\n   baslik VARCHAR(255) NOT NULL,\n   baslamatarihi DATE,\n   bitistarihi DATE,\n   oncelik TINYINT NOT NULL DEFAULT 3,\n   aciklama TEXT,\n   PRIMARY KEY (gorev_id)\n);"
   },
   {
    "t": "code",
    "code": "INSERT INTO gorevler(baslik, oncelik)\n   VALUES('MySQL INSERT İfadesini Öğren', 1);\nSELECT * FROM gorevler;",
    "out": "gorev_id | baslik                       | baslamatarihi | bitistarihi | oncelik | aciklama\n---------+------------------------------+---------------+-------------+---------+---------\n1        | MySQL INSERT İfadesini Öğren | NULL          | NULL        | 1       | NULL"
   },
   {
    "t": "ul",
    "items": [
     "`gorev_id` **AUTO_INCREMENT**: her yeni satırda MySQL sıradaki tam sayıyı kendisi verir.",
     "Değer verilmeyen sütun **DEFAULT** değerini alır; DEFAULT tanımı yoksa **NULL** olur (baslamatarihi, bitistarihi, aciklama)."
    ]
   },
   {
    "t": "p",
    "text": "**Varsayılan değeri girmenin iki yolu:** (1) sütunu listeye hiç yazmamak, (2) değer yerine `DEFAULT` yazmak. İkisinde de `oncelik` = 3."
   },
   {
    "t": "code",
    "code": "INSERT INTO gorevler (baslik)\n  VALUES ('MySQL varsayılan değer girişi 1');\nINSERT INTO gorevler (baslik, oncelik)\n  VALUES ('MySQL varsayılan değerin giriş 2', DEFAULT);\nSELECT gorev_id, baslik, oncelik FROM gorevler;",
    "out": "gorev_id | baslik                           | oncelik\n---------+----------------------------------+--------\n1        | MySQL INSERT İfadesini Öğren     | 1\n2        | MySQL varsayılan değer girişi 1  | 3\n3        | MySQL varsayılan değerin giriş 2 | 3"
   },
   {
    "t": "p",
    "text": "**Tarih:** biçim `'YYYY-MM-DD'` (yıl 4, ay 2, gün 2 basamak). Günün tarihi için `CURRENT_DATE()` fonksiyonu."
   },
   {
    "t": "code",
    "code": "INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)\n  VALUES ('Tabloya Tarih Değeri Girişi', '2021-11-15', '2022-01-31');\nSELECT baslik, baslamatarihi, bitistarihi FROM gorevler WHERE gorev_id = 4;",
    "out": "baslik                      | baslamatarihi | bitistarihi\n----------------------------+---------------+------------\nTabloya Tarih Değeri Girişi | 2021-11-15    | 2022-01-31"
   },
   {
    "t": "code",
    "code": "INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)\n  VALUES ('Günün tarihi', CURRENT_DATE(), CURRENT_DATE());"
   },
   {
    "t": "p",
    "text": "**Çok satır birden:** her satır ayrı parantezde, aralarında virgül. MySQL \"**3 row(s) affected**\" der: üç satır kopyasız ve uyarısız eklendi."
   },
   {
    "t": "code",
    "code": "INSERT INTO gorevler (baslik, oncelik)\n  VALUES\n    ('Önceliği 1 olan görev', 1),\n    ('Önceliği 2 olan görev', 2),\n    ('Önceliği 3 olan görev', 3);\nSELECT gorev_id, baslik, oncelik FROM gorevler WHERE gorev_id > 4;",
    "out": "gorev_id | baslik                | oncelik\n---------+-----------------------+--------\n5        | Önceliği 1 olan görev | 1\n6        | Önceliği 2 olan görev | 2\n7        | Önceliği 3 olan görev | 3"
   },
   {
    "t": "p",
    "text": "**Güncelleme ve silme (kitapçık):** `UPDATE` var olan satırı değiştirir, `DELETE FROM` satır siler. İkisinde de hangi satır olduğunu **WHERE** söyler."
   },
   {
    "t": "code",
    "code": "UPDATE gorevler SET oncelik = 1 WHERE gorev_id = 2;\nDELETE FROM gorevler WHERE gorev_id = 7;\nSELECT COUNT(*) AS kalan FROM gorevler;",
    "out": "kalan\n-----\n6"
   },
   {
    "t": "trap",
    "text": "`UPDATE` ya da `DELETE`'te **WHERE unutulursa bütün satırlar** etkilenir. `UPDATE Ogrenci SET yas = 21;` hata vermez, herkesin yaşını 21 yapar."
   },
   {
    "t": "tip",
    "text": "CRUD'da **C = Create = INSERT**. INSERT bir DML komutudur (DDL değil)."
   }
  ]
 },
 {
  "id": "sorgu",
  "title": "SELECT ile sorgulama",
  "src": "Kitapçık 06–08 (hocanın slaytlarında henüz yok)",
  "blocks": [
   {
    "t": "p",
    "text": "Düz mantık: `SELECT` ne gösterilsin? `FROM` nereden? `WHERE` hangi satırlar? `ORDER BY` nasıl sıralansın? Örnekler bu tabloyla:"
   },
   {
    "cap": "**Ogrenci** tablosu",
    "head": [
     "id",
     "ad",
     "yas",
     "sehir"
    ],
    "rows": [
     [
      "1",
      "Ayşe",
      "20",
      "Ankara"
     ],
     [
      "2",
      "Ali",
      "17",
      "İzmir"
     ],
     [
      "3",
      "Ay",
      "22",
      "Ankara"
     ],
     [
      "4",
      "Can",
      "NULL",
      "Bursa"
     ],
     [
      "5",
      "Ece",
      "19",
      "İzmir"
     ]
    ],
    "t": "table"
   },
   {
    "t": "code",
    "code": "SELECT ad, yas FROM Ogrenci WHERE yas >= 18;",
    "out": "ad   | yas\n-----+----\nAyşe | 20\nAy   | 22\nEce  | 19"
   },
   {
    "t": "table",
    "head": [
     "Koşul",
     "Anlamı",
     "Örnek"
    ],
    "rows": [
     [
      "AND / OR / NOT",
      "İkisi de / en az biri / değil",
      "`yas > 18 AND sehir = 'Ankara'`"
     ],
     [
      "BETWEEN a AND b",
      "Aralık, **sınırlar dahil**",
      "`yas BETWEEN 19 AND 22`"
     ],
     [
      "IN (…)",
      "Listedeki değerlerden biri",
      "`sehir IN ('Ankara', 'Bursa')`"
     ],
     [
      "LIKE",
      "`%` sıfır ya da çok karakter, `_` tam **bir** karakter",
      "`ad LIKE 'A%'`, `ad LIKE 'A_'`"
     ],
     [
      "IS NULL / IS NOT NULL",
      "Boş (bilinmeyen) / dolu",
      "`yas IS NULL`"
     ]
    ]
   },
   {
    "t": "code",
    "code": "SELECT ad FROM Ogrenci WHERE ad LIKE 'A%';   -- A ile başlayan, devamı ne olursa",
    "out": "ad\n----\nAyşe\nAli\nAy"
   },
   {
    "t": "code",
    "code": "SELECT ad FROM Ogrenci WHERE ad LIKE 'A_';   -- A + tam 1 karakter",
    "out": "ad\n--\nAy"
   },
   {
    "t": "code",
    "code": "SELECT ad FROM Ogrenci WHERE yas IS NULL;",
    "out": "ad\n---\nCan"
   },
   {
    "t": "trap",
    "text": "`WHERE yas = NULL` hiçbir satır getirmez; NULL ile `=` karşılaştırması doğru sonuç vermez. NULL kontrolü **IS NULL** ile yapılır. NULL ne sıfırdır ne boş metindir: \"bilinmeyen\"."
   },
   {
    "t": "table",
    "head": [
     "İfade",
     "Ne yapar"
    ],
    "rows": [
     [
      "ORDER BY sütun ASC / DESC",
      "Artan (varsayılan) / azalan sıralar"
     ],
     [
      "DISTINCT",
      "Tekrarlı sonuçları teke indirir"
     ],
     [
      "AS",
      "Sütuna ya da tabloya takma ad verir"
     ],
     [
      "LIMIT n (MySQL) / TOP n (SQL Server)",
      "İlk n satır"
     ]
    ]
   },
   {
    "t": "code",
    "code": "SELECT DISTINCT sehir FROM Ogrenci ORDER BY sehir;",
    "out": "sehir\n------\nAnkara\nBursa\nİzmir"
   },
   {
    "t": "code",
    "code": "SELECT ad AS isim, yas FROM Ogrenci ORDER BY yas DESC LIMIT 2;",
    "out": "isim | yas\n-----+----\nAy   | 22\nAyşe | 20"
   },
   {
    "t": "p",
    "text": "**Toplulaştırma fonksiyonları:** `COUNT(*)` satır sayısı, `COUNT(sütun)` NULL olmayan değer sayısı, `SUM` toplam, `AVG` ortalama, `MIN`, `MAX`."
   },
   {
    "t": "code",
    "code": "SELECT COUNT(*), COUNT(yas), SUM(yas), AVG(yas), MIN(yas), MAX(yas)\nFROM Ogrenci;",
    "out": "COUNT(*) | COUNT(yas) | SUM(yas) | AVG(yas) | MIN(yas) | MAX(yas)\n---------+------------+----------+----------+----------+---------\n5        | 4          | 78       | 19.5     | 17       | 22"
   },
   {
    "t": "trap",
    "text": "`COUNT(*)` 5 (NULL'lı satır da satırdır), `COUNT(yas)` 4. `AVG(yas)` da NULL'ı dışarıda bırakır: 78 / 4 = 19.5 (5'e bölünmez)."
   },
   {
    "t": "p",
    "text": "**GROUP BY** aynı değerli satırları gruplar, **HAVING** grupları filtreler. **WHERE** ise gruplamadan önce tek tek satırları filtreler."
   },
   {
    "t": "code",
    "code": "SELECT sehir, COUNT(*) AS ogrenci_sayisi\nFROM Ogrenci\nWHERE yas >= 18\nGROUP BY sehir\nHAVING COUNT(*) >= 2;",
    "out": "sehir  | ogrenci_sayisi\n-------+---------------\nAnkara | 2"
   },
   {
    "t": "p",
    "text": "**Mantıksal işlenme sırası:** FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."
   },
   {
    "t": "low",
    "text": "**JOIN ve UNION** kitapçıkta var, hocanın slaytlarında henüz yok. `INNER JOIN` iki tabloda **eşleşenleri**, `LEFT JOIN` sol tablonun **hepsini** (eşleşmeyen sağ alanlar NULL), `RIGHT JOIN` sağın hepsini, `FULL OUTER JOIN` iki tarafın hepsini, `CROSS JOIN` tüm satır çiftlerini (kartezyen çarpım) getirir. `ON` eşleşme koşulu. `UNION` sonuçları alt alta birleştirip **tekrarı atar**, `UNION ALL` tekrarı **korur**."
   },
   {
    "t": "code",
    "code": "SELECT sanatci.adi, festival.adi\nFROM sanatci\nINNER JOIN festival\n  ON sanatci.festival_id = festival.id;",
    "out": "adi   | adi\n------+--------------\nAA AA | ABC FESTİVALİ\nBB BB | ABC FESTİVALİ\nCC CC | BCD FESTİVALİ\nDD DD | CDE FESTİVALİ"
   },
   {
    "t": "trap",
    "text": "WHERE ↔ HAVING: WHERE **satır**, HAVING **grup** filtreler. `COUNT(*) > 2` gibi toplu koşul WHERE'e yazılmaz, HAVING'e yazılır."
   }
  ]
 },
 {
  "id": "gruplar",
  "title": "SQL komut grupları ve işlemler",
  "src": "Kitapçık 05–06, 08",
  "blocks": [
   {
    "t": "table",
    "head": [
     "Grup",
     "Açılım",
     "Ne yapar",
     "Komutlar"
    ],
    "rows": [
     [
      "**DDL**",
      "Data Definition Language",
      "Yapıyı tanımlar/değiştirir",
      "CREATE, ALTER, DROP, TRUNCATE"
     ],
     [
      "**DML**",
      "Data Manipulation Language",
      "Kayıt ekler, günceller, siler",
      "INSERT, UPDATE, DELETE"
     ],
     [
      "**DQL**",
      "Data Query Language",
      "Veri sorgular",
      "SELECT"
     ],
     [
      "**DCL**",
      "Data Control Language",
      "Erişim yetkisini yönetir",
      "GRANT, REVOKE"
     ],
     [
      "**TCL**",
      "Transaction Control Language",
      "İşlemi onaylar / geri alır",
      "COMMIT, ROLLBACK, SAVEPOINT"
     ]
    ]
   },
   {
    "t": "trap",
    "text": "Bazı kitaplar **SELECT**'i DQL yerine DML içinde sayar; TRUNCATE çoğu kaynakta **DDL**'dir. Hocanın notunda DDL komutları: CREATE DATABASE, CREATE TABLE, ALTER, DROP, TRUNCATE; INSERT ise DML."
   },
   {
    "t": "table",
    "head": [
     "CRUD",
     "Anlam",
     "SQL"
    ],
    "rows": [
     [
      "C",
      "Create (oluştur)",
      "INSERT"
     ],
     [
      "R",
      "Read (oku)",
      "SELECT"
     ],
     [
      "U",
      "Update",
      "UPDATE"
     ],
     [
      "D",
      "Delete",
      "DELETE"
     ]
    ]
   },
   {
    "t": "p",
    "text": "**İşlem (transaction) kontrolü:** `COMMIT` değişiklikleri onaylar/kalıcılaştırır, `ROLLBACK` henüz onaylanmamış değişiklikleri geri alır, `SAVEPOINT` işlemin içine geri dönüş noktası koyar."
   },
   {
    "t": "code",
    "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE sehir = 'Ankara';\nROLLBACK;                       -- silme geri alındı\nSELECT COUNT(*) FROM Ogrenci;",
    "out": "COUNT(*)\n--------\n5"
   },
   {
    "t": "p",
    "text": "**Yetki (DCL):** hocanın \"yetkisiz stajyer tüm notları silmesin\" sorusunun SQL cevabı. `GRANT` yetki verir, `REVOKE` geri alır."
   },
   {
    "t": "code",
    "code": "GRANT SELECT ON universite.* TO 'stajyer'@'localhost';\nREVOKE SELECT ON universite.* FROM 'stajyer'@'localhost';"
   },
   {
    "t": "table",
    "head": [
     "Nesne / işlem",
     "Kısa tanım"
    ],
    "rows": [
     [
      "VIEW (görünüm)",
      "Sorgudan türetilen **sanal tablo**; veriyi ayrıca kopyalamaz"
     ],
     [
      "INDEX (indeks)",
      "Bazı aramaları **hızlandıran** yardımcı yapı"
     ],
     [
      "Şema",
      "Veritabanının mantıksal yapısı"
     ],
     [
      "Yedekleme / geri yükleme",
      "Kayba karşı kopya almak / kopyadan geri getirmek"
     ],
     [
      "Yetkilendirme",
      "Kim hangi veriyi okuyup değiştirebilir"
     ]
    ]
   },
   {
    "t": "code",
    "code": "CREATE VIEW ankara_ogrencileri AS\n  SELECT ad, yas FROM Ogrenci WHERE sehir = 'Ankara';\nCREATE INDEX idx_ad ON Ogrenci (ad);\nSELECT * FROM ankara_ogrencileri;",
    "out": "ad   | yas\n-----+----\nAyşe | 20\nAy   | 22"
   },
   {
    "t": "tip",
    "text": "Sorudaki fiili yakala: oluştur → CREATE, yapıyı değiştir → ALTER, ekle → INSERT, değiştir → UPDATE, listele → SELECT, şarta göre → WHERE, sırala → ORDER BY, grupla → GROUP BY, yetki ver → GRANT, onayla → COMMIT, geri al → ROLLBACK."
   }
  ]
 }
];
window.TOPIC_RULES = {
 "giris": "Veri ham ve tek başına anlamsız; bilgi verinin işlenip anlam kazanmış hâli. Dosya tabanlı sistemlerin 6 sorunu: tekrar, tutarsızlık, güncelleme zorluğu, eş zamanlı erişim, güvenlik/yetki, yedekleme/kurtarma. Excel veritabanı değildir.",
 "dbms": "Veritabanı veri topluluğu, DBMS onu yöneten yazılım. MySQL DBMS, phpMyAdmin/HeidiSQL arayüz, SQL dil. RDBMS tablo kullanır, NoSQL (MongoDB) doküman. İlişkisel modelin temeli Edgar F. Codd.",
 "buyukveri": "5V: Volume hacim (YouTube), Velocity hız (kredi kartı), Variety çeşitlilik (video, ses, GPS), Veracity doğruluk (bileklik nabız 200), Value değer (Spotify). Büyük veri teknolojileri geleneksel veritabanlarının rakibi değil, tamamlayıcısıdır.",
 "er": "Dikdörtgen varlık, elips öznitelik, elmas ilişki, altı çizili PK. \"Birden fazla olabilir mi?\" sorusunu iki yönde sor: iki evet N:N, bir evet 1:N, iki hayır 1:1.",
 "festival": "FESTİVAL (1) — katılır — SANATCI (N): hoca aynı gün/saat varsayımıyla 1:N kurdu, FK SANATCI'ya (FESTIVAL_ID). SANATCI (M) — çıkar — SAHNE (N): çoka çok, ara tablo ÇIKAR (ID, SANATCI_ID, SAHNE_ID).",
 "anahtar": "PK benzersiz ve NULL olamaz; FK başka tablonun anahtarına bağlanır ve referans bütünlüğünü korur. 1:N'de FK çok tarafına, N:N'de iki FK'li ara tabloya. NOT NULL boş bırakmayı, UNIQUE tekrarı engeller; DEFAULT varsayılanı yazar.",
 "ddl": "DDL yapıyla ilgilenir: CREATE, ALTER, DROP, TRUNCATE. DROP tabloyu siler, TRUNCATE yapıyı koruyup kayıtları boşaltır, DELETE (DML) koşullu satır siler. Önce bağımsız tablolar oluşturulur.",
 "insert": "INSERT INTO tablo (sütunlar) VALUES (değerler): sayı ve sıra eşleşmeli. Değer verilmeyen sütun DEFAULT'u, yoksa NULL'u alır. Tarih 'YYYY-MM-DD'. Çok satırda satırlar virgülle ayrılır. UPDATE/DELETE'te WHERE yoksa tüm satırlar etkilenir.",
 "sorgu": "SELECT ne, FROM nereden, WHERE hangi satırlar, GROUP BY grupla, HAVING grubu filtrele, ORDER BY sırala (ASC artan, DESC azalan). NULL için IS NULL; COUNT(sütun) ve AVG NULL'ları saymaz. LIKE: % çok, _ tek karakter.",
 "gruplar": "DDL yapı (CREATE, ALTER, DROP, TRUNCATE), DML veri (INSERT, UPDATE, DELETE), DQL sorgu (SELECT), DCL yetki (GRANT, REVOKE), TCL işlem (COMMIT, ROLLBACK, SAVEPOINT). CRUD: Create = INSERT."
};
