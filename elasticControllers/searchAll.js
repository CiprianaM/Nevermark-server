'use strict';
const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');
require('dotenv').config({ path : '../.env.dev' });

const retrieveAll = async (req,res) => {
  console.log('searchAll request received');
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const {NBRES_PER_FETCH} = process.env || 20;
  try {
    res.searchResults = await client.search({
      index : 'history',
      body : {
        size : NBRES_PER_FETCH,
        from : pageNum * NBRES_PER_FETCH,
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
