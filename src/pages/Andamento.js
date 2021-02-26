import '../style/pagina404.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import Logo from "../components/Logo";

const role = localStorage.getItem("role");


function Andamento() {
  let token = localStorage.getItem("token");
  const [pedidos, setPedidos] = useState([])
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
          setPedidos(data)
          setLoading(false)
        })    
  }, [token]);

  // useEffect(() => {
  //   console.log(pedidos)
  //   console.log(pending)
  // }, [pedidos, pending])

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
                {/* {pedidos.map (pedido => {
                  if(pedido.status === "pending"){
                    setPending([...pending, pedido])
                  }
                  
                })

              } */}
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

export default Andamento;