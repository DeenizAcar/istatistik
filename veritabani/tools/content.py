"""Konu özetleri, ER çizimleri (SVG), tuzaklar ve kurallar.
Kaynak: hocanın 4 haftalık notu, FestivalPlanlama.pdf ve çalışma kitapçığı."""
from lib import dd, table_of


def p(t): return {'t': 'p', 'text': t}
def ul(*items): return {'t': 'ul', 'items': list(items)}
def table(head, *rows): return {'t': 'table', 'head': head, 'rows': [list(r) for r in rows]}
def trap(t): return {'t': 'trap', 'text': t}
def tip(t): return {'t': 'tip', 'text': t}
def low(t): return {'t': 'low', 'text': t}


def c(code, res=False, run=True, db=None, out=None):
    """res=True: son SELECT'in sonucu sqlite ile hesaplanıp 'Çıktı' olarak yazılır.
       run=False: çalıştırılmaz (sözdizimi şablonu, GRANT, DROP gibi).
       db='ogr': ortak veritabanı yerine bu örnek veritabanının taze kopyasında çalışır."""
    d = {'t': 'code', 'code': dd(code)}
    if out is not None: d['out'] = dd(out)
    d['_chk'] = {'res': res, 'run': run, 'db': db}
    return d


# ---------------- ER çizimleri ----------------
def _esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def _tw(t, k=7.0):
    return len(t) * k


def _ell(x, y, t, pk=False, multi=False):
    rx = max(32, _tw(t) / 2 + 10)
    s = '<ellipse class="at" cx="%d" cy="%d" rx="%d" ry="15"/>' % (x, y, rx)
    if multi:
        s += '<ellipse class="at2" cx="%d" cy="%d" rx="%d" ry="11"/>' % (x, y, rx - 4)
    s += '<text class="tx" x="%d" y="%d">%s</text>' % (x, y + 4, _esc(t))
    if pk:
        w = _tw(t, 6.4)
        s += '<line class="pk" x1="%d" y1="%d" x2="%d" y2="%d"/>' % (x - w / 2, y + 7, x + w / 2, y + 7)
    return s


def _ent(cx, cy, t):
    w = max(104, _tw(t, 8) + 28)
    return ('<rect class="en" x="%d" y="%d" width="%d" height="38" rx="3"/>' % (cx - w / 2, cy - 19, w) +
            '<text class="tx b" x="%d" y="%d">%s</text>' % (cx, cy + 5, _esc(t))), w


def _attrs(cx, cy, attrs):
    """attrs: [(ad, pk, çok_değerli)] → en fazla 2 üstte, 2 altta"""
    s, slots = '', [(-58, 34), (58, 34), (-58, 186), (58, 186)]
    if len(attrs) == 1: slots = [(0, 34)]
    if len(attrs) == 3: slots = [(-58, 34), (58, 34), (0, 186)]
    for (name, pk, multi), (dx, y) in zip(attrs, slots):
        x = cx + dx
        ey = y + 15 if y < cy else y - 15
        ty = cy - 19 if y < cy else cy + 19
        s += '<line class="ln" x1="%d" y1="%d" x2="%d" y2="%d"/>' % (x, ey, cx + dx * .45, ty)
        s += _ell(x, y, name, pk, multi)
    return s


def er(left, rel, right, cl, cr, la=(), ra=(), title=''):
    """left —cl— <rel> —cr— right; la/ra: öznitelik listeleri [(ad, pk, çok_değerli)]"""
    L, R, D, cy = 125, 495, 310, 110
    has = bool(la or ra)
    if not has: cy = 50
    s = ''
    s += _attrs(L, cy, la) + _attrs(R, cy, ra)
    el, wl = _ent(L, cy, left)
    erh, wr = _ent(R, cy, right)
    s += '<line class="ln" x1="%d" y1="%d" x2="%d" y2="%d"/>' % (L + wl / 2, cy, D - 58, cy)
    s += '<line class="ln" x1="%d" y1="%d" x2="%d" y2="%d"/>' % (D + 58, cy, R - wr / 2, cy)
    s += el + erh
    s += '<polygon class="rel" points="%d,%d %d,%d %d,%d %d,%d"/>' % (D - 58, cy, D, cy - 30, D + 58, cy, D, cy + 30)
    s += '<text class="tx b" x="%d" y="%d">%s</text>' % (D, cy + 5, _esc(rel))
    s += '<text class="cd" x="%d" y="%d">%s</text>' % (L + wl / 2 + 14, cy - 8, cl)
    s += '<text class="cd" x="%d" y="%d">%s</text>' % (R - wr / 2 - 14, cy - 8, cr)
    h = 216 if has else 100
    return ('<svg viewBox="0 0 620 %d" role="img" aria-label="%s" xmlns="http://www.w3.org/2000/svg">' % (h, _esc(title or '%s %s %s' % (left, rel, right))) +
            s + '</svg>')


def legend():
    s = ''
    s += '<rect class="en" x="20" y="22" width="104" height="38" rx="3"/><text class="tx b" x="72" y="46">Varlık</text>'
    s += _ell(200, 41, 'Öznitelik')
    s += '<polygon class="rel" points="282,41 332,13 382,41 332,69"/><text class="tx b" x="332" y="45">İlişki</text>'
    s += _ell(450, 41, 'ogrenci_no', pk=True)
    s += '<text class="cd" x="560" y="47">1 · N</text>'
    caps = [(72, 'Dikdörtgen'), (200, 'Elips'), (332, 'Elmas (baklava)'), (450, 'Altı çizili = PK'), (560, 'Kardinalite')]
    for x, t in caps:
        s += '<text class="tx m" x="%d" y="96">%s</text>' % (x, _esc(t))
    return '<svg viewBox="0 0 620 110" role="img" aria-label="ER sembolleri" xmlns="http://www.w3.org/2000/svg">' + s + '</svg>'


def svg(markup, cap): return {'t': 'svg', 'svg': markup, 'cap': cap}


A = lambda n: (n, False, False)
PK = lambda n: (n, True, False)
MV = lambda n: (n, False, True)

ER_BOLUM = er('Bölüm', 'Okur', 'Öğrenci', '1', 'N', [PK('Bölüm_kodu'), A('Bölüm_adı')],
              [PK('Öğrenci_No'), A('Ad'), A('Soyad'), A('EPosta')], 'Bölüm 1 Okur N Öğrenci')
ER_DERS = er('Öğrenci', 'Alır', 'Ders', 'N', 'N', [PK('Öğrenci_No'), A('Ad'), A('Soyad'), A('EPosta')],
             [PK('Ders_Kodu'), A('Ders Adı'), A('Kredi')], 'Öğrenci N Alır N Ders')
ER_FEST = er('FESTİVAL', 'katılır', 'SANATCI', '1', 'N', [PK('ID'), A('ADI'), A('TARİHİ'), A('ADRES_İL')],
             [PK('ID'), A('ADI'), MV('SANAT TÜRÜ')], 'FESTİVAL 1 katılır N SANATCI')
ER_SAHNE = er('SANATCI', 'çıkar', 'SAHNE', 'M', 'N', [PK('ID'), A('ADI'), MV('SANAT TÜRÜ')],
              [PK('ID'), A('ADI'), A('TARİH'), A('ADRES')], 'SANATCI M çıkar N SAHNE')

