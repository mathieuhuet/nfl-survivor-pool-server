const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  gameWin: Number,
  gameLose: Number,
  poolWin: Number,
  poolLose: Number,
  profileIconColor: String,
  profileIconBackgroundColor: String,
  accessToken: String,
  online: Boolean
});


module.exports = userSchema;