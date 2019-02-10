var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false //?
    })
);

const mongoURL = 'mongodb+srv://HanYang:Yh19940324@cluster0-f5gmq.mongodb.net/test?retryWrites=true';

mongoose
    .connect(
        mongoURL,
        { useNewUrlParser:true }
    )
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.log(err));

var Users = require('./backend/routes/Users');
var Datas = require('./backend/routes/Datas');

app.use('/users',Datas);//为啥地址必须一样
app.use('/users',Users);

app.listen(port,function(){
    console.log('Server is running on port: '+port);
});