'use strict';
const searchAll = require('./searchAll');
const textSearch = require('./searchMultiple');

const filterSearchReq = async (req,res) => {

  var ret;
  try {
    if (req.params.search) {
      ret = await textSearch(req,res);
    } else {
      ret = await searchAll(req,res);
    }

    res.status(200)
      .json(ret);
  } catch (error) {
    res.status(500)
      .json({error : true});
  }
};
module.exports = filterSearchReq;