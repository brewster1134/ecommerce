import React from 'react'

import { auth, signInWithGoogle } from '../utils/firebase.js'

class LoginComponent extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error.message)
    }

    this.setState({ email: '', password: '' })
  }

  render() {
    return (
      <div className='login-component'>
        <h2>Login...</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>E-mail</label>
          <input
            name='email'
            onChange={this.handleChange}
            type='email'
            value={this.state.email}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            name='password'
            onChange={this.handleChange}
            type='password'
            value={this.state.password}
            required
          />

          <button type='submit'>Login w/ Email</button>
          <hr />
          <button onClick={signInWithGoogle}>Login w/ Google</button>
        </form>
      </div>
    )
  }
}

export default LoginComponent
