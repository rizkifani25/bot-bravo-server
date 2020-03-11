const express = require("express");
const router = express.Router();

const Code = require("../models/codeModels");

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  let query = {
    Name: name.toUpperCase()
  };

  await Code.deleteOne(query)
    .exec()
    .then(
      res.status(200).send({
        message: "Code berhasil dihapus."
      })
    )
    .catch(
      res.status(201).send({
        message: "Code gagal dihapus."
      })
    );
});

module.exports = router;
