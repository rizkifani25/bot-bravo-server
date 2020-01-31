const express = require('express')
const router = express.Router()

const Modules = require('../models/moduleModels')

router.get('/', (req, res, next) => {
    let moduleName = req.query.moduleName

    Modules.deleteOne({
        moduleName: moduleName
    })
    .then(result => {
        res.status(202).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })

})

module.exports = router