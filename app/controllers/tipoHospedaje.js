var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TipoHospedaje = mongoose.model('TipoHospedaje');

mongoose.Promise = global.Promise;

var passport = require('passport');

module.exports = function (app) {
  app.use('/api', router);
};

// Read All
router.get('/tiposDeHospedaje', function (req, res, next) {

  return TipoHospedaje.find({})
    // Caso de éxito
    .then(function (tiposDeHospedajes) {
        console.log(tiposDeHospedajes);
        res.json(
          {
            data: tiposDeHospedajes
          });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
