import React, { Component } from 'react';

// import { Container } from './styles';

import './pages.css';
import apiClient from '../services/api';

class ConfiguracaoTela extends Component {
    state = {
        chaveIntegracao: '',
        codigoLoja: '',
        numeroCartao: '',
        nsuCliente: '',
        codigoSeguranca: '',
    };


    handleSubmit = async e => {
        e.preventDefault();

        await apiClient.post('/configuracao/create', {
            chaveIntegracao: this.state.chaveIntegracao,
            codigoLoja: this.state.codigoLoja
        });

        //redireciona para raiz
        this.props.history.push('/ConsultaSaldo');


    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return (
            <form id='new-post' onSubmit={this.handleSubmit}>

                <input type="text"
                    name="chaveIntegracao"
                    placeholder="Chave de Integração"
                    onChange={this.handleChange}
                    value={this.state.chaveIntegracao}
                />
                <input type="text"
                    name="codigoLoja"
                    placeholder="Código da Loja"
                    onChange={this.handleChange}
                    value={this.state.codigoLoja}
                />
                <button type="submit">Cadastrar</button>
            </form>
        );
    }
}

export default ConfiguracaoTela;