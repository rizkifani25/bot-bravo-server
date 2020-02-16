const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/transactionModels");
const Device = require("../models/deviceModels");
const Code = require("../models/codeModels");

const { getRequest } = require("../fetch/api");
const { deviceGenerator, codeGenerator } = require("../generator/generator");

router.get("/", async (req, res, next) => {
  let trxId = req.query.trxid,
    code = req.query.code,
    trxTo = req.query.tujuan,
    trxNominal = req.query.nominal,
    device = req.query.device,
    trxCode = code.toLowerCase(),
    trxSN,
    trxStatus,
    trxDate,
    trxInfo,
    data,
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
                code: trxCode,
                tujuan: uniqueCode + trxTo,
                nominal: trxNominal
              };

              let url = "http://" + deviceIP + ":8080/bot";
              let botReply = await getRequest(url, data);

              trxSN = "trxSN testing insert new data";
              trxStatus = "trxStatus testing insert new data";
              trxDate = "trxDate testing insert new data";
              trxInfo = botReply["data"];

              let newDataTransaction = new Transaction({
                _id: new mongoose.Types.ObjectId(),
                trxId: trxId,
                trxCode: trxCode,
                trxTo: trxTo,
                trxNominal: trxNominal,
                trxSN: trxSN,
                trxStatus: trxStatus,
                trxDate: trxDate,
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
