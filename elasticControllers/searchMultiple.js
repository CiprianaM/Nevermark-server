'use strict';
const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');

const retrieveMultiple = async (req,res) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;

  try {
    res.searchResults = await client.search({
      index : 'history',
      track_scores : true,

      body : {
        size : pageSize,
        from : pageNum * pageSize,
        query : {
          multi_match : {
            query : req.params.search,
            fields : [ 'pageTitle^3','pageText','url' ]
          }
        },
        sort : {
          'log.visitStartTime' : {order : 'desc'},
          _score : {order : 'desc'}
        }

      }
    });

    return elasticResToFront(req,res);
  } catch (error) {
    console.log(error);
  }
};
module.exports = retrieveMultiple;