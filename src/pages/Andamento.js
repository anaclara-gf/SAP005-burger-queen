import '../style/pagina404.css'
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';

function Andamento() {
  let token = localStorage.getItem("token");
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
          setPending(data)
          setLoading(false)
        })    
  }, [token]);

  console.log(pending)
    return (
        <>
          {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
          <Header />
            <main >
            {loading ? 
            (
              <Loading />
            ) : (
              <p>Pedidos em Andamento</p>
            )}
            </main>
          <Footer />
        </>
    );
}

export default Andamento;