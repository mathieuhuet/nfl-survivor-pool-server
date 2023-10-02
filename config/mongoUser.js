const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_USER_URI || 'put your mongoDB URI here'

mongoUserDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });


module.exports = mongoUserDB;