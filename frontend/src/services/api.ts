import axios from 'axios';  //Biblioteca para realizar requisicoes a APis

//Cria uma conexao com uma url padra
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default api;