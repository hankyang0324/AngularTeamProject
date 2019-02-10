const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const Data1Schema = new Schema({
    id: { 
        type: String,
        required: true 
    },
    code:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('data1', Data1Schema); 