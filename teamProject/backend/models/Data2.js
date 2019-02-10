const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const Data2Schema = new Schema({
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

module.exports = mongoose.model('data2', Data2Schema); 