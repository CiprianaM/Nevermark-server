'use strict';
const client = require('../elasticDb');

const retrieveAll = async (req, res) => {
  try {
    const result = await client.search({
      index: 'history',
      body: {
        size: 20,
        from: 0,
        query: {
          match_all: {}
        }
      }
    })
    res.status(201);
    res.json(result.body.hits.hits);
    res.end();
    console.log(`you've got ${result.body.hits.hits.length} matches`)
  } catch (error) {
  }
}

module.exports = retrieveAll;
