const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const getOtherUserInfo = (req, res) => {
  let {userId} = req.body;
  User.find({_id: userId}).then(data => {
    // if (data.length) === activity found
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "L'usagé a bien été récolté",
        data: {
          firstName: data[0].firstName, 
          lastName: data[0].lastName, 
          email: data[0].email,
          username: data[0].username,
          gameWin: data[0].gameWin,
          gameLose: data[0].gameLose,
          poolWin: data[0].poolWin,
          poolLose: data[0].poolLose,
          profileIconColor: data[0].profileIconColor,
          profileIconBackgroundColor: data[0].profileIconBackgroundColor,
          _id: data[0]._id.toString()
        }
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

module.exports = getOtherUserInfo;