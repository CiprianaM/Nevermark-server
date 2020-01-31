'use strict';
const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');

const retrieveAll = async (req,res) => {
  console.log('searchAll request received');
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;
  try {
    res.searchResults = await client.search({
      index : 'history',
      body : {
        size : pageSize,
        from : pageNum * pageSize,
        query : {
          match_all : {}
        },
        sort : {
          'log.visitStartTime' : {order : 'desc'}
        }
      }
    });
    return elasticResToFront(req,res);

  } catch (error) {
    console.log('error : ',error);
    throw new Error(error);
  }
};

module.exports = retrieveAll;
