var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

var passport = require('passport');

module.exports = function (app) {
  app.use('/api/', router);
};

/**
 * CRUD operations
 */
// Create
router.post('/user', function (req, res, next) {

  var newUser = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    nacimiento: req.body.nacimiento,
    username: req.body.email,
    password: req.body.password
  });

  newUser.save()
    .then(function (user) {

      User.findOne(user).then(function (user) {
        res.status(201).json(user);
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });


/*  // test a matching password
  user.comparePassword(req.body.password, function(err, isMatch) {
    if (err) throw err;
    console.log(req.body.password, isMatch); // -> Password123: true
  });

  // test a failing password
  user.comparePassword(req.body.password, function(err, isMatch) {
    if (err) throw err;
    console.log(req.body.password, isMatch); // -> 123Password: false
  });*/

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
router.put('/user/:username', function (req, res, next) {


  return User.findOne({username: req.params.username})
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



router.post('/user-action/login', passport.authenticate('local', { session: true}), function (req, res) {


  console.log('se logueo con exito');

  res.json(req.user);


  /*  // test a matching password
   user.comparePassword(req.body.password, function(err, isMatch) {
   if (err) throw err;
   console.log(req.body.password, isMatch); // -> Password123: true
   });

   // test a failing password
   user.comparePassword(req.body.password, function(err, isMatch) {
   if (err) throw err;
   console.log(req.body.password, isMatch); // -> 123Password: false
   });*/


});

router.get('/user-action/logout', function(req, res){
  req.logout();
  res.render('index');
});
