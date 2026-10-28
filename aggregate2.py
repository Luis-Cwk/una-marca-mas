import openpyxl, datetime, re
from collections import Counter

path = r"C:\Users\petra\agenteX\hf26-ofrenda\DesaparecidosMXFichas.xlsx"
wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
ws = wb["Hoja1"]
it = ws.iter_rows(min_row=1, values_only=True)
header = [str(h) for h in next(it)]

def find(p):
    for i, h in enumerate(header):
        if h.startswith(p):
            return i
    raise KeyError(p)

I_FEC, I_COND, I_MUN, I_EDAD = find("Fecha de Desaparici"), find("Condici"), find("Municipio"), find("Edad al Momento")

def g(r, i):
    return r[i] if i < len(r) else None

years = Counter()
formats = Counter()
mun = Counter()
cond_by_year = Counter()
ages_missing = []

for row in it:
    f = g(row, I_FEC)
    if isinstance(f, datetime.datetime):
        y = f.year
        formats["datetime"] += 1
    else:
        s = str(f)
        m = re.search(r"(19|20)\d{2}", s)
        y = int(m.group(0)) if m else None
        formats[re.sub(r"\d", "9", s)[:12]] += 1
    if y:
        years[y] += 1
        c = str(g(row, I_COND) or "").strip()[:12]
        cond_by_year[(y, c)] += 1
    mun[str(g(row, I_MUN) or "").strip()[:30]] += 1
    if str(g(row, I_COND) or "").strip().upper() == "NO APLICA":
        try:
            ages_missing.append(int(float(g(row, I_EDAD))))
        except Exception:
            pass

print("formatos de fecha:", formats.most_common(4))
print("rango anios:", min(years), max(years), "total con anio:", sum(years.values()))
print("por anio (ultimos):", sorted(years.items())[-10:])
print("municipios distintos:", len(mun), "top:", mun.most_common(8))
print("no localizados:", len(ages_missing), "edad promedio:", round(sum(ages_missing)/max(1,len(ages_missing)),1))
print("no localizados menores de 18:", sum(1 for a in ages_missing if a < 18))