# ---------------- konular ----------------
TOPICS = [
{'id': 'giris', 'title': 'Veri, bilgi ve veritabanı', 'src': 'Hafta 1 notu · Kitapçık 01, 03', 'blocks': [
  p('**Veri (data):** işlenmemiş, ham, tek başına anlam taşımayan rakam, sözcük ya da ölçüm. **Bilgi (information):** verinin işlenip anlamlı ve karar verilebilir hâle gelmiş biçimi. Veri ham madde, bilgi ürün.'),
  table(['', 'Hocanın örneği', 'Neden'],
        ['Veri', '"85", "Ali"', '85 not mu, sıcaklık mı, para mı belli değil'],
        ['Bilgi', '"Ali\'nin Veritabanı Teknolojileri sınavından aldığı not 85\'tir."', 'Ham veriler anlamlı bir cümleye dönüştü']),
  p('**Veritabanı (database):** birbiriyle ilişkili verilerin düzenli biçimde depolandığı, yönetildiği, güncellendiği ve arandığı elektronik ortam. Hoca "dijital kütüphane" diyor. **Veri bütünlüğü (data integrity):** verilerin tutarlı, doğru ve güvenilir olmasını sağlayan kurallar.'),
  trap('**Excel veritabanı değildir.** Küçük listeler ve kişisel hesaplar için iyidir; binlerce kullanıcı aynı anda veri girince, veri bütünlüğü ve hızlı arama gerekince yetersiz kalır.'),
  p('**Hocanın senaryosu:** 5.000 öğrencili bir üniversite tüm öğrenci işlerini tek bir `ogrenciler.xlsx` dosyasında tutuyor.'),
  table(['Soru', 'Ortaya çıkan sorun'],
        ['Aynı anda 50 personel dosyayı güncellemek isterse?', 'Kilitlenme ve veri kaybı (eş zamanlı erişim)'],
        ['Bölüm değişince 5 yerden biri unutulursa?', 'Veri tutarsızlığı'],
        ['Yetkisiz bir stajyer tüm notları silerse?', 'Güvenlik eksikliği'],
        ['Sabit disk bozulursa?', 'Yedekleme eksikliği']),
  p('**Dosya tabanlı sistemler** (ogrenciler.txt, notlar.dat, personel.csv): her program kendi dosyasını yönetir. 6 sorun doğurur:'),
  table(['Sorun', 'Kısa örnek'],
        ['1. Veri tekrarı (redundancy)', 'Adres hem öğrenci hem yurt dosyasında'],
        ['2. Veri tutarsızlığı (inconsistency)', 'Adres bir dosyada güncellenip diğerinde unutulur'],
        ['3. Güncelleme zorluğu', 'Veri dağınık; değişiklik zahmetli ve hataya açık'],
        ['4. Eş zamanlı erişim (concurrency)', 'Son kaydeden diğerinin üstüne yazar'],
        ['5. Güvenlik ve yetkilendirme eksikliği', 'Dosya ya herkese açık ya tamamen kapalı'],
        ['6. Yedekleme ve kurtarma zorluğu', 'Çökünce tutarlı geri dönmek zor']),
  tip('Tutarsızlık **tekrardan** doğar: aynı veri iki yerde olmasa çelişki de olmaz. Sınavda örnek verip "hangi sorun?" diye sorulabilir.'),
  p('**Kullanım alanları:** üniversite (öğrenci, ders kaydı, not), banka (müşteri → hesap → işlem → bakiye), e-ticaret (ürün, stok, sepet, sipariş), sosyal medya (profil, beğeni, takipçi), hastane (HBYS: hasta geçmişi, randevu, tahlil).')]},

{'id': 'dbms', 'title': 'DBMS, araçlar ve veritabanı türleri', 'src': 'Hafta 1 ve 4 notu · Kitapçık 02–04', 'blocks': [
  p('**DBMS (Database Management System, VTYS):** veritabanını oluşturan, saklayan, güncelleyen, sorgulayan ve güvenliğini sağlayan yazılım. Hocanın benzetmesi: veritabanı kilitli **depo**, DBMS deponun anahtarlarını yöneten **güvenlik ve yönetim ekibi**.'),
  table(['Ad', 'Nedir', 'Not'],
        ['MySQL', '**DBMS** (veritabanı motoru)', 'Arka planda çalışır, komut satırıyla; bu derste kullanılıyor'],
        ['phpMyAdmin', '**Arayüz (GUI)**, web', 'Tarayıcıdan tıklayarak yönetim; "SQL" sekmesi var'],
        ['HeidiSQL', '**Arayüz (GUI)**, masaüstü', 'MySQL vb. için alternatif araç'],
        ['SQL', '**Dil**', 'DBMS ile konuşmak için kullanılan sorgu dili']),
  trap('MySQL ile phpMyAdmin aynı şey değildir: MySQL motor, phpMyAdmin onu yöneten arayüz. SQL de bir DBMS değil, **dildir**.'),
  p('**DBMS örnekleri:** MySQL (açık kaynak), PostgreSQL (açık kaynak, gelişmiş), Microsoft SQL Server, Oracle Database. Kitapçık SQLite\'ı da sayar.'),
  table(['Kavram', 'Tanım'],
        ['Tablo', 'Aynı konuya ait satır ve sütunlardan oluşan yapı'],
        ['Satır / kayıt (row)', 'Bir nesnenin tek kaydı, ör. bir öğrencinin bütün bilgileri'],
        ['Sütun / alan (column)', 'Kayıtların bir özelliği, ör. `ad`, `yas`'],
        ['Şema (schema)', 'Veritabanının mantıksal yapısı ve tanımları'],
        ['Sorgu (query)', 'Veri istemek ya da veri üzerinde işlem yapmak için gönderilen komut']),
  p('**İlişkisel (RDBMS):** veriler satır-sütun tablolarında tutulur, tablolar birbirine bağlanır (MySQL, Oracle, SQL Server). **NoSQL (Not Only SQL):** tablo zorunluluğu yok; doküman, anahtar-değer ya da grafik gibi esnek modeller (MongoDB).'),
  table(['ogrenci_id', 'adsoyad', 'bolum'], ['1', 'Ali Yılmaz', 'Bilgisayar Programcılığı'], ['2', 'Ayşe Demir', 'Büyük Veri']),
  c('''
    -- Aynı öğrenci MongoDB'de (JSON doküman):
    {
      "ogrenci_id": 1,
      "adsoyad": "Ali Yılmaz",
      "bolum": "Bilgisayar Programcılığı",
      "ilgi_alanlari": ["Veritabanı", "Python"]
    }''', run=False),
  p('**Tarihsel gelişim:**'),
  table(['Dönem', 'Yaklaşım'],
        ['1960\'lar öncesi', 'Dosya tabanlı sistemler (tekrar ve tutarsızlık dorukta)'],
        ['1960–1970\'ler', 'Hiyerarşik ve ağ veritabanları (ağaç yapısı)'],
        ['1970–2000\'ler', 'İlişkisel veritabanları: **Edgar F. Codd** kuramsal temeli attı; SQL ile yönetim'],
        ['2000\'ler sonrası', 'Web ölçeği ve **NoSQL** (MongoDB vb.)'],
        ['Günümüz', 'Bulut ve dağıtık veri sistemleri']),
  tip('"İlişkisel modelin kuramsal temelini kim attı?" → **Edgar F. Codd**. "MySQL nedir?" → DBMS. "phpMyAdmin nedir?" → arayüz.')]},

{'id': 'buyukveri', 'title': 'Büyük veri ve 5V', 'src': 'Hafta 1 notu', 'blocks': [
  p('**Büyük veri (Big Data):** geleneksel veritabanlarının işleyemeyeceği kadar büyük, hızlı akan ve çeşitli veri yığını. Sadece "çok veri" demek değildir; 5 özelliği (5V) vardır.'),
  table(['V', 'Anlamı', 'Hocanın örneği'],
        ['**Volume**', 'Hacim (TB, PB, EB)', 'YouTube\'a her dakika yüzlerce saatlik video; Instagram\'da her gün milyarlarca fotoğraf'],
        ['**Velocity**', 'Hız: anlık üretilir, anlık işlenir', 'Kredi kartı dolandırıcılık tespiti, saniyenin onda birinde'],
        ['**Variety**', 'Çeşitlilik: farklı formatlar', 'Fotoğraf, video, ses, tweet, GPS logu (yapısal olmayan veri)'],
        ['**Veracity**', 'Doğruluk / güvenilirlik', 'Akıllı bileklik: kolunu salladığı için nabız 200 görünen hasta (kirli/gürültülü veri)'],
        ['**Value**', 'Değer: veriden anlam çıkarmak', 'Spotify dinleme verisinden "Haftalık Keşif" listesi']),
  trap('Veracity "hız" değildir. **Kredi kartı = Velocity**, **bileklik nabız 200 = Veracity**, **YouTube = Volume**, **Spotify = Value**.'),
  p('**Geleneksel veritabanı ile ilişkisi:** 5.000 öğrencili üniversite için MySQL doğru tercih. Ama dünyadaki tüm telefonların anlık konumunu ya da saniyede milyonlarca finansal işlemi tek bir geleneksel veritabanına yazmaya çalışırsan sistem kilitlenir. Bunun için **Hadoop, Spark** gibi büyük veri teknolojileri kullanılır.'),
  tip('İkisi rakip değil, **tamamlayıcıdır**: geleneksel veritabanları kurumsal uygulamaların kalbi, büyük veri teknolojileri aşırı büyük ve dağınık veri için. **Ölçeklenebilirlik (scalability):** veri ve kullanıcı arttıkça sistemin büyüyebilme kapasitesi.'),
  p('**Dersin yol haritası:** Veri → Veritabanı → DBMS → SQL → NoSQL → Veri Ambarı → Büyük Veri → Hadoop/Spark.')]},

{'id': 'er', 'title': 'Veri modeli ve ER diyagramı', 'src': 'Hafta 2 notu · Kitapçık 01–02', 'blocks': [
  p('**Veri modeli:** gerçek dünyadaki verilerin yapısını, özelliklerini ve ilişkilerini mantıksal olarak gösteren taslak. Hoca: veri modeli veritabanının **mimari projesidir**; plansız tablo kurmak projesiz bina dikmektir. **Soyutlama:** karmaşık gerçek hayatı gereksiz detaylardan arındırma.'),
  p('**Dönüşüm zinciri:** Gerçek Dünya → Kavramsal Model → ER Diyagramı → İlişkisel Model → Tablolar / SQL. **Kavramsal model** teknolojiden (MySQL, Oracle, MongoDB) bağımsızdır.'),
  table(['Kavram', 'Tanım', 'Örnek'],
        ['Varlık (entity)', 'Hakkında veri tutulan nesne, kişi, yer, kavram', 'Öğrenci, Kitap, Ders, Sipariş'],
        ['Varlık türü / örneği', 'Genel ad / somut birey', 'Öğrenci / Ali Yılmaz'],
        ['Öznitelik (attribute)', 'Varlığın özelliği; tek başına varlık olamaz', 'öğrenci_no, ad, soyad, eposta'],
        ['İlişki (relationship)', 'Varlıklar arasındaki anlamlı bağ', 'Öğrenci ders **alır**'],
        ['Birincil anahtar (PK)', 'Her kaydı benzersiz tanımlar, boş olamaz', 'öğrenci_no, tc_kimlik_no, ders_kodu']),
  svg(legend(), 'ER sembolleri: dikdörtgen varlık, elips öznitelik, elmas ilişki, altı çizili öznitelik birincil anahtar.'),
  trap('İlişkinin sembolü **elmas / baklava (eşkenar dörtgen)**. Paralelkenar değil, elips değil. Elips = öznitelik, dikdörtgen = varlık.'),
  p('**İlişki türleri (kardinalite):**'),
  table(['Tür', 'Anlamı', 'Örnek'],
        ['1:1', 'İki taraf da tek', 'Kişi – Pasaport; kişi – dolap'],
        ['1:N', 'Bir taraf çok, diğeri tek', 'Bölüm – Öğrenci'],
        ['N:N', 'İki taraf da çok', 'Öğrenci – Ders']),
  p('**"Birden fazla … olabilir mi?" yöntemi:** önce ilişkiye ad ver ve iki yönde önerme kur ("Bölümde öğrenciler okur", "Öğrenciler bölümlerde okur"). Sonra iki soru sor:'),
  table(['Soru', 'Cevap', 'Sonuç'],
        ['Bir bölümde birden fazla öğrenci okuyabilir mi?', 'Evet', 'Öğrenci tarafı **N**'],
        ['Bir öğrenci birden fazla bölümde okuyabilir mi?', 'Hayır', 'Bölüm tarafı **1**'],
        ['Bir öğrenci birden fazla ders alabilir mi?', 'Evet', 'Ders tarafı **N**'],
        ['Bir dersi birden fazla öğrenci alabilir mi?', 'Evet', 'Öğrenci tarafı **N**']),
  svg(ER_BOLUM, 'Bölüm (1) — Okur — Öğrenci (N): bir bölümde çok öğrenci, her öğrenci tek bölümde.'),
  svg(ER_DERS, 'Öğrenci (N) — Alır — Ders (N): çoka çok. Tabloya geçerken ara tabloya dönüşür.'),
  tip('İki yönde de "evet" → N:N. Tek yönde "evet" → 1:N (evet denen taraf N). İkisi de "hayır" → 1:1. Kardinalite harfi, **sayısı sorulan varlığın** yanına yazılır.')]},

{'id': 'festival', 'title': 'Festival planlama (hocanın sorusu)', 'src': 'FestivalPlanlama.pdf · Kitapçık 07, 08, 46', 'blocks': [
  p('**Soru:** Müzik Festivali Planlama Sistemi: Festival, Sanatçı, Sahne. (Hangi festivalde, hangi sanatçı, hangi sahnede sahne aldı?)'),
  table(['Varlık', 'Öznitelikler (ID = PK)'],
        ['FESTİVAL', 'ID, ADI, TARİHİ, ADRES_İL'],
        ['SANATCI', 'ID, ADI, SANAT TÜRÜ'],
        ['SAHNE', 'ID, ADI, TARİH, ADRES']),
  p('**1. ilişki: Festival – Sanatçı.** Önermeler: "Festivale sanatçılar katılır", "Sanatçılar festivale katılır". Bir festivale birden fazla sanatçı katılabilir mi? **Evet.** Bir sanatçı birden fazla festivale katılabilir mi? Hoca: "Aynı saat ve gündeki festival olduğunu farz ederek **1-N** ilişki kuruyoruz."'),
  svg(ER_FEST, 'FESTİVAL (1) — katılır — SANATCI (N). Hocanın çiziminde SANAT TÜRÜ çift elipsle çizilmiş.'),
  trap('Gerçek hayatta bir sanatçı birçok festivale katılabilir, yani **N:N** olurdu. Ama hoca "aynı saat ve gün" varsayımıyla **1:N** kurdu. Soruda verilen varsayıma uy. Soru "gerçek dünyada" derse (Kitapçık 46) cevap N:N.'),
  p('**2. ilişki: Sanatçı – Sahne.** Önermeler: "Sanatçı sahneye çıkar", "Sahneye sanatçı çıkar". Bir sanatçı birden fazla sahneye çıkabilir mi? **Evet.** Bir sahneye birden fazla sanatçı çıkabilir mi? **Evet.** → **çoka çok**.'),
  svg(ER_SAHNE, 'SANATCI (M) — çıkar — SAHNE (N). Hoca M:N yazıyor; N:N ile aynı anlam.'),
  p('**Tablolara dönüşüm:** 1:N ilişkide "çok" taraf olan SANATCI tablosuna `FESTIVAL_ID (FK)` eklenir. M:N ilişki için ara tablo **ÇIKAR (ID, SANATCI_ID, SAHNE_ID)** kurulur. Hocanın örnek verileri:'),
  table(['FESTİVAL: ID (PK)', 'ADI', 'TARİH', 'ADRES_İL'],
        ['1', 'ABC FESTİVALİ', '01.01.2000', 'AFYON'], ['2', 'BCD FESTİVALİ', '02.02.2000', 'BURDUR'], ['3', 'CDE FESTİVALİ', '03.03.3000', 'MANİSA']),
  table(['SANATCI: ID (PK)', 'ADI', 'SANAT TÜRÜ', 'FESTIVAL_ID (FK)'],
        ['1', 'AA AA', 'POP', '1'], ['2', 'BB BB', 'CAZ', '1'], ['3', 'CC CC', 'ROCK', '2'], ['4', 'DD DD', 'POP', '3']),
  table(['SAHNE: ID (PK)', 'ADI', 'TARİH', 'ADRES'],
        ['1', 'POP RÜZGARI', '01.01.2000', 'AFYON UZUN ÇARŞI'], ['2', 'DUAYENLERE SAYGI', '01.01.2000', 'AFYON MİRİMOĞLU KONAĞI'],
        ['3', '90\'LAR', '01.01.2000', 'AFYON AKÜ KONGRE MERKEZİ'], ['4', 'AKŞAM ESİNTİSİ', '02.02.2000', 'BURDUR MERKEZ ÇARŞI'],
        ['5', 'SABAHIN GETİRDİKLERİ 1', '03.03.2000', 'MANİSA GİRİŞ ÇARŞI'], ['6', 'SABAHIN GETİRDİKLERİ 2', '03.03.2000', 'MANİSA ÇIKIŞ ÇARŞI']),
  table(['ÇIKAR: ID (PK)', 'SANATCI_ID (FK)', 'SAHNE_ID (FK)'], ['1', '1', '1'], ['2', '1', '3'], ['3', '2', '1']),
  low('PDF\'te CDE festivalinin tarihi 03.03.3000 yazıyor; sahne tarihlerine bakınca 03.03.2000 olmalı. SQL örneklerinde 2000 kullanıldı.'),
  p('**Modelin SQL karşılığı** (önce bağımsız tablolar, sonra FK taşıyanlar):'),
  c('''
    CREATE TABLE festival (
      id INT PRIMARY KEY,
      adi VARCHAR(100) NOT NULL,
      tarih DATE,
      adres_il VARCHAR(50)
    );
    CREATE TABLE sanatci (
      id INT PRIMARY KEY,
      adi VARCHAR(100) NOT NULL,
      sanat_turu VARCHAR(50),
      festival_id INT,                                  -- 1:N → FK çok tarafında
      FOREIGN KEY (festival_id) REFERENCES festival(id)
    );
    CREATE TABLE sahne (
      id INT PRIMARY KEY,
      adi VARCHAR(100) NOT NULL,
      tarih DATE,
      adres VARCHAR(150)
    );
    CREATE TABLE cikar (                                -- M:N → ara tablo
      id INT PRIMARY KEY,
      sanatci_id INT,
      sahne_id INT,
      FOREIGN KEY (sanatci_id) REFERENCES sanatci(id),
      FOREIGN KEY (sahne_id) REFERENCES sahne(id)
    );'''),
  c('''
    INSERT INTO festival VALUES
      (1, 'ABC FESTİVALİ', '2000-01-01', 'AFYON'),
      (2, 'BCD FESTİVALİ', '2000-02-02', 'BURDUR'),
      (3, 'CDE FESTİVALİ', '2000-03-03', 'MANİSA');
    INSERT INTO sanatci VALUES
      (1, 'AA AA', 'POP', 1), (2, 'BB BB', 'CAZ', 1),
      (3, 'CC CC', 'ROCK', 2), (4, 'DD DD', 'POP', 3);
    INSERT INTO sahne VALUES
      (1, 'POP RÜZGARI', '2000-01-01', 'AFYON UZUN ÇARŞI'),
      (2, 'DUAYENLERE SAYGI', '2000-01-01', 'AFYON MİRİMOĞLU KONAĞI'),
      (3, '90''LAR', '2000-01-01', 'AFYON AKÜ KONGRE MERKEZİ'),
      (4, 'AKŞAM ESİNTİSİ', '2000-02-02', 'BURDUR MERKEZ ÇARŞI'),
      (5, 'SABAHIN GETİRDİKLERİ 1', '2000-03-03', 'MANİSA GİRİŞ ÇARŞI'),
      (6, 'SABAHIN GETİRDİKLERİ 2', '2000-03-03', 'MANİSA ÇIKIŞ ÇARŞI');
    INSERT INTO cikar VALUES (1, 1, 1), (2, 1, 3), (3, 2, 1);'''),
  p('Sorunun cevabı "hangi festivalde, hangi sanatçı, hangi sahnede?" tabloları birleştirerek okunur (JOIN, düşük öncelik):'),
  c('''
    SELECT festival.adi AS festival, sanatci.adi AS sanatci, sahne.adi AS sahne
    FROM cikar
    INNER JOIN sanatci  ON cikar.sanatci_id = sanatci.id
    INNER JOIN festival ON sanatci.festival_id = festival.id
    INNER JOIN sahne    ON cikar.sahne_id = sahne.id
    ORDER BY cikar.id;''', res=True),
  tip('Sınavda: iki ilişkinin türü (1:N ve N:N/M:N), kardinalitenin yazıldığı taraf, FK\'nin hangi tabloya gittiği (SANATCI) ve ara tablonun adı/sütunları (ÇIKAR: SANATCI_ID, SAHNE_ID).')]},

{'id': 'anahtar', 'title': 'Anahtarlar, kısıtlar, tabloya dönüşüm', 'src': 'Hafta 3–4 notu · Kitapçık 04', 'blocks': [
  table(['Kısıt / kavram', 'Görevi', 'İpucu'],
        ['PRIMARY KEY', 'Satırı benzersiz tanımlar; **NULL olamaz**', 'Kimlik kartı'],
        ['FOREIGN KEY', 'Başka tablodaki anahtara referans verir', 'Tablolar arası bağ'],
        ['NOT NULL', 'Alanın boş bırakılmasını engeller', 'Mutlaka değer'],
        ['UNIQUE', 'Değerlerin tekrarını engeller', 'Aynı e-postayla iki hesap yok'],
        ['DEFAULT', 'Değer girilmezse varsayılanı yazar', '`aktif BOOLEAN DEFAULT TRUE`'],
        ['CHECK', 'Değer için koşul tanımlar', '`yas >= 0`'],
        ['Bileşik anahtar', 'Birden çok sütundan oluşan anahtar', '`PRIMARY KEY (ogrenci_id, ders_id)`'],
        ['Aday anahtar', 'Satırı tek başına tanımlayabilen minimal sütun kümesi', 'PK adayı (TC no, e-posta)'],
        ['Referans bütünlüğü', 'FK hep var olan bir kayda işaret eder', 'Yetim kayıt yok']),
  p('**Primary Key kuralları:** her kaydı benzersiz tanımlar, tekrar etmez, boş olamaz. İlk sütun olmak zorunda değildir; sayısal olmak zorunda da değildir (TC no, e-posta olabilir) ama pratikte genelde `INT` seçilir.'),
  p('**Foreign Key:** önce bağımlı olunan **ana tablo (parent)**, sonra ilişkiyi kuran **çocuk tablo (child)** oluşturulur. `bolum` tablosunda olmayan bir `bolum_id` ile öğrenci eklenmek istenirse veritabanı engeller (referans bütünlüğü).'),
  c('''
    -- 1. Önce ana tablo
    CREATE TABLE bolum (
        bolum_id INT PRIMARY KEY,
        bolum_adi VARCHAR(100) NOT NULL
    );
    -- 2. Sonra ilişkili tablo
    CREATE TABLE ogrenci (
        ogrenci_id INT PRIMARY KEY,
        ad VARCHAR(50) NOT NULL,
        soyad VARCHAR(50) NOT NULL,
        bolum_id INT,
        FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)
    );'''),
  p('Kısıtların hepsi bir arada (hocanın örnek satırlarıyla):'),
  c('''
    CREATE TABLE uye (
        uye_id INT PRIMARY KEY,
        ad VARCHAR(50) NOT NULL,
        eposta VARCHAR(150) UNIQUE,
        aktif BOOLEAN DEFAULT TRUE,
        yas INT CHECK (yas >= 0)
    );'''),
  p('**İlişkiyi tabloya dönüştürme:**'),
  table(['İlişki', 'Ne yapılır', 'Örnek'],
        ['1:N', '"Çok" taraftaki tabloya FK eklenir', '`sanatci.festival_id`, `ogrenci.bolum_id`'],
        ['N:N', 'İki FK tutan **ara (köprü) tablo** kurulur', '`kayit(ogrenci_id, ders_id)`, `cikar(sanatci_id, sahne_id)`']),
  c('''
    CREATE TABLE ders (
        ders_id INT PRIMARY KEY,
        ders_adi VARCHAR(100) NOT NULL,
        kredi INT NOT NULL
    );
    CREATE TABLE kayit (                       -- N:N ara tablo
        ogrenci_id INT,
        ders_id INT,
        PRIMARY KEY (ogrenci_id, ders_id),     -- bileşik anahtar
        FOREIGN KEY (ogrenci_id) REFERENCES ogrenci(ogrenci_id),
        FOREIGN KEY (ders_id) REFERENCES ders(ders_id)
    );'''),
  trap('1:N\'de FK **çok (N) tarafına** konur, 1 tarafına değil. Bölüm tablosuna öğrenci listesi yazılmaz; her öğrencinin satırına `bolum_id` yazılır. N:N\'de ise FK\'ler ara tabloya gider.'),
  tip('Bileşik PK `(ogrenci_id, ders_id)` sayesinde aynı öğrenci aynı derse iki kez kaydedilemez.'),
  low('Normal formlar (tanım ezberi yeter): **1NF** hücreler atomik/tek değerli. **2NF** 1NF + anahtar olmayan alan bileşik anahtarın bir kısmına bağlı değil. **3NF** 2NF + anahtar olmayan alanlar arasında **geçişli bağımlılık** yok. Amaç: tekrar ve tutarsızlığı azaltmak.')]},

{'id': 'ddl', 'title': 'SQL ve DDL komutları', 'src': 'Hafta 4 notu · Kitapçık 05–06', 'blocks': [
  p('**SQL (Structured Query Language):** veritabanı ve tablo oluşturmak, veri eklemek, güncellemek, silmek, sorgulamak ve yetki yönetmek için kullanılan **bildirimsel (deklaratif)** dil. Hocanın benzetmesi: SQL restorandaki **menü dili**, MySQL siparişi hazırlayan **mutfak ve aşçı ekibi**.'),
  p('**Neden tıklamak yerine komut?** SQL betikleri **tekrar üretilebilir** (reproducible), **betikleştirilebilir** (scripted), belgelenebilir ve hata denetimi kolaydır; aynı yapı başka sunucuda birebir kurulur.'),
  p('**DDL (Data Definition Language):** tablonun **iskeletiyle** (ad, sütun, veri tipi, ilişki) ilgilenir, içindeki veriyle değil. Komutlar: `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, `TRUNCATE`.'),
  c('''
    CREATE DATABASE universite;
    USE universite;'''),
  ul('`CREATE` yeni nesne oluşturur, `DATABASE` nesnenin türü, `universite` adı.',
     '`USE`: sunucuda birden çok veritabanı olabileceği için hangisinde çalışılacağını bildirir.',
     '**Adlandırma:** anlamlı ad, **boşluk yok**, Türkçe karakter yok (ş→s, ğ→g, ı→i …), genelde küçük harf, kelimeler arasında `_`.'),
  table(['Veri tipi', 'Ne saklar', 'Örnek sütun'],
        ['INT', 'Tam sayı', 'ogrenci_id, kredi, yas'],
        ['VARCHAR(n)', 'Değişken uzunluklu metin, en fazla n karakter', 'ad, eposta'],
        ['DATE', 'Tarih, `YYYY-AA-GG`', 'dogum_tarihi'],
        ['DECIMAL(p,s)', 'Ondalıklı/parasal değer', 'ucret, maas'],
        ['BOOLEAN', 'Doğru/yanlış (MySQL\'de TINYINT(1))', 'aktif_mi, mezun_mu']),
  trap('`VARCHAR(100)` = **en fazla** 100 karakter; 100 karakter doldurma zorunluluğu yok. `DECIMAL(10,2)` = **toplam** 10 basamak, bunun 2\'si virgülden sonra (12345678.90). Sayıyı VARCHAR tutarsan hesap yapamazsın; tarihi metin tutarsan tarih aralığı sorgusu bozulur.'),
  p('**CREATE TABLE sözdizimi:** sütun tanımları parantez içinde, aralarında **virgül**; komutun sonunda **noktalı virgül**. `PRIMARY KEY` eklenince alan hem boş geçilemez hem benzersiz olur.'),
  c('''
    CREATE TABLE bolum (
        bolum_id INT,
        bolum_adi VARCHAR(100)
    );'''),
  c('''
    CREATE TABLE bolum (
        bolum_id INT PRIMARY KEY,
        bolum_adi VARCHAR(100)
    );'''),
  p('**Tam üniversite uygulaması** (5 tablo). FK yüzünden sıra önemli: önce referans verilen (bağımsız) tablolar.'),
  c('''
    CREATE TABLE bolum (
        bolum_id INT PRIMARY KEY,
        bolum_adi VARCHAR(100) NOT NULL
    );
    CREATE TABLE ogrenci (
        ogrenci_id INT PRIMARY KEY,
        ad VARCHAR(50) NOT NULL,
        soyad VARCHAR(50) NOT NULL,
        bolum_id INT,
        FOREIGN KEY (bolum_id) REFERENCES bolum(bolum_id)
    );
    CREATE TABLE ders (
        ders_id INT PRIMARY KEY,
        ders_adi VARCHAR(100) NOT NULL,
        kredi INT NOT NULL
    );
    CREATE TABLE ogretim_elemani (
        ogretim_elemani_id INT PRIMARY KEY,
        ad VARCHAR(50) NOT NULL,
        soyad VARCHAR(50) NOT NULL
    );
    CREATE TABLE kayit (
        ogrenci_id INT,
        ders_id INT,
        PRIMARY KEY (ogrenci_id, ders_id),
        FOREIGN KEY (ogrenci_id) REFERENCES ogrenci(ogrenci_id),
        FOREIGN KEY (ders_id) REFERENCES ders(ders_id)
    );'''),
  table(['Sıra', 'Tablo', 'Neden'],
        ['1', 'bolum', 'Bağımsız'], ['2', 'ogrenci', 'bolum\'a bağlı'], ['3', 'ders', 'Bağımsız'],
        ['4', 'ogretim_elemani', 'Bağımsız'], ['5', 'kayit', 'Hem ogrenci hem ders\'e bağlı']),
  c('''
    ALTER TABLE ogrenci ADD eposta VARCHAR(150);   -- yapıya yeni sütun
    TRUNCATE TABLE kayit;                          -- yapı kalır, kayıtlar gider'''),
  c('''
    DROP TABLE ogrenci;       -- tablo ve tüm verisi kalıcı olarak gider
    TRUNCATE TABLE ogrenci;   -- yapı kalır, kayıtlar temizlenir''', run=False),
  table(['Komut', 'Grup', 'Tablo yapısı', 'Veriler', 'WHERE alır mı?'],
        ['DROP TABLE', 'DDL', 'Silinir', 'Silinir', 'Hayır'],
        ['TRUNCATE TABLE', 'DDL', '**Korunur**', 'Hepsi temizlenir', 'Hayır'],
        ['DELETE FROM', 'DML', 'Korunur', 'Koşula uyanlar silinir', '**Evet**']),
  trap('DROP TABLE geri dönüşü olmayan veri kaybıdır. DELETE satır siler, DROP tabloyu siler, TRUNCATE tabloyu koruyup bütün satırları boşaltır.'),
  tip('Sözdizimi: komut sonunda `;`, anahtar kelimeler geleneksel olarak BÜYÜK harf (zorunlu değil), açılan her parantez kapanır, sütunlar virgülle ayrılır. En sık hata: eksik parantez ve yanlış virgül.')]},

{'id': 'insert', 'title': 'INSERT INTO ile kayıt ekleme', 'src': 'YENİ KAYIT GİRİŞ notu · Kitapçık 07, 24', 'blocks': [
  p('`INSERT INTO` tabloya bir ya da daha fazla satır ekler. Tablo adından sonra parantez içinde sütunlar, `VALUES`\'tan sonra aynı sırayla değerler yazılır.'),
  c('''
    INSERT INTO tablo_adi (alanadi1, alanadi2, ...)
    VALUES (deger1, deger2, ...);

    -- Çok satır: satırlar virgülle ayrılır
    INSERT INTO tablo_adi (alanadi1, alanadi2, ...)
    VALUES
      (deger1, deger2, ...),
      (deger1, deger2, ...);''', run=False),
  trap('Sütun sayısı ile değer sayısı **aynı** olmalı; konumlar birbirine karşılık gelmeli. Metin ve tarih tırnak içinde: `\'Ali\'`, `\'2021-11-15\'`.'),
  p('Hocanın `gorevler` tablosu:'),
  c('''
    CREATE TABLE IF NOT EXISTS gorevler (
       gorev_id INT AUTO_INCREMENT,
       baslik VARCHAR(255) NOT NULL,
       baslamatarihi DATE,
       bitistarihi DATE,
       oncelik TINYINT NOT NULL DEFAULT 3,
       aciklama TEXT,
       PRIMARY KEY (gorev_id)
    );'''),
  c('''
    INSERT INTO gorevler(baslik, oncelik)
       VALUES('MySQL INSERT İfadesini Öğren', 1);
    SELECT * FROM gorevler;''', res=True),
  ul('`gorev_id` **AUTO_INCREMENT**: her yeni satırda MySQL sıradaki tam sayıyı kendisi verir.',
     'Değer verilmeyen sütun **DEFAULT** değerini alır; DEFAULT tanımı yoksa **NULL** olur (baslamatarihi, bitistarihi, aciklama).'),
  p('**Varsayılan değeri girmenin iki yolu:** (1) sütunu listeye hiç yazmamak, (2) değer yerine `DEFAULT` yazmak. İkisinde de `oncelik` = 3.'),
  c('''
    INSERT INTO gorevler (baslik)
      VALUES ('MySQL varsayılan değer girişi 1');
    INSERT INTO gorevler (baslik, oncelik)
      VALUES ('MySQL varsayılan değerin giriş 2', DEFAULT);
    SELECT gorev_id, baslik, oncelik FROM gorevler;''', res=True),
  p('**Tarih:** biçim `\'YYYY-MM-DD\'` (yıl 4, ay 2, gün 2 basamak). Günün tarihi için `CURRENT_DATE()` fonksiyonu.'),
  c('''
    INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)
      VALUES ('Tabloya Tarih Değeri Girişi', '2021-11-15', '2022-01-31');
    SELECT baslik, baslamatarihi, bitistarihi FROM gorevler WHERE gorev_id = 4;''', res=True),
  c('''
    INSERT INTO gorevler (baslik, baslamatarihi, bitistarihi)
      VALUES ('Günün tarihi', CURRENT_DATE(), CURRENT_DATE());''', db='gorev'),
  p('**Çok satır birden:** her satır ayrı parantezde, aralarında virgül. MySQL "**3 row(s) affected**" der: üç satır kopyasız ve uyarısız eklendi.'),
  c('''
    INSERT INTO gorevler (baslik, oncelik)
      VALUES
        ('Önceliği 1 olan görev', 1),
        ('Önceliği 2 olan görev', 2),
        ('Önceliği 3 olan görev', 3);
    SELECT gorev_id, baslik, oncelik FROM gorevler WHERE gorev_id > 4;''', res=True),
  p('**Güncelleme ve silme (kitapçık):** `UPDATE` var olan satırı değiştirir, `DELETE FROM` satır siler. İkisinde de hangi satır olduğunu **WHERE** söyler.'),
  c('''
    UPDATE gorevler SET oncelik = 1 WHERE gorev_id = 2;
    DELETE FROM gorevler WHERE gorev_id = 7;
    SELECT COUNT(*) AS kalan FROM gorevler;''', res=True),
  trap('`UPDATE` ya da `DELETE`\'te **WHERE unutulursa bütün satırlar** etkilenir. `UPDATE Ogrenci SET yas = 21;` hata vermez, herkesin yaşını 21 yapar.'),
  tip('CRUD\'da **C = Create = INSERT**. INSERT bir DML komutudur (DDL değil).')]},

{'id': 'sorgu', 'title': 'SELECT ile sorgulama', 'src': 'Kitapçık 06–08 (hocanın slaytlarında henüz yok)', 'blocks': [
  p('Düz mantık: `SELECT` ne gösterilsin? `FROM` nereden? `WHERE` hangi satırlar? `ORDER BY` nasıl sıralansın? Örnekler bu tabloyla:'),
  dict(table_of('ogr', 'Ogrenci'), t='table'),
  c('''
    SELECT ad, yas FROM Ogrenci WHERE yas >= 18;''', res=True, db='ogr'),
  table(['Koşul', 'Anlamı', 'Örnek'],
        ['AND / OR / NOT', 'İkisi de / en az biri / değil', '`yas > 18 AND sehir = \'Ankara\'`'],
        ['BETWEEN a AND b', 'Aralık, **sınırlar dahil**', '`yas BETWEEN 19 AND 22`'],
        ['IN (…)', 'Listedeki değerlerden biri', '`sehir IN (\'Ankara\', \'Bursa\')`'],
        ['LIKE', '`%` sıfır ya da çok karakter, `_` tam **bir** karakter', '`ad LIKE \'A%\'`, `ad LIKE \'A_\'`'],
        ['IS NULL / IS NOT NULL', 'Boş (bilinmeyen) / dolu', '`yas IS NULL`']),
  c('''
    SELECT ad FROM Ogrenci WHERE ad LIKE 'A%';   -- A ile başlayan, devamı ne olursa''', res=True, db='ogr'),
  c('''
    SELECT ad FROM Ogrenci WHERE ad LIKE 'A_';   -- A + tam 1 karakter''', res=True, db='ogr'),
  c('''
    SELECT ad FROM Ogrenci WHERE yas IS NULL;''', res=True, db='ogr'),
  trap('`WHERE yas = NULL` hiçbir satır getirmez; NULL ile `=` karşılaştırması doğru sonuç vermez. NULL kontrolü **IS NULL** ile yapılır. NULL ne sıfırdır ne boş metindir: "bilinmeyen".'),
  table(['İfade', 'Ne yapar'],
        ['ORDER BY sütun ASC / DESC', 'Artan (varsayılan) / azalan sıralar'],
        ['DISTINCT', 'Tekrarlı sonuçları teke indirir'],
        ['AS', 'Sütuna ya da tabloya takma ad verir'],
        ['LIMIT n (MySQL) / TOP n (SQL Server)', 'İlk n satır']),
  c('''
    SELECT DISTINCT sehir FROM Ogrenci ORDER BY sehir;''', res=True, db='ogr'),
  c('''
    SELECT ad AS isim, yas FROM Ogrenci ORDER BY yas DESC LIMIT 2;''', res=True, db='ogr'),
  p('**Toplulaştırma fonksiyonları:** `COUNT(*)` satır sayısı, `COUNT(sütun)` NULL olmayan değer sayısı, `SUM` toplam, `AVG` ortalama, `MIN`, `MAX`.'),
  c('''
    SELECT COUNT(*), COUNT(yas), SUM(yas), AVG(yas), MIN(yas), MAX(yas)
    FROM Ogrenci;''', res=True, db='ogr'),
  trap('`COUNT(*)` 5 (NULL\'lı satır da satırdır), `COUNT(yas)` 4. `AVG(yas)` da NULL\'ı dışarıda bırakır: 78 / 4 = 19.5 (5\'e bölünmez).'),
  p('**GROUP BY** aynı değerli satırları gruplar, **HAVING** grupları filtreler. **WHERE** ise gruplamadan önce tek tek satırları filtreler.'),
  c('''
    SELECT sehir, COUNT(*) AS ogrenci_sayisi
    FROM Ogrenci
    WHERE yas >= 18
    GROUP BY sehir
    HAVING COUNT(*) >= 2;''', res=True, db='ogr'),
  p('**Mantıksal işlenme sırası:** FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.'),
  low('**JOIN ve UNION** kitapçıkta var, hocanın slaytlarında henüz yok. `INNER JOIN` iki tabloda **eşleşenleri**, `LEFT JOIN` sol tablonun **hepsini** (eşleşmeyen sağ alanlar NULL), `RIGHT JOIN` sağın hepsini, `FULL OUTER JOIN` iki tarafın hepsini, `CROSS JOIN` tüm satır çiftlerini (kartezyen çarpım) getirir. `ON` eşleşme koşulu. `UNION` sonuçları alt alta birleştirip **tekrarı atar**, `UNION ALL` tekrarı **korur**.'),
  c('''
    SELECT sanatci.adi, festival.adi
    FROM sanatci
    INNER JOIN festival
      ON sanatci.festival_id = festival.id;''', res=True, db='fest'),
  trap('WHERE ↔ HAVING: WHERE **satır**, HAVING **grup** filtreler. `COUNT(*) > 2` gibi toplu koşul WHERE\'e yazılmaz, HAVING\'e yazılır.')]},

{'id': 'gruplar', 'title': 'SQL komut grupları ve işlemler', 'src': 'Kitapçık 05–06, 08', 'blocks': [
  table(['Grup', 'Açılım', 'Ne yapar', 'Komutlar'],
        ['**DDL**', 'Data Definition Language', 'Yapıyı tanımlar/değiştirir', 'CREATE, ALTER, DROP, TRUNCATE'],
        ['**DML**', 'Data Manipulation Language', 'Kayıt ekler, günceller, siler', 'INSERT, UPDATE, DELETE'],
        ['**DQL**', 'Data Query Language', 'Veri sorgular', 'SELECT'],
        ['**DCL**', 'Data Control Language', 'Erişim yetkisini yönetir', 'GRANT, REVOKE'],
        ['**TCL**', 'Transaction Control Language', 'İşlemi onaylar / geri alır', 'COMMIT, ROLLBACK, SAVEPOINT']),
  trap('Bazı kitaplar **SELECT**\'i DQL yerine DML içinde sayar; TRUNCATE çoğu kaynakta **DDL**\'dir. Hocanın notunda DDL komutları: CREATE DATABASE, CREATE TABLE, ALTER, DROP, TRUNCATE; INSERT ise DML.'),
  table(['CRUD', 'Anlam', 'SQL'], ['C', 'Create (oluştur)', 'INSERT'], ['R', 'Read (oku)', 'SELECT'], ['U', 'Update', 'UPDATE'], ['D', 'Delete', 'DELETE']),
  p('**İşlem (transaction) kontrolü:** `COMMIT` değişiklikleri onaylar/kalıcılaştırır, `ROLLBACK` henüz onaylanmamış değişiklikleri geri alır, `SAVEPOINT` işlemin içine geri dönüş noktası koyar.'),
  c('''
    START TRANSACTION;
    DELETE FROM Ogrenci WHERE sehir = 'Ankara';
    ROLLBACK;                       -- silme geri alındı
    SELECT COUNT(*) FROM Ogrenci;''', res=True, db='ogr'),
  p('**Yetki (DCL):** hocanın "yetkisiz stajyer tüm notları silmesin" sorusunun SQL cevabı. `GRANT` yetki verir, `REVOKE` geri alır.'),
  c('''
    GRANT SELECT ON universite.* TO 'stajyer'@'localhost';
    REVOKE SELECT ON universite.* FROM 'stajyer'@'localhost';''', run=False),
  table(['Nesne / işlem', 'Kısa tanım'],
        ['VIEW (görünüm)', 'Sorgudan türetilen **sanal tablo**; veriyi ayrıca kopyalamaz'],
        ['INDEX (indeks)', 'Bazı aramaları **hızlandıran** yardımcı yapı'],
        ['Şema', 'Veritabanının mantıksal yapısı'],
        ['Yedekleme / geri yükleme', 'Kayba karşı kopya almak / kopyadan geri getirmek'],
        ['Yetkilendirme', 'Kim hangi veriyi okuyup değiştirebilir']),
  c('''
    CREATE VIEW ankara_ogrencileri AS
      SELECT ad, yas FROM Ogrenci WHERE sehir = 'Ankara';
    CREATE INDEX idx_ad ON Ogrenci (ad);
    SELECT * FROM ankara_ogrencileri;''', res=True, db='ogr'),
  tip('Sorudaki fiili yakala: oluştur → CREATE, yapıyı değiştir → ALTER, ekle → INSERT, değiştir → UPDATE, listele → SELECT, şarta göre → WHERE, sırala → ORDER BY, grupla → GROUP BY, yetki ver → GRANT, onayla → COMMIT, geri al → ROLLBACK.')]},
]

