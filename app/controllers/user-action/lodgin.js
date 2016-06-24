var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
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
       user: req.id //req.username req.username,
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
    .exec(function (err, lodgins) {
      if (err) console.log(err);
      res.json({ data: lodgins})
    })
});







