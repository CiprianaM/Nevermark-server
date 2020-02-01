'use strict';
const ElasticClient = require('./elasticClass');
const actualElasticClient = require('../../elasticDb');
const options = {
  host: "http://localhost:9200",
  debug: true
}
const index = 'exampleindex';
const client = new ElasticClient(options);
(async () => {
  await client.delete(actualElasticClient, index)
})()