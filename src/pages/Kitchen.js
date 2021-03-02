import '../style/kitchen.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import CardsOrders from '../components/cardsOrderTemplate';
import Logo from "../components/Logo";

function Kitchen() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  let token = localStorage.getItem("token");
  const [pendingOrders, setPendingOrders] = useState([])
  const [doingOrders, setDoingOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          setPendingOrders(allOrders.filter((pedido) => pedido.status.includes("pending")))
          setDoingOrders(allOrders.filter((pedido) => pedido.status.includes("doing")))
        }
        setLoading(false) 
      })  
  }, [token]);

  console.log(pendingOrders)
  console.log(doingOrders)
    return (
      <>
      {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
          
      {role === "cozinha" ? (
        <>
          <Header />
          <main className="pedidos-cozinha">
            {loading ? 
            (
              <Loading />
            ) : (
              <>
                <section className="pedidos-pendentes">
                  <h2>Pedidos Criados</h2>
                  <div className="comandas-pedidos-criados">
                    {pendingOrders
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map(({id, client_name, table, status, createdAt, Products}) => (
                        <div className="comandas">
                          <CardsOrders
                            id={id}
                            client={client_name}
                            table={table}
                            status={status}
                            date={createdAt}
                            ordersProducts = {Products}
                          />
                          <button
                            className="comanda-button"
                            onClick={() => (console.log(`clicou ${status} ${id}`)) } 
                          >Alterar Status</button>
                        </div>
                        ))
                    }
                  </div>
                </section>
                <section className="pedidos-andamento">
                  {doingOrders !== [] &&
                    <>
                      <h2>Pedidos em Andamento</h2>
                      <div className="comandas-pedidos-andamento">
                        {doingOrders
                          .sort((a, b) => (a.id > b.id ? 1 : -1))
                          .map(({id, client_name, table, status, createdAt, Products}) => (
                            <div className="comandas">
                              <CardsOrders
                                id={id}
                                client={client_name}
                                table={table}
                                status={status}
                                date={createdAt}
                                ordersProducts = {Products}
                              />
                              <button
                                className="comanda-button"
                                onClick={() => (console.log(`clicou ${status} ${id}`)) } 
                              >Alterar Status</button>
                            </div>
                          ))
                        }
                      </div>
                    
                    </>
                  }
                </section>
              </>
            )}
            </main>
            
          <Footer />
        </>
          ) : (
            <>
              <Header />
              <main className="acessonegado-container">
                  <p className="acessonegado-title">Ops!!!</p>
                  <p className="acessonegado-message">Você não pode acessar essa página!</p>
                  <Logo />
              </main>
              <Footer />
              </>
          )}
        </>
    );
}

export default Kitchen;