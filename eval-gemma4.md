# Evaluación de la pieza con Gemma 4 e4b

Modelo: `gemma4:e4b` en Ollama, temperatura 0.5, formato JSON, mismo prompt y mismas verificaciones que la página.
Casos: 25. Cada caso son tres recuerdos y se permiten dos intentos, igual que en la pieza.

## Resumen

| Métrica | Valor |
|---|---|
| Tarjetas válidas | 25/25 (100%) |
| A la primera | 24/25 |
| Tras reintento | 1/25 |
| Frase conserva 3 recuerdos | 7/25 |
| Frase conserva 2 recuerdos | 18/25 |
| Latencia media | 2926 ms |

## Casos

| Caso | Resultado | Intento | Recuerdos en la frase | ms | Título |
|---|---|---|---|---|---|
| abuela cocina | válida | 1 | 2 | 2392 | Tortillas, lentes y ropa |
| tía cine | válida | 1 | 2 | 2856 | Boletos, cumbias y bicicleta |
| vecino plantas | válida | 1 | 2 | 2964 | Sembraba cilantro y cortaba |
| mamá mañana | válida | 1 | 2 | 2776 | Café con vecina |
| papá coche | válida | 1 | 2 | 2842 | Lavaba carro, gritaba goles |
| hija niña | válida | 1 | 2 | 2520 | Dibujaba vestidos en servilletas |
| hermano música | válida | 1 | 2 | 2650 | Guitarra, moto, chistes malos |
| madre costura | válida | 1 | 2 | 2973 | Regateaba en el mercado |
| amigo barrio | válida | 1 | 2 | 3112 | Caminaba las mismas calles |
| abuelo campo | válida | 1 | 2 | 2522 | Sombrero, milpa y caballos |
| maestra escuela | válida | 1 | 3 | 3222 | Tiza, voz, flores |
| número exacto | válida | 1 | 2 | 3193 | Despertador, tortilla, cambio |
| nombre propio | válida | 1 | 3 | 3292 | Juárez, Virgen, Enero |
| acentos | válida | 1 | 3 | 3212 | Mole, Café, Amor eterno |
| frase larga | válida | 1 | 2 | 3809 | Audios, cuaderno, teléfono |
| una palabra | válida | 1 | 3 | 2964 | Silbaba Fumaba Dormía |
| dichos | válida | 1 | 2 | 2712 | Mi reina, inundación |
| digital | válida | 1 | 3 | 3246 | Audios, novela y fotos |
| cocina domingo | válida | 1 | 2 | 2759 | Arroz con leche niños |
| cuerpo | válida | 1 | 2 | 2322 | Uñas de rojo, perfume |
| parque | válida | 1 | 3 | 2776 | Banca del parque |
| trabajo | válida | 1 | 2 | 2353 | Cargaba cajas en mercado |
| migración | válida | 1 | 3 | 2979 | Cartas, dólares y domingo |
| enfermedad | válida | 1 | 2 | 2473 | Lista de pendientes, medicinas |
| mascota | válida | 2 | 2 | 4228 | Hablaba con el perro |

## Fallos

Ninguno.

## Salidas completas

### abuela cocina

- Título: Tortillas, lentes y ropa
- Frase: Hacía tortillas mientras cantaba rancheras y perdía los lentes y aparecían en el refri
- Estribillo: cantaba rancheras

### tía cine

- Título: Boletos, cumbias y bicicleta
- Frase: Guardaba los boletos del cine en una caja de galletas y bailaba cumbias descalza en la cocina
- Estribillo: sin decirle a nadie

### vecino plantas

- Título: Sembraba cilantro y cortaba
- Frase: Sembraba cilantro en latas de café mientras cortaba el pelo de sus nietos en el patio
- Estribillo: en el patio

### mamá mañana

- Título: Café con vecina
- Frase: Tomaba café con la vecina en la banqueta y escuchaba el radio mientras planchaba
- Estribillo: Tomaba café

### papá coche

- Título: Lavaba carro, gritaba goles
- Frase: Lavaba el carro los sábados y gritaba los goles solo en la sala
- Estribillo: Gritaba los goles