TRAPS = [
  {'t': 'Veri ham, bilgi işlenmiş. "85" veri; "Ali\'nin notu 85" bilgi.', 'topic': 'giris'},
  {'t': 'Excel veritabanı değildir; eş zamanlı erişim, bütünlük ve güvenlikte yetersiz kalır.', 'topic': 'giris'},
  {'t': 'MySQL = DBMS (motor), phpMyAdmin/HeidiSQL = arayüz, SQL = dil.', 'topic': 'dbms'},
  {'t': 'Kredi kartı = Velocity, bileklik nabız 200 = Veracity, YouTube = Volume, Spotify = Value.', 'topic': 'buyukveri'},
  {'t': 'ER\'de ilişki = elmas/baklava, varlık = dikdörtgen, öznitelik = elips, PK = altı çizili.', 'topic': 'er'},
  {'t': '"Birden fazla olabilir mi?" iki yönde evet → N:N, tek yönde → 1:N.', 'topic': 'er'},
  {'t': 'Festival–Sanatçı hocanın varsayımıyla 1:N; "gerçek dünyada" denirse N:N.', 'topic': 'festival'},
  {'t': 'Sanatçı–Sahne M:N (= N:N) → ara tablo ÇIKAR (SANATCI_ID, SAHNE_ID).', 'topic': 'festival'},
  {'t': '1:N\'de FK "çok" tarafına konur: SANATCI.FESTIVAL_ID, ogrenci.bolum_id.', 'topic': 'anahtar'},
  {'t': 'PRIMARY KEY = benzersiz + NULL olamaz. UNIQUE sadece tekrar engeller.', 'topic': 'anahtar'},
  {'t': 'Önce ana (parent) tablo, sonra FK taşıyan (child) tablo oluşturulur: bolum → ogrenci → ders → ogretim_elemani → kayit.', 'topic': 'ddl'},
  {'t': 'DELETE satır siler (WHERE alır), TRUNCATE tüm satırları boşaltır (yapı kalır), DROP tabloyu siler.', 'topic': 'ddl'},
  {'t': 'VARCHAR(100) en fazla 100 karakter; DECIMAL(10,2) toplam 10 basamak, 2\'si ondalık.', 'topic': 'ddl'},
  {'t': 'INSERT\'te değer verilmeyen sütun DEFAULT\'u, DEFAULT yoksa NULL\'u alır.', 'topic': 'insert'},
  {'t': 'UPDATE/DELETE\'te WHERE unutulursa bütün satırlar etkilenir.', 'topic': 'insert'},
  {'t': 'NULL kontrolü `IS NULL` ile; `= NULL` hiçbir satır getirmez. COUNT(*) NULL satırı sayar, COUNT(sütun) saymaz.', 'topic': 'sorgu'},
  {'t': 'LIKE: `%` sıfır ya da çok karakter, `_` tam bir karakter. BETWEEN sınırları dahil eder.', 'topic': 'sorgu'},
  {'t': 'WHERE satırları, HAVING grupları filtreler.', 'topic': 'sorgu'},
  {'t': 'GRANT/REVOKE = DCL, COMMIT/ROLLBACK = TCL, CREATE/ALTER/DROP/TRUNCATE = DDL.', 'topic': 'gruplar'},
]

