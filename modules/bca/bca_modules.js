const wd = require('wd')

const serverConfig = {
  host: 'localhost',
  port: 4723
}

const desired = {
    platformName: 'Android',
    deviceName: '3300ada89a452449',
    appPackage: "com.bca",
    app: "D:/Project/bot-bravo-server/modules/bca/bca.apk",
    noReset: true,
    fullReset: false,
    autoGrantPermissions: true
}

const driver = wd.promiseChainRemote(serverConfig)

module.exports = async (data) => {
    await driver.init(desired)
    await driver.setImplicitWaitTimeout(5000)
    
    try {
      await driver.elementById("com.bca:id/main_btn_bca").click()
    } catch (error) {
      let element = await driver.elementById("com.bca:id/dlg_sh_msg").text()
      let res = element
      await driver.closeApp()
      return res
    }
}