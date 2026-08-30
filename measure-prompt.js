const ts = require("typescript");
const fs = require("fs");
const path = require("path");

function load(file, acc) {
  if (acc[file]) return acc[file];
  const src = fs.readFileSync(file, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  const req = (id) => {
    if (id.endsWith(".json")) {
      return JSON.parse(fs.readFileSync(path.resolve(path.dirname(file), id), "utf8"));
    }
    if (id.startsWith("@/")) {
      const rel = id.replace("@/", "") + ".ts";
      return load(path.resolve(rel), acc);
    }
    if (id.startsWith(".")) {
      return load(path.resolve(path.dirname(file), id.endsWith(".ts") ? id : id + ".ts"), acc);
    }
    throw new Error("unknown " + id);
  };
  new Function("require", "module", "exports", "__filename", "__dirname", out)(req, mod, mod.exports, file, path.dirname(file));
  acc[file] = mod.exports;
  return mod.exports;
}

const acc = {};
const kb = load(path.resolve("lib/kiboPrompt.ts"), acc);
const sections = ["COMPANY_INFO","SERVICES_INFO","TECHNOLOGY_INFO","ASSESSMENT_INFO","EXPERT_INFO","ECOSYSTEM_INFO","BOOKING_INFO","FAQ_INFO","DESIGNER_INFO","SITE_CONTENT_INDEX"];
for (const s of sections) {
  const v = kb[s] || "";
  console.log(s + ":", v.length, "chars / ~" + Math.round(v.length / 4) + " tokens");
}
