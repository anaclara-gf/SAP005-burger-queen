import '../style/kitchen.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import CardsOrders from '../components/cardsOrderTemplate';
import Logo from "../components/Logo";

function Done() {
  const role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  const [doneOrders, setDoneOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = "https://lab-api-bq.herokuapp.com/orders";

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
        setLoading(false) 
      })  
  }, [token]);

  const handleStatusOrders = (id, status, index) => {
    let path = `/${id}`
    let statusChanged = ""
    if (status === "done") {
      statusChanged = {"status" : "delivered"}
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(statusChanged),
    };

    fetch(`${url}${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        if(data.id === doneOrders[index].id) {
          doneOrders.splice(index, 1)
          setDoneOrders([...doneOrders])
        }
      })

  }

  return (
    <>
      {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
      {role === "salao" ? (
        <>  
        <Header />
          <main >
            {loading ?
            (
              <Loading />
            ) : (
              <section className="pedidos-pronto">
                <h2>Pedidos Prontos</h2>
                {doneOrders
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map(({id, client_name, table, status, createdAt, updatedAt, Products}, index) => (
                    <div className="comandas">
                      <CardsOrders
                        key={index}
                        id={id}
                        client={client_name}
                        table={table}
                        status={status}
                        create={createdAt}
                        update={createdAt}
                        ordersProducts = {Products}
                      />
                      <button
                        className="comanda-button"
                        onClick={() => {
                          handleStatusOrders(id, status, index)
                        }} 
                      >Pedido Entregue</button>
                    </div>
                  ))
                }
              </section>
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

export default Done;