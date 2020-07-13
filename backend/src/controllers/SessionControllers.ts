import { Request, Response } from 'express';
import Usuario from '../models/Usuario';

export default class {
    //Metodo para fazer o login com usuario e senha
    async store(req: Request, res: Response){
        const { email, senha } = req.body;
        
        try {
            //Procura o email informado 
            const usuario = await Usuario.findOne({email});

            //Caso o nao exista ou a senha esteja errada, retorna uma mensagem de erro
            if(!usuario || ! await usuario.compareSenha(senha)){
                return res.status(401).json({error: "E-mail ou senha incorretos"});
            }

            //Em caso de sucesso, retorna os dados do usuario e o token de acesso
            return res.status(200).json({
                usuario,
                token: usuario.generateToken()
            });
        } catch (error) {
            return res.status(400).json({error: "Falha na operação"});
        }
    }

    //Metodo para fazer o login do id e senha salvos no navegador
    async show(req: Request, res: Response){
        const { _id } = req.params;
        const { senha } = req.body;        
        
        try {
            const usuario = await Usuario.findOne({_id, senha});            
            if(!usuario){
                return res.status(400).json({error: "Falha na tentativa de login"});
            }

            return res.status(200).json({
                usuario,
                token: usuario.generateToken()
            })
        } catch (error) {
            return res.status(400).json({error: "Falha na tentativa de login"});
        }
    }
}