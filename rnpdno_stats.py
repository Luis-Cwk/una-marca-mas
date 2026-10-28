import csv, sys
from collections import Counter

path = r"C:\Users\petra\agenteX\hf26-ofrenda\data.csv"

# Solo esquema y agregados. Nunca se imprimen filas.
with open(path, encoding="utf-8", newline="", errors="replace") as f:
    reader = csv.DictReader(f)
    cols = reader.fieldnames
    print("columnas:", cols)

    n = 0
    ids = set()
    estatus = Counter()
    entidad = Counter()
    years = Counter()
    sexo = Counter()
    origen = Counter()
    sin_fecha = 0

    for r in reader:
        n += 1
        ids.add(r.get("ID_VICTIMA"))
        estatus[(r.get("ESTATUS_VICTIMA") or "").strip()[:40]] += 1
        entidad[(r.get("ENTIDAD") or "").strip()[:40]] += 1
        sexo[(r.get("SEXO") or "").strip()[:12]] += 1
        origen[(r.get("ORIGEN_REPORTE") or "").strip()[:40]] += 1
        f = (r.get("FECHA_DESAPARICION") or "").strip()
        if not f:
            f = (r.get("FECHA_REGISTRO") or "").strip()
            sin_fecha += 1
        y = f[:4]
        if y.isdigit():
            years[int(y)] += 1

    print("filas:", n, "ids unicos:", len(ids))
    print("estatus:", estatus.most_common(8))
    print("sexo:", sexo.most_common(4))
    print("origen:", origen.most_common(6))
    print("entidades:", entidad.most_common(10))
    print("rango anios:", min(years), max(years))
    print("ultimos anios:", sorted(years.items())[-8:])
    print("filas sin fecha de desaparicion (se uso registro):", sin_fecha)
