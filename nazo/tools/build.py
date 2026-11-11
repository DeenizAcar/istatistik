"""Doğrula + üret:  python build.py ..
1) Kitapçığın 50 sorusu ve 135 konu sorusu sqlite3 ile doğrulanır (lib.verify).
2) Konu özetlerindeki bütün CREATE/INSERT örnekleri aynı veritabanında sırayla çalıştırılır;
   res=True olan örneklerin 'Çıktı' kutusu sqlite sonucundan yazılır.
3) Şıklar tohumlu ve dengeli karıştırılır, 3 deneme vizesi konu havuzundan kurulur.
4) ../content.js ve ../questions.js yazılır. Hata varsa dosya yazılmaz."""
import json, os, random, re, sqlite3, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib
import kitapcik
import qs  # noqa: F401  (soruları lib.Q'ya ekler)
from content import TOPICS, TRAPS, TOPIC_RULES

dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
errors = 0
ids = [t['id'] for t in TOPICS]


def err(*a):
    global errors
    errors += 1
    print('✗', *a)


# ---------- 1. soruları doğrula ----------
for d in kitapcik.BOOK:
    for e in lib.verify(d): err(d['src'], d['q'][:60], '→', e)
for tid, d in lib.Q:
    for e in lib.verify(d): err(tid, d['type'], (d.get('q') or d.get('title'))[:60], '→', e)

key = ''.join('ABCD'[d['a']] for d in kitapcik.BOOK)
if key != kitapcik.KEY: err('kitapçık cevap anahtarı uyuşmuyor', key, kitapcik.KEY)
if len(kitapcik.BOOK) != 50: err('kitapçıkta 50 soru olmalı', len(kitapcik.BOOK))
for n, d in enumerate(kitapcik.BOOK, 1):
    if d['src'] != 'Kitapçık %d' % n: err('kitapçık sırası', n, d['src'])

# ---------- 2. özet kodlarını çalıştır ----------
def fresh(name):
    con = sqlite3.connect(':memory:'); con.isolation_level = None
    con.execute('PRAGMA foreign_keys = ON')
    for st in lib.split_sql(lib.FIX[name]):
        st = lib.lite(st)
        if st: con.execute(st)
    return con


def text_table(cols, rows):
    data = [cols] + [[lib.fv(x) for x in r] for r in rows]
    w = [max(len(r[i]) for r in data) for i in range(len(cols))]
    line = lambda r: ' | '.join(r[i].ljust(w[i]) for i in range(len(cols))).rstrip()
    out = [line(data[0]), '-+-'.join('-' * x for x in w)] + [line(r) for r in data[1:]]
    if not rows: out.append('(boş)')
    return '\n'.join(out)


shared = sqlite3.connect(':memory:'); shared.isolation_level = None
shared.execute('PRAGMA foreign_keys = ON')
nblocks = 0
for t in TOPICS:
    for b in t['blocks']:
        if b['t'] != 'code': continue
        ch = b.pop('_chk')
        if not ch['run']: continue
        nblocks += 1
        con = fresh(ch['db']) if ch['db'] else shared
        last = None
        try:
            for st in lib.split_sql(b['code']):
                st = lib.lite(st)
                if not st: continue
                m = re.match(r'\s*CREATE\s+TABLE\s+(\w+)', st, re.I)
                if m:   # aynı tablo özetlerde yeniden kuruluyorsa önce kaldır
                    con.execute('PRAGMA foreign_keys = OFF')
                    con.execute('DROP TABLE IF EXISTS %s' % m.group(1))
                    con.execute('PRAGMA foreign_keys = ON')
                cur = con.execute(st)
                if cur.description: last = ([x[0] for x in cur.description], cur.fetchall())
        except sqlite3.Error as e:
            err('ÖZET', t['id'], repr(b['code'][:50]), '→', e)
            continue
        if ch['res']:
            if not last: err('ÖZET', t['id'], 'sonuç yok', repr(b['code'][:50]))
            else: b['out'] = text_table(*last)
        if ch['db']: con.close()
print('özet kod blokları çalıştırıldı:', nblocks)