TOPIC_RULES = {
  'giris': 'Veri ham ve tek başına anlamsız; bilgi verinin işlenip anlam kazanmış hâli. Dosya tabanlı sistemlerin 6 sorunu: tekrar, tutarsızlık, güncelleme zorluğu, eş zamanlı erişim, güvenlik/yetki, yedekleme/kurtarma. Excel veritabanı değildir.',
  'dbms': 'Veritabanı veri topluluğu, DBMS onu yöneten yazılım. MySQL DBMS, phpMyAdmin/HeidiSQL arayüz, SQL dil. RDBMS tablo kullanır, NoSQL (MongoDB) doküman. İlişkisel modelin temeli Edgar F. Codd.',
  'buyukveri': '5V: Volume hacim (YouTube), Velocity hız (kredi kartı), Variety çeşitlilik (video, ses, GPS), Veracity doğruluk (bileklik nabız 200), Value değer (Spotify). Büyük veri teknolojileri geleneksel veritabanlarının rakibi değil, tamamlayıcısıdır.',
  'er': 'Dikdörtgen varlık, elips öznitelik, elmas ilişki, altı çizili PK. "Birden fazla olabilir mi?" sorusunu iki yönde sor: iki evet N:N, bir evet 1:N, iki hayır 1:1.',
  'festival': 'FESTİVAL (1) — katılır — SANATCI (N): hoca aynı gün/saat varsayımıyla 1:N kurdu, FK SANATCI\'ya (FESTIVAL_ID). SANATCI (M) — çıkar — SAHNE (N): çoka çok, ara tablo ÇIKAR (ID, SANATCI_ID, SAHNE_ID).',
  'anahtar': 'PK benzersiz ve NULL olamaz; FK başka tablonun anahtarına bağlanır ve referans bütünlüğünü korur. 1:N\'de FK çok tarafına, N:N\'de iki FK\'li ara tabloya. NOT NULL boş bırakmayı, UNIQUE tekrarı engeller; DEFAULT varsayılanı yazar.',
  'ddl': 'DDL yapıyla ilgilenir: CREATE, ALTER, DROP, TRUNCATE. DROP tabloyu siler, TRUNCATE yapıyı koruyup kayıtları boşaltır, DELETE (DML) koşullu satır siler. Önce bağımsız tablolar oluşturulur.',
  'insert': 'INSERT INTO tablo (sütunlar) VALUES (değerler): sayı ve sıra eşleşmeli. Değer verilmeyen sütun DEFAULT\'u, yoksa NULL\'u alır. Tarih \'YYYY-MM-DD\'. Çok satırda satırlar virgülle ayrılır. UPDATE/DELETE\'te WHERE yoksa tüm satırlar etkilenir.',
  'sorgu': 'SELECT ne, FROM nereden, WHERE hangi satırlar, GROUP BY grupla, HAVING grubu filtrele, ORDER BY sırala (ASC artan, DESC azalan). NULL için IS NULL; COUNT(sütun) ve AVG NULL\'ları saymaz. LIKE: % çok, _ tek karakter.',
  'gruplar': 'DDL yapı (CREATE, ALTER, DROP, TRUNCATE), DML veri (INSERT, UPDATE, DELETE), DQL sorgu (SELECT), DCL yetki (GRANT, REVOKE), TCL işlem (COMMIT, ROLLBACK, SAVEPOINT). CRUD: Create = INSERT.',
}
