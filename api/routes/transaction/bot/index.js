const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../../../models/transactionModel");

const { getRequest } = require("../../../fetch/api");
const { deviceGenerator, codeGenerator } = require("../../../utils/generator");

router.get("/", async (req, res, next) => {
  const { trxid, code, tujuan, nominal, device } = req.query;
  let trxId = trxid,
    trxTo = tujuan,
    trxNominal = nominal,
    trxCode = code.toUpperCase(),
    trxInfo,
    deviceIP,
    devicePort,
    uniqueCode;

  if (
    trxId != null &&
    trxCode != null &&
    trxTo != null &&
    trxNominal != null &&
    device != null
  ) {
    Transaction.findOne(
      {
        trxId: trxId
      },
      { _id: 0, __v: 0 }
    )
      .exec()
      .then(async docs => {
        if (docs.length == 1) {
          console.log(
            "Transaksi dengan trxId " + trxId + " sudah ada. Menampilkan data."
          );
          res.status(200).json(docs);
        } else {
          console.log(
            "Transaksi dengan trxId " +
              trxId +
              " belum ada. Memulai transaksi baru."
          );

          await deviceGenerator(device)
            .then(data => {
              deviceIP = data["0"]["deviceIP"];
            })
            .catch(err => {
              res.status(400).send({
                data: "Device tidak ditemukan."
              });
            });

          await codeGenerator(trxCode)
            .then(async data => {
              uniqueCode = data["0"]["Code"];
              devicePort = data["0"]["Port"];
              let params = {
                tujuan: uniqueCode + trxTo,
                nominal: trxNominal
              };

              let url = "http://" + deviceIP + ":" + devicePort + "/bot";
              let botReply = await getRequest(url, params);

              trxInfo = botReply["data"];

              let newDataTransaction = new Transaction({
                _id: new mongoose.Types.ObjectId(),
                trxId: trxId,
                trxTo: trxTo,
                trxInfo: trxInfo
              });

              newDataTransaction.save().then(result => {
                res.status(201).send({
                  data: result
                });
              });
            })
            .catch(err => {
              res.status(400).send({
                data: "Code tidak ditemukan."
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(422).json({
      message: "Parameter tidak dapat diproses. Parameter tidak lengkap."
    });
  }
});

module.exports = router;
