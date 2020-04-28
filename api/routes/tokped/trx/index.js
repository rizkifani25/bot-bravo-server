const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../../../models/transactionModel");
const { pulsaTokped } = require("../../../utils/flow/tokped");

router.get("/", async (req, res, next) => {
  const { trxid, tujuan, nominal, mode } = req.query;

  if (trxid && tujuan && nominal) {
    await Transaction.findOne(
      {
        trxId: trxid,
      },
      { _id: 0, __v: 0 }
    )
      .exec()
      .then(async (docs) => {
        if (docs != null) {
          console.log(
            "Transaksi dengan trxId " + trxid + " sudah ada. Menampilkan data."
          );
          res.status(200).json(docs);
        } else {
          console.log(
            "Transaksi dengan trxId " +
              trxid +
              " belum ada. Memulai transaksi baru."
          );

          let newDataTransaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            trxId: trxid,
            trxTo: tujuan,
            trxInfo: "Testing",
          });

          newDataTransaction.save().then((result) => {
            let filterResult = {
              trxId: result.trxId,
              trxTo: result.trxTo,
              trxInfo: result.trxInfo,
            };

            res.status(201).send({ data: filterResult });
          });

          // await pulsaTokped(tujuan, nominal, mode).then(async (trxInfo) => {
          //   console.log(trxInfo);
          //   let newDataTransaction = new Transaction({
          //     _id: new mongoose.Types.ObjectId(),
          //     trxId: trxid,
          //     trxTo: tujuan,
          //     trxInfo: trxInfo,
          //   });

          //   newDataTransaction.save().then((result) => {
          //     res.status(201).send({
          //       data: result,
          //     });
          //   });
          // });
        }
      });
  } else {
    res.status(422).json({
      message: "Parameter tidak dapat diproses. Parameter tidak lengkap.",
    });
  }
});

module.exports = router;
