require("../db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  userId: { type: String, required: true },
  fullUrl: { type: String, required: true },
  fullTitle: { type: String, required: true },
  text: { type: String, required: false },
  createdAt: { type: String, required: true },
  timeSpent: { type: String, required: true },
  url: { type: String, required: true },
  terms: { type: Array, required: true },
  titleTerms: { type: Array, required: true },
  domain: { type: Array, required: true },
  hostname: { type: String, required: true },
  screenshot: { type: String, required: false },
  updatedAt: { type: String, required: true },
});

const myUrlModel = mongoose.model("Event", urlSchema);

module.exports = myUrlModel;