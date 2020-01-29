'use strict';
const esClient = require('../elasticDb');

const receivedReq = {
  body: {
    text: 'stackoverflow mongoose',
    pageNum: 1
  }
}

const retrieveMultiple = async (req, res) => {
  let pageNum = 0;
  const pageSize = 20;
  const searchedText = req.body.text;
  if(req.body.pageNum !== undefined) pageNum = req.body.pageNum;
  try {
    const result = await esClient.search({
      index: 'history',
      body: {
        size: pageSize,
        from: pageNum*pageSize,
        query: {
          bool: {
            must: {
              match: {
                text: {
                  query: searchedText,
                  minimum_should_match: "50%",
                }
              }
            },
            should: {
              match_phrase: {
                text: {
                  query: searchedText,
                  slop: 50, //check what slop does
                }
              }
            }
          }
        }
      }
    })
    res.status(201);
      res.json(result.body.hits.hits);
      res.end();
      console.log(`you've got ${result.body.hits.hits.length} matches`)
  } catch (error) {
    console.log(error);
  }
}

// retrieveMultiple(receivedReq);
module.exports = retrieveMultiple;