"""Konu soruları (135): çoğu 5 şıklı test, konu başına 1–2 boşluk, 4 kod tamamlama.
Doğru şık hep ilk yazılır (a=0); build.py şıkları tohumlu ve dengeli karıştırır.
Sorgu sonucu soran her soru sqlite ile çalıştırılır (lib.verify)."""
from lib import topic, mc, fill, code, FIX

V5 = ['Volume (Hacim)', 'Velocity (Hız)', 'Variety (Çeşitlilik)', 'Veracity (Doğruluk)', 'Value (Değer)']


def v5(q, k, exp, why=None):
    """5V sorusu: doğru V en başa alınır"""
    opts = [V5[k]] + [v for i, v in enumerate(V5) if i != k]
    return mc(q, opts, 0, exp, why=why)


# ======================= 1. giris =======================
topic('giris')
mc('Hocanın notuna göre aşağıdakilerden hangisi **bilgi**dir?',
   ["Ali'nin Veritabanı Teknolojileri sınavından aldığı not 85'tir.", '85', 'Ali', '2026', 'Veritabanı Teknolojileri'], 0,
   'Ham veriler (Ali, 85, ders adı) anlamlı bir cümleye dönüşünce **bilgi** olur. Tek başına "85" ya da "Ali" sadece veridir.',
   why={1: '"85" tek başına veridir: not mu, sıcaklık mı, para mı bilinmez.', 2: '"Ali" tek başına bir isim, yani veridir.'})
mc('**Veri (data)** kavramının tanımı hangisidir?',
   ['İşlenmemiş, ham, tek başına anlam taşımayan gözlem veya ölçümler',
    'Verilerin işlenip karar verilebilir hâle gelmiş biçimi',
    'Veritabanını yöneten yazılım',
    'Tablolar arasındaki bağlantı',
    'Verinin yedek kopyası'], 0,
   'Veri ham maddedir; işlenmiş ve anlam kazanmış hâli **bilgi**dir.',
   why={1: 'Bu bilginin (information) tanımıdır.', 2: 'Bu DBMS\'in tanımıdır.'})
mc('Bir öğrencinin adresi hem "Öğrenci Dosyası"nda hem "Yurt Başvuru Dosyası"nda ayrı ayrı tutuluyor. Bu, dosya tabanlı sistemlerin hangi sorunudur?',
   ['Veri tekrarı (redundancy)', 'Eş zamanlı erişim problemi', 'Yedekleme zorluğu', 'Güvenlik eksikliği', 'Veri tutarsızlığı'], 0,
   'Aynı verinin gereksiz yere birden fazla yerde saklanması **veri tekrarı**dır.',
   why={4: 'Tutarsızlık, tekrar eden veri bir yerde güncellenip diğerinde unutulunca oluşur. Burada henüz çelişki yok, sadece tekrar var.'})
mc('Öğrencinin adresi bir dosyada güncellenip diğerinde unutulursa sistemde çelişkili bilgi oluşur. Bu sorunun adı nedir?',
   ['Veri tutarsızlığı', 'Veri tekrarı', 'Ölçeklenebilirlik', 'Eş zamanlı erişim', 'Soyutlama'], 0,
   '**Veri tutarsızlığı** veri tekrarından kaynaklanır: iki kopya birbirini tutmaz.',
   why={1: 'Tekrar sebebidir; çelişkili bilginin kendisine tutarsızlık denir.'})
mc('Hocanın senaryosunda aynı anda 50 personel `ogrenciler.xlsx` dosyasından öğrenci bilgisi güncellemek istiyor. Hangi sorun ortaya çıkar?',
   ['Kilitlenme ve veri kaybı (eş zamanlı erişim)', 'Veri tekrarı', 'Yedekleme eksikliği', 'Güvenlik eksikliği', 'Veri tipi hatası'], 0,
   'Aynı dosyayı aynı anda değiştirenler birbirinin üzerine yazar; dosya kilitlenir, veri kaybolur. Bu **eş zamanlı erişim (concurrency)** sorunudur.')
mc('Yetkisiz bir stajyerin tüm öğrencilerin not bilgilerini silebilmesi hangi sorunu gösterir?',
   ['Güvenlik ve yetkilendirme eksikliği', 'Veri tutarsızlığı', 'Eş zamanlı erişim', 'Veri tekrarı', 'Hacim (Volume)'], 0,
   'Dosya sistemlerinde dosya ya herkese açık ya tamamen kapalıdır; kullanıcıya sadece belirli bölümleri göstermek zordur.')
mc('Aşağıdakilerden hangisi hocanın saydığı dosya tabanlı sistem sorunlarından biri **değildir**?',
   ['Sorguların SQL ile yazılması', 'Veri tekrarı', 'Güncelleme zorluğu', 'Yedekleme ve kurtarma zorlukları', 'Eş zamanlı erişim problemi'], 0,
   'Altı sorun: veri tekrarı, tutarsızlık, güncelleme zorluğu, eş zamanlı erişim, güvenlik/yetkilendirme eksikliği, yedekleme ve kurtarma zorluğu. SQL bir sorun değil, veritabanlarının çözümüdür.')
mc('Excel ile ilgili hangisi doğrudur?',
   ['Küçük listeler için iyidir ama binlerce kullanıcının aynı anda veri girdiği sistemlerde yetersiz kalır.',
    'Excel bir veritabanı yönetim sistemidir.',
    'Excel aynı anda binlerce kullanıcının güvenle işlem yapmasını sağlar.',
    'Excel dosyalarında veri tekrarı olamaz.',
    "Excel, MySQL'in arayüzüdür."], 0,
   'Hoca: öğrencilerin sık düştüğü hata Excel\'i veritabanı sanmaktır. Eş zamanlı erişim, veri bütünlüğü ve hızlı arama için veritabanı gerekir.',
   why={4: 'MySQL\'in arayüzleri phpMyAdmin ve HeidiSQL\'dir.'})
mc('**Veri bütünlüğü (data integrity)** neyi ifade eder?',
   ['Verilerin tutarlı, doğru ve güvenilir olmasını sağlayan kurallar bütününü',
    'Verinin birden fazla yerde saklanmasını',
    'Verilerin bulutta dağıtık tutulmasını',
    'Verinin anlamlı hâle getirilmesini',
    'Tabloların silinmesini'], 0,
   'Veri bütünlüğü verinin tutarlı, doğru ve güvenilir kalmasıdır; veritabanı bunu kurallarla (kısıtlarla) korur.')
mc('Hocanın notunda bankacılık sistemindeki tipik ilişki zinciri hangisidir?',
   ['müşteri → hesap → işlem → bakiye', 'hesap → müşteri → sepet → stok', 'ürün → sepet → sipariş → kargo',
    'hasta → randevu → tahlil → reçete', 'öğrenci → ders → not → bölüm'], 0,
   'Bankacılıkta tipik ilişki: **müşteri → hesap → işlem → bakiye**.')
fill('Ham verinin işlenip anlamlı ve karar verilebilir hâle gelmiş biçimine ne denir? (tek kelime)',
     '-- Veri işlenince ____ olur.', ['bilgi', 'information', 'enformasyon'],
     'Veri ham madde, **bilgi** onun işlenmiş hâli.', nocheck=True,
     whyFill={'veri': 'Veri ham hâldir; işlenip anlam kazanınca bilgi olur.'})
fill('Aynı verinin gereksiz yere birden fazla yerde saklanmasına ne denir? (veri ____)',
     '-- Aynı adres hem öğrenci hem yurt dosyasında = veri ____', ['tekrarı', 'tekrari', 'tekrar', 'redundancy'],
     '**Veri tekrarı (redundancy).** Tutarsızlık bunun sonucudur.', nocheck=True,
     whyFill={'tutarsızlığı': 'Tutarsızlık tekrarın sonucudur: kopyalardan biri güncellenip diğeri unutulunca oluşur.'})

# ======================= 2. dbms =======================
topic('dbms')
mc('MySQL nedir?',
   ['Veritabanı yönetim sistemi (DBMS)', 'Veritabanını görsel yöneten web arayüzü', 'Bir sorgu dili', 'Bir NoSQL doküman veritabanı', 'Bir tablo türü'], 0,
   'MySQL arka planda çalışan, verileri saklayan ana motordur: bir **DBMS**.',
   why={1: 'Bu phpMyAdmin\'dir.', 2: 'Sorgu dili SQL\'dir; MySQL bu dili işleyen motordur.', 3: 'Doküman veritabanına örnek MongoDB.'})
mc('phpMyAdmin ve HeidiSQL nedir?',
   ["MySQL'i görsel olarak yönetmeyi sağlayan arayüz (GUI) araçları", 'Veritabanı yönetim sistemleri', 'Sorgu dilleri',
    'Büyük veri teknolojileri', 'NoSQL veritabanları'], 0,
   'İkisi de fareyle tıklayarak veritabanı ve tablo oluşturmayı sağlayan **arayüz** programlarıdır.',
   why={1: 'DBMS MySQL\'dir; bu araçlar onu yönetir.'})
mc('phpMyAdmin ile HeidiSQL arasındaki fark hangisidir?',
   ['phpMyAdmin web tarayıcısından, HeidiSQL masaüstünden çalışan arayüzdür.', 'phpMyAdmin bir DBMS, HeidiSQL bir dildir.',
    'HeidiSQL sadece NoSQL için kullanılır.', 'phpMyAdmin komut satırıdır, HeidiSQL web arayüzüdür.',
    "İkisi de MySQL'in yerine geçen veritabanı motorudur."], 0,
   'phpMyAdmin web arayüzü (SQL sekmesi var), HeidiSQL masaüstü aracı. İkisi de MySQL\'i yönetir.')
