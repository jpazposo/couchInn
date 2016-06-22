var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TipoHospedaje = mongoose.model('TipoHospedaje');

var passport = require('passport');

module.exports = function (app) {
  app.use('/api/', router);
};

/**
 * CRUD operations
 */
// Create
router.post('/tipoHospedaje', function (req, res, next) {

  var newTipoHospedaje = new TipoHospedaje({
    nombre: req.body.nombre,
    capacidadMax: req.body.capacidadMax
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
router.get('/buscarTipoHospedaje/:nombre/:capacidadMax', function (req, res, next) {

  return TipoHospedaje.findOne({nombre : req.params.nombre, capacidadMax : req.params.capacidadMax})
    // Caso de éxito
    .then(function (tipoHospedaje) {
        if (!tipoHospedaje) res.status(412).json({"error": "Tipo de Hospedaje no Encontrado"});
        res.json({
          data: tipoHospedaje
        });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});

// Buscar por nombre
router.get('/buscarTipoHospedaje/:nombreTipoHospedaje/:capacidadTipoHospedaje', function (req, res, next) {
  console.log("router.get('/buscarTipoHospedajePorNombre'");
  return TipoHospedaje.findOne({nombre : req.params.nombreTipoHospedaje,
    capacidadMax : req.params.capacidadTipoHospedaje})
    // Caso de éxito
    .then(function (tipoHospedaje) {
        if (!tipoHospedaje) res.status(412).json({"error": "Tipo de Hospedaje no Encontrado"});
        res.json({
          data: tipoHospedaje
        });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      console.log("estoy en tipoHopedaje.js");
      res.status(500).json(err);
    });

});









// Buscar por nombre
router.get('/buscarTipoHospedajePorNombre', function (req, res, next) {
  console.log("router.get('/buscarTipoHospedajePorNombre'");
  return TipoHospedaje.findOne({nombre : "casa"})
    // Caso de éxito
    .then(function (tipoHospedaje) {
        console.log("Sin error pero no encotrado");
        if (!tipoHospedaje) res.status(412).json({"error": "Tipo de Hospedaje no Encontrado"});
        res.json({
          data: tipoHospedaje
        });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      console.log("estoy en tipoHopedaje.js");
      res.status(500).json(err);
    });

});
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
        tipoHospedaje.capacidadMax =  req.body.capacidadMax || tipoHospedaje.capacidcapacidadMaxad;

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
