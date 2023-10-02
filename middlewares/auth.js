const secret = require('../secret');
const jwt = require('jsonwebtoken');
const mongoUserDB = require('../config/mongoUser');
const User = mongoUserDB.model('users', require('../schemas/User/user'));


const authMiddleware = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return res.status(403).json({
      error: true,
      message: "Il manque le AccessToken pour bien effectuer la requête",
      data: null
    });
  }
  const accessToken = authHeaders.split(' ')[1];
  try {
    // verify & decode token payload,
    const accessTokenReceived = jwt.verify(accessToken, secret.SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ accessToken: accessTokenReceived.accessToken });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Autorisation refuser, le AccessToken ne correspond à aucun des AccessToken dans notre base de donnée",
        data: null
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: true,
      message: "Erreur lors de l'autorisation.",
      data: null
    });
  }
};

module.exports = authMiddleware;
