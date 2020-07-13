import React, { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import useAuten from '../../hooks/useAuten';

const Cadastro: React.FC = () => {
  const { logar } = useAuten();

  const [confsenha, setConfsenha] = useState('');

  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (dados.senha !== confsenha) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      await api.post('/usuarios', dados);
      logar(dados.email, dados.senha);
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  return (
    <main id="login">
      <h1>Ahnota</h1>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Seu Nome aqui"
          value={dados.nome}
          minLength={4}
          maxLength={100}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="seuemail@mail.com"
          value={dados.email}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="*** *** ***"
          value={dados.senha}
          minLength={8}
          maxLength={24}
          onChange={handleChangeInput}
          required
        />

        <label htmlFor="confSenha">Conf. Senha</label>
        <input
          type="password"
          name="confSenha"
          id="confSenha"
          value={confsenha}
          minLength={8}
          maxLength={24}
          placeholder="*** *** ***"
          onChange={event => setConfsenha(event.target.value)}
          required
        />

        <button className="btn-1" type="submit">Entrar</button>
        <Link to="/" className="btn-link-2">
          <button type="button">Voltar</button>
        </Link>
      </form>
    </main>
  );
}

export default Cadastro;