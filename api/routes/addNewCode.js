const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Code = require("../models/codeModels");

router.get("/", async (req, res, next) => {
  const { code, name } = req.query;

  let query = {
    Code: code,
    Name: name.toUpperCase()
  };

  await Code.find(query, { _id: 0, __v: 0 })
    .exec()
    .then(async docs => {
      if (docs.length == 1) {
        res.status(200).send({
          message: "Code sudah ada."
        });
      } else {
        let newCode = new Code({
          _id: new mongoose.Types.ObjectId(),
          Code: code,
          Name: name
        });

        newCode
          .save()
          .then(result => {
            res.status(201).send({
              message: "Code berhasil ditambahkan."
            });
          })
          .catch(result => {
            res.status(201).send({
              message: "Code gagal ditambahkan."
            });
          });
      }
    });
});

module.exports = router;
