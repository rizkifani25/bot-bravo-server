const { get } = require("../fetch/api");
const mongoose = require("mongoose");
const Transaction = require("../models/transactionModels");

module.exports = doTransaction = async data => {
  let url = "http://192.168.1.7:8080";
  let botReply = await get(url, data);

  // trxSN = "trxSN testing insert new data";
  // trxStatus = "trxStatus testing insert new data";
  // trxDate = "trxDate testing insert new data";
  return (trxInfo = botReply);

  // let newDataTransaction = new Transaction({
  //   _id: new mongoose.Types.ObjectId(),
  //   trxId: trxId,
  //   trxCode: trxCode,
  //   trxTo: trxTo,
  //   trxNominal: trxNominal,
  //   trxSN: trxSN,
  //   trxStatus: trxStatus,
  //   trxDate: trxDate,
  //   trxInfo: trxInfo
  // });

  // newDataTransaction.save().then(result => {
  //   res.status(201).json(result);
  // });
};
