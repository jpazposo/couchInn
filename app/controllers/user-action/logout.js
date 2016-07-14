var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;

module.exports = function (app) {
  app.use('/user-action', router);
};


router.get('/logout', function(req, res){
  res.render('index');
});
