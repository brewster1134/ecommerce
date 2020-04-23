import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './app.sass'
import CategoryPage from './pages/category.page.jsx'
import CollectionPage from './pages/collection.page.jsx'
import HeaderComponent from './components/header.component.jsx'
import HomePage from './pages/home.page.jsx'
import LoginPage from './pages/login.page.jsx'
import StoreData from './pages/store.data.json'
import { auth } from './utils/firebase.js'

class App extends React.Component {
  authUnsubscribe = null // placeholder for firebase unsubscribe method
  state = {
    currentUser: null,
  }

  componentDidMount() {
    this.authUnsubscribe = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    this.authUnsubscribe()
  }

  render() {
    return (
      <div className='ecommerce'>
        <HeaderComponent currentUser={this.state.currentUser} />

        <Switch>
          <Route
            exact
            path='/'
            component={() => <HomePage data={StoreData} />}
          />
          <Route exact path='/login' component={LoginPage} />

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
  }
}

export default App
