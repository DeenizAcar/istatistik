"""Çalışma kitapçığının 50 sorusu: metin, şık sırası ve cevap harfleri birebir; gerekçeler cevap anahtarından.
Kitapçık hocanın değil, hocanın notuna dayanan ek çalışma içeriği."""
import lib
from lib import topic, mc

L = 'ABCD'


def K(n, tid, q, opts, letter, exp, **kw):
    topic(tid)
    return mc(q, opts, L.index(letter), exp, src='Kitapçık %d' % n, fixed=True, **kw)


K(1, 'giris', 'Veritabanının temel amacı aşağıdakilerden hangisidir?',
  ['Sadece programları çalıştırmak', 'Verileri düzenli saklamak ve erişimi yönetmek', 'Bilgisayarın işlemcisini hızlandırmak', 'İnternete kablosuz bağlanmak'], 'B',
  'Veritabanı verileri düzenli biçimde saklama, erişme ve yönetme imkânı verir.')
K(2, 'dbms', 'VTYS (DBMS) neyi ifade eder?',
  ['Veritabanı yönetim yazılımını', 'Bir ağ kablosu türünü', 'Yalnızca tablo satırlarını', 'SQL komutlarının tamamını'], 'A',
  'VTYS, veritabanını oluşturup yöneten yazılımdır.')
K(3, 'dbms', 'Bir tabloda tek bir öğrenciye ait tüm bilgiler genellikle ne olarak adlandırılır?',
  ['Sütun', 'İndeks', 'Satır / kayıt', 'Şema'], 'C',
  'Bir kişi/nesneyle ilgili bilgiler bir satırda tutulur.')
K(4, 'dbms', 'Ogrenci tablosundaki “ad” ve “yas” alanları nedir?',
  ['Sütun', 'Veritabanı', 'Satır', 'İlişki'], 'A',
  'Ad ve yaş, kayıtların özelliklerini gösteren sütunlardır.')
K(5, 'er', 'Klasik ER (Chen) diyagramında ilişkiyi hangi şekil gösterir?',
  ['Oval', 'Dikdörtgen', 'Baklava / eşkenar dörtgen', 'Daire'], 'C',
  'ER diyagramında ilişki diamond (baklava) ile gösterilir.')
K(6, 'er', 'Aşağıdakilerden hangisi ER ilişki türlerinden biridir?',
  ['Bire çok (1:N)', 'İki sütunlu', 'Birincil veri', 'Sanal tablo'], 'A',
  '1:N, üç temel ilişki türünden biridir.')
K(7, 'festival', 'Gönderilen notta “Festival(1) — katılır — Sanatçı(N)” hangi ilişkiyi gösterir?',
  ['1:1', '1:N', 'N:N', 'İlişki yok'], 'B',
  'Notta bir festival ve çok sanatçı gösterildiği için 1:N’dir.')
K(8, 'festival', 'Gönderilen notta “Sahne(N) — çıkar — Sanatçı(N)” hangi türdür?',
  ['1:1', '1:N', 'N:1', 'N:N'], 'D',
  'İki taraf da N olduğundan çoka çok ilişki vardır.')
K(9, 'ddl', 'Yeni bir tablo oluşturmak için hangi SQL komutu kullanılır?',
  ['CREATE TABLE', 'SELECT', 'UPDATE', 'GRANT'], 'A',
  'CREATE TABLE tablonun yapısını oluşturur.')
K(10, 'insert', 'Var olan tabloya yeni kayıt ekleyen komut hangisidir?',
  ['SELECT', 'INSERT INTO', 'DELETE FROM', 'ORDER BY'], 'B',
  'INSERT INTO yeni satır ekler.')
K(11, 'sorgu', 'Tablodan verileri listelemek için hangi komut kullanılır?',
  ['ALTER', 'COMMIT', 'SELECT', 'REVOKE'], 'C',
  'SELECT tablodan sütun ve kayıtları sorgular.')
K(12, 'insert', 'Var olan kayıtların değerini değiştirmek için hangisi kullanılır?',
  ['UPDATE', 'DROP', 'CREATE INDEX', 'GROUP BY'], 'A',
  'UPDATE var olan satırları günceller.')
K(13, 'sorgu', 'Satırları belirli bir koşula göre filtrelemek için hangisi kullanılır?',
  ['ORDER BY', 'WHERE', 'DISTINCT', 'AS'], 'B',
  'WHERE sonuçların karşılayacağı satır koşulunu belirtir.')
K(14, 'anahtar', 'Bir satırı benzersiz tanımlayan anahtar hangisidir?',
  ['FOREIGN KEY', 'DEFAULT', 'PRIMARY KEY', 'VIEW'], 'C',
  'PRIMARY KEY her kaydın benzersiz kimliğini sağlar.')
