import React from 'react'
import { connect } from 'react-redux'

import './cart-item.styles.sass'
import { addProduct, removeProduct, subtractProduct } from '../state/cart.state'

const CartItemComponent = ({
  addProduct,
  product,
  removeProduct,
  subtractProduct
}) => {
  const handleAddProduct = () => addProduct(product)
  const handleRemoveClick = () => removeProduct(product)
  const handleSubtractProduct = () => subtractProduct(product)

  return (
    <div className='cart-item-component' id={product.id}>
      <div>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div>{product.name}</div>
      <div>${product.price}</div>
      <div className='quantity'>
        <span className='subtract' onClick={handleSubtractProduct}>
          &#x276E;
        </span>
        <span>{product.quantity}</span>
        <span className='add' onClick={handleAddProduct}>
          &#x276F;
        </span>
      </div>
      <div className='remove'>
        <span onClick={handleRemoveClick}>&#10005;</span>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
  removeProduct: (product) => dispatch(removeProduct(product)),
  subtractProduct: (product) => dispatch(subtractProduct(product))
})

export default connect(null, mapDispatchToProps)(CartItemComponent)
