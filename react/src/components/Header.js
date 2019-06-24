import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// import { Container } from './styles';


export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/Saldo/Consulta">
          <h2>API Linx para serviço de fidelização</h2>
        </Link>
        <Link to="/">
          <i className="fas fa-cogs" alt="Configurações de Tela"> Config. Tela</i>
        </Link>
        <Link to='/Saldo/Consulta'>
          <i className="fas fa-search fa-1x" alt="Consultar Saldo"> Consultar Saldos</i>
        </Link>
        <Link to='/Saldo/Listar'>
          <i className="fas fa-list-ol" alt="Listar">  Listar Saldos</i>
        </Link>
      </div>
    </header>
  );
}