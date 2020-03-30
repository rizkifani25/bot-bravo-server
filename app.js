const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// code
const addNewCodeRouter = require("./api/routes/code/add");
const deleteCodeRouter = require("./api/routes/code/delete");
const allCodeRouter = require("./api/routes/code/list");
// device
const addNewDeviceRouter = require("./api/routes/device/add");
const deleteDeviceRouter = require("./api/routes/device/delete");
const allDeviceRouter = require("./api/routes/device/list");
// transaction
const transactionRouterV2 = require("./api/routes/transaction/bot");
const allTransactionRouter = require("./api/routes/transaction/list");
const transactionRouter = require("./api/routes/transaction/bot/transaction");

mongoose.connect("mongodb://localhost:27017/db-trx", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/allTransaction", allTransactionRouter);
app.use("/allDevice", allDeviceRouter);
app.use("/allCode", allCodeRouter);
app.use("/addCode", addNewCodeRouter);
app.use("/addDevice", addNewDeviceRouter);
app.use("/deleteCode", deleteCodeRouter);
app.use("/deleteDevice", deleteDeviceRouter);
app.use("/trx", transactionRouter);
app.use("/v2/trx", transactionRouterV2);

module.exports = app;
