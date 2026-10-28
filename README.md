# Ofrenda / Dos archivos

Una pieza en dos mitades. De un lado, un modelo abierto que corre en tu máquina escribe una sola frase con los recuerdos que tú escribiste. Del otro, el archivo del Estado: 133,887 personas desaparecidas o no localizadas en México, sin un solo nombre.

## Cómo correrlo

1. Instala [Ollama](https://ollama.com) y descarga el modelo:

   ```
   ollama pull gemma4:e4b
   ```

2. Sirve la carpeta (no abras el archivo con doble clic, el navegador bloquea la llamada al modelo):

   ```
   py -m http.server 3000
   ```

3. Abre `http://localhost:3000`.

Sin Ollama la página sigue funcionando: el archivo del Estado y la sección del silencio no necesitan modelo, y la ofrenda personal muestra un ejemplo.

## Archivos

- `index.html`: la pieza completa.
- `datos.js`: agregados del RNPDNO, generados desde el CSV oficial. Los números del muro salen de aquí.
- `eval-gemma4.md`, `eval_gemma4.mjs`: evaluación del modelo, 25 casos con verificación, latencias y salidas completas.
- `post-draft.md`: borrador del post para el DEV Challenge Week 4.

El CSV original del RNPDNO (23 MB) y las herramientas que lo procesan no se incluyen en el repo; se descargan de la consulta pública (ver abajo) y `datos.js` ya trae los agregados que la pieza necesita.

## De dónde salen los números

`data.csv` viene de la consulta pública del Registro Nacional de Personas Desaparecidas y No Localizadas, publicada como datos abiertos. 133,887 registros, 1961 a 2025, corte al 1 de agosto de 2025.

- 79,881 desaparecidas
- 4,857 no localizadas
- 49,149 confidenciales, todas sin fecha

El campo de fecha usa `FECHA_DESAPARICION` y, cuando falta, `FECHA_REGISTRO`.

## La regla de la ofrenda personal

El modelo no puede inventar. Escribe una sola oración de máximo 35 palabras, tiene que reutilizar al menos dos recuerdos literales y solo puede agregar conectores. El código lo verifica en cada corrida, normalizando acentos y mayúsculas. Si falla dos veces, la frase se arma sin modelo y la tarjeta lo dice.

## Lo que la pieza no publica

Ningún dato personal. El repo no incluye el CSV de registros ni las 8,407 fichas de Jalisco con nombres completos (`DesaparecidosMXFichas.xlsx`), marcadas con autorización de información pública. No se publican porque no está confirmado su origen ni su fecha de corte, y una ficha vieja puede señalar como desaparecida a una persona que ya fue localizada. La capa de nombres está diseñada y detenida hasta tener respuesta de la institución que emite las cédulas.

De ese archivo tampoco se usan señas particulares, vestimenta, estatura, tez ni cabello.

## Créditos

Petra (Luis Betancourt), 2026. Hacktoberfest Open-Source AI Challenge, Week 4.
