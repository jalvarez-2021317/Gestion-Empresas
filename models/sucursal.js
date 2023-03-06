const { Schema, model } = require('mongoose');

const sucursalSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  empresa: [{
    type: Schema.Types.ObjectId,
    ref: 'empresa'
  }]

});

module.exports = model('Sucursal', sucursalSchema);
