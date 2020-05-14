import { connect } from 'react-redux'
import React from 'react'

import { selectProducts } from '../redux/cart.redux'
import CartProductComponent from './cart-product.component'

const CartProductsComponent = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li>
          <CartProductComponent key={product.id} product={product} />
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = (state) => ({
  products: selectProducts(state)
})

export default connect(mapStateToProps)(CartProductsComponent)
