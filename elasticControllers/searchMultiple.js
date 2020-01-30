'use strict';
const client = require('../elasticDb');

const retrieveMultiple = async (req,res) => {
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
          multi_match : {
            query : req.params.search,
            fields : [ 'pageTitle^3','pageText','url' ]
          }
        }

      }
    });

    const totalPages = Math.ceil(result.body.hits.total.value / 20);
    const response = {
      hits : result.body.hits.total.value,
      totalPageNum : totalPages,
      results : []
    };
    result.body.hits.hits.forEach((hit,index) => {
      const newSource = Object.assign({},hit._source);
      newSource.shortUrl = newSource.url.length < 40 ? newSource.url : newSource.url.substr(0,40) + '...';
      newSource.domain = newSource.url
        .split('/')[0]
        .split('?')[0];
      delete newSource.userId;
      response.results.push(newSource);
    });
    res.set({
      'Access-Control-Allow-Origin' : '*'
    })
      .status(201)
      .json(response)
      .end();

    console.log(`you've got ${result.body.hits.hits.length} matches`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = retrieveMultiple;