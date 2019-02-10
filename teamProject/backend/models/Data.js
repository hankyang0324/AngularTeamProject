const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const DataSchema = new Schema({
    code:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('datas', DataSchema); 