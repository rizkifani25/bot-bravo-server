const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// Route
const addNewDeviceRouter = require("./api/routes/addNewDevice");
const addNewCodeRouter = require("./api/routes/addNewCode");
const deleteCodeRouter = require("./api/routes/deleteCode");
const deleteDeviceRouter = require("./api/routes/deleteDevice");
const allTransactionRouter = require("./api/routes/listAllTransaction");
const allDeviceRouter = require("./api/routes/listAllDevice");
const allCodeRouter = require("./api/routes/listAllCode");
const transactionRouter = require("./api/routes/transaction");
const transactionRouterV2 = require("./api/routes/transactionv2");

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
