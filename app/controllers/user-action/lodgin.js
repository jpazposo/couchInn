var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
var Application = mongoose.model('Application');
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
    .populate({
      path: 'applications',
      populate: { path: 'owner' }
    })
    .exec(function (err, lodgins) {
      if (err) console.log(err);
      res.json({ data: lodgins})
    })
});

// Read All hospedajes
router.get('/misHospedajes/:user', function (req, res, next) {
  Application.find({owner : req.params.user , status : 'aceptada'})
    .then(function (application) {
      if (!application.length){
        res.json({ data: application})
      }
      else{
        Lodgin.findOne({id : application.lodgin})
        .populate('tipo', 'nombre')
        .populate('user')
        .populate('applicants')
        .populate({
          path: 'applications',
          populate: { path: 'owner' }
        })
        .exec(function (err, lodgins) {
          if (err) console.log(err);
          res.json({ data: lodgins})
        })
    };
    })
      .catch(function (err) {
        console.error(err);
       res.status(500).json(err);
      });
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
       lodgin.activa = req.body.activa || lodgin.activa;
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


// calificaPublicacion
router.post('/calificarPublicacion', function (req, res, next) {
  Application.findOne({_id: req.body.solicitudCalificar})
   .then(function (application) {
     application.calificoPulicacion = true;
     application.save()
     .then(function (application) {
      return Lodgin.findOne({_id: req.body._id})
        .populate('tipo', 'nombre')
        .populate('user')
        .populate('applicants')
        .populate('applications')
        .populate({
          path: 'applications',
          populate: { path: 'owner' }
        })
        .then(function (lodgin) {

          lodgin.puntuacion.push(req.body.puntuacionPublicacion);
          lodgin.save()

         .then(function (lodgin) {
            res.status(201).json(lodgin);
          })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
          });
        });
      //Caso de error
    });
  });
});

// calificarHospedador
router.post('/calificarHospedador', function (req, res, next) {

    User.findOne({_id: req.body.user})
    .then(function (user) {
       user.puntuacionHospedador.push(req.body.puntuacionHospedador);
       user.save()
       .then(function (user) {
          Application.findOne({_id: req.body.solicitudCalificar})
          .then(function (application) {
            application.calificoHospedador = true;
            application.save()
            .then(function (application) {
              return Lodgin.findOne({_id: req.body._id})
                .populate('tipo', 'nombre')
                .populate('user')
                .populate('applicants')
                .populate('applications')
                .populate({
                  path: 'applications',
                  populate: { path: 'owner' }
                })
                .exec(function (err, lodgin) {
                  if (err) console.log(err);
                  res.status(201).json(lodgin)
                 })
            });
          })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
          });
       });
    })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
      //Caso de error

});
});

// calificarHuesped

router.post('/calificarHuesped', function (req, res, next) {

    Application.findOne({_id: req.body.solicitudCalificar})
       .then(function (application) {
         application.calificoHuesped = true;
         application.save()
         .then(function (application) {

          User.findOne({_id: application.owner})
          .then(function (user) {

            user.puntuacionHuesped.push(req.body.puntuacionHuesped);
            user.save()

            .then(function (user) {
              return Lodgin.findOne({_id: req.body._id})
                .populate('tipo', 'nombre')
                .populate('user')
                .populate('applicants')
                .populate({
                  path: 'applications',
                  populate: { path: 'owner' }
                })
                .exec(function (err, lodgin) {
                  if (err) console.log(err);
                  res.status(201).json(lodgin)
                })
            });
          })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
          });
      //Caso de error
         });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });
});
