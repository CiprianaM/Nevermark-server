'use strict';
const ElasticClient = require('./elasticClass');
const options = {
  host: "http://localhost:9200",
  debug: true
}
const client = new ElasticClient(options);
(async () => {
  await client.reindex("history")
})()