"""Soru tanım yardımcıları + sqlite3 doğrulayıcı.
Her soru bir dict; 'chk' alanı sadece doğrulama içindir, siteye yazılmaz.

Örnek veritabanları (FIX) MySQL yazımıyla tutulur; lite() sqlite'a çevirir:
INT AUTO_INCREMENT → INTEGER, CREATE DATABASE/USE atlanır, TRUNCATE → DELETE,
CURRENT_DATE() → CURRENT_DATE, VALUES (..., DEFAULT) → o sütun hiç yazılmaz."""
import random, re, sqlite3, textwrap

Q = []                      # (topic, dict)
_cur = {'topic': None}


def topic(tid):
    _cur['topic'] = tid


def dd(s):
    return textwrap.dedent(s).strip('\n')


def _add(d):
    d['topic'] = _cur['topic']
    Q.append((_cur['topic'], d))
    return d


# ---------------- örnek veritabanları ----------------
FIX = {
    'ogr': '''
CREATE TABLE Ogrenci (
  id INT PRIMARY KEY,
  ad VARCHAR(50) NOT NULL,
  yas INT,
  sehir VARCHAR(50)
);
INSERT INTO Ogrenci (id, ad, yas, sehir) VALUES
  (1, 'Ayşe', 20, 'Ankara'),
  (2, 'Ali', 17, 'İzmir'),
  (3, 'Ay', 22, 'Ankara'),
  (4, 'Can', NULL, 'Bursa'),
  (5, 'Ece', 19, 'İzmir');
''',
    'urun': '''
CREATE TABLE Urun (
  urun_id INT PRIMARY KEY,
  ad VARCHAR(50) NOT NULL,
  kategori VARCHAR(30),
  fiyat DECIMAL(10,2),
  stok INT
);
INSERT INTO Urun VALUES
  (1, 'Kalem', 'Kırtasiye', 10, 100),
  (2, 'Defter', 'Kırtasiye', 25, 40),
  (3, 'Silgi', 'Kırtasiye', 5, NULL),
  (4, 'Çay', 'Market', 30, 60),
  (5, 'Kahve', 'Market', 80, 20),
  (6, 'Su', 'Market', 5, 200);
''',
    'fest': '''
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
  festival_id INT,
  FOREIGN KEY (festival_id) REFERENCES festival(id)
);
CREATE TABLE sahne (
  id INT PRIMARY KEY,
  adi VARCHAR(100) NOT NULL,
  tarih DATE,
  adres VARCHAR(150)
);
CREATE TABLE cikar (
  id INT PRIMARY KEY,
  sanatci_id INT,
  sahne_id INT,
  FOREIGN KEY (sanatci_id) REFERENCES sanatci(id),
  FOREIGN KEY (sahne_id) REFERENCES sahne(id)
);
INSERT INTO festival VALUES
  (1, 'ABC FESTİVALİ', '2000-01-01', 'AFYON'),
  (2, 'BCD FESTİVALİ', '2000-02-02', 'BURDUR'),
  (3, 'CDE FESTİVALİ', '2000-03-03', 'MANİSA');
INSERT INTO sanatci VALUES
  (1, 'AA AA', 'POP', 1),
  (2, 'BB BB', 'CAZ', 1),
  (3, 'CC CC', 'ROCK', 2),
  (4, 'DD DD', 'POP', 3);
INSERT INTO sahne VALUES
  (1, 'POP RÜZGARI', '2000-01-01', 'AFYON UZUN ÇARŞI'),
  (2, 'DUAYENLERE SAYGI', '2000-01-01', 'AFYON MİRİMOĞLU KONAĞI'),
  (3, '90''LAR', '2000-01-01', 'AFYON AKÜ KONGRE MERKEZİ'),
  (4, 'AKŞAM ESİNTİSİ', '2000-02-02', 'BURDUR MERKEZ ÇARŞI'),
  (5, 'SABAHIN GETİRDİKLERİ 1', '2000-03-03', 'MANİSA GİRİŞ ÇARŞI'),
  (6, 'SABAHIN GETİRDİKLERİ 2', '2000-03-03', 'MANİSA ÇIKIŞ ÇARŞI');
INSERT INTO cikar VALUES (1, 1, 1), (2, 1, 3), (3, 2, 1);
''',
    'gorev': '''
CREATE TABLE IF NOT EXISTS gorevler (
   gorev_id INT AUTO_INCREMENT,
   baslik VARCHAR(255) NOT NULL,
   baslamatarihi DATE,
   bitistarihi DATE,
   oncelik TINYINT NOT NULL DEFAULT 3,
   aciklama TEXT,
   PRIMARY KEY (gorev_id)
);
''',
    'uni': '''
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
);
INSERT INTO bolum VALUES (1, 'Bilgisayar Programcılığı'), (2, 'Büyük Veri');
INSERT INTO ogrenci VALUES (1, 'Ali', 'Yılmaz', 1), (2, 'Ayşe', 'Demir', 2), (3, 'Mehmet', 'Kaya', 1);
INSERT INTO ders VALUES (10, 'Veritabanı Teknolojileri', 4), (20, 'Python', 3);
INSERT INTO kayit VALUES (1, 10), (1, 20), (2, 10);
''',
}
FIX['ogrbos'] = FIX['ogr'].split('INSERT')[0]   # sadece tablo


