const Device = require("../../models/deviceModel");
const Code = require("../../models/codeModel");
const handleError = require("../../fetch/handleError/handleError");

const deviceGenerator = deviceCode => {
  return new Promise((resolve, reject) => {
    Device.find({ deviceCode: deviceCode }, { _id: 0, __v: 0 })
      .exec()
      .then(docs => {
        resolve(docs);
      })
      .catch(err => {
        reject(handleError(err));
      });
  });
};

const codeGenerator = name => {
  return new Promise((resolve, reject) => {
    Code.find({ Name: name }, { _id: 0, __v: 0 })
      .exec()
      .then(docs => {
        resolve(docs);
      })
      .catch(err => {
        reject(handleError(err));
      });
  });
};

module.exports = {
  deviceGenerator: deviceGenerator,
  codeGenerator: codeGenerator
};
