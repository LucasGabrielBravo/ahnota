import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Notas from '../pages/notas';
import Cadastro from '../pages/cadastro';

const Autenticado: React.FC = () => {

    return (
        <Switch>                                    
            <Route path="/" component={Notas} />
        </Switch>
    );
}

export default Autenticado;