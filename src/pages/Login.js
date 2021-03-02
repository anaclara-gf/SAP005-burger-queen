import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import ErrorModal from '../components/ModalError';
import Loading from '../components/Loading';
import '../style/login.css'

function Login(props) {
    const [authInfo, setAuthInfo] = useState(props.authInfo);
    let history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true)
  
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(authInfo)
      };
  
      fetch('https://lab-api-bq.herokuapp.com/auth', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.token !== undefined){
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("atendente", data.name)
            localStorage.setItem("role", data.role)
            history.push({
              pathname: `/${data.role}`,
            });
            setLoading(false);
          } else {
            setIsModalVisible(true);
            setErrorMessage(`${data.message}`);
            setLoading(false);
          }
        })
      }

      return (
        <div>
        {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
          <section className="login">
            <Logo />
            <form className="form-login" onSubmit={handleSubmit}>
              <input 
                  className="form-input"
                  type="text" 
                  placeholder="E-mail"
                  onChange={(event) => setAuthInfo({ ...authInfo, "email": event.target.value })} 
              />
      
              <input
                  className="form-input"
                  type="password" 
                  placeholder="Senha"
                  onChange={(event) => setAuthInfo({ ...authInfo, "password": event.target.value })} 
              />
      
              <button
                  className="form-button" 
                  type="submit" 
                  value="Submit"
              >
                  {!loading && <p>ENTRAR</p>}
                  {loading && <Loading id={"img-loading-id"}/>}
              </button>
      
              <p className="form-text">
                  Não tem uma conta? 
                  <Link className="form-router" to="/register" alt="Página Registro">Registre-se!</Link>
              </p>
            </form>
        </section>
        <Footer />
      </div>
      
    );
}

export default Login;