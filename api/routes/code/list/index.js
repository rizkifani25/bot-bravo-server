const express = require("express");
const router = express.Router();

const Code = require("../../../models/codeModel");

router.get("/", (req, res, next) => {
  let query = req.query.q;

  query != "" ? (query = { Name: req.query.q }) : (query = {});

  Code.find(query)
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
