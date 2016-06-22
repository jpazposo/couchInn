let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Publicacion = mongoose.model('Publicacion'),

module.exports = function (app) {
  app.use('/user-action', router);
};
router.get('/search', function (req, res) {
  Publicacion.find(req.body)
    .then((result)=> res.json(result))
    .catch((err)=> res.sendStatus(500).json(err));
});
