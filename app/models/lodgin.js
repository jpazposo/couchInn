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
  fechasReservadas: [{fechaInicio: { type: Date } , fechaFin: { type: Date } }],
  user: { type: Schema.ObjectId, ref: "User"},
  applicants: [{type: Schema.ObjectId, ref: "User"}],
  applications: [{type: Schema.ObjectId, ref: "Application"}],
  puntuacion: [Number],
  preguntas:[{pregunta:String , respuesta:String}],
  reservada: {type: Boolean, default: false},
  activa:{ type: String, default: "SI"}

});

module.exports = mongoose.model('Lodgin', LodginSchema);
