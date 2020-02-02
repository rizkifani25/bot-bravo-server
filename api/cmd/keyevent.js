const shell = require("shelljs");

module.exports = KeyEvent = (key, device) => {
  shell.exec(
    "adb -s " + device + " shell input keyevent " + key,
    async (err, stdout) => {
      if (err) return err;
      else console.log("KeyEvent Success");
    }
  );
};
