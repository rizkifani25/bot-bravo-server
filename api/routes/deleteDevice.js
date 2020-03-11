const express = require("express");
const router = express.Router();

const Device = require("../models/deviceModels");

router.get("/", async (req, res, next) => {
  const { deviceCode } = req.query;

  let query = {
    deviceCode: deviceCode
  };

  await Device.deleteOne(query)
    .exec()
    .then(
      res.status(200).send({
        message: "Device berhasil dihapus."
      })
    )
    .catch(
      res.status(201).send({
        message: "Device gagal dihapus."
      })
    );
});

module.exports = router;
