var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
var Application = mongoose.model('Application')
module.exports = function (app) {
  app.use('/user-action/', router);
};


router.post('/solicitar/lodgin/:nombre', function(req, res, next){
  /**
  * @param application: {fechaInicio: Date, fechaFin: Date }
  */

  Lodgin.findOne({ nombre: req.params.nombre })
      .then((lodgin)=>{
          User.findOne({username: req.id})
            .then(function (user) {
              lodgin.fechasReservadas.push(req.body);
              lodgin.applicants.push(user);
              Application.create({
                owner: user,
                lodgin: lodgin,
                fechaInicio: req.body.fechaInicio,
                fechaFin: req.body.fechaFin
              }).then(function (application) {
                  lodgin.save()
                    .then((lodgin)=>res.json(lodgin))
                    .catch((err)=>res.status(500).json(err));
                });

            });

      })
      .catch((err)=>res.status(404).json(err));
});
