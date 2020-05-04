import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './app.sass'
import { auth, createUserRef } from './utils/firebase.js'
import CategoryPage from './pages/category.page.jsx'
import CollectionPage from './pages/collection.page.jsx'
import HeaderComponent from './components/header.component.jsx'
import HomePage from './pages/home.page.jsx'
import LoginPage from './pages/login.page.jsx'
import StoreData from './pages/store.data.json'

class App extends React.Component {
  authUnsubscribe = null
  state = {
    currentUser: null,
  }

  componentDidMount() {
    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          })
        })
      } else {
        this.setState({
          currentUser: null,
        })
      }
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
