import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuten from '../../hooks/useAuten';


const Login: React.FC = () => {
    const { logar } = useAuten();           //    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        await logar(email, senha);
    }

    return (
        <main id="login">
            <h1>Ahnota</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="seuemail@mail.com"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="senha">Senha</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha"
                    placeholder="*** *** ***"
                    value={senha}
                    onChange={event => setSenha(event.target.value)}
                />

                <button className="btn-1" type="submit">Entrar</button>
                <Link to="/cadastro" className="btn-link-2">
                    <button type="button">Cadastre-se</button>
                </Link>
            </form>
        </main>
    );
}

export default Login;