import React from 'react'
import { auth, createUserRef } from '../utils/firebase.js'

class RegisterComponent extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { displayName, email, password, confirmPassword } = this.state

    // verify passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      // create authenticated user
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      // save user to db
      createUserRef(user, { displayName })

      // update state of current user
      this.setState({ currentUser: user })
    } catch (error) {
      alert(error.message)
    }

    // reset state for submit form
    this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  render() {
    return (
      <div className='register-component'>
        <h2>Register...</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='displayName'>Name</label>
          <input
            name='displayName'
            onChange={this.handleChange}
            type='text'
            required
          />

          <label htmlFor='email'>Email</label>
          <input
            name='email'
            onChange={this.handleChange}
            type='email'
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            name='password'
            onChange={this.handleChange}
            type='password'
            required
          />

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            name='confirmPassword'
            onChange={this.handleChange}
            type='password'
            required
          />

          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterComponent
