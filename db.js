const mongoose = require ('mongoose');
// const mongoDB = 'mongodb://localhost/historyDB'; //this should be the link from mlab
const mongoDB = "mongodb://Cipriana:Floricescu1.@cluster0-j53v9.mongodb.net/prod"

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error)=> console.log('Successfully connected to DB!'));
module.exports = {mongoose};



