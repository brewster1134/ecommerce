import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './app.sass'
import CategoryPage from './pages/category.page.jsx'
import CollectionPage from './pages/collection.page.jsx'
import HeaderComponent from './components/header.component.jsx'
import HomePage from './pages/home.page.jsx'
import StoreData from './pages/store.data.json'

const App = () => (
  <div className='ecommerce'>
    <HeaderComponent />
    <Switch>
      <Route exact path='/' component={() => <HomePage data={StoreData} />} />
      <Route
        exact
        path={`/:category`}
        component={() => <CategoryPage data={StoreData} />}
      />
      <Route
        exact
        path={`/:category/:collection`}
        component={() => <CollectionPage data={StoreData} />}
      />
    </Switch>
  </div>
)

export default App
