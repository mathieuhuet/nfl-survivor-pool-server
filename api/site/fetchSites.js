const mongoSiteDB = require('../../config/mongoSite');

const Site = mongoSiteDB.model('sites', require('../../schemas/Site/site'));


const fetchSites = (req, res) => {


  Site.find().then(data => {
    // if (data.length) === site found
    if (data.length) {
      res.status(200).json({
        error: false,
        message: "Les sites ont bien été récolté",
        data: data
      });
    } else {
      res.status(403).json({
        error: true,
        message: "Aucune site n'a été trouvé.",
        data: null
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "Une erreur s'est produit lors de la recherche des sites,\n réessayer.",
      data: null
    });
  })
};

module.exports = fetchSites;