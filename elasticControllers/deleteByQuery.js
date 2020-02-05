'use strict';

const esClient = require('../elasticDb');

const deletion = async(req,res) => {
  console.log(req.body, 'this is the req.body');
  try {
    const response = await esClient.deleteByQuery({
      index: 'history-reindexed',
      body: {
        query: {
          bool: {
            must: [
              // { term: { 'userId.keyword': { value: req.body.userId } } },
              { term: { 'url.keyword': { value: req.body.url } } }
            ]
          }
        }
      }
    });
    res.status(202).json(response);
    res.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = deletion;