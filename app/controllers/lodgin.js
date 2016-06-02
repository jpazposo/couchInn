var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lodgin = mongoose.model('Lodgin');

module.exports = function (app) {
  app.use('/api/', router);
};

/**
 * CRUD operations
 */
// Create
router.post('/lodgin', function (req, res, next) {

  var newLodgin = new Lodgin({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo,
    cantidad: req.body.cantidad,
    direccion: {
      calle: req.body.calle,
      numero: req.body.numero,
      piso:  req.body.piso,
      departamento: req.body.departamento,
    }

  newLodgin.save()
    .then(function (lodgin) {

      User.findOne(lodgin).then(function (lodgin) {
        res.status(201).json(lodgin);
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
// Read
router.get('/lodgin/:nombre', function (req, res, next) {

  return Lodgin.findOne({nombre: req.params.nombre})
    // Caso de éxito
    .then(function (lodgin) {
        if (!lodgin) res.status(412).json({"error": "User Not found"});
        res.json(lodgin);
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
// Update
router.put('/lodgin/:nombre', function (req, res, next) {


  return User.findOne({nombre: req.params.nombre})
    // Caso de éxito
    .then(function (lodgin) {

      descripcion: req.body.descripcion || lodgin.descripcion;
      tipo: req.body.tipo || lodgin.tipo;
      cantidad: req.body.cantidad || lodgin.cantidad;
      direccion: {
        calle: req.body.calle || lodgin.calle;
        numero: req.body.numero || lodgin.numero;
        piso:  req.body.piso || lodgin.piso;
        departamento: req.body.departamento || lodgin.departamento;
      }

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
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });




});
// Delete
router.delete('/lodgin/:nombre', function (req, res, next) {

  return Lodgin.findOne({nombre: req.params.nombre})
    // Caso de éxito
    .then(function (lodgin) {

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
