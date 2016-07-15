var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
var Preguntas = mongoose.model('Preguntas')
module.exports = function (app) {
  app.use('/user-action/', router);
};


router.post('/preguntar/:nombre/:username', function(req, res, next){
    Lodgin.findOne({ nombre: req.params.nombre })
    .then(function (lodgin) {
      var newPreguntas = new Preguntas({
          publicacion: req.params.nombre,
          owner: req.params.username,
          pregunta: req.body.pregunta,
          respuesta: ""
      });
     newPreguntas.save()
    .then(function (preguntas) {

      Preguntas.findOne(preguntas).then(function (preguntas) {
        res.status(201).json(preguntas);
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });
});
});

// Update
router.post('/responder', function (req, res, next) {

  return Lodgin.findOne({_id: req.body._id})
    // Caso de éxito
    .then(function (pregunta) {

       pregunta = req.body.respuesta
       lodgin.save()

        .then(function (pregunta) {
          res.status(201).json(pregunta);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
        });

      }
      //Caso de error
    )
});

// Read All
router.get('/preguntas/:nombre', function (req, res, next) {

  return Preguntas.find({publicacion : req.params.nombre})
    .then(function (preguntas) {
        console.log(preguntas);
        res.json(
          {
            data: preguntas
          });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});



