import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import HomePage from './pages/home.page'
import Category from './components/category_old.component'
// import ShopPage from './pages/shop.page'

import ShopData from './pages/shop.data'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={() => <HomePage data={ShopData} />} />
    <Route path={`/:category`} component={() => <Category data={ShopData} />} />
    {/* <Route path={`/:category/:collection`} component={Collection} /> */}
  </Switch>

  // <Switch>
  //   <Route exact path='/' render={() => (<HomePage data={ShopData} />)} />
  //   <Route exact path='/shop' component={ShopPage} />
  // </Switch>
)

const App = () => {
  return (
    <div className='ecommerce'>
      <Routes />
    </div>
  )
}

export default App
