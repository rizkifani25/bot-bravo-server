const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Transaction = require("../models/transactionModels");

router.get("/", async (req, res, next) => {
  let trxId = req.query.trxid;
  let trxCode = req.query.code;
  let trxTo = req.query.tujuan;
  let trxNominal = req.query.nominal;
  let trxInfo = req.query.info;
  let trxSN, trxStatus, trxDate, data;
  // let device = req.query.device;

  let newData = new Transaction({
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

  newData.save().then(res.status(200).send("Success"));
});

module.exports = router;
