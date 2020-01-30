'use strict';
const client = require('../elasticDb');

const sortedResults = async (req, res) => {
  const ordered = req.params.order;
  const sortedField = req.body.clickedField;
  if (sortedField==='totalVisits') {
    try {
      const result = await client.search({
        index : 'history',
        body : {
          query : {
            match_all : {}
          },
          sort : {
            totalVisits: {order: ordered}
          }
        }
      });
      res.status(201);
      res.json(result);
      res.end();
    } catch (error) {
      console.log(error);
    }
  } else {
    if (sortedField==='totalTimeSpent') {
      try {
        const result = await client.search({
          index : 'history',
          body : {
            query : {
              match_all : {}
            },
            sort : {
              totalTimeSpent: {order: ordered}
            }
          }
        });
        res.status(201);
        res.json(result);
        res.end();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = sortedResults;