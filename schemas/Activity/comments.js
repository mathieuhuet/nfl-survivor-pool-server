const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  activityId: String,
  comments: String,
  dateCreated: Date,
  reported: Boolean,
  creator: String,
});


module.exports = commentsSchema;