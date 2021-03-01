import React from "react";
import '../style/salon.css'

function ProductsOrders({id, name, flavor, complement, qtd}) {
   
  return (
    <>
      <label key={`product-${id}`}>
        <p>{qtd}x {name}</p>
        <p><i>{flavor}</i></p>
        <p><i>{complement}</i></p>
      </label>
    </>
  );
}
  
export default ProductsOrders;