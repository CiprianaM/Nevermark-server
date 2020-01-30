'use strict';
const client = require('../elasticDb');

// ------------------ expected req object start ---------------------------//
const receivedReq = {
  body : {
    searchedText : 'stackoverflow mongoose',
    pageNum : 1
  }
};
// ------------------ expected req object stop ---------------------------//

const retrieveMultiple = async (req,res) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;
  const searchedText = req.body.searchedText;
  try {
    const result = await client.search({
      index : 'history',
      body : {
        size : pageSize,
        from : pageNum * pageSize,
        query : {
          multi_match : {
            query : req.params.search,
            fields : [ 'pageTitle^3','pageText','url' ]
          }
        }

      }
    });
    const totalPages = Math.ceil(result.body.hits.total / 20);
    console.log(totalPages);
    const response = {
      hits : result.body.hits.hits.length,
      totalPageNum : totalPages,
      results : []
    };
    result.body.hits.hits.forEach((hit,index) => {
      const newSource = Object.assign({},hit._source);
      delete newSource.userId;
      response.results.push(newSource);
    });
    res.set({
      'Access-Control-Allow-Origin' : '*'
    });
    res.status(201);

    res.json(response);
    res.end();
    res.status(200);
    res.json(result.body.hits.hits);
    res.end();
    console.log(`you've got ${result.body.hits.hits.length} matches`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = retrieveMultiple;