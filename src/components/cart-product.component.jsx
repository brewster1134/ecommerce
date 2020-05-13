import React from 'react'

const CartProductComponent = ({ product }) => (
  <div className='cart-product-component'>
    <div className='cart-product-component__meta-data'>
      <div>{product.name}</div>
      <div>
        {product.quantity} x ${product.price}
      </div>
    </div>
    <img src={product.imageUrl} alt={product.name} />
  </div>
)

export default CartProductComponent
