'use strict';
const axios = require("axios");

class ElasticClient {

  constructor(options) {
    this.host = options.host // *required
    this.debug = options.debug || false
  }

  async reindex(index) {
    const reindexParams = {
      source: {
        index
      },
      dest: {
        index: index + "-reindexed"
      }
    };
    try {
      await axios.post(this.host + "/_reindex", reindexParams);
      this.log("Success!");
    } catch (error) {
      this.log(error)
      throw error;
    }
  }
  async putMappings(index, field, type) {
    const properties = {
      field: field,
      type: type
    }
    const newMappings = {
      properties: properties
    }
    try {
      await axios.put(`${this.host}/${index}/_mappings`, newMappings);
      this.log("Success!");
    } catch (error) {
      this.log(error)
      throw error;
    }
  }

  search(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.search(...args);
  }
  delete(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.indices.delete(...args);
  }
  exists(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.indices.exists(...args);
  }
  create(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.indices.create(...args);
  }
  indices(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.cat.indices(...args)
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
  }


  log(message) {
    if (!this.debug) {
      return;
    }
    console.log("[ElasticSearch] " + message)
  }
}
module.exports = ElasticClient;