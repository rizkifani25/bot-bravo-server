const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

router.get("/", async (req, res, next) => {
  const url = "mitra.tokopedia.com";

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "/home/testing/puppeteer/puppeteer_data"
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 300,
    height: 520,
    deviceScaleFactor: 1
  });

  await page
    .goto("https://" + url, { waitUntil: "load" })
    .then(async () => {
      const pageCookies = await page.cookies("https://" + url);
      let session = pageCookies.filter(e => {
        return (
          e.name == "tuid" && e.domain == ".tokopedia.com" && e.session == true
        );
      });

      if (session.length == 1) {
        res.status(200).send({
          message: "Session mitra.tokopedia.com ditemukan."
        });
      } else {
        res.status(200).send({
          message:
            "Session mitra.tokopedia.com tidak ditemukan. Silahkan login ulang."
        });
      }
    })
    .catch(err => {
      if (err) throw err;
      res.status(400).send({
        message: "Gagal membuka browser."
      });
    });
});

module.exports = router;
