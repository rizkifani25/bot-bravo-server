const shell = require("shelljs");

module.exports = Clipper = async device => {
  // let result
  // try {
  //     await shell.exec("adb -s " + device + " shell am broadcast -a clipper.get", {silent:true}, (code, output, error) => {
  //         if(code != 0){
  //             result =  error
  //         }else{
  //             result =  output
  //         }
  //     })
  // } catch (error) {
  //     result = error
  // }

  // return result

  const command = new Promise((resolve, reject) => {
    shell.exec(
      "adb -s " + device + " shell am broadcast -a clipper.get",
      { silent: true },
      async (code, stdout, stderr) => {
        let fromShell = stdout.toString();
        let replaceStepOne = fromShell.replace(
          "Broadcasting: Intent { act=clipper.get flg=0x400000 }",
          ""
        );
        let replaceStepTwo = replaceStepOne.replace(
          "Broadcast completed: result=-1, data=",
          ""
        );
        const result = replaceStepTwo;
        if (result != "")
          setTimeout(() => {
            resolve(result);
          }, 500);
        else
          setTimeout(() => {
            reject(result);
          }, 500);
      }
    );
  });

  console.log("Clipper Start");
  command
    .finally(() => console.log("Clipper already done"))
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(response => {
      console.log(response);
      return response;
    });
  console.log("Clipper Exit");
};
