import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, userCreateRef } from './utils/firebase'
import { selectCurrentUser, userSetCurrent } from './state/user.state'
import CategoryPage from './pages/category.page'
import CheckoutPage from './pages/checkout.page'
import CollectionPage from './pages/collection.page'
import HeaderComponent from './components/header.component'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'
import StoreData from './assets/store.data.json'

class App extends React.Component {
  authUnsubscribe = null

  componentDidMount() {
    const { userSetCurrent } = this.props

    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await userCreateRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          userSetCurrent({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        userSetCurrent(null)
      }
    })
  }

  componentWillUnmount() {
    this.authUnsubscribe()
  }

  render() {
    return (
      <div>
        <HeaderComponent />

        <Switch>
          <Route
            exact
            path='/'
            component={() => <HomePage data={StoreData} />}
          />

          <Route
            exact
            path='/login'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <LoginPage />
            }
          />

          <Route exact path='/checkout' component={() => <CheckoutPage />} />

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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  userSetCurrent: (user) => dispatch(userSetCurrent(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
