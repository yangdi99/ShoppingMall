const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./api');
app.use(bodyParser.json())

//设置跨域 cors
app.all('*',function(req,res,next){
    //localhost:3030表示服务端允许所有进行跨于
    res.header('Access-Control-Allow-Origin','http://169.254.200.20:3030')
    res.header('Access-Control-Allow-Headers','Content-Type,Token')
    res.header('Content-Type',"application/json;charset=utf-8")
    next()
})

api(app)

app.listen(9090, function(){
    console.log('server listen 9090')
})