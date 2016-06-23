var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
module.exports = function (app) {
  app.use('/api/', router);
};
/**
 * CRUD operations
 */
// Create

router.post('/lodgin', function (req, res, next) {
     var newLodgin = new Lodgin({
       nombre: req.body.nombre,
       descripcion: req.body.descripcion,
       capacidadMax: req.body.capacidadMax,
       tipo: req.body.tipo,
       calle: req.body.calle,
       numero: req.body.numero,
       piso: req.body.piso,
       departamento: req.body.departamento,
       fechaInicio: req.body.fechaInicio,
       fechaFin: req.body.fechaFin,
     })

     newLodgin.save()
    .then(function (lodgin) {

      Lodgin.findOne(lodgin).then(function (lodgin) {
        TipoHospedaje.populate(lodgin, {path: "tipos"},function(err, lodgin){
        res.status(201).json(lodgin);
        });
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});

// Read All
router.get('/lodgin', function (req, res, next) {

  return Lodgin.find({})
    // Caso de éxito
    .then(function (lodgin) {
        console.log(lodgin);
        res.json(
          {
            data: lodgin
          });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});







