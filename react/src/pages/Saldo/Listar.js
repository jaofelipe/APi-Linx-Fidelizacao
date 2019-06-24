import React, { Component } from 'react';
import api from '../../services/api';


import './Listar.css';

class Listar extends Component {
    state = {
        saldo: [],
    };
    async componentDidMount() {
        const response = await api.get('/saldo/listar');
        this.setState({ saldo: response.data });
    };


    render() {
        return (
            <section id="post-list">
                <div className="table-responsive-md">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">nsu Cliente</th>
                                <th scope="col">Saldo Pontos</th>
                                <th scope="col">Saldo Reais</th>
                                <th scope="col">Chave de Integração</th>
                                <th scope="col">Código Loja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.saldo.map(saldo => (
                                <tr key={saldo._id}>
                                    <th scope="row">{saldo.nsuCliente}</th>
                                    <td>{saldo.saldoPontos}</td>
                                    <td>{saldo.saldoReais}</td>
                                    <td>{saldo.configs.chaveIntegracao}</td>
                                    <td>{saldo.configs.codigoLoja}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        );
    }
}

export default Listar;