import openpyxl
from collections import Counter

path = r"C:\Users\petra\agenteX\hf26-ofrenda\DesaparecidosMXFichas.xlsx"
wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
ws = wb["Hoja1"]

it = ws.iter_rows(min_row=1, values_only=True)
header = [str(h) for h in next(it)]

def find(prefix):
    for i, h in enumerate(header):
        if h.startswith(prefix):
            return i
    raise KeyError(prefix)

I_AUTH = find("Autorizaci")
I_COND = find("Condici")
I_SEX = find("Sexo")
I_EST = find("Estado")
I_FEC = find("Fecha de Desaparici")
I_EDAD = find("Edad al Momento")
I_CED = find("Cedula")

def g(row, i):
    return row[i] if i < len(row) else None

auth, cond, sexo, estado, years, ages = Counter(), Counter(), Counter(), Counter(), Counter(), Counter()

for row in it:
    for counter, i in ((auth, I_AUTH), (cond, I_COND), (sexo, I_SEX), (estado, I_EST)):
        v = g(row, i)
        counter[str(v).strip()[:40] if v is not None else "None"] += 1
    f = str(g(row, I_FEC))
    years[f[:4] if f[:4].isdigit() else "sin fecha"] += 1
    ag = g(row, I_EDAD)
    try:
        ages[int(float(ag)) // 10 * 10] += 1
    except Exception:
        ages["n/d"] += 1

def top(c, n=12):
    return c.most_common(n)

print("autorizacion:", top(auth, 6))
print("condicion:", top(cond, 6))
print("sexo:", top(sexo, 6))
print("estado:", top(estado, 12))
print("anios:", sorted(((k, v) for k, v in years.items() if k.isdigit()), key=lambda x: x[0])[-12:])
print("decadas:", sorted(((k, v) for k, v in ages.items() if isinstance(k, int)), key=lambda x: x[0]))
print("total filas:", sum(years.values()))