mc('Hocanın benzetmesinde veritabanı içinde değerli eşyaların durduğu kilitli bir **depo** ise DBMS nedir?',
   ['Deponun güvenliğini sağlayan, anahtarları yöneten güvenlik ve yönetim ekibi', 'Deponun içindeki eşyalar', 'Depoya giden yol',
    'Deponun kapısındaki kilit', 'Depodaki eşyaların listesi'], 0,
   'DBMS içeri kimin girip çıkacağına karar veren, anahtarları yöneten **profesyonel ekip**tir.',
   why={1: 'Eşyalar veridir.'})
mc('Verileri satır ve sütunlardan oluşan tablolarda tutan ve tabloları birbiriyle ilişkilendiren veritabanı türü hangisidir?',
   ['İlişkisel veritabanı (RDBMS)', 'NoSQL doküman veritabanı', 'Dosya tabanlı sistem', 'Anahtar-değer veritabanı', 'Graf veritabanı'], 0,
   '**İlişkisel (relational)** veritabanında veriler tablolarda tutulur ve tablolar birbirine bağlanır.')
mc('**NoSQL** kısaltmasının açılımı nedir?',
   ['Not Only SQL', 'No SQL Language', 'New Object SQL', 'Network of SQL', 'Non Query Language'], 0,
   'NoSQL = **Not Only SQL**: tablo zorunluluğu olmayan, esnek modeller kullanan veritabanları.',
   why={1: 'NoSQL "SQL yok" demek değildir; "sadece SQL değil" demektir.'})
mc('Aşağıdakilerden hangisi verileri JSON benzeri dokümanlarda saklayan NoSQL veritabanıdır?',
   ['MongoDB', 'MySQL', 'Oracle Database', 'Microsoft SQL Server', 'PostgreSQL'], 0,
   'Hocanın notundaki NoSQL örneği **MongoDB**. Diğerleri ilişkisel DBMS.')
mc('İlişkisel veritabanlarının kuramsal temellerini atan kişi kimdir?',
   ['Edgar F. Codd', 'Alan Turing', 'Tim Berners-Lee', 'Bill Gates', 'Linus Torvalds'], 0,
   '1970\'lerde ilişkisel modelin kuramsal temelini **Edgar F. Codd** attı.')
mc('Veritabanlarının tarihsel gelişim sırası hangisidir?',
   ['Dosya tabanlı → hiyerarşik/ağ → ilişkisel → NoSQL → bulut/dağıtık',
    'İlişkisel → dosya tabanlı → NoSQL → hiyerarşik → bulut',
    'NoSQL → ilişkisel → dosya tabanlı → bulut → hiyerarşik',
    'Hiyerarşik → dosya tabanlı → bulut → ilişkisel → NoSQL',
    'Bulut → NoSQL → ilişkisel → hiyerarşik → dosya tabanlı'], 0,
   '1960 öncesi dosya → 1960–70 hiyerarşik/ağ → 1970–2000 ilişkisel → 2000 sonrası NoSQL → günümüz bulut ve dağıtık sistemler.')
mc('Bir tabloda tek bir sanatçıya ait bütün bilgilerin bulunduğu yatay yapıya ne denir?',
   ['Satır / kayıt', 'Sütun / alan', 'Şema', 'İndeks', 'Görünüm'], 0,
   'Bir nesnenin tek kaydı **satırdır**. Sütun ise kayıtların bir özelliğidir (ör. `adi`).',
   why={1: 'Sütun tüm kayıtların tek bir özelliğidir, ör. bütün sanatçıların adları.'})
fill('Veritabanlarını oluşturan, yöneten, sorgulayan ve güvenliğini sağlayan yazılımın İngilizce kısaltması nedir?',
     '-- Database Management System = ____', ['DBMS', 'VTYS'],
     '**DBMS** (Türkçesi VTYS: Veritabanı Yönetim Sistemi).', nocheck=True,
     whyFill={'SQL': 'SQL bir dildir; yönetim yazılımının kısaltması DBMS.', 'RDBMS': 'RDBMS ilişkisel DBMS\'dir; genel kısaltma DBMS.'})
fill('MySQL bir DBMS\'dir; phpMyAdmin ise MySQL\'i görsel yöneten bir ____ aracıdır.',
     '-- phpMyAdmin, HeidiSQL = ____ (GUI)', ['arayüz', 'arayuz', 'GUI', 'ara yüz'],
     'phpMyAdmin ve HeidiSQL **arayüz (GUI)** araçlarıdır.', nocheck=True)

# ======================= 3. buyukveri =======================
topic('buyukveri')
v5("YouTube'a her dakika yüzlerce saatlik video yüklenmesi ve her gün petabaytlarca verinin eklenmesi 5V'den hangisine örnektir?", 0,
   'Devasa veri büyüklüğü **Volume (Hacim)**dir.')
v5('Kredi kartı dolandırıcılık tespiti için saniyenin onda birinde analiz yapılması hangi V\'dir?', 1,
   'Verinin anlık üretilip anlık işlenmesi **Velocity (Hız)**dır.',
   why={3: 'Veracity doğruluktur; burada vurgu hızda.'})
v5('Kolunu hızla sallayan hastanın akıllı bileklikte nabzının 200 görünmesi, 5V\'den hangisiyle ilgilidir?', 3,
   'Cihaz hatasından gelen kirli/gürültülü veriyi gerçek veriden ayırmak **Veracity (Doğruluk)** yönetimidir.',
   why={1: 'Velocity verinin akış hızıdır (kredi kartı örneği). Bileklik örneği verinin güvenilirliğiyle ilgili.'})
v5("Spotify'ın dinleme verilerinden \"Haftalık Keşif\" listesi çıkarması hangi V'dir?", 4,
   'Veri yığınından anlamlı bir fayda üretmek **Value (Değer)**dir.')
v5('Fotoğraf, video, ses kaydı, tweet ve GPS loglarının bir arada bulunması hangi V\'dir?', 2,
   'Farklı formatlar ve yapısal olmayan veriler **Variety (Çeşitlilik)**tir.')
mc('Büyük veri için hangisi doğrudur?',
   ['Geleneksel veritabanlarının işleyemeyeceği kadar büyük, hızlı akan ve çeşitli veri yığınıdır.',
    'Sadece çok fazla satırı olan Excel dosyasıdır.', 'MySQL ile her zaman sorunsuz işlenebilen veridir.',
    'Sadece yapısal (tablo) verilerden oluşur.', 'Büyük veri teknolojileri geleneksel veritabanlarını tamamen ortadan kaldırmıştır.'], 0,
   'Büyük veri sadece "çok veri" değildir; 5 özelliği (5V) vardır.',
   why={3: 'Variety: video, ses, GPS gibi yapısal olmayan veriler de büyük verinin parçası.'})
mc('5.000 öğrencili bir üniversitenin öğrenci verileri için hocanın önerdiği çözüm hangisidir?',
   ['İlişkisel bir veritabanı (MySQL)', 'Hadoop kümesi', 'Tek bir Excel dosyası', 'Düz metin dosyaları', 'Kağıt arşiv'], 0,
   'Hoca: 5.000 öğrenci için ilişkisel veritabanı (MySQL) **doğru tercihtir**. Büyük veri teknolojileri çok daha büyük ölçek için.')
mc('Geleneksel veritabanları ile büyük veri teknolojileri arasındaki ilişki hangisidir?',
   ['Farklı ölçeklerdeki problemlere çözüm sunan tamamlayıcı teknolojilerdir.', 'Birbirinin rakibidir; biri diğerini yok eder.',
    'Geleneksel veritabanları demode olmuştur.', 'Büyük veri sadece küçük veriler içindir.', 'İkisi aynı teknolojinin farklı adlarıdır.'], 0,
   'Geleneksel veritabanları kurumsal uygulamaların kalbidir; büyük veri teknolojileri onların yetersiz kaldığı aşırı büyük veri için alternatif sunar.')
mc('Aşağıdakilerden hangisi hocanın notunda büyük veri teknolojisi olarak geçer?',
   ['Hadoop ve Spark', 'phpMyAdmin ve HeidiSQL', 'INT ve VARCHAR', 'COMMIT ve ROLLBACK', 'Excel ve Word'], 0,
   '**Hadoop ve Spark** dönem sonunda kavramsal olarak işlenecek büyük veri teknolojileri.')
mc('Veri ve kullanıcı sayısı arttıkça sistemin büyüyebilme kapasitesine ne denir?',
   ['Ölçeklenebilirlik (scalability)', 'Veri bütünlüğü', 'Soyutlama', 'Normalizasyon', 'Kardinalite'], 0,
   '**Ölçeklenebilirlik**: veri ve kullanıcı arttıkça sistemin büyüme kapasitesi.')
fill('5V\'de verinin kalitesi ve güvenilirliği (gürültülü/sahte verinin ayıklanması) hangi İngilizce kelimeyle anılır?',
     '-- Bileklikte nabız 200 (cihaz hatası) → ____', ['Veracity'],
     '**Veracity** = doğruluk/güvenilirlik.', nocheck=True,
     whyFill={'Velocity': 'Velocity hızdır (kredi kartı örneği). Doğruluk/güvenilirlik Veracity.', 'Value': 'Value değerdir (Spotify örneği).'})

