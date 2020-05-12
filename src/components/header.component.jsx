import { auth } from '../utils/firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import './header.styles.sass'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import CartIconComponent from './cart-icon.component'

const HeaderComponent = ({ currentUser }) => (
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
      {currentUser ? (
        <div>
          <span>{currentUser.displayName}</span>
          <div className='anchor' onClick={() => auth.signOut()}>
            Logout
          </div>
        </div>
      ) : (
        <Link to='/login' key='login'>
          Login
        </Link>
      )}
      <CartIconComponent />
    </div>
  </div>
)

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(HeaderComponent)
