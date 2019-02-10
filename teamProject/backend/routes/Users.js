const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register',(req,res)=>{
    const userData = {
        name: req.body.name,
        password: req.body.password,
    };    
    User.findOne({
        name: req.body.name
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    userData.password = hash;
                    User.create(userData) //schema 自带的 method
                        .then(user => {
                            res.send({status: user.name + ' Registered!'});
                        })
                        .catch(err=> {
                            res.send('error: '+err);
                        })
                })
            } else {
                res.status(400).send({ error: 'User already exists'})
            }
        })
        .catch(err => {
            res.send('error: '+err);
        })
});

users.post('/login',(req,res)=>{
    User.findOne({
        name: req.body.name
    })
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    //passwords match
                    const payload = {
                        name:user.name,
                        date:user.date
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY,{
                        expiresIn: 1440 
                    });
                    res.json(token);
                } else {
                    //passwords don't match
                    res.status(400).send({ error:'wrong passwords' });
                }
            } else {
                res.status(400).send({ error:'User does not exist' });
            }
        })
        .catch(err=>{
            res.send('error: '+err);
        })
});

users.get('/resource',(req,res)=>{
    var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY); //检测key值 'secret'
    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if(user) {
                res.json(user);
            } else {
                res.status(400).send('User does not exist');
            }
        })
        .catch(err=>{
            res.send('error: '+err);
        })
});

module.exports = users;