# ======================= 4. er =======================
topic('er')
mc('ER diyagramında **varlık (entity)** hangi şekille gösterilir?',
   ['Dikdörtgen', 'Elips', 'Elmas (baklava)', 'Daire', 'Ok'], 0,
   'Varlık dikdörtgen, öznitelik elips, ilişki elmas.', why={1: 'Elips özniteliktir.', 2: 'Elmas ilişkidir.'})
mc('ER diyagramında **öznitelik (attribute)** hangi şekille gösterilir?',
   ['Elips', 'Dikdörtgen', 'Elmas (baklava)', 'Paralelkenar', 'Üçgen'], 0,
   'Öznitelikler elips içinde yazılıp varlığa çizgiyle bağlanır.', why={1: 'Dikdörtgen varlıktır.'})
mc('ER diyagramında birincil anahtar (PK) nasıl gösterilir?',
   ['Öznitelik adının altı çizilir', 'Çift dikdörtgen çizilir', 'Elmasın içine yazılır', 'Kırmızıya boyanır', 'Ok ile işaretlenir'], 0,
   'Hocanın notu: **altı çizili alan** birincil anahtardır (ör. Öğrenci_No).')
mc('Veri modeli için hocanın benzetmesi hangisidir?',
   ['Binanın mimari projesi', 'Restoranın menüsü', 'Deponun güvenlik ekibi', 'Kütüphanedeki kitap', 'Arabanın motoru'], 0,
   'Veri modeli veritabanının **mimari projesidir**; projesiz bina dikmek gibi plansız tablo kurulmaz.',
   why={1: 'Menü benzetmesi SQL için (SQL = menü dili, MySQL = mutfak).', 2: 'Güvenlik ekibi DBMS benzetmesi.'})
mc('Gerçek dünyadan veritabanına giden dönüşüm zinciri hangisidir?',
   ['Gerçek Dünya → Kavramsal Model → ER Diyagramı → İlişkisel Model → Tablolar/SQL',
    'Gerçek Dünya → Tablolar/SQL → ER Diyagramı → Kavramsal Model',
    'ER Diyagramı → Gerçek Dünya → SQL → Kavramsal Model',
    'Kavramsal Model → Tablolar → Gerçek Dünya → ER Diyagramı',
    'SQL → İlişkisel Model → ER Diyagramı → Gerçek Dünya'], 0,
   'Önce kavramsal model, sonra ER diyagramı, sonra ilişkisel model, en son tablolar ve SQL.')
mc('Hangi teknolojiyi (MySQL, Oracle, MongoDB) kullanacağımızdan bağımsız olarak sistemin genel veri yapısını en yüksek seviyede gösteren model hangisidir?',
   ['Kavramsal veri modeli', 'Fiziksel model', 'Tablo şeması', 'SQL betiği', 'İndeks'], 0,
   '**Kavramsal model** teknolojiden bağımsız, en yüksek seviyeli taslaktır.')
mc('"Öğrenci" ile "Ali Yılmaz" arasındaki fark hangisidir?',
   ['Öğrenci varlık türü, Ali Yılmaz o türün varlık örneği', 'Öğrenci öznitelik, Ali Yılmaz varlık', 'Öğrenci ilişki, Ali Yılmaz anahtar',
    'İkisi de öznitelik', 'Ali Yılmaz varlık türü, Öğrenci varlık örneği'], 0,
   'Varlık türü soyut genel ad (Öğrenci), varlık örneği somut birey (Ali Yılmaz).')
mc('Aşağıdakilerden hangisi Öğrenci varlığının bir **özniteliği**dir?',
   ['eposta', 'Ders', 'Bölüm', 'Alır', 'Kitap'], 0,
   'Öznitelik varlığın özelliğidir ve tek başına varlık olamaz: öğrenci_no, ad, soyad, **eposta**.',
   why={1: 'Ders kendi başına bir varlıktır.', 2: 'Bölüm kendi başına bir varlıktır.', 3: '"Alır" Öğrenci–Ders ilişkisinin adıdır.'})
mc('Her kişinin bir pasaportu var ve her pasaport yalnızca bir kişiye ait. Kişi–Pasaport ilişkisi nedir?',
   ['1:1', '1:N', 'N:1', 'N:N', 'İlişki yoktur'], 0,
   'İki tarafta da "birden fazla olabilir mi?" sorusunun cevabı hayır → **bire bir (1:1)**.')
mc('Bir bölümde birçok öğrenci okuyabiliyor, her öğrenci resmi olarak tek bir bölüme bağlı. Bölüm–Öğrenci ilişkisi nedir?',
   ['1:N', '1:1', 'N:N', 'N:1 (bölüm tarafı çok)', 'Tanımlanamaz'], 0,
   'Bölüm (1) — Okur — Öğrenci (N): **bire çok**.')
mc('"Bir öğrenci birden fazla ders alabilir mi?" Evet. "Bir dersi birden fazla öğrenci alabilir mi?" Evet. İlişki türü nedir?',
   ['N:N', '1:N', '1:1', 'N:1', 'Belirlenemez'], 0,
   'İki yönde de "evet" → **çoka çok (N:N)**.', why={1: '1:N için yönlerden birinin cevabı "hayır" olmalı.'})
mc('Bölüm (1) — Okur — Öğrenci (N) diyagramında Öğrenci tarafındaki "N" neyi anlatır?',
   ['Bir bölümde birden fazla öğrenci okuyabilir', 'Bir öğrenci birden fazla bölümde okur', 'Öğrenci tablosunda N tane sütun vardır',
    'Bölüm sayısı bilinmiyor', 'Öğrenci kaydı zorunlu değildir'], 0,
   '"Bir bölümde birden fazla öğrenci okuyabilir mi?" sorusunun cevabı evet olduğu için Öğrenci tarafına **N** yazılır.')
fill('ER diyagramında **ilişki** hangi şekille çizilir? (tek kelime)',
     '-- Dikdörtgen = varlık, elips = öznitelik, ____ = ilişki', ['elmas', 'baklava', 'eşkenar dörtgen', 'eskenar dortgen', 'diamond'],
     'İlişki **elmas (baklava, eşkenar dörtgen)** ile çizilir.', nocheck=True,
     whyFill={'paralelkenar': 'Kitapçık tuzağı: paralelkenar değil, eşkenar dörtgen (elmas/baklava).', 'elips': 'Elips özniteliktir.'})
fill('Gerçek hayattaki karmaşık yapıları gereksiz detaylardan arındırarak bilişim sistemine uygun hâle getirme sürecine ne denir?',
     '-- Gereksiz detayları atıp özü modellemek = ____', ['soyutlama', 'abstraction'],
     '**Soyutlama (abstraction).**', nocheck=True)

# ======================= 5. festival =======================
topic('festival')
mc('Hocanın Festival sorusunda FESTİVAL ile SANATCI arasındaki ilişki türü nedir?',
   ['1:N (FESTİVAL 1, SANATCI N)', 'N:N', '1:1', 'N:1 (FESTİVAL N, SANATCI 1)', 'İlişki kurulmamıştır'], 0,
   'Hoca: FESTİVAL (1) — katılır — SANATCI (N). Bir festivale birden fazla sanatçı katılır.',
   why={1: 'Gerçek hayatta N:N olurdu ama hoca "aynı saat ve gün" varsayımıyla 1:N kurdu.'})
mc('Hoca Festival–Sanatçı ilişkisini neden 1:N kurmuştur?',
   ['Festivallerin aynı saat ve günde olduğunu farz ettiği için', 'Bir festivale sadece bir sanatçı katılabildiği için',
    'Sanatçı tablosunda PK olmadığı için', 'N:N ilişki ER diyagramında çizilemediği için', 'Festival tablosu sanatçıdan önce oluşturulduğu için'], 0,
   'Notta: "Aynı saat ve gündeki festival olduğunu farz ederek 1-N ilişki kuruyoruz." Bu varsayımla bir sanatçı tek festivale katılabilir.')
mc('SANATCI ile SAHNE arasındaki ilişkinin adı ve türü nedir?',
   ['çıkar, çoka çok (M:N)', 'katılır, 1:N', 'çıkar, 1:1', 'alır, N:N', 'okur, 1:N'], 0,
   '"Sanatçı sahneye çıkar." İki yönde de birden fazla mümkün → **çoka çok**.')
mc("Hocanın çiziminde Sanatçı–Sahne ilişkisi 'M' ve 'N' ile yazılmıştır. Bu ne anlama gelir?",
   ['N:N ile aynı: iki taraf da çok', 'M tarafı 1, N tarafı çok', 'Sadece sanatçı tarafı çok', 'İlişki zorunlu değil',
    "M ile N'nin sayıca eşit olması gerekir"], 0,
   'M:N = N:N. Farklı harf, iki tarafın çokluğunun birbirinden bağımsız olduğunu gösterir.')
mc('Festival (1) — katılır — Sanatçı (N) ilişkisi tablolara dönüştürülürken FK hangi tabloya eklenir?',
   ['SANATCI tablosuna FESTIVAL_ID', 'FESTİVAL tablosuna SANATCI_ID', 'Her iki tabloya', 'Yeni bir ara tabloya', 'SAHNE tablosuna'], 0,
   '1:N\'de FK **çok** tarafına konur: hocanın SANATCI tablosunda `FESTIVAL_ID (FK)` var.',
   why={1: 'Festival satırına birden çok sanatçı yazılamaz; FK çok tarafa gider.', 3: 'Ara tablo N:N için gerekir.'})
