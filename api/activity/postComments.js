const mongoActivityDB = require('../../config/mongoActivity');
const Comments = mongoActivityDB.model('comments', require('../../schemas/Activity/comments'));


const postComments = (req, res) => {
  let {activityId, comments, dateCreated, creator} = req.body;
  if ( comments === "" ) {
    res.status(400).json({
      error: true,
      message: "Remplissez tout les champs.",
      data: null
    });
  } else {
    const newComments = new Comments({
      activityId,
      comments,
      dateCreated,
      creator,
      reported: false
    });
    newComments.save().then(result => {
      res.status(201).json({
        error: false,
        message: 'Commentaire créé avec succès.',
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
};

module.exports = postComments
;