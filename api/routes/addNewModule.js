const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Modules = require("../models/moduleModels");

router.post("/", (req, res, next) => {
  let moduleName = req.query.moduleName,
    moduleMethod = req.query.moduleMethod,
    procedure = req.query.procedure;

  console.log(moduleName);
  console.log(moduleMethod);
  console.log(procedure);

  let newModule = new Modules({
    _id: new mongoose.Types.ObjectId(),
    moduleName: moduleName,
    moduleMethod: moduleMethod,
    moduleInfo: "Testing",
    procedure: procedure
  });

  newModule.save().then(result => {
    res.status(200).json(result);
  });
});

module.exports = router;
