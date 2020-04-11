import React from 'react'
import { Link } from 'react-router-dom'

import './header.styles.sass'

const HeaderComponent = () => (
  <div className='component-header'>
    <Link to='/' key='home'>
      <h1>Home</h1>
    </Link>
    <div className='component-header__links'>
      <Link to='/mens' key='mens'>
        <h2>Mens</h2>
      </Link>
      <Link to='/womens' key='womens'>
        <h2>Womens</h2>
      </Link>
    </div>
  </div>
)

export default HeaderComponent
