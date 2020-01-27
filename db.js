require('dotenv').config();
const mongoose = require ('mongoose');
// const mongoDB = 'mongodb://localhost/historyDB'; //this is a local DB used for tests
const mongoDB = "mongodb+srv://cluster0-j53v9.mongodb.net/prod"  //standard connection string format

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
}, (error)=> console.log('Successfully connected to DB!'));
module.exports = {mongoose};



