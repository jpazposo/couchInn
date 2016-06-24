var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Donation = mongoose.model('Donation');

module.exports = function (app) {
  app.use('/user-action/', router);
};
/**
 * CRUD operations
 */
// Create

router.post('/donation', function (req, res, next) {
    var newDonation = new Donation({
       medioDePago: req.body.medioDePago,
       monto: req.body.monto,

     })

     newDonation.save()

    .then(function (donation) {

      Donation.findOne(donation).then(function (donation) {
        res.status(201).json(donation);
      }).catch(function (err) {
        console.error(err);
        res.status(500).json(err);
      });

    }).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});

// Read All
router.get('/donation', function (req, res, next) {

  return Donation.find({})
    // Caso de éxito
    .then(function (donation) {
        console.log(donation);
        res.json(
          {
            data: donation
          });
      }
      //Caso de error
    ).catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

});
