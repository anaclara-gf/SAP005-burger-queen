import '../style/pagina404.css'
import React from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import Logo from "../components/Logo";

const role = localStorage.getItem("role");

function Pronto() {
    return (
      <>
        {role === "cozinha" ? (
        <>
          <Header />
            <main >
              <p>Pedidos Prontos</p>
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
    )
}

export default Pronto;