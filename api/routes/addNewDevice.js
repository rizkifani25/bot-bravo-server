const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Device = require("../models/deviceModels");

router.get("/", async (req, res, next) => {
  const { deviceCode, deviceIP, deviceType } = req.query;

  await Device.find(
    { deviceCode: deviceCode, deviceIP: deviceIP, deviceType: deviceType },
    { _id: 0, __v: 0 }
  )
    .exec()
    .then(async docs => {
      if (docs.length == 1) {
        res.status(200).send({
          message: "Device sudah ada."
        });
      } else {
        let newDevice = new Device({
          _id: new mongoose.Types.ObjectId(),
          deviceCode: deviceCode,
          deviceIP: deviceIP,
          deviceType: deviceType
        });

        newDevice
          .save()
          .then(result => {
            res.status(201).send({
              message: "Device berhasil ditambahkan."
            });
          })
          .catch(result => {
            res.status(201).send({
              message: "Device gagal ditambahkan."
            });
          });
      }
    });
});

module.exports = router;
