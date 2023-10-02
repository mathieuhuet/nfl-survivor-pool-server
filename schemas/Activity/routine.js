const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  title: String,
  description: String,
  creator: String,
  dateCreated: Date,
  activityDate: Date,
  type: String,
  level: String,
  department: String,
  employee: String,
  site: String,
  system: String,
  acquit: Boolean,
  acquitCreator: String,
  acquitComments: String,
  acquitDate: Date,
  acquitHelp: Array,
});


module.exports = routineSchema;