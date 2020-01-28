(function () {
  'use strict';

  const fs = require('fs');
  const esClient = require ('../elasticDb');
  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });

      bulkBody.push(item);
    });

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err);
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    const articlesRaw = fs.readFileSync('log.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('log', 'individualLog', articles);
  };

  test();

  module.exports = {
    bulkIndex
  };
} ());