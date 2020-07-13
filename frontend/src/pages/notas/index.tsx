import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import ListaNotas, { INota } from '../../components/ListaNotas';
import { useAxiosGet } from '../../hooks/useAxios';
import api from '../../services/api';
import useAuten from '../../hooks/useAuten';

const Notas: React.FC = () => {
  const { sair } = useAuten();
  const { data: notas, error, mutate } = useAxiosGet<INota[]>('/notas');

  const [nota, setNota] = useState<INota>({
    _id: '',
    conteudo: '',
    data: '',
    titulo: ''
  });

  const handleNovaNota = useCallback(()=>{
    setNota({
      _id: '',
      conteudo: '',
      data: '',
      titulo: ''
    });
  }, []);

  function handleSubmit(event?: FormEvent<HTMLFormElement>){    
    (event) && event.preventDefault();
    
    if(nota._id){
      api.put(`/notas/${nota._id}`, nota).then( res => {
        const updateNotas = notas?.map(n => {
          if(nota._id === n._id){
            return res.data;
          }
  
          return n;
        });
  
        mutate(updateNotas, false);
      });
    }else{
      let updateNotas = notas;
      updateNotas?.push({...nota, data: new Date().toISOString()});
      mutate(updateNotas, false);
      api.post('/notas', nota).then(res => {
        setNota(res.data);
        mutate(notas, true);
      });      
    }
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>){
    const {name, value} = event.target;    
    setNota({...nota, [name]: value});
  }

  return (
    <main id="notas">
      <aside>
        <h1>Notas</h1>
        <button className="btn-1" onClick={handleNovaNota}>+</button>
        <ListaNotas arrayNotas={notas} selectedNota={nota} fSetNota={setNota} notasMutate={mutate}/>
        <button className="btn-1" onClick={sair}>Sair</button>
      </aside>
      <form onSubmit={handleSubmit}>
        <input value={nota.titulo} onChange={handleChangeInput} type="text" name="titulo" id="titulo" placeholder="Titulo"/>
        <textarea value={nota.conteudo} onChange={handleChangeInput} name="conteudo" id="conteudo" ></textarea>
        <button type="submit" className="btn-1">Salvar</button>
      </form>
    </main>
  );
}

export default Notas;