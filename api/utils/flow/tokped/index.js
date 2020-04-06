const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
const handleError = require("../../../fetch/handleError/handleError");
puppeteer.use(StealthPlugin());
const {
  isExist,
  getTextByXPath,
  clickByXPath,
  getText,
  clickByProperty,
  clickByTag,
  inputByProperty,
} = require("../../../utils/operation");

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

const pulsaTokped = async (tujuan, nominal) => {
  const file = path.resolve(__dirname, "../../../routes/tokped/cookies");
  const cookiesString = fs.readFileSync(file + "/tokped-session3.json", "utf8");
  const cookies = JSON.parse(cookiesString);

  const browser = await puppeteer.launch({
    headless: false,
    // userDataDir: "/home/testing/puppeteer/puppeteer_data"
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 360,
    height: 500,
    deviceScaleFactor: 1,
  });

  page.waitFor(1000);
  await page.setCookie.apply(page, cookies);

  nominal = numberWithDot(nominal);

  // selector
  const xHomePulsa = "//div[@data-test-id='imgHomePulsa']";
  const xNominal = "//div[contains(text(),'" + nominal + "')]";
  const xBtnBayar = "//button[@data-test-id='btnPulsaBayar']";
  const xSaldoMitraKosong =
    "//div[@class='pay-err'][contains(text(),'Saldo Mitra kamu tidak cukup')]";
  const xSaldoOVOKosong =
    "//div[@class='pay-err'][contains(text(),'Saldo OVO kamu tidak cukup')]";
  const xBtnBayarConfirm = "//button[@data-test-id='btnPulsaBayarConfirm']";
  const xOVOCash = "//div[@class='pay-title'][contains(text(),'OVO Cash')]";
  const xTotalHarga = "//span[@data-test-id='lblPulsaTotalHarga']";
  const xTrxBerhasil = "//div[@data-test-id='lblThankYouBerhasil']";
  const xErrorMsg = "//div[@data-test-id='textErrorMessage']";

  let totalHarga;
  return new Promise(async (resolve, reject) => {
    await page
      .goto("https://mitra.tokopedia.com/digital/pulsa/1", {
        waitUntil: "load",
      })
      .then(async () => {
        await page.waitFor(1500);
        await inputByProperty(
          page,
          "txtPulsaInputPhone",
          "data-test-id",
          tujuan
        )
          .then(async () => {
            if (nominal == "1.000") {
              await page.waitFor(2000);
              await clickByXPath(page, xBtnBayar)
                .then(async () => {
                  await isExist(page, xSaldoOVOKosong)
                    .then(async (saldoOVO) => {
                      if (saldoOVO) {
                        resolve("Saldo OVO Cash kamu tidak cukup");
                        await browser.close();
                      } else {
                        await clickByXPath(page, xOVOCash)
                          .then(async () => {
                            totalHarga = await getTextByXPath(
                              page,
                              xTotalHarga
                            );
                            await clickByXPath(page, xBtnBayarConfirm)
                              .then(async () => {
                                let error = await isExist(page, xErrorMsg);
                                if (error == true) {
                                  response = await getTextByXPath(
                                    page,
                                    xErrorMsg
                                  );
                                  resolve(response);
                                  await browser.close();
                                } else {
                                  let infoBerhasil = false;
                                  while (!infoBerhasil) {
                                    infoBerhasil = await isExist(
                                      page,
                                      xTrxBerhasil
                                    );
                                    if (infoBerhasil) {
                                      console.log(
                                        "Status trx berhasil : " + infoBerhasil
                                      );
                                      let trxInfo = await getTextByXPath(
                                        page,
                                        xTrxBerhasil
                                      );
                                      console.log(trxInfo);
                                      response =
                                        "tujuan: " +
                                        tujuan +
                                        " nominal: " +
                                        nominal +
                                        " harga: " +
                                        totalHarga +
                                        " info: " +
                                        trxInfo;
                                      resolve(response);
                                      await browser.close();
                                    }
                                  }
                                }
                              })
                              .catch((err) => {
                                reject(err);
                              });
                          })
                          .catch((err) => {
                            reject(err);
                          });
                      }
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              await page.waitFor(2000).then(async () => {
                let response = await isExist(page, xNominal);
                if (!response) {
                  response =
                    "Transaksi gagal. Nominal " + nominal + " tidak ada.";
                  resolve(response);
                  await browser.close();
                } else {
                  await clickByXPath(page, xNominal)
                    .then(async () => {
                      await clickByXPath(page, xBtnBayar)
                        .then(async () => {
                          await isExist(page, xSaldoOVOKosong)
                            .then(async (saldoOVO) => {
                              if (saldoOVO) {
                                resolve("Saldo OVO Cash kamu tidak cukup");
                                await browser.close();
                              } else {
                                await clickByXPath(page, xOVOCash)
                                  .then(async () => {
                                    totalHarga = await getTextByXPath(
                                      page,
                                      xTotalHarga
                                    );
                                    await clickByXPath(page, xBtnBayarConfirm)
                                      .then(async () => {
                                        let error = await isExist(
                                          page,
                                          xErrorMsg
                                        );
                                        if (error == true) {
                                          response = await getTextByXPath(
                                            page,
                                            xErrorMsg
                                          );
                                          resolve(response);
                                          await browser.close();
                                        } else {
                                          let infoBerhasil = false;
                                          while (!infoBerhasil) {
                                            infoBerhasil = await isExist(
                                              page,
                                              xTrxBerhasil
                                            );
                                            if (infoBerhasil) {
                                              console.log(
                                                "Status trx berhasil : " +
                                                  infoBerhasil
                                              );
                                              let trxInfo = await getTextByXPath(
                                                page,
                                                xTrxBerhasil
                                              );
                                              console.log(trxInfo);
                                              response =
                                                "tujuan: " +
                                                tujuan +
                                                " nominal: " +
                                                nominal +
                                                " harga: " +
                                                totalHarga +
                                                " info: " +
                                                trxInfo;
                                              resolve(response);
                                              await browser.close();
                                            }
                                          }
                                        }
                                      })
                                      .catch((err) => {
                                        reject(err);
                                      });
                                  })
                                  .catch((err) => {
                                    reject(err);
                                  });
                              }
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              });
            }
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  pulsaTokped: pulsaTokped,
};

// let response =
//   "tujuan: " + tujuan + " nominal: " + nominal + " harga: " + totalHarga;
// resolve(response);

// let response =
//   "tujuan: " + tujuan + " nominal: " + nominal + " harga: " + totalHarga;
// resolve(response);

// await isExist(page, xHomePulsa)
//   .then(async (homePulsa) => {
//     if (homePulsa) {
//       await clickByXPath(page, xHomePulsa)
//         .then(async () => {})
//         .catch((err) => {
//           reject(err);
//         });
//     } else {
//       console.log("Element " + xHomePulsa + "tidak ditemukan.");
//       resolve("Transaksi Gagal. Ulangi kembali.");
//     }
//   })
//   .catch((err) => {
//     reject(err);
//   });

// await isExist(page, xSaldoMitraKosong)
//   .then(async (saldoMitra) => {
//     console.log("Saldo mitra tidak cukup status: " + saldoMitra);
//     if (saldoMitra) {
//       console.log("Saldo Mitra kamu tidak cukup");
//       resolve("Saldo Mitra kamu tidak cukup");
//     } else {
//     }
//   })
//   .catch((err) => {
//     reject(err);
//   });
