const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
  email: String,
  loginCode: String,
  createdAt: Number,
  expiresAt: Number,
});



module.exports = userVerificationSchema;