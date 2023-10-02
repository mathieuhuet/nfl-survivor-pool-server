const mongoUserDB = require('../../config/mongoUser');
const User = mongoUserDB.model('users', require('../../schemas/User/user'));
const getRandomColor = require('../../utils/getRandomColor');


const register = (req, res) => {
  let {firstName, lastName, email, role, department, admin} = req.body;
  // remove white-space
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  if ( firstName === "" || email === "") {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ -]*$/.test(firstName)) {
    res.status(400).json({
      error: true,
      message: "Prénom invalide",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ -]*$/.test(lastName)) {
    res.status(400).json({
      error: true,
      message: "Nom de famille invalide",
      data: null
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400).json({
      error: true,
      message: "Adresse courriel invalide.",
      data: null
    });
  } else {
    // Capitalize first letter of both names
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    if (lastName) {
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }
    // Checking if user already exists
    User.find({email}).then(result => {
      if (result.length) {
        res.status(403).json({
          error: true,
          message: "Utilisateur avec ce courriel existe déjà",
          data: null
        });
      } else {
        const backgroundColor = getRandomColor();
        const newUser = new User({
          firstName,
          lastName,
          email,
          role,
          department,
          admin,
          accessToken: '',
          profileIconColor: 'white',
          profileIconBackgroundColor: backgroundColor,
          online: false
        });
        newUser.save().then(result => {
          res.status(201).json({
            error: false,
            message: 'Compte créer avec succès.',
            data: result
          })
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            error: true,
            message: "Une erreure s'est produite dans la base de donnée.",
            data: null
          });
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Une erreure s'est produite durant la vérification d'un utilisateur existant avec ce courriel.",
        data: null
      });
    })
  }
};

module.exports = register;