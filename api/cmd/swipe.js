const shell = require("shelljs");

module.exports = Swipe = (coorX1, coorY1, coorX2, coorY2, duration, device) => {
  shell.exec(
    "adb -s " +
      device +
      " shell input swipe " +
      coorX1 +
      " " +
      coorY1 +
      " " +
      coorX2 +
      " " +
      coorY2 +
      " " +
      duration,
    async (err, stdout) => {
      if (err) return err;
      else console.log("Swipe Success");
    }
  );
};
