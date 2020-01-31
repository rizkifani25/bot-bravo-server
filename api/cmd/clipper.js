const shell = require('shelljs')

module.exports = Clipper = (device) => {
    function command(){
        return new Promise((resolve, reject) => {
            let doInShell = shell.exec("adb -s " + device + " shell am broadcast -a clipper.get", (code, stdout, stderr) => {
                
            })
            
            doInShell.stdout.on('data', (data) => {
                console.log(data)
            })
        })
    }

    const response = command()
    response
        .then(() => {
            console.log(response)
            // return response
        })
        .catch(() => {
            console.log(response)
            // return response
        })
}