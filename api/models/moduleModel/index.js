const mongoose = require("mongoose");

const modulesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  moduleName: String,
  moduleMethod: String,
  moduleInfo: String,
  procedureName: String
});

module.exports = mongoose.model("Modules", modulesSchema, "modules");
