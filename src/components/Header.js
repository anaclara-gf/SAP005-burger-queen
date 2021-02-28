import '../style/header.css'
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoBack from '../images/Logo-circulo.png'
import logout from '../images/Ícones/sair-amarelo.png'

function Header() {
    const atendente = localStorage.getItem("atendente");
    const history = useHistory();
    const location = useLocation();

    const handleNavigate = (path) => {
        history.push(path)
    }

    return (
        <>
            <header>
                <img className="img-header" alt="imagem-logo" src={logoBack} 
                    onClick={() => handleNavigate('/salao')}/>
                <section className="header-input">
                    <input 
                        id="iniciar-um-pedido"
                        type="radio"
                        name="choose-pages"
                        value="/salao"
                        defaultChecked={location.pathname === "/salao" || location.pathname.includes("/pedidos") ? true : false}
                        onChange={(event) => { 
                            handleNavigate(event.target.value);
                        }}
                    />
                    <label htmlFor="iniciar-um-pedido">Iniciar um Pedido</label>
                    <input
                        id="pedidos-em-andamento"
                        type="radio"
                        name="choose-pages"
                        value="/cozinha"
                        defaultChecked={location.pathname === "/cozinha" ? true : false}
                        onChange={(event) => {
                            handleNavigate(event.target.value)
                        }}
                    />
                    <label htmlFor="pedidos-em-andamento">Pedidos em Andamento</label>
                    <input 
                        id="pedidos-prontos"
                        type="radio"
                        name="choose-pages"
                        value="/pronto"
                        defaultChecked={location.pathname === "/pronto" ? true : false}
                        onChange={(event) => {
                            handleNavigate(event.target.value)
                        }}
                    />
                    <label htmlFor="pedidos-prontos">Pedidos Prontos</label>
                    <input 
                        id="pedidos-entregues"
                        type="radio"
                        name="choose-pages"
                        value="/entregue"
                        defaultChecked={location.pathname === "/entregue" ? true : false}
                        onChange={(event) => {
                            handleNavigate(event.target.value)
                        }}
                    />
                    <label htmlFor="pedidos-entregues">Pedidos Entregues</label>
                </section>
                <img className="img-header" alt="imagem-sair" src={logout} 
                    onClick={() => {
                        handleNavigate('/')
                        localStorage.clear()
                    }
                }/>
            </header>
            <p className="nome-atendente">Atendente: {atendente}</p>
        </>
    );
  }
  
export default Header;