import fs from "node:fs";

const MODEL = "gemma4:e4b";
const HOST = "http://localhost:11434";

const SYS = `Recibes tres recuerdos de una persona que murio. Devuelve SOLO un objeto JSON, sin texto alrededor, con esta forma exacta:
{"titulo":"...","frase":"...","estribillo":"..."}
Reglas:
- "frase": una sola oracion de maximo 35 palabras. Debe incluir, sin cambiar ni una palabra, al menos dos de los tres recuerdos. Si los tres caben en la frase, incluye los tres. Nunca recortes ni resumas un recuerdo: o va completo o no va. Solo puedes agregar conectores: y, mientras, porque, aunque, todavia, cuando.
- "titulo": dos a cuatro palabras, todas tomadas de los recuerdos. No inventes ninguna.
- "estribillo": una palabra o una frase de dos palabras tomada literalmente de los recuerdos.
- Prohibido agregar hechos, objetos, lugares, olores o personas que no esten en los recuerdos.
- Espanol de Mexico. Sin comillas dentro de los valores, sin punto final en la frase.`;

const STOP = new Set(["de", "la", "el", "los", "las", "un", "una", "y", "o", "que", "en", "con", "por", "para", "su", "sus", "al", "del", "se", "lo", "le", "mi", "mis", "tu", "tus", "era", "fue", "es", "muy", "mas", "menos", "como", "cuando", "donde"]);
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => norm(s).split(/[^a-z0-9ñ]+/).filter((w) => w.length > 2 && !STOP.has(w));

function check(o, mems) {
  if (!o || !o.titulo || !o.frase || !o.estribillo) return { ok: false, why: "campos vacios" };
  const all = " " + norm(mems.join(" ")) + " ";
  const kept = mems.filter((m) => norm(o.frase).includes(norm(m))).length;
  const fraseOk = kept >= 2;
  const tw = words(o.titulo);
  const badTitle = tw.filter((w) => !all.includes(w));
  const tituloOk = tw.length >= 1 && badTitle.length === 0;
  const estOk = all.includes(norm(o.estribillo));
  const why = [];
  if (!fraseOk) why.push(`frase conserva ${kept}/3`);
  if (!tituloOk) why.push(`titulo inventa: ${badTitle.join(", ") || "vacio"}`);
  if (!estOk) why.push("estribillo no literal");
  return { ok: fraseOk && tituloOk && estOk, why: why.join("; "), kept };
}

const CASOS = [
  ["abuela cocina", ["Hacía tortillas mientras cantaba rancheras", "Perdía los lentes y aparecían en el refri", "Me enseñó a remendar ropa"]],
  ["tía cine", ["Guardaba los boletos del cine en una caja de galletas", "Bailaba cumbias descalza en la cocina", "Me prestaba su bicicleta sin decirle a nadie"]],
  ["vecino plantas", ["Sembraba cilantro en latas de café", "Hablaba con los perros de la calle", "Cortaba el pelo de sus nietos en el patio"]],
  ["mamá mañana", ["Ponía el despertador a las 5:30", "Tomaba café con la vecina en la banqueta", "Escuchaba el radio mientras planchaba"]],
  ["papá coche", ["Lavaba el carro los sábados", "Gritaba los goles solo en la sala", "Arreglaba su reloj con un desarmador"]],
  ["hija niña", ["Guardaba mis dientes de leche en un sobre", "Me dibujaba vestidos en las servilletas", "Leía cuentos con voces distintas"]],
  ["hermano música", ["Tocaba la guitarra sin saber acordes", "Me llevaba en su moto sin casco", "Contaba chistes malos hasta que daba pena"]],
  ["madre costura", ["Remendaba la ropa antes de que se rompiera", "Regateaba en el mercado como si fuera deporte", "Rezaba en voz baja cuando alguien se enfermaba"]],
  ["amigo barrio", ["Nos quedábamos hasta el cierre del bar", "Prestaba discos que nunca volvían", "Caminaba las mismas calles sin rumbo"]],
  ["abuelo campo", ["Sembraba milpa con las manos", "Hablaba con los caballos por su nombre", "Usaba un sombrero que ya no tenía forma"]],
  ["maestra escuela", ["Escribía con tiza hasta que se acababa", "Dictaba con voz de milita", "Traía flores cortadas del jardín"]],
  ["número exacto", ["Ponía el despertador a las 5:30", "Compraba siempre 3 kilos de tortilla", "Contaba el cambio del camión dos veces"]],
  ["nombre propio", ["Decía que Juárez era su santo", "Tenía un cuadro de la Virgen en la cocina", "Bendecía la casa cada enero"]],
  ["acentos", ["Hacía mole los domingos", "Cantaba “Amor eterno” en los cumpleaños", "Decía que el café debía estar hirviendo"]],
  ["frase larga", ["Guardaba los audios de mi abuela en un celular viejo que ya no tiene batería", "Anotaba los números de teléfono en un cuaderno de taquigrafía", "Nunca contestaba el teléfono después de las ocho de la noche"]],
  ["una palabra", ["Silbaba", "Fumaba en la ventana", "Dormía con la televisión prendida"]],
  ["dichos", ["Decía “órale pues” cuando se despedía", "Llamaba “mi reina” a todas sus sobrinas", "Contaba la misma historia de la inundación"]],
  ["digital", ["Mandaba audios de una hora por WhatsApp", "Grababa la novela para verla después", "Tenía una carpeta con fotos repetidas"]],
  ["cocina domingo", ["Hacía arroz con leche para todos", "Se quemaba los dedos y no decía nada", "Servía primero a los niños"]],
  ["cuerpo", ["Se pintaba las uñas de rojo", "Usaba el mismo perfume por veinte años", "Se peinaba frente al espejo del pasillo"]],
  ["parque", ["Se sentaba en la misma banca del parque", "Daba de comer a las palomas", "Regresaba antes de que oscureciera"]],
  ["trabajo", ["Cargaba cajas en el mercado", "Llegaba con las manos negras de grasa", "Guardaba las propinas en un bote de café"]],
  ["migración", ["Mandaba cartas desde Tijuana", "Ahorraba en dólares para la casa", "Llamaba cada domingo a la misma hora"]],
  ["enfermedad", ["Dejó una lista de pendientes en el refrigerador", "Se aprendió los nombres de sus medicinas", "Decía que no le dolía nada"]],
  ["mascota", ["Hablaba con el perro como si fuera gente", "Le daba de comer de su propio plato", "Lo llevaba al parque sin correa"]],
];

