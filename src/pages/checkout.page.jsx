import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './checkout.styles.sass'
import { selectProducts, selectCartTotal } from '../state/cart.state'
import CartItemComponent from '../components/cart-item.component'

const CheckoutPage = ({ products, cartTotal }) => (
  <div className='checkout-page'>
    <div className='checkout-page__header'>
      <div></div>
      <div>Product</div>
      <div>Price</div>
      <div>Quantity</div>
      <div></div>
    </div>
    {products.map((product) => (
      <CartItemComponent key={product.id} product={product} />
    ))}
    <div className='cart-total'>
      Total: <span>${cartTotal}</span>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartTotal: selectCartTotal,
  products: selectProducts
})

export default connect(mapStateToProps)(CheckoutPage)
