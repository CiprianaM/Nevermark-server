'use strict';
const ElasticClient = require('./elasticClass');
const options = {
  host: "https://localhost:9200",
  debug: false
}
const client = new ElasticClient(options);
(async () => {
  await client.putMappings("history-reindexed")
})()