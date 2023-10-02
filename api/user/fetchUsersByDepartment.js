const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const fetchUsersByDepartment = (req, res) => {
  let {department} = req.body;
  User.find({department: department}, '_id departement email firstName lastName profileIconBackgroundColor profileIconColor role').exec().then(data => {
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "Les usagé ont bien été récolté",
        data: data
      })
    } else {
      res.status(403).json({
        error: true,
        message: "Aucune usagé n'a été trouvé.",
        data: null
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produit lors de la recherche d'usagé,\n réessayer.",
      data: null
    })
  })
};

module.exports = fetchUsersByDepartment;