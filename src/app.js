const express=require('express');
const path=require('path');
const NewsAPI = require('newsapi');
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
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));
 
const newsapi = new NewsAPI('09450ba8f8df4dcc8843c88c7105ee37');

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
app.get('/hover-voice',(req,res)=>{
    res.render('hover')
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
app.post('/fetch-news',async(req,res)=>{
    
    const category=req.body.category
    newsapi.v2.topHeadlines({
        //q: 'bitcoin',
        category: category,
        language: 'en',
        country: 'in',
        pageSize:8
      }).then(response => {
          
        let newarr=[]
        for(let i=0;i<6;i++){
            newarr.push(response.articles[i].title)
        }
        res.render('news',{news1:newarr[0],news2:newarr[1],news3:newarr[2],news4:newarr[3],news5:newarr[4]})
        //console.log(JSON.stringify(response))
      }).catch((e)=>{
          console.log(e)
      });
    console.log(category)

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
    
})
app.get('/textdata',(req,res)=>{
    const dataBuffer=fs.readFileSync('test.txt');
    console.log(dataBuffer.toString())
    res.render({text:dataBuffer.toString()})
})

app.listen(3000,()=>{
    console.log('running');
})
