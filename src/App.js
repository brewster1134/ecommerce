import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.sass'

import HomePage from './pages/home.page'
import CategoryPage from './pages/category.page'
import CollectionPage from './pages/collection.page'

import StoreData from './pages/store.data'

const Routes = () => (
  <Router>
    <Route exact path='/' component={() => <HomePage data={StoreData} />} />
    <Route
      exact
      path={`/:category`}
      component={() => <CategoryPage data={StoreData} />}
    />
    <Route
      path={`/:category/:collection`}
      component={() => <CollectionPage data={StoreData} />}
    />
  </Router>
)

const App = () => (
  <div className='ecommerce'>
    <Routes />
  </div>
)

export default App
