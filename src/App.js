import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css'

import HomePage from './pages/home.page'
import CategoryPage from './pages/category.page'
import CollectionPage from "./pages/collection.page"

import ShopData from './pages/shop.data'

const Routes = () => (
  <Router>
    <Route exact path="/" component={() => <HomePage data={ShopData} />} />
    <Route
      exact
      path={`/:category`}
      component={() => <CategoryPage data={ShopData} />}
    />
    <Route
      path={`/:category/:collection`}
      component={() => <CollectionPage data={ShopData} />}
    />
  </Router>
)

const App = () => (
  <div className='ecommerce'>
    <Routes />
  </div>
  )

export default App
