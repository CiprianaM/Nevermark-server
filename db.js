const mongoose = require ('mongoose');
const mongoDB = 'mongodb://localhost/historyDB'; //this should be the link from mlab

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error)=> console.log('Successfully connected to DB!'));
module.exports = {mongoose};

