const secret = require('../../secret');

const mongoUserDB = require('../../config/mongoUser');

const UserVerification = mongoUserDB.model('userVerification', require('../../schemas/User/userVerification'));

// Email handler
const nodemailer = require('nodemailer');
const generateCode = require('../../utils/generateCode');
let transporter = nodemailer.createTransport({
  service: "Zoho",
  auth: {
    user: secret.AUTH_EMAIL,
    pass: secret.AUTH_EMAIL_PASSWORD
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Properly connected using email address : " + secret.AUTH_EMAIL);
  }
})

// Send code to login via Email
const sendVerificationEmail = ({email}, res) => {
  generateCode(4).then(code => {
    UserVerification.find({email}).then(data => {
      if (data.length && (data[0].createdAt + 30000) > Date.now()) {
        res.status(403).json({
          error: true,
          message: "Le dernier code à été envoyé il y a moins de 30 secondes,\nil faut attendre 30 secondes pour demander un nouveau code.",
          data: null
        })
      } else {
        if (data.length) {
          UserVerification.deleteMany({email}).then(() => {
            const mailOptions = {
              from: `GPMM Alertes <${secret.AUTH_EMAIL}>`,
              to: email,
              subject: "Code d'accès pour l'application GPMM Alertes",
              html: `<p>Voici le code pour vous connecter à votre compte.</p>` + 
              `<p>Ce code <b>expire dans 10 minutes.</b></p><h1>${code}</h1>`
            };
            const newVerification = new UserVerification({
              email: email,
              loginCode: code,
              createdAt: Date.now(),
              expiresAt: Date.now() + 600000,
            })
            newVerification.save().then(() => {
              transporter.sendMail(mailOptions).then(() => {
                // email sent and verification revord saved
                res.status(201).json({
                  error: false,
                  message: 'Compte créer et compte trouvé,\nle courriel de vérification a été envoyé',
                  data: {email: email}
                })
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: true,
                  message: "Échec de l'envoi du courriel de vérification",
                  data: null
                })
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Erreur lors de la sauvegarde du code de vérification dans la base de donnée",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Incapable de supprimer le code précédent de la base de donnée",
              data: null
            })
          });
        } else {
          const mailOptions = {
            from: `GPMM Alertes <${secret.AUTH_EMAIL}>`,
            to: email,
            subject: "Code d'accès pour l'application GPMM Alertes",
            html: `<p>Voici le code pour vous connecter à votre compte.</p>` + 
            `<p>Ce code <b>expire dans 10 minutes.</b></p><h1>${code}</h1>`
          };
          const newVerification = new UserVerification({
            email: email,
            loginCode: code,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
          })
          newVerification.save().then(() => {
            transporter.sendMail(mailOptions).then(() => {
              // email sent and verification revord saved
              res.status(201).json({
                error: false,
                message: 'Compte créer et compte trouvé,\nle courriel de vérification a été envoyé',
                data: {email: email}
              })
            }).catch(err => {
              console.log(err);
              res.status(500).json({
                error: true,
                message: "Échec de l'envoi du courriel de vérification",
                data: null
              })
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: true,
              message: "Erreur lors de la sauvegarde du code de vérification dans la base de donnée",
              data: null
            })
          })
        }
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Incapable d'aller chercher les données de la base de donnée",
        data: null
      })
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produite lors de la création du code de connection",
      data: null
    })
  })
}

module.exports = sendVerificationEmail;