import React from 'react'
import { Link } from 'react-router-dom'

import './header.styles.sass'
import { ReactComponent as Logo } from '../assets/logo.svg'

const HeaderComponent = () => (
  <div className='component-header'>
    <Link className='component-header__home' to='/' key='home'>
      <Logo />
      <h1>Home</h1>
    </Link>

    <Link to='/mens' key='mens'>
      <h2>Mens</h2>
    </Link>

    <Link to='/womens' key='womens'>
      <h2>Womens</h2>
    </Link>

    <div className='component-header__links'>
      <Link to='/login' key='login'>
        Login
      </Link>
    </div>
  </div>
)

export default HeaderComponent
