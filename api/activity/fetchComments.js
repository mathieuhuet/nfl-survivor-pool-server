const mongoActivityDB = require('../../config/mongoActivity');

const Comments = mongoActivityDB.model('comments', require('../../schemas/Activity/comments'));


const fetchComments = (req, res) => {
  let {activityId} = req.body;
  Comments.find({activityId}).then(data => {
    // if (data.length) === activity found
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "Les commentaires ont bien été récolté",
        data: data
      })
    } else {
      res.status(403).json({
        error: true,
        message: "Aucune commentaires n'a été trouvé.",
        data: null
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produit lors de la recherche de commentaires,\n réessayer.",
      data: null
    })
  })
};

module.exports = fetchComments;