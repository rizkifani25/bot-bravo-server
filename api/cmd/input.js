const shell = require("shelljs");

module.exports = Input = (text, device) => {
  shell.exec(
    "adb -s " + device + " shell input text '" + text + "'",
    async (err, stdout) => {
      if (err) return err;
      else console.log("Input Success");
    }
  );
};
