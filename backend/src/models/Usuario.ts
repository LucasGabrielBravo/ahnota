require('dotenv').config();
/*
mongoose  -> Para manipular o banco e exportar o model
Document  -> Para criar uma interface extendida de document
*/
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken'; //Biblioteca para criar tokens de validacao
import bcrypt from 'bcrypt';    //Biblioteca para criptografar strings

//Cria uma interface para o exportar o models de usuarios
export interface IUsuario extends Document {
  email: string;
  nome: string;
  senha: string;
  status: boolean;
  generateToken: () => string;
  compareSenha: (senha: string) => Promise<boolean>;
}

//Cria um Schema que sera usar para criar e manipular a tabela recebendo a interface IUsuario
const UsuarioSchema = new mongoose.Schema<IUsuario>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

//Define uma acao padrao que dever ser executada antes de um save(criacao ou atualizacao);
UsuarioSchema.pre<IUsuario>('save', async function (next) {
  //Caso a senha não tenha sido alterada, passa o proximo processo
  if(!this.isModified('senha')){    
    next();
  }
  //Caso continue, sobreescreve a nova senha com uma nova criptografia
  this.senha = await bcrypt.hash(this.senha, 10);  
});

//Cria metodos dentro do Schema usando IUsuario como interface de objeto
UsuarioSchema.methods = <IUsuario> {
  //Gera um token usando jwt criptografando um json com o id do registro e a palavra "a1b2c3" como chave de criacao
  generateToken() {
    return jwt.sign({ id: this.id }, String(process.env.SEED_TOKEN), {
      expiresIn: 86400
    });
  },

  //Compra a string passada com a string criptografada na senha
  async compareSenha(senha: string) {
    return await bcrypt.compare(senha, this.senha);
  }
}

//Exporta o Schema como um model do tipo IUsuario
export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);