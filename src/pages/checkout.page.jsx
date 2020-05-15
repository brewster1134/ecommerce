import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './checkout.styles.sass'
import { selectProducts, selectCartTotal } from '../state/cart.state'

const CheckoutPage = ({ products, cartTotal }) => {
  return (
    <div className='checkout-page'>
      <div className='checkout-page__header'>
        <div></div>
        <div>Product</div>
        <div>Quantity</div>
        <div>Price</div>
        <div></div>
      </div>
      {products.map((product) => (
        <div
          className='checkout-page__product'
          id={product.id}
          key={product.id}
        >
          <div>
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div>{product.name}</div>
          <div>{product.quantity}</div>
          <div>${product.price}</div>
          <div className='remove'>
            <span></span>
          </div>
        </div>
      ))}
      <div className='cart-total'>
        Total: <span>${cartTotal}</span>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage)
