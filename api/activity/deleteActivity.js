const mongoActivityDB = require('../../config/mongoActivity');
const Intervention = mongoActivityDB.model('intervention', require('../../schemas/Activity/intervention'));
const Routine = mongoActivityDB.model('routine', require('../../schemas/Activity/routine'));
const General = mongoActivityDB.model('general', require('../../schemas/Activity/general'));
const Comments = mongoActivityDB.model('comments', require('../../schemas/Activity/comments'));

const deleteActivity = async (req, res) => {
  try {
    let {_idActivity, type} = req.body;
    if (!_idActivity) {
      res.status(400).json({
        error: true,
        message: "ID de l'activité manque à la requête"
      });
    } else {
      const comments = await Comments.deleteMany({activityId: _idActivity});
      if (type === 'intervention') {
        const result = await Intervention.deleteOne({_id: _idActivity});
        res.status(200).json({
          error: false,
          message: "Activité a été supprimer avec succès",
          data: result.deletedCount
        })
      } else if (type === 'routine') {
        const result = await Routine.deleteOne({_id: _idActivity});
        res.status(200).json({
          error: false,
          message: "Activité a été supprimer avec succès",
          data: result.deletedCount
        })
      } else if (type === 'general') {
        const result = await General.deleteOne({_id: _idActivity});
        res.status(200).json({
          error: false,
          message: "Activité a été supprimer avec succès",
          data: result.deletedCount
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produite durant la requête",
      data: null
    })
  }
};

module.exports = deleteActivity;