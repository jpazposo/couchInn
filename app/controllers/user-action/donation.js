var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Donation = mongoose.model('Donation');
var User = mongoose.model('User');
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
       user: req.id //req.username req.username,
     });

     newDonation.save()

    .then(function (donation) {

      Donation.findOne(donation).then(function (donation) {
        User.findOne({_id: req.id})
        // Convertirlo en premium
          .then(function (user) {
              user.premium =  true;
              user.save()
            }
          );
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
    .populate('user')
    .exec(function (err, donations) {
      if (err) console.log(err);
      res.json({ data: donations})
    })
});
