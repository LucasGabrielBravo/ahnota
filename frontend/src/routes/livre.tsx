import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

const Livre: React.FC = () => {
  return (
    <Switch>
        <Route path="/cadastro" exact component={Cadastro}/>
        <Route path="/" component={Login}/>
    </Switch>
  );
}

export default Livre;