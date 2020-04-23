import React from 'react'

import { signInWithGoogle } from '../utils/firebase.js'

class LoginComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ email: '', password: '' })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='component-login'>
        <h2>I already have an account...</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>E-mail</label>
          <input
            name='email'
            onChange={this.handleChange}
            placeholder='e-mail'
            value={this.state.email}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            name='password'
            onChange={this.handleChange}
            placeholder='password'
            type='password'
            value={this.state.password}
            required
          />

          <button type='submit'>Login w/ E-mail & Password</button>
          <hr />
          <button onClick={signInWithGoogle}>Login w/ Google</button>
        </form>
      </div>
    )
  }
}

export default LoginComponent
