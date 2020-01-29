require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url2User = new Schema({
  userId : { type : String,required : true }, // Todo cast to : mongoose.Schema.Types.ObjectId
  urlId : {type : mongoose.Schema.Types.ObjectId,ref : 'Url',required : true},
  domainId : {type : mongoose.Schema.Types.ObjectId,ref : 'Domain',required : true},
  pageTitle : { type : String,required : true },
  pageText : { type : String,required : true },
});

module.exports = mongoose.model('Url2User',url2User);