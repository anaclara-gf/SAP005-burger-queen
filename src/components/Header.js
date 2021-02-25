import '../style/header.css'
import React from "react";
import { useHistory } from "react-router-dom";
import logoBack from '../images/Logo-sem-nome-amarelo.png'
import logout from '../images/Ícones/sair-amarelo.png'


function Header() {
    const atendente = localStorage.getItem("atendente");
    const history = useHistory()

    const handleNavigate = (event, path) => {
        event.preventDefault()
        history.push(path)
    }

    return (
        <>
            <header>
                <img className="img-header" alt="imagem-logo" src={logoBack} 
                    onClick={(event) => handleNavigate(event, '/salao')}/>
                <section className="header-input">
                    <input 
                        id="iniciar-um-pedido"
                        type="radio"
                        name="pages"
                        value="/salao"
                        onChange={(event) => handleNavigate(event, event.target.value)}
                    />
                    <label for="iniciar-um-pedido">Iniciar um Pedido</label>
                    <input
                        id="pedidos-em-andamento"
                        type="radio"
                        name="pages"
                        value="/andamento"
                        onChange={(event) => handleNavigate(event, event.target.value)}
                    />
                    <label for="pedidos-em-andamento">Pedidos em Andamento</label>
                    <input 
                        id="pedidos-prontos"
                        type="radio"
                        name="pages"
                        value="/pronto"
                        onChange={(event) => handleNavigate(event, event.target.value)}
                    />
                    <label for="pedidos-prontos">Pedidos Prontos</label>
                    <input 
                        id="pedidos-entregues"
                        type="radio"
                        name="pages"
                        value="/entregue"
                        onChange={(event) => handleNavigate(event, event.target.value)}
                    />
                    <label for="pedidos-entregues">Pedidos Entregues</label>
                </section>
                <img className="img-header" alt="imagem-sair" src={logout} 
                    onClick={(event) => {
                        handleNavigate(event, '/')
                        localStorage.clear()
                    }
                }/>
            </header>
            <p className="nome-atendente">Atendente: {atendente}</p>
        </>
    );
  }
  
export default Header;