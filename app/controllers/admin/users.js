var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

var passport = require('passport');

module.exports = function (app) {
  app.use('/admin/', router);
};

/**
 * CRUD operations
 */
// Create
router.post('/user', function (req, res) {
  User.create(req.body)
      .then(function(user){ res.status(201).json(user)})
      .catch(function(err){res.status(500).json({ err: err })});
});
// Read
router.get('/user/:username', function (req, res, next) {

  return User.findOne({username: req.params.username})
    // Caso de éxito
    .then(function (user) {
        if (!user) res.status(412).json({"error": "User Not found"});
        res.json(user);
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
// Update
router.post('/update/user', function (req, res, next) {


  return User.findOne({username: req.body.username})
    // Caso de éxito
    .then(function (user) {


      user.nombre = req.body.nombre || user.nombre;
      user.apellido =  req.body.apellido || user.apellido;
      user.email =  req.body.email || user.email;
      user.nacimiento =  req.body.nacimiento || user.nacimiento;

      user.save()

        .then(function (user) {
          res.status(201).json(user);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
        });

      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });




});
// Delete
router.delete('/user/:username', function (req, res, next) {

  return User.findOne({username: req.params.username})
    // Caso de éxito
    .then(function (user) {

        user.remove()

          .then(function () {
            res.status(204).end();
          })
          .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
          });

      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });


});



router.post('/user-action/login', function (req, res) {
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
  req.logout();
  res.render('index');
});
