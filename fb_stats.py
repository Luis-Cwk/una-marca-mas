import json, datetime
from collections import Counter

p = r"C:\Users\petra\Downloads\Meta\facebook\your_facebook_activity\posts\your_posts__check_ins__photos_and_videos_1.json"
data = json.load(open(p, encoding="utf-8"))
print("entradas:", len(data))
print("llaves de una entrada:", list(data[0].keys()))

years = Counter()
media = 0
texts = 0
for e in data:
    ts = e.get("timestamp")
    if ts:
        years[datetime.datetime.utcfromtimestamp(ts).year] += 1
    atts = e.get("attachments") or []
    for a in atts:
        d = a.get("data") or []
        media += len(d)
    if (e.get("title") or "").strip():
        texts += 1

print("rango:", min(years), max(years), "total con fecha:", sum(years.values()))
print("por anio:", sorted(years.items()))
print("adjuntos:", media, "entradas con texto:", texts)
