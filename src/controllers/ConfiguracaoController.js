const Configuracao = require('../models/Configuracao');

module.exports = {
    async index(req, res) {
        const posts = await Configuracao.find().sort('-createdAt'); // '-' significa Decrescente
        return res.json(posts);
    },

    async create(req, res) {
        const { chaveIntegracao, codigoLoja} = req.body;
          
        const post = await Configuracao.create({
            chaveIntegracao, codigoLoja
        });
        return res.json(post);
          

    }


};