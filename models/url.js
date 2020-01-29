require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  fullUrl : { type : String,required : true },
  url : { type : String,required : true },
  protocol : { type : String,required : true },
  domainId : {type : mongoose.Schema.Types.ObjectId,ref : 'Domain',required : true},
});

module.exports = mongoose.model('Url',urlSchema);