# ---------- 3. konu havuzu, karıştırma, denemeler ----------
TQ = {tid: [] for tid in ids}
for tid, d in lib.Q: TQ[tid].append(d)
counts = {tid: len(v) for tid, v in TQ.items()}
total = sum(counts.values())
if total != 135: err('konu sorusu 135 olmalı', total)
for tid, v in TQ.items():
    nf = sum(1 for d in v if d['type'] == 'fill')
    if not (10 <= len(v) <= 18): err(tid, 'soru sayısı', len(v))
    if not (1 <= nf <= 2): err(tid, 'boşluk sayısı', nf)
    for d in v:
        if d['type'] == 'mc' and len(d['opts']) != 5: err(tid, '5 şık olmalı', d['q'][:50])

# doğru şık konumu dengeli: hedef konumlar 0..4 döngüsü, tohumlu karıştırılır
mcs = [d for tid in ids for d in TQ[tid] if d['type'] == 'mc']
R = random.Random(20261111)
targets = [i % 5 for i in range(len(mcs))]; R.shuffle(targets)
place = {}
for d, tg in zip(mcs, targets): place[id(d)] = tg


def balanced(d, seed):
    if d['type'] != 'mc': return d
    r = random.Random(seed)
    others = [i for i in range(len(d['opts'])) if i != d['a']]; r.shuffle(others)
    order = others[:]; order.insert(place[id(d)], d['a'])
    d = dict(d)
    d['opts'] = [d['opts'][i] for i in order]
    d['a'] = order.index(d['a'])
    if 'why' in d: d['why'] = {order.index(int(k)): v for k, v in d['why'].items()}
    return d


def public(d):
    out = {k: v for k, v in d.items() if k != 'chk'}
    if out['type'] == 'code': out['blanks'] = [{'ans': b, 'cs': False} for b in out['blanks']]
    return out


OUT = {tid: [public(balanced(d, n * 7919 + 13)) for n, d in enumerate(TQ[tid])] for tid in ids}

# 3 deneme vizesi: her biri 16 test + 4 boşluk, konulara dengeli, denemeler arasında tekrar yok
DR = random.Random(27)
mc_pool = {tid: [q for q in OUT[tid] if q['type'] == 'mc'] for tid in ids}
fill_pool = {tid: [q for q in OUT[tid] if q['type'] == 'fill'] for tid in ids}
for tid in ids: DR.shuffle(mc_pool[tid]); DR.shuffle(fill_pool[tid])
EXAMS = []
order_idx = {tid: i for i, tid in enumerate(ids)}
for k in range(3):
    extra = {ids[(k * 6 + j) % 10] for j in range(6)}
    picks = []
    for tid in ids:
        for _ in range(2 if tid in extra else 1): picks.append(mc_pool[tid].pop())
    fills = [fill_pool[ids[(k * 4 + j) % 10]].pop() for j in range(4)]
    qs_ = sorted(picks, key=lambda q: order_idx[q['topic']]) + sorted(fills, key=lambda q: order_idx[q['topic']])
    assert len(qs_) == 20
    EXAMS.append({'id': 'deneme%d' % (k + 1), 'title': 'Deneme vizesi %d' % (k + 1),
                  'desc': '16 test + 4 boşluk doldurma, her konudan soru. 20 × 5 = 100 puan (format varsayım).',
                  'group': 'vize', 'mode': 'exam', 'questions': qs_})
seen = Counter((q['q'], q.get('code')) for e in EXAMS for q in e['questions'])
if max(seen.values()) > 1: err('denemeler arasında tekrar eden soru var')

book = [public(d) for d in kitapcik.BOOK]
EXAMS.insert(0, {'id': 'hoca', 'title': 'Çalışma kitapçığı · 50 soru',
                 'desc': 'Kitapçığın 50 sorusu birebir (şık sırası ve cevap harfleri aynı), cevap anahtarındaki gerekçelerle. Hocanın kesin sınav soruları değil.',
                 'featured': True, 'group': 'hoca', 'mode': 'practice', 'questions': book})

if errors:
    print('HATA:', errors, '→ dosyalar yazılmadı'); sys.exit(1)

