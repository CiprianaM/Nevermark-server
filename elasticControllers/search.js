'use strict';
const searchAll = require('./searchAll');
const textSearch = require('./searchMultiple');

const filterSearchReq = async (req,res) => {
  if (req.params.search) {
    textSearch(req,res);
  } else {
    searchAll(req,res);
  }
};
module.exports = filterSearchReq;