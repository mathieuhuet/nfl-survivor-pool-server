const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));

const changeIcon = (req, res) => {
  let {profileIconColor,
    profileIconBackgroundColor,
    profileIconPolice} = req.body;
  let {email} = req.user
  if (profileIconBackgroundColor === "" || profileIconColor === "" || profileIconPolice === "") {
    res.status(400).json({
      error: true,
      message: "Requête vide reçu.",
      data: null
    });
  } else {
    email = email.trim();
    User.updateOne({email}, {
        profileIconBackgroundColor: profileIconBackgroundColor,
        profileIconColor: profileIconColor}).then(() => {
      res.status(200).json({
        error: false,
        message: "Modification de L'icone a été un succès",
        data: {
            profileIconBackgroundColor: profileIconBackgroundColor,
            profileIconColor: profileIconColor}
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Erreur interne, réessayer.",
        data: null
      })
    })
  }
};

module.exports = changeIcon;