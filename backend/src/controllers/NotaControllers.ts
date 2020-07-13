import { Request, Response } from 'express';
import Nota from '../models/Nota';

export default class {
    //Metodo para fazer o cadastro de notas
    async store(req: Request, res: Response) {
        const { titulo, conteudo } = req.body;  //Recebe os dados do body

        const usuario = req.userId;             //Recebe o id da autenticacao        

        try {
            //Cadastra uma nova nota
            const nota = await Nota.create({ usuario, titulo, conteudo });

            return res.status(201).json(nota);
        } catch (error) {            
            return res.status(400).json({ error: "Falha ao cadastrar nota" });
        }
    }

    //metodo para listar todas as notas de um usuario
    async index(req: Request, res: Response) {
        const usuario = req.userId;

        try {
            //Procura as notas cadastradas pelo usuario e retorna por ardem de atualizacao
            const notas = await Nota.find({ usuario }).sort({ data: -1 });

            return res.status(200).json(notas);
        } catch (error) {
            return res.status(400).json({ error: "Falha ao listar as notas" });
        }
    }

    //metodo para selecionar um nota
    async show(req: Request, res: Response) {
        const { _id } = req.params; //Recebe o id da nota pelo params
        const usuario = req.userId;

        try {
            //Procura pela nota selecionada
            const nota = await Nota.findOne({ _id, usuario });

            return res.status(200).json(nota);
        } catch (error) {
            return res.status(404).json({ error: "Nota não encontrada" });
        }
    }

    //metodo para editar/atualizar a nota
    async update(req: Request, res: Response) {
        const { _id } = req.params; //Recebe o id da nota pelo params
        const { titulo, conteudo } = req.body;  //Dados da requisicao
        const usuario = req.userId;

        try {
            //Procura pela nota selecionada
            let nota = await Nota.findOne({ _id, usuario });

            //Caso não encontre retorna msg de error
            if (!nota) {
                return res.status(404).json({ error: "Nota não encontrada" });
            }

            //Caso encontre, edita os dados
            nota.titulo = titulo;
            nota.conteudo = conteudo;
            await nota.save();  //Salva a modificacao

            return res.status(200).json(nota);
        } catch (error) {
            return res.status(400).json({ error: "Falha na operação" });
        }
    }

    //Metodo para deletar a nota
    async destroy(req: Request, res: Response) {
        const { _id } = req.params; //Recebe o id da nota pelo params        
        const usuario = req.userId;

        try {
            //Procura pela nota e a deleta
            const nota = await Nota.findOneAndDelete({ _id, usuario });

            if (!nota) {
                return res.status(404).json({ error: "Nota não encontrada" });
            }

            return res.status(200).json(nota);
        } catch (error) {
            return res.status(400).json({ error: "Falha na operação" });
        }
    }
}