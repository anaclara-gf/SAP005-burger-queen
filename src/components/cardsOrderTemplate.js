import React from "react";
import '../style/salon.css'
import ProductsOrders from "./productsOrderTemplate";

function CardsOrders({id, client, table, status, date, ordersProducts}) {
   
  return (
    <>
      <label key={`order-${id}`}>
        <p>Cliente: {client}</p>
        <p>Mesa: {table}</p>
        <p>staus: {status}</p>
        <p>createdAt: {date}</p>
        <hr></hr>
        {ordersProducts.map(({id, name, flavor, complement, qtd}) => (
          <ProductsOrders 
            id={id}
            name={name}
            flavor={flavor}
            complement={complement}
            qtd={qtd}
          />
        ))}
        <hr></hr>
      </label>
    </>
  );
}
  
export default CardsOrders;