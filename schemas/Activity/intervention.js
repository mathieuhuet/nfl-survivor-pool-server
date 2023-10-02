const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interventionSchema = new Schema({
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
  acquitDate: Date,
  acquitHelp: Array,  
  acquitEquipment: String,
  acquitDescription: String,
  acquitResult: String,
  acquitObservation: String,
});


module.exports = interventionSchema;