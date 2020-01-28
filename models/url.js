require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url : { type : String,required : true },
  protocol : {type : String,required : true},
  domainId : {type : mongoose.Schema.Types.ObjectId,required : true},
  visitTime : { type : String,required : true },
  timeSpent : { type : String,required : true },
});

module.exports = mongoose.model('Url',urlSchema);