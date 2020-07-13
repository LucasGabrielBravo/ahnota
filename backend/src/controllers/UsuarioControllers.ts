import { Request, Response } from 'express';
import Usuario from '../models/Usuario';

export default class {
    //Cadastro de Usuario
    async store(req: Request, res: Response){
        //recebe os dados do body
        const { email, nome, senha } = req.body;

        try {
            let usuario;
            
            /*
            Procura pelo e-mail que sera cadastrado
            Caso encontre, retorna uma mensagem de errro
            */
            usuario = await Usuario.findOne({email});
                        
            if(usuario){
                return res.status(400).json({error: "O email já esta cadastrado"});
            }
            
            //cria o usuario no banco      
            usuario = await Usuario.create({email, nome, senha, status: true});
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({error: "Falha no cadastro"});
        }        
    }

    async index(req: Request, res: Response){
        const usuarios = await Usuario.find();
        return res.status(200).json(usuarios);
    }
}