var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var DonationSchema = new Schema({
  medioDePago: { type: String, required: true},
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Donation', DonationSchema);
