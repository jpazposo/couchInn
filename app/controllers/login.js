var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;

module.exports = function (app) {
  app.use('/', router);
};

router.post('/register', function (req, res) {
  User.create(req.body)
      .then(function(user){ res.status(201).json(user)})
      .catch(function(err){ res.status(500).json({ err: err })});
});

router.post('/login', function (req, res) {
  var uss;

  User.findOne({username: req.body.username})
      .then(function(user){
        if(!user){
          throw { message: "User not found" };
        }
        uss = user;
        return user.comparePassword(req.body.password);
      })
      .then(function(result){
        if(!result){
          res.status(403).json({});
          return;
        }
        var token = jwt.sign({
          id: uss._id,
          username: uss.username,
          nombre: uss.nombre,
          role: uss.role
        }, 'shhhhh', {
          expiresIn: "1h"
        });

        res.json({
          token: token
        });

      })
      .catch(function(err){
        console.error(err);
        res.status(412).json({err: err});
    });
});

router.get('/user-action/logout', function(req, res){
  res.render('index');
});
