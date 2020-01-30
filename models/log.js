const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const logSchema = new mongoose.Schema({
  userId : { type : String,required : true }, // Todo cast to : mongoose.Schema.Types.ObjectId
  urlId : {type : mongoose.Schema.Types.ObjectId,ref : 'Url',required : true},
  domainId : {type : mongoose.Schema.Types.ObjectId,required : true},
  visitStartTime : { type : String,required : true },
  visitTimeSpent : { type : String,required : true },
},{ autoCreate : true});
module.exports = mongoose.model('Log',logSchema);