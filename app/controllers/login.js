let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/register', function (req, res) {
  User.create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(500).json({ err: err }));
});

router.post('/login', function (req, res) {
  let uss;

  User.findOne({username: req.body.username})
      .then((user) => {
        if(!user){
          throw { message: "User not found" };
        }
        uss = user;
        return user.comparePassword(req.body.password);
      })
      .then((result)=>{
        if(!result){
          res.status(403).json({});
          return;
        }


        let token = jwt.sign({
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
      .catch((err) => {
        console.error(err);
        res.status(412).json({err: err});
    });
});

router.get('/user-action/logout', function(req, res){
  res.render('index');
});
