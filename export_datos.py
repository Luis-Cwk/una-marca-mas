import csv, json
from collections import Counter, defaultdict

path = r"C:\Users\petra\agenteX\hf26-ofrenda\data.csv"
out = r"C:\Users\petra\agenteX\hf26-ofrenda\datos.json"

years = defaultdict(lambda: Counter())
estatus = Counter()
entidad = Counter()
total = 0
ids = []
ejemplo = None

with open(path, encoding="utf-8", newline="", errors="replace") as f:
    for r in csv.DictReader(f):
        total += 1
        st = (r.get("ESTATUS_VICTIMA") or "").strip().upper()
        estatus[st] += 1
        entidad[(r.get("ENTIDAD") or "").strip().upper()] += 1
        f_ = (r.get("FECHA_DESAPARICION") or "").strip() or (r.get("FECHA_REGISTRO") or "").strip()
        y = f_[:4]
        y = int(y) if y.isdigit() else 0
        years[y][st] += 1
        if len(ids) < 3:
            ids.append(r.get("ID_VICTIMA"))
        # un registro real de ejemplo, sin nombre porque el archivo no los tiene
        if ejemplo is None and y == 2024 and (r.get("ENTIDAD") or "").strip().upper() == "JALISCO" and st == "DESAPARECIDA":
            ejemplo = {
                "id": r.get("ID_VICTIMA"),
                "anio": y,
                "entidad": (r.get("ENTIDAD") or "").strip().upper(),
                "estatus": st,
            }

data = {
    "fuente": "Registro Nacional de Personas Desaparecidas y No Localizadas (RNPDNO), consulta pública",
    "url": "https://consultapublicarnpdno.segob.gob.mx/consulta",
    "corte": "2025-08-01",
    "total": total,
    "estatus": dict(estatus),
    "porAnio": {str(y): dict(c) for y, c in sorted(years.items())},
    "entidades": dict(entidad.most_common(32)),
    "ejemploIds": ids,
    "ejemplo": ejemplo,
}

with open(out, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

print("total", total)
print("estatus", estatus.most_common())
print("anios", len(years), "min", min(years), "max", max(years))
print("entidades", len(entidad))
print("ejemplo ids", ids)
print("bytes", len(json.dumps(data, ensure_ascii=False)))
