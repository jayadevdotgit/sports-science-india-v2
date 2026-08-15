const fs = require("fs");
const { PNG } = require("pngjs");

const png = PNG.sync.read(fs.readFileSync("C:\\Users\\jayad\\AppData\\Local\\Temp\\opencode\\eco.png"));
const { width: w, height: h, data } = png;

// Weighted center of mass of muscle-red pixels, torso band (rows 12%..62%)
// to avoid the popup card (top-right) and grid (bottom).
let sumX = 0, sumY = 0, count = 0;
const yStart = Math.floor(h * 0.12), yEnd = Math.floor(h * 0.62);
for (let y = yStart; y < yEnd; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a > 60 && r > 90 && g < 150 && b < 150 && r > g * 1.3 && r > b * 1.3) {
      sumX += x; sumY += y; count++;
    }
  }
}
const cx = sumX / count, cy = sumY / count;
console.log(JSON.stringify({ count, centerOfMass: { x: cx, y: cy }, canvasCenter: { x: w / 2, y: h / 2 }, dx: cx - w / 2, dy: cy - h / 2 }));
