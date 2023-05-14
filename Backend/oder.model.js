/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


OderInventory = new Schema({
    pName: {
        type: String
    },
    category: {
        type: String
    },
    pieces: {
        type: String
    },
    total: {
        type: String
    }
    ,
    status: {
        type: String
    }

 },
  {
    collation: 'oderInventory'
});

module.exports = mongoose.model('OderInventory',OderInventory);