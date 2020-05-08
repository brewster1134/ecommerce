import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, createUserRef } from './utils/firebase'
import { setCurrentUser } from './redux/user.redux'
import CategoryPage from './pages/category.page'
import CollectionPage from './pages/collection.page'
import HeaderComponent from './components/header.component'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'
import StoreData from './pages/store.data.json'

class App extends React.Component {
  authUnsubscribe = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        setCurrentUser(null)
      }
    })
  }

  componentWillUnmount() {
    this.authUnsubscribe()
  }

  render() {
    return (
      <div className='ecommerce'>
        <HeaderComponent />

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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)
