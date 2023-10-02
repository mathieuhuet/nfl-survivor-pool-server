const mongoActivityDB = require('../../config/mongoActivity');
const Intervention = mongoActivityDB.model('intervention', require('../../schemas/Activity/intervention'));

// Email handler
const mongoUserDB = require('../../config/mongoUser');
const User = mongoUserDB.model('users', require('../../schemas/User/user'));
const secret = require('../../secret');
const nodemailer = require('nodemailer');
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
  }
});

const postInterventionAcquit = (req, res) => {
  let {activityId, personne, equipment, description, result, observation, dateCreated, creator, activityCreator} = req.body;
  if ( result === "" ) {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
  
    Intervention.updateOne({_id: activityId}, {
      acquit: true,
      acquitCreator: creator,
      acquitDate: dateCreated,
      acquitHelp: personne,
      acquitEquipment: equipment,
      acquitDescription: description,
      acquitResult: result,
      acquitObservation: observation
    }).then((data) => {
      User.find({_id: activityCreator}).then(data => {
        const mailOptions = {
          from: `GPMM Alertes <${secret.AUTH_EMAIL}>`,
          to: data[0].email,
          subject: `ACQUITTMENT - ${activityId} a été acquitté`,
          html: `<head>` +
          `<style>` +
          `p {color: #82bf00; ` +
          `margin-bottom: 1px;}` +
          `h3 {color: #004638; ` +
          `margin-top: 1px;}` +
          `h4 {color: #004638; ` +
          `margin-top: 1px;}` +
          `</style>` +
          `</head>` +
          `<body>` +
          `<h3>L'activité ${activityId} a été acquitté par ${creator}</h3>` + 
          `<p>Description</p>` +
          `<h4>${description}</h4>` +
          `<p>Équipements</p>` +
          `<h4>${equipment}</h4>` +
          `<p>Résultat</p>` +
          `<h4>${result}</h4>` +
          `</body>`
        };
        transporter.sendMail(mailOptions).then(() => {
          // email sent
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })

      res.status(201).json({
        error: false,
        message: 'Activité acquitté avec succès.',
        data: data
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: "Erreur interne, réessayer.",
        data: null
      })
    })
  }
};

module.exports = postInterventionAcquit
;