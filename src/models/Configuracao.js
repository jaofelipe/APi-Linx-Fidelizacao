const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfiguracaoSchema = new Schema({  
    chaveIntegracao: String,
    codigoLoja: String,   
},
{
    timestamps: true
})

module.exports = mongoose.model('Configuracao', ConfiguracaoSchema );