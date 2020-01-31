const moment = require('moment');
const textExtract = require('./textExtract');

const elasticResToFront = (req,res) => {
  const searchResults = res.searchResults;
  const nbHits = searchResults.body.hits.total.value;
  const nbPages = Math.ceil(searchResults.body.hits.total / 20);

  const response = {
    nbPages,
    nbHits,
    results : []
  };
  searchResults.body.hits.hits.forEach((hit) => {
    const newSource = Object.assign({},hit._source);
    delete newSource.userId;
    delete newSource.hits;
    newSource.shortUrl = newSource.url.length < 40 ? newSource.url : newSource.url.substr(0,40) + '...';
    newSource.lastVisitTime = moment(newSource.log[newSource.log.length - 1].visitStartTime).fromNow();
    newSource.pageText = textExtract(newSource.pageText,req.params.search,100,'strong');
    newSource.pageTitle = textExtract(newSource.pageTitle,req.params.search,100,'strong');
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

  console.log(`you've got ${searchResults.body.hits.total.value} matches`);
};

module.exports = elasticResToFront;