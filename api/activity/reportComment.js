const mongoActivityDB = require('../../config/mongoActivity');
const Comments = mongoActivityDB.model('comments', require('../../schemas/Activity/comments'));


const reportComment = (req, res) => {
  let {commentId} = req.body;
  if ( commentId === "" ) {
    res.status(400).json({
      error: true,
      message: "Il manque le commentId",
      data: null
    });
  } else {
    Comments.updateOne({_id: commentId}, {
      reported: true
    }).then((data) => {
    res.status(200).json({
      error: false,
      message: "Le commentaire à été report avec succès",
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

module.exports = reportComment
;