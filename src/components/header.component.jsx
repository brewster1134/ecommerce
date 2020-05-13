import { auth } from '../utils/firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import './header.styles.sass'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/bag.svg'
import { toggleDropdown } from '../redux/cart.redux'
import CartItemsComponent from './cart-items.component'

const HeaderComponent = ({ currentUser, dropdownVisible, toggleDropdown }) => {
  return (
    <div className='header-component'>
      <Link className='header-component__home' to='/' key='home'>
        <LogoIcon />
        <h1>Home</h1>
      </Link>

      <Link to='/mens' key='mens'>
        <h2>Mens</h2>
      </Link>

      <Link to='/womens' key='womens'>
        <h2>Womens</h2>
      </Link>

      <div className='header-component__links'>
        <div className='cart'>
          <div className='icon' onClick={toggleDropdown}>
            <ShoppingBagIcon />
            <div className='cart-count'>0</div>
          </div>
          {dropdownVisible ? (
            <div className='dropdown'>
              <CartItemsComponent />
              <button>Checkout</button>
            </div>
          ) : null}
        </div>
        <div className='auth'>
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

const mapStateToProps = ({ cart, user }) => ({
  currentUser: user.currentUser,
  dropdownVisible: cart.dropdownVisible
})

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
