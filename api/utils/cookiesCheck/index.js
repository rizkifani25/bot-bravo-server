const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const prompt = require("prompt-sync")();
const path = require("path");
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
  await page.goto(url, { waitUntil: "load" });
  console.log(page.url());

  if (!page.isClosed()) {
    console.log("Checking cookies...");
    const pageCookies = await page.cookies();
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
    throw Error;
  }
};

const cookiesCheck = async () => {
  const file = path.resolve(__dirname, "./cookies/cookies.json");
  try {
    let check = fs.existsSync(file);
    console.log(check);
    if (check) {
      console.log("File cookies ditemukan.");
    } else {
      console.log("File cookies tidak ditemukan.");
      const website = prompt("Masukkan URL Website: ");
      await login("https://" + website);
    }
  } catch (err) {
    console.error(err);
  }
};

cookiesCheck();
