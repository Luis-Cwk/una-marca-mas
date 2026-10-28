const SYS = `Escribe UNA sola oracion de maximo 35 palabras en espanol de Mexico.
Debe incluir, sin cambiar ni una palabra, al menos dos de las frases que te doy.
Puedes agregar solo conectores: y, mientras, porque, aunque, todavia, cuando.
Prohibido agregar cualquier otro contenido. Sin comillas, sin punto final extra.`;

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

const cases = [
  ["Hacía tortillas mientras cantaba rancheras", "Perdía los lentes y aparecían en el refri", "Me enseñó a remendar ropa"],
  ["Guardaba los boletos del cine en una caja de galletas", "Bailaba cumbias descalza en la cocina", "Me prestaba su bicicleta sin decirle a nadie"],
  ["Sembraba cilantro en latas de café", "Hablaba con los perros de la calle", "Cortaba el pelo de sus nietos en el patio"],
];

for (const mems of cases) {
  const t0 = Date.now();
  try {
    const r = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "gemma4:e4b",
        stream: false,
        think: false,
        options: { temperature: 0.5, num_predict: 200 },
        messages: [
          { role: "system", content: SYS },
          { role: "user", content: "Frases:\n" + mems.map((m, i) => `${i + 1}. ${m}`).join("\n") },
        ],
      }),
    });
    const j = await r.json();
    if (!r.ok) {
      console.log(JSON.stringify({ ok: false, status: r.status, err: j }));
      continue;
    }
    const text = ((j.message && j.message.content) || "").trim().replace(/^["“]|["”]$/g, "").replace(/\.$/, "");
    console.log(JSON.stringify({
      ok: true,
      text,
      words: text.split(/\s+/).filter(Boolean).length,
      kept: mems.filter((m) => norm(text).includes(norm(m))).length,
      ms: Date.now() - t0,
    }));
  } catch (e) {
    console.log(JSON.stringify({ ok: false, error: String(e).slice(0, 200), ms: Date.now() - t0 }));
  }
}
