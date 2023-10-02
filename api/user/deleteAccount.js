const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const deleteAccount = (req, res) => {
  let {email} = req.user;
  // remove white-space
  email = email.trim();
  if (email === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else {
    User.updateOne({email}, {email: ''}).then(data => {
      res.status(200).json({
        error: false,
        message: "Delete was successful.",
        data: data.modifiedCount
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "An error occured while deleting the user.",
        data: null
      })
    })
  }
};

module.exports = deleteAccount;