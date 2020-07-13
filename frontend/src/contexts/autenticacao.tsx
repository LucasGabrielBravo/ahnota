/**
 * Arquivo responsável por tornar global as funcoes responsaveis por manter o usuario autenticado
 */

import React, { createContext, useState } from 'react'; //createContext - usado para criar recursos que serao usados em todas as telas do sistema
import api from '../services/api';                      //Arquivo com as configuracoes de conexao com a api
import { useAxiosPost } from '../hooks/useAxios';       //Hook feito com swr para fazer requisicoes tipo POST

export interface IUsuario {
    _id: string,
    email: string;
    nome: string;
    senha: string;
    status: boolean;    
}

interface IAutenticacao {
    logado: boolean;
    usuario: IUsuario | null;
    loading: boolean;
    setLoading: (bool: boolean) => any;
    logar: (email: string, senha: string) => Promise<boolean | any>;
    sair: () => any;
}

export interface ISessionsResponse {
    error: string;
    usuario: IUsuario;
    token: string;
}

//Criacao e inicializacao dos values do context
export const AutenticacaoContext = createContext<IAutenticacao>({
    logado: false,
    usuario: null,
    loading: false,
    setLoading: () => {},
    logar: async () => {},
    sair: () => {}
});

//Componente que sera usado "em volta" da aplicacao para disponibilizar os values do context
const Autenticacao: React.FC = ({ children }) => {        
    //Controla a tela de loading do sistema - setLoading(true) para aparecer e setLoading(false) para esconder
    const [loading, setLoading] = useState(false);

    //Armazena os dados do usuario que esta logado | inicia a aplicacao com os dados em branco
    const [usuario, setUsuario] = useState<IUsuario | null>(null);    

    /*--Inicio do login automatico--*/
    //Verifica o cache para fazer o login automatico | caso nao haja nada em cache passa valores padroes para nao dar um error
    const { usuario: localUsuario } = JSON.parse(String(localStorage.getItem('ahnota'))) || { usuario: {_id: 0, senha: 0} };
    
    //Faz a requisicao do login automatico com o id e senha salvo em cache
    const { data, error } = useAxiosPost<ISessionsResponse>(`/sessions/${localUsuario._id}`, {senha:localUsuario.senha});

    //Se a requicao for bem sucedida e o usuario ainda estiver vazio, registra a sessao do usuario no sistema
    if(data && !usuario && !error){        
        api.defaults.headers['authorization'] = `Bearer ${data.token}`;         //Armazena um token de validacao no header
        localStorage.setItem('ahnota', JSON.stringify({usuario: data.usuario}));//Atualiza os dados em cache
        setUsuario(data.usuario);                                               //Regrista a sessao do usuario no sistema
    }
    /*--Fim do login automatico--*/

    //Funcao para fazer a requisicao da rota de login com usuario e senha na api
    async function logar(email: string, senha: string) {
        const dados = { email, senha };
        try {
            setLoading(true);   //Define loading como true para exibir a tela de loading

            const { data } = await api.post<ISessionsResponse>('/sessions', dados); //Faz a requisicao a api

            localStorage.setItem('ahnota', JSON.stringify({usuario: data.usuario}));//Armazena os dados em cache

            api.defaults.headers['authorization'] = `Bearer ${data.token}`;         //Armazena um token de validacao no header
            
            setUsuario(data.usuario);                                               //Regrista a sessao do usuario no sistema
        } catch (error) {
            api.defaults.headers['authorization'] = `Bearer null`;                         //Limpa um possivel token do header            
            alert(error.response.data.error);                                       //Emite um alerta de erro
        } finally {
            setLoading(false);                                                      //Define loading como false para esconder a tela de loading
        }
    }

    function sair(){
        localStorage.removeItem('ahnota');
        api.defaults.headers['authorization'] = `Bearer null`;
        setUsuario(null);
    }

    //Dados e funcoes que serao providas pelo context
    const values = {
        logado: !!usuario,
        loading,
        usuario,
        setLoading,
        logar,
        sair
    }

    //Retorna o componente de context com seus values
    return (
        <AutenticacaoContext.Provider value={values}>
            {children}
        </AutenticacaoContext.Provider>
    );
}

export default Autenticacao;