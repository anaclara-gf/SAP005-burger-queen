import '../style/salon.css'
import '../style/pagina404.css'
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mesas from '../components/Mesas';
import Logo from "../components/Logo";



const Salon = () => {
    const role = localStorage.getItem("role");
    const numeroDeMesas = 20;
    const mesas = [];

    for(let i = 0; i < numeroDeMesas; i++) {
      mesas.push(`${[i+1]}`)
    }

    return (
      <>
        {role === "salao" ? (
          <div className="Salon">
            <Header/>
            <main>
              <p className="buttons-header">Escolha a mesa para qual deseja fazer o pedido:</p>
              <div className="mesas">
                {mesas.map((mesa) => (
                  <Mesas 
                    mesa={mesa}
                  />
                ))}
              </div>
            </main>
            <Footer/>
          </div>
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
};

export default Salon;