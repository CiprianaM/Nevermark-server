'use strict';

const esClient = require('../elasticDb');

const deletion = async(req,res) => {
  try {
    const deleteSelected = await esClient.deleteByQuery({
      index: 'history',
      body: {
        query: {
          bool: {
            must: [
              { term: { 'userId.keyword': { value: req.body.userId } } },
              { term: { 'url.keyword': { value: req.body.url } } }
            ]
          }
        }
      }
    });
    res.status(204);
  } catch (error) {
    console.log(error);
  }
}

module.exports = deletion;