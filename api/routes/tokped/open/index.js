const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

router.get("/", async (req, res, next) => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./puppeteer_data"
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 300,
    height: 520,
    deviceScaleFactor: 1
  });

  await page.goto("https://mitra.tokopedia.com", { waitUntil: "load" });
  await page
    .waitForNavigation({ waitUntil: "networkidle2" })
    .then(() => {
      res.status(200).send({
        message: "Browser terbuka."
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Gagal membuka browser."
      });
    });
});

module.exports = router;