### hija niña

- Título: Dibujaba vestidos en servilletas
- Frase: Me dibujaba vestidos en las servilletas y leía cuentos con voces distintas
- Estribillo: voces distintas

### hermano música

- Título: Guitarra, moto, chistes malos
- Frase: Tocaba la guitarra sin saber acordes y me llevaba en su moto sin casco
- Estribillo: chistes malos

### madre costura

- Título: Regateaba en el mercado
- Frase: Regateaba en el mercado como si fuera deporte y rezaba en voz baja cuando alguien se enfermaba
- Estribillo: como si fuera deporte

### amigo barrio

- Título: Caminaba las mismas calles
- Frase: Caminaba las mismas calles sin rumbo mientras nos quedábamos hasta el cierre del bar
- Estribillo: sin rumbo

### abuelo campo

- Título: Sombrero, milpa y caballos
- Frase: Sembraba milpa con las manos y hablaba con los caballos por su nombre
- Estribillo: por su nombre

### maestra escuela

- Título: Tiza, voz, flores
- Frase: Escribía con tiza hasta que se acababa y dictaba con voz de milita mientras traía flores cortadas del jardín
- Estribillo: voz de milita

### número exacto

- Título: Despertador, tortilla, cambio
- Frase: Ponía el despertador a las 5:30 y compraba siempre 3 kilos de tortilla
- Estribillo: 3 kilos

### nombre propio

- Título: Juárez, Virgen, Enero
- Frase: Decía que Juárez era su santo y tenía un cuadro de la Virgen en la cocina mientras bendecía la casa cada enero
- Estribillo: Bendecía la casa

### acentos

- Título: Mole, Café, Amor eterno
- Frase: Hacía mole los domingos y decía que el café debía estar hirviendo mientras cantaba “Amor eterno” en los cumpleaños
- Estribillo: Amor eterno

### frase larga

- Título: Audios, cuaderno, teléfono
- Frase: Anotaba los números de teléfono en un cuaderno de taquigrafía mientras guardaba los audios de mi abuela en un celular viejo que ya no tiene batería
- Estribillo: celular viejo

### una palabra

- Título: Silbaba Fumaba Dormía
- Frase: Silbaba mientras fumaba en la ventana y dormía con la televisión prendida
- Estribillo: Televisión prendida

### dichos

- Título: Mi reina, inundación
- Frase: Llamaba mi reina a todas sus sobrinas cuando contaba la misma historia de la inundación
- Estribillo: órale pues

### digital

- Título: Audios, novela y fotos
- Frase: Mandaba audios de una hora por WhatsApp y grababa la novela para verla después, aunque tenía una carpeta con fotos repetidas
- Estribillo: fotos repetidas

### cocina domingo

- Título: Arroz con leche niños
- Frase: Hacía arroz con leche para todos y servía primero a los niños
- Estribillo: Servía primero

### cuerpo

- Título: Uñas de rojo, perfume
- Frase: Se pintaba las uñas de rojo mientras usaba el mismo perfume por veinte años
- Estribillo: mismo perfume

### parque

- Título: Banca del parque
- Frase: Se sentaba en la misma banca del parque y daba de comer a las palomas mientras regresaba antes de que oscureciera
- Estribillo: Daba de comer

### trabajo

- Título: Cargaba cajas en mercado
- Frase: Cargaba cajas en el mercado y llegaba con las manos negras de grasa
- Estribillo: bote de café

### migración

- Título: Cartas, dólares y domingo
- Frase: Mandaba cartas desde Tijuana y llamaba cada domingo a la misma hora porque ahorraba en dólares para la casa
- Estribillo: a la misma hora

### enfermedad

- Título: Lista de pendientes, medicinas
- Frase: Dejó una lista de pendientes en el refrigerador y se aprendió los nombres de sus medicinas
- Estribillo: no le dolía nada

### mascota

- Título: Hablaba con el perro
- Frase: Hablaba con el perro como si fuera gente y lo llevaba al parque sin correa
- Estribillo: sin correa
