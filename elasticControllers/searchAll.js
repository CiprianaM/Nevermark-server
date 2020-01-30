'use strict';
const client = require('../elasticDb');

// ------------------ expected req object start ---------------------------//
const receivedReq = {
  body : {
    pageNum : 1
  }
};
// ------------------ expected req object stop ---------------------------//

const retrieveAll = async (req,res) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;
  const searchedText = req.body.pageText;
  try {
    const result = await client.search({
      index : 'history',
      body : {
        size : pageSize,
        from : pageNum * pageSize,
        query : {
          match_all : {}
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
    res.status(201);
    res.json(response);
    res.end();
    console.log(`you've got ${result.body.hits.hits.length} matches`);
  } catch (error) {
  }
};

module.exports = retrieveAll;
