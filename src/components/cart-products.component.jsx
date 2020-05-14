import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import React from 'react'

import { selectProducts } from '../state/cart.state'
import CartProductComponent from './cart-product.component'

const CartProductsComponent = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li>
        <CartProductComponent key={product.id} product={product} />
      </li>
    ))}
  </ul>
)

const mapStateToProps = createStructuredSelector({
  products: selectProducts
})

export default connect(mapStateToProps)(CartProductsComponent)
