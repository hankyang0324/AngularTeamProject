const express = require('express');
const datas = express.Router();
const cors = require('cors');

const Data = require('../models/Data')
const Data1 = require('../models/Data1');
const Data2 = require('../models/Data2')
datas.use(cors());

datas.get('/data',(req,res)=>{
    Data.find().then(data=>{
        res.json(data);
    })
});

datas.post('/post',(req,res)=>{
    const data=new Data({
        code:req.body.code,
        name:req.body.name
    });
    data.save().then(res.json("success"));
})

datas.post('/post1',(req,res)=>{
    const data1=new Data1({
        id:req.body._id,
        code:req.body.code,
        name:req.body.name
    });
    Data1.findOneAndUpdate({id:req.body._id},{
        $set:{
            code:req.body.code,
            name:req.body.name
        }
    },function(err,result){
        if(err){
            res.json(err);         
        } else {
            if(result==null){
                data1.save().then(res.json("add1"));
            } else {
                res.json('updata1');
            }
        }
    })  
})

datas.post('/post2',(req,res)=>{
    const data2=new Data2({
        id:req.body._id,
        code:req.body.code,
        name:req.body.name
    });
    Data2.findOneAndUpdate({id:req.body._id},{
        $set:{
            code:req.body.code,
            name:req.body.name
        }
    },function(err,result){
        if(err){
            res.json(err);        
        } else {
            if(result==null){
                data2.save().then(res.json("add2"));
            } else {
                res.json('updata2');
            }
        }
    }) 
})

module.exports = datas;