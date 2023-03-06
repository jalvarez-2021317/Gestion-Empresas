const { Schema, model } = require('mongoose');

const municipioSchema = Schema({
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio']
    }
});

module.exports = model('Municipio',municipioSchema);