const secret = require('../secret');
const mongoose = require('mongoose');
const mongoURI = secret.MONGODB_SITE_URI || 'put your mongoDB URI here'

mongoSiteDB = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });


module.exports = mongoSiteDB;