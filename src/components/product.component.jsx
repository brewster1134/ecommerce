import { connect } from 'react-redux'
import React from 'react'

import './product.styles.sass'
import { addProduct } from '../state/cart.state'

const ProductComponent = ({ addProduct, product }) => (
  <div className='product-component'>
    <img alt={product.name} src={product.imageUrl} />
    <div className='product-component__meta-data'>
      <span>{product.name}</span>
      <span>${product.price}</span>
    </div>
    <button className='hidden' onClick={() => addProduct(product)}>
      Add to Cart
    </button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product))
})

export default connect(null, mapDispatchToProps)(ProductComponent)
