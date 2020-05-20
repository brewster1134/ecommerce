import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import React from 'react'

import './App.sass'
import { auth, userCreateRef } from './utils/firebase'
import { selectCurrentUser, setCurrentUser } from './state/user.state'
import CategoryPage from './pages/category.page'
import CheckoutPage from './pages/checkout.page'
import CollectionPage from './pages/collection.page'
import HeaderComponent from './components/header.component'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'

class App extends React.Component {
  authUnsubscribe = null

  componentDidMount() {
    const { history, setCurrentUser } = this.props

    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await userCreateRef(userAuth)

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })

        history.push('/')
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
      <div>
        <HeaderComponent />

        <Switch>
          <Route exact path='/' component={HomePage} />

          <Route
            exact
            path='/login'
            render={() =>
              this.currentUser ? <Redirect to='/' /> : <LoginPage />
            }
          />

          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path={`/:category`} component={CategoryPage} />

          <Route
            exact
            path={`/:category/:collection`}
            component={CollectionPage}
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
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
