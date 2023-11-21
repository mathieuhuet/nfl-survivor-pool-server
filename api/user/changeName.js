const mongoUserDB = require('../../config/mongoUser');

const User = mongoUserDB.model('users', require('../../schemas/User/user'));


const changeName = (req, res) => {
  let {firstName, lastName} = req.body;
  let {email} = req.user
  // remove white-space
  firstName = firstName.trim();
  lastName = lastName.trim();
  if ( firstName === "" || email === "") {
    res.status(400).json({
      error: true,
      message: "Empty input fields",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(firstName)) {
    res.status(400).json({
      error: true,
      message: "Invalid first name format",
      data: null
    });
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(lastName)) {
    res.status(400).json({
      error: true,
      message: "Invalid last name format",
      data: null
    });
  } else if (lastName.length > 20) {
    res.status(400).json({
      error: true,
      message: "Last name too long (max: 20 characters)",
      data: null
    });
  } else if (firstName.length > 20) {
    res.status(400).json({
      error: true,
      message: "First name too long (max: 20 characters)",
      data: null
    });
  } else {
    // Capitalize first letter of both names
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    if (lastName) {
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }
    // Checking if user already exists
    email = email.trim();
    User.updateOne({email}, {firstName: firstName, lastName: lastName}).then(() => {
      res.status(200).json({
        error: false,
        message: "Name updated succesfully",
        data: {firstName: firstName, lastName: lastName}
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Internal error occured while updating name, try again please.",
        data: null
      })
    })
  }
};

module.exports = changeName;