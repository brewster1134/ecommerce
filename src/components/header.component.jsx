import { auth } from '../utils/firebase'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { NavLink } from 'react-router-dom'
import React from 'react'

import './header.styles.sass'
import { ReactComponent as CartIcon } from '../assets/cart.svg'
import { ReactComponent as LogoIcon } from '../assets/m.svg'
import { selectCategories } from '../state/store.state'
import { selectCurrentUser } from '../state/user.state'
import CartDropdownComponent from './cart-dropdown.component'
import {
  selectCartQuantity,
  selectDropdownVisible,
  toggleDropdown
} from '../state/cart.state'

const HeaderComponent = ({
  categories,
  cartQuantity,
  currentUser,
  dropdownVisible,
  toggleDropdown
}) => (
  <div className='header-component'>
    <NavLink to='/' key='home'>
      <LogoIcon className='header-component__logo' />
    </NavLink>

    {categories.map((category) => (
      <NavLink key={category.id} to={`/${category.id}`}>
        <h3>{category.name}</h3>
      </NavLink>
    ))}

    <div className='header-component__links'>
      <div className='header-component__cart'>
        <div className='header-component__cart-icon' onClick={toggleDropdown}>
          <CartIcon />
          <div className='header-component__cart-quantity'>{cartQuantity}</div>
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
          <NavLink to='/login' key='login'>
            Login
          </NavLink>
        )}
      </div>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  cartQuantity: selectCartQuantity,
  currentUser: selectCurrentUser,
  dropdownVisible: selectDropdownVisible
})

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => dispatch(toggleDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
