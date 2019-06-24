import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ConfiguracaoTela from './pages/ConfiguracaoTela';
import ConsultaSaldo from './pages/Saldo/Consulta';
import ListarSaldo from './pages/Saldo/Listar';



function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={ConfiguracaoTela} />
            <Route path="/saldo/consulta" component={ConsultaSaldo} />
            <Route path="/saldo/listar" component={ListarSaldo} />
        </Switch>
    )
}

export default Routes;
