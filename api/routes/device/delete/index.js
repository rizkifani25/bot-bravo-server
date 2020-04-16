const express = require("express");
const router = express.Router();

const Device = require("../../../models/deviceModel");

router.get("/", async (req, res, next) => {
  const { deviceCode } = req.query;

  let query = {
    deviceCode: deviceCode
  };

  await Device.deleteOne(query)
    .exec()
    .then(response => {
      res.status(200).send({
        message: "Device berhasil dihapus."
      });
    })
    .catch(error => {
      res.status(201).send({
        message: "Device gagal dihapus."
      });
    });
});

module.exports = router;
