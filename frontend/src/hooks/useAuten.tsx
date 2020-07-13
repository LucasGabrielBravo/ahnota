/**
 * Hook para agilizar a utilizacao dos dados e funcoes do context de autenticacao
 */

import { useContext } from 'react'; //useContext - hook que recebe como parametro um componete do tipo context para retornar os values do mesmo
import { AutenticacaoContext } from '../contexts/autenticacao'; //context de autenticacao

//Exporta o useContext com o AutenticacaoContext como parametro pronto para uso
export default ()=>{
    return useContext(AutenticacaoContext);
}