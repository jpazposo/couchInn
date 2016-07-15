var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
var Preguntas = mongoose.model('Preguntas');
module.exports = function (app) {
  app.use('/user-action/', router);
};
/**
 * CRUD operations
 */
// Create

router.post('/lodgin', function (req, res, next) {
  console.log(req.id);
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
       user: req.id, //req.username req.username,
     });

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
    .populate('tipo', 'nombre')
    .populate('user')
    .populate('applicants')
    .populate('applications')
    .populate('owner')
    .populate('preguntas')
    .exec(function (err, lodgins) {
      if (err) console.log(err);
      res.json({ data: lodgins})
    })
});

// Update
router.post('/update/lodgin', function (req, res, next) {

  return Lodgin.findOne({_id: req.body._id})
    // Caso de éxito
    .then(function (lodgin) {

       lodgin.nombre = req.body.nombre || lodgin.nombre;
       lodgin.descripcion = req.body.descripcion || lodgin.descripcion;
       lodgin.capacidadMax = req.body.capacidadMax || lodgin.capacidadMax;
       lodgin.tipo = req.body.tipo || lodgin.tipo;
       lodgin.calle = req.body.calle || lodgin.calle;
       lodgin.numero = req.body.numero || lodgin.numero;
       lodgin.piso = req.body.piso || lodgin.piso;
       lodgin.departamento = req.body.departamento || lodgin.departamento;
       lodgin.fechaInicio = req.body.fechaInicio || lodgin.fechaInicio;
       lodgin.fechaFin = req.body.fechaFin || lodgin.fechaFin;
       lodgin.save()

        .then(function (lodgin) {
          res.status(201).json(lodgin);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
        });

      }
      //Caso de error
    )
});