# ---------- 4. yaz ----------
J = lambda x: json.dumps(x, ensure_ascii=False, indent=1)
course = {
  'id': 'nazo', 'lang': 'sql', 'storeKey': 'nazo-best', 'themeKey': 'nazo-theme',
  'date': '27.07',
  'reviewTitle': 'Genel Tekrar',
  'reviewLead': 'Hocanın 4 haftalık notu (giriş, ER, DDL, INSERT), **Festival planlama sorusu** ve çalışma kitapçığından 10 konu. Her konuda kısa özet, tablo, SQL örneği, **Tuzak** ve **Sınavda** kutuları var. SQL çıktıları sqlite ile çalıştırılarak yazıldı.',
  'formatTitle': 'Vize formatı (varsayım)',
  'formatNote': 'Hoca puan dağılımını vermedi. Burada **20 soru × 5 puan** varsayıldı: 16 çoktan seçmeli + 4 boşluk doldurma. Hoca formatı söylerse güncellenir.',
  'hocaLink': {'href': '#test/hoca', 'text': 'Kitapçığın 50 sorusunu çöz →'},
  'hocaTitle': 'Çalışma kitapçığı',
  'hocaNote': 'Kitapçık hocanın değil; hocanın notuna dayanan ek çalışma içeriği (hocanın kesin sınav soruları değil). Her soru anında kontrol edilir.',
  'points': {'mc': 5, 'fill': 5, 'code': 5},
  'randomMix': ['mc'] * 14 + ['fill'] * 4 + ['code'] * 2,
  'randomTitle': 'Rastgele vize (20 soru)',
  'randomDesc': 'Her açılışta 14 test + 4 boşluk + 2 kod tamamlama, 100 puan. Az gördüğün sorular önce gelir.',
  'codeDesc': 'Festival tabloları, kayıt ara tablosu, çoklu INSERT ve sanatçı–festival JOIN. Anında kontrol.',
  'testLead': 'Soru bankası: kitapçığın **50 sorusu** + **135 konu sorusu** (test, boşluk doldurma, kod tamamlama). Deneme ve rastgele vizeler 20 soru × 5 puan. Sorgu sonucu soran her soru **sqlite ile çalıştırılarak** doğrulandı.',
  'trapsLead': 'Yanlış şıkların çoğu bu tuzaklardan geliyor.',
}
fmt = [{'range': 'Soru 1–16', 'what': 'Çoktan seçmeli', 'big': '80', 'small': 'puan (16 × 5)'},
       {'range': 'Soru 17–20', 'what': 'Boşluk doldurma', 'big': '20', 'small': 'puan (4 × 5)'}]
open(os.path.join(dest, 'content.js'), 'w', encoding='utf8', newline='\n').write(
  '/* Nazo · Veritabanı Teknolojileri · konu özetleri. tools/build.py ile üretildi, elle düzenleme. */\n'
  'window.COURSE = ' + J(course) + ';\nwindow.EXAM_FORMAT = ' + J(fmt) + ';\nwindow.TRAPS = ' + J(TRAPS) +
  ';\nwindow.TOPICS = ' + J(TOPICS) + ';\nwindow.TOPIC_RULES = ' + J(TOPIC_RULES) + ';\n')
open(os.path.join(dest, 'questions.js'), 'w', encoding='utf8', newline='\n').write(
  '/* Kitapçık 50 + konu 135 soru, 3 deneme vizesi. Cevaplar sqlite3 ile doğrulandı. tools/build.py ile üretildi. */\n'
  'window.EXAMS = ' + J(EXAMS) + ';\nwindow.TOPIC_QUESTIONS = ' + J(OUT) + ';\nwindow.EXTRA_CODE = [];\n')

ty = Counter(q['type'] for v in OUT.values() for q in v)
pos = Counter(q['a'] for v in OUT.values() for q in v if q['type'] == 'mc')
print('konu:', counts)
print('tür:', dict(ty), '| doğru şık konumu:', dict(sorted(pos.items())), '| kitapçık:', len(book), '| toplam', total + len(book))
print('HATA: 0')
