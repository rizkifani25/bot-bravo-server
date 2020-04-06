const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
puppeteer.use(StealthPlugin());

router.get("/", async (req, res, next) => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "/home/testing/puppeteer/puppeteer_data",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 300,
    height: 520,
    deviceScaleFactor: 1,
  });

  await page
    .goto("https://mitra.tokopedia.com", { waitUntil: "load" })
    .then(async () => {
      const cookies = await page.cookies();
      const file = path.resolve(__dirname, "../cookies");

      fs.writeFile(
        file + "/tokped-session3.json",
        JSON.stringify(cookies, null, 2),
        function (err) {
          if (err) throw err;
          console.log("Completed write of cookies");
          res.status(200).send({
            message: "Browser terbuka.",
          });
        }
      );
    });
});

module.exports = router;

// await page
//         .waitForNavigation({ waitUntil: "networkidle2" })
//         .then(async () => {

// })
// .catch(() => {
//   res.status(400).send({
//     message: "Gagal membuka browser."
//   });
// });
