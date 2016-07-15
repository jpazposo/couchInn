var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PreguntasSchema = new Schema({
  owner: String,
  publicacion: String,
  pregunta: String,
  respuesta: String,
});

module.exports = mongoose.model('Preguntas', PreguntasSchema);
