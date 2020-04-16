const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
const { isExist } = require("../operation");
// const prompt = require("prompt-sync")();
puppeteer.use(StealthPlugin());

const login = async url => {
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

  await page
    .goto(url, { waitUntil: "load" })
    .then(async () => {
      console.log(page.url());
      if (!page.isClosed()) {
        page.waitForNavigation({ waitUntil: "networkidle2" });

        const pageCookies = await page.cookies(url);
        const file = path.resolve(__dirname, "../cookiesCheck/cookies");

        fs.writeFile(
          file + "/cookies.json",
          JSON.stringify(pageCookies, null, 2),
          function(err) {
            if (err) throw err;
            console.log("Selesai menulis cookies.");
            return;
          }
        );
      } else {
        console.log("Gagal menulis cookies.");
        return;
      }
    })
    .catch(() => {
      console.log("Gagal memuat halaman.");
      return;
    });
};

const cookiesCheck = async website => {
  const file = path.resolve(__dirname, "./cookies/cookies.json");
  console.log("Checking cookies...");
  try {
    let check = fs.existsSync(file);
    if (check) {
      console.log("File cookies ditemukan.");
      return true;
    } else {
      console.log("File cookies tidak ditemukan.");
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  cookiesCheck: cookiesCheck
};
