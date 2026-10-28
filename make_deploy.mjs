import fs from "node:fs";

const src = "C:/Users/petra/agentex/hf26-ofrenda/index-v5.html";
const dir = "C:/Users/petra/agentex/hf26-ofrenda/deploy";
fs.mkdirSync(dir, { recursive: true });

let s = fs.readFileSync(src, "utf8");

s = s.replace(
  'import * as THREE from "./three.module.min.js";',
  'import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js";'
);
s = s.replace(
  '<script src="tone.js"></script>',
  '<script src="https://cdn.jsdelivr.net/npm/tone@15.0.4/build/Tone.js"></script>'
);
s = s.replace(
  'online ? "" : "No hay modelo local. La pieza funciona, pero la frase se arma sin modelo."',
  'online ? "" : (location.protocol === "https:" ? "Versión publicada: el modelo corre en tu computadora, aquí la frase se arma sin él." : "No hay modelo local. La pieza funciona, pero la frase se arma sin modelo.")'
);

fs.writeFileSync(dir + "/index.html", s, "utf8");
fs.copyFileSync("C:/Users/petra/agentex/hf26-ofrenda/datos.js", dir + "/datos.js");

const bytes = fs.statSync(dir + "/index.html").size;
let bad = 0;
for (const c of s) if (c === "\uFFFD") bad++;
console.log("index.html bytes:", bytes, "reemplazos:", bad, "cdn three:", s.includes("cdn.jsdelivr.net/npm/three"), "cdn tone:", s.includes("tone@15"));
