const fs=require('fs');
const dataBuffer=fs.readFileSync('test.json');
dataJSON=dataBuffer.toString();
console.log(JSON.parse(dataJSON))
const data=fs.readFileSync('test.txt');
console.log(data.toString())
module.exports=data.toString();
