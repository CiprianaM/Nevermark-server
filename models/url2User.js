require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url2User = new Schema({
  userId : { type : mongoose.Schema.Types.ObjectId,required : true },
  urlId : {type : mongoose.Schema.Types.ObjectId,required : true},
  domainId : {type : mongoose.Schema.Types.ObjectId,required : true},
  pageTitle : { type : String,required : true },
  pageText : { type : String,required : true },
});

module.exports = mongoose.model('Url2User',url2User);