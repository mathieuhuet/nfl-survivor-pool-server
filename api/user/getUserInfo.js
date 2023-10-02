

const getUserInfo = (req, res) => {
  const data = {
    firstName: req.user.firstName, 
    lastName: req.user.lastName, 
    email: req.user.email,
    role: req.user.role,
    admin: req.user.admin,
    department: req.user.department,
    profileIconColor: req.user.profileIconColor,
    profileIconBackgroundColor: req.user.profileIconBackgroundColor,
    profileIconPolice: req.user.profileIconPolice,
    _id: req.user._id.toString()
  };
  res.status(200).json({
    error: false,
    message: "Les informations à propos de l'utilisateur ont bien été récolté",
    data: data
  })
};

module.exports = getUserInfo;