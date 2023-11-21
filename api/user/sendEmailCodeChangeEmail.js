// Generating codes.
const generateCode = require('../../utils/generateCode');

const mongoUserDB = require('../../config/mongoUser');

const ChangeEmailRequest = mongoUserDB.model('changeEmail', require('../../schemas/User/changeEmailRequest'));

// Email handler
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: "Zoho",
  auth: {
    user: process.env.AUTH_EMAIL || "put the email address you wanna use here",
    pass: process.env.AUTH_EMAIL_PASSWORD || "put your password here, you should hide it..."
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
})

// Send code to login via Email
const sendVerificationChangeEmail = ({prevEmail, newEmail}, res) => {
  generateCode(4).then(code => {
    ChangeEmailRequest.find({newEmail}).then(data => {
      if (data.length && (data[0].createdAt + 30000) > Date.now()) {
        res.status(403).json({
          error: true,
          message: "Previous code has been sent less than 30 seconds ago, you have to wait 30 seconds to request a new code.",
          data: null
        });
      } else {
        if (data.length) {
          ChangeEmailRequest.deleteMany({newEmail}).then(() => {
            const mailOptions = {
              from: `FriendlyBets <${process.env.AUTH_EMAIL}>`,
              to: newEmail,
              subject: "Login code for FriendlyBets",
              html: `<h1>${code}</h1><p>This is the code to complete the change of email of your FriendlyBets account.</p>` + 
              `<p>This code <b>expires in 10 minutes.</b></p>`,
            };
            const newVerification = new ChangeEmailRequest({
              prevEmail: prevEmail,
              newEmail: newEmail,
              loginCode: code,
              createdAt: Date.now(),
              expiresAt: Date.now() + 600000,
            });
            newVerification.save().then(() => {
              transporter.sendMail(mailOptions).then(() => {
                // email sent and verification record saved
                res.status(201).json({
                  error: false,
                  message: 'Email verification code sent.',
                  data: {prevEmail, newEmail}
                });
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: true,
                  message: "Verification email code failed",
                  data: null
                });
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Couldnt save verification email data in database",
                data: null
              });
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt delete previous code from database.",
              data: null
            });
          });
        } else {
          const mailOptions = {
            from: `FriendlyBets <${process.env.AUTH_EMAIL}>`,
            to: newEmail,
            subject: "Login code for FriendlyBets",
            html: `<h1>${code}</h1><p>This is the code to complete the change of email of your FriendlyBets account.</p>` + 
            `<p>This code <b>expires in 10 minutes.</b></p>`,
          };
          const newVerification = new ChangeEmailRequest({
            prevEmail: prevEmail,
            newEmail: newEmail,
            loginCode: code,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
          });
          newVerification.save().then(() => {
            transporter.sendMail(mailOptions).then(() => {
              // email sent and verification revord saved
              res.status(201).json({
                error: false,
                message: 'Email verification code sent.',
                data: {prevEmail, newEmail}
              });
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Verification email code failed",
                data: null
              });
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Couldnt save verification email data in database",
              data: null
            });
          })
        }
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Failed to fetch from database",
        data: null
      });
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An error occurred while creating the login code.",
      data: null
    });
  })
}

module.exports = sendVerificationChangeEmail;