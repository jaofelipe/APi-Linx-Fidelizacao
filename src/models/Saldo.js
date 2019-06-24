const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaldoSchema = new Schema({
    nsuCliente: String,  
    saldoPontos: String,
    saldoReais: String,
    configs: { 
        _id: String,
        chaveIntegracao: String,
        codigoLoja: String,
     }, 
     mensagemErro: String
},
{
    timestamps: true
});

// { type: String, default: function genUUID() {
//     uuid.v1()
// }}, 

module.exports = mongoose.model('Saldo', SaldoSchema);