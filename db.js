const mongoose = require ('mongoose');
const { DB_HOST,DB_PORT,DB } = process.env;
try {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB}`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    // user : process.env.DB_USER,
    // pass : process.env.DB_PASS
  });
  console.log('Successfully connected to db');
} catch (e) {
  console.log('Error trying go connect to db : ' + e);
}

module.exports = mongoose;
