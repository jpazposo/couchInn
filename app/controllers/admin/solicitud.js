/**
 * Created by luciano on 8/3/16.
 */
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
  app.use('/admin', router);
};


router.get('/solicitudes', function(req, res, next){
  Application.find()
    .populate('lodgin')
    .then(function (application) {
      res.json({data: application});
    }).catch(function (err) {
    res.status(500).json(err);
  });
});
