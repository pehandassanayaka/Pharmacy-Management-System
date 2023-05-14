/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


Task = new Schema({
    taskNo: {
        type: String
    },
    staffid: {
        type: String
    },
    description: {
        type: String
    }
    ,
    email: {
        type: String
    }
    ,
    status: {
        type: String
    }
 },
  {
    collation: 'task'
});

module.exports = mongoose.model('Task',Task);