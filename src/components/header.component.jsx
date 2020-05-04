import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../utils/firebase.js'

import './header.styles.sass'
import { ReactComponent as Logo } from '../assets/logo.svg'

class HeaderComponent extends React.Component {
  handleClick() {
    auth.signOut()
  }

  render() {
    return (
      <div className='header-component'>
        <Link className='header-component__home' to='/' key='home'>
          <Logo />
          <h1>Home</h1>
        </Link>

        <Link to='/mens' key='mens'>
          <h2>Mens</h2>
        </Link>

        <Link to='/womens' key='womens'>
          <h2>Womens</h2>
        </Link>

        <div className='header-component__links'>
          {this.props.currentUser ? (
            <div>
              <span>{this.props.currentUser.displayName}</span>
              <div className='anchor' onClick={this.handleClick}>
                Logout
              </div>
            </div>
          ) : (
            <Link to='/login' key='login'>
              Login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default HeaderComponent
