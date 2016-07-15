/**
 * Created by luciano on 11/07/16.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AplicationSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: "User"},
  lodgin: {type: Schema.ObjectId, ref: "Lodgin"},
  fechaInicio:{ type: Date, required: true },
  fechaFin: { type: Date, required: true }
});

module.exports = mongoose.model('Application', AplicationSchema);