mc('Sanatçı–Sahne çoka çok ilişkisi için hoca hangi tabloyu kurmuştur?',
   ['ÇIKAR (ID, SANATCI_ID, SAHNE_ID)', 'KATILIR (ID, FESTIVAL_ID, SANATCI_ID)', 'SAHNE tablosuna SANATCI_ID eklenir',
    'SANATCI tablosuna SAHNE_ID eklenir', 'Ek tablo gerekmez'], 0,
   'N:N ilişki iki FK tutan **ara tablo** ile çözülür: ÇIKAR (ID, SANATCI_ID, SAHNE_ID).')
mc('Hocanın ÇIKAR tablosuna göre 1 numaralı sanatçı (AA AA) kaç farklı sahneye çıkmıştır?',
   ['2', '1', '3', '0', '6'], 0,
   'SANATCI_ID = 1 olan iki satır var: SAHNE_ID 1 (POP RÜZGARI) ve 3 (90\'LAR).',
   db='fest', show=['cikar'], sql='SELECT COUNT(*) FROM cikar WHERE sanatci_id = 1')
mc('ÇIKAR tablosuna göre POP RÜZGARI sahnesine (SAHNE_ID = 1) çıkan sanatçılar kimlerdir?',
   ['AA AA, BB BB', 'AA AA', 'BB BB, CC CC', 'AA AA, BB BB, CC CC', 'DD DD'], 0,
   'SAHNE_ID = 1 olan satırlar: SANATCI_ID 1 (AA AA) ve 2 (BB BB). Bir sahneye birden çok sanatçı çıkabiliyor: çoka çok.',
   db='fest', show=['sanatci', 'cikar'],
   sql='SELECT sanatci.adi FROM cikar JOIN sanatci ON sanatci.id = cikar.sanatci_id WHERE cikar.sahne_id = 1 ORDER BY sanatci.id')
mc("SANATCI tablosuna göre ABC FESTİVALİ'ne (ID = 1) kaç sanatçı katılmaktadır?",
   ['2', '1', '3', '4', '0'], 0,
   'FESTIVAL_ID = 1 olan sanatçılar: AA AA ve BB BB.',
   db='fest', show=['sanatci'], sql='SELECT COUNT(*) FROM sanatci WHERE festival_id = 1')
mc('Hocanın "aynı saat ve gün" varsayımı kaldırılırsa (bir sanatçı birçok festivale katılabilirse) Festival–Sanatçı ilişkisi ne olur?',
   ['N:N olur; FESTIVAL_ID yerine ara tablo kurulur', '1:1 olur; FK gerekmez', '1:N kalır; hiçbir şey değişmez',
    'N:1 olur; FK FESTİVAL tablosuna geçer', 'İlişki silinir'], 0,
   'İki yönde de "evet" olunca ilişki **N:N** olur ve Sanatçı–Sahne\'deki gibi ara tabloyla çözülür.')
mc('Festival sorusunda SANAT TÜRÜ özniteliği hangi varlığa aittir?',
   ['SANATCI', 'FESTİVAL', 'SAHNE', 'ÇIKAR', 'katılır ilişkisine'], 0,
   'SANATCI: ID, ADI, SANAT TÜRÜ. Hocanın çiziminde SANAT TÜRÜ çift elipsle çizilmiş.')
mc('Aşağıdakilerden hangisi hocanın FESTİVAL varlığına verdiği özniteliklerden biri **değildir**?',
   ['SANAT TÜRÜ', 'ADI', 'TARİHİ', 'ADRES_İL', 'ID'], 0,
   'FESTİVAL: ID, ADI, TARİHİ, ADRES_İL. SANAT TÜRÜ sanatçının özniteliği.')
fill('SANATCI tablosunu FESTİVAL tablosuna bağlayan yabancı anahtar sütununun adını yazın.',
     '''
     CREATE TABLE sanatci2 (
       id INT PRIMARY KEY,
       adi VARCHAR(100) NOT NULL,
       ____ INT,
       FOREIGN KEY (festival_id) REFERENCES festival(id)
     );''', ['festival_id'],
     'Hocanın tablosunda **FESTIVAL_ID (FK)**. FOREIGN KEY satırı da bu sütunu kullanıyor.', db='fest', wrong=['sahne_id', 'id'],
     whyFill={'sahne_id': 'Sahne bağlantısı ÇIKAR ara tablosunda; sanatçı tablosunda festival_id var.'})
fill('Sanatçı–Sahne çoka çok ilişkisini çözen ara tablonun hocanın verdiği adı nedir?',
     '-- SANATCI (M) — çıkar — SAHNE (N)  →  ara tablo: ____ (ID, SANATCI_ID, SAHNE_ID)', ['ÇIKAR', 'çıkar', 'cikar', 'çikar'],
     'Ara tablonun adı ilişkinin adından gelir: **ÇIKAR**.', nocheck=True)
code('Festival tabloları', 'Hocanın ÇIKAR ara tablosunu SQL ile kurun: kendi kimliği, sanatçıya ve sahneye bağlanan iki yabancı anahtar.',
     '''
     CREATE TABLE cikar2 (
       id INT {{1}},
       sanatci_id INT,
       {{2}} INT,
       {{3}} (sanatci_id) REFERENCES sanatci(id),
       FOREIGN KEY (sahne_id) {{4}} sahne(id)
     );''',
     [['PRIMARY KEY'], ['sahne_id'], ['FOREIGN KEY'], ['REFERENCES']],
     ['Satırın benzersiz kimliği: `PRIMARY KEY`.', 'Sahneye bağlanacak sütun: `sahne_id` (alttaki FOREIGN KEY satırı onu kullanıyor).',
      'Yabancı anahtar tanımı `FOREIGN KEY (sütun)` ile başlar.', 'Bağlanılan tablo ve sütun `REFERENCES tablo(sütun)` ile yazılır.'],
     db='fest', expect='3 / 1 / 2',
     then=("INSERT INTO cikar2 SELECT * FROM cikar; SELECT COUNT(*), "
           "(SELECT pk FROM pragma_table_info('cikar2') WHERE name = 'id'), "
           "(SELECT COUNT(*) FROM pragma_foreign_key_list('cikar2')) FROM cikar2;"),
     note='Hocanın 3 satırı (1,1,1), (2,1,3), (3,2,1) bu tabloya hatasız eklenir.')

# ======================= 6. anahtar =======================
topic('anahtar')
mc('PRIMARY KEY için hangisi doğrudur?',
   ['Her kaydı benzersiz tanımlar ve NULL olamaz', 'Tekrar eden değerlere izin verir', 'Başka tablonun anahtarına referans verir',
    'Her zaman tablonun ilk sütunu olmak zorundadır', 'Her zaman sayısal olmak zorundadır'], 0,
   'PK benzersiz ve boş geçilemez bir kimliktir.',
   why={2: 'Bu FOREIGN KEY.', 3: 'Hoca: ilk sütun olmak zorunda değil; ID\'yi başa yazmak sadece yaygın pratik.',
        4: 'TC no ya da e-posta da PK olabilir; INT hız ve pratiklik için tercih edilir.'})
mc('Tablolar arasında köprü kurup referans bütünlüğünü koruyan kısıt hangisidir?',
   ['FOREIGN KEY', 'PRIMARY KEY', 'UNIQUE', 'DEFAULT', 'CHECK'], 0,
   '**FOREIGN KEY** başka tablodaki anahtara bağlanır; olmayan bir kayda işaret edilmesini engeller.')
mc('`bolum` tablosunda yalnızca 1 ve 2 numaralı bölümler var. Aşağıdakilerden hangisi eklenirken **referans bütünlüğü yüzünden reddedilir**?',
   ["(4, 'Can', 'Ak', 9)", "(4, 'Can', 'Ak', 1)", "(4, 'Can', 'Ak', 2)", "(4, 'Can', 'Ak', NULL)", "(5, 'Ece', 'Su', 1)"], 0,
   'bolum_id = 9 diye bir bölüm yok; FOREIGN KEY olmayan bir kayda işaret etmeye izin vermez.',
   why={3: 'FK sütunu NULL olabilir (bölümü henüz belli değil); NULL bir kayda işaret etmez.'},
   code='INSERT INTO ogrenci (ogrenci_id, ad, soyad, bolum_id) VALUES ____;', db='uni', show=['bolum'], blank='fail', errmsg='FOREIGN KEY')
mc('NOT NULL kısıtı ne sağlar?',
   ['Sütunun boş bırakılmasını engeller', 'Değerlerin tekrar etmesini engeller', 'Varsayılan değer atar', 'Tabloyu başka tabloya bağlar',
    'Değerin belli bir koşula uymasını ister'], 0,
   'NOT NULL ilgili sütuna veri girmeyi **zorunlu** kılar.', why={1: 'Bu UNIQUE.', 2: 'Bu DEFAULT.', 4: 'Bu CHECK.'})
mc('Bir sistemde aynı e-posta adresiyle birden fazla hesap açılmasını engellemek için hangi kısıt kullanılır?',
   ['UNIQUE', 'NOT NULL', 'DEFAULT', 'FOREIGN KEY', 'CHECK'], 0,
   'Hocanın örneği: `eposta VARCHAR(150) UNIQUE`.')
