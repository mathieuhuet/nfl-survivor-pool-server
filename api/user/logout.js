const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const logout = (req, res) => {
  let {email} = req.user;
  email = email.trim();
  User.updateOne({email}, {online: false}).then(() => {
    res.status(200).json({
      error: false,
      message: "Déconnection fut un succès",
      data: true
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur interne s'est produite lorsqu'on a essayé de vous déconnecter.",
      data: null
    })
  })
};

module.exports = logout;