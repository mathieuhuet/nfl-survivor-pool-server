const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  acronym: String,
  name: String,
});


module.exports = siteSchema;