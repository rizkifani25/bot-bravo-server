const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/transactionModels");
const Device = require("../models/deviceModels");
const Code = require("../models/codeModels");

const { getRequest } = require("../../fetch/api");

router.get("/", async (req, res, next) => {
  let trxId = req.query.trxid,
    trxCode = req.query.code.toLowerCase(),
    trxTo = req.query.tujuan,
    trxNominal = req.query.nominal,
    device = req.query.device,
    trxSN,
    trxStatus,
    trxDate,
    trxInfo,
    data,
    uniqueCode,
    deviceIP;

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
      .then(docs => {
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

          Code.find({ Name: trxCode }, { _id: 0, __v: 0 })
            .exec()
            .then(docs => {
              res.status(200);
              uniqueCode = docs[0]["Code"];
            })
            .catch(err => {
              res.json({
                error: err
              });
            });

          Device.find({ deviceCode: device }, { _id: 0, __v: 0 })
            .exec()
            .then(docs => {
              res.status(200);
              deviceIP = docs[0]["deviceIP"];
            })
            .catch(err => {
              res.json({
                error: err
              });
            });

          let doTransaction = async () => {
            data = {
              code: trxCode,
              tujuan: uniqueCode + trxTo,
              nominal: trxNominal
            };

            let url = "http://" + deviceIP + ":8080";
            let botReply = await getRequest(url, data);

            trxSN = "trxSN testing insert new data";
            trxStatus = "trxStatus testing insert new data";
            trxDate = "trxDate testing insert new data";
            trxInfo = botReply;

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
          };

          doTransaction();
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  } else {
    res.status(422).json({
      message: "Unprocessable parameters. Missing or incomplete parameters."
    });
  }
});

module.exports = router;
