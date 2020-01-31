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

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

module.exports = async (data) => {
    await driver.init(desired)
    await driver.setImplicitWaitTimeout(5000)
    
    try {
      await driver.elementById("com.bca:id/main_btn_bca").click()
      // await driver.elementById("com.bca:id/dlg_edit_text").type("tanu26")
      // await getElementByXpath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout[3]/android.widget.Button[2]").click()
      // await driver.evaluate
    } catch (error) {
      let element = await driver.elementById("com.bca:id/dlg_sh_msg").text()
      let res = element
      await driver.closeApp()
      return res
    }
}