import React from "react";
import '../style/salon.css'
import '../style/kitchen.css'
import ProductsOrders from "./productsOrderTemplate";

function CardsOrders({id, client, table, status, date, ordersProducts}) {
   
  return (
    <>
      <label className="comanda" key={`order-${id}`}>
        <div className="comanda-titulo">
          <p>Cliente: {client}</p>
          <p>Mesa: {table}</p>
          <p>Status: {status}</p>
          <p>Criado em: {date}</p>
        </div>
        <div className="comanda-itens">
          {ordersProducts.map(({id, name, flavor, complement, qtd}) => (
            <ProductsOrders 
              id={id}
              name={name}
              flavor={flavor}
              complement={complement}
              qtd={qtd}
            />
          ))}
        </div>
      </label>
    </>
  );
}
  
export default CardsOrders;