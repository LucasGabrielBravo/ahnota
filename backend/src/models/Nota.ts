import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken'; //Biblioteca para criar tokens de validacao
import bcrypt from 'bcrypt';    //Biblioteca para criptografar strings

//Cria uma interface para o exportar o models de usuarios
export interface INota extends Document {
  usuario: string;
  titulo: string;
  conteudo: string;
  data?: Date;  
}

const NotaSchema = new mongoose.Schema<INota>({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    titulo:{
        type: String,
        required: true,        
    },
    conteudo: String,
    data: {
        type: Date        
    },    
});

//Passa a data e hora atual sempre que for criar ou salvar uma nota
NotaSchema.pre<INota>('save', function (){    
    this.data = new Date();        
});

export default mongoose.model<INota>('Nota', NotaSchema);