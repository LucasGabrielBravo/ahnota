import useSWR from 'swr';           //Biblioteca usada para monitorar requisicoes e armazenalas em cache
import api from '../services/api';  //Conexao com a api

/*
Funcao para realizar requisicoes do tipo GET
*/
export function useAxiosGet<Data = any, Error = any>(url: string){
    const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {        
        const { data } = await api.get(url);
        return data;
    });    
    return { data, error, mutate };
}

export function useAxiosPost<Data = any, Error = any>(url: string, body = {}){
    const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {        
        const { data } = await api.post(url, body);
        return data;
    }, {        
        errorRetryCount: 0,         //Quantidade de vezes que deve contar as falhas
        shouldRetryOnError: false   //Desabilita a re-tentativa de requisicao
    });    
    return { data, error };
}