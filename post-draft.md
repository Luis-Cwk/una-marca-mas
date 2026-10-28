---
title: "Una marca más: 133,887 people, one sentence, and a machine that refuses"
published: false
tags: devchallenge, hf26challenge
---

*A submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

A black screen with 133,887 glowing records, grouped into flocks by year of disappearance and floating in a slow orbit. Each record is a person registered as disappeared or not located in Mexico's open data, ordered from 1961 to 2025. A third of them sits at the edge in a separate grey haze: 49,149 records marked confidential, all of them undated, with no name, no year of birth, nothing but an identifier.

The piece asks for three memories in three rounds, each one a small prompt: an object of theirs that still exists, a gesture they repeated, something they used to say. Then Gemma 4 e4b, Google's open-weight model running on your laptop, does four things at once: it reads the three memories, chooses a title of two to four words taken from them, writes one sentence using only your phrases plus connectors, and picks a refrain, a short fragment to repeat at the end. Then you press one button and the whole card shrinks into a point and falls into the archive, in the column for 2026. The counter goes from 133,887 to 133,888. The screen says: it is one more mark, it no longer stands out.

Then you ask the machine for a sentence for one of them, and the machine refuses.

## Demo

Live: [ofrenda.petrasynthetic.com](https://ofrenda.petrasynthetic.com/)

The hosted page cannot reach your local model, so there the card is composed from your words without the model, and the page says so. For the full experience, with Gemma writing, run it on your machine: `ollama pull gemma4:e4b`, then `py -m http.server 3000`, then open `http://localhost:3000`.

Video of the full local run, including the model composing live: attached to this post.

## Code

[github.com/Luis-Cwk/una-marca-mas](https://github.com/Luis-Cwk/una-marca-mas)

`index.html` plus `datos.js`, generated from the official CSV. No framework, no build step, one font. The raw CSV and the Jalisco file with names are not in the repository, on purpose.

## How I Built It

**The field.** `datos.js` is an aggregate export of the RNPDNO public dataset: 133,887 records, cut off on August 1, 2025. Nine lines of Python read the 23 MB CSV and write a 4 KB file with counts per year and per status. The canvas draws one 1px mark per record, x by year, height by count, with the confidential records behind the others in near-transparent grey. The dateless records go last, behind a thin line, because every single one of them is confidential.

**The sentence.** The model is asked for a small JSON object with three fields: a title of two to four words, a sentence of at most 35 words, and a refrain. The rules are the same for all three: every content word must come from the memories. JavaScript normalises accents and case and then checks each field separately: two memories must appear literally inside the sentence, every word of the title must exist in the memories, and the refrain must be a literal fragment. If any check fails, it retries once, and if it fails again the page composes the card without the model and says so. The first versions of the prompt produced beautiful Spanish about a grandmother's drum, a smell of fresh masa, a kitchen nobody described. That is the failure mode of every grief chatbot, and it is why the constraint lives in code.

**The examples are generated too.** There is no canned output. There are three example people, and their three memories are the only thing stored; the title, the sentence and the refrain you see in the demo are produced by Gemma at that moment, with the same checks. If the model is not running, the page says so and composes from the memories alone.

**The numbers.** I ran the model on 25 cases, each one three memories, with the same prompt and the same checks the page uses, two attempts allowed, temperature 0.5:

| Metric | Value |
|---|---|
| Valid cards | 25 / 25 |
| Valid on the first attempt | 24 / 25 |
| Needed the retry | 1 / 25 |
| Sentence used all three memories | 7 / 25 |
| Sentence used two memories (allowed) | 18 / 25 |
| Mean latency, warm, on a laptop 4070 | 2.9 s |
| Cold start, loading 5.5 GB into VRAM | about 30 s |

The cases were written to be awkward on purpose: a memory of one word, numbers, proper names, quotes, a 160 character memory, and three long memories in the same card. The retry happened on the longest one. During development the guard also rejected a title that said "militar" when the memory said "milita": one letter, and the card was rebuilt. That rejection is the point of the whole piece.

**The gesture.** Releasing the sentence is fifteen lines of CSS transition. The dot travels to the border of the archive, the counter increments, the flash lasts a second. It is the only moment of animation in the piece.

**The sound** is generative, built with Tone.js: six detuned oscillators, pink noise, a lowpass filter driven by slow LFOs, distortion and a fifteen second reverb. A scheduler mutates one parameter every seven to sixteen seconds, so the atmosphere never repeats. It starts only when the visitor presses a button, and every flock you touch answers with a short tone.

**What I did not do.** I have a second file, 8,407 search records from Jalisco with full names and ages, all marked as authorised for public information, and I could not establish where it came from or its cut-off date. Until I do, the names stay out. A stale record can mark someone as missing who was found months ago, and that harms the family. I also refused to publish the fields that turn a person into a forensic description: distinguishing marks, clothing, height, complexion, hair.

## Why Does Open Innovation Matter?

Because the material is a dead person, and the difference between a local model and an API is the difference between keeping that at home and shipping it out.

The personal half only works offline. My memories, a family's memories, the name of someone's grandmother: none of it goes through a company's servers. The model is 5.5 GB on disk, runs with the wifi off, and costs nothing per sentence. I can read it, swap it, and find out exactly how it fails. I did, a hundred times, and then wrote a check around that failure. With a closed API I would be guessing at the shape of the errors and paying for the guesses.

The collective half is the opposite case: official open data, published by the Mexican state under transparency obligations. I can count it, draw it, and quote it without asking permission, and anyone can check my numbers against the original CSV.

Two archives, two opennesses. One protects intimacy, the other enables accountability. The piece needs both, and neither is possible with a closed pipeline.

## The Spirit of It

The piece ends with a refusal. You can spend ten minutes writing your grandmother's tortillas and rancheras, watch the machine turn her into one sentence, watch that sentence become a dot among 133,887, and then you ask for the same thing for a woman from Zapopan and there is nothing to arrange: an ID, a year, a status, and a machine that says it cannot write her, because writing her would be inventing her.

That asymmetry is the piece. The discomfort is not the number. It is that you got a sentence and she got a UUID.

## Prize Categories

**Best Use of Gemma.** The sentence is written by Gemma 4 e4b, Google's open-weight model, running locally through Ollama. That is the only partner technology in the project, and it is the same model MLH asks for in its Gemma 4 track.

No other partner categories. The archive, the flocking and the refusal use no sponsor stack.

---

Built by Petra (Luis Betancourt), Mexico City. [petrasynthetic.com](https://petrasynthetic.com/)

Data: Registro Nacional de Personas Desaparecidas y No Localizadas, public consultation, cut-off August 1, 2025.
