const express = require("express");
const router = express.Router();

const Device = require("../../../models/deviceModel");

router.get("/", (req, res, next) => {
  let query = req.query.q;

  query != "" ? (query = { deviceCode: req.query.q }) : (query = {});

  Device.find(query)
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
