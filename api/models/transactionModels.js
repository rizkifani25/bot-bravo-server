const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trxId: String,
    trxCode: String,
    trxTo: String,
    trxNominal: String,
    trxSN: String,
    trxStatus: String,
    trxDate: String,
    trxInfo: String
})

module.exports = mongoose.model('Transaction', transactionSchema, 'transaksi')