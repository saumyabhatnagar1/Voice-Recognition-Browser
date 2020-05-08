const express=require('express');
const path=require('path');
const hbs=require('hbs');
const request=require('request')
const fs=require('fs');
const app=express();
const br=require('braille')
const port=3000||process.env.PORT;
const partialPath=path.join(__dirname,'../templates/partials')
const viewPath=path.join(__dirname,'../templates/views');
const sendEmailto=require('../src/email')
app.set('view engine','hbs');
app.set('views',viewPath);
app.use(express.static(path.join(__dirname,'../public')))
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.render('main')
})
app.get('/news',(req,res)=>{
    res.render('news')
})
app.get('/search',(req,res)=>{
    res.render('search')
})
app.get('/mail',(req,res)=>{
    res.render('email')
    console.log(req.body)
})
app.post('/mail-submit',async(req,res)=>{
    
    
    try{
        console.log(req.body.to,req.body.bodycont)
        sendEmailto.sendEmailto(req.body.to,req.body.bodycont)
        res.send('<body>Submitted</body>')
    }
    catch(e){
        console.log(e)
    }

    
})
app.get('/trysearch',(req,res)=>{
    res.render('searchtry') 
})
app.get('/texthtml',(req,res)=>{
    res.render('test')
})
app.get('/braile',(req,res)=>{

    var fs = require('fs');

    var data = fs.readFileSync('test.txt', 'utf8');
    

    
    var code = br.toBraille(data);
    
    res.render('braille',{braile:code})
})
app.get('/newsdata',(req,res)=>{
    const url='http://newsapi.org/v2/top-headlines?country=us&apiKey=09450ba8f8df4dcc8843c88c7105ee37';
request({url,json:true},(error,data)=>{
    res.send(data)
    
   
})
})
app.get('/textdata',(req,res)=>{
    const dataBuffer=fs.readFileSync('test.txt');
    console.log(dataBuffer.toString())
    res.render({text:dataBuffer.toString()})
})

app.listen(3000,()=>{
    console.log('running');
})
