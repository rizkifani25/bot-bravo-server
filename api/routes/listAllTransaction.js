const express = require("express");
const router = express.Router();

const Transaction = require("../models/transactionModels");

router.get("/", (req, res, next) => {
  let query = req.query.q,
    limit = req.query.limit;

  query != "" ? (query = { trxId: req.query.q }) : (query = {});
  limit != null
    ? (limit = parseInt(req.query.limit))
    : (limit = parseInt(limit));

  Transaction.find(query)
    .limit(limit)
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
