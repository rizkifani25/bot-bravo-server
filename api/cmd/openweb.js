const shell = require("shelljs");

module.exports = OpenWeb = (url, device) => {
  shell.exec(
    "adb -s " +
      device +
      " shell am start -a 'android.intent.action.VIEW' -d " +
      url +
      " 'com.android.chrome'",
    () => {
      console.log("OpenWeb Success");
    }
  );
};
