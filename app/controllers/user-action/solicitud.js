var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
var Application = mongoose.model('Application');
var moment = require('moment');
require('moment-range');
module.exports = function (app) {
  app.use('/user-action/', router);
};


router.post('/solicitar/lodgin/:nombre/:username', function(req, res, next){
  /**
  * @param application: {fechaInicio: Date, fechaFin: Date }
  */

  Lodgin.findOne({ nombre: req.params.nombre })
      .then((lodgin)=>{
          User.findOne({username: req.params.username})
            .then(function (user) {
              /*lodgin.fechasReservadas.push(req.body);*/
              lodgin.applicants.push(user);
              lodgin.save()
              Application.create({
                owner: user,
                lodgin: lodgin,
                fechaInicio: req.body.fechaInicio,
                fechaFin: req.body.fechaFin
              }).then(function (application) {
                  lodgin.applications.push(application);
                  lodgin.save()
                    .then((lodgin)=>res.json(lodgin))
                    .catch((err)=>res.status(500).json(err));
                });

            });

      })
      .catch((err)=>res.status(404).json(err));
});

//update
router.post('/update/solicitud', function(req, res, next){
  Application.findOne({ _id: req.body._id })
    .populate('lodgin')
    .then(function (application) {
       application.fechaInicio = req.body.fechaInicio;
       application.fechaFin = req.body.fechaFin;
       application.save();
       Lodgin.findOne(application.lodgin)
         .populate('tipo', 'nombre')
         .populate('user')
         .populate('applicants')
         .populate('applications')
         .populate('owner')
         .then(function (lodgin) {
           res.json(application.lodgin);
         });
     })
     .catch(function (err) {
       res.status(500).json(err);
     })
});

//read one
router.get('/solicitud/:id', function(req, res, next){
  Application.findOne({ _id: req.params.id })
    .populate('lodgin')
    .then(function (application) {
      res.json(application);
    }).catch(function (err) {
       res.status(500).json(err);
      });
});

router.post('/solicitudes/anular', function (req, res, next) {
  Application.findOne(req.body)
    .populate('lodgin')
    .then(function (application) {
      application.status = 'anulada';
      application.save();
      Lodgin.findOne(application.lodgin)
        .populate('tipo', 'nombre')
        .populate('user')
        .populate('applicants')
        .populate('applications')
        .populate('owner')
        .then(function (lodgin) {
          res.json(application.lodgin);
        });
    })
    .catch(function (err) {
      res.status(500).json(err);
    })
});

router.post('/solicitudes/rechazar', function (req, res, next) {
  Application.findOne(req.body)
    .populate('lodgin')
    .then(function (application) {
      application.status = 'rechazada';
      application.save();
      Lodgin.findOne(application.lodgin)
        .populate('tipo', 'nombre')
        .populate('user')
        .populate('applicants')
        .populate('applications')
        .populate('owner')
        .then(function (lodgin) {
          res.json(application.lodgin);
        });
    })
    .catch(function (err) {
      res.status(500).json(err);
    })
});

router.post('/solicitudes/aceptar', function (req, res, next) {
  Application.findOne(req.body)
    .populate('lodgin')
    .then(function (application) {
      application.status = 'aceptada';
      application.save();
      Lodgin.findOne(application.lodgin)
        .populate('tipo', 'nombre')
        .populate('user')
        .populate('applicants')
        .populate('applications')
        .populate('owner')
        .then(function (lodgin) {
          var start = new Date(lodgin.fechaInicio);
          var end = new Date(lodgin.fechaFin);
          var lodginRange = moment.range(start, end);
          var totalizerRange = moment.range(start, start);
          var potentialNewBooking = {fechaInicio:req.body.fechaInicio, fechaFin:req.body.fechaFin};
          var potentialNewBookingRange = moment.range(potentialNewBooking.fechaInicio, potentialNewBooking.fechaFin);
          var cant = 0;

          // Validar si no hay una fecha ya reservada.
          lodgin.fechasReservadas.forEach(function (fechas) {
            var reserva = moment.range(fechas.fechaInicio, fechas.fechaFin);
            if (potentialNewBookingRange.overlaps(reserva)){
              console.log('Esta solicitud ya no se puede ocupar debido a que no hay más disponibilidad para la fecha solicitada');
              res.status(500).json({error: 'Esta solicitud ya no se puede ocupar debido a que no hay más disponibilidad para la fecha solicitada'});
            }
          });

          lodgin.fechasReservadas.push(potentialNewBooking);

          lodgin.fechasReservadas.forEach(function (fechas) {
            console.log('entro al foreach');
            cant = cant + moment.range(fechas.fechaInicio, fechas.fechaFin).toArray('days').length;
          });


          if (lodginRange.toArray('days').length <= cant){
            lodgin.reservada = true;
            console.log('se reservó con exito');
          }

          console.log('------------report----------------');
          console.log(lodginRange.toArray('days').length);
          console.log(cant);
          console.log('------------end----------------');


          lodgin.save();

          res.json(application.lodgin);
        });
    })
    .catch(function (err) {
      res.status(500).json(err);
    })
});

router.get('/solicitudes/:user', function (req, res, next) {
  return Application.find({ owner: req.id})
    .populate('owner')
    .populate('lodgin')
    .exec(function (err, applications) {
      if (err) res.status(500).json(err);
      res.json({ data: applications})
    })
});
