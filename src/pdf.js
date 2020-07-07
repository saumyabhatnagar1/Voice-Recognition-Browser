const fs = require('fs')
const pdfparse = require('pdf-parse')
const pdffile = fs.readFileSync('sample.pdf')



pdfparse(pdffile).then(function (data) {
    //console.log(data.info)
    //console.log(data.text)
    var a = data.text.toString()
    b = a.substring(0, 1000)
    //say.speak(b)
    exports.c = a


})

