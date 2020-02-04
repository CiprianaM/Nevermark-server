'use strict';
const esClient = require('../elasticDb');
const { ELASTIC_INDEX } = process.env;

const deleteDomain = async(req,res) => {
  try {
    const response = await esClient.search({
      index: ELASTIC_INDEX,
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