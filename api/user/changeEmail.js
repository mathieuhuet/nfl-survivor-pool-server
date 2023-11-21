const sendVerificationChangeEmail = require('./sendEmailCodeChangeEmail');

const changeEmail = (req, res) => {
  let {newEmail} = req.body;
  let {email} = req.user;
  if (newEmail === "") {
    res.status(400).json({
      error: true,
      message: "Empty email",
      data: null
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newEmail)) {
    res.status(400).json({
      error: true,
      message: "Invalid user email address",
      data: null
    });
  } else {
    sendVerificationChangeEmail({prevEmail: email, newEmail: newEmail}, res);
  }
};

module.exports = changeEmail;