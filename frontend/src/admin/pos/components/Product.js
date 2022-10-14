import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <center>
      <img className="small" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      </center>

      
      <div className='titelproduct'>
      <div>ราคา : {product.price}</div>
        <button id='addcart' onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
      
    </div>
  );
}
