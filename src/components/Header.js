import '../style/header.css'
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoBack from '../images/Logo-circulo.png'
import logout from '../images/Ícones/sair-amarelo.png'

function Header() {
    const atendente = localStorage.getItem("atendente");
    const role = localStorage.getItem("role");
    let token = localStorage.getItem("token");
    const history = useHistory();
    const location = useLocation();
    const [doneOrders, setDoneOrders] = useState([])

    const handleNavigate = (path) => {
        history.push(path)
    }

    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            };
        
            fetch('https://lab-api-bq.herokuapp.com/orders', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                const allOrders = data
                setDoneOrders(allOrders.filter((pedido) => pedido.status.includes("done")))
                }
            })  
    }, [token]);

    setInterval(() => doneOrders, 1000);

    return (
        <>
            <header>
                <img className="img-header" alt="imagem-logo" src={logoBack} 
                    onClick={() => handleNavigate('/salao')}/>
                <section className="header-input">
                    {role === "salao" ? 
                    (
                        <>
                        <input
                            className="input-header"
                            id="iniciar-um-pedido"
                            type="radio"
                            name="choose-pages"
                            value="/salao"
                            defaultChecked={location.pathname === "/salao" || location.pathname.includes("/pedidos") ? true : false}
                            onChange={(event) => { 
                                handleNavigate(event.target.value);
                            }}
                        />
                        <label className="label-header" htmlFor="iniciar-um-pedido">Iniciar um Pedido</label>

                        <input
                            className="input-header"
                            id="pedidos-prontos"
                            type="radio"
                            name="choose-pages"
                            value="/pronto"
                            defaultChecked={location.pathname === "/pronto" ? true : false}
                            onChange={(event) => {
                                handleNavigate(event.target.value)
                            }}
                        />

                        <label className="notificacao-position label-header" htmlFor="pedidos-prontos">
                            Pedidos Prontos
                            <label htmlFor="pedidos-prontos" className="notificacao-pedidos-prontos">
                                {doneOrders.length > 0 ? doneOrders.length : null}
                            </label>
                        </label>
                        

                        

                        </>
                    ) : (
                        <>
                        <input
                            className="input-header"
                            id="pedidos-em-andamento"
                            type="radio"
                            name="choose-pages"
                            value="/cozinha"
                            defaultChecked={location.pathname === "/cozinha" ? true : false}
                            onChange={(event) => {
                                handleNavigate(event.target.value)
                            }}
                        />
                        <label className="label-header" htmlFor="pedidos-em-andamento">Pedidos em Andamento</label>
                        </>
                    )
                    }
                    <input 
                        className="input-header"
                        id="pedidos-entregues"
                        type="radio"
                        name="choose-pages"
                        value="/entregue"
                        defaultChecked={location.pathname === "/entregue" ? true : false}
                        onChange={(event) => {
                            handleNavigate(event.target.value)
                        }}
                    />
                    <label className="label-header" htmlFor="pedidos-entregues">Pedidos Entregues</label>
                    
                    
                </section>
                <img className="img-header" alt="imagem-sair" src={logout} 
                    onClick={() => {
                        handleNavigate('/')
                        localStorage.clear()
                    }
                }/>
            </header>
            <p className="nome-atendente">Colaborador: {atendente}</p>
        </>
    );
  }
  
export default Header;