'use strict';

const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');
const buildQuery = require('./utils/buildQuery');
const matchAllQuery = require('./queries/matchAllQuery');

const retrieveAll = async (req,res) => {
  try {
    res.searchResults = await client.search(buildQuery(matchAllQuery(),req));
    return elasticResToFront(req,res);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = retrieveAll;
