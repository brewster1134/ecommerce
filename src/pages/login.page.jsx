import React from 'react'

import './login.page.sass'
import LoginComponent from '../components/login.component.jsx'
import RegisterComponent from '../components/register.component.jsx'

const LoginPage = () => (
  <div className='page-login'>
    <LoginComponent />
    <RegisterComponent />
  </div>
)

export default LoginPage
