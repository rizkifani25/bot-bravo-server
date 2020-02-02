const shell = require("shelljs");

module.exports = Tap = (coorX, coorY, device) => {
  shell.exec(
    "adb -s " + device + " shell input tap " + coorX + " " + coorY,
    async (err, stdout) => {
      if (err) return err;
      else console.log("Tap Success");
    }
  );
};
