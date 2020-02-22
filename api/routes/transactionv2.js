const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/transactionModels");

const { getRequest } = require("../fetch/api");
const { deviceGenerator, codeGenerator } = require("../generator/generator");

router.get("/", async (req, res, next) => {
  let { trxid, bot, code, tujuan, nominal, device } = req.query;
  let trxId = trxid,
    trxTo = tujuan,
    trxNominal = nominal,
    botCode = bot.toLowerCase(),
    trxCode = code.toLowerCase(),
    trxInfo,
    deviceIP,
    uniqueCode;

  if (
    trxId != null &&
    trxCode != null &&
    trxTo != null &&
    trxNominal != null &&
    device != null
  ) {
    Transaction.find(
      {
        trxId: trxId
      },
      { _id: 0, __v: 0 }
    )
      .exec()
      .then(async docs => {
        if (docs.length == 1) {
          console.log(
            "Transaction with trxId " + trxId + " exist. Showing data."
          );
          res.status(200).json(docs);
        } else {
          console.log(
            "Transaction with trxId " +
              trxId +
              " doesn't exist. Do new transaction."
          );

          await deviceGenerator(device)
            .then(data => {
              deviceIP = data["0"]["deviceIP"];
            })
            .catch(err => {
              console.log(err);
            });

          await codeGenerator(trxCode)
            .then(async data => {
              uniqueCode = data["0"]["Code"];
              data = {
                app: botCode,
                tujuan: uniqueCode + trxTo,
                nominal: trxNominal
              };

              let url = "http://" + deviceIP + ":8000/main-route";
              let botReply = await getRequest(url, data);

              trxInfo = botReply["data"];

              let newDataTransaction = new Transaction({
                _id: new mongoose.Types.ObjectId(),
                trxId: trxId,
                trxTo: trxTo,
                trxInfo: trxInfo
              });

              newDataTransaction.save().then(result => {
                res.status(201).json(result);
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(422).json({
      message: "Unprocessable parameters. Missing or incomplete parameters."
    });
  }
});

module.exports = router;
