/* Kitapçık 50 + konu 135 soru, 3 deneme vizesi. Cevaplar sqlite3 ile doğrulandı. tools/build.py ile üretildi. */
window.EXAMS = [
 {
  "id": "hoca",
  "title": "Çalışma kitapçığı · 50 soru",
  "desc": "Kitapçığın 50 sorusu birebir (şık sırası ve cevap harfleri aynı), cevap anahtarındaki gerekçelerle. Hocanın kesin sınav soruları değil.",
  "featured": true,
  "group": "hoca",
  "mode": "practice",
  "questions": [
   {
    "type": "mc",
    "q": "Veritabanının temel amacı aşağıdakilerden hangisidir?",
    "opts": [
     "Sadece programları çalıştırmak",
     "Verileri düzenli saklamak ve erişimi yönetmek",
     "Bilgisayarın işlemcisini hızlandırmak",
     "İnternete kablosuz bağlanmak"
    ],
    "a": 1,
    "exp": "Veritabanı verileri düzenli biçimde saklama, erişme ve yönetme imkânı verir.",
    "src": "Kitapçık 1",
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "VTYS (DBMS) neyi ifade eder?",
    "opts": [
     "Veritabanı yönetim yazılımını",
     "Bir ağ kablosu türünü",
     "Yalnızca tablo satırlarını",
     "SQL komutlarının tamamını"
    ],
    "a": 0,
    "exp": "VTYS, veritabanını oluşturup yöneten yazılımdır.",
    "src": "Kitapçık 2",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Bir tabloda tek bir öğrenciye ait tüm bilgiler genellikle ne olarak adlandırılır?",
    "opts": [
     "Sütun",
     "İndeks",
     "Satır / kayıt",
     "Şema"
    ],
    "a": 2,
    "exp": "Bir kişi/nesneyle ilgili bilgiler bir satırda tutulur.",
    "src": "Kitapçık 3",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Ogrenci tablosundaki “ad” ve “yas” alanları nedir?",
    "opts": [
     "Sütun",
     "Veritabanı",
     "Satır",
     "İlişki"
    ],
    "a": 0,
    "exp": "Ad ve yaş, kayıtların özelliklerini gösteren sütunlardır.",
    "src": "Kitapçık 4",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Klasik ER (Chen) diyagramında ilişkiyi hangi şekil gösterir?",
    "opts": [
     "Oval",
     "Dikdörtgen",
     "Baklava / eşkenar dörtgen",
     "Daire"
    ],
    "a": 2,
    "exp": "ER diyagramında ilişki diamond (baklava) ile gösterilir.",
    "src": "Kitapçık 5",
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi ER ilişki türlerinden biridir?",
    "opts": [
     "Bire çok (1:N)",
     "İki sütunlu",
     "Birincil veri",
     "Sanal tablo"
    ],
    "a": 0,
    "exp": "1:N, üç temel ilişki türünden biridir.",
    "src": "Kitapçık 6",
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "Gönderilen notta “Festival(1) — katılır — Sanatçı(N)” hangi ilişkiyi gösterir?",
    "opts": [
     "1:1",
     "1:N",
     "N:N",
     "İlişki yok"
    ],
    "a": 1,
    "exp": "Notta bir festival ve çok sanatçı gösterildiği için 1:N’dir.",
    "src": "Kitapçık 7",
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "Gönderilen notta “Sahne(N) — çıkar — Sanatçı(N)” hangi türdür?",
    "opts": [
     "1:1",
     "1:N",
     "N:1",
     "N:N"
    ],
    "a": 3,
    "exp": "İki taraf da N olduğundan çoka çok ilişki vardır.",
    "src": "Kitapçık 8",
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "Yeni bir tablo oluşturmak için hangi SQL komutu kullanılır?",
    "opts": [
     "CREATE TABLE",
     "SELECT",
     "UPDATE",
     "GRANT"
    ],
    "a": 0,
    "exp": "CREATE TABLE tablonun yapısını oluşturur.",
    "src": "Kitapçık 9",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "Var olan tabloya yeni kayıt ekleyen komut hangisidir?",
    "opts": [
     "SELECT",
     "INSERT INTO",
     "DELETE FROM",
     "ORDER BY"
    ],
    "a": 1,
    "exp": "INSERT INTO yeni satır ekler.",
    "src": "Kitapçık 10",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "Tablodan verileri listelemek için hangi komut kullanılır?",
    "opts": [
     "ALTER",
     "COMMIT",
     "SELECT",
     "REVOKE"
    ],
    "a": 2,
    "exp": "SELECT tablodan sütun ve kayıtları sorgular.",
    "src": "Kitapçık 11",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Var olan kayıtların değerini değiştirmek için hangisi kullanılır?",
    "opts": [
     "UPDATE",
     "DROP",
     "CREATE INDEX",
     "GROUP BY"
    ],
    "a": 0,
    "exp": "UPDATE var olan satırları günceller.",
    "src": "Kitapçık 12",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "Satırları belirli bir koşula göre filtrelemek için hangisi kullanılır?",
    "opts": [
     "ORDER BY",
     "WHERE",
     "DISTINCT",
     "AS"
    ],
    "a": 1,
    "exp": "WHERE sonuçların karşılayacağı satır koşulunu belirtir.",
    "src": "Kitapçık 13",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Bir satırı benzersiz tanımlayan anahtar hangisidir?",
    "opts": [
     "FOREIGN KEY",
     "DEFAULT",
     "PRIMARY KEY",
     "VIEW"
    ],
    "a": 2,
    "exp": "PRIMARY KEY her kaydın benzersiz kimliğini sağlar.",
    "src": "Kitapçık 14",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "Tablolar arasında referans kuran anahtar hangisidir?",
    "opts": [
     "FOREIGN KEY",
     "ORDER BY",
     "CHECK",
     "AVG"
    ],
    "a": 0,
    "exp": "FOREIGN KEY başka bir tablonun anahtarına referans verir.",
    "src": "Kitapçık 15",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "`SELECT DISTINCT sehir FROM Ogrenci;` sorgusunun amacı nedir?",
    "opts": [
     "Şehirleri alfabetik sıralamak",
     "Aynı şehir değerlerini tekrarsız göstermek",
     "Şehir sütununu silmek",
     "Şehir değerlerini değiştirmek"
    ],
    "a": 1,
    "exp": "DISTINCT tekrar eden sonuç satırlarını kaldırır.",
    "src": "Kitapçık 16",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`ORDER BY notu DESC` ifadesi ne yapar?",
    "opts": [
     "Notu artan sıralar",
     "Notları toplar",
     "Notu azalan sıralar",
     "NULL kayıtları siler"
    ],
    "a": 2,
    "exp": "DESC büyükten küçüğe (azalan) sıralamadır.",
    "src": "Kitapçık 17",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`WHERE ad LIKE 'A%'` koşulu hangi adları seçer?",
    "opts": [
     "A ile başlayanları",
     "A ile bitenleri",
     "İçinde herhangi bir A olanları",
     "Tek karakterli adları"
    ],
    "a": 0,
    "exp": "A% deseni A ile başlayıp devamında sıfır veya çok karakteri kabul eder.",
    "src": "Kitapçık 18",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Bir sütunda NULL değerleri bulmak için doğru koşul hangisidir?",
    "opts": [
     "= NULL",
     "IS NULL",
     "LIKE NULL",
     "IN NULL"
    ],
    "a": 1,
    "exp": "NULL denetiminde IS NULL kullanılır.",
    "src": "Kitapçık 19",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`WHERE puan BETWEEN 40 AND 60` hangi puanları kapsar?",
    "opts": [
     "Sadece 40 ve 60 arasını, sınırlar hariç",
     "Sadece 40 ve 60 değerlerini",
     "40 ile 60 arasını, 40 ve 60 dahil",
     "40’tan küçük ve 60’tan büyükleri"
    ],
    "a": 2,
    "exp": "BETWEEN alt ve üst sınır değerlerini de içerir.",
    "src": "Kitapçık 20",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Benzer kayıtları şehir bazında bir araya getiren ifade hangisidir?",
    "opts": [
     "GROUP BY sehir",
     "ORDER BY sehir",
     "DROP sehir",
     "UPDATE sehir"
    ],
    "a": 0,
    "exp": "GROUP BY aynı şehir değerlerini gruplar.",
    "src": "Kitapçık 21",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Gruplara uygulanan filtre hangi ifadeyle yazılır?",
    "opts": [
     "WHERE",
     "HAVING",
     "LIMIT",
     "IN"
    ],
    "a": 1,
    "exp": "HAVING toplulaştırılmış/gruplanmış sonuçları filtreler.",
    "src": "Kitapçık 22",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`COUNT(ad)` fonksiyonu neyi sayar?",
    "opts": [
     "Tablodaki tüm satırları koşulsuz",
     "Adı NULL olan satırları",
     "ad sütununda NULL olmayan değerleri",
     "Sadece farklı adları"
    ],
    "a": 2,
    "exp": "COUNT(ad) NULL değerleri hesaba katmaz; DISTINCT yoksa tekrarları sayar.",
    "src": "Kitapçık 23",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`UPDATE Ogrenci SET yas = 21;` komutunda WHERE olmamasının tipik sonucu nedir?",
    "opts": [
     "Hata verir, hiçbir satır değişmez",
     "Tüm satırların yaş değeri 21 yapılır",
     "Sadece ilk satır değişir",
     "Yeni bir sütun oluşur"
    ],
    "a": 1,
    "exp": "WHERE olmadığından tüm kayıtlar güncellenir.",
    "src": "Kitapçık 24",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "`DROP TABLE Ogrenci;` komutu ne yapar?",
    "opts": [
     "Yalnız koşula uyan satırları siler",
     "Tabloyu yapısı ile birlikte kaldırır",
     "Tablodaki verileri sıralar",
     "Tabloya yeni sütun ekler"
    ],
    "a": 1,
    "exp": "DROP TABLE tablo nesnesini kaldırır.",
    "src": "Kitapçık 25",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "TRUNCATE TABLE için doğru ifade hangisidir?",
    "opts": [
     "Tablo sütunlarını yeniden adlandırır",
     "Yalnız WHERE koşuluna uyanları temizler",
     "Tablonun tüm satırlarını boşaltır, yapısını korur",
     "Sorgu sonucunu gruplar"
    ],
    "a": 2,
    "exp": "TRUNCATE bütün satırları boşaltır; tablo yapısı kalır.",
    "src": "Kitapçık 26",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "INNER JOIN sonuçta hangi kayıtları getirir?",
    "opts": [
     "Sadece soldaki eşleşmeyenleri",
     "İki tabloda eşleşenleri",
     "Her iki tablonun tüm satırlarını mutlaka",
     "Sadece sağdaki eşleşmeyenleri"
    ],
    "a": 1,
    "exp": "INNER JOIN eşleşen satır birleşimlerini getirir.",
    "src": "Kitapçık 27",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "LEFT JOIN için hangisi doğrudur?",
    "opts": [
     "Sol tablonun tüm kayıtlarını tutar",
     "Yalnız sağ tablonun tüm kayıtlarını tutar",
     "Tabloları siler",
     "Satır sayılarını toplar"
    ],
    "a": 0,
    "exp": "LEFT JOIN soldaki bütün satırları korur; eşleşmeyen sağ alanlar NULL olur.",
    "src": "Kitapçık 28",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "1:N ilişkide yabancı anahtar genel olarak nereye konur?",
    "opts": [
     "Her zaman 1 tarafına",
     "Hiçbir tarafa konmaz",
     "N (çok) tarafına",
     "Sadece veritabanı adına"
    ],
    "a": 2,
    "exp": "1:N ilişkide N tarafında 1 tarafın anahtarı taşınır.",
    "src": "Kitapçık 29",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "N:N ilişkileri ilişkisel tablo yapısına dönüştürmek için yaygın yöntem nedir?",
    "opts": [
     "Tek tabloyu silmek",
     "Ara / köprü tablo kurmak",
     "PRIMARY KEY kullanmamak",
     "Sadece veriyi sıralamak"
    ],
    "a": 1,
    "exp": "N:N ilişkisi iki FK tutan ara tablo ile temsil edilir.",
    "src": "Kitapçık 30",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "NOT NULL kısıtı neyi önler?",
    "opts": [
     "Tekrarlanan verileri",
     "Değerin NULL olarak bırakılmasını",
     "Tablonun silinmesini",
     "Sıralamayı"
    ],
    "a": 1,
    "exp": "NOT NULL ilgili alanda NULL değeri yasaklar.",
    "src": "Kitapçık 31",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "UNIQUE kısıtı hangi amaçla kullanılır?",
    "opts": [
     "Sorguyu gruplamak",
     "Veritabanını yedeklemek",
     "Sütundaki değerlerin benzersizliğini sağlamak",
     "Tabloyu küçültmek"
    ],
    "a": 2,
    "exp": "UNIQUE tekrar eden değerleri engeller; NULL davranışı sisteme göre değişebilir.",
    "src": "Kitapçık 32",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "Tabloya yeni bir sütun eklemek için hangi SQL ifadesi kullanılır?",
    "opts": [
     "ALTER TABLE",
     "SELECT DISTINCT",
     "ROLLBACK",
     "GRANT"
    ],
    "a": 0,
    "exp": "ALTER TABLE var olan tablonun yapısını değiştirir.",
    "src": "Kitapçık 33",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi DDL komutudur?",
    "opts": [
     "INSERT",
     "UPDATE",
     "CREATE TABLE",
     "SELECT"
    ],
    "a": 2,
    "exp": "CREATE TABLE veri yapısını oluşturur; DDL grubundadır.",
    "src": "Kitapçık 34",
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "İşlemde yapılan değişiklikleri onaylama komutu hangisidir?",
    "opts": [
     "COMMIT",
     "WHERE",
     "ROLLBACK",
     "REVOKE"
    ],
    "a": 0,
    "exp": "COMMIT işlem kapsamındaki değişiklikleri onaylar.",
    "src": "Kitapçık 35",
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi DCL komutudur?",
    "opts": [
     "GROUP BY",
     "GRANT",
     "INSERT",
     "TRUNCATE"
    ],
    "a": 1,
    "exp": "GRANT kullanıcıya/role yetki verir ve DCL grubundadır.",
    "src": "Kitapçık 36",
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "SUM() fonksiyonu ne işe yarar?",
    "opts": [
     "Sayıları sıralar",
     "Satır sayısını sayar",
     "Sayısal değerleri toplar",
     "En düşük değeri bulur"
    ],
    "a": 2,
    "exp": "SUM sayısal değerlerin toplamını verir.",
    "src": "Kitapçık 37",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Aşağıdaki SQL anahtar sözcüklerinden hangisi sıralama amacı taşır?",
    "opts": [
     "ORDER BY",
     "GROUP BY",
     "WHERE",
     "HAVING"
    ],
    "a": 0,
    "exp": "ORDER BY sonuç satırlarını sıralar.",
    "src": "Kitapçık 38",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Veritabanında indeks oluşturmanın tipik amacı nedir?",
    "opts": [
     "Tabloyu silmek",
     "Bazı aramaları hızlandırmak",
     "SQL’i devre dışı bırakmak",
     "Bütün tekrarları yasaklamak"
    ],
    "a": 1,
    "exp": "Index özellikle uygun aramalarda sorgu performansına yardım eder.",
    "src": "Kitapçık 39",
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "SQL’de “AS” en yaygın olarak ne sağlar?",
    "opts": [
     "Kayıtları silme",
     "Tabloyu oluşturma",
     "Sütuna / tabloya takma ad verme",
     "Yetkiyi geri alma"
    ],
    "a": 2,
    "exp": "AS sütun veya tablo için alias (takma ad) oluşturur.",
    "src": "Kitapçık 40",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Bir işlem henüz COMMIT edilmemişken değişiklikleri geri almak için hangi komut kullanılır?",
    "opts": [
     "GRANT",
     "INSERT",
     "ROLLBACK",
     "DISTINCT"
    ],
    "a": 2,
    "exp": "ROLLBACK devam eden bir işlemin geri alınmasını sağlar.",
    "src": "Kitapçık 41",
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "Sırasıyla WHERE, GROUP BY ve HAVING ifadelerinin görevleri hangisidir?",
    "opts": [
     "Grup filtrele – sırala – satır filtrele",
     "Satır filtrele – grupla – grup filtrele",
     "Grupla – grup filtrele – satır filtrele",
     "Sırala – grupla – tablo sil"
    ],
    "a": 1,
    "exp": "WHERE satır; GROUP BY grup oluşturma; HAVING grup filtresi içindir.",
    "src": "Kitapçık 42",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Ogrenci tablosundaki yas değerleri 18, NULL, 22 ve 20 ise COUNT(*) / COUNT(yas) kaçtır?",
    "opts": [
     "3 / 3",
     "4 / 3",
     "4 / 4",
     "3 / 4"
    ],
    "a": 1,
    "exp": "4 satırın hepsi COUNT(*) içinde; NULL olan yas, COUNT(yas) içinde değildir.",
    "src": "Kitapçık 43",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "LIKE 'A_' deseni için hangi ad tam olarak eşleşir?",
    "opts": [
     "A",
     "Ali",
     "Ay",
     "Ankara"
    ],
    "a": 2,
    "exp": "_ tam bir karakterdir; 'Ay' iki harfli ve A ile başlayan tek uygun değerdir.",
    "src": "Kitapçık 44",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "UNION ALL ile UNION arasındaki temel fark nedir?",
    "opts": [
     "UNION ALL tekrar eden satırları korur",
     "UNION ALL yalnız tek sütunla çalışır",
     "UNION tekrar edenleri mutlaka korur",
     "UNION sadece sayısal verilerle çalışır"
    ],
    "a": 0,
    "exp": "UNION ALL tekrarları kaldırmaz; UNION tekrarları kaldırır.",
    "src": "Kitapçık 45",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Bir sanatçı birçok festivale, bir festival birçok sanatçıya ev sahipliği yapabiliyorsa gerçek dünyadaki ilişki hangisidir?",
    "opts": [
     "1:1",
     "1:N",
     "N:1",
     "N:N"
    ],
    "a": 3,
    "exp": "İki yönde de çokluk olduğu için N:N gerekir; nottaki çizili Festival 1:N modeli ayrı durumdur.",
    "src": "Kitapçık 46",
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "`SELECT sehir, COUNT(*) FROM Ogrenci GROUP BY sehir HAVING COUNT(*) > 2;` sorgusu neyi getirir?",
    "opts": [
     "2’den fazla kayıt olan şehir gruplarını ve sayılarını",
     "Her şehir için en fazla 2 öğrenciyi",
     "Şehir sütununu silmeyi",
     "Tüm kayıtları şehirden bağımsız saymayı"
    ],
    "a": 0,
    "exp": "HAVING COUNT(*) > 2 sadece 3 veya daha fazla kaydı olan grupları tutar.",
    "src": "Kitapçık 47",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi NULL değer kontrolü için doğrudur?",
    "opts": [
     "NULL ile = karşılaştırması TRUE döner",
     "NULL, sıfırın tam eş anlamlısıdır",
     "IS NULL ifadesi kullanılmalıdır",
     "NULL her zaman boş metindir"
    ],
    "a": 2,
    "exp": "NULL bilinmeyen/eksik değeri gösterir ve IS NULL ile kontrol edilir.",
    "src": "Kitapçık 48",
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "3NF normalizasyonunun temel hedefi hangi bağımlılığı önlemektir?",
    "opts": [
     "Sütunların tek değerli oluşunu",
     "Anahtar olmayan alanlar arasındaki geçişli bağımlılığı",
     "Birincil anahtar kullanımını",
     "Her tablonun bir satır içermesini"
    ],
    "a": 1,
    "exp": "3NF, uygun anahtar dışı alanlar arasında geçişli fonksiyonel bağımlılığı kaldırır.",
    "src": "Kitapçık 49",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "SELECT ile ilgili aşağıdakilerden hangisi en doğrudur?",
    "opts": [
     "Her kaynakta kesinlikle sadece DDL olarak sınıflanır",
     "Sadece tablo silmek içindir",
     "DQL olarak sınıflandırılabilir; bazı kaynaklar DML içinde ele alır",
     "Yalnız yetki verme amacıyla kullanılır"
    ],
    "a": 2,
    "exp": "SELECT genelde DQL olarak öğretilir, bazı sınıflamalarda DML içinde yer alır.",
    "src": "Kitapçık 50",
    "topic": "gruplar"
   }
  ]
 },
 {
  "id": "deneme1",
  "title": "Deneme vizesi 1",
  "desc": "16 test + 4 boşluk doldurma, her konudan soru. 20 × 5 = 100 puan (format varsayım).",
  "group": "vize",
  "mode": "exam",
  "questions": [
   {
    "type": "mc",
    "q": "Excel ile ilgili hangisi doğrudur?",
    "opts": [
     "Excel bir veritabanı yönetim sistemidir.",
     "Excel dosyalarında veri tekrarı olamaz.",
     "Excel aynı anda binlerce kullanıcının güvenle işlem yapmasını sağlar.",
     "Küçük listeler için iyidir ama binlerce kullanıcının aynı anda veri girdiği sistemlerde yetersiz kalır.",
     "Excel, MySQL'in arayüzüdür."
    ],
    "a": 3,
    "exp": "Hoca: öğrencilerin sık düştüğü hata Excel'i veritabanı sanmaktır. Eş zamanlı erişim, veri bütünlüğü ve hızlı arama için veritabanı gerekir.",
    "why": {
     "4": "MySQL'in arayüzleri phpMyAdmin ve HeidiSQL'dir."
    },
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "Hocanın senaryosunda aynı anda 50 personel `ogrenciler.xlsx` dosyasından öğrenci bilgisi güncellemek istiyor. Hangi sorun ortaya çıkar?",
    "opts": [
     "Veri tekrarı",
     "Güvenlik eksikliği",
     "Yedekleme eksikliği",
     "Kilitlenme ve veri kaybı (eş zamanlı erişim)",
     "Veri tipi hatası"
    ],
    "a": 3,
    "exp": "Aynı dosyayı aynı anda değiştirenler birbirinin üzerine yazar; dosya kilitlenir, veri kaybolur. Bu **eş zamanlı erişim (concurrency)** sorunudur.",
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "**NoSQL** kısaltmasının açılımı nedir?",
    "opts": [
     "New Object SQL",
     "Network of SQL",
     "Not Only SQL",
     "Non Query Language",
     "No SQL Language"
    ],
    "a": 2,
    "exp": "NoSQL = **Not Only SQL**: tablo zorunluluğu olmayan, esnek modeller kullanan veritabanları.",
    "why": {
     "4": "NoSQL \"SQL yok\" demek değildir; \"sadece SQL değil\" demektir."
    },
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi verileri JSON benzeri dokümanlarda saklayan NoSQL veritabanıdır?",
    "opts": [
     "PostgreSQL",
     "Microsoft SQL Server",
     "MySQL",
     "MongoDB",
     "Oracle Database"
    ],
    "a": 3,
    "exp": "Hocanın notundaki NoSQL örneği **MongoDB**. Diğerleri ilişkisel DBMS.",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "5.000 öğrencili bir üniversitenin öğrenci verileri için hocanın önerdiği çözüm hangisidir?",
    "opts": [
     "Kağıt arşiv",
     "Düz metin dosyaları",
     "Hadoop kümesi",
     "Tek bir Excel dosyası",
     "İlişkisel bir veritabanı (MySQL)"
    ],
    "a": 4,
    "exp": "Hoca: 5.000 öğrenci için ilişkisel veritabanı (MySQL) **doğru tercihtir**. Büyük veri teknolojileri çok daha büyük ölçek için.",
    "topic": "buyukveri"
   },
   {
    "type": "mc",
    "q": "YouTube'a her dakika yüzlerce saatlik video yüklenmesi ve her gün petabaytlarca verinin eklenmesi 5V'den hangisine örnektir?",
    "opts": [
     "Volume (Hacim)",
     "Value (Değer)",
     "Velocity (Hız)",
     "Variety (Çeşitlilik)",
     "Veracity (Doğruluk)"
    ],
    "a": 0,
    "exp": "Devasa veri büyüklüğü **Volume (Hacim)**dir.",
    "topic": "buyukveri"
   },
   {
    "type": "mc",
    "q": "Bir bölümde birçok öğrenci okuyabiliyor, her öğrenci resmi olarak tek bir bölüme bağlı. Bölüm–Öğrenci ilişkisi nedir?",
    "opts": [
     "1:1",
     "N:1 (bölüm tarafı çok)",
     "Tanımlanamaz",
     "N:N",
     "1:N"
    ],
    "a": 4,
    "exp": "Bölüm (1) — Okur — Öğrenci (N): **bire çok**.",
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "\"Bir öğrenci birden fazla ders alabilir mi?\" Evet. \"Bir dersi birden fazla öğrenci alabilir mi?\" Evet. İlişki türü nedir?",
    "opts": [
     "1:N",
     "N:1",
     "1:1",
     "Belirlenemez",
     "N:N"
    ],
    "a": 4,
    "exp": "İki yönde de \"evet\" → **çoka çok (N:N)**.",
    "why": {
     "0": "1:N için yönlerden birinin cevabı \"hayır\" olmalı."
    },
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "ÇIKAR tablosuna göre POP RÜZGARI sahnesine (SAHNE_ID = 1) çıkan sanatçılar kimlerdir?",
    "opts": [
     "AA AA",
     "AA AA, BB BB, CC CC",
     "AA AA, BB BB",
     "BB BB, CC CC",
     "DD DD"
    ],
    "a": 2,
    "exp": "SAHNE_ID = 1 olan satırlar: SANATCI_ID 1 (AA AA) ve 2 (BB BB). Bir sahneye birden çok sanatçı çıkabiliyor: çoka çok.",
    "tbl": [
     {
      "cap": "**sanatci** tablosu",
      "head": [
       "id",
       "adi",
       "sanat_turu",
       "festival_id"
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
      "cap": "**cikar** tablosu",
      "head": [
       "id",
       "sanatci_id",
       "sahne_id"
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
     }
    ],
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "SANATCI ile SAHNE arasındaki ilişkinin adı ve türü nedir?",
    "opts": [
     "alır, N:N",
     "katılır, 1:N",
     "çıkar, çoka çok (M:N)",
     "çıkar, 1:1",
     "okur, 1:N"
    ],
    "a": 2,
    "exp": "\"Sanatçı sahneye çıkar.\" İki yönde de birden fazla mümkün → **çoka çok**.",
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "Tablolar arasında köprü kurup referans bütünlüğünü koruyan kısıt hangisidir?",
    "opts": [
     "DEFAULT",
     "CHECK",
     "PRIMARY KEY",
     "UNIQUE",
     "FOREIGN KEY"
    ],
    "a": 4,
    "exp": "**FOREIGN KEY** başka tablodaki anahtara bağlanır; olmayan bir kayda işaret edilmesini engeller.",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "Bir sistemde aynı e-posta adresiyle birden fazla hesap açılmasını engellemek için hangi kısıt kullanılır?",
    "opts": [
     "UNIQUE",
     "NOT NULL",
     "FOREIGN KEY",
     "DEFAULT",
     "CHECK"
    ],
    "a": 0,
    "exp": "Hocanın örneği: `eposta VARCHAR(150) UNIQUE`.",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "`aktif_mi`, `mezun_mu` gibi doğru/yanlış değerleri için hangi veri tipi kullanılır?",
    "opts": [
     "BOOLEAN",
     "INT AUTO_INCREMENT",
     "DECIMAL(10,2)",
     "VARCHAR(100)",
     "DATE"
    ],
    "a": 0,
    "exp": "**BOOLEAN** (MySQL'de arka planda TINYINT(1)).",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "MySQL'de tarih sütununa değer hangi biçimde girilir?",
    "opts": [
     "'YYYY/DD/MM'",
     "'YYYY-MM-DD' (ör. '2021-11-15')",
     "Tırnaksız 20211115",
     "'DD.MM.YYYY' (ör. '15.11.2021')",
     "'MM/DD/YYYY'"
    ],
    "a": 1,
    "exp": "YYYY dört basamaklı yıl, MM iki basamaklı ay, DD iki basamaklı gün.",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "`SELECT ad FROM Ogrenci ORDER BY yas DESC LIMIT 1;` hangi adı verir?",
    "opts": [
     "Ay",
     "Ece",
     "Ayşe",
     "Can",
     "Ali"
    ],
    "a": 0,
    "exp": "DESC büyükten küçüğe sıralar; en büyük yaş 22 (Ay). LIMIT 1 ilk satırı alır.",
    "why": {
     "4": "Ali en küçük yaş (17); bu ASC olsaydı gelirdi.",
     "3": "NULL azalan sıralamada en sona düşer."
    },
    "tbl": [
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
      ]
     }
    ],
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "CRUD kısaltmasındaki \"C\" hangi SQL komutuna karşılık gelir?",
    "opts": [
     "CREATE TABLE",
     "COMMIT",
     "INSERT",
     "COUNT",
     "SELECT"
    ],
    "a": 2,
    "exp": "Create (kayıt oluştur) = **INSERT**, Read = SELECT, Update = UPDATE, Delete = DELETE.",
    "why": {
     "0": "Tuzak: CREATE TABLE yapı oluşturur (DDL). CRUD'daki Create kayıt eklemektir.",
     "4": "SELECT, R (Read)."
    },
    "topic": "gruplar"
   },
   {
    "type": "fill",
    "q": "Aynı verinin gereksiz yere birden fazla yerde saklanmasına ne denir? (veri ____)",
    "code": "-- Aynı adres hem öğrenci hem yurt dosyasında = veri ____",
    "ans": [
     "tekrarı",
     "tekrari",
     "tekrar",
     "redundancy"
    ],
    "cs": false,
    "exp": "**Veri tekrarı (redundancy).** Tutarsızlık bunun sonucudur.",
    "whyFill": {
     "tutarsızlığı": "Tutarsızlık tekrarın sonucudur: kopyalardan biri güncellenip diğeri unutulunca oluşur."
    },
    "topic": "giris"
   },
   {
    "type": "fill",
    "q": "MySQL bir DBMS'dir; phpMyAdmin ise MySQL'i görsel yöneten bir ____ aracıdır.",
    "code": "-- phpMyAdmin, HeidiSQL = ____ (GUI)",
    "ans": [
     "arayüz",
     "arayuz",
     "GUI",
     "ara yüz"
    ],
    "cs": false,
    "exp": "phpMyAdmin ve HeidiSQL **arayüz (GUI)** araçlarıdır.",
    "topic": "dbms"
   },
   {
    "type": "fill",
    "q": "5V'de verinin kalitesi ve güvenilirliği (gürültülü/sahte verinin ayıklanması) hangi İngilizce kelimeyle anılır?",
    "code": "-- Bileklikte nabız 200 (cihaz hatası) → ____",
    "ans": [
     "Veracity"
    ],
    "cs": false,
    "exp": "**Veracity** = doğruluk/güvenilirlik.",
    "whyFill": {
     "Velocity": "Velocity hızdır (kredi kartı örneği). Doğruluk/güvenilirlik Veracity.",
     "Value": "Value değerdir (Spotify örneği)."
    },
    "topic": "buyukveri"
   },
   {
    "type": "fill",
    "q": "ER diyagramında **ilişki** hangi şekille çizilir? (tek kelime)",
    "code": "-- Dikdörtgen = varlık, elips = öznitelik, ____ = ilişki",
    "ans": [
     "elmas",
     "baklava",
     "eşkenar dörtgen",
     "eskenar dortgen",
     "diamond"
    ],
    "cs": false,
    "exp": "İlişki **elmas (baklava, eşkenar dörtgen)** ile çizilir.",
    "whyFill": {
     "paralelkenar": "Kitapçık tuzağı: paralelkenar değil, eşkenar dörtgen (elmas/baklava).",
     "elips": "Elips özniteliktir."
    },
    "topic": "er"
   }
  ]
 },
 {
  "id": "deneme2",
  "title": "Deneme vizesi 2",
  "desc": "16 test + 4 boşluk doldurma, her konudan soru. 20 × 5 = 100 puan (format varsayım).",
  "group": "vize",
  "mode": "exam",
  "questions": [
   {
    "type": "mc",
    "q": "**Veri bütünlüğü (data integrity)** neyi ifade eder?",
    "opts": [
     "Tabloların silinmesini",
     "Verinin anlamlı hâle getirilmesini",
     "Verilerin bulutta dağıtık tutulmasını",
     "Verinin birden fazla yerde saklanmasını",
     "Verilerin tutarlı, doğru ve güvenilir olmasını sağlayan kurallar bütününü"
    ],
    "a": 4,
    "exp": "Veri bütünlüğü verinin tutarlı, doğru ve güvenilir kalmasıdır; veritabanı bunu kurallarla (kısıtlarla) korur.",
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "**Veri (data)** kavramının tanımı hangisidir?",
    "opts": [
     "Tablolar arasındaki bağlantı",
     "Verinin yedek kopyası",
     "İşlenmemiş, ham, tek başına anlam taşımayan gözlem veya ölçümler",
     "Verilerin işlenip karar verilebilir hâle gelmiş biçimi",
     "Veritabanını yöneten yazılım"
    ],
    "a": 2,
    "exp": "Veri ham maddedir; işlenmiş ve anlam kazanmış hâli **bilgi**dir.",
    "why": {
     "3": "Bu bilginin (information) tanımıdır.",
     "4": "Bu DBMS'in tanımıdır."
    },
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "phpMyAdmin ile HeidiSQL arasındaki fark hangisidir?",
    "opts": [
     "phpMyAdmin komut satırıdır, HeidiSQL web arayüzüdür.",
     "phpMyAdmin bir DBMS, HeidiSQL bir dildir.",
     "phpMyAdmin web tarayıcısından, HeidiSQL masaüstünden çalışan arayüzdür.",
     "HeidiSQL sadece NoSQL için kullanılır.",
     "İkisi de MySQL'in yerine geçen veritabanı motorudur."
    ],
    "a": 2,
    "exp": "phpMyAdmin web arayüzü (SQL sekmesi var), HeidiSQL masaüstü aracı. İkisi de MySQL'i yönetir.",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "phpMyAdmin ve HeidiSQL nedir?",
    "opts": [
     "Büyük veri teknolojileri",
     "NoSQL veritabanları",
     "Veritabanı yönetim sistemleri",
     "Sorgu dilleri",
     "MySQL'i görsel olarak yönetmeyi sağlayan arayüz (GUI) araçları"
    ],
    "a": 4,
    "exp": "İkisi de fareyle tıklayarak veritabanı ve tablo oluşturmayı sağlayan **arayüz** programlarıdır.",
    "why": {
     "2": "DBMS MySQL'dir; bu araçlar onu yönetir."
    },
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Geleneksel veritabanları ile büyük veri teknolojileri arasındaki ilişki hangisidir?",
    "opts": [
     "Birbirinin rakibidir; biri diğerini yok eder.",
     "Büyük veri sadece küçük veriler içindir.",
     "Geleneksel veritabanları demode olmuştur.",
     "Farklı ölçeklerdeki problemlere çözüm sunan tamamlayıcı teknolojilerdir.",
     "İkisi aynı teknolojinin farklı adlarıdır."
    ],
    "a": 3,
    "exp": "Geleneksel veritabanları kurumsal uygulamaların kalbidir; büyük veri teknolojileri onların yetersiz kaldığı aşırı büyük veri için alternatif sunar.",
    "topic": "buyukveri"
   },
   {
    "type": "mc",
    "q": "Veri modeli için hocanın benzetmesi hangisidir?",
    "opts": [
     "Restoranın menüsü",
     "Deponun güvenlik ekibi",
     "Binanın mimari projesi",
     "Kütüphanedeki kitap",
     "Arabanın motoru"
    ],
    "a": 2,
    "exp": "Veri modeli veritabanının **mimari projesidir**; projesiz bina dikmek gibi plansız tablo kurulmaz.",
    "why": {
     "0": "Menü benzetmesi SQL için (SQL = menü dili, MySQL = mutfak).",
     "1": "Güvenlik ekibi DBMS benzetmesi."
    },
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "Festival (1) — katılır — Sanatçı (N) ilişkisi tablolara dönüştürülürken FK hangi tabloya eklenir?",
    "opts": [
     "FESTİVAL tablosuna SANATCI_ID",
     "Yeni bir ara tabloya",
     "SANATCI tablosuna FESTIVAL_ID",
     "Her iki tabloya",
     "SAHNE tablosuna"
    ],
    "a": 2,
    "exp": "1:N'de FK **çok** tarafına konur: hocanın SANATCI tablosunda `FESTIVAL_ID (FK)` var.",
    "why": {
     "0": "Festival satırına birden çok sanatçı yazılamaz; FK çok tarafa gider.",
     "1": "Ara tablo N:N için gerekir."
    },
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "Birden çok sütundan oluşan anahtara ne denir?",
    "opts": [
     "Aday anahtar",
     "Tekil anahtar",
     "Yabancı anahtar",
     "Bileşik anahtar",
     "Varsayılan anahtar"
    ],
    "a": 3,
    "exp": "Ör. `PRIMARY KEY (ogrenci_id, ders_id)` **bileşik** birincil anahtardır.",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "SQL'in açılımı nedir?",
    "opts": [
     "System Quality Language",
     "Structured Query Language",
     "Simple Question Language",
     "Standard Quick Logic",
     "Sequential Query List"
    ],
    "a": 1,
    "exp": "SQL = **Structured Query Language** (Yapılandırılmış Sorgu Dili).",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "Var olan `ogrenci` tablosuna yeni bir `eposta` sütunu eklemek için boşluğa ne gelmelidir?",
    "opts": [
     "CREATE",
     "ALTER",
     "INSERT",
     "MODIFY",
     "UPDATE"
    ],
    "a": 1,
    "exp": "`ALTER TABLE` var olan tablonun yapısını değiştirir.",
    "code": "____ TABLE ogrenci ADD eposta VARCHAR(150);",
    "why": {
     "4": "UPDATE satırlardaki değeri değiştirir, yapıyı değil.",
     "2": "INSERT satır ekler, sütun değil."
    },
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "Bir sütuna varsayılan (DEFAULT) değerin girilmesi için hocanın gösterdiği iki yol hangisidir?",
    "opts": [
     "Sütunu silmek ya da yeniden oluşturmak",
     "Sütunu INSERT listesine hiç yazmamak ya da değer yerine DEFAULT yazmak",
     "UPDATE kullanmak ya da DELETE kullanmak",
     "Boş metin yazmak ya da sütunu UNIQUE yapmak",
     "Değere NULL yazmak ya da 0 yazmak"
    ],
    "a": 1,
    "exp": "(1) sütunu listeye yazmamak, (2) `VALUES (…, DEFAULT)`.",
    "why": {
     "4": "NULL yazarsan sütuna NULL girmeye çalışılır (NOT NULL ise hata); DEFAULT değeri gelmez."
    },
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "INSERT INTO'da sütun listesi ile VALUES listesi için hangisi doğrudur?",
    "opts": [
     "Değerler virgül olmadan yazılır",
     "Sayıları aynı olmalı ve konumları birbirine karşılık gelmeli",
     "Metin değerler tırnaksız yazılır",
     "Değer sayısı sütun sayısından fazla olabilir",
     "Sıra önemli değildir, MySQL kendisi eşler"
    ],
    "a": 1,
    "exp": "Hocanın notu: sütunların ve değerlerin **sayısı aynı**, **konumları** birbirine karşılık gelmeli.",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "`SELECT ad FROM Ogrenci WHERE ad LIKE 'A%';` sorgusunun sonucu hangisidir?",
    "opts": [
     "Ayşe, Ali, Ay, Can",
     "Ali",
     "Ayşe, Ali, Ay",
     "Ay",
     "Ali, Ay"
    ],
    "a": 2,
    "exp": "`%` sıfır ya da çok karakter: A ile başlayan **bütün** adlar gelir.",
    "why": {
     "3": "Sadece Ay'ı `A_` deseni getirir."
    },
    "tbl": [
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
      ]
     }
    ],
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "`SELECT SUM(stok) FROM Urun WHERE kategori = 'Kırtasiye';` sorgusunun sonucu nedir?",
    "opts": [
     "140",
     "NULL",
     "3",
     "65",
     "145"
    ],
    "a": 0,
    "exp": "SUM NULL'ı atlar: 100 + 40 = **140** (Silgi'nin stoğu NULL).",
    "why": {
     "1": "Bir değer NULL diye toplam NULL olmaz; SUM NULL'ları atlar.",
     "2": "3 satır sayısı (COUNT)."
    },
    "tbl": [
     {
      "cap": "**Urun** tablosu",
      "head": [
       "urun_id",
       "ad",
       "kategori",
       "fiyat",
       "stok"
      ],
      "rows": [
       [
        "1",
        "Kalem",
        "Kırtasiye",
        "10",
        "100"
       ],
       [
        "2",
        "Defter",
        "Kırtasiye",
        "25",
        "40"
       ],
       [
        "3",
        "Silgi",
        "Kırtasiye",
        "5",
        "NULL"
       ],
       [
        "4",
        "Çay",
        "Market",
        "30",
        "60"
       ],
       [
        "5",
        "Kahve",
        "Market",
        "80",
        "20"
       ],
       [
        "6",
        "Su",
        "Market",
        "5",
        "200"
       ]
      ]
     }
    ],
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "Aşağıdaki işlem bloğundan sonra `SELECT COUNT(*) FROM Ogrenci;` kaç döndürür?",
    "opts": [
     "5",
     "3",
     "0",
     "2",
     "Komut hata verir"
    ],
    "a": 0,
    "exp": "`ROLLBACK` henüz onaylanmamış silmeyi geri alır; tabloda yine 5 öğrenci var.",
    "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE yas < 20;\nROLLBACK;",
    "why": {
     "1": "COMMIT olsaydı 3 kalırdı; ROLLBACK silmeyi geri aldı."
    },
    "tbl": [
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
      ]
     }
    ],
    "topic": "gruplar"
   },
   {
    "type": "mc",
    "q": "COMMIT, ROLLBACK ve SAVEPOINT hangi komut grubundadır?",
    "opts": [
     "DML",
     "DQL",
     "DCL",
     "DDL",
     "TCL"
    ],
    "a": 4,
    "exp": "**TCL (Transaction Control Language)** işlemleri onaylar ya da geri alır.",
    "topic": "gruplar"
   },
   {
    "type": "fill",
    "q": "Sanatçı–Sahne çoka çok ilişkisini çözen ara tablonun hocanın verdiği adı nedir?",
    "code": "-- SANATCI (M) — çıkar — SAHNE (N)  →  ara tablo: ____ (ID, SANATCI_ID, SAHNE_ID)",
    "ans": [
     "ÇIKAR",
     "çıkar",
     "cikar",
     "çikar"
    ],
    "cs": false,
    "exp": "Ara tablonun adı ilişkinin adından gelir: **ÇIKAR**.",
    "topic": "festival"
   },
   {
    "type": "fill",
    "q": "`ogrenci` tablosundaki `bolum_id` sütununu `bolum` tablosuna bağlayan satırı tamamlayın.",
    "code": "CREATE TABLE ogrenci2 (\n  ogrenci_id INT PRIMARY KEY,\n  bolum_id INT,\n  FOREIGN KEY (bolum_id) ____ bolum(bolum_id)\n);",
    "ans": [
     "REFERENCES"
    ],
    "cs": false,
    "exp": "`FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)`. Artık olmayan bir bölümle öğrenci eklenemez.",
    "whyFill": {
     "REFERENCE": "Sonunda S var: REFERENCES."
    },
    "topic": "anahtar"
   },
   {
    "type": "fill",
    "q": "Tablonun kendisini ve içindeki tüm verileri kalıcı olarak silen komutu tamamlayın.",
    "code": "____ TABLE kayit;",
    "ans": [
     "DROP"
    ],
    "cs": false,
    "exp": "`DROP TABLE` yapıyı ve veriyi siler; geri dönüşü yoktur.",
    "whyFill": {
     "TRUNCATE": "TRUNCATE tabloyu korur, sadece satırları boşaltır.",
     "DELETE": "DELETE FROM satır siler, tablo kalır."
    },
    "topic": "ddl"
   },
   {
    "type": "fill",
    "q": "`oncelik` sütununa varsayılan değeri (3) yazdırmak için değer yerine ne yazılır?",
    "code": "INSERT INTO gorevler (baslik, oncelik)\n  VALUES ('MySQL varsayılan değerin giriş 2', ____);",
    "ans": [
     "DEFAULT"
    ],
    "cs": false,
    "exp": "`DEFAULT` yazınca sütunun varsayılan değeri (3) girilir.",
    "whyFill": {
     "NULL": "NULL yazarsan NOT NULL olan sütun hata verir; varsayılan için DEFAULT.",
     "3": "Sonuç aynı olur ama soru varsayılanı yazdıran anahtar kelimeyi istiyor: DEFAULT."
    },
    "topic": "insert"
   }
  ]
 },
 {
  "id": "deneme3",
  "title": "Deneme vizesi 3",
  "desc": "16 test + 4 boşluk doldurma, her konudan soru. 20 × 5 = 100 puan (format varsayım).",
  "group": "vize",
  "mode": "exam",
  "questions": [
   {
    "type": "mc",
    "q": "Hocanın notuna göre aşağıdakilerden hangisi **bilgi**dir?",
    "opts": [
     "Veritabanı Teknolojileri",
     "Ali'nin Veritabanı Teknolojileri sınavından aldığı not 85'tir.",
     "85",
     "Ali",
     "2026"
    ],
    "a": 1,
    "exp": "Ham veriler (Ali, 85, ders adı) anlamlı bir cümleye dönüşünce **bilgi** olur. Tek başına \"85\" ya da \"Ali\" sadece veridir.",
    "why": {
     "2": "\"85\" tek başına veridir: not mu, sıcaklık mı, para mı bilinmez.",
     "3": "\"Ali\" tek başına bir isim, yani veridir."
    },
    "topic": "giris"
   },
   {
    "type": "mc",
    "q": "Veritabanlarının tarihsel gelişim sırası hangisidir?",
    "opts": [
     "Bulut → NoSQL → ilişkisel → hiyerarşik → dosya tabanlı",
     "Hiyerarşik → dosya tabanlı → bulut → ilişkisel → NoSQL",
     "NoSQL → ilişkisel → dosya tabanlı → bulut → hiyerarşik",
     "İlişkisel → dosya tabanlı → NoSQL → hiyerarşik → bulut",
     "Dosya tabanlı → hiyerarşik/ağ → ilişkisel → NoSQL → bulut/dağıtık"
    ],
    "a": 4,
    "exp": "1960 öncesi dosya → 1960–70 hiyerarşik/ağ → 1970–2000 ilişkisel → 2000 sonrası NoSQL → günümüz bulut ve dağıtık sistemler.",
    "topic": "dbms"
   },
   {
    "type": "mc",
    "q": "Kolunu hızla sallayan hastanın akıllı bileklikte nabzının 200 görünmesi, 5V'den hangisiyle ilgilidir?",
    "opts": [
     "Veracity (Doğruluk)",
     "Variety (Çeşitlilik)",
     "Volume (Hacim)",
     "Velocity (Hız)",
     "Value (Değer)"
    ],
    "a": 0,
    "exp": "Cihaz hatasından gelen kirli/gürültülü veriyi gerçek veriden ayırmak **Veracity (Doğruluk)** yönetimidir.",
    "why": {
     "2": "Velocity verinin akış hızıdır (kredi kartı örneği). Bileklik örneği verinin güvenilirliğiyle ilgili."
    },
    "topic": "buyukveri"
   },
   {
    "type": "mc",
    "q": "Aşağıdakilerden hangisi hocanın notunda büyük veri teknolojisi olarak geçer?",
    "opts": [
     "Hadoop ve Spark",
     "Excel ve Word",
     "COMMIT ve ROLLBACK",
     "INT ve VARCHAR",
     "phpMyAdmin ve HeidiSQL"
    ],
    "a": 0,
    "exp": "**Hadoop ve Spark** dönem sonunda kavramsal olarak işlenecek büyük veri teknolojileri.",
    "topic": "buyukveri"
   },
   {
    "type": "mc",
    "q": "Her kişinin bir pasaportu var ve her pasaport yalnızca bir kişiye ait. Kişi–Pasaport ilişkisi nedir?",
    "opts": [
     "1:1",
     "İlişki yoktur",
     "N:N",
     "N:1",
     "1:N"
    ],
    "a": 0,
    "exp": "İki tarafta da \"birden fazla olabilir mi?\" sorusunun cevabı hayır → **bire bir (1:1)**.",
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "ER diyagramında birincil anahtar (PK) nasıl gösterilir?",
    "opts": [
     "Kırmızıya boyanır",
     "Çift dikdörtgen çizilir",
     "Öznitelik adının altı çizilir",
     "Elmasın içine yazılır",
     "Ok ile işaretlenir"
    ],
    "a": 2,
    "exp": "Hocanın notu: **altı çizili alan** birincil anahtardır (ör. Öğrenci_No).",
    "topic": "er"
   },
   {
    "type": "mc",
    "q": "SANATCI tablosuna göre ABC FESTİVALİ'ne (ID = 1) kaç sanatçı katılmaktadır?",
    "opts": [
     "0",
     "4",
     "3",
     "2",
     "1"
    ],
    "a": 3,
    "exp": "FESTIVAL_ID = 1 olan sanatçılar: AA AA ve BB BB.",
    "tbl": [
     {
      "cap": "**sanatci** tablosu",
      "head": [
       "id",
       "adi",
       "sanat_turu",
       "festival_id"
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
     }
    ],
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "Hocanın Festival sorusunda FESTİVAL ile SANATCI arasındaki ilişki türü nedir?",
    "opts": [
     "İlişki kurulmamıştır",
     "1:N (FESTİVAL 1, SANATCI N)",
     "N:N",
     "1:1",
     "N:1 (FESTİVAL N, SANATCI 1)"
    ],
    "a": 1,
    "exp": "Hoca: FESTİVAL (1) — katılır — SANATCI (N). Bir festivale birden fazla sanatçı katılır.",
    "why": {
     "2": "Gerçek hayatta N:N olurdu ama hoca \"aynı saat ve gün\" varsayımıyla 1:N kurdu."
    },
    "topic": "festival"
   },
   {
    "type": "mc",
    "q": "1:N ilişki tablolara dönüştürülürken ne yapılır?",
    "opts": [
     "Çok (N) taraftaki tabloya, 1 tarafın anahtarı FK olarak eklenir",
     "1 taraftaki tabloya N tarafın anahtarı eklenir",
     "İki tablo tek tabloda birleştirilir",
     "Hiçbir tabloya anahtar eklenmez",
     "Mutlaka ara tablo kurulur"
    ],
    "a": 0,
    "exp": "Ör. Bölüm (1) — Öğrenci (N): `ogrenci` tablosuna `bolum_id` FK eklenir.",
    "why": {
     "4": "Ara tablo N:N için."
    },
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "`aktif BOOLEAN DEFAULT TRUE` tanımlı bir tabloya `aktif` değeri verilmeden kayıt eklenirse ne olur?",
    "opts": [
     "aktif sütununa TRUE yazılır",
     "Komut hata verir",
     "aktif sütunu FALSE olur",
     "Kayıt eklenir ama tablo boşalır",
     "aktif sütunu NULL kalır"
    ],
    "a": 0,
    "exp": "Değer girilmeyen sütuna **DEFAULT** değeri yazılır.",
    "code": "CREATE TABLE uye (\n  uye_id INT PRIMARY KEY,\n  aktif BOOLEAN DEFAULT TRUE\n);\nINSERT INTO uye (uye_id) VALUES (1);",
    "topic": "anahtar"
   },
   {
    "type": "mc",
    "q": "Sunucuda birden fazla veritabanı varken hangisinde çalışılacağını bildiren komut hangisidir?",
    "opts": [
     "USE",
     "SELECT",
     "OPEN",
     "GO",
     "SET"
    ],
    "a": 0,
    "exp": "`USE universite;` sonraki komutların hangi veritabanında çalışacağını söyler.",
    "code": "CREATE DATABASE universite;\n____ universite;",
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "DDL komutları neyle ilgilenir?",
    "opts": [
     "İşlemlerin onaylanmasıyla",
     "Tablonun iskeletiyle (ad, sütun, veri tipi, ilişki)",
     "Tablodaki satırların eklenmesiyle",
     "Kullanıcı yetkileriyle",
     "Verilerin sorgulanmasıyla"
    ],
    "a": 1,
    "exp": "DDL yapıyı tanımlar; veri eklemek DML'in (INSERT) işi.",
    "why": {
     "2": "Bu DML (INSERT).",
     "3": "Bu DCL.",
     "0": "Bu TCL."
    },
    "topic": "ddl"
   },
   {
    "type": "mc",
    "q": "Boş `gorevler` tablosuna (gorev_id `INT AUTO_INCREMENT`) iki satır eklendi. İkinci satırın `gorev_id` değeri nedir?",
    "opts": [
     "2",
     "1",
     "NULL",
     "0",
     "3"
    ],
    "a": 0,
    "exp": "AUTO_INCREMENT her yeni satıra sıradaki tam sayıyı verir: 1, 2, …",
    "code": "INSERT INTO gorevler (baslik) VALUES ('A');\nINSERT INTO gorevler (baslik) VALUES ('B');",
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "Hocanın `gorevler` tablosuna aşağıdaki INSERT yapıldı. Yeni satırda `bitistarihi` sütununda ne yazar?",
    "opts": [
     "Günün tarihi",
     "3",
     "NULL",
     "0",
     "1"
    ],
    "a": 2,
    "exp": "`bitistarihi` için değer verilmedi ve DEFAULT tanımı yok → **NULL**.",
    "code": "CREATE TABLE IF NOT EXISTS gorevler (\n   gorev_id INT AUTO_INCREMENT,\n   baslik VARCHAR(255) NOT NULL,\n   baslamatarihi DATE,\n   bitistarihi DATE,\n   oncelik TINYINT NOT NULL DEFAULT 3,\n   aciklama TEXT,\n   PRIMARY KEY (gorev_id)\n);\nINSERT INTO gorevler(baslik, oncelik)\n   VALUES('MySQL INSERT İfadesini Öğren', 1);",
    "why": {
     "1": "3, `oncelik` sütununun DEFAULT değeri."
    },
    "topic": "insert"
   },
   {
    "type": "mc",
    "q": "Aşağıdaki sorgu kaç satır döndürür?",
    "opts": [
     "5",
     "2",
     "1",
     "3",
     "4"
    ],
    "a": 3,
    "exp": "BETWEEN sınırları **dahil** eder: 20, 22 ve 19 → 3 satır. NULL yaş hiçbir aralığa girmez.",
    "code": "SELECT ad FROM Ogrenci WHERE yas BETWEEN 19 AND 22;",
    "why": {
     "1": "Sınırlar dahil: 19 ve 22 de gelir."
    },
    "tbl": [
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
      ]
     }
    ],
    "topic": "sorgu"
   },
   {
    "type": "mc",
    "q": "GRANT ve REVOKE hangi komut grubundadır?",
    "opts": [
     "DQL",
     "DDL",
     "DML",
     "TCL",
     "DCL"
    ],
    "a": 4,
    "exp": "**DCL (Data Control Language)** erişim yetkisini yönetir.",
    "topic": "gruplar"
   },
   {
    "type": "fill",
    "q": "Ham verinin işlenip anlamlı ve karar verilebilir hâle gelmiş biçimine ne denir? (tek kelime)",
    "code": "-- Veri işlenince ____ olur.",
    "ans": [
     "bilgi",
     "information",
     "enformasyon"
    ],
    "cs": false,
    "exp": "Veri ham madde, **bilgi** onun işlenmiş hâli.",
    "whyFill": {
     "veri": "Veri ham hâldir; işlenip anlam kazanınca bilgi olur."
    },
    "topic": "giris"
   },
   {
    "type": "fill",
    "q": "Veritabanlarını oluşturan, yöneten, sorgulayan ve güvenliğini sağlayan yazılımın İngilizce kısaltması nedir?",
    "code": "-- Database Management System = ____",
    "ans": [
     "DBMS",
     "VTYS"
    ],
    "cs": false,
    "exp": "**DBMS** (Türkçesi VTYS: Veritabanı Yönetim Sistemi).",
    "whyFill": {
     "SQL": "SQL bir dildir; yönetim yazılımının kısaltması DBMS.",
     "RDBMS": "RDBMS ilişkisel DBMS'dir; genel kısaltma DBMS."
    },
    "topic": "dbms"
   },
   {
    "type": "fill",
    "q": "Adı **A ile başlayan ve tam 2 karakter** olan öğrencileri getiren deseni tamamlayın.",
    "code": "SELECT ad FROM Ogrenci WHERE ad LIKE '____';",
    "ans": [
     "A_"
    ],
    "cs": false,
    "exp": "`_` tam **bir** karakter: `A_` → Ay.",
    "whyFill": {
     "A%": "`%` sıfır ya da çok karakter: Ayşe, Ali, Ay hepsi gelir."
    },
    "tbl": [
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
      ]
     }
    ],
    "topic": "sorgu"
   },
   {
    "type": "fill",
    "q": "İşlemde yapılan değişiklikleri onaylayıp kalıcı hâle getiren komutu yazın.",
    "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE id = 4;\n____;",
    "ans": [
     "COMMIT"
    ],
    "cs": false,
    "exp": "`COMMIT` onaylar; `ROLLBACK` geri alırdı.",
    "whyFill": {
     "ROLLBACK": "ROLLBACK değişikliği geri alır, onaylamaz.",
     "SAVEPOINT": "SAVEPOINT ara nokta koyar."
    },
    "topic": "gruplar"
   }
  ]
 }
];
window.TOPIC_QUESTIONS = {
 "giris": [
  {
   "type": "mc",
   "q": "Hocanın notuna göre aşağıdakilerden hangisi **bilgi**dir?",
   "opts": [
    "Veritabanı Teknolojileri",
    "Ali'nin Veritabanı Teknolojileri sınavından aldığı not 85'tir.",
    "85",
    "Ali",
    "2026"
   ],
   "a": 1,
   "exp": "Ham veriler (Ali, 85, ders adı) anlamlı bir cümleye dönüşünce **bilgi** olur. Tek başına \"85\" ya da \"Ali\" sadece veridir.",
   "why": {
    "2": "\"85\" tek başına veridir: not mu, sıcaklık mı, para mı bilinmez.",
    "3": "\"Ali\" tek başına bir isim, yani veridir."
   },
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "**Veri (data)** kavramının tanımı hangisidir?",
   "opts": [
    "Tablolar arasındaki bağlantı",
    "Verinin yedek kopyası",
    "İşlenmemiş, ham, tek başına anlam taşımayan gözlem veya ölçümler",
    "Verilerin işlenip karar verilebilir hâle gelmiş biçimi",
    "Veritabanını yöneten yazılım"
   ],
   "a": 2,
   "exp": "Veri ham maddedir; işlenmiş ve anlam kazanmış hâli **bilgi**dir.",
   "why": {
    "3": "Bu bilginin (information) tanımıdır.",
    "4": "Bu DBMS'in tanımıdır."
   },
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Bir öğrencinin adresi hem \"Öğrenci Dosyası\"nda hem \"Yurt Başvuru Dosyası\"nda ayrı ayrı tutuluyor. Bu, dosya tabanlı sistemlerin hangi sorunudur?",
   "opts": [
    "Güvenlik eksikliği",
    "Eş zamanlı erişim problemi",
    "Yedekleme zorluğu",
    "Veri tekrarı (redundancy)",
    "Veri tutarsızlığı"
   ],
   "a": 3,
   "exp": "Aynı verinin gereksiz yere birden fazla yerde saklanması **veri tekrarı**dır.",
   "why": {
    "4": "Tutarsızlık, tekrar eden veri bir yerde güncellenip diğerinde unutulunca oluşur. Burada henüz çelişki yok, sadece tekrar var."
   },
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Öğrencinin adresi bir dosyada güncellenip diğerinde unutulursa sistemde çelişkili bilgi oluşur. Bu sorunun adı nedir?",
   "opts": [
    "Veri tekrarı",
    "Ölçeklenebilirlik",
    "Eş zamanlı erişim",
    "Veri tutarsızlığı",
    "Soyutlama"
   ],
   "a": 3,
   "exp": "**Veri tutarsızlığı** veri tekrarından kaynaklanır: iki kopya birbirini tutmaz.",
   "why": {
    "0": "Tekrar sebebidir; çelişkili bilginin kendisine tutarsızlık denir."
   },
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Hocanın senaryosunda aynı anda 50 personel `ogrenciler.xlsx` dosyasından öğrenci bilgisi güncellemek istiyor. Hangi sorun ortaya çıkar?",
   "opts": [
    "Veri tekrarı",
    "Güvenlik eksikliği",
    "Yedekleme eksikliği",
    "Kilitlenme ve veri kaybı (eş zamanlı erişim)",
    "Veri tipi hatası"
   ],
   "a": 3,
   "exp": "Aynı dosyayı aynı anda değiştirenler birbirinin üzerine yazar; dosya kilitlenir, veri kaybolur. Bu **eş zamanlı erişim (concurrency)** sorunudur.",
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Yetkisiz bir stajyerin tüm öğrencilerin not bilgilerini silebilmesi hangi sorunu gösterir?",
   "opts": [
    "Eş zamanlı erişim",
    "Veri tekrarı",
    "Güvenlik ve yetkilendirme eksikliği",
    "Hacim (Volume)",
    "Veri tutarsızlığı"
   ],
   "a": 2,
   "exp": "Dosya sistemlerinde dosya ya herkese açık ya tamamen kapalıdır; kullanıcıya sadece belirli bölümleri göstermek zordur.",
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi hocanın saydığı dosya tabanlı sistem sorunlarından biri **değildir**?",
   "opts": [
    "Sorguların SQL ile yazılması",
    "Eş zamanlı erişim problemi",
    "Yedekleme ve kurtarma zorlukları",
    "Veri tekrarı",
    "Güncelleme zorluğu"
   ],
   "a": 0,
   "exp": "Altı sorun: veri tekrarı, tutarsızlık, güncelleme zorluğu, eş zamanlı erişim, güvenlik/yetkilendirme eksikliği, yedekleme ve kurtarma zorluğu. SQL bir sorun değil, veritabanlarının çözümüdür.",
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Excel ile ilgili hangisi doğrudur?",
   "opts": [
    "Excel bir veritabanı yönetim sistemidir.",
    "Excel dosyalarında veri tekrarı olamaz.",
    "Excel aynı anda binlerce kullanıcının güvenle işlem yapmasını sağlar.",
    "Küçük listeler için iyidir ama binlerce kullanıcının aynı anda veri girdiği sistemlerde yetersiz kalır.",
    "Excel, MySQL'in arayüzüdür."
   ],
   "a": 3,
   "exp": "Hoca: öğrencilerin sık düştüğü hata Excel'i veritabanı sanmaktır. Eş zamanlı erişim, veri bütünlüğü ve hızlı arama için veritabanı gerekir.",
   "why": {
    "4": "MySQL'in arayüzleri phpMyAdmin ve HeidiSQL'dir."
   },
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "**Veri bütünlüğü (data integrity)** neyi ifade eder?",
   "opts": [
    "Tabloların silinmesini",
    "Verinin anlamlı hâle getirilmesini",
    "Verilerin bulutta dağıtık tutulmasını",
    "Verinin birden fazla yerde saklanmasını",
    "Verilerin tutarlı, doğru ve güvenilir olmasını sağlayan kurallar bütününü"
   ],
   "a": 4,
   "exp": "Veri bütünlüğü verinin tutarlı, doğru ve güvenilir kalmasıdır; veritabanı bunu kurallarla (kısıtlarla) korur.",
   "topic": "giris"
  },
  {
   "type": "mc",
   "q": "Hocanın notunda bankacılık sistemindeki tipik ilişki zinciri hangisidir?",
   "opts": [
    "hesap → müşteri → sepet → stok",
    "hasta → randevu → tahlil → reçete",
    "öğrenci → ders → not → bölüm",
    "ürün → sepet → sipariş → kargo",
    "müşteri → hesap → işlem → bakiye"
   ],
   "a": 4,
   "exp": "Bankacılıkta tipik ilişki: **müşteri → hesap → işlem → bakiye**.",
   "topic": "giris"
  },
  {
   "type": "fill",
   "q": "Ham verinin işlenip anlamlı ve karar verilebilir hâle gelmiş biçimine ne denir? (tek kelime)",
   "code": "-- Veri işlenince ____ olur.",
   "ans": [
    "bilgi",
    "information",
    "enformasyon"
   ],
   "cs": false,
   "exp": "Veri ham madde, **bilgi** onun işlenmiş hâli.",
   "whyFill": {
    "veri": "Veri ham hâldir; işlenip anlam kazanınca bilgi olur."
   },
   "topic": "giris"
  },
  {
   "type": "fill",
   "q": "Aynı verinin gereksiz yere birden fazla yerde saklanmasına ne denir? (veri ____)",
   "code": "-- Aynı adres hem öğrenci hem yurt dosyasında = veri ____",
   "ans": [
    "tekrarı",
    "tekrari",
    "tekrar",
    "redundancy"
   ],
   "cs": false,
   "exp": "**Veri tekrarı (redundancy).** Tutarsızlık bunun sonucudur.",
   "whyFill": {
    "tutarsızlığı": "Tutarsızlık tekrarın sonucudur: kopyalardan biri güncellenip diğeri unutulunca oluşur."
   },
   "topic": "giris"
  }
 ],
 "dbms": [
  {
   "type": "mc",
   "q": "MySQL nedir?",
   "opts": [
    "Bir tablo türü",
    "Veritabanını görsel yöneten web arayüzü",
    "Veritabanı yönetim sistemi (DBMS)",
    "Bir sorgu dili",
    "Bir NoSQL doküman veritabanı"
   ],
   "a": 2,
   "exp": "MySQL arka planda çalışan, verileri saklayan ana motordur: bir **DBMS**.",
   "why": {
    "1": "Bu phpMyAdmin'dir.",
    "3": "Sorgu dili SQL'dir; MySQL bu dili işleyen motordur.",
    "4": "Doküman veritabanına örnek MongoDB."
   },
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "phpMyAdmin ve HeidiSQL nedir?",
   "opts": [
    "Büyük veri teknolojileri",
    "NoSQL veritabanları",
    "Veritabanı yönetim sistemleri",
    "Sorgu dilleri",
    "MySQL'i görsel olarak yönetmeyi sağlayan arayüz (GUI) araçları"
   ],
   "a": 4,
   "exp": "İkisi de fareyle tıklayarak veritabanı ve tablo oluşturmayı sağlayan **arayüz** programlarıdır.",
   "why": {
    "2": "DBMS MySQL'dir; bu araçlar onu yönetir."
   },
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "phpMyAdmin ile HeidiSQL arasındaki fark hangisidir?",
   "opts": [
    "phpMyAdmin komut satırıdır, HeidiSQL web arayüzüdür.",
    "phpMyAdmin bir DBMS, HeidiSQL bir dildir.",
    "phpMyAdmin web tarayıcısından, HeidiSQL masaüstünden çalışan arayüzdür.",
    "HeidiSQL sadece NoSQL için kullanılır.",
    "İkisi de MySQL'in yerine geçen veritabanı motorudur."
   ],
   "a": 2,
   "exp": "phpMyAdmin web arayüzü (SQL sekmesi var), HeidiSQL masaüstü aracı. İkisi de MySQL'i yönetir.",
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "Hocanın benzetmesinde veritabanı içinde değerli eşyaların durduğu kilitli bir **depo** ise DBMS nedir?",
   "opts": [
    "Deponun içindeki eşyalar",
    "Depoya giden yol",
    "Deponun kapısındaki kilit",
    "Deponun güvenliğini sağlayan, anahtarları yöneten güvenlik ve yönetim ekibi",
    "Depodaki eşyaların listesi"
   ],
   "a": 3,
   "exp": "DBMS içeri kimin girip çıkacağına karar veren, anahtarları yöneten **profesyonel ekip**tir.",
   "why": {
    "0": "Eşyalar veridir."
   },
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "Verileri satır ve sütunlardan oluşan tablolarda tutan ve tabloları birbiriyle ilişkilendiren veritabanı türü hangisidir?",
   "opts": [
    "NoSQL doküman veritabanı",
    "İlişkisel veritabanı (RDBMS)",
    "Anahtar-değer veritabanı",
    "Dosya tabanlı sistem",
    "Graf veritabanı"
   ],
   "a": 1,
   "exp": "**İlişkisel (relational)** veritabanında veriler tablolarda tutulur ve tablolar birbirine bağlanır.",
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "**NoSQL** kısaltmasının açılımı nedir?",
   "opts": [
    "New Object SQL",
    "Network of SQL",
    "Not Only SQL",
    "Non Query Language",
    "No SQL Language"
   ],
   "a": 2,
   "exp": "NoSQL = **Not Only SQL**: tablo zorunluluğu olmayan, esnek modeller kullanan veritabanları.",
   "why": {
    "4": "NoSQL \"SQL yok\" demek değildir; \"sadece SQL değil\" demektir."
   },
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi verileri JSON benzeri dokümanlarda saklayan NoSQL veritabanıdır?",
   "opts": [
    "PostgreSQL",
    "Microsoft SQL Server",
    "MySQL",
    "MongoDB",
    "Oracle Database"
   ],
   "a": 3,
   "exp": "Hocanın notundaki NoSQL örneği **MongoDB**. Diğerleri ilişkisel DBMS.",
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "İlişkisel veritabanlarının kuramsal temellerini atan kişi kimdir?",
   "opts": [
    "Alan Turing",
    "Bill Gates",
    "Tim Berners-Lee",
    "Linus Torvalds",
    "Edgar F. Codd"
   ],
   "a": 4,
   "exp": "1970'lerde ilişkisel modelin kuramsal temelini **Edgar F. Codd** attı.",
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "Veritabanlarının tarihsel gelişim sırası hangisidir?",
   "opts": [
    "Bulut → NoSQL → ilişkisel → hiyerarşik → dosya tabanlı",
    "Hiyerarşik → dosya tabanlı → bulut → ilişkisel → NoSQL",
    "NoSQL → ilişkisel → dosya tabanlı → bulut → hiyerarşik",
    "İlişkisel → dosya tabanlı → NoSQL → hiyerarşik → bulut",
    "Dosya tabanlı → hiyerarşik/ağ → ilişkisel → NoSQL → bulut/dağıtık"
   ],
   "a": 4,
   "exp": "1960 öncesi dosya → 1960–70 hiyerarşik/ağ → 1970–2000 ilişkisel → 2000 sonrası NoSQL → günümüz bulut ve dağıtık sistemler.",
   "topic": "dbms"
  },
  {
   "type": "mc",
   "q": "Bir tabloda tek bir sanatçıya ait bütün bilgilerin bulunduğu yatay yapıya ne denir?",
   "opts": [
    "Sütun / alan",
    "İndeks",
    "Satır / kayıt",
    "Görünüm",
    "Şema"
   ],
   "a": 2,
   "exp": "Bir nesnenin tek kaydı **satırdır**. Sütun ise kayıtların bir özelliğidir (ör. `adi`).",
   "why": {
    "0": "Sütun tüm kayıtların tek bir özelliğidir, ör. bütün sanatçıların adları."
   },
   "topic": "dbms"
  },
  {
   "type": "fill",
   "q": "Veritabanlarını oluşturan, yöneten, sorgulayan ve güvenliğini sağlayan yazılımın İngilizce kısaltması nedir?",
   "code": "-- Database Management System = ____",
   "ans": [
    "DBMS",
    "VTYS"
   ],
   "cs": false,
   "exp": "**DBMS** (Türkçesi VTYS: Veritabanı Yönetim Sistemi).",
   "whyFill": {
    "SQL": "SQL bir dildir; yönetim yazılımının kısaltması DBMS.",
    "RDBMS": "RDBMS ilişkisel DBMS'dir; genel kısaltma DBMS."
   },
   "topic": "dbms"
  },
  {
   "type": "fill",
   "q": "MySQL bir DBMS'dir; phpMyAdmin ise MySQL'i görsel yöneten bir ____ aracıdır.",
   "code": "-- phpMyAdmin, HeidiSQL = ____ (GUI)",
   "ans": [
    "arayüz",
    "arayuz",
    "GUI",
    "ara yüz"
   ],
   "cs": false,
   "exp": "phpMyAdmin ve HeidiSQL **arayüz (GUI)** araçlarıdır.",
   "topic": "dbms"
  }
 ],
 "buyukveri": [
  {
   "type": "mc",
   "q": "YouTube'a her dakika yüzlerce saatlik video yüklenmesi ve her gün petabaytlarca verinin eklenmesi 5V'den hangisine örnektir?",
   "opts": [
    "Volume (Hacim)",
    "Value (Değer)",
    "Velocity (Hız)",
    "Variety (Çeşitlilik)",
    "Veracity (Doğruluk)"
   ],
   "a": 0,
   "exp": "Devasa veri büyüklüğü **Volume (Hacim)**dir.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Kredi kartı dolandırıcılık tespiti için saniyenin onda birinde analiz yapılması hangi V'dir?",
   "opts": [
    "Veracity (Doğruluk)",
    "Value (Değer)",
    "Volume (Hacim)",
    "Velocity (Hız)",
    "Variety (Çeşitlilik)"
   ],
   "a": 3,
   "exp": "Verinin anlık üretilip anlık işlenmesi **Velocity (Hız)**dır.",
   "why": {
    "0": "Veracity doğruluktur; burada vurgu hızda."
   },
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Kolunu hızla sallayan hastanın akıllı bileklikte nabzının 200 görünmesi, 5V'den hangisiyle ilgilidir?",
   "opts": [
    "Veracity (Doğruluk)",
    "Variety (Çeşitlilik)",
    "Volume (Hacim)",
    "Velocity (Hız)",
    "Value (Değer)"
   ],
   "a": 0,
   "exp": "Cihaz hatasından gelen kirli/gürültülü veriyi gerçek veriden ayırmak **Veracity (Doğruluk)** yönetimidir.",
   "why": {
    "2": "Velocity verinin akış hızıdır (kredi kartı örneği). Bileklik örneği verinin güvenilirliğiyle ilgili."
   },
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Spotify'ın dinleme verilerinden \"Haftalık Keşif\" listesi çıkarması hangi V'dir?",
   "opts": [
    "Volume (Hacim)",
    "Value (Değer)",
    "Velocity (Hız)",
    "Variety (Çeşitlilik)",
    "Veracity (Doğruluk)"
   ],
   "a": 1,
   "exp": "Veri yığınından anlamlı bir fayda üretmek **Value (Değer)**dir.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Fotoğraf, video, ses kaydı, tweet ve GPS loglarının bir arada bulunması hangi V'dir?",
   "opts": [
    "Variety (Çeşitlilik)",
    "Volume (Hacim)",
    "Veracity (Doğruluk)",
    "Velocity (Hız)",
    "Value (Değer)"
   ],
   "a": 0,
   "exp": "Farklı formatlar ve yapısal olmayan veriler **Variety (Çeşitlilik)**tir.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Büyük veri için hangisi doğrudur?",
   "opts": [
    "MySQL ile her zaman sorunsuz işlenebilen veridir.",
    "Sadece yapısal (tablo) verilerden oluşur.",
    "Geleneksel veritabanlarının işleyemeyeceği kadar büyük, hızlı akan ve çeşitli veri yığınıdır.",
    "Büyük veri teknolojileri geleneksel veritabanlarını tamamen ortadan kaldırmıştır.",
    "Sadece çok fazla satırı olan Excel dosyasıdır."
   ],
   "a": 2,
   "exp": "Büyük veri sadece \"çok veri\" değildir; 5 özelliği (5V) vardır.",
   "why": {
    "1": "Variety: video, ses, GPS gibi yapısal olmayan veriler de büyük verinin parçası."
   },
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "5.000 öğrencili bir üniversitenin öğrenci verileri için hocanın önerdiği çözüm hangisidir?",
   "opts": [
    "Kağıt arşiv",
    "Düz metin dosyaları",
    "Hadoop kümesi",
    "Tek bir Excel dosyası",
    "İlişkisel bir veritabanı (MySQL)"
   ],
   "a": 4,
   "exp": "Hoca: 5.000 öğrenci için ilişkisel veritabanı (MySQL) **doğru tercihtir**. Büyük veri teknolojileri çok daha büyük ölçek için.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Geleneksel veritabanları ile büyük veri teknolojileri arasındaki ilişki hangisidir?",
   "opts": [
    "Birbirinin rakibidir; biri diğerini yok eder.",
    "Büyük veri sadece küçük veriler içindir.",
    "Geleneksel veritabanları demode olmuştur.",
    "Farklı ölçeklerdeki problemlere çözüm sunan tamamlayıcı teknolojilerdir.",
    "İkisi aynı teknolojinin farklı adlarıdır."
   ],
   "a": 3,
   "exp": "Geleneksel veritabanları kurumsal uygulamaların kalbidir; büyük veri teknolojileri onların yetersiz kaldığı aşırı büyük veri için alternatif sunar.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi hocanın notunda büyük veri teknolojisi olarak geçer?",
   "opts": [
    "Hadoop ve Spark",
    "Excel ve Word",
    "COMMIT ve ROLLBACK",
    "INT ve VARCHAR",
    "phpMyAdmin ve HeidiSQL"
   ],
   "a": 0,
   "exp": "**Hadoop ve Spark** dönem sonunda kavramsal olarak işlenecek büyük veri teknolojileri.",
   "topic": "buyukveri"
  },
  {
   "type": "mc",
   "q": "Veri ve kullanıcı sayısı arttıkça sistemin büyüyebilme kapasitesine ne denir?",
   "opts": [
    "Veri bütünlüğü",
    "Normalizasyon",
    "Kardinalite",
    "Soyutlama",
    "Ölçeklenebilirlik (scalability)"
   ],
   "a": 4,
   "exp": "**Ölçeklenebilirlik**: veri ve kullanıcı arttıkça sistemin büyüme kapasitesi.",
   "topic": "buyukveri"
  },
  {
   "type": "fill",
   "q": "5V'de verinin kalitesi ve güvenilirliği (gürültülü/sahte verinin ayıklanması) hangi İngilizce kelimeyle anılır?",
   "code": "-- Bileklikte nabız 200 (cihaz hatası) → ____",
   "ans": [
    "Veracity"
   ],
   "cs": false,
   "exp": "**Veracity** = doğruluk/güvenilirlik.",
   "whyFill": {
    "Velocity": "Velocity hızdır (kredi kartı örneği). Doğruluk/güvenilirlik Veracity.",
    "Value": "Value değerdir (Spotify örneği)."
   },
   "topic": "buyukveri"
  }
 ],
 "er": [
  {
   "type": "mc",
   "q": "ER diyagramında **varlık (entity)** hangi şekille gösterilir?",
   "opts": [
    "Ok",
    "Elips",
    "Elmas (baklava)",
    "Dikdörtgen",
    "Daire"
   ],
   "a": 3,
   "exp": "Varlık dikdörtgen, öznitelik elips, ilişki elmas.",
   "why": {
    "1": "Elips özniteliktir.",
    "2": "Elmas ilişkidir."
   },
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "ER diyagramında **öznitelik (attribute)** hangi şekille gösterilir?",
   "opts": [
    "Elips",
    "Paralelkenar",
    "Üçgen",
    "Dikdörtgen",
    "Elmas (baklava)"
   ],
   "a": 0,
   "exp": "Öznitelikler elips içinde yazılıp varlığa çizgiyle bağlanır.",
   "why": {
    "3": "Dikdörtgen varlıktır."
   },
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "ER diyagramında birincil anahtar (PK) nasıl gösterilir?",
   "opts": [
    "Kırmızıya boyanır",
    "Çift dikdörtgen çizilir",
    "Öznitelik adının altı çizilir",
    "Elmasın içine yazılır",
    "Ok ile işaretlenir"
   ],
   "a": 2,
   "exp": "Hocanın notu: **altı çizili alan** birincil anahtardır (ör. Öğrenci_No).",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Veri modeli için hocanın benzetmesi hangisidir?",
   "opts": [
    "Restoranın menüsü",
    "Deponun güvenlik ekibi",
    "Binanın mimari projesi",
    "Kütüphanedeki kitap",
    "Arabanın motoru"
   ],
   "a": 2,
   "exp": "Veri modeli veritabanının **mimari projesidir**; projesiz bina dikmek gibi plansız tablo kurulmaz.",
   "why": {
    "0": "Menü benzetmesi SQL için (SQL = menü dili, MySQL = mutfak).",
    "1": "Güvenlik ekibi DBMS benzetmesi."
   },
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Gerçek dünyadan veritabanına giden dönüşüm zinciri hangisidir?",
   "opts": [
    "Gerçek Dünya → Tablolar/SQL → ER Diyagramı → Kavramsal Model",
    "Gerçek Dünya → Kavramsal Model → ER Diyagramı → İlişkisel Model → Tablolar/SQL",
    "Kavramsal Model → Tablolar → Gerçek Dünya → ER Diyagramı",
    "ER Diyagramı → Gerçek Dünya → SQL → Kavramsal Model",
    "SQL → İlişkisel Model → ER Diyagramı → Gerçek Dünya"
   ],
   "a": 1,
   "exp": "Önce kavramsal model, sonra ER diyagramı, sonra ilişkisel model, en son tablolar ve SQL.",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Hangi teknolojiyi (MySQL, Oracle, MongoDB) kullanacağımızdan bağımsız olarak sistemin genel veri yapısını en yüksek seviyede gösteren model hangisidir?",
   "opts": [
    "Kavramsal veri modeli",
    "Tablo şeması",
    "SQL betiği",
    "İndeks",
    "Fiziksel model"
   ],
   "a": 0,
   "exp": "**Kavramsal model** teknolojiden bağımsız, en yüksek seviyeli taslaktır.",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "\"Öğrenci\" ile \"Ali Yılmaz\" arasındaki fark hangisidir?",
   "opts": [
    "Ali Yılmaz varlık türü, Öğrenci varlık örneği",
    "İkisi de öznitelik",
    "Öğrenci öznitelik, Ali Yılmaz varlık",
    "Öğrenci varlık türü, Ali Yılmaz o türün varlık örneği",
    "Öğrenci ilişki, Ali Yılmaz anahtar"
   ],
   "a": 3,
   "exp": "Varlık türü soyut genel ad (Öğrenci), varlık örneği somut birey (Ali Yılmaz).",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi Öğrenci varlığının bir **özniteliği**dir?",
   "opts": [
    "Ders",
    "Alır",
    "Bölüm",
    "eposta",
    "Kitap"
   ],
   "a": 3,
   "exp": "Öznitelik varlığın özelliğidir ve tek başına varlık olamaz: öğrenci_no, ad, soyad, **eposta**.",
   "why": {
    "0": "Ders kendi başına bir varlıktır.",
    "2": "Bölüm kendi başına bir varlıktır.",
    "1": "\"Alır\" Öğrenci–Ders ilişkisinin adıdır."
   },
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Her kişinin bir pasaportu var ve her pasaport yalnızca bir kişiye ait. Kişi–Pasaport ilişkisi nedir?",
   "opts": [
    "1:1",
    "İlişki yoktur",
    "N:N",
    "N:1",
    "1:N"
   ],
   "a": 0,
   "exp": "İki tarafta da \"birden fazla olabilir mi?\" sorusunun cevabı hayır → **bire bir (1:1)**.",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Bir bölümde birçok öğrenci okuyabiliyor, her öğrenci resmi olarak tek bir bölüme bağlı. Bölüm–Öğrenci ilişkisi nedir?",
   "opts": [
    "1:1",
    "N:1 (bölüm tarafı çok)",
    "Tanımlanamaz",
    "N:N",
    "1:N"
   ],
   "a": 4,
   "exp": "Bölüm (1) — Okur — Öğrenci (N): **bire çok**.",
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "\"Bir öğrenci birden fazla ders alabilir mi?\" Evet. \"Bir dersi birden fazla öğrenci alabilir mi?\" Evet. İlişki türü nedir?",
   "opts": [
    "1:N",
    "N:1",
    "1:1",
    "Belirlenemez",
    "N:N"
   ],
   "a": 4,
   "exp": "İki yönde de \"evet\" → **çoka çok (N:N)**.",
   "why": {
    "0": "1:N için yönlerden birinin cevabı \"hayır\" olmalı."
   },
   "topic": "er"
  },
  {
   "type": "mc",
   "q": "Bölüm (1) — Okur — Öğrenci (N) diyagramında Öğrenci tarafındaki \"N\" neyi anlatır?",
   "opts": [
    "Bölüm sayısı bilinmiyor",
    "Bir bölümde birden fazla öğrenci okuyabilir",
    "Öğrenci tablosunda N tane sütun vardır",
    "Öğrenci kaydı zorunlu değildir",
    "Bir öğrenci birden fazla bölümde okur"
   ],
   "a": 1,
   "exp": "\"Bir bölümde birden fazla öğrenci okuyabilir mi?\" sorusunun cevabı evet olduğu için Öğrenci tarafına **N** yazılır.",
   "topic": "er"
  },
  {
   "type": "fill",
   "q": "ER diyagramında **ilişki** hangi şekille çizilir? (tek kelime)",
   "code": "-- Dikdörtgen = varlık, elips = öznitelik, ____ = ilişki",
   "ans": [
    "elmas",
    "baklava",
    "eşkenar dörtgen",
    "eskenar dortgen",
    "diamond"
   ],
   "cs": false,
   "exp": "İlişki **elmas (baklava, eşkenar dörtgen)** ile çizilir.",
   "whyFill": {
    "paralelkenar": "Kitapçık tuzağı: paralelkenar değil, eşkenar dörtgen (elmas/baklava).",
    "elips": "Elips özniteliktir."
   },
   "topic": "er"
  },
  {
   "type": "fill",
   "q": "Gerçek hayattaki karmaşık yapıları gereksiz detaylardan arındırarak bilişim sistemine uygun hâle getirme sürecine ne denir?",
   "code": "-- Gereksiz detayları atıp özü modellemek = ____",
   "ans": [
    "soyutlama",
    "abstraction"
   ],
   "cs": false,
   "exp": "**Soyutlama (abstraction).**",
   "topic": "er"
  }
 ],
 "festival": [
  {
   "type": "mc",
   "q": "Hocanın Festival sorusunda FESTİVAL ile SANATCI arasındaki ilişki türü nedir?",
   "opts": [
    "İlişki kurulmamıştır",
    "1:N (FESTİVAL 1, SANATCI N)",
    "N:N",
    "1:1",
    "N:1 (FESTİVAL N, SANATCI 1)"
   ],
   "a": 1,
   "exp": "Hoca: FESTİVAL (1) — katılır — SANATCI (N). Bir festivale birden fazla sanatçı katılır.",
   "why": {
    "2": "Gerçek hayatta N:N olurdu ama hoca \"aynı saat ve gün\" varsayımıyla 1:N kurdu."
   },
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Hoca Festival–Sanatçı ilişkisini neden 1:N kurmuştur?",
   "opts": [
    "N:N ilişki ER diyagramında çizilemediği için",
    "Festival tablosu sanatçıdan önce oluşturulduğu için",
    "Bir festivale sadece bir sanatçı katılabildiği için",
    "Festivallerin aynı saat ve günde olduğunu farz ettiği için",
    "Sanatçı tablosunda PK olmadığı için"
   ],
   "a": 3,
   "exp": "Notta: \"Aynı saat ve gündeki festival olduğunu farz ederek 1-N ilişki kuruyoruz.\" Bu varsayımla bir sanatçı tek festivale katılabilir.",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "SANATCI ile SAHNE arasındaki ilişkinin adı ve türü nedir?",
   "opts": [
    "alır, N:N",
    "katılır, 1:N",
    "çıkar, çoka çok (M:N)",
    "çıkar, 1:1",
    "okur, 1:N"
   ],
   "a": 2,
   "exp": "\"Sanatçı sahneye çıkar.\" İki yönde de birden fazla mümkün → **çoka çok**.",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Hocanın çiziminde Sanatçı–Sahne ilişkisi 'M' ve 'N' ile yazılmıştır. Bu ne anlama gelir?",
   "opts": [
    "N:N ile aynı: iki taraf da çok",
    "M tarafı 1, N tarafı çok",
    "Sadece sanatçı tarafı çok",
    "İlişki zorunlu değil",
    "M ile N'nin sayıca eşit olması gerekir"
   ],
   "a": 0,
   "exp": "M:N = N:N. Farklı harf, iki tarafın çokluğunun birbirinden bağımsız olduğunu gösterir.",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Festival (1) — katılır — Sanatçı (N) ilişkisi tablolara dönüştürülürken FK hangi tabloya eklenir?",
   "opts": [
    "FESTİVAL tablosuna SANATCI_ID",
    "Yeni bir ara tabloya",
    "SANATCI tablosuna FESTIVAL_ID",
    "Her iki tabloya",
    "SAHNE tablosuna"
   ],
   "a": 2,
   "exp": "1:N'de FK **çok** tarafına konur: hocanın SANATCI tablosunda `FESTIVAL_ID (FK)` var.",
   "why": {
    "0": "Festival satırına birden çok sanatçı yazılamaz; FK çok tarafa gider.",
    "1": "Ara tablo N:N için gerekir."
   },
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Sanatçı–Sahne çoka çok ilişkisi için hoca hangi tabloyu kurmuştur?",
   "opts": [
    "SAHNE tablosuna SANATCI_ID eklenir",
    "SANATCI tablosuna SAHNE_ID eklenir",
    "Ek tablo gerekmez",
    "ÇIKAR (ID, SANATCI_ID, SAHNE_ID)",
    "KATILIR (ID, FESTIVAL_ID, SANATCI_ID)"
   ],
   "a": 3,
   "exp": "N:N ilişki iki FK tutan **ara tablo** ile çözülür: ÇIKAR (ID, SANATCI_ID, SAHNE_ID).",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Hocanın ÇIKAR tablosuna göre 1 numaralı sanatçı (AA AA) kaç farklı sahneye çıkmıştır?",
   "opts": [
    "6",
    "0",
    "2",
    "1",
    "3"
   ],
   "a": 2,
   "exp": "SANATCI_ID = 1 olan iki satır var: SAHNE_ID 1 (POP RÜZGARI) ve 3 (90'LAR).",
   "tbl": [
    {
     "cap": "**cikar** tablosu",
     "head": [
      "id",
      "sanatci_id",
      "sahne_id"
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
    }
   ],
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "ÇIKAR tablosuna göre POP RÜZGARI sahnesine (SAHNE_ID = 1) çıkan sanatçılar kimlerdir?",
   "opts": [
    "AA AA",
    "AA AA, BB BB, CC CC",
    "AA AA, BB BB",
    "BB BB, CC CC",
    "DD DD"
   ],
   "a": 2,
   "exp": "SAHNE_ID = 1 olan satırlar: SANATCI_ID 1 (AA AA) ve 2 (BB BB). Bir sahneye birden çok sanatçı çıkabiliyor: çoka çok.",
   "tbl": [
    {
     "cap": "**sanatci** tablosu",
     "head": [
      "id",
      "adi",
      "sanat_turu",
      "festival_id"
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
     "cap": "**cikar** tablosu",
     "head": [
      "id",
      "sanatci_id",
      "sahne_id"
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
    }
   ],
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "SANATCI tablosuna göre ABC FESTİVALİ'ne (ID = 1) kaç sanatçı katılmaktadır?",
   "opts": [
    "0",
    "4",
    "3",
    "2",
    "1"
   ],
   "a": 3,
   "exp": "FESTIVAL_ID = 1 olan sanatçılar: AA AA ve BB BB.",
   "tbl": [
    {
     "cap": "**sanatci** tablosu",
     "head": [
      "id",
      "adi",
      "sanat_turu",
      "festival_id"
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
    }
   ],
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Hocanın \"aynı saat ve gün\" varsayımı kaldırılırsa (bir sanatçı birçok festivale katılabilirse) Festival–Sanatçı ilişkisi ne olur?",
   "opts": [
    "1:1 olur; FK gerekmez",
    "N:1 olur; FK FESTİVAL tablosuna geçer",
    "N:N olur; FESTIVAL_ID yerine ara tablo kurulur",
    "İlişki silinir",
    "1:N kalır; hiçbir şey değişmez"
   ],
   "a": 2,
   "exp": "İki yönde de \"evet\" olunca ilişki **N:N** olur ve Sanatçı–Sahne'deki gibi ara tabloyla çözülür.",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Festival sorusunda SANAT TÜRÜ özniteliği hangi varlığa aittir?",
   "opts": [
    "FESTİVAL",
    "ÇIKAR",
    "SAHNE",
    "katılır ilişkisine",
    "SANATCI"
   ],
   "a": 4,
   "exp": "SANATCI: ID, ADI, SANAT TÜRÜ. Hocanın çiziminde SANAT TÜRÜ çift elipsle çizilmiş.",
   "topic": "festival"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi hocanın FESTİVAL varlığına verdiği özniteliklerden biri **değildir**?",
   "opts": [
    "ADRES_İL",
    "TARİHİ",
    "SANAT TÜRÜ",
    "ID",
    "ADI"
   ],
   "a": 2,
   "exp": "FESTİVAL: ID, ADI, TARİHİ, ADRES_İL. SANAT TÜRÜ sanatçının özniteliği.",
   "topic": "festival"
  },
  {
   "type": "fill",
   "q": "SANATCI tablosunu FESTİVAL tablosuna bağlayan yabancı anahtar sütununun adını yazın.",
   "code": "CREATE TABLE sanatci2 (\n  id INT PRIMARY KEY,\n  adi VARCHAR(100) NOT NULL,\n  ____ INT,\n  FOREIGN KEY (festival_id) REFERENCES festival(id)\n);",
   "ans": [
    "festival_id"
   ],
   "cs": false,
   "exp": "Hocanın tablosunda **FESTIVAL_ID (FK)**. FOREIGN KEY satırı da bu sütunu kullanıyor.",
   "whyFill": {
    "sahne_id": "Sahne bağlantısı ÇIKAR ara tablosunda; sanatçı tablosunda festival_id var."
   },
   "topic": "festival"
  },
  {
   "type": "fill",
   "q": "Sanatçı–Sahne çoka çok ilişkisini çözen ara tablonun hocanın verdiği adı nedir?",
   "code": "-- SANATCI (M) — çıkar — SAHNE (N)  →  ara tablo: ____ (ID, SANATCI_ID, SAHNE_ID)",
   "ans": [
    "ÇIKAR",
    "çıkar",
    "cikar",
    "çikar"
   ],
   "cs": false,
   "exp": "Ara tablonun adı ilişkinin adından gelir: **ÇIKAR**.",
   "topic": "festival"
  },
  {
   "type": "code",
   "title": "Festival tabloları",
   "q": "Hocanın ÇIKAR ara tablosunu SQL ile kurun: kendi kimliği, sanatçıya ve sahneye bağlanan iki yabancı anahtar.",
   "code": "CREATE TABLE cikar2 (\n  id INT {{1}},\n  sanatci_id INT,\n  {{2}} INT,\n  {{3}} (sanatci_id) REFERENCES sanatci(id),\n  FOREIGN KEY (sahne_id) {{4}} sahne(id)\n);",
   "blanks": [
    {
     "ans": [
      "PRIMARY KEY"
     ],
     "cs": false
    },
    {
     "ans": [
      "sahne_id"
     ],
     "cs": false
    },
    {
     "ans": [
      "FOREIGN KEY"
     ],
     "cs": false
    },
    {
     "ans": [
      "REFERENCES"
     ],
     "cs": false
    }
   ],
   "exps": [
    "Satırın benzersiz kimliği: `PRIMARY KEY`.",
    "Sahneye bağlanacak sütun: `sahne_id` (alttaki FOREIGN KEY satırı onu kullanıyor).",
    "Yabancı anahtar tanımı `FOREIGN KEY (sütun)` ile başlar.",
    "Bağlanılan tablo ve sütun `REFERENCES tablo(sütun)` ile yazılır."
   ],
   "note": "Hocanın 3 satırı (1,1,1), (2,1,3), (3,2,1) bu tabloya hatasız eklenir.",
   "topic": "festival"
  }
 ],
 "anahtar": [
  {
   "type": "mc",
   "q": "PRIMARY KEY için hangisi doğrudur?",
   "opts": [
    "Her zaman sayısal olmak zorundadır",
    "Her kaydı benzersiz tanımlar ve NULL olamaz",
    "Tekrar eden değerlere izin verir",
    "Başka tablonun anahtarına referans verir",
    "Her zaman tablonun ilk sütunu olmak zorundadır"
   ],
   "a": 1,
   "exp": "PK benzersiz ve boş geçilemez bir kimliktir.",
   "why": {
    "3": "Bu FOREIGN KEY.",
    "4": "Hoca: ilk sütun olmak zorunda değil; ID'yi başa yazmak sadece yaygın pratik.",
    "0": "TC no ya da e-posta da PK olabilir; INT hız ve pratiklik için tercih edilir."
   },
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "Tablolar arasında köprü kurup referans bütünlüğünü koruyan kısıt hangisidir?",
   "opts": [
    "DEFAULT",
    "CHECK",
    "PRIMARY KEY",
    "UNIQUE",
    "FOREIGN KEY"
   ],
   "a": 4,
   "exp": "**FOREIGN KEY** başka tablodaki anahtara bağlanır; olmayan bir kayda işaret edilmesini engeller.",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "`bolum` tablosunda yalnızca 1 ve 2 numaralı bölümler var. Aşağıdakilerden hangisi eklenirken **referans bütünlüğü yüzünden reddedilir**?",
   "opts": [
    "(4, 'Can', 'Ak', NULL)",
    "(4, 'Can', 'Ak', 1)",
    "(4, 'Can', 'Ak', 9)",
    "(4, 'Can', 'Ak', 2)",
    "(5, 'Ece', 'Su', 1)"
   ],
   "a": 2,
   "exp": "bolum_id = 9 diye bir bölüm yok; FOREIGN KEY olmayan bir kayda işaret etmeye izin vermez.",
   "code": "INSERT INTO ogrenci (ogrenci_id, ad, soyad, bolum_id) VALUES ____;",
   "why": {
    "0": "FK sütunu NULL olabilir (bölümü henüz belli değil); NULL bir kayda işaret etmez."
   },
   "tbl": [
    {
     "cap": "**bolum** tablosu",
     "head": [
      "bolum_id",
      "bolum_adi"
     ],
     "rows": [
      [
       "1",
       "Bilgisayar Programcılığı"
      ],
      [
       "2",
       "Büyük Veri"
      ]
     ]
    }
   ],
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "NOT NULL kısıtı ne sağlar?",
   "opts": [
    "Değerlerin tekrar etmesini engeller",
    "Varsayılan değer atar",
    "Tabloyu başka tabloya bağlar",
    "Değerin belli bir koşula uymasını ister",
    "Sütunun boş bırakılmasını engeller"
   ],
   "a": 4,
   "exp": "NOT NULL ilgili sütuna veri girmeyi **zorunlu** kılar.",
   "why": {
    "0": "Bu UNIQUE.",
    "1": "Bu DEFAULT.",
    "3": "Bu CHECK."
   },
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "Bir sistemde aynı e-posta adresiyle birden fazla hesap açılmasını engellemek için hangi kısıt kullanılır?",
   "opts": [
    "UNIQUE",
    "NOT NULL",
    "FOREIGN KEY",
    "DEFAULT",
    "CHECK"
   ],
   "a": 0,
   "exp": "Hocanın örneği: `eposta VARCHAR(150) UNIQUE`.",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "`aktif BOOLEAN DEFAULT TRUE` tanımlı bir tabloya `aktif` değeri verilmeden kayıt eklenirse ne olur?",
   "opts": [
    "aktif sütununa TRUE yazılır",
    "Komut hata verir",
    "aktif sütunu FALSE olur",
    "Kayıt eklenir ama tablo boşalır",
    "aktif sütunu NULL kalır"
   ],
   "a": 0,
   "exp": "Değer girilmeyen sütuna **DEFAULT** değeri yazılır.",
   "code": "CREATE TABLE uye (\n  uye_id INT PRIMARY KEY,\n  aktif BOOLEAN DEFAULT TRUE\n);\nINSERT INTO uye (uye_id) VALUES (1);",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki kod çalıştırılırsa ne olur?",
   "opts": [
    "Tablo silinir",
    "INSERT reddedilir; CHECK negatif yaşa izin vermez",
    "Kayıt eklenir, yas = NULL olur",
    "Kayıt eklenir, yas = -5 olur",
    "Kayıt eklenir, yas = 0 olur"
   ],
   "a": 1,
   "exp": "`CHECK (yas >= 0)` koşulu sağlanmayan değeri reddeder.",
   "code": "CREATE TABLE uye (\n  uye_id INT PRIMARY KEY,\n  yas INT CHECK (yas >= 0)\n);\nINSERT INTO uye VALUES (1, -5);",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "Birden çok sütundan oluşan anahtara ne denir?",
   "opts": [
    "Aday anahtar",
    "Tekil anahtar",
    "Yabancı anahtar",
    "Bileşik anahtar",
    "Varsayılan anahtar"
   ],
   "a": 3,
   "exp": "Ör. `PRIMARY KEY (ogrenci_id, ders_id)` **bileşik** birincil anahtardır.",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "Satırı tek başına tanımlayabilen ve PK olmaya aday minimal sütun kümesine ne denir?",
   "opts": [
    "İndeks",
    "Görünüm",
    "Yabancı anahtar",
    "Bileşik anahtar",
    "Aday anahtar"
   ],
   "a": 4,
   "exp": "**Aday anahtar**: PK seçilebilecek adaylar (ör. ogrenci_no, tc_kimlik_no).",
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "1:N ilişki tablolara dönüştürülürken ne yapılır?",
   "opts": [
    "Çok (N) taraftaki tabloya, 1 tarafın anahtarı FK olarak eklenir",
    "1 taraftaki tabloya N tarafın anahtarı eklenir",
    "İki tablo tek tabloda birleştirilir",
    "Hiçbir tabloya anahtar eklenmez",
    "Mutlaka ara tablo kurulur"
   ],
   "a": 0,
   "exp": "Ör. Bölüm (1) — Öğrenci (N): `ogrenci` tablosuna `bolum_id` FK eklenir.",
   "why": {
    "4": "Ara tablo N:N için."
   },
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "`kayit` tablosunda `PRIMARY KEY (ogrenci_id, ders_id)` var. Hangi INSERT **hata verir**?",
   "opts": [
    "(2, 20)",
    "(3, 20)",
    "(3, 10)",
    "(1, 10)",
    "(2, 20), (3, 20)"
   ],
   "a": 3,
   "exp": "(1, 10) çifti zaten var; bileşik PK aynı öğrencinin aynı derse ikinci kez kaydını engeller.",
   "code": "INSERT INTO kayit (ogrenci_id, ders_id) VALUES ____;",
   "why": {
    "0": "Öğrenci 2 ders 20'ye kayıtlı değil; çift yeni olduğu için eklenir."
   },
   "tbl": [
    {
     "cap": "**kayit** tablosu",
     "head": [
      "ogrenci_id",
      "ders_id"
     ],
     "rows": [
      [
       "1",
       "10"
      ],
      [
       "1",
       "20"
      ],
      [
       "2",
       "10"
      ]
     ]
    }
   ],
   "topic": "anahtar"
  },
  {
   "type": "mc",
   "q": "**1NF**'nin şartı hangisidir?",
   "opts": [
    "Tablolar alfabetik sıralı olmalıdır",
    "Hücreler atomik (tek değerli) olmalıdır",
    "Her tabloda en az iki FK olmalıdır",
    "Tüm sütunlar UNIQUE olmalıdır",
    "Anahtar olmayan alanlar arasında geçişli bağımlılık olmamalıdır"
   ],
   "a": 1,
   "exp": "1NF: her hücrede tek değer. (Düşük öncelik: tanımı bilmek yeter.)",
   "why": {
    "4": "Bu 3NF'nin şartı."
   },
   "topic": "anahtar"
  },
  {
   "type": "fill",
   "q": "Aynı öğrencinin aynı derse iki kez kaydedilmesini engelleyen **iki sütunlu birincil anahtarı** tamamlayın.",
   "code": "CREATE TABLE kayit2 (\n  ogrenci_id INT,\n  ders_id INT,\n  ____ (ogrenci_id, ders_id)\n);",
   "ans": [
    "PRIMARY KEY"
   ],
   "cs": false,
   "exp": "Bileşik birincil anahtar: `PRIMARY KEY (ogrenci_id, ders_id)`.",
   "whyFill": {
    "UNIQUE": "UNIQUE da tekrarı engeller ama soru birincil anahtarı istiyor: PRIMARY KEY (ogrenci_id, ders_id).",
    "FOREIGN KEY": "FOREIGN KEY başka tabloya bağlar; tekrarı engellemez."
   },
   "topic": "anahtar"
  },
  {
   "type": "fill",
   "q": "`ogrenci` tablosundaki `bolum_id` sütununu `bolum` tablosuna bağlayan satırı tamamlayın.",
   "code": "CREATE TABLE ogrenci2 (\n  ogrenci_id INT PRIMARY KEY,\n  bolum_id INT,\n  FOREIGN KEY (bolum_id) ____ bolum(bolum_id)\n);",
   "ans": [
    "REFERENCES"
   ],
   "cs": false,
   "exp": "`FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)`. Artık olmayan bir bölümle öğrenci eklenemez.",
   "whyFill": {
    "REFERENCE": "Sonunda S var: REFERENCES."
   },
   "topic": "anahtar"
  },
  {
   "type": "code",
   "title": "Kayıt ara tablosu",
   "q": "Öğrenci–Ders N:N ilişkisini çözen `kayit` tablosunu tamamlayın (hocanın üniversite uygulaması).",
   "code": "CREATE TABLE kayit3 (\n    ogrenci_id INT,\n    ders_id INT,\n    {{1}} (ogrenci_id, ders_id),\n    FOREIGN KEY (ogrenci_id) {{2}} ogrenci(ogrenci_id),\n    {{3}} (ders_id) REFERENCES {{4}}(ders_id)\n);",
   "blanks": [
    {
     "ans": [
      "PRIMARY KEY"
     ],
     "cs": false
    },
    {
     "ans": [
      "REFERENCES"
     ],
     "cs": false
    },
    {
     "ans": [
      "FOREIGN KEY"
     ],
     "cs": false
    },
    {
     "ans": [
      "ders"
     ],
     "cs": false
    }
   ],
   "exps": [
    "Bileşik birincil anahtar: aynı öğrenci aynı derse iki kez kaydolamaz.",
    "Bağlanılan tablo `REFERENCES` ile yazılır.",
    "İkinci yabancı anahtar da `FOREIGN KEY (sütun)` ile başlar.",
    "`ders_id` sütunu `ders` tablosunun anahtarıdır."
   ],
   "note": "Ara tablo iki FK tutar; N:N ilişki böyle tabloya dönüşür.",
   "topic": "anahtar"
  }
 ],
 "ddl": [
  {
   "type": "mc",
   "q": "SQL'in açılımı nedir?",
   "opts": [
    "System Quality Language",
    "Structured Query Language",
    "Simple Question Language",
    "Standard Quick Logic",
    "Sequential Query List"
   ],
   "a": 1,
   "exp": "SQL = **Structured Query Language** (Yapılandırılmış Sorgu Dili).",
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Hocanın benzetmesinde SQL restoranın menü dili ise MySQL nedir?",
   "opts": [
    "Müşteri",
    "Kasa",
    "Menünün kendisi",
    "Garson",
    "Siparişi hazırlayan mutfak ve aşçı ekibi"
   ],
   "a": 4,
   "exp": "Menü dilini (SQL) bilirsen arkadaki mutfak (MySQL, PostgreSQL…) hangisi olursa olsun derdini anlatırsın.",
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "DDL komutları neyle ilgilenir?",
   "opts": [
    "İşlemlerin onaylanmasıyla",
    "Tablonun iskeletiyle (ad, sütun, veri tipi, ilişki)",
    "Tablodaki satırların eklenmesiyle",
    "Kullanıcı yetkileriyle",
    "Verilerin sorgulanmasıyla"
   ],
   "a": 1,
   "exp": "DDL yapıyı tanımlar; veri eklemek DML'in (INSERT) işi.",
   "why": {
    "2": "Bu DML (INSERT).",
    "3": "Bu DCL.",
    "0": "Bu TCL."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Sunucuda birden fazla veritabanı varken hangisinde çalışılacağını bildiren komut hangisidir?",
   "opts": [
    "USE",
    "SELECT",
    "OPEN",
    "GO",
    "SET"
   ],
   "a": 0,
   "exp": "`USE universite;` sonraki komutların hangi veritabanında çalışacağını söyler.",
   "code": "CREATE DATABASE universite;\n____ universite;",
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Hocanın adlandırma kurallarına göre hangi veritabanı adı **uygundur**?",
   "opts": [
    "Kütüphane Sistemi",
    "kutuphane sistemi",
    "kütüphane-sistemi",
    "Kütüphane_Sistemi",
    "kutuphane_sistemi"
   ],
   "a": 4,
   "exp": "Anlamlı, boşluksuz, Türkçe karaktersiz, küçük harf, kelimeler `_` ile ayrılmış.",
   "why": {
    "0": "Boşluk ve Türkçe karakter var.",
    "1": "İsimde boşluk olmaz.",
    "3": "Türkçe karakter (ü) var."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "`VARCHAR(100)` tanımı için hangisi doğrudur?",
   "opts": [
    "Sütun 100 basamaklı sayı tutar",
    "Sütun en az 100 karakter ister",
    "Sütuna en fazla 100 karakterlik metin yazılabilir",
    "Sütun 100 satır metin tutar",
    "Sütuna tam 100 karakter yazmak zorunludur"
   ],
   "a": 2,
   "exp": "VARCHAR(100) bir **sınır korumasıdır**; 100 karakteri doldurma zorunluluğu yoktur.",
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "`DECIMAL(10,2)` ne anlama gelir?",
   "opts": [
    "Virgülden sonra 10 basamak",
    "10 karakterlik metin, 2 satır",
    "10 basamak tam kısım + 2 basamak ondalık",
    "Toplam 10 basamak, bunların 2'si virgülden sonra",
    "En fazla 10, en az 2 basamak"
   ],
   "a": 3,
   "exp": "Hoca: toplam 10 basamak, 2'si ondalık. En büyük örnek: 12345678.90.",
   "why": {
    "2": "Toplam 10 basamak; tam kısım 8 basamak kalır."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Doğum tarihini saklamak için en uygun veri tipi hangisidir?",
   "opts": [
    "DATE",
    "VARCHAR(10)",
    "BOOLEAN",
    "INT",
    "DECIMAL(10,2)"
   ],
   "a": 0,
   "exp": "Tarih `DATE` ile `YYYY-AA-GG` biçiminde tutulur.",
   "why": {
    "1": "Tarihi metin tutmak ileride tarih aralığı sorgularını bozar."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "`aktif_mi`, `mezun_mu` gibi doğru/yanlış değerleri için hangi veri tipi kullanılır?",
   "opts": [
    "BOOLEAN",
    "INT AUTO_INCREMENT",
    "DECIMAL(10,2)",
    "VARCHAR(100)",
    "DATE"
   ],
   "a": 0,
   "exp": "**BOOLEAN** (MySQL'de arka planda TINYINT(1)).",
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Hocanın üniversite uygulamasında tablolar hangi sırayla oluşturulmalıdır?",
   "opts": [
    "kayit → ogrenci → bolum → ders → ogretim_elemani",
    "ders → kayit → ogrenci → bolum → ogretim_elemani",
    "Sıra önemli değildir",
    "ogrenci → bolum → kayit → ders → ogretim_elemani",
    "bolum → ogrenci → ders → ogretim_elemani → kayit"
   ],
   "a": 4,
   "exp": "FK yüzünden önce bağımsız tablolar: bolum, sonra ona bağlı ogrenci, ders, ogretim_elemani, en son ikisine bağlı kayit.",
   "why": {
    "2": "Önemli: FK'nin bağlandığı tablo önce var olmalı."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Tablonun yapısını koruyup içindeki bütün kayıtları silen komut hangisidir?",
   "opts": [
    "DROP TABLE",
    "CREATE TABLE",
    "TRUNCATE TABLE",
    "ALTER TABLE",
    "DROP DATABASE"
   ],
   "a": 2,
   "exp": "TRUNCATE: yapı **korunur**, veriler temizlenir.",
   "why": {
    "0": "DROP TABLE yapıyı da siler."
   },
   "topic": "ddl"
  },
  {
   "type": "mc",
   "q": "Var olan `ogrenci` tablosuna yeni bir `eposta` sütunu eklemek için boşluğa ne gelmelidir?",
   "opts": [
    "CREATE",
    "ALTER",
    "INSERT",
    "MODIFY",
    "UPDATE"
   ],
   "a": 1,
   "exp": "`ALTER TABLE` var olan tablonun yapısını değiştirir.",
   "code": "____ TABLE ogrenci ADD eposta VARCHAR(150);",
   "why": {
    "4": "UPDATE satırlardaki değeri değiştirir, yapıyı değil.",
    "2": "INSERT satır ekler, sütun değil."
   },
   "topic": "ddl"
  },
  {
   "type": "fill",
   "q": "Tablonun kendisini ve içindeki tüm verileri kalıcı olarak silen komutu tamamlayın.",
   "code": "____ TABLE kayit;",
   "ans": [
    "DROP"
   ],
   "cs": false,
   "exp": "`DROP TABLE` yapıyı ve veriyi siler; geri dönüşü yoktur.",
   "whyFill": {
    "TRUNCATE": "TRUNCATE tabloyu korur, sadece satırları boşaltır.",
    "DELETE": "DELETE FROM satır siler, tablo kalır."
   },
   "topic": "ddl"
  },
  {
   "type": "fill",
   "q": "Yeni bir veritabanı oluşturan komutu tamamlayın.",
   "code": "CREATE ____ universite;",
   "ans": [
    "DATABASE"
   ],
   "cs": false,
   "exp": "`CREATE DATABASE universite;` Ardından `USE universite;`.",
   "whyFill": {
    "TABLE": "CREATE TABLE tablo oluşturur; veritabanı için CREATE DATABASE."
   },
   "topic": "ddl"
  }
 ],
 "insert": [
  {
   "type": "mc",
   "q": "INSERT INTO komutu ne yapar?",
   "opts": [
    "Kayıtları listeler",
    "Tabloya bir veya daha fazla satır ekler",
    "Tablo oluşturur",
    "Satırları siler",
    "Tabloya sütun ekler"
   ],
   "a": 1,
   "exp": "INSERT INTO yeni **satır** ekler; tek komutla birden çok satır da eklenebilir.",
   "why": {
    "4": "Sütun eklemek ALTER TABLE'ın işi."
   },
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "INSERT INTO'da sütun listesi ile VALUES listesi için hangisi doğrudur?",
   "opts": [
    "Değerler virgül olmadan yazılır",
    "Sayıları aynı olmalı ve konumları birbirine karşılık gelmeli",
    "Metin değerler tırnaksız yazılır",
    "Değer sayısı sütun sayısından fazla olabilir",
    "Sıra önemli değildir, MySQL kendisi eşler"
   ],
   "a": 1,
   "exp": "Hocanın notu: sütunların ve değerlerin **sayısı aynı**, **konumları** birbirine karşılık gelmeli.",
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Hocanın `gorevler` tablosuna aşağıdaki INSERT yapıldı. Yeni satırda `bitistarihi` sütununda ne yazar?",
   "opts": [
    "Günün tarihi",
    "3",
    "NULL",
    "0",
    "1"
   ],
   "a": 2,
   "exp": "`bitistarihi` için değer verilmedi ve DEFAULT tanımı yok → **NULL**.",
   "code": "CREATE TABLE IF NOT EXISTS gorevler (\n   gorev_id INT AUTO_INCREMENT,\n   baslik VARCHAR(255) NOT NULL,\n   baslamatarihi DATE,\n   bitistarihi DATE,\n   oncelik TINYINT NOT NULL DEFAULT 3,\n   aciklama TEXT,\n   PRIMARY KEY (gorev_id)\n);\nINSERT INTO gorevler(baslik, oncelik)\n   VALUES('MySQL INSERT İfadesini Öğren', 1);",
   "why": {
    "1": "3, `oncelik` sütununun DEFAULT değeri."
   },
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Aynı `gorevler` tablosuna `INSERT INTO gorevler (baslik) VALUES ('Rapor yaz');` yapılırsa `oncelik` ne olur?",
   "opts": [
    "NULL",
    "3",
    "0",
    "1",
    "Komut hata verir"
   ],
   "a": 1,
   "exp": "`oncelik TINYINT NOT NULL DEFAULT 3`: değer verilmeyince DEFAULT 3 yazılır.",
   "why": {
    "0": "DEFAULT tanımı olan sütun NULL olmaz; NULL sadece DEFAULT'u olmayan sütunlarda.",
    "4": "NOT NULL ama DEFAULT 3 olduğu için hata yok."
   },
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Boş `gorevler` tablosuna (gorev_id `INT AUTO_INCREMENT`) iki satır eklendi. İkinci satırın `gorev_id` değeri nedir?",
   "opts": [
    "2",
    "1",
    "NULL",
    "0",
    "3"
   ],
   "a": 0,
   "exp": "AUTO_INCREMENT her yeni satıra sıradaki tam sayıyı verir: 1, 2, …",
   "code": "INSERT INTO gorevler (baslik) VALUES ('A');\nINSERT INTO gorevler (baslik) VALUES ('B');",
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Bir sütuna varsayılan (DEFAULT) değerin girilmesi için hocanın gösterdiği iki yol hangisidir?",
   "opts": [
    "Sütunu silmek ya da yeniden oluşturmak",
    "Sütunu INSERT listesine hiç yazmamak ya da değer yerine DEFAULT yazmak",
    "UPDATE kullanmak ya da DELETE kullanmak",
    "Boş metin yazmak ya da sütunu UNIQUE yapmak",
    "Değere NULL yazmak ya da 0 yazmak"
   ],
   "a": 1,
   "exp": "(1) sütunu listeye yazmamak, (2) `VALUES (…, DEFAULT)`.",
   "why": {
    "4": "NULL yazarsan sütuna NULL girmeye çalışılır (NOT NULL ise hata); DEFAULT değeri gelmez."
   },
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "MySQL'de tarih sütununa değer hangi biçimde girilir?",
   "opts": [
    "'YYYY/DD/MM'",
    "'YYYY-MM-DD' (ör. '2021-11-15')",
    "Tırnaksız 20211115",
    "'DD.MM.YYYY' (ör. '15.11.2021')",
    "'MM/DD/YYYY'"
   ],
   "a": 1,
   "exp": "YYYY dört basamaklı yıl, MM iki basamaklı ay, DD iki basamaklı gün.",
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "`gorevler` tablosuna günün tarihini eklemek için boşluğa hangi fonksiyon gelir?",
   "opts": [
    "TODAY_DATE()",
    "DATE_NOW()",
    "NOW_DATE()",
    "GETTODAY()",
    "CURRENT_DATE()"
   ],
   "a": 4,
   "exp": "`CURRENT_DATE()` günün tarihini döndürür.",
   "code": "INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)\n  VALUES ('Günün tarihi', ____, CURRENT_DATE());",
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Çok satırlı bir INSERT sonrasında MySQL \"3 row(s) affected\" diyorsa bu ne anlama gelir?",
   "opts": [
    "Üç satır kopyasız ve uyarısız eklendi",
    "Üç tablo etkilendi",
    "Üç hata oluştu",
    "Tabloda üç sütun var",
    "Üç satır silindi"
   ],
   "a": 0,
   "exp": "Hocanın notu: üç satır hiçbir kopya veya uyarı olmadan başarıyla eklendi.",
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "Çok satırlı INSERT'te iki satırın arasına ne konur?",
   "opts": [
    ";",
    ",",
    "+",
    "|",
    "AND"
   ],
   "a": 1,
   "exp": "Her satır ayrı parantezde, satırlar **virgülle** ayrılır.",
   "code": "INSERT INTO gorevler (baslik, oncelik)\n  VALUES ('Görev A', 1)____ ('Görev B', 2);",
   "why": {
    "0": "Noktalı virgül komutu bitirir; ikinci satır yarım kalır."
   },
   "topic": "insert"
  },
  {
   "type": "mc",
   "q": "`UPDATE Ogrenci SET sehir = 'İzmir';` (WHERE yok) çalıştırılırsa kaç öğrencinin şehri İzmir olur?",
   "opts": [
    "5",
    "1",
    "0",
    "2",
    "Komut hata verir"
   ],
   "a": 0,
   "exp": "WHERE olmayınca **bütün satırlar** güncellenir.",
   "why": {
    "3": "Zaten İzmir olan 2 kişi vardı; WHERE olmadığı için herkes İzmir oldu."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "insert"
  },
  {
   "type": "fill",
   "q": "Tek komutla iki satır ekleyin: boşluğa gelen anahtar kelime nedir?",
   "code": "INSERT INTO gorevler (baslik, oncelik)\n____\n  ('Önceliği 1 olan görev', 1),\n  ('Önceliği 2 olan görev', 2);",
   "ans": [
    "VALUES",
    "VALUE"
   ],
   "cs": false,
   "exp": "Değerler `VALUES`'tan sonra gelir; her satır ayrı parantezde, aralarında virgül.",
   "topic": "insert"
  },
  {
   "type": "fill",
   "q": "`oncelik` sütununa varsayılan değeri (3) yazdırmak için değer yerine ne yazılır?",
   "code": "INSERT INTO gorevler (baslik, oncelik)\n  VALUES ('MySQL varsayılan değerin giriş 2', ____);",
   "ans": [
    "DEFAULT"
   ],
   "cs": false,
   "exp": "`DEFAULT` yazınca sütunun varsayılan değeri (3) girilir.",
   "whyFill": {
    "NULL": "NULL yazarsan NOT NULL olan sütun hata verir; varsayılan için DEFAULT.",
    "3": "Sonuç aynı olur ama soru varsayılanı yazdıran anahtar kelimeyi istiyor: DEFAULT."
   },
   "topic": "insert"
  },
  {
   "type": "code",
   "title": "Çoklu INSERT",
   "q": "Hocanın `gorevler` tablosuna üç görevi tek komutla ekleyin, sonra eklenen satır sayısını sayın.",
   "code": "INSERT {{1}} gorevler (baslik, oncelik)\n  {{2}}\n    ('Önceliği 1 olan görev', 1){{3}}\n    ('Önceliği 2 olan görev', 2),\n    ('Önceliği 3 olan görev', 3);\nSELECT {{4}}(*) AS eklenen FROM gorevler;",
   "blanks": [
    {
     "ans": [
      "INTO"
     ],
     "cs": false
    },
    {
     "ans": [
      "VALUES",
      "VALUE"
     ],
     "cs": false
    },
    {
     "ans": [
      ","
     ],
     "cs": false
    },
    {
     "ans": [
      "COUNT"
     ],
     "cs": false
    }
   ],
   "exps": [
    "`INSERT INTO tablo`.",
    "Değer listesi `VALUES` ile başlar.",
    "Satırlar **virgülle** ayrılır.",
    "Satır sayısını `COUNT(*)` verir."
   ],
   "note": "MySQL bu INSERT için \"3 row(s) affected\" der; COUNT(*) da 3 döndürür.",
   "topic": "insert"
  }
 ],
 "sorgu": [
  {
   "type": "mc",
   "q": "Aşağıdaki sorgu kaç satır döndürür?",
   "opts": [
    "5",
    "2",
    "1",
    "3",
    "4"
   ],
   "a": 3,
   "exp": "BETWEEN sınırları **dahil** eder: 20, 22 ve 19 → 3 satır. NULL yaş hiçbir aralığa girmez.",
   "code": "SELECT ad FROM Ogrenci WHERE yas BETWEEN 19 AND 22;",
   "why": {
    "1": "Sınırlar dahil: 19 ve 22 de gelir."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT ad FROM Ogrenci WHERE ad LIKE 'A%';` sorgusunun sonucu hangisidir?",
   "opts": [
    "Ayşe, Ali, Ay, Can",
    "Ali",
    "Ayşe, Ali, Ay",
    "Ay",
    "Ali, Ay"
   ],
   "a": 2,
   "exp": "`%` sıfır ya da çok karakter: A ile başlayan **bütün** adlar gelir.",
   "why": {
    "3": "Sadece Ay'ı `A_` deseni getirir."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT COUNT(*), COUNT(yas) FROM Ogrenci;` sorgusunun sonucu nedir?",
   "opts": [
    "5 / 4",
    "4 / 5",
    "4 / 4",
    "5 / 5",
    "5 / 0"
   ],
   "a": 0,
   "exp": "COUNT(*) bütün satırları sayar (5). COUNT(yas) NULL olmayan yaşları sayar (4).",
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT AVG(yas) FROM Ogrenci;` sorgusunun sonucu nedir?",
   "opts": [
    "15.6",
    "19.5",
    "78",
    "19",
    "NULL"
   ],
   "a": 1,
   "exp": "AVG NULL'ı dışarıda bırakır: (20 + 17 + 22 + 19) / 4 = 78 / 4 = **19.5**.",
   "why": {
    "0": "78 / 5 = 15.6 yanlış: NULL olan yaş ortalamaya katılmaz.",
    "2": "78 SUM(yas) sonucu."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT ad FROM Ogrenci WHERE yas = NULL;` kaç satır döndürür?",
   "opts": [
    "1",
    "0",
    "5",
    "4",
    "Komut hata verir"
   ],
   "a": 1,
   "exp": "NULL ile `=` karşılaştırması doğru sonuç vermez; sorgu boş döner. Doğrusu `yas IS NULL`.",
   "why": {
    "0": "Can'ın yaşı NULL ama `= NULL` onu da bulmaz; IS NULL gerekir."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "Yaşı **bilinmeyen** öğrenciyi (Can) getirmek için boşluğa ne yazılmalıdır?",
   "opts": [
    "yas = ''",
    "yas = 0",
    "yas LIKE NULL",
    "yas IS NULL",
    "yas = NULL"
   ],
   "a": 3,
   "exp": "NULL kontrolü **IS NULL** ile yapılır. NULL ne 0'dır ne boş metindir.",
   "code": "SELECT ad FROM Ogrenci WHERE ____;",
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT DISTINCT sehir FROM Ogrenci;` kaç satır döndürür?",
   "opts": [
    "1",
    "4",
    "3",
    "5",
    "2"
   ],
   "a": 2,
   "exp": "DISTINCT tekrarları teke indirir: Ankara, İzmir, Bursa → 3.",
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki sorgunun sonucu hangisidir?",
   "opts": [
    "Ankara / 2, Bursa / 1, İzmir / 2",
    "Ankara / 2, İzmir / 2",
    "Ankara / 2",
    "Bursa / 1",
    "İzmir / 2"
   ],
   "a": 1,
   "exp": "Gruplar: Ankara 2, Bursa 1, İzmir 2. HAVING sadece 2 ve üzeri grupları tutar.",
   "code": "SELECT sehir, COUNT(*)\nFROM Ogrenci\nGROUP BY sehir\nHAVING COUNT(*) >= 2\nORDER BY sehir;",
   "why": {
    "0": "HAVING COUNT(*) >= 2 olduğu için Bursa (1) elenir."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT ad FROM Ogrenci ORDER BY yas DESC LIMIT 1;` hangi adı verir?",
   "opts": [
    "Ay",
    "Ece",
    "Ayşe",
    "Can",
    "Ali"
   ],
   "a": 0,
   "exp": "DESC büyükten küçüğe sıralar; en büyük yaş 22 (Ay). LIMIT 1 ilk satırı alır.",
   "why": {
    "4": "Ali en küçük yaş (17); bu ASC olsaydı gelirdi.",
    "3": "NULL azalan sıralamada en sona düşer."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "`SELECT SUM(stok) FROM Urun WHERE kategori = 'Kırtasiye';` sorgusunun sonucu nedir?",
   "opts": [
    "140",
    "NULL",
    "3",
    "65",
    "145"
   ],
   "a": 0,
   "exp": "SUM NULL'ı atlar: 100 + 40 = **140** (Silgi'nin stoğu NULL).",
   "why": {
    "1": "Bir değer NULL diye toplam NULL olmaz; SUM NULL'ları atlar.",
    "2": "3 satır sayısı (COUNT)."
   },
   "tbl": [
    {
     "cap": "**Urun** tablosu",
     "head": [
      "urun_id",
      "ad",
      "kategori",
      "fiyat",
      "stok"
     ],
     "rows": [
      [
       "1",
       "Kalem",
       "Kırtasiye",
       "10",
       "100"
      ],
      [
       "2",
       "Defter",
       "Kırtasiye",
       "25",
       "40"
      ],
      [
       "3",
       "Silgi",
       "Kırtasiye",
       "5",
       "NULL"
      ],
      [
       "4",
       "Çay",
       "Market",
       "30",
       "60"
      ],
      [
       "5",
       "Kahve",
       "Market",
       "80",
       "20"
      ],
      [
       "6",
       "Su",
       "Market",
       "5",
       "200"
      ]
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki sorgunun sonucu hangisidir?",
   "opts": [
    "Kırtasiye / 25",
    "Kahve / 80",
    "Market / 80, Kırtasiye / 25",
    "(boş)",
    "Market / 80"
   ],
   "a": 4,
   "exp": "Kategori en yüksek fiyatları: Kırtasiye 25, Market 80. HAVING > 50 sadece Market'i bırakır.",
   "code": "SELECT kategori, MAX(fiyat)\nFROM Urun\nGROUP BY kategori\nHAVING MAX(fiyat) > 50;",
   "why": {
    "1": "SELECT ürün adını değil kategoriyi gösteriyor."
   },
   "tbl": [
    {
     "cap": "**Urun** tablosu",
     "head": [
      "urun_id",
      "ad",
      "kategori",
      "fiyat",
      "stok"
     ],
     "rows": [
      [
       "1",
       "Kalem",
       "Kırtasiye",
       "10",
       "100"
      ],
      [
       "2",
       "Defter",
       "Kırtasiye",
       "25",
       "40"
      ],
      [
       "3",
       "Silgi",
       "Kırtasiye",
       "5",
       "NULL"
      ],
      [
       "4",
       "Çay",
       "Market",
       "30",
       "60"
      ],
      [
       "5",
       "Kahve",
       "Market",
       "80",
       "20"
      ],
      [
       "6",
       "Su",
       "Market",
       "5",
       "200"
      ]
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "WHERE ile HAVING arasındaki fark hangisidir?",
   "opts": [
    "HAVING sadece ORDER BY ile kullanılır",
    "WHERE gruplamadan önce satırları, HAVING gruplanmış sonuçları filtreler",
    "İkisi de aynıdır",
    "WHERE sadece sayılarla çalışır",
    "WHERE grupları, HAVING satırları filtreler"
   ],
   "a": 1,
   "exp": "İşlenme sırası: FROM → WHERE → GROUP BY → **HAVING** → SELECT → ORDER BY.",
   "topic": "sorgu"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki INNER JOIN kaç satır döndürür?",
   "opts": [
    "7",
    "12",
    "3",
    "4",
    "2"
   ],
   "a": 3,
   "exp": "Her sanatçının bir festivali var; eşleşen 4 satır gelir.",
   "code": "SELECT sanatci.adi, festival.adi\nFROM sanatci\nINNER JOIN festival ON sanatci.festival_id = festival.id;",
   "why": {
    "1": "12 = 4 × 3, CROSS JOIN (kartezyen çarpım) sonucu olurdu."
   },
   "tbl": [
    {
     "cap": "**festival** tablosu",
     "head": [
      "id",
      "adi",
      "tarih",
      "adres_il"
     ],
     "rows": [
      [
       "1",
       "ABC FESTİVALİ",
       "2000-01-01",
       "AFYON"
      ],
      [
       "2",
       "BCD FESTİVALİ",
       "2000-02-02",
       "BURDUR"
      ],
      [
       "3",
       "CDE FESTİVALİ",
       "2000-03-03",
       "MANİSA"
      ]
     ]
    },
    {
     "cap": "**sanatci** tablosu",
     "head": [
      "id",
      "adi",
      "sanat_turu",
      "festival_id"
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
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "fill",
   "q": "Sonucu yaşa göre **azalan** sıralamak için boşluğu doldurun.",
   "code": "SELECT ad, yas FROM Ogrenci\nWHERE yas IS NOT NULL\nORDER BY yas ____;",
   "ans": [
    "DESC"
   ],
   "cs": false,
   "exp": "`DESC` azalan (9→1), `ASC` artan (varsayılan).",
   "whyFill": {
    "ASC": "ASC artan sıralar (17, 19, 20, 22)."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "fill",
   "q": "Adı **A ile başlayan ve tam 2 karakter** olan öğrencileri getiren deseni tamamlayın.",
   "code": "SELECT ad FROM Ogrenci WHERE ad LIKE '____';",
   "ans": [
    "A_"
   ],
   "cs": false,
   "exp": "`_` tam **bir** karakter: `A_` → Ay.",
   "whyFill": {
    "A%": "`%` sıfır ya da çok karakter: Ayşe, Ali, Ay hepsi gelir."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "sorgu"
  },
  {
   "type": "code",
   "title": "Sanatçı ve festival",
   "q": "Her sanatçının adını katıldığı festivalin adıyla birlikte, sanatçı numarasına göre sıralı listeleyin.",
   "code": "SELECT sanatci.adi, festival.adi\nFROM sanatci\n{{1}} JOIN festival\n  {{2}} sanatci.festival_id = festival.{{3}}\n{{4}} BY sanatci.id;",
   "blanks": [
    {
     "ans": [
      "INNER"
     ],
     "cs": false
    },
    {
     "ans": [
      "ON"
     ],
     "cs": false
    },
    {
     "ans": [
      "id"
     ],
     "cs": false
    },
    {
     "ans": [
      "ORDER"
     ],
     "cs": false
    }
   ],
   "exps": [
    "Eşleşenleri getiren birleştirme: `INNER JOIN`.",
    "Eşleşme koşulu `ON` ile yazılır.",
    "Festival tablosunun anahtarı `id` (sanatci.festival_id buna işaret eder).",
    "Sıralama `ORDER BY`."
   ],
   "note": "Sonuç: AA AA ve BB BB → ABC FESTİVALİ, CC CC → BCD FESTİVALİ, DD DD → CDE FESTİVALİ.",
   "topic": "sorgu"
  }
 ],
 "gruplar": [
  {
   "type": "mc",
   "q": "GRANT ve REVOKE hangi komut grubundadır?",
   "opts": [
    "DQL",
    "DDL",
    "DML",
    "TCL",
    "DCL"
   ],
   "a": 4,
   "exp": "**DCL (Data Control Language)** erişim yetkisini yönetir.",
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "COMMIT, ROLLBACK ve SAVEPOINT hangi komut grubundadır?",
   "opts": [
    "DML",
    "DQL",
    "DCL",
    "DDL",
    "TCL"
   ],
   "a": 4,
   "exp": "**TCL (Transaction Control Language)** işlemleri onaylar ya da geri alır.",
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Aşağıdakilerden hangisi bir **DML** komutudur?",
   "opts": [
    "COMMIT",
    "CREATE TABLE",
    "GRANT",
    "UPDATE",
    "TRUNCATE"
   ],
   "a": 3,
   "exp": "DML: INSERT, UPDATE, DELETE.",
   "why": {
    "1": "DDL.",
    "2": "DCL.",
    "0": "TCL.",
    "4": "Çoğu kaynakta DDL."
   },
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "CRUD kısaltmasındaki \"C\" hangi SQL komutuna karşılık gelir?",
   "opts": [
    "CREATE TABLE",
    "COMMIT",
    "INSERT",
    "COUNT",
    "SELECT"
   ],
   "a": 2,
   "exp": "Create (kayıt oluştur) = **INSERT**, Read = SELECT, Update = UPDATE, Delete = DELETE.",
   "why": {
    "0": "Tuzak: CREATE TABLE yapı oluşturur (DDL). CRUD'daki Create kayıt eklemektir.",
    "4": "SELECT, R (Read)."
   },
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki işlem bloğundan sonra `SELECT COUNT(*) FROM Ogrenci;` kaç döndürür?",
   "opts": [
    "5",
    "3",
    "0",
    "2",
    "Komut hata verir"
   ],
   "a": 0,
   "exp": "`ROLLBACK` henüz onaylanmamış silmeyi geri alır; tabloda yine 5 öğrenci var.",
   "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE yas < 20;\nROLLBACK;",
   "why": {
    "1": "COMMIT olsaydı 3 kalırdı; ROLLBACK silmeyi geri aldı."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki işlem bloğundan sonra `SELECT COUNT(*) FROM Ogrenci;` kaç döndürür?",
   "opts": [
    "2",
    "0",
    "4",
    "3",
    "5"
   ],
   "a": 3,
   "exp": "yas < 20: Ali (17) ve Ece (19) silinir; COMMIT kalıcılaştırır → 3. Can'ın yaşı NULL olduğu için koşula girmez.",
   "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE yas < 20;\nCOMMIT;",
   "why": {
    "4": "COMMIT onaylar, geri almaz.",
    "2": "NULL < 20 doğru değildir; Can silinmez."
   },
   "tbl": [
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
     ]
    }
   ],
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Görünüm (VIEW) için hangisi doğrudur?",
   "opts": [
    "Sorgudan türetilen sanal tablodur; veriyi ayrıca kopyalamaz",
    "Tablodaki tüm satırları siler",
    "Aramayı hızlandıran yardımcı yapıdır",
    "Tablonun fiziksel yedeğidir",
    "Yetki veren komuttur"
   ],
   "a": 0,
   "exp": "VIEW bir sorguya dayalı **sanal tablodur**.",
   "why": {
    "2": "Bu INDEX."
   },
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Bazı aramaları hızlandırabilecek yardımcı yapıyı oluşturan komut hangisidir?",
   "opts": [
    "CREATE VIEW",
    "GRANT",
    "CREATE DATABASE",
    "SAVEPOINT",
    "CREATE INDEX"
   ],
   "a": 4,
   "exp": "`CREATE INDEX idx_ad ON Ogrenci (ad);`",
   "why": {
    "0": "VIEW sanal tablo oluşturur."
   },
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Hocanın \"yetkisiz stajyer tüm notları silmesin\" sorununun SQL'deki karşılığı hangisidir?",
   "opts": [
    "AUTO_INCREMENT kullanmak",
    "ORDER BY ile sıralamak",
    "DISTINCT ile tekrarları kaldırmak",
    "TRUNCATE ile tabloyu boşaltmak",
    "GRANT/REVOKE ile yetkilendirme (DCL)"
   ],
   "a": 4,
   "exp": "Kime hangi yetkinin verileceği DCL ile (GRANT/REVOKE) belirlenir.",
   "topic": "gruplar"
  },
  {
   "type": "mc",
   "q": "Aşağıdaki eşleştirmelerden hangisi **yanlıştır**?",
   "opts": [
    "CREATE → DDL",
    "INSERT → DDL",
    "GRANT → DCL",
    "ROLLBACK → TCL",
    "SELECT → DQL"
   ],
   "a": 1,
   "exp": "INSERT veri ekler: **DML**. DDL yapıyla ilgilenir.",
   "topic": "gruplar"
  },
  {
   "type": "fill",
   "q": "İşlemde yapılan değişiklikleri onaylayıp kalıcı hâle getiren komutu yazın.",
   "code": "START TRANSACTION;\nDELETE FROM Ogrenci WHERE id = 4;\n____;",
   "ans": [
    "COMMIT"
   ],
   "cs": false,
   "exp": "`COMMIT` onaylar; `ROLLBACK` geri alırdı.",
   "whyFill": {
    "ROLLBACK": "ROLLBACK değişikliği geri alır, onaylamaz.",
    "SAVEPOINT": "SAVEPOINT ara nokta koyar."
   },
   "topic": "gruplar"
  },
  {
   "type": "fill",
   "q": "Kullanıcıya yetki veren DCL komutunu yazın.",
   "code": "____ SELECT ON universite.* TO 'stajyer'@'localhost';",
   "ans": [
    "GRANT"
   ],
   "cs": false,
   "exp": "`GRANT` yetki verir, `REVOKE` geri alır.",
   "whyFill": {
    "REVOKE": "REVOKE yetkiyi geri alır."
   },
   "topic": "gruplar"
  }
 ]
};
window.EXTRA_CODE = [];