K(15, 'anahtar', 'Tablolar arasında referans kuran anahtar hangisidir?',
  ['FOREIGN KEY', 'ORDER BY', 'CHECK', 'AVG'], 'A',
  'FOREIGN KEY başka bir tablonun anahtarına referans verir.')
K(16, 'sorgu', '`SELECT DISTINCT sehir FROM Ogrenci;` sorgusunun amacı nedir?',
  ['Şehirleri alfabetik sıralamak', 'Aynı şehir değerlerini tekrarsız göstermek', 'Şehir sütununu silmek', 'Şehir değerlerini değiştirmek'], 'B',
  'DISTINCT tekrar eden sonuç satırlarını kaldırır.')
K(17, 'sorgu', '`ORDER BY notu DESC` ifadesi ne yapar?',
  ['Notu artan sıralar', 'Notları toplar', 'Notu azalan sıralar', 'NULL kayıtları siler'], 'C',
  'DESC büyükten küçüğe (azalan) sıralamadır.')
K(18, 'sorgu', "`WHERE ad LIKE 'A%'` koşulu hangi adları seçer?",
  ['A ile başlayanları', 'A ile bitenleri', 'İçinde herhangi bir A olanları', 'Tek karakterli adları'], 'A',
  'A% deseni A ile başlayıp devamında sıfır veya çok karakteri kabul eder.')
K(19, 'sorgu', 'Bir sütunda NULL değerleri bulmak için doğru koşul hangisidir?',
  ['= NULL', 'IS NULL', 'LIKE NULL', 'IN NULL'], 'B',
  'NULL denetiminde IS NULL kullanılır.')
K(20, 'sorgu', '`WHERE puan BETWEEN 40 AND 60` hangi puanları kapsar?',
  ['Sadece 40 ve 60 arasını, sınırlar hariç', 'Sadece 40 ve 60 değerlerini', '40 ile 60 arasını, 40 ve 60 dahil', '40’tan küçük ve 60’tan büyükleri'], 'C',
  'BETWEEN alt ve üst sınır değerlerini de içerir.')
K(21, 'sorgu', 'Benzer kayıtları şehir bazında bir araya getiren ifade hangisidir?',
  ['GROUP BY sehir', 'ORDER BY sehir', 'DROP sehir', 'UPDATE sehir'], 'A',
  'GROUP BY aynı şehir değerlerini gruplar.')
K(22, 'sorgu', 'Gruplara uygulanan filtre hangi ifadeyle yazılır?',
  ['WHERE', 'HAVING', 'LIMIT', 'IN'], 'B',
  'HAVING toplulaştırılmış/gruplanmış sonuçları filtreler.')
K(23, 'sorgu', '`COUNT(ad)` fonksiyonu neyi sayar?',
  ['Tablodaki tüm satırları koşulsuz', 'Adı NULL olan satırları', 'ad sütununda NULL olmayan değerleri', 'Sadece farklı adları'], 'C',
  'COUNT(ad) NULL değerleri hesaba katmaz; DISTINCT yoksa tekrarları sayar.')
K(24, 'insert', '`UPDATE Ogrenci SET yas = 21;` komutunda WHERE olmamasının tipik sonucu nedir?',
  ['Hata verir, hiçbir satır değişmez', 'Tüm satırların yaş değeri 21 yapılır', 'Sadece ilk satır değişir', 'Yeni bir sütun oluşur'], 'B',
  'WHERE olmadığından tüm kayıtlar güncellenir.')
K(25, 'ddl', '`DROP TABLE Ogrenci;` komutu ne yapar?',
  ['Yalnız koşula uyan satırları siler', 'Tabloyu yapısı ile birlikte kaldırır', 'Tablodaki verileri sıralar', 'Tabloya yeni sütun ekler'], 'B',
  'DROP TABLE tablo nesnesini kaldırır.')
K(26, 'ddl', 'TRUNCATE TABLE için doğru ifade hangisidir?',
  ['Tablo sütunlarını yeniden adlandırır', 'Yalnız WHERE koşuluna uyanları temizler', 'Tablonun tüm satırlarını boşaltır, yapısını korur', 'Sorgu sonucunu gruplar'], 'C',
  'TRUNCATE bütün satırları boşaltır; tablo yapısı kalır.')
K(27, 'sorgu', 'INNER JOIN sonuçta hangi kayıtları getirir?',
  ['Sadece soldaki eşleşmeyenleri', 'İki tabloda eşleşenleri', 'Her iki tablonun tüm satırlarını mutlaka', 'Sadece sağdaki eşleşmeyenleri'], 'B',
  'INNER JOIN eşleşen satır birleşimlerini getirir.')
