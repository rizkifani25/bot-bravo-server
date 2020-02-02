const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Transaction = require("../models/transactionModels");

const appium = require("appium");
const bca = require("../../modules/bca/bca_modules");

// const isServerRunning = async (port, fn) => {
//     let net = require('net')
//     let tester = net.createServer()
//     .once('error', function(err) {
//         if ( err.code != 'EADDRINUSE') return fn(err)
//         fn(null, true)
//     })
//     .once('listening', async () => {
//         await appium.main()
//     })
//     .listen(port)
// }

// New Transaction
router.get("/", async (req, res, next) => {
  let trxId = req.query.trxid;
  let trxCode = req.query.code;
  let trxTo = req.query.tujuan;
  let trxNominal = req.query.nominal;
  let trxSN, trxStatus, trxDate, trxInfo, data;
  let device = req.query.device;

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

          let doTransaction = async () => {
            data = {
              trxId: trxId,
              trxCode: trxCode,
              trxTo: trxTo,
              trxNominal: trxNominal,
              device: device
            };

            let botReply = await bca(data);

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
