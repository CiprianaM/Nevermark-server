'use strict';
const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');
require('dotenv').config({ path : '../.env.dev' });

const retrieveMultiple = async (req,res) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const {NBRES_PER_FETCH} = process.env || 20;
  console.log(NBRES_PER_FETCH);
  try {
    res.searchResults = await client.search({
      index : 'history',
      track_scores : true,
      body : {
        size: NBRES_PER_FETCH,
        from: pageNum * NBRES_PER_FETCH,
        query : {
          multi_match : {
            query : req.params.search,
            fields : [ 'pageTitle^3','pageText'],
            type: 'bool_prefix',
            fields: [
              'pageTitle',
              'pageTitle._2gram',
              'pageTitle._3gram',
              'pageText',
              'pageText._2gram',
              'pageText._3gram'
            ],
          }},
          sort : {
            _score : {order : 'desc'},
            'log.visitStartTime' : {order : 'desc'},
          }
        }
      });
      return elasticResToFront(req,res);
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = retrieveMultiple;