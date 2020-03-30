const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  deviceCode: String,
  deviceIP: String,
  deviceType: String
});

module.exports = mongoose.model("Device", deviceSchema, "devices");