# ---------------- MySQL → sqlite çevirisi ----------------
def split_sql(src):
    """Noktalı virgüle göre böl; tırnak içindeki ; ve -- yorumları korunur."""
    out, cur, q, i = [], '', False, 0
    while i < len(src):
        ch = src[i]
        if not q and src.startswith('--', i):
            j = src.find('\n', i)
            j = len(src) if j < 0 else j
            i = j
            continue
        if ch == "'":
            q = not q
        if ch == ';' and not q:
            if cur.strip(): out.append(cur.strip())
            cur = ''
        else:
            cur += ch
        i += 1
    if cur.strip(): out.append(cur.strip())
    return out


def _top_split(s):
    parts, depth, q, cur = [], 0, False, ''
    for ch in s:
        if ch == "'": q = not q
        if not q and ch == '(': depth += 1
        if not q and ch == ')': depth -= 1
        if ch == ',' and depth == 0 and not q:
            parts.append(cur.strip()); cur = ''
        else:
            cur += ch
    parts.append(cur.strip())
    return parts


def lite(stmt):
    u = stmt.upper().lstrip()
    if u.startswith(('CREATE DATABASE', 'USE ', 'DROP DATABASE')):
        return None
    s = re.sub(r'\bINT\s+AUTO_INCREMENT\b', 'INTEGER', stmt, flags=re.I)
    s = re.sub(r'\bTRUNCATE\s+TABLE\b', 'DELETE FROM', s, flags=re.I)
    s = re.sub(r'\bCURRENT_DATE\(\)', 'CURRENT_DATE', s, flags=re.I)
    s = re.sub(r'^\s*START\s+TRANSACTION', 'BEGIN', s, flags=re.I)
    s = re.sub(r'\bVALUE\b', 'VALUES', s)      # MySQL VALUE = VALUES
    m = re.match(r'(?is)\s*INSERT\s+INTO\s+(\w+)\s*\(([^)]*)\)\s*VALUES\s*\((.*)\)\s*$', s)
    if m and re.search(r'\bDEFAULT\b', m.group(3), re.I) and '),' not in m.group(3).replace(' ', ''):
        cols, vals = _top_split(m.group(2)), _top_split(m.group(3))
        keep = [(c, v) for c, v in zip(cols, vals) if v.upper() != 'DEFAULT']
        s = 'INSERT INTO %s (%s) VALUES (%s)' % (m.group(1), ', '.join(c for c, _ in keep), ', '.join(v for _, v in keep))
    return s


class SqlError(Exception):
    pass


def run(fixtures, sql):
    """fixtures + sql çalıştırılır; son SELECT'in satırları döner."""
    con = sqlite3.connect(':memory:')
    con.execute('PRAGMA foreign_keys = ON')
    con.isolation_level = None          # BEGIN/COMMIT/ROLLBACK elle
    last = None
    try:
        for f in ([fixtures] if isinstance(fixtures, str) else (fixtures or [])):
            for st in split_sql(FIX[f]):
                st = lite(st)
                if st: con.execute(st)
        for st in split_sql(sql):
            st = lite(st)
            if not st: continue
            cur = con.execute(st)
            if cur.description: last = cur.fetchall()
    except sqlite3.Error as e:
        raise SqlError(str(e))
    finally:
        con.close()
    return last