async function ask(mems) {
  const user = "Recuerdos:\n" + mems.map((m, i) => `${i + 1}. ${m}`).join("\n");
  const r = await fetch(HOST + "/api/chat", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, stream: false, think: false, format: "json",
      options: { temperature: 0.5, num_predict: 260 },
      messages: [{ role: "system", content: SYS }, { role: "user", content: user }],
    }),
  });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  const raw = ((j.message && j.message.content) || "").trim();
  const obj = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  return {
    titulo: String(obj.titulo || "").trim(),
    frase: String(obj.frase || "").trim().replace(/\.$/, ""),
    estribillo: String(obj.estribillo || "").trim(),
  };
}

const filas = [];
let okFirst = 0, okSecond = 0, totalMs = 0, keptTotal = 0;

for (const [nombre, mems] of CASOS) {
  let res = null, intento = 0, err = "";
  const t0 = Date.now();
  for (let k = 0; k < 2 && !res; k++) {
    intento = k + 1;
    try {
      const out = await ask(mems);
      const c = check(out, mems);
      if (c.ok) res = { ...out, kept: c.kept };
      else err = c.why;
    } catch (e) { err = "error: " + String(e).slice(0, 80); }
  }
  const ms = Date.now() - t0;
  totalMs += ms;
  if (res) {
    if (intento === 1) okFirst++; else okSecond++;
    keptTotal += res.kept;
    filas.push({ nombre, ok: true, intento, ms, kept: res.kept, titulo: res.titulo, frase: res.frase, estribillo: res.estribillo, err: "" });
  } else {
    filas.push({ nombre, ok: false, intento, ms, kept: 0, titulo: "", frase: "", estribillo: "", err });
  }
  console.log(`${filas.length}/25 ${nombre} ${res ? "ok" : "FALLA"} ${ms}ms ${err}`);
}

const total = filas.length;
const pass = okFirst + okSecond;

const md = [];
md.push("# Evaluación de la pieza con Gemma 4 e4b");
md.push("");
md.push(`Modelo: \`${MODEL}\` en Ollama, temperatura 0.5, formato JSON, mismo prompt y mismas verificaciones que la página.`);
md.push(`Casos: ${total}. Cada caso son tres recuerdos y se permiten dos intentos, igual que en la pieza.`);
md.push("");
md.push("## Resumen");
md.push("");
md.push("| Métrica | Valor |");
md.push("|---|---|");
md.push(`| Tarjetas válidas | ${pass}/${total} (${Math.round((100 * pass) / total)}%) |`);
md.push(`| A la primera | ${okFirst}/${total} |`);
md.push(`| Tras reintento | ${okSecond}/${total} |`);
md.push(`| Frase conserva 3 recuerdos | ${filas.filter((f) => f.kept === 3).length}/${total} |`);
md.push(`| Frase conserva 2 recuerdos | ${filas.filter((f) => f.kept === 2).length}/${total} |`);
md.push(`| Latencia media | ${Math.round(totalMs / total)} ms |`);
md.push("");
md.push("## Casos");
md.push("");
md.push("| Caso | Resultado | Intento | Recuerdos en la frase | ms | Título |");
md.push("|---|---|---|---|---|---|");
for (const f of filas) {
  md.push(`| ${f.nombre} | ${f.ok ? "válida" : "rechazada"} | ${f.intento} | ${f.kept} | ${f.ms} | ${f.titulo || "—"} |`);
}
md.push("");
md.push("## Fallos");
md.push("");
const fallos = filas.filter((f) => !f.ok);
if (!fallos.length) md.push("Ninguno.");
for (const f of fallos) md.push(`- **${f.nombre}**: ${f.err}`);
md.push("");
md.push("## Salidas completas");
md.push("");
for (const f of filas) {
  md.push(`### ${f.nombre}`);
  md.push("");
  if (f.ok) {
    md.push(`- Título: ${f.titulo}`);
    md.push(`- Frase: ${f.frase}`);
    md.push(`- Estribillo: ${f.estribillo}`);
  } else {
    md.push(`- Rechazada: ${f.err}`);
  }
  md.push("");
}

fs.writeFileSync("C:/Users/petra/agentex/hf26-ofrenda/eval-gemma4.md", md.join("\n"), "utf8");
console.log(`RESUMEN ${pass}/${total} primera=${okFirst} reintento=${okSecond} media=${Math.round(totalMs / total)}ms`);