mc('`aktif BOOLEAN DEFAULT TRUE` tanımlı bir tabloya `aktif` değeri verilmeden kayıt eklenirse ne olur?',
   ['aktif sütununa TRUE yazılır', 'aktif sütunu NULL kalır', 'Komut hata verir', 'aktif sütunu FALSE olur', 'Kayıt eklenir ama tablo boşalır'], 0,
   'Değer girilmeyen sütuna **DEFAULT** değeri yazılır.',
   code='''
   CREATE TABLE uye (
     uye_id INT PRIMARY KEY,
     aktif BOOLEAN DEFAULT TRUE
   );
   INSERT INTO uye (uye_id) VALUES (1);''',
   sql='''CREATE TABLE uye (uye_id INT PRIMARY KEY, aktif BOOLEAN DEFAULT TRUE);
INSERT INTO uye (uye_id) VALUES (1); SELECT aktif FROM uye;''',
   fmt=lambda r: {1: 'aktif sütununa TRUE yazılır', 0: 'aktif sütunu FALSE olur', None: 'aktif sütunu NULL kalır'}[r[0][0]])
mc('Aşağıdaki kod çalıştırılırsa ne olur?',
   ['INSERT reddedilir; CHECK negatif yaşa izin vermez', 'Kayıt eklenir, yas = -5 olur', 'Kayıt eklenir, yas = 0 olur',
    'Kayıt eklenir, yas = NULL olur', 'Tablo silinir'], 0,
   '`CHECK (yas >= 0)` koşulu sağlanmayan değeri reddeder.',
   code='''
   CREATE TABLE uye (
     uye_id INT PRIMARY KEY,
     yas INT CHECK (yas >= 0)
   );
   INSERT INTO uye VALUES (1, -5);''', err=True, errmsg='CHECK')
mc('Birden çok sütundan oluşan anahtara ne denir?',
   ['Bileşik anahtar', 'Aday anahtar', 'Yabancı anahtar', 'Tekil anahtar', 'Varsayılan anahtar'], 0,
   'Ör. `PRIMARY KEY (ogrenci_id, ders_id)` **bileşik** birincil anahtardır.')
mc('Satırı tek başına tanımlayabilen ve PK olmaya aday minimal sütun kümesine ne denir?',
   ['Aday anahtar', 'Bileşik anahtar', 'Yabancı anahtar', 'Görünüm', 'İndeks'], 0,
   '**Aday anahtar**: PK seçilebilecek adaylar (ör. ogrenci_no, tc_kimlik_no).')
mc('1:N ilişki tablolara dönüştürülürken ne yapılır?',
   ['Çok (N) taraftaki tabloya, 1 tarafın anahtarı FK olarak eklenir', '1 taraftaki tabloya N tarafın anahtarı eklenir',
    'Mutlaka ara tablo kurulur', 'İki tablo tek tabloda birleştirilir', 'Hiçbir tabloya anahtar eklenmez'], 0,
   'Ör. Bölüm (1) — Öğrenci (N): `ogrenci` tablosuna `bolum_id` FK eklenir.', why={2: 'Ara tablo N:N için.'})
mc('`kayit` tablosunda `PRIMARY KEY (ogrenci_id, ders_id)` var. Hangi INSERT **hata verir**?',
   ['(1, 10)', '(2, 20)', '(3, 10)', '(3, 20)', '(2, 20), (3, 20)'], 0,
   '(1, 10) çifti zaten var; bileşik PK aynı öğrencinin aynı derse ikinci kez kaydını engeller.',
   why={1: 'Öğrenci 2 ders 20\'ye kayıtlı değil; çift yeni olduğu için eklenir.'},
   code='INSERT INTO kayit (ogrenci_id, ders_id) VALUES ____;', db='uni', show=['kayit'], blank='fail', errmsg='UNIQUE')
mc('**1NF**\'nin şartı hangisidir?',
   ['Hücreler atomik (tek değerli) olmalıdır', 'Anahtar olmayan alanlar arasında geçişli bağımlılık olmamalıdır',
    'Her tabloda en az iki FK olmalıdır', 'Tablolar alfabetik sıralı olmalıdır', 'Tüm sütunlar UNIQUE olmalıdır'], 0,
   '1NF: her hücrede tek değer. (Düşük öncelik: tanımı bilmek yeter.)', why={1: 'Bu 3NF\'nin şartı.'})
fill('Aynı öğrencinin aynı derse iki kez kaydedilmesini engelleyen **iki sütunlu birincil anahtarı** tamamlayın.',
     '''
     CREATE TABLE kayit2 (
       ogrenci_id INT,
       ders_id INT,
       ____ (ogrenci_id, ders_id)
     );''', ['PRIMARY KEY'],
     'Bileşik birincil anahtar: `PRIMARY KEY (ogrenci_id, ders_id)`.',
     then="SELECT COUNT(*) FROM pragma_table_info('kayit2') WHERE pk > 0;", expect='2', wrong=['UNIQUE'],
     whyFill={'UNIQUE': 'UNIQUE da tekrarı engeller ama soru birincil anahtarı istiyor: PRIMARY KEY (ogrenci_id, ders_id).',
              'FOREIGN KEY': 'FOREIGN KEY başka tabloya bağlar; tekrarı engellemez.'})
fill('`ogrenci` tablosundaki `bolum_id` sütununu `bolum` tablosuna bağlayan satırı tamamlayın.',
     '''
     CREATE TABLE ogrenci2 (
       ogrenci_id INT PRIMARY KEY,
       bolum_id INT,
       FOREIGN KEY (bolum_id) ____ bolum(bolum_id)
     );''', ['REFERENCES'],
     '`FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)`. Artık olmayan bir bölümle öğrenci eklenemez.',
     db='uni', then="SELECT \"table\" || '.' || \"to\" FROM pragma_foreign_key_list('ogrenci2');", expect='bolum.bolum_id',
     whyFill={'REFERENCE': 'Sonunda S var: REFERENCES.'})
code('Kayıt ara tablosu', 'Öğrenci–Ders N:N ilişkisini çözen `kayit` tablosunu tamamlayın (hocanın üniversite uygulaması).',
     '''
     CREATE TABLE kayit3 (
         ogrenci_id INT,
         ders_id INT,
         {{1}} (ogrenci_id, ders_id),
         FOREIGN KEY (ogrenci_id) {{2}} ogrenci(ogrenci_id),
         {{3}} (ders_id) REFERENCES {{4}}(ders_id)
     );''',
     [['PRIMARY KEY'], ['REFERENCES'], ['FOREIGN KEY'], ['ders']],
     ['Bileşik birincil anahtar: aynı öğrenci aynı derse iki kez kaydolamaz.', 'Bağlanılan tablo `REFERENCES` ile yazılır.',
      'İkinci yabancı anahtar da `FOREIGN KEY (sütun)` ile başlar.', '`ders_id` sütunu `ders` tablosunun anahtarıdır.'],
     db='uni', expect='3 / 2 / 2',
     then=("INSERT INTO kayit3 SELECT * FROM kayit; SELECT COUNT(*), "
           "(SELECT COUNT(*) FROM pragma_table_info('kayit3') WHERE pk > 0), "
           "(SELECT COUNT(*) FROM pragma_foreign_key_list('kayit3')) FROM kayit3;"),
     note='Ara tablo iki FK tutar; N:N ilişki böyle tabloya dönüşür.')

# ======================= 7. ddl =======================
topic('ddl')
mc('SQL\'in açılımı nedir?',
   ['Structured Query Language', 'Simple Question Language', 'Standard Quick Logic', 'Sequential Query List', 'System Quality Language'], 0,
   'SQL = **Structured Query Language** (Yapılandırılmış Sorgu Dili).')
mc('Hocanın benzetmesinde SQL restoranın menü dili ise MySQL nedir?',
   ['Siparişi hazırlayan mutfak ve aşçı ekibi', 'Menünün kendisi', 'Garson', 'Müşteri', 'Kasa'], 0,
   'Menü dilini (SQL) bilirsen arkadaki mutfak (MySQL, PostgreSQL…) hangisi olursa olsun derdini anlatırsın.')
mc('DDL komutları neyle ilgilenir?',
   ['Tablonun iskeletiyle (ad, sütun, veri tipi, ilişki)', 'Tablodaki satırların eklenmesiyle', 'Kullanıcı yetkileriyle',
    'İşlemlerin onaylanmasıyla', 'Verilerin sorgulanmasıyla'], 0,
   'DDL yapıyı tanımlar; veri eklemek DML\'in (INSERT) işi.', why={1: 'Bu DML (INSERT).', 2: 'Bu DCL.', 3: 'Bu TCL.'})
mc('Sunucuda birden fazla veritabanı varken hangisinde çalışılacağını bildiren komut hangisidir?',
   ['USE', 'SELECT', 'OPEN', 'GO', 'SET'], 0,
   '`USE universite;` sonraki komutların hangi veritabanında çalışacağını söyler.',
   code='''
   CREATE DATABASE universite;
   ____ universite;''')
mc('Hocanın adlandırma kurallarına göre hangi veritabanı adı **uygundur**?',
   ['kutuphane_sistemi', 'Kütüphane Sistemi', 'kütüphane-sistemi', 'kutuphane sistemi', 'Kütüphane_Sistemi'], 0,
   'Anlamlı, boşluksuz, Türkçe karaktersiz, küçük harf, kelimeler `_` ile ayrılmış.',
   why={1: 'Boşluk ve Türkçe karakter var.', 3: 'İsimde boşluk olmaz.', 4: 'Türkçe karakter (ü) var.'})
mc('`VARCHAR(100)` tanımı için hangisi doğrudur?',
   ['Sütuna en fazla 100 karakterlik metin yazılabilir', 'Sütuna tam 100 karakter yazmak zorunludur', 'Sütun 100 basamaklı sayı tutar',
    'Sütun en az 100 karakter ister', 'Sütun 100 satır metin tutar'], 0,
   'VARCHAR(100) bir **sınır korumasıdır**; 100 karakteri doldurma zorunluluğu yoktur.')
