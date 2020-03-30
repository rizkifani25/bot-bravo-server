const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../../../../models/transactionModel");

router.get("/", async (req, res, next) => {
  const { trxid, tujuan, nominal } = req.query;

  let trxId = trxid,
    trxTo = tujuan,
    trxNominal = nominal,
    trxInfo;

  if (trxid && tujuan && nominal) {
    Transaction.findOne({ trxId: trxId }, { _id: 0, __v: 0 })
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
        }
      });
  } else {
    res.status(422).json({
      message: "Parameter tidak dapat diproses. Parameter tidak lengkap."
    });
  }
});
