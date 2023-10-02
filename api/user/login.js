const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));

const sendVerificationEmail = require('./sendEmailCode');


const login = (req, res) => {
  let {email} = req.body;
  // remove white-space
  email = email.trim();
  if (email === "") {
    res.status(400).json({
      error: true,
      message: "Veuillez entrer votre adresse courriel",
      data: null
    });
  } else {
    User.find({email}).then(data => {
      // if (data.length) === user found
      if (data.length) {
        sendVerificationEmail(data[0], res);
      } else {
        res.status(403).json({
          error: true,
          message: "Il n'y a pas d'utilisateur avec ce courriel,\ncontacter votre administrateur réseau.",
          data: null
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreur s'est produit lors de la vérification de l'utilisateur,\n réessayer.",
        data: null
      })
    })
  }
};

module.exports = login;