mc('`DECIMAL(10,2)` ne anlama gelir?',
   ["Toplam 10 basamak, bunların 2'si virgülden sonra", '10 basamak tam kısım + 2 basamak ondalık', 'En fazla 10, en az 2 basamak',
    '10 karakterlik metin, 2 satır', 'Virgülden sonra 10 basamak'], 0,
   'Hoca: toplam 10 basamak, 2\'si ondalık. En büyük örnek: 12345678.90.', why={1: 'Toplam 10 basamak; tam kısım 8 basamak kalır.'})
mc('Doğum tarihini saklamak için en uygun veri tipi hangisidir?',
   ['DATE', 'VARCHAR(10)', 'INT', 'BOOLEAN', 'DECIMAL(10,2)'], 0,
   'Tarih `DATE` ile `YYYY-AA-GG` biçiminde tutulur.', why={1: 'Tarihi metin tutmak ileride tarih aralığı sorgularını bozar.'})
mc('`aktif_mi`, `mezun_mu` gibi doğru/yanlış değerleri için hangi veri tipi kullanılır?',
   ['BOOLEAN', 'DATE', 'VARCHAR(100)', 'DECIMAL(10,2)', 'INT AUTO_INCREMENT'], 0,
   '**BOOLEAN** (MySQL\'de arka planda TINYINT(1)).')
mc('Hocanın üniversite uygulamasında tablolar hangi sırayla oluşturulmalıdır?',
   ['bolum → ogrenci → ders → ogretim_elemani → kayit', 'kayit → ogrenci → bolum → ders → ogretim_elemani',
    'ogrenci → bolum → kayit → ders → ogretim_elemani', 'ders → kayit → ogrenci → bolum → ogretim_elemani', 'Sıra önemli değildir'], 0,
   'FK yüzünden önce bağımsız tablolar: bolum, sonra ona bağlı ogrenci, ders, ogretim_elemani, en son ikisine bağlı kayit.',
   why={4: 'Önemli: FK\'nin bağlandığı tablo önce var olmalı.'})
mc('Tablonun yapısını koruyup içindeki bütün kayıtları silen komut hangisidir?',
   ['TRUNCATE TABLE', 'DROP TABLE', 'ALTER TABLE', 'CREATE TABLE', 'DROP DATABASE'], 0,
   'TRUNCATE: yapı **korunur**, veriler temizlenir.', why={1: 'DROP TABLE yapıyı da siler.'})
mc('Var olan `ogrenci` tablosuna yeni bir `eposta` sütunu eklemek için boşluğa ne gelmelidir?',
   ['ALTER', 'UPDATE', 'INSERT', 'CREATE', 'MODIFY'], 0,
   '`ALTER TABLE` var olan tablonun yapısını değiştirir.',
   why={1: 'UPDATE satırlardaki değeri değiştirir, yapıyı değil.', 2: 'INSERT satır ekler, sütun değil.'},
   code='____ TABLE ogrenci ADD eposta VARCHAR(150);', db='uni', blank=True)
fill('Tablonun kendisini ve içindeki tüm verileri kalıcı olarak silen komutu tamamlayın.',
     '____ TABLE kayit;', ['DROP'],
     '`DROP TABLE` yapıyı ve veriyi siler; geri dönüşü yoktur.', db='uni',
     then="SELECT name FROM sqlite_master WHERE name = 'kayit';", expect='(boş)', wrong=['TRUNCATE', 'DELETE'],
     whyFill={'TRUNCATE': 'TRUNCATE tabloyu korur, sadece satırları boşaltır.', 'DELETE': 'DELETE FROM satır siler, tablo kalır.'})
fill('Yeni bir veritabanı oluşturan komutu tamamlayın.',
     'CREATE ____ universite;', ['DATABASE'],
     '`CREATE DATABASE universite;` Ardından `USE universite;`.', nocheck=True,
     whyFill={'TABLE': 'CREATE TABLE tablo oluşturur; veritabanı için CREATE DATABASE.'})

# ======================= 8. insert =======================
topic('insert')
G = FIX['gorev'].strip()
mc('INSERT INTO komutu ne yapar?',
   ['Tabloya bir veya daha fazla satır ekler', 'Tablo oluşturur', 'Satırları siler', 'Tabloya sütun ekler', 'Kayıtları listeler'], 0,
   'INSERT INTO yeni **satır** ekler; tek komutla birden çok satır da eklenebilir.', why={3: 'Sütun eklemek ALTER TABLE\'ın işi.'})
mc('INSERT INTO\'da sütun listesi ile VALUES listesi için hangisi doğrudur?',
   ['Sayıları aynı olmalı ve konumları birbirine karşılık gelmeli', 'Değer sayısı sütun sayısından fazla olabilir',
    'Sıra önemli değildir, MySQL kendisi eşler', 'Değerler virgül olmadan yazılır', 'Metin değerler tırnaksız yazılır'], 0,
   'Hocanın notu: sütunların ve değerlerin **sayısı aynı**, **konumları** birbirine karşılık gelmeli.')
mc('Hocanın `gorevler` tablosuna aşağıdaki INSERT yapıldı. Yeni satırda `bitistarihi` sütununda ne yazar?',
   ['NULL', '3', '0', 'Günün tarihi', '1'], 0,
   '`bitistarihi` için değer verilmedi ve DEFAULT tanımı yok → **NULL**.', why={1: '3, `oncelik` sütununun DEFAULT değeri.'},
   code=G + "\nINSERT INTO gorevler(baslik, oncelik)\n   VALUES('MySQL INSERT İfadesini Öğren', 1);",
   db='gorev', sql="INSERT INTO gorevler(baslik, oncelik) VALUES('MySQL INSERT İfadesini Öğren', 1); SELECT bitistarihi FROM gorevler;")
mc('Aynı `gorevler` tablosuna `INSERT INTO gorevler (baslik) VALUES (\'Rapor yaz\');` yapılırsa `oncelik` ne olur?',
   ['3', 'NULL', '0', '1', 'Komut hata verir'], 0,
   '`oncelik TINYINT NOT NULL DEFAULT 3`: değer verilmeyince DEFAULT 3 yazılır.',
   why={1: 'DEFAULT tanımı olan sütun NULL olmaz; NULL sadece DEFAULT\'u olmayan sütunlarda.', 4: 'NOT NULL ama DEFAULT 3 olduğu için hata yok.'},
   db='gorev', sql="INSERT INTO gorevler (baslik) VALUES ('Rapor yaz'); SELECT oncelik FROM gorevler;")
mc('Boş `gorevler` tablosuna (gorev_id `INT AUTO_INCREMENT`) iki satır eklendi. İkinci satırın `gorev_id` değeri nedir?',
   ['2', '1', '0', 'NULL', '3'], 0,
   'AUTO_INCREMENT her yeni satıra sıradaki tam sayıyı verir: 1, 2, …',
   code="INSERT INTO gorevler (baslik) VALUES ('A');\nINSERT INTO gorevler (baslik) VALUES ('B');",
   db='gorev', sql="INSERT INTO gorevler (baslik) VALUES ('A'); INSERT INTO gorevler (baslik) VALUES ('B'); SELECT gorev_id FROM gorevler WHERE baslik = 'B';")
mc('Bir sütuna varsayılan (DEFAULT) değerin girilmesi için hocanın gösterdiği iki yol hangisidir?',
   ['Sütunu INSERT listesine hiç yazmamak ya da değer yerine DEFAULT yazmak', 'Değere NULL yazmak ya da 0 yazmak',
    'Sütunu silmek ya da yeniden oluşturmak', 'UPDATE kullanmak ya da DELETE kullanmak', 'Boş metin yazmak ya da sütunu UNIQUE yapmak'], 0,
   '(1) sütunu listeye yazmamak, (2) `VALUES (…, DEFAULT)`.',
   why={1: 'NULL yazarsan sütuna NULL girmeye çalışılır (NOT NULL ise hata); DEFAULT değeri gelmez.'})
mc('MySQL\'de tarih sütununa değer hangi biçimde girilir?',
   ["'YYYY-MM-DD' (ör. '2021-11-15')", "'DD.MM.YYYY' (ör. '15.11.2021')", "'MM/DD/YYYY'", 'Tırnaksız 20211115', "'YYYY/DD/MM'"], 0,
   'YYYY dört basamaklı yıl, MM iki basamaklı ay, DD iki basamaklı gün.')
mc('`gorevler` tablosuna günün tarihini eklemek için boşluğa hangi fonksiyon gelir?',
   ['CURRENT_DATE()', 'TODAY_DATE()', 'NOW_DATE()', 'DATE_NOW()', 'GETTODAY()'], 0,
   '`CURRENT_DATE()` günün tarihini döndürür.',
   code="INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)\n  VALUES ('Günün tarihi', ____, CURRENT_DATE());", db='gorev', blank=True)
mc('Çok satırlı bir INSERT sonrasında MySQL "3 row(s) affected" diyorsa bu ne anlama gelir?',
   ['Üç satır kopyasız ve uyarısız eklendi', 'Üç satır silindi', 'Tabloda üç sütun var', 'Üç hata oluştu', 'Üç tablo etkilendi'], 0,
   'Hocanın notu: üç satır hiçbir kopya veya uyarı olmadan başarıyla eklendi.')
