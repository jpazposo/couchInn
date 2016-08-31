/**
 * Created by luciano on 11/07/16.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AplicationSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: "User"},
  lodgin: {type: Schema.ObjectId, ref: "Lodgin"},
  fechaInicio:{ type: Date, required: true },
  fechaFin: { type: Date, required: true },
  status: {type: String, default: "pendiente"},
  calificoHuesped: {type: Boolean, default: "false"},
  calificoPublicacion: {type: Boolean, default: "false"},
  calificoHospedador: {type: Boolean, default: "false"}
});

module.exports = mongoose.model('Application', AplicationSchema);
