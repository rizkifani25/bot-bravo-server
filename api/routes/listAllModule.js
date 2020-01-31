const express = require('express')
const router = express.Router()

const Modules = require('../models/moduleModels')

router.get('/', (req, res, next) => {
    let query = req.query.q

    query != '' ? query = { 'moduleName': req.query.q } : query = {}

    Modules.find(query)
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