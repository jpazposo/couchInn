var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TipoHospedajeSchema = new Schema({
  nombre: { type: String, required: true },
  capacidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  direccion: { type: String, required: true }
});

module.exports = mongoose.model('TipoHospedaje', TipoHospedajeSchema);

