const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = require('./request_queue');

const SentSchema = new Schema({
  assetId: String,
  reqEmp: String,
  fromDate: Number,
  endDate: Number,
  approved: Boolean,
  isClosed: Boolean
});

module.exports = SentSchema;
