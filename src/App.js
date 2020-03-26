import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import HomePage from './pages/home.page'
import CategoryPage from './pages/category.page'

import ShopData from './pages/shop.data'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <HomePage data={ShopData} />} />
    <Route
      path={`/:category`}
      component={() => <CategoryPage data={ShopData} />}
    />
    {/* <Route path={`/:category/:collection`} component={Collection} /> */}
  </Switch>
)

const App = () => (
  <div className='ecommerce'>
    <Routes />
  </div>
  )

export default App
