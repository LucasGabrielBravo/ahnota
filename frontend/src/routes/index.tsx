import React from 'react';
import Autenticado from './autenticado';
import Livre from './livre';
import useAuten from '../hooks/useAuten';

const Routes: React.FC = () => {
    const { logado } = useAuten();
    return (logado) ? <Autenticado /> : <Livre />;
}

export default Routes;