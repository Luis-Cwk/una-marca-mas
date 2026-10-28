import json

src = r"C:\Users\petra\agenteX\hf26-ofrenda\datos.json"
dst = r"C:\Users\petra\agenteX\hf26-ofrenda\datos.js"

data = json.load(open(src, encoding="utf-8"))
with open(dst, "w", encoding="utf-8") as f:
    f.write("window.DATOS = ")
    json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")
print("ok", len(open(dst, encoding="utf-8").read()))
