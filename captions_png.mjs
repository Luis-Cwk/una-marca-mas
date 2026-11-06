import { spawnSync } from "node:child_process";
import fs from "node:fs";

const FF = "C:/ffmpeg/bin/ffmpeg.exe";
const TD = "C:/Users/petra/AppData/Local/Temp/opencode";
// sin BOM, que fontconfig lo lee estricto
const conf = fs.readFileSync(`${TD}/fonts.conf`).filter((b, i) => !(i < 3 && b === 0xef));
fs.writeFileSync(`${TD}/fonts.conf`, Buffer.from(conf));

const FONT = "C\\:/Users/petra/AppData/Local/Temp/SpaceGrotesk.ttf";
const caps = [
  ["133,887 people registered as missing in Mexico", 34],
  ["The archive keeps no names. One third has only an identifier and a date", 30],
  ["Three memories, three rounds", 34],
  ["An object. A gesture. Something she said", 34],
  ["Gemma 4 writes on this machine, not on a server", 30],
  ["It becomes one more mark", 34],
  ["Una marca mas - Petra - petrasynthetic.com", 28],
];
for (let i = 0; i < caps.length; i++) {
  const vf = `drawtext=fontfile='${FONT}':text='${caps[i][0]}':fontsize=${caps[i][1]}:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2`;
  const r = spawnSync(FF, ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "color=c=black@0.0:s=1920x120,format=rgba", "-vf", vf, "-frames:v", "1", `${TD}/cap${i}.png`], { stdio: "inherit", env: { ...process.env, FONTCONFIG_FILE: `${TD}/fonts.conf` } });
  if (r.status !== 0) { console.log(`cap${i} fallo`); process.exit(1); }
}
console.log("PNGs con Space Grotesk listos");