mc('Çok satırlı INSERT\'te iki satırın arasına ne konur?',
   [',', ';', 'AND', '+', '|'], 0,
   'Her satır ayrı parantezde, satırlar **virgülle** ayrılır.', why={1: 'Noktalı virgül komutu bitirir; ikinci satır yarım kalır.'},
   code="INSERT INTO gorevler (baslik, oncelik)\n  VALUES ('Görev A', 1)____ ('Görev B', 2);", db='gorev', blank=True,
   expect=None)
mc("`UPDATE Ogrenci SET sehir = 'İzmir';` (WHERE yok) çalıştırılırsa kaç öğrencinin şehri İzmir olur?",
   ['5', '1', '2', '0', 'Komut hata verir'], 0,
   'WHERE olmayınca **bütün satırlar** güncellenir.', why={2: 'Zaten İzmir olan 2 kişi vardı; WHERE olmadığı için herkes İzmir oldu.'},
   db='ogr', show=['Ogrenci'], sql="UPDATE Ogrenci SET sehir = 'İzmir'; SELECT COUNT(*) FROM Ogrenci WHERE sehir = 'İzmir';")
fill('Tek komutla iki satır ekleyin: boşluğa gelen anahtar kelime nedir?',
     '''
     INSERT INTO gorevler (baslik, oncelik)
     ____
       ('Önceliği 1 olan görev', 1),
       ('Önceliği 2 olan görev', 2);''', ['VALUES', 'VALUE'],
     'Değerler `VALUES`\'tan sonra gelir; her satır ayrı parantezde, aralarında virgül.', db='gorev',
     then='SELECT COUNT(*) FROM gorevler;', expect='2', wrong=['SET', 'INTO'])
fill('`oncelik` sütununa varsayılan değeri (3) yazdırmak için değer yerine ne yazılır?',
     '''
     INSERT INTO gorevler (baslik, oncelik)
       VALUES ('MySQL varsayılan değerin giriş 2', ____);''', ['DEFAULT'],
     '`DEFAULT` yazınca sütunun varsayılan değeri (3) girilir.', db='gorev',
     then='SELECT oncelik FROM gorevler;', expect='3', wrong=['NULL'],
     whyFill={'NULL': 'NULL yazarsan NOT NULL olan sütun hata verir; varsayılan için DEFAULT.', '3': 'Sonuç aynı olur ama soru varsayılanı yazdıran anahtar kelimeyi istiyor: DEFAULT.'})
code('Çoklu INSERT', 'Hocanın `gorevler` tablosuna üç görevi tek komutla ekleyin, sonra eklenen satır sayısını sayın.',
     '''
     INSERT {{1}} gorevler (baslik, oncelik)
       {{2}}
         ('Önceliği 1 olan görev', 1){{3}}
         ('Önceliği 2 olan görev', 2),
         ('Önceliği 3 olan görev', 3);
     SELECT {{4}}(*) AS eklenen FROM gorevler;''',
     [['INTO'], ['VALUES', 'VALUE'], [','], ['COUNT']],
     ['`INSERT INTO tablo`.', 'Değer listesi `VALUES` ile başlar.', 'Satırlar **virgülle** ayrılır.', 'Satır sayısını `COUNT(*)` verir.'],
     db='gorev', expect='3', note='MySQL bu INSERT için "3 row(s) affected" der; COUNT(*) da 3 döndürür.')

# ======================= 9. sorgu =======================
topic('sorgu')
mc('Aşağıdaki sorgu kaç satır döndürür?',
   ['3', '2', '1', '4', '5'], 0,
   'BETWEEN sınırları **dahil** eder: 20, 22 ve 19 → 3 satır. NULL yaş hiçbir aralığa girmez.',
   why={1: 'Sınırlar dahil: 19 ve 22 de gelir.'},
   code='SELECT ad FROM Ogrenci WHERE yas BETWEEN 19 AND 22;', db='ogr', show=['Ogrenci'],
   sql='SELECT COUNT(*) FROM Ogrenci WHERE yas BETWEEN 19 AND 22')
mc("`SELECT ad FROM Ogrenci WHERE ad LIKE 'A%';` sorgusunun sonucu hangisidir?",
   ['Ayşe, Ali, Ay', 'Ay', 'Ali, Ay', 'Ayşe, Ali, Ay, Can', 'Ali'], 0,
   '`%` sıfır ya da çok karakter: A ile başlayan **bütün** adlar gelir.', why={1: 'Sadece Ay\'ı `A_` deseni getirir.'},
   db='ogr', show=['Ogrenci'], sql="SELECT ad FROM Ogrenci WHERE ad LIKE 'A%'")
mc('`SELECT COUNT(*), COUNT(yas) FROM Ogrenci;` sorgusunun sonucu nedir?',
   ['5 / 4', '4 / 4', '5 / 5', '4 / 5', '5 / 0'], 0,
   'COUNT(*) bütün satırları sayar (5). COUNT(yas) NULL olmayan yaşları sayar (4).',
   db='ogr', show=['Ogrenci'], sql='SELECT COUNT(*), COUNT(yas) FROM Ogrenci')
mc('`SELECT AVG(yas) FROM Ogrenci;` sorgusunun sonucu nedir?',
   ['19.5', '15.6', '78', '19', 'NULL'], 0,
   'AVG NULL\'ı dışarıda bırakır: (20 + 17 + 22 + 19) / 4 = 78 / 4 = **19.5**.',
   why={1: '78 / 5 = 15.6 yanlış: NULL olan yaş ortalamaya katılmaz.', 2: '78 SUM(yas) sonucu.'},
   db='ogr', show=['Ogrenci'], sql='SELECT AVG(yas) FROM Ogrenci')
mc('`SELECT ad FROM Ogrenci WHERE yas = NULL;` kaç satır döndürür?',
   ['0', '1', '4', '5', 'Komut hata verir'], 0,
   'NULL ile `=` karşılaştırması doğru sonuç vermez; sorgu boş döner. Doğrusu `yas IS NULL`.',
   why={1: 'Can\'ın yaşı NULL ama `= NULL` onu da bulmaz; IS NULL gerekir.'},
   db='ogr', show=['Ogrenci'], sql='SELECT COUNT(*) FROM Ogrenci WHERE yas = NULL')
mc('Yaşı **bilinmeyen** öğrenciyi (Can) getirmek için boşluğa ne yazılmalıdır?',
   ['yas IS NULL', 'yas = NULL', "yas = ''", 'yas = 0', 'yas LIKE NULL'], 0,
   'NULL kontrolü **IS NULL** ile yapılır. NULL ne 0\'dır ne boş metindir.',
   code='SELECT ad FROM Ogrenci WHERE ____;', db='ogr', blank=True, expect='Can')
mc('`SELECT DISTINCT sehir FROM Ogrenci;` kaç satır döndürür?',
   ['3', '5', '2', '4', '1'], 0,
   'DISTINCT tekrarları teke indirir: Ankara, İzmir, Bursa → 3.',
   db='ogr', show=['Ogrenci'], sql='SELECT COUNT(DISTINCT sehir) FROM Ogrenci')
mc('Aşağıdaki sorgunun sonucu hangisidir?',
   ['Ankara / 2, İzmir / 2', 'Ankara / 2, Bursa / 1, İzmir / 2', 'Bursa / 1', 'Ankara / 2', 'İzmir / 2'], 0,
   'Gruplar: Ankara 2, Bursa 1, İzmir 2. HAVING sadece 2 ve üzeri grupları tutar.',
   why={1: 'HAVING COUNT(*) >= 2 olduğu için Bursa (1) elenir.'},
   code='''
   SELECT sehir, COUNT(*)
   FROM Ogrenci
   GROUP BY sehir
   HAVING COUNT(*) >= 2
   ORDER BY sehir;''', db='ogr', show=['Ogrenci'],
   sql='SELECT sehir, COUNT(*) FROM Ogrenci GROUP BY sehir HAVING COUNT(*) >= 2 ORDER BY sehir')
mc('`SELECT ad FROM Ogrenci ORDER BY yas DESC LIMIT 1;` hangi adı verir?',
   ['Ay', 'Ali', 'Can', 'Ayşe', 'Ece'], 0,
   'DESC büyükten küçüğe sıralar; en büyük yaş 22 (Ay). LIMIT 1 ilk satırı alır.',
   why={1: 'Ali en küçük yaş (17); bu ASC olsaydı gelirdi.', 2: 'NULL azalan sıralamada en sona düşer.'},
   db='ogr', show=['Ogrenci'], sql='SELECT ad FROM Ogrenci ORDER BY yas DESC LIMIT 1')
mc("`SELECT SUM(stok) FROM Urun WHERE kategori = 'Kırtasiye';` sorgusunun sonucu nedir?",
   ['140', 'NULL', '145', '3', '65'], 0,
   'SUM NULL\'ı atlar: 100 + 40 = **140** (Silgi\'nin stoğu NULL).',
   why={1: 'Bir değer NULL diye toplam NULL olmaz; SUM NULL\'ları atlar.', 3: '3 satır sayısı (COUNT).'},
   db='urun', show=['Urun'], sql="SELECT SUM(stok) FROM Urun WHERE kategori = 'Kırtasiye'")
