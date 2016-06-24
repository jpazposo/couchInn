let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  Lodgin = mongoose.model('Lodgin');

module.exports = function (app) {
  app.use('/user-action', router);
};
router.post('/search', function (req, res) {

  var filter = {};

  if (req.body.tipo){
    filter.tipo = req.body.tipo;
  }

  if (req.body.nombre){
    filter.nombre = req.body.nombre;
  }

  if (req.body.fechaInicio){
    filter.fechaInicio = {
      $gte: req.body.fechaInicio
    }
  }

  if (req.body.fechaFin){
    filter.fechaFin = {
      $lt: req.body.fechaFin
    }
  }

  return Lodgin.find(filter)
    .populate('tipo', 'nombre')
    .populate('user')
    .exec(function (err, lodgins) {
      if (err) console.log(err);
      res.json({ data: lodgins})
    })
});
