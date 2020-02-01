'use strict';
const ElasticClient = require('./elasticClass');
const actualElasticClient = require('../../elasticDb');
const buildQuery = require('./utils/buildQuery');
const matchAllQuery = require('./queries/matchAllQuery');

const options = {
  host: "http://localhost:9200",
  debug: true
}
const index = 'exampleindex';
const req = {body: {}};
const client = new ElasticClient(options);
(async () => {
  await client.search(actualElasticClient, buildQuery(index, matchAllQuery(), req))
})()