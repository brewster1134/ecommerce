import { connect } from 'react-redux'
import React from 'react'

import CartProductComponent from './cart-product.component'

const CartProductsComponent = ({ products }) => {
  return (
    <ul className='cart-products-component'>
      {products.map((product) => (
        <li>
          <CartProductComponent key={product.id} product={product} />
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = ({ cart }) => ({
  products: cart.products
})

export default connect(mapStateToProps)(CartProductsComponent)
