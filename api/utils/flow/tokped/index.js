const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");
// const handleError = require("../../../fetch/handleError/handleError");
puppeteer.use(StealthPlugin());
const {
  isExist,
  getTextByXPath,
  clickByXPath,
  inputByProperty,
} = require("../../../utils/operation");

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

const pulsaTokped = async (tujuan, nominal, mode) => {
  const file = path.resolve(__dirname, "../../../routes/tokped/cookies");
  const cookiesString = fs.readFileSync(file + "/tokped-session3.json", "utf8");
  const cookies = JSON.parse(cookiesString);

  const browser = await puppeteer.launch({
    headless: false,
    // userDataDir: "/home/testing/puppeteer/puppeteer_data"
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 400,
    height: 700,
    deviceScaleFactor: 1,
  });

  page.waitFor(100);
  await page.setCookie.apply(page, cookies);

  nominal = numberWithDot(nominal);

  // selector
  // const xHomePulsa = "//div[@data-test-id='imgHomePulsa']";
  const xNominal = "//div[contains(text(),'" + nominal + "')]";
  const xBtnBayar = "//button[@data-test-id='btnPulsaBayar']";
  const xSaldoMitraKosong =
    "//div[@class='pay-err'][contains(text(),'Saldo Mitra kamu tidak cukup')]";
  const xSaldoOVOKosong =
    "//div[@class='pay-err'][contains(text(),'Saldo OVO kamu tidak cukup')]";
  const xBtnBayarConfirm = "//button[@data-test-id='btnPulsaBayarConfirm']";
  const xOVOCash = "//div[@class='pay-title'][contains(text(),'OVO Cash')]";
  const xMitra = "//div[@class='pay-title'][contains(text(),'Saldo Mitra')]";
  const xTotalHarga = "//span[@data-test-id='lblPulsaTotalHarga']";
  const xTrxBerhasil = "//div[@data-test-id='lblThankYouBerhasil']";
  const xTrxGagal = "//div[@data-test-id='lblThankYouGagal']";
  const xErrorMsg = "//div[@data-test-id='textErrorMessage']";
  const xSisaSaldoOvo =
    "/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[2]";
  const xSisaSaldoMitra =
    "/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[6]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[2]";
  const xSerialNumber =
    "/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[3]/div[2]";

  let totalHarga,
    sisaSaldoOvo,
    sisaSaldoMitra,
    modeTrx = mode.toUpperCase(),
    checkError1,
    checkError2,
    checkSaldo1,
    checkSaldo2,
    sisaSaldo1,
    sisaSaldo2,
    infoBerhasil = false,
    infoGagal = false,
    trxInfo,
    serialNumber;
  return new Promise(async (resolve, reject) => {
    await page
      .goto("https://mitra.tokopedia.com/digital/pulsa/1", {
        waitUntil: "load",
      })
      .then(async () => {
        await page.waitFor(300);
        await inputByProperty(
          page,
          "txtPulsaInputPhone",
          "data-test-id",
          tujuan
        )
          .then(async () => {
            if (nominal == "1.000") {
              await page.waitFor(200);
              await clickByXPath(page, xBtnBayar)
                .then(async () => {
                  if (modeTrx == "OVO") {
                    modeTrx = xOVOCash;
                    checkError1 = xSaldoOVOKosong;
                    checkError2 = xSaldoMitraKosong;
                    checkSaldo1 = xSisaSaldoOvo;
                    checkSaldo2 = xSisaSaldoMitra;
                  } else {
                    modeTrx = xMitra;
                    checkError1 = xSaldoMitraKosong;
                    checkError2 = xSaldoOVOKosong;
                    checkSaldo1 = xSisaSaldoMitra;
                    checkSaldo2 = xSisaSaldoOvo;
                  }
                  await isExist(page, checkError1)
                    .then(async (cekSaldo) => {
                      if (cekSaldo) {
                        if (modeTrx == xOVOCash) {
                          sisaSaldoOvo = "Saldo OVO Cash kamu tidak cukup";
                          resolve(sisaSaldoOvo);
                          await browser.close();
                        } else if (modeTrx == xMitra) {
                          sisaSaldoMitra = "Saldo Mitra kamu tidak cukup";
                          resolve(sisaSaldoMitra);
                          await browser.close();
                        }
                      } else {
                        await clickByXPath(page, modeTrx)
                          .then(async () => {
                            if (modeTrx == xOVOCash) {
                              sisaSaldo1 = await getTextByXPath(
                                page,
                                checkSaldo1
                              );
                              sisaSaldo2 = await isExist(page, checkError2);
                              sisaSaldo2
                                ? (sisaSaldo2 = "Saldo Mitra kamu tidak cukup")
                                : (sisaSaldo2 = await getTextByXPath(
                                    page,
                                    checkSaldo2
                                  ));
                              sisaSaldoOvo = " Saldo OVO: " + sisaSaldo1;
                              sisaSaldoMitra = " Saldo Mitra: " + sisaSaldo2;
                            } else if (modeTrx == xMitra) {
                              sisaSaldo1 = await getTextByXPath(
                                page,
                                checkSaldo1
                              );
                              sisaSaldo2 = await isExist(page, checkError2);
                              sisaSaldo2
                                ? (sisaSaldo2 =
                                    "Saldo OVO Cash kamu tidak cukup")
                                : (sisaSaldo2 = await getTextByXPath(
                                    page,
                                    checkSaldo2
                                  ));
                              sisaSaldoMitra = " Saldo Mitra: " + sisaSaldo1;
                              sisaSaldoOvo = " Saldo OVO: " + sisaSaldo2;
                            }
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
                                  let status = false;
                                  while (!status) {
                                    infoBerhasil = await isExist(
                                      page,
                                      xTrxBerhasil
                                    );
                                    infoGagal = await isExist(page, xTrxGagal);
                                    if (infoBerhasil) {
                                      status = true;
                                      trxInfo = await getTextByXPath(
                                        page,
                                        xTrxBerhasil
                                      );
                                      serialNumber = await getTextByXPath(
                                        page,
                                        xSerialNumber
                                      );
                                      resolve(
                                        "tujuan: " +
                                          tujuan +
                                          " nominal: " +
                                          nominal +
                                          " harga: " +
                                          totalHarga +
                                          sisaSaldoOvo +
                                          sisaSaldoMitra +
                                          " SN: " +
                                          serialNumber +
                                          " info: " +
                                          trxInfo
                                      );
                                    } else if (infoGagal) {
                                      status = true;
                                      trxInfo = await getTextByXPath(
                                        page,
                                        xTrxGagal
                                      );
                                      serialNumber = await getTextByXPath(
                                        page,
                                        xSerialNumber
                                      );
                                      resolve(
                                        "tujuan: " +
                                          tujuan +
                                          " nominal: " +
                                          nominal +
                                          " harga: " +
                                          totalHarga +
                                          sisaSaldoOvo +
                                          sisaSaldoMitra +
                                          " SN: " +
                                          serialNumber +
                                          " info: " +
                                          trxInfo
                                      );
                                      await browser.close();
                                    } else {
                                      status = false;
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
              await page.waitFor(100).then(async () => {
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
                          if (modeTrx == "OVO") {
                            modeTrx = xOVOCash;
                            checkError1 = xSaldoOVOKosong;
                            checkError2 = xSaldoMitraKosong;
                            checkSaldo1 = xSisaSaldoOvo;
                            checkSaldo2 = xSisaSaldoMitra;
                          } else {
                            modeTrx = xMitra;
                            checkError1 = xSaldoMitraKosong;
                            checkError2 = xSaldoOVOKosong;
                            checkSaldo1 = xSisaSaldoMitra;
                            checkSaldo2 = xSisaSaldoOvo;
                          }
                          await isExist(page, checkError1)
                            .then(async (cekSaldo) => {
                              if (cekSaldo) {
                                if (modeTrx == xOVOCash) {
                                  sisaSaldoOvo =
                                    "Saldo OVO Cash kamu tidak cukup";
                                  resolve(sisaSaldoOvo);
                                  await browser.close();
                                } else if (modeTrx == xMitra) {
                                  sisaSaldoMitra =
                                    "Saldo Mitra kamu tidak cukup";
                                  resolve(sisaSaldoMitra);
                                  await browser.close();
                                }
                              } else {
                                await clickByXPath(page, modeTrx)
                                  .then(async () => {
                                    if (modeTrx == xOVOCash) {
                                      sisaSaldo1 = await getTextByXPath(
                                        page,
                                        checkSaldo1
                                      );
                                      sisaSaldo2 = await isExist(
                                        page,
                                        checkError2
                                      );
                                      sisaSaldo2
                                        ? (sisaSaldo2 =
                                            "Saldo Mitra kamu tidak cukup")
                                        : (sisaSaldo2 = await getTextByXPath(
                                            page,
                                            checkSaldo2
                                          ));
                                      sisaSaldoOvo =
                                        " Saldo OVO: " + sisaSaldo1;
                                      sisaSaldoMitra =
                                        " Saldo Mitra: " + sisaSaldo2;
                                    } else if (modeTrx == xMitra) {
                                      sisaSaldo1 = await getTextByXPath(
                                        page,
                                        checkSaldo1
                                      );
                                      sisaSaldo2 = await isExist(
                                        page,
                                        checkError2
                                      );
                                      sisaSaldo2
                                        ? (sisaSaldo2 =
                                            "Saldo OVO Cash kamu tidak cukup")
                                        : (sisaSaldo2 = await getTextByXPath(
                                            page,
                                            checkSaldo2
                                          ));
                                      sisaSaldoMitra =
                                        " Saldo Mitra: " + sisaSaldo1;
                                      sisaSaldoOvo =
                                        " Saldo OVO: " + sisaSaldo2;
                                    }
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
                                          let status = false;
                                          while (!status) {
                                            infoBerhasil = await isExist(
                                              page,
                                              xTrxBerhasil
                                            );
                                            infoGagal = await isExist(
                                              page,
                                              xTrxGagal
                                            );
                                            if (infoBerhasil) {
                                              status = true;
                                              trxInfo = await getTextByXPath(
                                                page,
                                                xTrxBerhasil
                                              );
                                              serialNumber = await getTextByXPath(
                                                page,
                                                xSerialNumber
                                              );
                                              resolve(
                                                "tujuan: " +
                                                  tujuan +
                                                  " nominal: " +
                                                  nominal +
                                                  " harga: " +
                                                  totalHarga +
                                                  sisaSaldoOvo +
                                                  sisaSaldoMitra +
                                                  " SN: " +
                                                  serialNumber +
                                                  " info: " +
                                                  trxInfo
                                              );
                                            } else if (infoGagal) {
                                              status = true;
                                              trxInfo = await getTextByXPath(
                                                page,
                                                xTrxGagal
                                              );
                                              serialNumber = await getTextByXPath(
                                                page,
                                                xSerialNumber
                                              );
                                              resolve(
                                                "tujuan: " +
                                                  tujuan +
                                                  " nominal: " +
                                                  nominal +
                                                  " harga: " +
                                                  totalHarga +
                                                  sisaSaldoOvo +
                                                  sisaSaldoMitra +
                                                  " SN: " +
                                                  serialNumber +
                                                  " info: " +
                                                  trxInfo
                                              );
                                              await browser.close();
                                            } else {
                                              status = false;
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
