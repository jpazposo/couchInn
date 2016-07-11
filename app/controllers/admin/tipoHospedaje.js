var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TipoHospedaje = mongoose.model('TipoHospedaje');

mongoose.Promise = global.Promise;

var passport = require('passport');

module.exports = function (app) {
  app.use('/admin', router);
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

  return TipoHospedaje.find({isDeleted: false})
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
router.post('/update/tipoHospedaje', function (req, res, next) {

  return TipoHospedaje.findOne({_id: req.body._id})
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
    )
});


// Delete
router.post('/delete/tipoHospedaje', function (req, res, next) {

  return TipoHospedaje.findOne({_id: req.body._id})
    // Caso de éxito
    .then(function (tipoHospedaje) {

       tipoHospedaje.isDeleted = true;
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
    )
});

// Recover
router.post('/recover/tipoHospedaje', function (req, res, next) {

  return TipoHospedaje.findOne({nombre: req.body.nombre})
    // Caso de éxito
    .then(function (tipoHospedaje) {

       tipoHospedaje.isDeleted = false;
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
    )
});
