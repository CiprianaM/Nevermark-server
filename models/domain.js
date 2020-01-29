require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
  domain : { type : String,required : true },
  faviconUrl : {type : String,required : false},
});

module.exports = mongoose.model('Domain',domainSchema);