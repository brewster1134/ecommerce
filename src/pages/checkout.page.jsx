import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './checkout.styles.sass'
import { selectProducts, selectCartTotal } from '../state/cart.state'
import CartItemComponent from '../components/cart-item.component'
import StripeCheckoutButton from '../components/stripe-checkout-button.component.jsx'

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

    <div className='checkout-page__cart-total'>
      Total: <span>${cartTotal}</span>
    </div>
    <div className='checkout-page__checkout-button'>
      <StripeCheckoutButton price={cartTotal} />
    </div>
    <div className='checkout-page__test-warning'>
      <pre>
        Test Payment Info
        <br />
        CARD #: 5555-5555-5555-4444
        <br />
        CVV: Any 3 digits
        <br />
        EXP: Any future date
      </pre>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartTotal: selectCartTotal,
  products: selectProducts
})

export default connect(mapStateToProps)(CheckoutPage)
