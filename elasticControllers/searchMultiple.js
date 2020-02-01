'use strict';

require('dotenv').config({ path : '../.env.dev' });
const client = require('../elasticDb');
const elasticResToFront = require('../utils/elasticResToFront');
const buildQuery = require('./utils/buildQuery');
const matchFuzzy = require('./queries/matchFuzzy');
const index = 'history';

const retrieveMultiple = async (req,res) => {
  try {
    res.searchResults = await client.search(buildQuery(index,matchFuzzy(req), req));
      return elasticResToFront(req,res);
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = retrieveMultiple;