K(28, 'sorgu', 'LEFT JOIN için hangisi doğrudur?',
  ['Sol tablonun tüm kayıtlarını tutar', 'Yalnız sağ tablonun tüm kayıtlarını tutar', 'Tabloları siler', 'Satır sayılarını toplar'], 'A',
  'LEFT JOIN soldaki bütün satırları korur; eşleşmeyen sağ alanlar NULL olur.')
K(29, 'anahtar', '1:N ilişkide yabancı anahtar genel olarak nereye konur?',
  ['Her zaman 1 tarafına', 'Hiçbir tarafa konmaz', 'N (çok) tarafına', 'Sadece veritabanı adına'], 'C',
  '1:N ilişkide N tarafında 1 tarafın anahtarı taşınır.')
K(30, 'anahtar', 'N:N ilişkileri ilişkisel tablo yapısına dönüştürmek için yaygın yöntem nedir?',
  ['Tek tabloyu silmek', 'Ara / köprü tablo kurmak', 'PRIMARY KEY kullanmamak', 'Sadece veriyi sıralamak'], 'B',
  'N:N ilişkisi iki FK tutan ara tablo ile temsil edilir.')
K(31, 'anahtar', 'NOT NULL kısıtı neyi önler?',
  ['Tekrarlanan verileri', 'Değerin NULL olarak bırakılmasını', 'Tablonun silinmesini', 'Sıralamayı'], 'B',
  'NOT NULL ilgili alanda NULL değeri yasaklar.')
K(32, 'anahtar', 'UNIQUE kısıtı hangi amaçla kullanılır?',
  ['Sorguyu gruplamak', 'Veritabanını yedeklemek', 'Sütundaki değerlerin benzersizliğini sağlamak', 'Tabloyu küçültmek'], 'C',
  'UNIQUE tekrar eden değerleri engeller; NULL davranışı sisteme göre değişebilir.')
K(33, 'ddl', 'Tabloya yeni bir sütun eklemek için hangi SQL ifadesi kullanılır?',
  ['ALTER TABLE', 'SELECT DISTINCT', 'ROLLBACK', 'GRANT'], 'A',
  'ALTER TABLE var olan tablonun yapısını değiştirir.')
K(34, 'gruplar', 'Aşağıdakilerden hangisi DDL komutudur?',
  ['INSERT', 'UPDATE', 'CREATE TABLE', 'SELECT'], 'C',
  'CREATE TABLE veri yapısını oluşturur; DDL grubundadır.')
K(35, 'gruplar', 'İşlemde yapılan değişiklikleri onaylama komutu hangisidir?',
  ['COMMIT', 'WHERE', 'ROLLBACK', 'REVOKE'], 'A',
  'COMMIT işlem kapsamındaki değişiklikleri onaylar.')
K(36, 'gruplar', 'Aşağıdakilerden hangisi DCL komutudur?',
  ['GROUP BY', 'GRANT', 'INSERT', 'TRUNCATE'], 'B',
  'GRANT kullanıcıya/role yetki verir ve DCL grubundadır.')
K(37, 'sorgu', 'SUM() fonksiyonu ne işe yarar?',
  ['Sayıları sıralar', 'Satır sayısını sayar', 'Sayısal değerleri toplar', 'En düşük değeri bulur'], 'C',
  'SUM sayısal değerlerin toplamını verir.')
K(38, 'sorgu', 'Aşağıdaki SQL anahtar sözcüklerinden hangisi sıralama amacı taşır?',
  ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'], 'A',
  'ORDER BY sonuç satırlarını sıralar.')
K(39, 'gruplar', 'Veritabanında indeks oluşturmanın tipik amacı nedir?',
  ['Tabloyu silmek', 'Bazı aramaları hızlandırmak', 'SQL’i devre dışı bırakmak', 'Bütün tekrarları yasaklamak'], 'B',
  'Index özellikle uygun aramalarda sorgu performansına yardım eder.')
K(40, 'sorgu', 'SQL’de “AS” en yaygın olarak ne sağlar?',
  ['Kayıtları silme', 'Tabloyu oluşturma', 'Sütuna / tabloya takma ad verme', 'Yetkiyi geri alma'], 'C',
  'AS sütun veya tablo için alias (takma ad) oluşturur.')
K(41, 'gruplar', 'Bir işlem henüz COMMIT edilmemişken değişiklikleri geri almak için hangi komut kullanılır?',
  ['GRANT', 'INSERT', 'ROLLBACK', 'DISTINCT'], 'C',
  'ROLLBACK devam eden bir işlemin geri alınmasını sağlar.')
