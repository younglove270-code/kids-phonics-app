const CANVAS_W = 500;
const CANVAS_H = 380;

function renderTemplate(letter) {
  const offscreen = document.createElement("canvas");
  offscreen.width = CANVAS_W; offscreen.height = CANVAS_H;
  const ctx = offscreen.getContext("2d");
  ctx.font = "bold 220px Arial";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter + letter.toLowerCase(), CANVAS_W / 2, CANVAS_H / 2);
  return ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
}

function getAlphaMap(imageData) {
  const map = new Uint8Array(imageData.width * imageData.height);
  for (let i = 0; i < map.length; i++) {
    map[i] = imageData.data[i * 4 + 3] > 20 ? 1 : 0;
  }
  return map;
}

function dilate(map, w, h, radius) {
  const out = new Uint8Array(map.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y * w + x] === 0) continue;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const ny = y + dy; const nx = x + dx;
          if (ny >= 0 && ny < h && nx >= 0 && nx < w) out[ny * w + nx] = 1;
        }
      }
    }
  }
  return out;
}

export function gradeDrawing(studentCanvas, letter) {
  const studentCtx = studentCanvas.getContext("2d");
  const studentData = studentCtx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  const studentMap = getAlphaMap(studentData);
  const totalDrawn = studentMap.reduce((s, v) => s + v, 0);

  if (totalDrawn < 200) {
    return { score: 0, grade: "😶 沒有寫字喔！", color: "#9E9E9E", advance: false };
  }

  const templateMap = getAlphaMap(renderTemplate(letter));
  const tolerantTemplate = dilate(templateMap, CANVAS_W, CANVAS_H, 18);
  const templateTotal = templateMap.reduce((s, v) => s + v, 0);

  let hitCount = 0, strayCount = 0;
  for (let i = 0; i < studentMap.length; i++) {
    if (studentMap[i] === 1) {
      if (tolerantTemplate[i] === 1) hitCount++;
      else strayCount++;
    }
  }

  const coverage = hitCount / Math.max(templateTotal, 1);
  const accuracy = hitCount / Math.max(totalDrawn, 1);
  const score = Math.round((coverage * 0.55 + accuracy * 0.45) * 100);

  let grade, color, advance;
  if (score >= 65)      { grade = "A+";        color = "#FF7043"; advance = true; }
  else if (score >= 45) { grade = "B";          color = "#43A047"; advance = false; }
  else if (score >= 25) { grade = "C";          color = "#FB8C00"; advance = false; }
  else                  { grade = "再試一次！"; color = "#E53935"; advance = false; }

  return { score, grade, color, advance };
}
