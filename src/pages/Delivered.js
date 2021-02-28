import '../style/kitchen.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import CardsOrders from '../components/cardsOrderTemplate';

function Delivered() {
  let token = localStorage.getItem("token");
  const [deliveredOrders, setDeliveredOrders] = useState([])
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
          setDeliveredOrders(allOrders.filter((pedido) => pedido.status.includes("delivered")))
        }
        setLoading(false) 
      })  
  }, [token]);

  console.log(deliveredOrders)
  return (
    <>
      {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
        <Header />
          <main >
            {loading ?
            (
              <Loading />
            ) : (
              <>
                <h2>Pedidos Prontos</h2>
                {deliveredOrders
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map(({id, client_name, table, status, createdAt, Products}) => (
                    <>
                      <CardsOrders
                        id={id}
                        client={client_name}
                        table={table}
                        status={status}
                        date={createdAt}
                        ordersProducts = {Products}
                      />
                      <button
                        onClick={() => (console.log(`clicou ${status} ${id}`)) } 
                      >Alterar Status</button>
                    </>
                  ))
                }
              </>
              )}
            </main>
            <Footer />
    </>
  );
}

export default Delivered;