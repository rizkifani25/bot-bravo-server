const express = require('express')
const router = express.Router()
const shell = require('shelljs')

const FreeFire = require('../../modules/freefire/freefire_modules')

router.get('/', (req, res, next) => {
    let cmd = req.query.q
    if(cmd != ''){
        let result = FreeFire()
        return result
            // .then(result => {
            //     res.status(200).json(result)
            // })
            // .catch(err => {
            //     res.status(500).json(err)
            // })
    }else{
        return cmd
    }
})

module.exports = router