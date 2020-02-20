const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trxId: String,
  trxTo: String,
  trxInfo: String
});

module.exports = mongoose.model("Transaction", transactionSchema, "transaksi");
