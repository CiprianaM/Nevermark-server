'use strict';
const esClient = require('../elasticDb');

const deleteDomain = async (req,res) => {
  console.log('delete domain called');
  console.log(req.body);
  try {
    const response = await esClient.deleteByQuery({
      index : 'history-reindexed',
      body : {
        query : {
          bool : {
            must : [
              { term : { 'userId.keyword' : { value : req.body.userId } } },
              { wildcard : { 'domain' : { value : req.body.domain } } }
            ],
          }
        }
      }
    });
    console.log('-----no error---');
    res.status(202).json(response);
    // res.end();
  } catch (error) {
    console.log('error' + error);
    res.status(500).json(error);
  }
};

module.exports = deleteDomain;