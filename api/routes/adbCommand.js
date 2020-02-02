const express = require("express");
const router = express.Router();
const shell = require("shelljs");

const FreeFire = require("../../modules/freefire/freefire_modules");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

router.get("/", async (req, res, next) => {
  let cmd = req.query.q;
  let result;
  if (cmd != "") {
    try {
      result = await FreeFire();
      console.log(result);
    } catch (error) {
      result = error;
    }
    res.status(200).json({
      status: "OK",
      fromShell: result
    });
  } else {
    res.status(404).json({
      message: "Command not found"
    });
  }
});

module.exports = router;
