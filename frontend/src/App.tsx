import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Autenticacao from './contexts/autenticacao';
import Routes from './routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Autenticacao>
        <Routes />        
      </Autenticacao>
    </BrowserRouter>
  );
}

export default App;
