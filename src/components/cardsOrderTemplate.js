import React from "react";
import '../style/salon.css'
import ProductsOrders from "./productsOrderTemplate";

function CardsOrders({id, client, table, status, create, update, ordersProducts}) {
  const createDate = new Date(create);
  const updateDate = new Date(update);
  const calculateSeconds = Math.abs(updateDate) - createDate;
  const calculateMinutes = Math.floor(calculateSeconds / 1000 / 60);

  const createDateString = new Date(create).toString();
  const updateDateString = new Date(update).toString();
  const createDateSlice = createDateString.substring(4,15);
  const createHourSlice = createDateString.substring(15,25);
  const updateDateSlice = updateDateString.substring(4,15);
  const updateHourSlice = updateDateString.substring(15,25);

  console.log(calculateSeconds)
  console.log(calculateMinutes)
  
  return (
    <>
      <label key={`order-${id}`}>
        <p>Cliente: {client}</p>
        <p>Mesa: {table}</p>
        <p>staus: {status}</p>
        <p>Criado em: {createDateSlice} / {createHourSlice}</p>
        <p>Finalizado em: {create === update ? null : `${updateDateSlice} / ${updateHourSlice}`}</p>
        <p>Tempo: {calculateMinutes > 0 ? `${calculateMinutes} minutos` : null}</p>
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