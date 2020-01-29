const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = require('../db');

const model = {};

fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const colName = file.split('.')[0];
    model[colName] = require(path.join(__dirname,file));
    model[colName].init();
  });

module.exports = model;