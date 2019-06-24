const express = require('express');
var bodyParser = require('body-parser')
const SaldoController = require('./controllers/SaldoController');
const ConfiguracaoController = require('./controllers/ConfiguracaoController');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const routes = new express.Router(); //ordem é importante router por ultimo


routes.get('/configuracao', ConfiguracaoController.index);
routes.post('/configuracao/create', jsonParser, ConfiguracaoController.create)

routes.get('/saldo/listar', SaldoController.listar);
routes.post('/saldo/consulta', jsonParser, SaldoController.consulta);



module.exports = routes;