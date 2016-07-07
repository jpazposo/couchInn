var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LodginSchema = new Schema({
  nombre: { type: String, required: true, index: { unique: true }},
  descripcion: String,
  capacidadMax: Number,
  tipo: { type: Schema.ObjectId, ref: "TipoHospedaje" },
  calle: { type: String, required: true },
  numero: { type: Number, required: true },
  piso: Number,
  departamento: String,
  fechaInicio:{ type: Date, required: true },
  fechaFin: { type: Date, required: true },
  user: { type: Schema.ObjectId, ref: "User"}


});

module.exports = mongoose.model('Lodgin', LodginSchema);