def fv(v):
    if v is None: return 'NULL'
    if isinstance(v, float):
        if v.is_integer(): return str(int(v))
        return ('%.2f' % v).rstrip('0').rstrip('.')
    return str(v)


def fmt_rows(rows):
    if rows is None: return '(sonuç yok)'
    if not rows: return '(boş)'
    return ', '.join(' / '.join(fv(x) for x in r) for r in rows)


def norm(s):
    return re.sub(r'\s+', ' ', str(s)).strip()


def table_of(fixture, name, cols=None):
    """Sitede gösterilecek küçük tablo, örnek veritabanından birebir üretilir."""
    con = sqlite3.connect(':memory:')
    for st in split_sql(FIX[fixture]):
        st = lite(st)
        if st: con.execute(st)
    cur = con.execute('SELECT %s FROM %s' % (', '.join(cols) if cols else '*', name))
    head = [d[0] for d in cur.description]
    rows = [[fv(x) for x in r] for r in cur.fetchall()]
    con.close()
    return {'cap': '**%s** tablosu' % name, 'head': head, 'rows': rows}


# ---------------- soru tanımları ----------------
def mc(q, opts, a, exp, code=None, why=None, src=None, fixed=False, db=None, show=None,
       sql=None, blank=None, expect=None, fmt=None, err=None, tbl=None, errmsg=None):
    """sql='SELECT …'  → db üzerinde çalışır; sonuç opts[a] ile aynı, diğer şıklardan farklı olmalı
       blank=True     → code içindeki ____ yerine her şık konur; doğru şık çalışıp expect'i vermeli,
                        yanlış şıklar ya hata vermeli ya da farklı sonuç vermeli
       blank='fail'   → tersi: sadece doğru şık hata vermeli (ör. kısıtı ihlal eden INSERT)
       err=True/False → code hata vermeli / vermemeli
       errmsg='CHECK' → beklenen hata mesajında bu geçmeli (hata başka sebepten çıkmasın)
       show=['Ogrenci'] → bu tablolar örnek veritabanından alınıp soruda gösterilir"""
    d = {'type': 'mc', 'q': q, 'opts': list(opts), 'a': a, 'exp': exp}
    if code is not None: d['code'] = dd(code)
    if why: d['why'] = why
    if src: d['src'] = src
    t = [table_of(db, n) for n in (show or [])] + ([tbl] if tbl else [])
    if t: d['tbl'] = t
    d['chk'] = {'db': db, 'sql': sql, 'blank': blank, 'expect': expect, 'fmt': fmt, 'err': err, 'fixed': fixed, 'errmsg': errmsg}
    return _add(d)


def fill(q, code, ans, exp, db=None, show=None, expect=None, then=None, whyFill=None, cs=False,
         nocheck=False, wrong=None, err=False):
    """code içindeki ____ her kabul edilen cevapla doldurulup çalıştırılır.
       then: ek sorgu (sitede görünmez); expect: son SELECT'in sonucu.
       wrong: bu cevaplar ya hata vermeli ya da expect'ten farklı sonuç vermeli."""
    d = {'type': 'fill', 'q': q, 'code': dd(code), 'ans': list(ans), 'cs': cs, 'exp': exp}
    if whyFill: d['whyFill'] = whyFill
    t = [table_of(db, n) for n in (show or [])]
    if t: d['tbl'] = t
    d['chk'] = {'db': db, 'expect': expect, 'then': then, 'nocheck': nocheck, 'wrong': wrong or [], 'err': err}
    return _add(d)


def code(title, q, src, blanks, exps, db=None, then=None, expect=None, note=None, show=None):
    d = {'type': 'code', 'title': title, 'q': q, 'code': dd(src), 'blanks': [list(b) for b in blanks], 'exps': exps}
    if note: d['note'] = note
    t = [table_of(db, n) for n in (show or [])]
    if t: d['tbl'] = t
    d['chk'] = {'db': db, 'then': then, 'expect': expect}
    return _add(d)


