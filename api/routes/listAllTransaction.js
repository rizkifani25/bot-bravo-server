const express = require('express')
const router = express.Router()

const Transaction = require('../models/transactionModels')

router.get('/', (req, res, next) => {
    Transaction.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router