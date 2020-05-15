import { auth } from '../utils/firebase'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import React from 'react'

import './header.styles.sass'
import { ReactComponent as CartIcon } from '../assets/cart.svg'
import { ReactComponent as LogoIcon } from '../assets/m.svg'
import { selectCurrentUser } from '../state/user.state'
import CartDropdownComponent from './cart-dropdown.component'
import {
  selectCartQuantity,
  selectDropdownVisible,
  selectProducts,
  toggleDropdown
} from '../state/cart.state'

const HeaderComponent = ({
  cartQuantity,
  currentUser,
  dropdownVisible,
  products,
  toggleDropdown
}) => {
  return (
    <div className='header-component'>
      <Link to='/' key='home'>
        <LogoIcon className='header-component__logo' />
      </Link>

      <Link to='/mens' key='mens'>
        <h3>Mens</h3>
      </Link>

      <Link to='/womens' key='womens'>
        <h3>Womens</h3>
      </Link>

      <div className='header-component__links'>
        <div className='header-component__cart'>
          <div className='header-component__cart-icon' onClick={toggleDropdown}>
            <CartIcon />
            <div className='header-component__cart-quantity'>
              {cartQuantity}
            </div>
          </div>
          {dropdownVisible ? <CartDropdownComponent /> : null}
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

const mapStateToProps = createStructuredSelector({
  cartQuantity: selectCartQuantity,
  currentUser: selectCurrentUser,
  dropdownVisible: selectDropdownVisible,
  products: selectProducts
})

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
