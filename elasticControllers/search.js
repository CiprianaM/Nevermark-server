'use strict';
const searchAll = require('./searchAll');
const textSearch = require('./searchMultiple');

const filterSearchReq = async (req, res) => {
  if (req.body.searchedText===undefined) {
    searchAll(req, res);
  } else {
    textSearch(req, res);
  }
}
module.exports = filterSearchReq;