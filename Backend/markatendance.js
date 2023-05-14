/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Attendance = new Schema({
    staffid: {
        type: String
    },
    name: {
        type: String
    },
    day: {
        type: String
    },
    email: {
        type: String
    } ,
    day: {
        type: String
    },
    status: {
        type: String
    }
 },
  {
    collation: 'attendance'
});

module.exports = mongoose.model('Attendance',Attendance);