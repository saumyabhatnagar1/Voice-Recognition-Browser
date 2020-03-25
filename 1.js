// In this I m taking python variable in javascript

const spawn = require('child_process').spawn;

const process = spawn('python',['./1.py']);

process.stdout.on('data',data=>{
  console.log(data.toString());
});