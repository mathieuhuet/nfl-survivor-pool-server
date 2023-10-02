

const getUserInfo = (req, res) => {
  const data = {
    firstName: req.user.firstName, 
    lastName: req.user.lastName, 
    email: req.user.email,
    username: req.user.username,
    gameWin: req.user.gameWin,
    gameLose: req.user.gameLose,
    poolWin: req.user.poolWin,
    poolLose: req.user.poolLose,
    profileIconColor: req.user.profileIconColor,
    profileIconBackgroundColor: req.user.profileIconBackgroundColor,
    _id: req.user._id.toString()
  };
  res.status(200).json({
    error: false,
    message: "Les informations à propos de l'utilisateur ont bien été récolté",
    data: data
  })
};

module.exports = getUserInfo;