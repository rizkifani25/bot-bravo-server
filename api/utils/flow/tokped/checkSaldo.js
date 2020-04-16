const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { getText } = require("../../../utils/operation");
const fs = require("fs");
const path = require("path");
const handleError = require("../../../fetch/handleError/handleError");
const CronJob = require("cron").CronJob;
puppeteer.use(StealthPlugin());

const cekSaldoTokped = async () => {
  const file = path.resolve(__dirname, "../../../routes/tokped/cookies");
  const cookiesString = fs.readFileSync(file + "/tokped-session2.json", "utf8");
  const cookies = JSON.parse(cookiesString);

  const browser = await puppeteer.launch({
    headless: true
    // userDataDir: "/home/testing/puppeteer/puppeteer_data"
  });

  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 360,
  //   height: 500,
  //   deviceScaleFactor: 1
  // });

  const currentdate = new Date();
  const datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  page.waitFor(1000);
  console.info("Setting cookies");
  await page.setCookie.apply(page, cookies);

  // selector
  const selectorSaldo =
    '//*[@id="content"]/div/div/div[2]/div[2]/div[1]/div[3]/div/div/div[2]/div/div[1]/div[2]/div/div[1]/div';
  return new Promise(async (resolve, reject) => {
    await page
      .goto("https://mitra.tokopedia.com", {
        waitUntil: "load"
      })
      .then(async () => {
        await getText(page, selectorSaldo)
          .then(async saldoAwal => {
            console.log(datetime + " : Rp. " + saldoAwal);
            let data = datetime + " : Rp. " + saldoAwal;
            await browser.close();
            resolve(data);
          })
          .catch(err => {
            reject(handleError(err));
          });
      });
  });
};

const startTracking = async () => {
  let job = new CronJob(
    "*/2 * * * *",
    function() {
      //runs every 2 minutes in this config
      cekSaldoTokped();
    },
    null,
    true,
    null,
    null,
    true
  );
  job.start();
};

// cekSaldoTokped();
startTracking();
