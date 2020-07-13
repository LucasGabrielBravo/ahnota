import jwt from 'jsonwebtoken';             //Para decodificar o token
import { Request, Response, NextFunction } from 'express';
//import { promisify } from 'util';

export default (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;  //Recupera o token do cabecalho

    //Caso nao haja um authorization retorna resposta de error
    if(!authorization){
        return res.status(401).json({error: 'Sem token de validacao'});
    }

    //Separa o token do prefixo
    const [pre, token] = authorization.split(" ");

    try {
        //Decodifica o token usando a chave
        const decoded = <{id: string}> jwt.verify(token, "a1b2c3");

        //Adiciona o ID decodificado as requisicoes
        req.userId = decoded.id;          
        
        return next();
    } catch (error) {
        //Em caso de erro
        return res.status(401).json({error: "Token invalido"});
    }
}