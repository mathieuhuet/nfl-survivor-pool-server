const mongoActivityDB = require('../../config/mongoActivity');
const Routine = mongoActivityDB.model('routine', require('../../schemas/Activity/routine'));
const General = mongoActivityDB.model('general', require('../../schemas/Activity/general'));
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





const postActivity = (req, res) => {
  let {title, description, creator, dateCreated, activityDate, type, level, department, employee, site, system} = req.body;
  if ( title === "" || description === "") {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
    // Capitalize first
    title = title.charAt(0).toUpperCase() + title.slice(1);
    if (description) {
      description = description.charAt(0).toUpperCase() + description.slice(1);
    }
    // Send Email to appointed employee
    if (employee) {
      User.find({_id: employee}).then(data => {
        const mailOptions = {
          from: `GPMM Alertes <${secret.AUTH_EMAIL}>`,
          to: data[0].email,
          subject: `L'alerte ${title}, vous a été attribué`,
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
          `<p>Alerte</p>` + 
          `<h3>${title}</h3>` + 
          `<p>Description</p>` +
          `<h4>${description}</h4>` +
          `<p>Type d'activité</p>` +
          `<h4>${type}</h4>` +
          `<p>Système affecté</p>` +
          `<h4>${system}</h4>` +
          `<p>Emplacement</p>` +
          `<h4>${site}</h4>` +
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
    }
    if (type === 'routine') {
      const newActivity = new Routine({
        title,
        description,
        creator,
        dateCreated,
        activityDate,
        level,
        type,
        department,
        employee,
        site,
        system,
        acquit: false,
        acquitCreator: '',
        acquitComments: '',
        acquitDate: new Date(),
        acquitHelp: [],
      });
      newActivity.save().then(result => {
        res.status(201).json({
          error: false,
          message: 'Activité créé avec succès.',
          data: result
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Une erreure s'est produite dans la base de donnée.",
          data: null
        });
      });
    } else if (type === 'intervention') {
      const newActivity = new Intervention({
        title,
        description,
        creator,
        dateCreated,
        activityDate,
        level,
        type,
        department,
        employee,
        site,
        system,
        acquit: false,
        acquitCreator: '',
        acquitComments: '',
        acquitDate: new Date(),
        acquitHelp: [],  
        acquitEquipment: '',
        acquitDescription: '',
        acquitResult: '',
        acquitObservation: '',
      });
      newActivity.save().then(result => {
        res.status(201).json({
          error: false,
          message: 'Activité créé avec succès.',
          data: result
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Une erreure s'est produite dans la base de donnée.",
          data: null
        });
      });
    } else if (type === 'general') {
      const newActivity = new General({
        title,
        description,
        creator,
        dateCreated,
        activityDate,
        level,
        type,
        department,
        employee,
        site,
        system,
        acquit: false,
        acquitCreator: '',
        acquitComments: '',
        acquitDate: new Date(),
        acquitHelp: [],
      });
      newActivity.save().then(result => {
        res.status(201).json({
          error: false,
          message: 'Activité créé avec succès.',
          data: result
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Une erreure s'est produite dans la base de donnée.",
          data: null
        });
      });
    }
  }
};

module.exports = postActivity;