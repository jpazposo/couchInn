var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');
var  TipoHospedaje = mongoose.model('TipoHospedaje');
var User = mongoose.model('User');
module.exports = function (app) {
  app.use('/user-action/', router);
};


router.post('/solicitar/lodgin/:nombre', function(req, res, next){
  /**
  * @param reserva: {fechaInicio: Date, fechaFin: Date }
  */

  Lodgin.findOne({ nombre: req.params.nombre })
      .then((lodgin)=>{
          lodgin.fechasReservadas.push(req.body.reserva);
          lodgin.save()
            .then((lodgin)=>res.json(lodgin))
            .catch((err)=>res.status(500).json(err));
      })
      .catch((err)=>res.status(404).json(err));
});
