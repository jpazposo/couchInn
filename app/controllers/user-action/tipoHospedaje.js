var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TipoHospedaje = mongoose.model('TipoHospedaje');

mongoose.Promise = global.Promise;

var passport = require('passport');

module.exports = function (app) {
  app.use('/user-action', router);
};

/**
 * CRUD operations
 */
// Create
router.post('/tipoHospedaje', function (req, res, next) {

  var newTipoHospedaje = new TipoHospedaje({
    nombre: req.body.nombre,
  });

  newTipoHospedaje.save()
    .then(function (tipoHospedaje) {

      TipoHospedaje.findOne(tipoHospedaje).then(function (tipoHospedaje) {
        res.status(201).json(tipoHospedaje);
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
// Read
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
// Update
router.put('/tipoHospedaje/:nombreTipoHospedaje', function (req, res, next) {


  return TipoHospedaje.findOne({nombre: req.params.nombreTipoHospedaje})
    // Caso de éxito
    .then(function (tipoHospedaje) {


        tipoHospedaje.nombre = req.body.nombre || tipoHospedaje.nombre;

        tipoHospedaje.save()

        .then(function (tipoHospedaje) {
          res.status(201).json(tipoHospedaje);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
        });

      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });




});
// Delete
router.delete('/tipoHospedaje/:nombreTipoHospedaje', function (req, res, next) {

  return TipoHospedaje.findOne({nombre: req.params.nombreTipoHospedaje})
    // Caso de éxito
    .then(function (tipoHospedaje) {

        tipoHospedaje.remove()

          .then(function () {
            res.status(204).end();
          })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
          });

      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });


});