const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const model = {};

fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {

    model[file.split('.')[0]] = require(path.join(__dirname,file));
  });

module.exports = model;