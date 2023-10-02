const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_ACTIVITY_URI || 'put your mongoDB URI here'

mongoActivityDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });


module.exports = mongoActivityDB;