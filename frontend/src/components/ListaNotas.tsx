import React, { useCallback } from 'react';
import { useAxiosGet } from '../hooks/useAxios';
import { FiTrash2 } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export interface INota {
    _id: string;
    titulo: string;
    data: string;
    conteudo: string;
}

interface IListaNotas {
    arrayNotas?: INota[];
    notasMutate: Function;
    fSetNota: Function;
    selectedNota: INota
}

const Notas: React.FC<IListaNotas> = ({arrayNotas, notasMutate, fSetNota, selectedNota}) => {                
    //Funcao para deleter uma nota
    const handleDeleteNota = useCallback((id: string)=>{
        //Exibe uma janela de confirmação
        const conf = window.confirm('Confime a ação');

        //Encerra a funcao caso a fonfirmacao seja negativa
        if(!conf){
            return;
        }

        //Executa a requisicao de delecao da api        
        api.delete(`/notas/${id}`);

        //Filtra o array de notas para retirar o item de id correspondente
        const filteredNotas = arrayNotas?.filter((nota)=>{
            return (nota._id !== id);
        });

        if(id === selectedNota._id){
            fSetNota({
                _id: '',
                conteudo: '',
                data: '',
                titulo: ''
            });
        }

        //Salva o novo estado do array | false - para que a requisicao nao seja atualizada
        notasMutate(filteredNotas, false);
    },[arrayNotas, notasMutate]);

    //Formata a string da data para ser exibida desse modo = 10/07/2020 - 17:18:53 
    function formatarData(data: string) {
        const date = new Date(data);
        const dia = date.toLocaleDateString();
        const hora = date.toLocaleTimeString();
        return `${dia} - ${hora}`;
    }

    if(!arrayNotas){
        return (
            <div id="spinner">
                <Loader type="Oval" color="#F77" />
            </div>
        )
    }
    
    return (
        <ul>
            {arrayNotas?.map(nota => (
                <li key={nota._id}>
                    <div onClick={()=>{fSetNota(nota)}}>
                        <p>{nota.titulo}</p>
                        <p>{formatarData(nota.data)}</p>
                    </div>
                    <button onClick={()=>{handleDeleteNota(nota._id)}}>
                        <FiTrash2 />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Notas;