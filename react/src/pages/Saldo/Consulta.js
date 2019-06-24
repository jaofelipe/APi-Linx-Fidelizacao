import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

import '../pages.css';
//import { throwStatement } from '@babel/types';

class Consulta extends Component {
    state = {
        config: [],
        selectedConfig: '',
        numeroCartao: '',
        saldo: [],
        mostraSaldo: false,
    };

    async componentDidMount() {

        const response = await api.get('/configuracao');
        let configMap = response.data.map(config => {
            return {
                value: config._id,
                display: config.chaveIntegracao
            }
        });
        this.setState({
            config: [
                { value: '', display: '(Selecione uma chave de integração)' }].concat(configMap)
        });
    };



    handleSubmit = async e => {
        e.preventDefault();

        await api.post('/saldo/consulta', {
            selectedConfig: this.state.selectedConfig,
            numeroCartao: this.state.numeroCartao,
        }).then(async (res) => {        
            console.log(JSON.stringify(res.data));
            this.setState({ saldo: res.data, mostraSaldo: true });

        }).catch((err) => {
            console.log(`Erro chamada Consulta Saldo: ${err}`);
            this.setState({ saldo: err, mostraSaldo: true });
        });

    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    

    render() {  
        let consultaPontos;
              
        if (this.state.mostraSaldo) {
            const { nsuCliente, saldoPontos, saldoReais, mensagemErro } = this.state.saldo;     
            if (mensagemErro === "")
            {
            const { chaveIntegracao, codigoLoja} = this.state.saldo.configs;
            consultaPontos = <div><p>NsuCliente: {nsuCliente}</p><p>Saldo Em Pontos: {saldoPontos}</p>
                <p>Saldo em Reias: {saldoReais}</p><p>Chave de integração: {chaveIntegracao}</p>
                <p>Código da loja: {codigoLoja}</p></div>;
            } else
            {
                consultaPontos = <p>Mensagem Erro: {mensagemErro}</p> 
            }

        }
        else
        {
            consultaPontos = "";
        }
        return (
            <form id='new-post' onSubmit={this.handleSubmit}>
                <input type="text"
                    name="numeroCartao"
                    placeholder="Numero do cartão"
                    onChange={this.handleChange}
                    value={this.state.numeroCartao}
                />
                <div>
                    <select value={this.state.selectedConfig}
                        onChange={(e) => this.setState({ selectedConfig: e.target.value })}>
                        {this.state.config.map((config) =>
                            <option key={config.value} value={config.value}>{config.display}</option>)}
                    </select>
                </div>
                <button type="submit">Consultar</button>
                <div id='consultaPontos' style={{marginTop:10}}>
                    {consultaPontos}                   
                </div>
            </form>

        )
    };
}


export default Consulta;