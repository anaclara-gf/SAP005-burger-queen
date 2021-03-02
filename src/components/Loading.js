import React from "react";
import Carregando from '../images/Ícones/loading-marrom.gif'

function Loading({id}) {

  return (
    <>
      <img id={id} className="img-loading" alt="Carregando" src={Carregando}/>
    </>
  );
}
  
export default Loading;