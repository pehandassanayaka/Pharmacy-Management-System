/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


PharmacyInventory = new Schema({
    pName: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    pNo: {
        type: String
    },
    qty: {
        type: String
    },
    description: {
        type: String
    }

 },
  {
    collation: 'pharmacyInventory'
});

module.exports = mongoose.model('PharmacyInventory',PharmacyInventory);