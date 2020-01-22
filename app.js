const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');

// Route
const allTransactionRouter = require('./api/routes/listAllTransaction')
const transactionRouter = require('./api/routes/transaction')

mongoose.connect('mongodb://localhost:27017/db-trx', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/allTransaction', allTransactionRouter)
app.use('/trx', transactionRouter)

module.exports = app