# ---------------- doğrulama ----------------
def _try(db, sql):
    try:
        return True, run(db, sql)
    except SqlError as e:
        return False, str(e)


def verify(d):
    t, c, errs = d['type'], d['chk'], []
    F = c.get('fmt') or fmt_rows
    if t == 'mc':
        if c['sql']:
            ok, res = _try(c['db'], c['sql'])
            if not ok: errs.append('sorgu hata: ' + res)
            else:
                got = norm(F(res))
                if got != norm(d['opts'][d['a']]): errs.append('sonuç %r, doğru şık %r' % (got, d['opts'][d['a']]))
                for k, o in enumerate(d['opts']):
                    if k != d['a'] and norm(o) == got: errs.append('yanlış şık da doğru: %r' % o)
        if c['blank']:
            for k, o in enumerate(d['opts']):
                ok, res = _try(c['db'], d['code'].replace('____', o))
                good = ok and (c['expect'] is None or norm(F(res)) == norm(c['expect']))
                if c['blank'] == 'fail':                    # doğru şık: hata veren komut
                    good = not ok and (not c.get('errmsg') or c['errmsg'] in res)
                if k == d['a'] and not good: errs.append('doğru şık çalışmadı: %r → %s' % (o, res if not ok else F(res)))
                if k != d['a'] and good: errs.append('yanlış şık da çalışıyor: %r' % o)
        if c['err'] is not None:
            ok, res = _try(c['db'], d['code'])
            if c['err'] and ok: errs.append('hata vermeliydi')
            if c['err'] and not ok and c.get('errmsg') and c['errmsg'] not in res: errs.append('beklenmeyen hata: ' + res)
            if not c['err'] and not ok: errs.append('hata vermemeliydi: ' + res)
            if not c['err'] and ok and c['expect'] is not None and norm(F(res)) != norm(c['expect']):
                errs.append('sonuç %r, beklenen %r' % (F(res), c['expect']))
    elif t == 'fill':
        if not c['nocheck']:
            for a in d['ans']:
                src = d['code'].replace('____', a) + ('\n' + c['then'] if c['then'] else '')
                ok, res = _try(c['db'], src)
                if c['err']:
                    if ok: errs.append('%r ile hata beklendi' % a)
                elif not ok: errs.append('%r ile hata: %s' % (a, res))
                elif c['expect'] is not None and norm(F(res)) != norm(c['expect']):
                    errs.append('%r ile sonuç %r, beklenen %r' % (a, F(res), c['expect']))
            for w in c['wrong']:
                src = d['code'].replace('____', w) + ('\n' + c['then'] if c['then'] else '')
                ok, res = _try(c['db'], src)
                if ok and (c['expect'] is None or norm(F(res)) == norm(c['expect'])):
                    errs.append('yanlış cevap %r da çalışıyor' % w)
    elif t == 'code':
        def build(alt_i=None, alt=None):
            s = d['code']
            for j, b in enumerate(d['blanks']):
                s = s.replace('{{%d}}' % (j + 1), alt if j == alt_i else b[0])
            return s + ('\n' + c['then'] if c['then'] else '')
        ok, res = _try(c['db'], build())
        if not ok: errs.append('hata: ' + res)
        elif c['expect'] is not None and norm(F(res)) != norm(c['expect']):
            errs.append('sonuç %r, beklenen %r' % (F(res), c['expect']))
        for i, b in enumerate(d['blanks']):
            for alt in b[1:]:
                ok, res = _try(c['db'], build(i, alt))
                if not ok or (c['expect'] is not None and norm(F(res)) != norm(c['expect'])):
                    errs.append('alternatif %r çalışmadı' % alt)
    return errs


def shuffled(d, seed):
    """mc şıklarını tohumlu karıştır (fixed=True olanlar hariç)"""
    if d['type'] != 'mc' or d['chk'].get('fixed'): return d
    r = random.Random(seed)
    idx = list(range(len(d['opts']))); r.shuffle(idx)
    d = dict(d)
    d['opts'] = [d['opts'][i] for i in idx]
    d['a'] = idx.index(d['a'])
    if 'why' in d: d['why'] = {idx.index(int(k)): v for k, v in d['why'].items()}
    return d
