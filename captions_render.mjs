import { spawnSync } from "node:child_process";

const FF = "C:/ffmpeg/bin/ffmpeg.exe";
const TD = "C:/Users/petra/AppData/Local/Temp/opencode";
const SRC = "C:/Users/petra/agentex/hf26-ofrenda/una-marca-mas.mp4";
const OUT = "C:/Users/petra/agentex/hf26-ofrenda/una-marca-mas-subtitulado.mp4";

// 7 PNG ya generados (cap0..cap6) con sus ventanas de tiempo
const ranges = [
  [0.8, 5.2], [6, 13.5], [14.2, 19.5], [20, 31.5], [32, 39.8], [40.3, 46], [46.5, 49.8],
];

const inputs = ["-i", SRC];
for (let i = 0; i < ranges.length; i++) inputs.push("-loop", "1", "-i", `${TD}/cap${i}.png`);

const parts = ["[0:v]fade=t=in:st=0:d=0.6,fade=t=out:st=49.3:d=0.9[base]"];
let prev = "[base]";
for (let i = 0; i < ranges.length; i++) {
  const [a, b] = ranges[i];
  const out = `[o${i}]`;
  parts.push(`${prev}[${i + 1}:v]overlay=0:H-160:enable='between(t,${a},${b})'${out}`);
  prev = out;
}

const args = ["-y", "-loglevel", "warning", ...inputs,
  "-filter_complex", parts.join(";"),
  "-map", prev,
  "-t", "50.28",
  "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p", "-an", OUT];
const r = spawnSync(FF, args, { stdio: "inherit" });
console.log("codigo:", r.status);