K(42, 'sorgu', 'Sırasıyla WHERE, GROUP BY ve HAVING ifadelerinin görevleri hangisidir?',
  ['Grup filtrele – sırala – satır filtrele', 'Satır filtrele – grupla – grup filtrele', 'Grupla – grup filtrele – satır filtrele', 'Sırala – grupla – tablo sil'], 'B',
  'WHERE satır; GROUP BY grup oluşturma; HAVING grup filtresi içindir.')
# 43 ve 44: sqlite ile doğrulanır
K(43, 'sorgu', 'Ogrenci tablosundaki yas değerleri 18, NULL, 22 ve 20 ise COUNT(*) / COUNT(yas) kaçtır?',
  ['3 / 3', '4 / 3', '4 / 4', '3 / 4'], 'B',
  '4 satırın hepsi COUNT(*) içinde; NULL olan yas, COUNT(yas) içinde değildir.',
  sql='''CREATE TABLE Ogrenci (yas INT);
INSERT INTO Ogrenci VALUES (18), (NULL), (22), (20);
SELECT COUNT(*), COUNT(yas) FROM Ogrenci;''')
K(44, 'sorgu', "LIKE 'A_' deseni için hangi ad tam olarak eşleşir?",
  ['A', 'Ali', 'Ay', 'Ankara'], 'C',
  "_ tam bir karakterdir; 'Ay' iki harfli ve A ile başlayan tek uygun değerdir.",
  sql='''CREATE TABLE t (ad VARCHAR(20));
INSERT INTO t VALUES ('A'), ('Ali'), ('Ay'), ('Ankara');
SELECT ad FROM t WHERE ad LIKE 'A_';''')
K(45, 'sorgu', 'UNION ALL ile UNION arasındaki temel fark nedir?',
  ['UNION ALL tekrar eden satırları korur', 'UNION ALL yalnız tek sütunla çalışır', 'UNION tekrar edenleri mutlaka korur', 'UNION sadece sayısal verilerle çalışır'], 'A',
  'UNION ALL tekrarları kaldırmaz; UNION tekrarları kaldırır.')
K(46, 'festival', 'Bir sanatçı birçok festivale, bir festival birçok sanatçıya ev sahipliği yapabiliyorsa gerçek dünyadaki ilişki hangisidir?',
  ['1:1', '1:N', 'N:1', 'N:N'], 'D',
  'İki yönde de çokluk olduğu için N:N gerekir; nottaki çizili Festival 1:N modeli ayrı durumdur.')
K(47, 'sorgu', '`SELECT sehir, COUNT(*) FROM Ogrenci GROUP BY sehir HAVING COUNT(*) > 2;` sorgusu neyi getirir?',
  ['2’den fazla kayıt olan şehir gruplarını ve sayılarını', 'Her şehir için en fazla 2 öğrenciyi', 'Şehir sütununu silmeyi', 'Tüm kayıtları şehirden bağımsız saymayı'], 'A',
  'HAVING COUNT(*) > 2 sadece 3 veya daha fazla kaydı olan grupları tutar.')
K(48, 'sorgu', 'Aşağıdakilerden hangisi NULL değer kontrolü için doğrudur?',
  ['NULL ile = karşılaştırması TRUE döner', 'NULL, sıfırın tam eş anlamlısıdır', 'IS NULL ifadesi kullanılmalıdır', 'NULL her zaman boş metindir'], 'C',
  'NULL bilinmeyen/eksik değeri gösterir ve IS NULL ile kontrol edilir.')
K(49, 'anahtar', '3NF normalizasyonunun temel hedefi hangi bağımlılığı önlemektir?',
  ['Sütunların tek değerli oluşunu', 'Anahtar olmayan alanlar arasındaki geçişli bağımlılığı', 'Birincil anahtar kullanımını', 'Her tablonun bir satır içermesini'], 'B',
  '3NF, uygun anahtar dışı alanlar arasında geçişli fonksiyonel bağımlılığı kaldırır.')
K(50, 'gruplar', 'SELECT ile ilgili aşağıdakilerden hangisi en doğrudur?',
  ['Her kaynakta kesinlikle sadece DDL olarak sınıflanır', 'Sadece tablo silmek içindir', 'DQL olarak sınıflandırılabilir; bazı kaynaklar DML içinde ele alır', 'Yalnız yetki verme amacıyla kullanılır'], 'C',
  'SELECT genelde DQL olarak öğretilir, bazı sınıflamalarda DML içinde yer alır.')

# kontrol: kitapçığın cevap anahtarı tablosu (1–10, 11–20, …) ayrı yazıldı; build.py şıklarla karşılaştırır
KEY = 'BACACABDAB' 'CABCABCABC' 'ABCBBCBACB' 'BCACABCABC' 'CBBCADACBC'
BOOK = [d for _, d in lib.Q]
del lib.Q[:]
