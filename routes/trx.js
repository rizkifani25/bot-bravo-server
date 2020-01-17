const express = require('express')
const appium = require('appium')
const router = express.Router()

const bca = require('../modules/bca/bca_modules')

const port = 4723

const isServerRunning = async (port, fn) => {
    let net = require('net')
    let tester = net.createServer()
    .once('error', function(err) {
        if ( err.code != 'EADDRINUSE') return fn(err)
        fn(null, true)
    })
    .once('listening', async () => {
        await appium.main()
    })
    .listen(port)
}

/* GET trx system */
router.get('/', async (req, res, next) => {
    let trxId = req.query.trxid
    let code = req.query.code
    let tujuan = req.query.tujuan
    let trxNominal = req.query.nominal
    let device = req.query.device

    let data = {
        'TrxId' : trxId,
        'Code' : code,
        'Tujuan' : tujuan,
        'Nominal' : trxNominal,
        'Device' : device
    }

    // isServerRunning(port)

    let result = await bca(data)
    
    res.send(result)
})

module.exports = router

// function(){
//     tester.once('close', function(){ fn(null, false) })
//     .close()
// }