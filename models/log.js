const mongoose = require('../db');
// const Schema = mongoose.Schema;

const logSchema = new mongoose.Schema({
  userId : { type : mongoose.Schema.Types.ObjectId,required : true },
  urlId : {type : mongoose.Schema.Types.ObjectId,required : true},
  domainId : {type : mongoose.Schema.Types.ObjectId,required : true},
  visitTime : { type : String,required : true },
  timeSpent : { type : String,required : true },
});
module.exports = mongoose.model('Log',logSchema);