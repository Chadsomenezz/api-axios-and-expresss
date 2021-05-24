const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const axios = require('axios');
const port = 8080;


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(port,()=>{
    console.log('listening at port: ', port)
})