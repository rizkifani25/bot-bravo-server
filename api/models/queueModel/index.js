const mongoose = require("mongoose");

const queueSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trxId: String,
  trxTo: String,
  trxNominal: String,
  deviceIP: String,
  devicePort: String
});

module.exports = mongoose.model("Queue", queueSchema, "queue");
