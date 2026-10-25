// Uso: node templates/render.js <entrada.html> <salida.png>
// Renderiza una tarjeta de 1200x1200 y la reduce a 16 colores para que pese poco.
const { chromium } = require('playwright');
const path = require('path');
const { execFileSync } = require('child_process');
(async () => {
  const [src, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
  await page.goto('file://' + path.resolve(src));
  await page.screenshot({ path: out });
  await browser.close();
  execFileSync('python3', ['-I', '-c',
    'import sys;from PIL import Image;Image.open(sys.argv[1]).convert("RGB").quantize(colors=16).save(sys.argv[1],optimize=True)', out]);
})();
