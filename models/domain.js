require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
  domain : { type : String,required : true },
  faviconUrl : {type : String,required : true},
});

module.exports = mongoose.model('Domain',domainSchema);