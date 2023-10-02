const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  department: String,
  admin: Boolean,
  profileIconColor: String,
  profileIconBackgroundColor: String,
  accessToken: String,
  online: Boolean
});


module.exports = userSchema;