import '../style/pagina404.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import Logo from "../components/Logo";

const role = localStorage.getItem("role");

function Kitchen() {
  let token = localStorage.getItem("token");
  // const [allOrders, setAllOrders] = useState([])
  const [pending, setPending] = useState([])
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
            setPending(allOrders.filter((pedido) => pedido.status.includes("pending")))
          }
          setLoading(false) 
        })  
  }, [token]);

  console.log(pending)

    return (
      <>
      {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
          
      {role === "cozinha" ? (
        <>
          <Header />
            <main >
            {loading ? 
            (
              <Loading />
            ) : (
              <div>
                {pending
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((pedido, index) => (
                    
                    <div key={index}>ID: {pedido.id} Nome do Cliente: {pedido.client_name} Mesa:{pedido.table}</div>
                  ))


                }
       
              <p>Pedidos em Andamento</p>
              </div>
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