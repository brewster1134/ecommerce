import { auth } from '../utils/firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import './header.styles.sass'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/bag.svg'
import { selectCartQuantity, toggleDropdown } from '../redux/cart.redux'
import CartProductsComponent from './cart-products.component'

const HeaderComponent = ({
  cartQuantity,
  currentUser,
  dropdownVisible,
  toggleDropdown
}) => {
  return (
    <div className='header-component'>
      <Link to='/' key='home'>
        <LogoIcon />
      </Link>

      <Link to='/mens' key='mens'>
        <h3>Mens</h3>
      </Link>

      <Link to='/womens' key='womens'>
        <h3>Womens</h3>
      </Link>

      <div className='header-component__links'>
        <div className='header-component__cart'>
          <div className='header-component__icon' onClick={toggleDropdown}>
            <ShoppingBagIcon />
            <div className='header-component__cart-quantity'>
              {cartQuantity}
            </div>
          </div>
          {dropdownVisible ? (
            <div className='header-component__dropdown'>
              <CartProductsComponent />
              <button>Checkout</button>
            </div>
          ) : null}
        </div>
        <div className='header-component__auth'>
          {currentUser ? (
            <div>
              <div className='anchor' onClick={() => auth.signOut()}>
                Logout
              </div>
              <span>{currentUser.displayName}</span>
            </div>
          ) : (
            <Link to='/login' key='login'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cartQuantity: selectCartQuantity(state),
  currentUser: state.user.currentUser,
  dropdownVisible: state.cart.dropdownVisible
})

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
