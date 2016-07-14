var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var DonationSchema = new Schema({
  medioDePago: { type: String, required: true},
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Donation', DonationSchema);
