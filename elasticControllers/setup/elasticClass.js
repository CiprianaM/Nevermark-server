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
    console.log(reindexParams);
    try {
      await axios.post(this.host + "/_reindex", reindexParams);
      this.log("Success!");
    } catch (error) {
      this.log(error)
      throw error;
    }
  }
  async putMappings(index, field) {
    let properties = {
      [field]: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256
          }
        }
      },
    }
        console.log(properties);
    const newMappings = {
      properties: properties
    }
    console.log(newMappings)
    try {
      console.log(`${this.host}/${index}/_mapping`);
      // await axios.put(`${this.host}/${index}/_mappings`, newMappings);
      await axios.put(`${this.host}/${index}/_mapping`, newMappings);
      this.log("Success!");
    } catch (error) {
      this.log(error)
      throw error;
    }
  }

  search(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.search(...args);
  }
  async delete(index) {
    try {
      await axios.delete(`${this.host}/${index}`);
      this.log("Success!")
    } catch (error) {
      this.log(error)
      throw error;
    }
  }
  exists(actualRealElasticSearchClient,...args) {
    return actualRealElasticSearchClient.indices.exists(...args);
  }
  async create(index) {
    try {
      await axios.put(`${this.host}/${index}`);
      this.log("Success!");
    } catch (error) {
      this.log(error)
      throw error;
    }
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