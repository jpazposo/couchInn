var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;


var LodginSchema = new Schema({
  nombre: String,
  descripcion: String,
  tipo: String,
  cantidad: Number,
  direccion: {
    calle: String,
    numero: Number,
    piso:  Number,
    departamento: String
  }
  fechaInicio:{ type: Date, default: Date.now },
  fechaFin: Date,
});

LodginSchema.pre('save', function(next) {
  var lodgin = this;
}
module.exports = mongoose.model('Lodgin', LodginSchema);
