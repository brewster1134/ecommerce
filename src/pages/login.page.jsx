import React from 'react'

import './login.page.sass'
import LoginComponent from '../components/login.component'
import RegisterComponent from '../components/register.component'

const LoginPage = () => (
  <div className='page-login'>
    <LoginComponent />
    <RegisterComponent />
  </div>
)

export default LoginPage
