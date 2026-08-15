const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--disable-gpu-sandbox"],
  });
  const page = await browser.newPage();
  for (const width of [375, 768, 1280, 1536]) {
    await page.setViewport({ width, height: 900 });
    await page.goto("http://localhost:3000/technology", { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 3000));
    const info = await page.evaluate((w) => {
      const scrollWrap = document.querySelector("#technology .overflow-x-auto");
      const inner = scrollWrap.firstElementChild;
      const btns = Array.from(inner.children).map((b) => b.textContent.trim());
      const wr = scrollWrap.getBoundingClientRect();
      const ir = inner.getBoundingClientRect();
      const allVisible = btns.every((t) => {
        const el = Array.from(inner.children).find((b) => b.textContent.trim() === t);
        const r = el.getBoundingClientRect();
        return r.left >= wr.left && r.right <= wr.right;
      });
      return {
        width: w,
        canScroll: scrollWrap.scrollWidth > scrollWrap.clientWidth,
        clientWidth: Math.round(scrollWrap.clientWidth),
        scrollWidth: Math.round(scrollWrap.scrollWidth),
        scrollLeft: Math.round(scrollWrap.scrollLeft),
        innerLeft: Math.round(ir.left),
        innerRight: Math.round(ir.right),
        wrapLeft: Math.round(wr.left),
        wrapRight: Math.round(wr.right),
        allVisible,
        btns,
      };
    }, width);
    console.log(JSON.stringify(info));
  }
  await browser.close();
})();
