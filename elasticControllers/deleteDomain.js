'use strict';
const esClient = require('../elasticDb');

const deleteDomain = async(req,res) => {
  try {
    const response = await esClient.deleteByQuery({
      index: 'history-reindexed',
      body: {
        query: {
          bool: {
            must: [
              { term: { 'userId.keyword': { value: req.body.userId } } },
              { term: { 'domain.keyword': { value: req.body.domain } } }
            ],
          }
        }
      }
    });
    res.status(202).json(response);
    // res.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = deleteDomain;