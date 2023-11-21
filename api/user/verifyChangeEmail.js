const mongoUserDB = require('../../config/mongoUser');

const ChangeEmailRequest = mongoUserDB.model('changeEmail', require('../../schemas/User/changeEmailRequest'));
const User = mongoUserDB.model('users', require('../../schemas/User/user'));


// Verify code sent by the user for a successful login.
const verifyChangeEmail = (req, res) => {
  let {newEmail, code} = req.body;
  let {email} = req.user;
  ChangeEmailRequest.find({newEmail}).then((data) => {
    if (data.length && data[0].expiresAt < Date.now()) {
      res.status(403).json({
        error: true,
        message: "Can't verify your code, last code has expire because it has been sent over than 10 minutes ago.",
        data: null
      })
      // delete verification because it has expired., so no need to keep it.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
      ChangeEmailRequest.deleteMany({newEmail}).then(() => {}).catch(() => {})
    } else if (data.length && (code !== data[0].loginCode)) {
      res.status(403).json({
        error: true,
        message: "The code you entered didn't match, check that you properly entered the code or ask for a new one.",
        data: null
      })
    } else if (data.length && (code === data[0].loginCode)) {
      User.updateOne({email}, {email: newEmail}).then(() => {
        res.status(200).json({
          error: false,
          message: "Changing the Email was successful.",
          data: {newEmail}
        })
      // delete verification because user verified properly so no need to keep the verification.
      // user doesnt need to be informed, that's why we're not doing anything in case it succeed or fail.
        ChangeEmailRequest.deleteMany({newEmail}).then(() => {}).catch(() => {})
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "The code you entered was good. But an internal error occured while validating the user, try again please.",
          data: null
        })
      })
    } else {
      res.status(500).json({
        error: true,
        message: "An error occured while checking for existing email verification code",
        data: null
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occured while checking for existing email verification code",
      data: null
    })
  })
};

module.exports = verifyChangeEmail;
