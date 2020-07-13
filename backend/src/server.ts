require('dotenv').config();         //Habilita a leitura do arquivo .env
import express from 'express';      //Framework para criacao da api
import mongoose from 'mongoose';    //Biblioteca para conexao com banco MongoDB
import cors from 'cors';            //Biblioteca para controlar o acesso externo
import routes from './routes';      //Importa as rotas da API

//Habilita globalmente o userId dentro do Express.Request
declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

/*
Conexao com o banco
Passa a variavel globla no .env fazendo um cast como String
*/
mongoose.connect(String(process.env.MONGO_URL),
    {        
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);   //Inicia a aplicacao na porta definida no .env ou na 3333