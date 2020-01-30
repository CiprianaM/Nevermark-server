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
  console.log('searchAll request received');
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;
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

    const response = {
      // hits : result.body.hits.total,
      // totalPageNum : totalPages,
      results : []
    };
    result.body.hits.hits.forEach((hit) => {
      const newSource = Object.assign({},hit._source);
      delete newSource.userId;
      delete newSource.pageText;
      delete newSource.hits;
      newSource.shortUrl = newSource.url.length < 40 ? newSource.url : newSource.url.substr(0,40) + '...';
      newSource.domain = newSource.url
        .split('/')[0]
        .split('?')[0];
      delete newSource.userId;
      // delete newSource.totalPageNum;
      response.results.push(newSource);
    });
    res.set({
      'Access-Control-Allow-Origin' : '*'
    })
      .status(200)
      .json(response);

    console.log(`you've got ${result.body.hits.total} matches`);
  } catch (error) {
    console.log('error : ',error);
    throw new Error(error);
  }
};

module.exports = retrieveAll;
