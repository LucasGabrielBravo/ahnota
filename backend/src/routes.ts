import express from 'express';
import auth from './middlewares/auth';
import UsuarioControllers from './controllers/UsuarioControllers';
import SessionControllers from './controllers/SessionControllers';
import NotaControllers from './controllers/NotaControllers';

const routes = express.Router();
const Usuario = new UsuarioControllers();
const Session = new SessionControllers();
const Nota = new NotaControllers();

//Nao Autenticado

//Usuarios
routes.post("/usuarios", Usuario.store);    //Cadastro de usuario

//Sessions
routes.post("/sessions", Session.store);    //Login com email e senha
routes.post("/sessions/:_id", Session.show);//Login com id e senha

routes.use(auth);   //habilita a autenticacao

//Autenticado

//Nota
routes.post('/notas', Nota.store);          //Cadastro de notas do usuario
routes.get('/notas', Nota.index);           //Listagem de notas do usuario
routes.get('/notas/:_id', Nota.show);       //Seleciona a nota do usuario
routes.put('/notas/:_id', Nota.update);     //Atualiza a nota do usuario
routes.delete('/notas/:_id', Nota.destroy); //Deleta a nota do usuario

export default routes;