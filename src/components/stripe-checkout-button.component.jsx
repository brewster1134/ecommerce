import { auth } from '../utils/firebase'
import { clearCart } from '../state/cart.state'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { NavLink } from 'react-router-dom'
import { selectCurrentUser } from '../state/user.state'
import { useHistory } from 'react-router-dom'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

import './stripe-checkout-button.styles.sass'

const StripeCheckoutButton = ({ clearCart, currentUser, price }) => {
  const dollarsToCents = price * 100
  const formatPrice = Intl.NumberFormat('en-US').format(price)
  const history = useHistory()
  const onToken = (token) => {
    clearCart()
    history.push('/')
  }

  return (
    <div className='stripe-checkout-button-component'>
      {auth.currentUser ? (
        <StripeCheckout
          amount={dollarsToCents}
          billingAddress
          bitcoin={true}
          description={`Your total is $${formatPrice}`}
          email={currentUser.email}
          image={`${process.env.PUBLIC_URL}/m.svg`}
          name='Man Alive!'
          panelLabel='Pay'
          shippingAddress
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          token={onToken}
        >
          <button>Pay Now</button>
        </StripeCheckout>
      ) : (
        <NavLink to='/login' key='login'>
          Login to Pay...
        </NavLink>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeCheckoutButton)
