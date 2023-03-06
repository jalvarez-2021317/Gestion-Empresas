const { Schema, model } = require('mongoose');
const  sucursalSchema = require('../models/sucursal')

const empresaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        unique: true
    },
    tipo: {
        type: String,
        
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Empresa', empresaSchema);