mc('Aşağıdaki sorgunun sonucu hangisidir?',
   ['Market / 80', 'Kırtasiye / 25', 'Market / 80, Kırtasiye / 25', 'Kahve / 80', '(boş)'], 0,
   'Kategori en yüksek fiyatları: Kırtasiye 25, Market 80. HAVING > 50 sadece Market\'i bırakır.',
   why={3: 'SELECT ürün adını değil kategoriyi gösteriyor.'},
   code='''
   SELECT kategori, MAX(fiyat)
   FROM Urun
   GROUP BY kategori
   HAVING MAX(fiyat) > 50;''', db='urun', show=['Urun'],
   sql='SELECT kategori, MAX(fiyat) FROM Urun GROUP BY kategori HAVING MAX(fiyat) > 50')
mc('WHERE ile HAVING arasındaki fark hangisidir?',
   ['WHERE gruplamadan önce satırları, HAVING gruplanmış sonuçları filtreler', 'WHERE grupları, HAVING satırları filtreler',
    'İkisi de aynıdır', 'HAVING sadece ORDER BY ile kullanılır', 'WHERE sadece sayılarla çalışır'], 0,
   'İşlenme sırası: FROM → WHERE → GROUP BY → **HAVING** → SELECT → ORDER BY.')
mc('Aşağıdaki INNER JOIN kaç satır döndürür?',
   ['4', '3', '12', '7', '2'], 0,
   'Her sanatçının bir festivali var; eşleşen 4 satır gelir.', why={2: '12 = 4 × 3, CROSS JOIN (kartezyen çarpım) sonucu olurdu.'},
   code='''
   SELECT sanatci.adi, festival.adi
   FROM sanatci
   INNER JOIN festival ON sanatci.festival_id = festival.id;''', db='fest', show=['festival', 'sanatci'],
   sql='SELECT COUNT(*) FROM sanatci INNER JOIN festival ON sanatci.festival_id = festival.id')
fill('Sonucu yaşa göre **azalan** sıralamak için boşluğu doldurun.',
     '''
     SELECT ad, yas FROM Ogrenci
     WHERE yas IS NOT NULL
     ORDER BY yas ____;''', ['DESC'],
     '`DESC` azalan (9→1), `ASC` artan (varsayılan).', db='ogr', show=['Ogrenci'], expect='Ay / 22, Ayşe / 20, Ece / 19, Ali / 17', wrong=['ASC'],
     whyFill={'ASC': 'ASC artan sıralar (17, 19, 20, 22).'})
fill("Adı **A ile başlayan ve tam 2 karakter** olan öğrencileri getiren deseni tamamlayın.",
     "SELECT ad FROM Ogrenci WHERE ad LIKE '____';", ['A_'],
     '`_` tam **bir** karakter: `A_` → Ay.', db='ogr', show=['Ogrenci'], expect='Ay', wrong=['A%', 'A__'],
     whyFill={'A%': '`%` sıfır ya da çok karakter: Ayşe, Ali, Ay hepsi gelir.'})
code('Sanatçı ve festival', 'Her sanatçının adını katıldığı festivalin adıyla birlikte, sanatçı numarasına göre sıralı listeleyin.',
     '''
     SELECT sanatci.adi, festival.adi
     FROM sanatci
     {{1}} JOIN festival
       {{2}} sanatci.festival_id = festival.{{3}}
     {{4}} BY sanatci.id;''',
     [['INNER'], ['ON'], ['id'], ['ORDER']],
     ['Eşleşenleri getiren birleştirme: `INNER JOIN`.', 'Eşleşme koşulu `ON` ile yazılır.',
      'Festival tablosunun anahtarı `id` (sanatci.festival_id buna işaret eder).', 'Sıralama `ORDER BY`.'],
     db='fest', expect='AA AA / ABC FESTİVALİ, BB BB / ABC FESTİVALİ, CC CC / BCD FESTİVALİ, DD DD / CDE FESTİVALİ',
     note='Sonuç: AA AA ve BB BB → ABC FESTİVALİ, CC CC → BCD FESTİVALİ, DD DD → CDE FESTİVALİ.')

# ======================= 10. gruplar =======================
topic('gruplar')
mc('GRANT ve REVOKE hangi komut grubundadır?',
   ['DCL', 'DDL', 'DML', 'TCL', 'DQL'], 0,
   '**DCL (Data Control Language)** erişim yetkisini yönetir.')
mc('COMMIT, ROLLBACK ve SAVEPOINT hangi komut grubundadır?',
   ['TCL', 'DCL', 'DDL', 'DML', 'DQL'], 0,
   '**TCL (Transaction Control Language)** işlemleri onaylar ya da geri alır.')
mc('Aşağıdakilerden hangisi bir **DML** komutudur?',
   ['UPDATE', 'CREATE TABLE', 'GRANT', 'COMMIT', 'TRUNCATE'], 0,
   'DML: INSERT, UPDATE, DELETE.', why={1: 'DDL.', 2: 'DCL.', 3: 'TCL.', 4: 'Çoğu kaynakta DDL.'})
mc('CRUD kısaltmasındaki "C" hangi SQL komutuna karşılık gelir?',
   ['INSERT', 'CREATE TABLE', 'COMMIT', 'COUNT', 'SELECT'], 0,
   'Create (kayıt oluştur) = **INSERT**, Read = SELECT, Update = UPDATE, Delete = DELETE.',
   why={1: 'Tuzak: CREATE TABLE yapı oluşturur (DDL). CRUD\'daki Create kayıt eklemektir.', 4: 'SELECT, R (Read).'})
mc('Aşağıdaki işlem bloğundan sonra `SELECT COUNT(*) FROM Ogrenci;` kaç döndürür?',
   ['5', '3', '2', '0', 'Komut hata verir'], 0,
   '`ROLLBACK` henüz onaylanmamış silmeyi geri alır; tabloda yine 5 öğrenci var.',
   why={1: 'COMMIT olsaydı 3 kalırdı; ROLLBACK silmeyi geri aldı.'},
   code='''
   START TRANSACTION;
   DELETE FROM Ogrenci WHERE yas < 20;
   ROLLBACK;''', db='ogr', show=['Ogrenci'],
   sql='START TRANSACTION; DELETE FROM Ogrenci WHERE yas < 20; ROLLBACK; SELECT COUNT(*) FROM Ogrenci;')
mc('Aşağıdaki işlem bloğundan sonra `SELECT COUNT(*) FROM Ogrenci;` kaç döndürür?',
   ['3', '5', '2', '0', '4'], 0,
   'yas < 20: Ali (17) ve Ece (19) silinir; COMMIT kalıcılaştırır → 3. Can\'ın yaşı NULL olduğu için koşula girmez.',
   why={1: 'COMMIT onaylar, geri almaz.', 4: 'NULL < 20 doğru değildir; Can silinmez.'},
   code='''
   START TRANSACTION;
   DELETE FROM Ogrenci WHERE yas < 20;
   COMMIT;''', db='ogr', show=['Ogrenci'],
   sql='START TRANSACTION; DELETE FROM Ogrenci WHERE yas < 20; COMMIT; SELECT COUNT(*) FROM Ogrenci;')
mc('Görünüm (VIEW) için hangisi doğrudur?',
   ['Sorgudan türetilen sanal tablodur; veriyi ayrıca kopyalamaz', 'Tablonun fiziksel yedeğidir', 'Yetki veren komuttur',
    'Aramayı hızlandıran yardımcı yapıdır', 'Tablodaki tüm satırları siler'], 0,
   'VIEW bir sorguya dayalı **sanal tablodur**.', why={3: 'Bu INDEX.'})
mc('Bazı aramaları hızlandırabilecek yardımcı yapıyı oluşturan komut hangisidir?',
   ['CREATE INDEX', 'CREATE VIEW', 'CREATE DATABASE', 'GRANT', 'SAVEPOINT'], 0,
   '`CREATE INDEX idx_ad ON Ogrenci (ad);`', why={1: 'VIEW sanal tablo oluşturur.'})
mc('Hocanın "yetkisiz stajyer tüm notları silmesin" sorununun SQL\'deki karşılığı hangisidir?',
   ['GRANT/REVOKE ile yetkilendirme (DCL)', 'TRUNCATE ile tabloyu boşaltmak', 'DISTINCT ile tekrarları kaldırmak',
    'ORDER BY ile sıralamak', 'AUTO_INCREMENT kullanmak'], 0,
   'Kime hangi yetkinin verileceği DCL ile (GRANT/REVOKE) belirlenir.')
mc('Aşağıdaki eşleştirmelerden hangisi **yanlıştır**?',
   ['INSERT → DDL', 'CREATE → DDL', 'SELECT → DQL', 'GRANT → DCL', 'ROLLBACK → TCL'], 0,
   'INSERT veri ekler: **DML**. DDL yapıyla ilgilenir.')
fill('İşlemde yapılan değişiklikleri onaylayıp kalıcı hâle getiren komutu yazın.',
     '''
     START TRANSACTION;
     DELETE FROM Ogrenci WHERE id = 4;
     ____;''', ['COMMIT'],
     '`COMMIT` onaylar; `ROLLBACK` geri alırdı.', db='ogr', then='SELECT COUNT(*) FROM Ogrenci;', expect='4', wrong=['ROLLBACK'],
     whyFill={'ROLLBACK': 'ROLLBACK değişikliği geri alır, onaylamaz.', 'SAVEPOINT': 'SAVEPOINT ara nokta koyar.'})
fill('Kullanıcıya yetki veren DCL komutunu yazın.',
     "____ SELECT ON universite.* TO 'stajyer'@'localhost';", ['GRANT'],
     '`GRANT` yetki verir, `REVOKE` geri alır.', nocheck=True,
     whyFill={'REVOKE': 'REVOKE yetkiyi geri alır.'})
