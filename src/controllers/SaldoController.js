const Saldo = require('../models/Saldo');
const Configuracao = require('../models/Configuracao');
const request = require('request');
const uuidv4 = require('uuid/v4');
const axios = require("axios");
const baseUrlApi = require('../config/apiLinx');
const baseUrl = 'https://hfllinxintegracaogiftwebapi-hom.azurewebsites.net/LinxServiceApi/FidelidadeService/';




module.exports = {
    async listar(req, res) {
        const posts = await Saldo.find().sort('-createdAt'); // '-' significa Decrescente
        return res.json(posts);
    },


    async consulta(req, result) {
        const { selectedConfig, numeroCartao } = req.body;
        const config = await Configuracao.findOne({ '_id': selectedConfig });

        // let consultaSaldo = getSaldoApi(baseUrl, {
        //     chaveIntegracao: config.chaveIntegracao,
        //     codigoLoja: config.codigoLoja,
        //     numeroCartao: numeroCartao,
        //     nsuCliente: uuidv4(),
        //     //codigoSeguranca: ''
        // });
        axios.post(`${baseUrl}ConsultaFidelizacao`, {
            chaveIntegracao: config.chaveIntegracao,
            codigoLoja: config.codigoLoja,
            numeroCartao: numeroCartao,
            nsuCliente: uuidv4(),
            //codigoSeguranca: ''
        }).then(async (res) => {

            const { nsuCliente, saldoEmReais, saldoPontos, mensagemErro } = res.data;
            const post = await Saldo.create({
                nsuCliente: nsuCliente,
                saldoPontos: saldoPontos,
                saldoReais: saldoEmReais,
                mensagemErro: mensagemErro,
                configs: config
            });

            return result.json(post);

        }).catch((err) => {
            console.log("Erro retorno API Linx");
            const { response } = err;
            const { request, ...errorObject } = response; // take everything but 'request'
            //result.status(response.status);
            return result.json(errorObject.data); // or use 'return res.json(response.data.error);' then you don't need to omit the 'request'
        });
    }
};



//Using Request to call Remote API
const getSaldoApi = (baseUrl, jsonObject) => {

    const options = {
        url: `${baseUrl}ConsultaFidelizacao`,
        method: 'post',
        body: JSON.stringify(jsonObject),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'cache-control': 'no-cache',
        }
    };
    console.log('Url:' + options.url);
    console.log(JSON.stringify(jsonObject));
    // Do Async Job
    request(options, (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            console.log('StatusCode Consulta Saldo Cliente:', res && res.statusCode); // Print the response status code if a response was received
            return JSON.parse(body);
        };
    });
}

