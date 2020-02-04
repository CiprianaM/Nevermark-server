const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultUserOptions = new Map([
  ['doNotLogDomains',['google.com','localhost']],
  ['ShowInsideGoogleResults',true],
]);

const userSchema = new Schema({
  googleId : String,
  name : String,
  email : String,
  picture : String,
  options : { type : Map,default : defaultUserOptions },
});

module.exports = mongoose.model('User',userSchema);