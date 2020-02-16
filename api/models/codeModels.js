const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Code: String,
  Name: String
});

module.exports = mongoose.model("Code", codeSchema, "code");
