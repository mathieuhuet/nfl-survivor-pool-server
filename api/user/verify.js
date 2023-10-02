const secret = require('../../secret');
const jwt = require('jsonwebtoken');
const mongoUserDB = require('../../config/mongoUser');
// Generating accesstoken.
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const UserVerification = mongoUserDB.model('userVerification', require('../../schemas/User/userVerification'));
const User = mongoUserDB.model('users', require('../../schemas/User/user'));


// Verify code sent by the user for a successful login.
const verify = async (req, res) => {
  let {email, loginCode} = req.body;
  email = email.trim();
  UserVerification.find({email}).then((data) => {
    if (data.length && data[0].expiresAt < Date.now()) {
      res.status(403).json({
        error: true,
        message: "Incapable de vérifier le code de connection parce que le code à été envoyé il y a plus de 10 minutes",
        data: null
      })
      // delete verification because it has expired., so no need to keep it.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
      UserVerification.deleteMany({email}).then(() => {}).catch(() => {})
    } else if (data.length && (loginCode !== data[0].loginCode)) {
      res.status(403).json({
        error: true,
        message: "Le code que vous avez entré ne correspond pas à celui qu'on vous a envoyé,\nvérifier le dernier code que vous avez reçu ou demander un nouveau code de connection.",
        data: null
      })
    } else if (data.length && (loginCode === data[0].loginCode)) {
      const uniqueString = uuidv4();
      User.updateOne({email}, {online: true, accessToken: uniqueString}).then(() => {
        // Finding the user in the db just so we can get his _id variable 
        User.find({email}).then(data => {
          if (data.length) {
            const accessToken = data[0].accessToken;
            const token = jwt.sign({accessToken}, secret.SECRET_KEY);
            res.status(200).json({
              error: false,
              message: "Vérification avec succès",
              data: {token}
            })
          }
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            error: true,
            message: "Une erreur interne s'est produit, réessayer.",
            data: null
          })
        })
      // delete verification because user verified properly so no need to keep the verification.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
      UserVerification.deleteMany({email}).then(() => {}).catch(() => {})
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Le code de connection que vous avez entré est bon,\nmais une erreur interne à empêcher votre connection, réessayer.",
          data: null
        })
      })
    } else {
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produite lors de la vérification de votre code, réessayer",
        data: null
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produite lors de la vérification de votre code, réessayer",
      data: null
    })
  })
};

module.exports = verify;
