'use strict';
const client = require('../elasticDb');
var moment = require('moment');

const textExtract = (str,kws,maxlen = 100,tag) =>{
  console.log('kws : ' + kws);
  if (!str) return '';
  if (!kws || !kws.length) {
    return str.substr(Math.floor(str.length / 2),maxlen);
  }
  let strLow = str.toLowerCase();
  let kwsTolow = kws.toLowerCase();
  let start = strLow.indexOf(kwsTolow);
  let end = kws.length;
  if (start > -1) return `${str.substring(start - 10,start)}<${tag}>${str.substr(start,end)}</${tag}>${str.substring(end,start + maxlen - start)}`;
  return str.substr(Math.floor(str.length / 2),maxlen);
};

function highlightKws (str,kwsStr) {

  const termsArr = kwsStr.split(' ');
  let ret = str;
  console.log('termsArr:' + termsArr);
  termsArr.forEach((term)=>{
    ret = ret.replace(new RegExp(term,'gi'),(match) => `<strong>${match}</strong>`);
  }
  );
  return ret;
}

const retrieveMultiple = async (req,res) => {
  let pageNum = 0;
  if (req.body.pageNum !== undefined) pageNum = req.body.pageNum - 1;
  const pageSize = 20;

  try {
    const result = await client.search({
      index : 'history',
      track_scores : true,

      body : {
        size : pageSize,
        from : pageNum * pageSize,
        query : {
          multi_match : {
            query : req.params.search,
            fields : [ 'pageTitle^3','pageText','url' ]
          }
        },
        sort : {
          'log.visitStartTime' : {order : 'desc'},
          _score : {order : 'desc'}
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
      newSource.pageTitle = highlightKws(newSource.pageTitle,req.params.search);
      newSource.pageText = textExtract(newSource.pageText,req.params.search,100,'strong');
      newSource.lastVisitTime = moment(newSource.log[newSource.log.length - 1].visitStartTime).fromNow();
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