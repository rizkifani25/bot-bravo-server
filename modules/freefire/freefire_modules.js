const shell = require('shelljs')

const Tap = require('../../api/cmd/tap')
const Swipe = require('../../api/cmd/swipe')
const Input = require('../../api/cmd/input')
const KeyEvent = require('../../api/cmd/keyevent')
const Clipper = require('../../api/cmd/clipper')
const OpenWeb = require('../../api/cmd/openweb')
const Wait = require('../../api/cmd/wait')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = FreeFire = async () => {
    try {
        // console.log("Starting ... ")
        let url = "http://www.kiosgamer.co.id", device = "3300ada89a452449", tujuan = "9206329072"
        // KeyEvent(3, device)
        // await sleep(1000)
        // OpenWeb(url, device)
        // await sleep(2500)
        // Tap(290, 1300, device)
        // await sleep(1000)
        // Tap(800, 1640, device)
        // await sleep(1000)
        // Tap(200, 800, device)
        // await sleep(500)
        // Input(tujuan, device)
        // await sleep(500)
        // Swipe(250, 807, 250, 807, 800, device)
        // await sleep(1000)
        // Tap(625, 700, device)
        // await sleep(2000)
        let text1 = Clipper(device)
        console.log(text1)
        // Tap(550, 960, device)
        // setTimeout(() => {console.log("delay for 2 seconds")}, 2000)
        // Tap(300, 1590, device)
        // setTimeout(() => {console.log("delay for 1 seconds")}, 1000)
        // Tap(530, 1185, device)
        // setTimeout(() => {console.log("delay for 6 seconds")}, 6000)
        // Tap(550, 1050, device)
        // setTimeout(() => {console.log("delay for 3.25 seconds")}, 3250)
        // Tap(500, 140, device)
        // let url2 = "https://kiosgamer.co.id/app/100067/buy/0/208070/item/8"
        // Input(url2, device)
        // KeyEvent(66, device)
        // setTimeout(() => {console.log("delay for 0.7 seconds")}, 700)
        // Swipe(1010, 960, 1010, 960, 800, device)
        // Tap(170, 875, device)
        // let text2 = Clipper(device)
        // console.log(text2)
        // KeyEvent(3, device)
        // Tap(950, 220, device)
        // setTimeout(() => {console.log("delay for 2 seconds")}, 2000)
        // Tap(550, 815, device)
        // KeyEvent(187, device)
        // KeyEvent(187, device)
        // Swipe(400, 1100, 400, 200, 100, device)
        // Tap(200, 1122, device)
        // KeyEvent(279, device)
        // Tap(550, 900, device)
        // Swipe(977, 279, 977, 279, 1100, device)
        // Swipe(1065, 335, 1020, 1875, 500, device)
        // Tap(176, 215, device)
        // Tap(530, 1850, device)
        // Tap(680, 1530, device)
        // KeyEvent(187, device)
        // Tap(500, 1845, device)
        // let text3 = Clipper(device)
        // console.log(text3)
        // + " " + text3
        // + " " + text2
        return text1
    } catch (error) {
        return error
    }
}